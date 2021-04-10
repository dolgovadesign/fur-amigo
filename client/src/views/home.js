import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './home.css';
import logo from '../assets/images/logo1.png';
import button from '../assets/images/button.png';

export default function Home({onNameChanged}) {
    const history = useHistory();
    const [name, setName] = useState('');

    function onSubmit(history, name) {
        if (name) {
            onNameChanged(name);
            history.push(`/setup_1`);
        } else {
            alert(`Please enter your name in the provided field`);
        }
    }

    return (
        <>
            <h1 className="title">FurAmigo v.1.1</h1>
            <img className="logo" src={logo} alt="Attentive FurAmigo" />
            <p className="instruction">Hello My Friend!<br />I am FurAmigo.</p>
            <p className="instruction">What is your name?</p>
            <input className="name-field" type="text" placeholder="Enter your name" value={name} onChange={event => setName(event.target.value)} />
            <button className="submit-button" onClick={() => onSubmit(history, name)}>
                <img className="submit-button__image" src={button} alt="Submit button" />
                <span className="submit-button__text">Submit</span>
            </button>
        </>
    );
}