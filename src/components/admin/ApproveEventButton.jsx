import React from 'react';
import Button from '../ui/Button';

/**
 * ApproveEventButton - Triggers event approval
 */
const ApproveEventButton = ({ onClick, loading }) => {
    return (
        <Button
            variant="success"
            size="sm"
            onClick={onClick}
            disabled={loading}
            className="flex items-center gap-2"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Approve
        </Button>
    );
};

export default ApproveEventButton;
