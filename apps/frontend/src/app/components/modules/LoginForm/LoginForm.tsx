import React, { ChangeEvent, MouseEvent, useState } from 'react';
import './LoginForm.module.css';
import { Box, Container } from '@mui/material';
import { AppDispatch, type RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { login, updateErrors } from '../../../redux/session';
import FormRow from '../../form/FormRow';
import FormInput from '../../form/FormInput';
import FormPassword from '../../form/FormPassword';
import FormHeader from '../../form/FormHeader';
import FormSubmit from '../../form/FormSubmit';
import CircularLoading from '../../loading/CircularLoading';
import { ModalContentsProperties } from '../../../lib/interfaces/modal.contents.properties';
import { loginSchema, valid } from '@aa-mono-repo/common';

export type Field = 'username' | 'password';

const LoginForm: React.FC<ModalContentsProperties> = ({ onSuccess, onFailure }) => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const user = useSelector((state: RootState) => state.session.user);

    // State
    const [username, setUsername] = useState<string>('johndoe4');
    const [password, setPassword] = useState<string>('Password123!');

    // Handlers
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: Field,
    ) => {
        switch (field) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
        }
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        // Prevent the default form submit behavior
        event.preventDefault();

        // Create the request body
        const body = { username, password };

        // Validate
        if (!(await valid(loginSchema, body, (errors) => dispatch(updateErrors(errors))))) {
            return;
        }

        // Dispatch the login action
        dispatch(login(body)).then((result) => {
            switch (result.type) {
                case login.rejected.toString():
                    onFailure?.();
                    break;
                case login.fulfilled.toString():
                    onSuccess?.();
                    break;
            }
        });
    };

    return (
        <Container id="login-form" maxWidth="sm">
            <CircularLoading loading={user.status === 'loading'} />
            <Box component="form">
                <FormHeader>Login</FormHeader>
                <FormRow>
                    <FormInput
                        id="username"
                        label="Username"
                        value={username}
                        helperText="Please choose a username!"
                        required={true}
                        onChange={(event) => handleInputChange(event, 'username')}
                        error={!!user.errors.username}
                        errorMessage={user.errors.username ?? ''}
                    />
                </FormRow>
                <FormRow>
                    <FormPassword
                        id="password"
                        label="Password"
                        value={password}
                        helperText="Please choose a secure password!"
                        required={true}
                        onChange={(event) => handleInputChange(event, 'password')}
                        error={!!user.errors.password}
                        errorMessage={user.errors.password ?? ''}
                    />
                </FormRow>
                <FormRow>
                    <FormSubmit
                        id="login-form"
                        onClick={handleSubmit}
                        error={!!user.errors.message}
                        errorMessage={user.errors.message ?? ''}
                    />
                </FormRow>
            </Box>
        </Container>
    );
};

export default LoginForm;
