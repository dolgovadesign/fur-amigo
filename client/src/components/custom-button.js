import './custom-button.css';

export default function CustomButton({className, label, onClick}) {
    return (
        <button className={`custom-button button-label ${className}`} onClick={onClick}>{label}</button>
    );
}