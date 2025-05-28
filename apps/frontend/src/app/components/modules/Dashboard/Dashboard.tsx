import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function Dashboard() {
    return (
        <>
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                <p>Pet Name</p>
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 20, md: 4 }}>
                        <Item sx={{ height: 180 }}>Profile Overview</Item>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item sx={{ height: 180 }}>
                            Photo
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 200, height: 200 }}
                                />
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item sx={{ height: 180 }}>Notes</Item>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item sx={{ height: 180 }}>Medication Logs</Item>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item sx={{ height: 180 }}>Line Chart</Item>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item sx={{ height: 180 }}>Vet Visit Entry</Item>
                    </Grid>
                </Grid>
            </Box>
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
        </>
    );
}

export default Dashboard;
