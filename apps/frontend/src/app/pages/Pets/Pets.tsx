import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { getAllPets } from '../../redux/pet';
import { useEffect, useState } from 'react';
import CircularLoading from '../../components/loading/CircularLoading';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormRow from '../../components/form/FormRow';

function Pets() {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Redux state
    const pets = useSelector((state: RootState) => state.pet.pets);

    // State
    const [selected, setSelected] = useState<string>(id ?? '');

    // Handlers
    const handleChange = (event: SelectChangeEvent) => {
        // Update state
        setSelected(event.target.value);

        // Load pet
        navigate('/pets/' + event.target.value);
    };

    // On load
    useEffect(() => {
        dispatch(getAllPets());
    }, [dispatch]);

    return (
        <>
            <CircularLoading loading={pets.status === 'loading'} />
            <FormRow>
                <InputLabel error={false}>Select a Pet</InputLabel>
                <Select value={selected} label="Select a Pet" onChange={handleChange}>
                    {pets.data &&
                        pets.data.length > 0 &&
                        pets.data.map((pet) => (
                            <MenuItem key={pet.id} value={pet.id.toString()}>
                                {pet.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormRow>
            <Outlet
                context={{
                    refresh: () => setSelected(''),
                }}
            />
        </>
    );
}

export default Pets;
