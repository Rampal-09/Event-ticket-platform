import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const QRScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [scanCount, setScanCount] = useState({ valid: 7, invalid: 1 });

    const handleStartScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            const isValid = Math.random() > 0.25;
            const isAlreadyUsed = !isValid && Math.random() > 0.5;
            setScanResult({
                isValid,
                isAlreadyUsed,
                ticketId: `TCK-${Math.floor(100000 + Math.random() * 900000)}`,
                event: 'Summer Music Festival 2026',
                buyer: 'john.doe@example.com',
                seat: 'General Admission',
            });
            setScanCount(c => isValid ? { ...c, valid: c.valid + 1 } : { ...c, invalid: c.invalid + 1 });
            setShowResult(true);
        }, 2200);
    };

    const handleClose = () => {
        setShowResult(false);
        setScanResult(null);
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0F' }}>
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <a href="/organizer" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Portal
                </a>
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
                    <p className="text-gray-500 text-sm">Summer Music Festival 2026 — Gate A</p>
                </div>

                {/* Scanner Viewport */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80">
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
                                    {/* Scan beam */}
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

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                    <button
                        onClick={handleStartScan}
                        disabled={isScanning}
                        className={`w-full py-5 rounded-2xl text-lg font-black uppercase tracking-wider transition-all duration-300 ${isScanning
                                ? 'bg-indigo-900/50 text-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900/80 active:scale-95'
                            }`}
                    >
                        {isScanning ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Scanning…
                            </span>
                        ) : 'Scan QR Code'}
                    </button>
                    <p className="text-xs text-gray-600 font-medium">Hold ticket QR code within the camera frame</p>
                </div>
            </main>

            {/* Result Modal */}
            <Modal isOpen={showResult} onClose={handleClose} title="Scan Result" size="sm">
                {scanResult && (
                    <div className="flex flex-col items-center gap-6 py-2">
                        {/* Result Icon */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${scanResult.isValid ? 'bg-emerald-100' : 'bg-red-100'
                            }`}>
                            {scanResult.isValid ? '✅' : '❌'}
                        </div>

                        {/* Status Text */}
                        <div className="text-center">
                            <p className={`text-2xl font-black ${scanResult.isValid ? 'text-emerald-600' : 'text-red-600'}`}>
                                {scanResult.isValid ? 'Valid Ticket' : scanResult.isAlreadyUsed ? 'Already Used' : 'Invalid Ticket'}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">{scanResult.event}</p>
                        </div>

                        {/* Ticket Info */}
                        <div className="w-full bg-gray-50 rounded-2xl p-4 space-y-3">
                            {[
                                { label: 'Ticket ID', value: scanResult.ticketId },
                                { label: 'Attendee', value: scanResult.buyer },
                                { label: 'Ticket Type', value: scanResult.seat },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{row.label}</span>
                                    <span className="font-semibold text-gray-800 truncate max-w-[180px] text-right">{row.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="w-full space-y-3">
                            {scanResult.isValid && (
                                <button
                                    onClick={handleClose}
                                    className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-200"
                                >
                                    ✓ Mark Entry
                                </button>
                            )}
                            <button
                                onClick={handleClose}
                                className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Scan Next Ticket
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default QRScanner;
