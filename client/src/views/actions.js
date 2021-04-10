import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './actions.css';
import logo from '../assets/images/logo4.png';
import Service from '../services/fur-amigo-service';

export default function Actions({name}) {
    const [playing, setPlaying] = useState(false);

    function togglePlayer() {
        if (playing) {
            Service.stopPlayer();
            setPlaying(false);
        } else {
            Service.startPlayer();
            setPlaying(true);
        }
    }

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Attentive FurAmigo" />
            <p className="instruction">Let's try to move me</p>
            <div className="action-container">
                <button className="action-button" onClick={() => Service.raiseEars()}>Ears Up</button>
                <button className="action-button" onClick={() => Service.lowerEars()}>Ears Down</button>
                <button className="action-button" onClick={() => Service.flapEars()}>Ears Flapping</button>
                <button className="action-button" onClick={() => Service.shakeLeftPaw()}>Shake Left Paw</button>
                <button className="action-button" onClick={() => Service.shakeRightPaw()}>Shake Right Paw</button>
                <button className="action-button" onClick={() => togglePlayer()}>Toggle Player</button>
                <button className="action-button" onClick={() => Service.playNext()}>Next Track</button>
                <button className="action-button" onClick={() => Service.reset()}>Reset</button>
            </div>
            <button>Bark</button>
        </>
    );
}