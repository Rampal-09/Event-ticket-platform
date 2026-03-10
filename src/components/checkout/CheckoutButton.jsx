import React from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

/**
 * CheckoutButton - Final action button for checkout
 */
const CheckoutButton = ({ isLoading, disabled, totalAmount }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigation is usually handled by the parent form submit
        // But if used as a standalone button:
        navigate(ROUTES.ORDER_SUCCESS);
    };

    return (
        <Button
            type="submit"
            size="xl"
            fullWidth
            isLoading={isLoading}
            disabled={disabled}
            className="shadow-xl shadow-indigo-100 mt-6"
            rightIcon={!isLoading && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            )}
        >
            Pay ${totalAmount} & Get Tickets
        </Button>
    );
};

export default CheckoutButton;
