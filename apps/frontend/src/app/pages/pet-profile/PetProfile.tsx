import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function FormPropsTextFields() {
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
        <TextField
          required
          id="outlined-required"
          label="Name"
        />
      </div>
            <div>
        <Typography variant="subtitle1" gutterBottom>
            Breed
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Breed"
        />
      </div>
            <div>
        <Typography variant="subtitle1" gutterBottom>
            Birthday
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Birthday"
        />
      </div>
            <div>
        <Typography variant="subtitle1" gutterBottom>
            Gender
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Gender"
        />
      </div>
        <div>
        <Typography variant="subtitle1" gutterBottom>
            Spay/Neuter
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Spay/Neuter"
        />
      </div>
        <div>
        <Typography variant="subtitle1" gutterBottom>
            Weight
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Weight"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Color
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Color"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Hair Length
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Hair Length"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Fur Pattern
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Fur Pattern"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Allergies
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Allergies"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Photo
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Photo"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Microchip
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Microchip"
        />
      </div>
              <div>
        <Typography variant="subtitle1" gutterBottom>
            Medical Conditions
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Medical Conditions"
        />
      </div>

      
    </Box>
  );
}