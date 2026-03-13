import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

import { eventService } from '../../services/eventService';
import { ticketService } from '../../services/ticketService';

const QRScanner = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const eventId = searchParams.get('id');
    const [eventData, setEventData] = useState({ title: 'Loading...' });

    useEffect(() => {
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const data = await eventService.getPublicEventById(eventId);
                    setEventData(data);
                } catch (err) {
                    console.error('Fetch event error:', err);
                }
            };
            fetchEvent();
        }
    }, [eventId]);

    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [scanCount, setScanCount] = useState({ valid: 0, invalid: 0 });
    const [showShareToast, setShowShareToast] = useState(false);
    const [manualInput, setManualInput] = useState('');

    const handleStartScan = async () => {
        if (!manualInput && !isScanning) {
            setIsScanning(true);
            setTimeout(() => setIsScanning(false), 2000);
            return;
        }

        setIsScanning(true);
        try {
            // Validate using the manual input as the payload for now 
            // In a real mobile app, this would be the QR result
            const response = await ticketService.validateTicket(manualInput);
            
            setScanResult({
                isValid: true,
                isAlreadyUsed: false,
                ticketId: `TCK-${response.ticket.id}`,
                event: response.ticket.eventTitle,
                buyer: response.ticket.buyerEmail,
                seat: 'General Admission',
            });
            setScanCount(c => ({ ...c, valid: c.valid + 1 }));
            setShowResult(true);
            setManualInput('');
        } catch (err) {
            setScanResult({
                isValid: false,
                isAlreadyUsed: err.message?.includes('used'),
                ticketId: 'Invalid',
                event: eventData.title,
                buyer: 'Unknown',
                seat: 'N/A',
            });
            setScanCount(c => ({ ...c, invalid: c.invalid + 1 }));
            setShowResult(true);
        } finally {
            setIsScanning(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
    };

    const handleClose = () => {
        setShowResult(false);
        setScanResult(null);
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0F' }}>
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <button
                    onClick={() => navigate('/organizer/my-events')}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Portal
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Gate Scanner</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium">Valid</p>
                        <p className="text-lg font-black text-emerald-500">{scanCount.valid}</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <p className="text-xs text-gray-500 font-medium">Invalid</p>
                        <p className="text-lg font-black text-red-500">{scanCount.invalid}</p>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-black text-white tracking-tight">Ticket Validator</h1>
                    <p className="text-gray-500 text-sm">{eventData.title} — Gate A</p>
                </div>

                {/* Scanner Viewport */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                    {/* Camera area */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gray-900 border border-white/10">
                        {isScanning ? (
                            <>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-full flex items-center justify-center opacity-20">
                                        <svg viewBox="0 0 200 200" className="w-48 h-48 text-white" fill="currentColor">
                                            <rect x="10" y="10" width="55" height="55" rx="4" /><rect x="18" y="18" width="39" height="39" rx="2" fill="#0A0A0F" /><rect x="24" y="24" width="27" height="27" rx="1" />
                                            <rect x="135" y="10" width="55" height="55" rx="4" /><rect x="143" y="18" width="39" height="39" rx="2" fill="#0A0A0F" /><rect x="149" y="24" width="27" height="27" rx="1" />
                                            <rect x="10" y="135" width="55" height="55" rx="4" /><rect x="18" y="143" width="39" height="39" rx="2" fill="#0A0A0F" /><rect x="24" y="149" width="27" height="27" rx="1" />
                                            {[75, 86, 97, 108, 119, 130, 141].map(y => [75, 86, 97, 108, 119, 130, 141].map(x =>
                                                Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" /> : null
                                            ))}
                                        </svg>
                                    </div>
                                    <div
                                        className="absolute left-0 right-0 h-0.5 rounded-full animate-scan-beam"
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)', boxShadow: '0 0 12px 2px rgba(99,102,241,0.6)' }}
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-44 h-44 border-2 border-indigo-500/60 rounded-xl" />
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-700">
                                <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-40">Camera Ready</p>
                            </div>
                        )}
                    </div>

                    {/* Corner Brackets */}
                    {['top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl', 'top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl', 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl', 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl'].map((cls, i) => (
                        <div key={i} className={`absolute ${cls} border-indigo-500 w-8 h-8 m-1.5`} />
                    ))}
                </div>

                {/* Manual Input for Dev Testing */}
                <div className="w-64 sm:w-80 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Manual Payload Entry</label>
                    <input 
                        type="text" 
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        placeholder="Paste QR payload (e.g. 1:abc...)"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-700 outline-none focus:border-indigo-500/50 transition-all font-mono text-sm"
                    />
                </div>

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-3 w-64 sm:w-80">
                    <Button
                        variant="primary"
                        fullWidth
                        size="lg"
                        isLoading={isScanning}
                        onClick={handleStartScan}
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                    >
                        {isScanning ? 'Initializing Camera...' : 'Scan QR Code'}
                    </Button>
                    <Button
                        variant="ghost"
                        fullWidth
                        onClick={handleCopyLink}
                        className="bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm"
                        leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        }
                    >
                        Share Scanner Link
                    </Button>
                    <p className="text-xs text-gray-600 font-medium">Hold ticket QR code within the camera frame</p>
                </div>

                {/* Share Toast */}
                {showShareToast && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in-up">
                        Link copied to clipboard! 🚀
                    </div>
                )}
            </main>

            {/* Result Modal */}
            <Modal isOpen={showResult} onClose={handleClose} title="Scan Result" size="sm">
                {scanResult && (
                    <div className="flex flex-col items-center gap-6 py-2">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${scanResult.isValid ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
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
                                {scanResult.isValid ? 'Verified Entry' : scanResult.isAlreadyUsed ? 'Ticket Already Used' : 'Invalid Ticket'}
                            </h2>
                            <p className="text-gray-500 text-sm">{scanResult.ticketId}</p>
                        </div>

                        <div className="w-full bg-gray-50 rounded-2xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Buyer</span>
                                <span className="text-xs font-bold text-gray-900">{scanResult.buyer}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Seat</span>
                                <span className="text-xs font-bold text-gray-900">{scanResult.seat}</span>
                            </div>
                        </div>

                        <Button variant={scanResult.isValid ? 'success' : 'danger'} fullWidth onClick={handleClose}>
                            {scanResult.isValid ? 'Admit Person' : 'Close'}
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default QRScanner;
