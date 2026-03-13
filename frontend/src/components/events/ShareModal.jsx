import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const ShareModal = ({ isOpen, onClose, eventTitle, eventUrl }) => {
    const [isCopied, setIsCopied] = useState(false);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(eventUrl)}`;

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
                    text: `Join us for ${eventTitle}!`,
                    url: eventUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            handleCopy();
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
                    <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 transition-transform duration-500 group-hover:scale-[1.02]">
                        <img 
                            src={qrCodeUrl} 
                            alt="Event QR Code" 
                            className="w-48 h-48 rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={handleDownloadQR}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all"
                            >
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <h4 className="text-lg font-black text-gray-900 tracking-tight">Scan to Access</h4>
                    <p className="text-xs text-gray-500 font-medium">Point your camera to view event details</p>
                </div>

                {/* Sharing Options */}
                <div className="w-full space-y-3">
                    {navigator.share && (
                        <Button 
                            variant="primary" 
                            fullWidth 
                            onClick={handleNativeShare}
                            leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>}
                        >
                            Share via Social Apps
                        </Button>
                    )}
                    
                    <div className="relative group">
                        <input 
                            type="text" 
                            readOnly 
                            value={eventUrl}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-xs font-medium text-gray-400 outline-none pr-24"
                        />
                        <button 
                            onClick={handleCopy}
                            className="absolute right-2 top-1.5 bottom-1.5 px-4 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md active:scale-95"
                        >
                            {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>

                    <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest pt-2">
                        {eventUrl.includes('private=true') ? '🔒 Private Link Protected' : '🌐 Public Discovery Link'}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default ShareModal;
