import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IForm } from './app.interface';
import Checkbox from './Checkbox';
import Button from './Button';
// import PhotoUploadComponent from './PhotoUploadComponent';
// import UploadPhoto from './UploadPhoto';

interface CheckboxValues {
    [key: string]: boolean;
}

interface Translations {
    [key: string]: string;
}

const translations: Translations = {
    cigarettes: 'Цигарки',
    iqos: 'IQOS',
    vapes: 'Вейп',
    tobacco: 'Тютюн',
};

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        reset,
        setValue,
        watch,
        clearErrors
    } = useForm<IForm>();

    const [showRadioButtons, setShowRadioButtons] = useState(false);
    const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
        cigarettes: false,
        iqos: false,
        vapes: false,
        tobacco: false,
    });
    const [inputValue, setInputValue] = useState('');
    const [readyToLimit, setReadyToLimit] = useState('');
    const [formError, setFormError] = useState('');
    const [showButton, setShowButton] = useState(false);

    const selectedRadio = watch('smoking');

    const onSubmit: SubmitHandler<IForm> = (data) => {
        if (data.smoking === 'Палю') {
            const selectedCheckboxes = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);
            if (selectedCheckboxes.length === 0) {
                setFormError('Оберіть хоча б один варіант паління');
                return;
            } else {
                setFormError('');
            }

            if (!readyToLimit) {
                setFormError('Оберіть вашу готовність обмежити паління');
                return;
            } else {
                setFormError('');
            }
        }

        let selectedValues = '';
        if (data.smoking === 'Палю') {
            const selectedCheckboxes = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);
            selectedValues = selectedCheckboxes.map((key) => translations[key]).join(', ');
        }

        let readyToLimitValue = '';
        switch (readyToLimit) {
            case 'Ні':
                readyToLimitValue = 'Не готовий обмежетись';
                break;
            case 'Тільки на балконі':
                readyToLimitValue = 'Курю тільки на балконі';
                break;
            case 'Не в квартирі':
                readyToLimitValue = 'Курю не в квартирі';
                break;
            default:
                readyToLimitValue = '';
        }

        const inputValue = `${data.smoking} ${selectedValues}. ${readyToLimitValue}`;
        console.log(`Send ${inputValue}`);

        reset();
        setValue('smoking', '');
        setCheckboxValues({
            cigarettes: false,
            iqos: false,
            vapes: false,
            tobacco: false,
        });
        setShowRadioButtons(false);
        setInputValue('');
        setReadyToLimit('');
    };

    const handleInputClick = () => {
        setShowRadioButtons(true);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxValues({ ...checkboxValues, [name]: checked });
        const selectedValues = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);
        setInputValue(selectedRadio ? `${selectedRadio} ${selectedValues.map((key) => translations[key]).join(', ')}` : '');
    };

    const handleRadioChange = (value: string) => {
        setValue('smoking', value);
        setShowButton(true);
        if (value === 'Палю') {
            setShowRadioButtons(true);
        } else {
            setShowRadioButtons(false);
            setCheckboxValues({
                cigarettes: false,
                iqos: false,
                vapes: false,
                tobacco: false,
            });
            setInputValue(value);
            setReadyToLimit('');
        }
        if (dirtyFields.smoking) {
            clearErrors('smoking');
    }
    };

    const handleButtonClick = () => {
        reset();
        setCheckboxValues({
            cigarettes: false,
            iqos: false,
            vapes: false,
            tobacco: false,
        });
        setShowRadioButtons(false);
        setInputValue('');
        setReadyToLimit('');
        setShowButton(false);
    };

    useEffect(() => {
        const selectedValues = Object.keys(checkboxValues).filter((key) => checkboxValues[key]);
        setInputValue(selectedRadio ? `${selectedRadio} ${selectedValues.map((key) => translations[key]).join(', ')}` : '');
        setShowButton(!!inputValue);
    }, [checkboxValues, selectedRadio, inputValue]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <label htmlFor="smoking" className='title'>Паління</label>
                <div className='input_container'>
                    <input
                        type="text"
                        value={inputValue}
                        id="smoking"
                        onClick={() => {
                            handleInputClick();
                                if (dirtyFields.smoking) {
                                    clearErrors('smoking')
                                }}
                            }
                        readOnly
                        {...register('smoking', {
                            required: 'Оберіть значення',
                        })}
                    />
                    {showButton ? <Button onClick={handleButtonClick} icon='clear'/> : <Button onClick={handleButtonClick} icon='downArrow'/>}
                    {errors.smoking && <div className="error-message">{errors.smoking.message}</div>}
                </div>
                {showRadioButtons && <div className='block_smoking'>
                    {showRadioButtons && (
                        <div>
                            <div className='radio'>
                            <Checkbox
                                type="radio"
                                value="Палю"
                                checked={selectedRadio === 'Палю'}
                                onChange={() => {
                                    handleRadioChange('Палю');
                                    clearErrors('smoking');
                                }}
                                label='Палю'
                                />
                                {selectedRadio === 'Палю' && (
                                    <div className='checkbox_block'>
                                        <Checkbox
                                            type='checkbox'
                                            name="cigarettes"
                                            checked={checkboxValues.cigarettes}
                                            onChange={handleCheckboxChange}
                                            label={translations['cigarettes']}
                                            value='Цигарки'
                                        />
                                        <Checkbox
                                            type='checkbox'
                                            name="iqos"
                                            checked={checkboxValues.iqos}
                                            onChange={handleCheckboxChange}
                                            label={translations['iqos']}
                                            value='IQOS'
                                        />
                                        <Checkbox
                                            type='checkbox'
                                            name="vapes"
                                            checked={checkboxValues.vapes}
                                            onChange={handleCheckboxChange}
                                            label={translations['vapes']}
                                            value='Вейп'
                                        />
                                        <Checkbox
                                            type='checkbox'
                                            name="tobacco"
                                            checked={checkboxValues.tobacco}
                                            onChange={handleCheckboxChange}
                                            label={translations['tobacco']}
                                            value='Тютюн'
                                        />
                                    </div>
                                )}
                                {(selectedRadio === 'Палю' && showRadioButtons) && (
                                    <div className='radio-block'>
                                        <div className='radio-block__button'>
                                            <h3>Готові обмежетись?</h3>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="not_ready"
                                                    name="readyToLimit"
                                                    value="Ні"
                                                    checked={readyToLimit === 'Ні'}
                                                    onChange={() => setReadyToLimit('Ні')}
                                                />
                                                <label htmlFor="not_ready">Ні</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="balcony"
                                                    name="readyToLimit"
                                                    value="Тільки на балконі"
                                                    checked={readyToLimit === 'Тільки на балконі'}
                                                    onChange={() => setReadyToLimit('Тільки на балконі')}
                                                />
                                                <label htmlFor="balcony">Тільки на балконі</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="not_in_apartment"
                                                    name="readyToLimit"
                                                    value="Не в квартирі"
                                                    checked={readyToLimit === 'Не в квартирі'}
                                                    onChange={() => setReadyToLimit('Не в квартирі')}
                                                />
                                                <label htmlFor="not_in_apartment">Не в квартирі</label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='radio'>
                                <Checkbox
                                    type="radio"
                                    value="Не палю"
                                    checked={selectedRadio === 'Не палю'}
                                    onChange={() => {
                                        handleRadioChange('Не курящі');
                                        clearErrors('smoking');
                                    }}
                                    label='Не палю'
                                    />
                            </div>
                        </div>
                    )}
                </div>}
                {formError && <div className="error-message__checkbox">{formError}</div>}
                {/* <div className='upload-photo'>
                    <PhotoUploadComponent />
                </div> */}
                {/* <div className='upload-photo'>
                    <UploadPhoto />
                </div> */}
                <button className='main_button'>Send</button>
            </form>
        </div>
    );
};

export default Form;