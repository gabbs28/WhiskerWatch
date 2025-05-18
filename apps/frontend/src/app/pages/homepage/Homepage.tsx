import React, { useEffect, useState } from 'react';
import './Homepage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { logout, restore } from '../../redux/session';
import { pets } from '../../redux/pets';  
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoginForm from '../../components/modules/LoginForm';
import LoginFormModal from '../../components/modules/LoginFormModal';
import SignupForm from '../../components/modules/SignupForm';
import SignupFormModal from '../../components/modules/SignupFormModal';
import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar';
import { Box, Button, Container, Typography } from '@mui/material';


const Homepage: React.FC = () => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const user = useSelector((state: RootState) => state.session.user);
    const petss = useSelector((state: RootState) => state.pets.pets)
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));


    // On load
    useEffect(() => {
        dispatch(restore());
        dispatch(pets())
    }, [dispatch]);

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
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

                </Box>
            </Container>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={6}>
                        <Container>
                            <Box
                                sx={{
                                    my: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                }}
                            ></Box>
                            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                                <p>Pets</p>
                            </Typography>
                            <Stack direction="row" spacing={4}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 80, height: 80 }}/>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 80, height: 80 }}/>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 80, height: 80 }}/>
                            </Stack>
                
                        </Container>
                    </Grid>
                    <Grid size={6}>
                         <Container>
                            <Box
                                sx={{
                                    my: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                }}
                            ></Box>
                            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                                <p>Appointments</p>
                            </Typography>
                
                        </Container>
                    </Grid>
                    <Grid size={6}>
                        <Container>
                            <Box
                                sx={{
                                    my: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                }}
                            ></Box>
                            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                                <p>Quick Links</p>
                            </Typography>
                
                        </Container>
                    </Grid>
                    <Grid size={6}>
                        <Container>
                            <Box
                                sx={{
                                    my: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                }}
                            ></Box>
                            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                                <p>Member Forum</p>
                            </Typography>
                
                        </Container>
                    </Grid>
                </Grid>
            </Box>

       </>
    );
};

export default Homepage;