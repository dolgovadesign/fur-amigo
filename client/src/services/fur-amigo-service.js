import axios from 'axios';
import { io } from 'socket.io-client';

const endpoint = 'http://localhost:4000';

const Service = {
    raiseEars: () => {
        axios.post(`${endpoint}/raiseears`);
    },
    lowerEars: () => {
        axios.post(`${endpoint}/lowerears`);
    },
    flapEars: () => {
        axios.post(`${endpoint}/flapears`);
    },
    shakeLeftPaw: () => {
        axios.post(`${endpoint}/shakeleftpaw`);
    },
    shakeRightPaw: () => {
        axios.post(`${endpoint}/shakerightpaw`);
    },
    startPlayer: () => {
        axios.post(`${endpoint}/playstart`);
    },
    stopPlayer: () => {
        axios.post(`${endpoint}/playstop`);
    },
    playNext: () => {
        axios.post(`${endpoint}/playnext`);
    },
    playTrack: (track) => {
        axios.post(`${endpoint}/playtrack?track=${track}`);
    },
    raiseVolume: () => {

    },
    lowerVolume: () => {

    },
    reset: () => {
        axios.post(`${endpoint}/reset`);
    },
    onMessageReceived: (callback) => {
        const socket = io(endpoint);

        socket.on('FurAmigo', message => {
            callback(message.trim());
        });
    
        return () => socket.disconnect();
    }
};

export default Service;