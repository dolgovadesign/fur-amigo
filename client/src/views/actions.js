import { useHistory } from 'react-router-dom';
import './actions.css';
import logo from '../assets/images/logo4.png';
import Service from '../services/fur-amigo-service';
import CustomButton from '../components/custom-button';
import button from '../assets/images/button-2.png';

export default function ActionsView({name}) {
    const history = useHistory();

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Attentive FurAmigo" />
            <p className="instruction">Let's try to move me!</p>
            <div className="action-container">
                <CustomButton label="Ears Up" onClick={() => Service.raiseEars()} />
                <CustomButton label="Ears Down" onClick={() => Service.lowerEars()} />
                <CustomButton label="Flap Ears" onClick={() => Service.flapEars()} />
                <CustomButton label="Shake Left Paw" onClick={() => Service.shakeLeftPaw()} />
                <CustomButton label="Shake Right Paw" onClick={() => Service.shakeRightPaw()} />
                <CustomButton label="Reset" onClick={() => Service.reset()} />
            </div>
            <div className="dog-breeds-button">
                <img src={button} onClick={() => history.push(`/dog_breeds`)} alt="Go To Breeds" /><div className="button-label"> Dog Breeds </div>
            </div>
        </>
    );
}