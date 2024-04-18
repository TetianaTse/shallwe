import React from 'react';

interface IButton {
    onClick: () => void;
    icon: 'clear' | 'downArrow';
}

const Button: React.FC<IButton> = ({ onClick, icon }) => {
    return (
        <button onClick={onClick} className="button_clear">
            {icon === 'clear' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18px" height="18px">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18px" height="18px">
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
            )}
        </button>
    );
};

export default Button;