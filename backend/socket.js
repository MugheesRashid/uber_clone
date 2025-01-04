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
        console.log('A user connected', socket.id);

        socket.on('join',async (data) => {
          const { userId, userType } = data;
          console.log(data.userId)

          if(userType === 'user'){
            const user = await userModel.findOneAndUpdate({_id: userId}, {socketId: socket.id});
            if(user){
                socket.join(data.userId);
            }
          } else if(userType === 'captain'){
            const captain = await captainModel.findOneAndUpdate({_id: userId}, {socketId: socket.id});
            if(captain){
                socket.join(data.userId);
            }
          }
        });
        
        socket.on('disconnect', () => {
            console.log('A user disconnected', socket.id);
        });
    });

}

const sendMessage = (message, socketId) => {
    if(io){
        io.to(socketId).emit('message', message);
    } else {
        console.log('Socket is not initialized');
    }
}

const sendMessageToAll = (message) => {
    if(io){
        io.emit('message', message);
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