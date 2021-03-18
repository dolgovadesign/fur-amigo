const socketIO = require('socket.io');

module.exports = {
    configure: (server) => {
        let interval;
        const io = socketIO(server, {
            cors: {
              origin: "http://localhost:3000",
              methods: ["GET", "POST"]
            }
        });
    
        io.on('connection', socket => {
            console.log(`Client connected`);
    
            if (interval) {
                clearInterval(interval);
            }
    
            interval = setInterval(() => {
                if (Math.floor(Math.random() * 10) <= 5) {
                    console.log(`Emitting SingleClap`);
                    socket.emit('SingleClap', true);
                }
                else {
                    console.log(`Emitting DoubleClap`);
                    socket.emit('DoubleClap', true);
                }
                
            }, 10000);
    
            socket.on('disconnect', () => {
                console.log(`Client disconnected`);
            });
        });
    }
};