import './audio-bar.css';

export default function AudioBar({active, description}) {
    let barClass = `bar bar${active ? '--animated' : ''}`;
    
    return (
        <div className="audio-bar">
            <div className="bars">
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
                <div className={barClass}></div>
            </div>
            <p className="audio-bar__description">{active ? (description || `Sound is playing`) : `Nothing is playing`}</p>
        </div>
    );

}