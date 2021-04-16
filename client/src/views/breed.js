import { useParams } from 'react-router-dom';
import ImageButton from '../components/image-button';
import DogBreeds from '../services/breeds-service';

export default function BreedView() {
    const { id } = useParams();
    return (
        <ImageButton image={DogBreeds[id - 1].image} />
    );
}