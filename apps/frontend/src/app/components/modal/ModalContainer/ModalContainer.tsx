import React, { ReactNode } from 'react';
import './ModalContainer.module.css';
import { Box, Modal } from '@mui/material';
import { ModalContainerProperties } from '../../../lib/interfaces/modal.container.properties';

interface Properties extends ModalContainerProperties {
  children: ReactNode;
}

const ModalContainer: React.FC<Properties> = ({ open, onClose, children }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={(theme) => ({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'background.paper',
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(4),
                    outline: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                })}
            >
                <>{children}</>
            </Box>
        </Modal>
    );
};

export default ModalContainer;
