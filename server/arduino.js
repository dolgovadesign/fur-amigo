const serialport = require('serialport');
const readline = require('@serialport/parser-readline');

let arduino;
let parser;

module.exports = {
    configure: ({path, baudRate, onDataReceived}) => {
        arduino = new serialport(path, { autoOpen: false, baudRate });
        parser = arduino.pipe(new readline({ delimiter: '\n' }));

        parser.on('data', data => {
            console.log(`FurAmigo sends: ${data}`);
            onDataReceived && onDataReceived(data);
        });

        arduino.open(error => {
            if (error || !arduino.isOpen) {
                console.error(`Failed to establish bluetooth connection`, error);
                return;
            }

            console.log(`Bluetooth connection established`);
        });
    },
    send: (data) => {
        var buffer = Buffer.from(data, 'ascii');
        arduino.write(buffer, error => {
            if (error) {
                console.error(`Failed to send {data} via bluetooth`);
            }
        });
        arduino.flush();
    }
};