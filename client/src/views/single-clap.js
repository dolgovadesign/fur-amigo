import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './single-clap.css';
import logo from '../assets/images/logo2.png';
import clapLogo from '../assets/images/single-clap.png';
import Service from '../services/fur-amigo-service';

export default function SingleClap({name}) {
    const history = useHistory();

    useEffect(() => {
        const dispose = Service.onMessageReceived(message => {
            if (message === 'Single Clap') {
                history.push('/setup_2');
            } else {
                console.log(`Unrecognized message from FurAmigo: '${message}'`);
            }
        });

        return () => dispose();
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