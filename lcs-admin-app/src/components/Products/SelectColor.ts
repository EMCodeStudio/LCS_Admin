import { Field } from 'payload/types';
import InputField from './ColorPicker/InputField';
import Cell from './ColorPicker/Cell';


export const validateHexColor = (value: string): boolean | string => {
    
    if (value === undefined) {
        return 'Value is undefined';
    }
    const matchResult = value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
    
    return matchResult && matchResult.length === 1 ? true : `${value} is not a valid hex color`;
}


const colorField: Field = {
    name: 'Color',
    label: 'Color por Defecto',
    type: 'text',
    validate: validateHexColor,
    required: true,
    admin: {
        components: {
            Field: InputField,
            Cell,
        },
    },
};

export default colorField;
