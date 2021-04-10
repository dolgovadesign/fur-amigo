const socketIO = require('socket.io');

let openSocket;

module.exports = {
    configure: (server) => {
        const io = socketIO(server, {
            cors: {
              origin: "http://localhost:3000",
              methods: ["GET", "POST"]
            }
        });

        console.log(`Listening to Socket.IO connections`);
    
        io.on('connection', socket => {
            console.log(`Socket.IO client connected`);
            openSocket = socket;

            socket.emit(`Test`, true);

            socket.on('disconnect', () => {
                console.log(`Socket.IO client disconnected`);
                openSocket = null;
            });
        });
    },
    send: data => {
        if (openSocket) {
            openSocket.emit('FurAmigo', data);
        }
    }
};