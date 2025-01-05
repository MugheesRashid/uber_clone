const scoketIo = require('socket.io');
const userModel = require('./models/user');
const captainModel = require('./models/captainModel');
const cors = require('cors');

let io;

const initialization = (server) => {
    io = scoketIo(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }

    });


    io.on('connection', (socket) => {

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                const user = await userModel.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
                if (user) {
                    socket.join(data.userId);
                }
            } else if (userType === 'captain') {
                const captain = await captainModel.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
                if (captain) {
                    socket.join(data.userId);
                }
            }
        });

        socket.on('updateCaptainLocation', async (data) => {
            const { userId, location } = data;
            if (!location || !location.latitude || !location.longitude) {
                console.log('Location is not valid');
                return;
            }
            const captain = await captainModel.findOneAndUpdate({ _id: userId }, {
                location: {
                    lat: location.latitude,
                    lng: location.longitude
                }
            });
            if (captain) {
                socket.emit('captainLocation', captain);
            }
        });

        socket.on('disconnect', () => {
            return;
        });
    });

}

const sendMessage = (message, socketId, type) => {
    if (io) {
        io.to(socketId).emit(type, message);
    } else {
        console.log('Socket is not initialized');
    }
}

const sendMessageToAll = (message, type) => {
    if (io) {
        io.emit(type, message);
    } else {
        console.log('Socket is not initialized');
    }
}

module.exports = {
    initialization,
    io,
    sendMessage,
    sendMessageToAll
}