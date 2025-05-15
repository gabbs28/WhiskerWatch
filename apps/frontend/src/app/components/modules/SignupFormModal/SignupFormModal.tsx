import React from 'react';
import './SignupFormModal.module.css';
import SignupForm from '../SignupForm';
import ModalContainer from '../../modal/ModalContainer';
import { ModalContainerProperties } from '../../../lib/interfaces/modal.container.properties';

const SignupFormModal: React.FC<ModalContainerProperties> = ({ open, onClose }) => {
    return (
        <ModalContainer open={open} onClose={onClose}>
            <SignupForm />
        </ModalContainer>
    );
};

export default SignupFormModal;
