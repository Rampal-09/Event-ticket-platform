import React, { useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

/**
 * TicketScanner - Core QR scanning interface
 */
const TicketScanner = ({ onScanSuccess, eventTitle }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleStartScan = () => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            setIsScanning(false);
            const isValid = Math.random() > 0.2;
            const res = {
                isValid,
                ticketId: `TCK-${Math.floor(100000 + Math.random() * 900000)}`,
                buyer: 'alex.thompson@example.com',
                seat: 'GA - Section A'
            };
            setScanResult(res);
            setShowResult(true);
            if (isValid) {
                onScanSuccess?.(res);
            }
        }, 1800);
    };

    return (
        <div className="flex flex-col items-center gap-8 py-8">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Camera viewport simulation */}
                <div className="absolute inset-0 bg-[#0A0A0F] rounded-3xl border border-white/10 overflow-hidden">
                    {isScanning ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full opacity-20 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-48 h-48 text-indigo-500" fill="currentColor">
                                    <rect x="10" y="10" width="20" height="20" />
                                    <rect x="70" y="10" width="20" height="20" />
                                    <rect x="10" y="70" width="20" height="20" />
                                    <rect x="40" y="40" width="20" height="20" />
                                </svg>
                            </div>
                            <div className="absolute left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)] animate-scan-beam" />
                            <div className="w-44 h-44 border-2 border-indigo-500/50 rounded-2xl" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            </svg>
                            <p className="text-[10px] font-black uppercase tracking-widest">Scanner Ready</p>
                        </div>
                    )}
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-indigo-600 rounded-tl-2xl" />
                <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-indigo-600 rounded-tr-2xl" />
                <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-indigo-600 rounded-bl-2xl" />
                <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-indigo-600 rounded-br-2xl" />
            </div>

            <Button
                variant="primary"
                size="xl"
                isLoading={isScanning}
                onClick={handleStartScan}
                className="px-12 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
            >
                {isScanning ? 'Processing...' : 'Scan QR Ticket'}
            </Button>

            {/* Result Modal */}
            <Modal isOpen={showResult} onClose={() => setShowResult(false)} title="Scan Result" size="sm">
                {scanResult && (
                    <div className="flex flex-col items-center gap-6 py-2">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${scanResult.isValid ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {scanResult.isValid ? (
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>

                        <div className="text-center space-y-1">
                            <h2 className="text-xl font-black text-gray-900">
                                {scanResult.isValid ? 'Verified Entry' : 'Invalid Ticket'}
                            </h2>
                            <p className="text-gray-400 text-sm font-mono font-bold">{scanResult.ticketId}</p>
                        </div>

                        {scanResult.isValid && (
                            <div className="w-full bg-gray-50 rounded-2xl p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Buyer</span>
                                    <span className="text-xs font-bold text-gray-900">{scanResult.buyer}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Zone</span>
                                    <span className="text-xs font-bold text-gray-900">{scanResult.seat}</span>
                                </div>
                            </div>
                        )}

                        <Button
                            variant={scanResult.isValid ? 'success' : 'danger'}
                            fullWidth
                            onClick={() => setShowResult(false)}
                            size="lg"
                        >
                            {scanResult.isValid ? 'Admit Person' : 'Back to Scanner'}
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TicketScanner;
