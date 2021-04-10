import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import logo from '../assets/images/logo3.png';
import clapLogo from '../assets/images/double-clap.png';
import Service from '../services/fur-amigo-service';

export default function DoubleClap({name}) {
    const history = useHistory();
    const endpoint = 'http://localhost:4000';
    const [doubleClapDetected, setDoubleClapDetected] = useState(false);
    const [retry, setRetry] = useState(false);
    const initialInstruction1 = 'Can you hear the next dog barking sound if you';
    const initialInstruction2 = 'Clap your hands twice?';
    const retryInstruction1 = 'Come closer to me and';
    const retryInstruction2 = 'Clap your hands twice again!';

    useEffect(() => {
        const socket = io(endpoint);
        socket.on('FurAmigo', message => {
            if (message.trim() === 'Double Clap') {
                setDoubleClapDetected(true);
            } else {
                console.log(`Unrecognized message from FurAmigo: '${message}'`);
            }
        });
    
        return () => socket.disconnect();
      }, [history]);

    function onContinue() {
        Service.stopPlayer();
        history.push('/actions');
    }

    function onRetry() {
        setRetry(true);
        setDoubleClapDetected(false);
    }

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Howling FurAmigo" />
            <p className="instruction">{ retry ? retryInstruction1 : initialInstruction1}</p>
            <p className="instruction instruction-command">{ retry ? retryInstruction2 : initialInstruction2 }</p>
            <img className="clap-logo" src={clapLogo} alt="Two sets of clapping hands" />
            {
                doubleClapDetected &&
                <div>
                    <button onClick={() => onContinue()}>Yes</button>
                    <button onClick={() => onRetry()}>No</button>
                </div>
            }
        </>
    );
}