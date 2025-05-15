import React from 'react';
import { FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import './FormInput.module.css';

export interface FormInputProperties {
    id: string;
    label: string;
    value: string;
    helperText: string;
    required: boolean;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error: boolean;
    errorMessage: string;
}

const FormInput: React.FC<FormInputProperties> = ({
    id,
    label,
    value,
    helperText,
    required,
    onChange,
    error,
    errorMessage,
}) => {
    return (
        <>
            <InputLabel htmlFor={id} error={error}>
                {label}
            </InputLabel>
            <OutlinedInput
                id={id}
                label={label}
                aria-describedby={`${id}-helper-text`}
                value={value}
                onChange={onChange}
                required={required}
                error={error}
            />
            <FormHelperText id={`${id}-helper-text`} error={error}>
                {errorMessage ?? helperText}
            </FormHelperText>
        </>
    );
};

export default FormInput;
