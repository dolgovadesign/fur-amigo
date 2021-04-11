import './custom-button.css';

export default function CustomButton({label, onClick}) {
    return (
        <button className="custom-button" onClick={onClick}>{label}</button>
    );
}