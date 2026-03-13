import React from 'react';
import Button from '../ui/Button';

/**
 * CheckoutButton - Final action button for checkout.
 * Shows "Register for Free" for free events, otherwise "Pay $X & Get Tickets".
 */
const CheckoutButton = ({ isLoading, disabled, totalAmount, isFree }) => {
    return (
        <Button
            type="submit"
            size="xl"
            fullWidth
            isLoading={isLoading}
            disabled={disabled}
            className={`shadow-xl mt-6 ${isFree ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'shadow-indigo-100'}`}
            rightIcon={!isLoading && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            )}
        >
            {isFree ? 'Register for Free' : `Pay $${totalAmount} & Get Tickets`}
        </Button>
    );
};

export default CheckoutButton;
