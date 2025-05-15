import { styled, Typography, TypographyProps } from '@mui/material';

const FormHeader = styled((props: TypographyProps) => <Typography variant="h4" {...props} />)({
    marginBottom: '10px',
});

export default FormHeader;
