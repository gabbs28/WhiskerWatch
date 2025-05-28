import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { getPetByID } from '../../redux/pet';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CircularLoading from '../../components/loading/CircularLoading';
import { breed_type } from '../../../database/enums';
import EnumDropdown from '../../components/dropdown/EnumDropdown';

export default function FormPropsTextFields() {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { refresh } = useOutletContext<{ refresh: () => void }>();
    const { id } = useParams<{ id: string }>();

    // Redux state
    const pet = useSelector((state: RootState) => state.pet.pet);

    // On load
    useEffect(() => {
        dispatch(getPetByID({ id: Number(id) }))
            .unwrap()
            .catch(() => {
                navigate('/pets');
                refresh();
            });
    }, [dispatch, navigate, refresh, id]);

    // Early out if loading
    if (pet.status !== 'success' || pet.data == null) {
        return <CircularLoading />;
    }

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Name
                </Typography>
                <TextField required id="outlined-required" label="Name" value={pet.data.name} />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Breed
                </Typography>
                <EnumDropdown
                    label={'Breed'}
                    values={breed_type}
                    value={pet.data.breed}
                    helperText={'Please choose a breed!'}
                    error={false}
                />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Birthday
                </Typography>
                <TextField required id="outlined-required" label="Birthday" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Gender
                </Typography>
                <TextField required id="outlined-required" label="Gender" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Spay/Neuter
                </Typography>
                <TextField required id="outlined-required" label="Spay/Neuter" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Weight
                </Typography>
                <TextField required id="outlined-required" label="Weight" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Color
                </Typography>
                <TextField required id="outlined-required" label="Color" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Hair Length
                </Typography>
                <TextField required id="outlined-required" label="Hair Length" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Fur Pattern
                </Typography>
                <TextField required id="outlined-required" label="Fur Pattern" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Allergies
                </Typography>
                <TextField required id="outlined-required" label="Allergies" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Photo
                </Typography>
                <TextField required id="outlined-required" label="Photo" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Microchip
                </Typography>
                <TextField required id="outlined-required" label="Microchip" />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Medical Conditions
                </Typography>
                <TextField required id="outlined-required" label="Medical Conditions" />
            </div>
        </Box>
    );
}
