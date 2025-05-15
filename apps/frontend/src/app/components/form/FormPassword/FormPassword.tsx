import React, { MouseEvent, useState } from 'react';
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import './FormPassword.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface FormPasswordProperties {
    id: string;
    label: string;
    value: string;
    helperText: string;
    required: boolean;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error: boolean;
    errorMessage: string;
}

const FormPassword: React.FC<FormPasswordProperties> = ({
    id,
    label,
    value,
    helperText,
    required,
    onChange,
    error,
    errorMessage,
}) => {
    // State
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Handler
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <InputLabel htmlFor={id} error={error}>
                {label}
            </InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                label={label}
                aria-describedby={`${id}-helper-text`}
                value={value}
                onChange={onChange}
                required={required}
                error={error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id={`${id}-helper-text`} error={error}>
                {errorMessage ?? helperText}
            </FormHelperText>
        </>
    );
};

export default FormPassword;
