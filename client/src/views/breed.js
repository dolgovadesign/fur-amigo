import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './breed.css';
import leftButton from '../assets/images/left-arrow.png';
import rightButton from '../assets/images/right-arrow.png';
import playButton from '../assets/images/play-button.png';
import stopButton from '../assets/images/stop-button.png';
import ImageButton from '../components/image-button';
import AudioBar from '../components/audio-bar';
import DogBreeds from '../services/breeds-service';
import Service from '../services/fur-amigo-service';

export default function BreedView() {
    const { id } = useParams();
    const history = useHistory();
    const [buttonPressed, setButtonPressed] = useState(false);
    const [playerActive, setPlayerActive] = useState(false);
    const breedId = parseInt(id, 10);
    const currentBreed = DogBreeds[breedId - 1];
    const prevBreedId = breedId === 1 ? DogBreeds.length : breedId - 1;
    const nextBreedId = breedId === DogBreeds.length ? 1 : breedId + 1;

    useEffect(() => {
        const dispose = Service.onMessageReceived(message => {
            if (message.startsWith(`Playing track`)) {
                setPlayerActive(true);
                setButtonPressed(false);
            } else if (message.startsWith('Stopping track')) {
                setPlayerActive(false);
                setButtonPressed(false);
            } else {
                console.log(`Unrecognized message from FurAmigo: '${message}'`);
            }
        });
    
        return () => dispose();
      }, [history]);

    function playTrack() {
        if (buttonPressed) {
            return;
        }
        
        setButtonPressed(true);
        Service.playTrack(currentBreed.track);
    }

    function stopTrack() {
        if (buttonPressed) {
            return;
        }
        
        setButtonPressed(true);
        Service.stopPlayer();
    }

    return (
        <>
        <div>
            <img className="arrow-button" src={leftButton} onClick={() => history.push(`/breed/${prevBreedId}`)} />
            <ImageButton image={currentBreed.image} />
            <img className="arrow-button" src={rightButton} onClick={() => history.push(`/breed/${nextBreedId}`)} />
        </div>
        <AudioBar className="audio-bar" active={playerActive} description={`${currentBreed.name} is barking`}></AudioBar>
        { playerActive && <img className={`audio-button ${buttonPressed ? 'audio-button--pressed' : ''}`} src={stopButton} onClick={() => stopTrack()} /> }
        { !playerActive && <img className={`audio-button ${buttonPressed ? 'audio-button--pressed' : ''}`} src={playButton} onClick={() => playTrack()} /> }
        </>
    );
}