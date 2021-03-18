import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import logo from '../assets/images/logo3.png';
import clapLogo from '../assets/images/double-clap.png';

export default function DoubleClap({name}) {
    const history = useHistory();
    const endpoint = 'http://localhost:4000';

    useEffect(() => {
        const socket = socketIOClient(endpoint);
        socket.on('DoubleClap', () => history.push('/actions'));
    
        return () => socket.disconnect();
      }, [history]);

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Howling FurAmigo" />
            <p className="instruction">Can you hear the next dog barking sound if you</p>
            <p className="instruction instruction-command">Clap your hands twice?</p>
            <img className="clap-logo" src={clapLogo} alt="Two sets of clapping hands" />
        </>
    );
}