import React from 'react';

interface ICheckbox {
    type: string
    name?: string
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    value?: string
}

const Checkbox: React.FC<ICheckbox> = ({ type, name, checked, onChange, label, value }) => {
    return (
        <label>
            <input
                type={type}
                name={name}
                checked={checked}
                onChange={onChange}
                value={value}
            />
            {label}
        </label>
    );
};

export default Checkbox;
