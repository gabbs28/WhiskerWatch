import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import './CircularLoading.module.css';

export interface CircularLoadingProperties {
    loading?: boolean;
}

const CircularLoading: React.FC<CircularLoadingProperties> = ({ loading = true }) => {
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default CircularLoading;
