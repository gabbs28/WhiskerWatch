import React from 'react';
import './LoginFormModal.module.css';
import LoginForm from '../LoginForm';
import { ModalContainerProperties } from '../../../lib/interfaces/modal.container.properties';
import ModalContainer from '../../modal/ModalContainer';

const LoginFormModal: React.FC<ModalContainerProperties> = ({ open, onClose }) => {
    return (
        <ModalContainer open={open} onClose={onClose}>
            <LoginForm onSuccess={onClose} />
        </ModalContainer>
    );
};

export default LoginFormModal;
