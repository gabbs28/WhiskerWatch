import React, { ChangeEvent, MouseEvent, useState } from 'react';
import './SignupForm.module.css';
import { Box, Container } from '@mui/material';
import { AppDispatch, type RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import FormRow from '../../form/FormRow';
import FormInput from '../../form/FormInput';
import FormPassword from '../../form/FormPassword';
import FormHeader from '../../form/FormHeader';
import FormSubmit from '../../form/FormSubmit';
import CircularLoading from '../../loading/CircularLoading';
import { signup, updateErrors } from '../../../redux/signup';
import { ModalContentsProperties } from '../../../lib/interfaces/modal.contents.properties';
import { userSchema, valid } from '@aa-mono-repo/common';

export type Field =
    | 'firstname'
    | 'lastname'
    | 'email'
    | 'username'
    | 'password'
    | 'password_confirmation';

const SignupForm: React.FC<ModalContentsProperties> = ({ onSuccess, onFailure }) => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const user = useSelector((state: RootState) => state.signup.user);

    // State
    const [firstname, setFirstname] = useState<string>('Jane');
    const [lastname, setLastname] = useState<string>('Doe');
    const [email, setEmail] = useState<string>('jane.doe@imp.com');
    const [username, setUsername] = useState<string>('jane.doe');
    const [password, setPassword] = useState<string>('Password123!');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('Password123!');

    // Handlers
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: Field,
    ) => {
        switch (field) {
            case 'firstname':
                setFirstname(event.target.value);
                break;
            case 'lastname':
                setLastname(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'password_confirmation':
                setPasswordConfirmation(event.target.value);
                break;
        }
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        // Prevent the default form submit behavior
        event.preventDefault();

        // Create the request body
        const body = {
            first_name: firstname,
            last_name: lastname,
            email,
            username,
            password,
            password_confirmation: passwordConfirmation,
        };

        // Validate
        if (!(await valid(userSchema, body, (errors) => dispatch(updateErrors(errors))))) {
            return;
        }

        // Dispatch the signup action
        dispatch(signup(body)).then((result) => {
            switch (result.type) {
                case signup.rejected.toString():
                    onFailure?.();
                    break;
                case signup.fulfilled.toString():
                    onSuccess?.();
                    break;
            }
        });
    };

    return (
        <Container id="login-form" maxWidth="sm">
            <CircularLoading loading={user.status === 'loading'} />
            <Box component="form">
                <FormHeader>Signup</FormHeader>
                <FormRow>
                    <FormInput
                        id="first_name"
                        label="First Name"
                        value={firstname}
                        helperText="Please enter your first name!"
                        required={true}
                        onChange={(event) => handleInputChange(event, 'username')}
                        error={!!user.errors.first_name}
                        errorMessage={user.errors.first_name ?? ''}
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="last_name"
                        label="Last Name"
                        value={lastname}
                        helperText="Please enter your last name!"
                        required={true}
                        onChange={(event) => handleInputChange(event, 'lastname')}
                        error={!!user.errors.last_name}
                        errorMessage={user.errors.last_name ?? ''}
                    />
                </FormRow>
                <FormRow>
                    <FormInput
                        id="email"
                        label="Email"
                        value={email}
                        helperText="Please enter your email!"
                        required={true}
                        onChange={(event) => handleInputChange(event, 'email')}
                        error={!!user.errors.email}
                        errorMessage={user.errors.email ?? ''}
                    />
                </FormRow>
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
                    <FormPassword
                        id="password_confirmation"
                        label="Password Confirmation"
                        value={passwordConfirmation}
                        helperText="Please reenter your password!"
                        required={true}
                        onChange={(event) => handleInputChange(event, 'password_confirmation')}
                        error={!!user.errors.password_confirmation}
                        errorMessage={user.errors.password_confirmation ?? ''}
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

export default SignupForm;
