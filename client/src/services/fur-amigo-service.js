import axios from 'axios';

const actionUrl = 'http://localhost:4000';

const Service = {
    raiseEars: () => {
        axios.post(`${actionUrl}/raiseears`);
    },
    lowerEars: () => {
        axios.post(`${actionUrl}/lowerears`);
    },
    flapEars: () => {
        axios.post(`${actionUrl}/flapears`);
    },
    shakeLeftPaw: () => {
        axios.post(`${actionUrl}/shakeleftpaw`);
    },
    shakeRightPaw: () => {
        axios.post(`${actionUrl}/shakerightpaw`);
    },
    startPlayer: () => {
        axios.post(`${actionUrl}/playstart`);
    },
    stopPlayer: () => {
        axios.post(`${actionUrl}/playstop`);
    },
    playNext: () => {
        axios.post(`${actionUrl}/playnext`);
    },
    playTrack: (trackId) => {
        axios.post(`${actionUrl}/playtrack?id=${trackId}`);
    },
    raiseVolume: () => {

    },
    lowerVolume: () => {

    },
    reset: () => {
        axios.post(`${actionUrl}/reset`);
    },
};

export default Service;