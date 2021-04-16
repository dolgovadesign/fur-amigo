import './image-button.css';

export default function ImageButton({image, onClick}) {
    return (
        <img className="image-button-image" src={image} onClick={onClick} alt="button" />
    );
}