const socketIO = require('socket.io');

let openConnection;

module.exports = {
    configure: (server) => {
        let interval;
        const io = socketIO(server, {
            cors: {
              origin: "http://localhost:3000",
              methods: ["GET", "POST"]
            }
        });

        console.log(`Listening to Socket.IO connections`);
    
        io.on('connection', socket => {
            console.log(`Socket.IO client connected`);
            openConnection = socket;

            socket.on('disconnect', () => {
                console.log(`Socket.IO client disconnected`);
                openConnection = null;
            });
        });
    },
    send: data => {
        if (openConnection) {
            openConnection.emit(data, true);
        }
    }
};