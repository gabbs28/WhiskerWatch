import React, { useEffect, useState } from 'react';
import './Homepage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { logout, restore } from '../../redux/session';
import { Box, Button, Container, Typography } from '@mui/material';
import LoginForm from '../../components/modules/LoginForm';
import LoginFormModal from '../../components/modules/LoginFormModal';
import SignupForm from '../../components/modules/SignupForm';
import SignupFormModal from '../../components/modules/SignupFormModal';
import { LineChart } from '@mui/x-charts/LineChart';

const Homepage: React.FC = () => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const user = useSelector((state: RootState) => state.session.user);

    // State
    const [showLoginFormModal, setShowLoginFormModal] = useState<boolean>(false);
    const [showSignupFormModal, setShowSignupFormModal] = useState<boolean>(false);

    // Handlers
    const handleOpenLoginFormModal = () => setShowLoginFormModal(true);
    const handleCloseLoginFormModal = () => setShowLoginFormModal(false);

    const handleOpenSignupFormModal = () => setShowSignupFormModal(true);
    const handleCloseSignupFormModal = () => setShowSignupFormModal(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    // On load
    useEffect(() => {
        dispatch(restore());
    }, [dispatch]);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    <p>Material UI Vite.js example in TypeScript</p>
                </Typography>

                {!user?.data && (
                    <Container maxWidth="sm">
                        <LoginFormModal
                            open={showLoginFormModal}
                            onClose={handleCloseLoginFormModal}
                        />
                        <Button onClick={handleOpenLoginFormModal}>Show Login Form Modal</Button>
                        <LoginForm />
                        <SignupFormModal
                            open={showSignupFormModal}
                            onClose={handleCloseSignupFormModal}
                        />
                        <Button onClick={handleOpenSignupFormModal}>Show Signup Form Modal</Button>
                        <SignupForm />
                    </Container>
                )}

                {user?.data && (
                    <Container maxWidth="sm">
                        <p>Hello {user.data.username}!</p>
                        <Button variant="contained" color="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Container>
                )}

                <LineChart
                    xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: 'Imp Around' }]}
                    yAxis={[
                        {
                            label: 'Find Out',
                        },
                    ]}
                    series={[
                        {
                            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        },
                    ]}
                    width={500}
                    height={400}
                />
            </Box>
        </Container>
    );
};

export default Homepage;
