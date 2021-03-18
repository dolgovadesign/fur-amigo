import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './actions.css';
import logo from '../assets/images/logo4.png';

const actionUrl = 'http://localhost:4000';

export default function Actions({name}) {
    const history = useHistory();

    function onEarsUp() {
        axios.post(`${actionUrl}/earsup`);
    }

    function onEarsDown() {
        axios.post(`${actionUrl}/earsdown`);
    }

    function onEarsFlapping() {
        axios.post(`${actionUrl}/earsflapping`);
    }

    function onShakeLeftPaw() {
        axios.post(`${actionUrl}/shakeleftpaw`);
    }

    function onShakeRightPaw() {
        axios.post(`${actionUrl}/shakerightpaw`);
    }

    function onReset() {
        axios.post(`${actionUrl}/reset`);
    }

    function onBark() {
        history.push('/breeds');
    }

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Attentive FurAmigo" />
            <p className="instruction">Let's try to move me</p>
            <div className="action-container">
                <button className="action-button" onClick={() => onEarsUp()}>Ears Up</button>
                <button className="action-button" onClick={() => onEarsDown()}>Ears Down</button>
                <button className="action-button" onClick={() => onEarsFlapping()}>Ears Flapping</button>
                <button className="action-button" onClick={() => onShakeLeftPaw()}>Shake Left Paw</button>
                <button className="action-button" onClick={() => onShakeRightPaw()}>Shake Right Paw</button>
                <button className="action-button" onClick={() => onReset()}>Reset</button>
            </div>
            <button onClick={() => onBark()}>Bark</button>
        </>
    );
}