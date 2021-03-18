const serialport = require('serialport');
const readline = require('@serialport/parser-readline');

let arduino;
let parser;

module.exports = {
    configure: ({path, baudRate}) => {
        arduino = new serialport(path, { autoOpen: false, baudRate });
        parser = arduino.pipe(new readline({ delimiter: '\n' }));

        arduino.open(error => {
            if (error || !arduino.isOpen) {
                console.error(`Failed to establish serial connection`, error);
                return;
            }

            console.log(`Serial connection established`);
        });
    },
    send: (data, callback) => {
        arduino.write(data, callback);
    },
    receive: (callback) => {
        parser.on('data', data => {
            callback(data);
        });
    }
};