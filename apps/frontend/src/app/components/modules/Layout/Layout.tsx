import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { restore } from '../../../redux/session';
import LoginForm from '../LoginForm';
import { Box, styled, Typography, TypographyProps } from '@mui/material';
import SignupForm from '../SignupForm';
import * as React from 'react';

const ClickableTypography = styled((props: TypographyProps) => <Typography {...props} />)({
    cursor: 'pointer',
});

function Layout() {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const user = useSelector((state: RootState) => state.session.user);

    // State
    const [showLogin, setShowLogin] = useState<boolean>(true);

    // Attempt to restore user onload
    useEffect(() => {
        dispatch(restore());
    }, [dispatch]);

    // If logged in
    if (user.data) {
        return ShowLoggedIn();
    }

    return ShowLoggedOut(showLogin, setShowLogin);
}

function ShowLoggedIn() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

function ShowLoggedOut(showLogin: boolean, setShowLogin: (showLogin: boolean) => void) {
    if (showLogin) {
        return ShowLogin(() => setShowLogin(false));
    }

    return ShowSignup(() => setShowLogin(true));
}

function ShowLogin(onClick: (event: React.MouseEvent<HTMLElement>) => void) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            minHeight="100vh"
        >
            <LoginForm />
            <ClickableTypography onClick={onClick}>
                Need to sign up? Click here to signup!
            </ClickableTypography>
        </Box>
    );
}

function ShowSignup(onClick: (event: React.MouseEvent<HTMLElement>) => void) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            minHeight="100vh"
        >
            <SignupForm />
            <ClickableTypography onClick={onClick}>
                Already have an account? Click here to login!
            </ClickableTypography>
        </Box>
    );
}

export default Layout;
