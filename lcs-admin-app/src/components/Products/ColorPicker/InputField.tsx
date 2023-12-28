import React from 'react'
// this is how we'll interface with Payload itself
import { useFieldType } from 'payload/components/forms';
// we'll re-use the built in Label component directly from Payload
import { Label } from 'payload/components/forms';
// we can use existing Payload types easily
import { Props } from 'payload/components/fields/Text';
// retrieve and store the last used colors of your users
import { usePreferences } from 'payload/components/preferences';
// re-use Payload's built-in button component
import { Button } from 'payload/components';

import { useState, useEffect, useCallback, Fragment } from 'react'
import './Styles.scss'
import { validateHexColor } from '../SelectColor';

const defaultColors = [
    '#ffff00',
    '#0000ff',
    '#ff0000',
    '#008000',
    '#ffffff',
];
const baseClass = 'custom-color-picker'
const preferenceKey = 'color-picker-colors';

const InputField: React.FC<Props> = (props) => {
    const {
        path,
        label,
        required
    } = props;

    const {
        value = '',
        setValue,
    } = useFieldType({
        path,
        validate: validateHexColor,
    });
       /* const [selectedColor, setSelectedColor] = useState('#000000')
          const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
              const newColor = event.target.value;
              setSelectedColor(newColor)
        } */
    const { getPreference, setPreference } = usePreferences();
    const [colorOptions, setColorOptions] = useState(defaultColors);
    const [isAdding, setIsAdding] = useState(false);
    const [colorToAdd, setColorToAdd] = useState('');

    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value;
        setColorToAdd(newColor)
    }

    useEffect(() => {
        const mergeColorsFromPreferences = async () => {
            const colorPreferences = await getPreference<string[]>(preferenceKey);
            if (colorPreferences) {
                setColorOptions(colorPreferences);
            }
        };
        mergeColorsFromPreferences();
    }, [getPreference, setColorOptions]);


    const handleAddColor = useCallback(() => {
        setIsAdding(false);
        setValue(colorToAdd);
        // prevent adding duplicates
        if (colorOptions.indexOf(colorToAdd) > -1) return;
        let newOptions = colorOptions;
        newOptions.unshift(colorToAdd);
        // update state with new colors
        setColorOptions(newOptions);
        // store the user color preferences for future use
        setPreference(preferenceKey, newOptions);
    }, [colorOptions, setPreference, colorToAdd, setIsAdding, setValue]);

    return (
        <div className={baseClass}>
            <Label
                htmlFor={path}
                label={label}
                required={required}
            />
            {isAdding && (
                <div>
                    {/*<input
                        className={`${baseClass}__input`}
                        type="text"
                        placeholder="#000000"
                        onChange={(e) => setColorToAdd(e.target.value)}
                        value={colorToAdd}
                    />*/}
                    <input
                        className={`${baseClass}__input`}
                        type="color"
                        onChange={handleChangeColor}
                        title='color'
                        value={colorToAdd}
                    />
                    <Button
                        className={`${baseClass}__btn`}
                        buttonStyle="primary"
                        iconPosition="left"
                        iconStyle="with-border"
                        size="small"
                        onClick={handleAddColor}
                        disabled={validateHexColor(colorToAdd) !== true}
                    >Agregar Color</Button>
                    <Button
                        className={`${baseClass}__btn`}
                        buttonStyle="secondary"
                        iconPosition="left"
                        iconStyle="with-border"
                        size="small"
                        onClick={() => setIsAdding(false)}
                    >Cancelar</Button>
                </div>
            )}

            {!isAdding && (
                <Fragment>
                    <ul className={`${baseClass}__colors`}>
                        {colorOptions.map((color, i) => (
                            <li key={i}>
                                <button
                                    type="button"
                                    key={color}
                                    className={`chip ${color === value ? 'chip--selected' : ''} chip--clickable`}
                                    style={{ backgroundColor: color }}
                                    aria-label={color}
                                    onClick={() => setValue(color)}
                                />
                            </li>)
                        )}
                    </ul>
                    <Button
                        className="add-color"
                        icon="plus"
                        buttonStyle="icon-label"
                        iconPosition="left"
                        iconStyle="with-border"
                        onClick={() => {
                            setIsAdding(true);
                            setValue('');
                        }}
                    >
                        <p>Nuevo Color</p>
                    </Button>
                </Fragment>
            )}

            {/* <input type="color"
                title='color'
                value={selectedColor}
                onChange={handleChangeColor}
            />
            <ul className={`${baseClass}__colors`}>
                <li >
                    <button
                        type="button"
                        key={selectedColor}
                        className={`chip ${selectedColor === value ? 'chip--selected' : ''} chip--clickable`}
                        style={{ backgroundColor: selectedColor }}
                        aria-label={selectedColor}
                        onClick={() => setValue(selectedColor)}
                    />
                </li>
            </ul> */}

            {/* 
            <ul className={`${baseClass}__colors`}>
                {defaultColors.map((color, i) => (
                    <li key={i}>
                        <button
                            type="button"
                            key={color}
                            className={`chip ${color === value ? 'chip--selected' : ''} chip--clickable`}
                            style={{ backgroundColor: color }}
                            aria-label={color}
                            onClick={() => setValue(color)}
                        />
                    </li>
                )
                )}
            </ul> */}
        </div>
    )
}
export default InputField;