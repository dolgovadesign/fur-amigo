import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import './single-clap.css';
import logo from '../assets/images/logo2.png';
import clapLogo from '../assets/images/single-clap.png';

export default function SingleClap({name}) {
    const history = useHistory();
    const endpoint = 'http://localhost:4000';

    useEffect(() => {
        const socket = socketIOClient(endpoint);
        socket.on('SingleClap', () => history.push('/setup_2'));
    
        return () => socket.disconnect();
      }, [history]);

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Excited FurAmigo" />
            <p className="instruction">
                I am so excited to play with your furry friend and you!<br />
                When your dog is ready to listen to dog barking sounds,
            </p>
            <p className="instruction instruction-command">
                Clap your hands once!
            </p>
            <img className="clap-logo" src={clapLogo} alt="Clapping hands" />
        </>
    );
}