import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import './FormSubmit.module.css';

export interface FormSubmitProperties {
    id: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    error: boolean;
    errorMessage: string;
}

const FormSubmit: React.FC<FormSubmitProperties> = ({ id, onClick, error, errorMessage }) => {
    return (
        <Container maxWidth="sm">
            <Button variant="contained" color="primary" form={id} onClick={onClick}>
                Submit
            </Button>
            <Typography
                variant="body2"
                color="error"
                hidden={!error}
                sx={() => ({
                    marginTop: '10px',
                })}
            >
                {errorMessage ?? 'Something went wrong!'}
            </Typography>
        </Container>
    );
};

export default FormSubmit;
