import React from 'react';
import Button from '../ui/Button';

/**
 * RejectEventButton - Triggers rejection
 */
const RejectEventButton = ({ onClick, loading }) => {
    return (
        <Button
            variant="danger"
            size="sm"
            onClick={onClick}
            disabled={loading}
            className="flex items-center gap-2"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reject
        </Button>
    );
};

export default RejectEventButton;
