import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import './double-clap.css';
import logo from '../assets/images/logo3.png';
import clapLogo from '../assets/images/double-clap.png';
import Service from '../services/fur-amigo-service';
import AudioBar from '../components/audio-bar';

export default function DoubleClapView({name}) {
    const history = useHistory();
    const [doubleClapDetected, setDoubleClapDetected] = useState(false);
    const [playerActive, setPlayerActive] = useState(true);
    const [retry, setRetry] = useState(false);
    const initialInstruction1 = 'Can you hear the next dog barking sound if you';
    const initialInstruction2 = 'Clap your hands twice?';
    const retryInstruction1 = 'Come closer to me and';
    const retryInstruction2 = 'Clap your hands twice again!';

    useEffect(() => {
        const dispose = Service.onMessageReceived(message => {
            if (message === 'Double Clap') {
                setDoubleClapDetected(true);
            } else if (message.startsWith(`Playing track`)) {
                setPlayerActive(true);
            } else if (message.startsWith('Stopping track')) {
                setPlayerActive(false);
            } else {
                console.log(`Unrecognized message from FurAmigo: '${message}'`);
            }
        });
    
        return () => dispose();
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
            <div>
                <AudioBar className="audio-bar" active={playerActive} description="Dog is barking!"></AudioBar>
            </div>
            <p className="instruction">{ retry ? retryInstruction1 : initialInstruction1}</p>
            <p className="instruction instruction-command">{ retry ? retryInstruction2 : initialInstruction2 }</p>
            <div className="retry-container">
                { doubleClapDetected && <a className="retry-link-yes" onClick={() => onContinue()}>Yes</a> }
                <img className="clap-logo" src={clapLogo} alt="Two sets of clapping hands" />
                { doubleClapDetected && <a className="retry-link-no" onClick={() => onRetry()}>No</a> }
            </div>
        </>
    );
}