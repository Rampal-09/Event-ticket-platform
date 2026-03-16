import React, { useState, useRef } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { QRCodeCanvas } from 'qrcode.react';
import { jsPDF } from 'jspdf';

const ShareModal = ({ isOpen, onClose, eventTitle, eventId, isPublic }) => {
    const [isCopied, setIsCopied] = useState(false);
    const qrRef = useRef(null);

    const baseUrl = import.meta.env.VITE_PUBLIC_URL || window.location.origin;
    const eventLink = `${baseUrl}/events/${eventId}${!isPublic ? '?private=true' : ''}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(eventLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: eventTitle,
                    text: `Join us for ${eventTitle} on EventHubix!`,
                    url: eventLink,
                });
            } catch (err) {
                console.error('Error sharing:', err);
                handleCopy();
            }
        } else {
            handleCopy();
        }
    };

    const downloadAsPNG = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;
        
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `QR_${eventTitle.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadAsPDF = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        
        // Premium Layout for PDF
        pdf.setFontSize(22);
        pdf.setTextColor(99, 102, 241); // Indigo color
        pdf.text('EventHubix', 105, 20, { align: 'center' });
        
        pdf.setFontSize(16);
        pdf.setTextColor(31, 41, 55); // Gray-800
        pdf.text(eventTitle, 105, 35, { align: 'center' });
        
        pdf.addImage(imgData, 'PNG', 45, 50, 120, 120);
        
        pdf.setFontSize(10);
        pdf.setTextColor(107, 114, 128); // Gray-500
        pdf.text('Scan this QR code to view event details', 105, 180, { align: 'center' });
        pdf.text(eventLink, 105, 188, { align: 'center' });
        
        pdf.save(`QR_${eventTitle.replace(/\s+/g, '_')}.pdf`);
    };

    const socialLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`Join us for ${eventTitle}: ${eventLink}`)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Excited for ${eventTitle}! Join me here:`)}&url=${encodeURIComponent(eventLink)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(eventLink)}&text=${encodeURIComponent(`Join us for ${eventTitle}`)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventLink)}`
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invite & Share" size="sm">
            <div className="flex flex-col items-center space-y-8 py-4 px-2">
                
                {/* 1. QR Code Section with Premium Hover Effects */}
                <div className="relative group">
                    <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500" ref={qrRef}>
                        <QRCodeCanvas
                            value={eventLink}
                            size={192} // w-48 equivalent
                            level="H"
                            includeMargin={false}
                            className="rounded-xl"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6">
                            <button 
                                onClick={downloadAsPNG}
                                className="w-full bg-white text-indigo-600 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Save as PNG
                            </button>
                            <button 
                                onClick={downloadAsPDF}
                                className="w-full bg-indigo-500 text-white py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-400 transition-colors shadow-lg border border-indigo-400/50 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                Save as PDF
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Scan or Hover to download</p>
                </div>

                {/* 2. Social Apps Section */}
                <div className="w-full space-y-6">
                    <Button 
                        variant="primary" 
                        fullWidth 
                        size="lg"
                        onClick={handleNativeShare}
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 py-4 font-bold rounded-2xl"
                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>}
                    >
                        Share via Social Apps
                    </Button>

                    <div className="flex justify-center gap-5">
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-green-50 text-green-600 rounded-2xl hover:bg-green-100 transition-all hover:scale-110 shadow-sm border border-green-100">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.12.554 4.189 1.602 6.033L0 24l6.117-1.605a11.83 11.83 0 005.925 1.583h.005c6.634 0 12.032-5.391 12.036-12.029a11.85 11.85 0 00-3.517-8.487"/></svg>
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-gray-50 text-gray-900 rounded-2xl hover:bg-gray-100 transition-all hover:scale-110 shadow-sm border border-gray-100">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-sky-50 text-sky-600 rounded-2xl hover:bg-sky-100 transition-all hover:scale-110 shadow-sm border border-sky-100">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.192l-1.956 9.21c-.145.647-.532.808-1.077.502L11.516 15.6l-1.456 1.4c-.16.16-.296.296-.607.296l.217-3.074 5.604-5.064c.243-.217-.054-.338-.376-.12l-6.93 4.364-2.984-.932c-.648-.204-.66-.648.136-.957l11.666-4.496c.54-.197 1.011.127.832.873z" /></svg>
                        </a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-blue-50 text-blue-700 rounded-2xl hover:bg-blue-100 transition-all hover:scale-110 shadow-sm border border-blue-100">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </div>
                </div>

                <hr className="w-full border-gray-100" />

                {/* 3. Link Section */}
                <div className="w-full space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Public Link</label>
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            value={eventLink}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-[11px] font-bold text-gray-500 outline-none pr-32 focus:border-indigo-500 transition-all"
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-95"
                        >
                            {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>

                {/* Toast Animation */}
                {isCopied && (
                    <div className="flex justify-center -mt-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 animate-bounce">
                            Event link copied! 🚀
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ShareModal;
