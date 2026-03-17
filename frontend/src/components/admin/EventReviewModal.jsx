import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * EventReviewModal - Admin interface for reviewing and moderating events
 */
const EventReviewModal = ({ isOpen, onClose, event, onApprove, onReject }) => {
    const { formatPrice } = useCurrency();
    const [rejectionReason, setRejectionReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRejectionForm, setShowRejectionForm] = useState(false);

    if (!event) return null;

    const handleApprove = async () => {
        setIsSubmitting(true);
        await onApprove?.(event.id);
        setIsSubmitting(false);
        onClose();
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) return;
        setIsSubmitting(true);
        await onReject?.(event.id, rejectionReason);
        setIsSubmitting(false);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Review Event Submission"
            size="lg"
        >
            <div className="space-y-6">
                {/* Event Preview Summary */}
                <div className="flex gap-6 items-start bg-gray-50 rounded-2xl p-4">
                    <img
                        src={event.image || 'https://via.placeholder.com/150'}
                        alt={event.title}
                        className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {event.category}
                        </span>
                        <h3 className="text-xl font-black text-gray-900 mt-1">{event.title}</h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">Submitted by {event.organizer?.name || (typeof event.organizer === 'string' ? event.organizer : 'Unknown')}</p>
                        <div className="flex gap-4 mt-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
                            <span>{formatPrice(event.ticketPrice)} Ticket</span>
                            <span>•</span>
                            <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Detailed Info */}
                <div className="space-y-4">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Description</h4>
                    <p className="text-sm text-gray-600 leading-relaxed max-h-40 overflow-y-auto">
                        {event.description}
                    </p>
                </div>

                {/* Actions */}
                {!showRejectionForm ? (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                        <Button
                            variant="primary"
                            fullWidth
                            isLoading={isSubmitting}
                            onClick={handleApprove}
                            className="bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-100"
                        >
                            Approve Event
                        </Button>
                        <Button
                            variant="danger"
                            fullWidth
                            disabled={isSubmitting}
                            onClick={() => setShowRejectionForm(true)}
                        >
                            Reject & Message
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 pt-4 border-t border-gray-100 animate-fade-in">
                        <label className="text-sm font-bold text-gray-700">Reason for Rejection</label>
                        <textarea
                            className="w-full h-32 px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:border-indigo-500 transition-all text-sm"
                            placeholder="Explain why this event cannot be approved (e.g. invalid location, prohibited content...)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="flex gap-3">
                            <Button
                                variant="danger"
                                fullWidth
                                isLoading={isSubmitting}
                                onClick={handleReject}
                                disabled={!rejectionReason.trim()}
                            >
                                Confirm Rejection
                            </Button>
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => setShowRejectionForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default EventReviewModal;
