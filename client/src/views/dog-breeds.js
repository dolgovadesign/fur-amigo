import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './dog-breeds.css';
import logo from '../assets/images/logo5.png';
import CustomButton from '../components/custom-button';
import ImageButton from '../components/image-button';
import DogBreeds from '../services/breeds-service';

export default function DogBreedsView({name}) {
    const history = useHistory();
    const [viewMode, setViewMode] = useState('list');

    return (
        <>
            <h1 className="title">Hi {name}!</h1>
            <img className="logo" src={logo} alt="Excited FurAmigo" />
            <p className="instruction">
                Let's play 34 dog breed barking sounds!
            </p>
            <div>
                <button className={`page-button page-button-list ${viewMode === 'list' ? 'page-button--active' : ''}`} 
                        onClick={() => setViewMode('list')}>
                    <i className="fa fa-bars" aria-hidden="true"></i>List
                </button>
                <button className={`page-button page-button-icons ${viewMode === 'icons' ? 'page-button--active': ''}`} 
                        onClick={() => setViewMode('icons')}>
                    <i className="fa fa-th-large" aria-hidden="true"></i>Icons
                </button>
            </div>
            <div className="breeds-container">
                <div className="breeds">
                    {
                        viewMode === 'list' &&
                        DogBreeds.map(breed => {
                            return <CustomButton key={breed.name} className="breeds-list-button" label={breed.name} onClick={() => history.push(`/breed/${breed.track}`)} />
                        })
                    }
                    {
                        viewMode === 'icons' &&
                        DogBreeds.map(breed => {
                            return <ImageButton key={breed.name} image={breed.image} onClick={() => history.push(`/breed/${breed.track}`)} />
                        })
                    }
                </div>
            </div>
            </>
    );
}