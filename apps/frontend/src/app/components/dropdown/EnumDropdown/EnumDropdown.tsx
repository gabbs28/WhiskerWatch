import { FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormRow from '../../form/FormRow';

// Props interface for the dropdown
interface EnumDropdownProps<T extends string> {
    label: string;
    values: { [key: string]: T };
    value?: T;
    helperText: string;
    onChange?: (value: T) => void;
    error: boolean;
    errorMessage?: string;
    required?: boolean;
    formatter?: (value: T) => string;
}

// EnumDropdown component
export function EnumDropdown<T extends string>({
    label,
    values,
    value,
    helperText,
    onChange = (value) => {
        console.log(value);
    },
    error = false,
    errorMessage,
    required = true,
    formatter = (value) => value.replace(/_/g, ' '),
}: Readonly<EnumDropdownProps<T>>) {
    // Get possible values from the enumeration
    const options = Object.values(values);

    // Handlers
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as T);
    };

    return (
        <FormRow>
            <InputLabel error={error}>{label}</InputLabel>
            <Select
                value={value ?? ''}
                label={label}
                onChange={handleChange}
                required={required}
                error={error}
            >
                {options.map((breed) => (
                    <MenuItem key={breed} value={breed}>
                        {formatter(breed)}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={error}>{errorMessage ?? helperText}</FormHelperText>
        </FormRow>
    );
}

export default EnumDropdown;
