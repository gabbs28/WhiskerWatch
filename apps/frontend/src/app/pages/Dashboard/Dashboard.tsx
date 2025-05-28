import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Container, Typography } from '@mui/material';


function Dashboard() {
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

    return (
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
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 80, height: 80 }}
                            />
                            <Avatar
                                alt="Travis Howard"
                                src="/static/images/avatar/2.jpg"
                                sx={{ width: 80, height: 80 }}
                            />
                            <Avatar
                                alt="Cindy Baker"
                                src="/static/images/avatar/3.jpg"
                                sx={{ width: 80, height: 80 }}
                            />
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
    );
}

export default Dashboard;
