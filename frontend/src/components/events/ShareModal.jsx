import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { jsPDF } from 'jspdf';

const ShareModal = ({ isOpen, onClose, eventTitle, eventUrl }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(eventUrl)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(eventUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: eventTitle,
                    text: `Join us for ${eventTitle}! Scan to book tickets.`,
                    url: eventUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            handleCopy();
        }
    };

    const handleDownloadPDF = async () => {
        setIsGeneratingPdf(true);
        try {
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Set background and styling
            doc.setFillColor(249, 250, 251); // Gray-50
            doc.rect(0, 0, 210, 297, 'F');
            
            // Add Logo/Header area
            doc.setFillColor(79, 70, 229); // Indigo-600
            doc.rect(0, 0, 210, 40, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(24);
            doc.text('EVENT ACCESS PASS', 105, 25, { align: 'center' });

            // Event Details
            doc.setTextColor(17, 24, 39); // Gray-900
            doc.setFontSize(32);
            doc.text(eventTitle.toUpperCase(), 105, 70, { align: 'center', maxWidth: 180 });

            // QR Code
            const response = await fetch(qrCodeUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            
            const qrBase64 = await new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });

            // Draw QR Background
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(55, 90, 100, 100, 10, 10, 'F');
            doc.addImage(qrBase64, 'PNG', 60, 95, 90, 90);

            // Access Instructions
            doc.setFontSize(14);
            doc.setTextColor(107, 114, 128); // Gray-500
            doc.text('Scan this QR code with your phone camera to access', 105, 205, { align: 'center' });
            doc.text('event details and book tickets directly.', 105, 212, { align: 'center' });

            // URL
            doc.setTextColor(79, 70, 229);
            doc.setFontSize(12);
            doc.text(eventUrl, 105, 230, { align: 'center' });

            // Footer
            doc.setFontSize(10);
            doc.setTextColor(156, 163, 175);
            doc.text('Powered by Event Ticket Platform', 105, 280, { align: 'center' });

            doc.save(`${eventTitle.replace(/\s+/g, '_')}_Access_Pass.pdf`);
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const handleDownloadQR = async () => {
        try {
            const response = await fetch(qrCodeUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${eventTitle.replace(/\s+/g, '_')}_QR.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading QR:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invite & Share" size="sm">
            <div className="flex flex-col items-center space-y-8 py-4">
                {/* QR Code Section */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 transition-transform duration-500 group-hover:scale-[1.02]">
                        <img 
                            src={qrCodeUrl} 
                            alt="Event QR Code" 
                            className="w-52 h-52 rounded-2xl"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 backdrop-blur-sm rounded-[2.5rem]">
                            <button 
                                onClick={handleDownloadQR}
                                className="bg-white text-gray-900 border border-gray-100 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-gray-50 transition-all active:scale-95"
                            >
                                Download Image
                            </button>
                            <button 
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPdf}
                                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">Scan to Access</h4>
                    <p className="text-xs text-gray-500 font-medium">Point your camera to view event details</p>
                </div>

                {/* Sharing Options */}
                <div className="w-full space-y-4">
                    <Button 
                        variant="primary" 
                        fullWidth 
                        size="lg"
                        onClick={handleNativeShare}
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 py-4"
                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>}
                    >
                        Share via Social Apps
                    </Button>
                    
                    <div className="relative group">
                        <input 
                            type="text" 
                            readOnly 
                            value={eventUrl}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-xs font-bold text-gray-400 outline-none pr-32"
                        />
                        <button 
                            onClick={handleCopy}
                            className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-95"
                        >
                            {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-2 pt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {eventUrl.includes('private=true') ? (
                            <><span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span> Private Link Protected</>
                        ) : (
                            <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Public Discovery Link</>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ShareModal;
