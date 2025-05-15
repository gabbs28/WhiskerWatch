import { FormControl, FormControlProps, styled } from '@mui/material';

const FormRow = styled((props: FormControlProps) => <FormControl variant="outlined" {...props} />)({
    marginBottom: '20px',
    width: '50ch',
});

export default FormRow;
