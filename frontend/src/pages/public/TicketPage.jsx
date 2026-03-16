import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TicketCard from '../../components/tickets/TicketCard';
import TicketDetails from '../../components/tickets/TicketDetails';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../router/routes';
import { ticketService } from '../../services/ticketService';
import { useToast } from '../../components/ui/Toast';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import '../../styles/TicketPrint.css';

const TicketPage = () => {
    const { addToast } = useToast();
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [ticketData, setTicketData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [error, setError] = React.useState(null);
    const ticketRef = React.useRef(null);

    const handleDownloadPDF = async () => {
        if (!ticketRef.current || isGenerating) return;
        
        setIsGenerating(true);
        addToast('Generating your PDF ticket...', 'info');
        
        try {
            const dataUrl = await htmlToImage.toPng(ticketRef.current, {
                quality: 1.0,
                pixelRatio: 3, // High precision for PDF
                backgroundColor: '#ffffff',
                style: {
                    transform: 'none',
                    transition: 'none'
                }
            });
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const img = new Image();
            img.src = dataUrl;
            
            await new Promise((resolve) => (img.onload = resolve));
            
            const ratio = img.height / img.width;
            const imgWidth = pdfWidth * 0.75; 
            const imgHeight = imgWidth * ratio;
            
            // Center the ticket
            const xOffset = (pdfWidth - imgWidth) / 2;
            const yOffset = (pdfHeight - imgHeight) / 2;
            
            pdf.addImage(dataUrl, 'PNG', xOffset, yOffset - 10, imgWidth, imgHeight);
            
            pdf.save(`Ticket-${ticketData.event.title.replace(/\s+/g, '-')}-${ticketId}.pdf`);
            addToast('Ticket downloaded successfully!', 'success');
        } catch (err) {
            console.error('PDF Generation failed:', err);
            addToast('Failed to generate PDF. Using browser print instead.', 'warning');
            window.print();
        } finally {
            setIsGenerating(false);
        }
    };

    React.useEffect(() => {
        const fetchTicket = async () => {
            setIsLoading(true);
            try {
                const sanitizedId = ticketId?.replace('TCK-', '');
                const data = await ticketService.getTicketById(sanitizedId);
                setTicketData(data);
            } catch (err) {
                console.error('Fetch ticket error:', err);
                setError('Ticket not found or could not be loaded.');
            } finally {
                setIsLoading(false);
            }
        };
        if (ticketId) fetchTicket();
    }, [ticketId]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Authenticating Ticket...</p>
            </div>
        </div>;
    }

    if (error || !ticketData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{error || 'Ticket not found'}</h2>
                    <p className="text-gray-500">We couldn't find the ticket you're looking for. Please check your link or contact support.</p>
                    <Button onClick={() => navigate(ROUTES.HOME)} className="w-full">Back to Events</Button>
                </div>
            </div>
        );
    }

    const { 
        buyerName, 
        buyerEmail, 
        id, 
        status, 
        purchasedAt,
        event 
    } = ticketData;

    const formattedPurchaseDate = new Date(purchasedAt).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    // Enhanced event data with organizer
    const mappedEvent = {
        title: event.title,
        location: event.location,
        event_date: event.eventDate,
        organizer: event.user_event_organizerIdTouser?.name,
        organizerEmail: event.user_event_organizerIdTouser?.email,
        isPublic: event.isPublic,
        image: event.image
    };

    // Full ticket data for the card
    const mappedTicket = {
        id: id,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        status: status,
        purchasedAt: purchasedAt,
        scannedAt: ticketData.scannedAt,
        qrPayload: ticketData.qrPayload,
        type: event.ticketType || 'REGULAR PASS'
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12 selection:bg-indigo-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-16 no-print">
                    <button
                        onClick={() => navigate(ROUTES.HOME)}
                        className="group flex items-center gap-3 text-gray-400 hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-[0.2em]"
                    >
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        Back to browsing
                    </button>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleDownloadPDF}
                            disabled={isGenerating}
                            className="bg-white border-2 border-gray-900 px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50"
                        >
                            {isGenerating ? 'Generating...' : 'Save PDF'}
                        </button>
                        <button 
                            onClick={() => window.print()}
                            className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                        >
                            Print Pass
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* LEFT: Ticket Visual */}
                    <div className="flex flex-col items-center print-only-ticket animate-fade-in-up">
                        <div ref={ticketRef} className="w-full max-w-[400px] print-content">
                            <TicketCard ticket={mappedTicket} event={mappedEvent} />
                        </div>
                    </div>

                    {/* RIGHT: Confirmation Details */}
                    <div className="space-y-12 no-print animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div>
                            <div className="inline-flex items-center gap-2.5 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 mb-8">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Booking Confirmed
                            </div>
                            <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
                                Success! You're going to <span className="text-indigo-600">{event.title}</span>
                            </h1>
                            <p className="text-gray-500 mt-6 text-lg leading-relaxed">
                                We've secured your spot. A digital copy of this ticket has been sent to <span className="text-gray-900 font-bold underline decoration-indigo-200 underline-offset-4">{buyerEmail}</span>.
                            </p>
                        </div>

                        <TicketDetails
                            attendeeName={buyerName}
                            ticketId={id}
                            purchaseDate={formattedPurchaseDate}
                            status={status}
                            scannedAt={ticketData.scannedAt}
                        />

                        {/* Support Info */}
                        <div className="flex flex-col gap-2 p-1">
                            <p className="text-sm font-bold text-gray-900">
                                Need help? <a href={`mailto:${mappedEvent.organizerEmail || 'support@eventhubix.com'}?subject=Inquiry for Ticket #${id}`} className="text-indigo-600 hover:underline">
                                    Contact {mappedEvent.organizer || 'Organizer'}
                                </a>
                            </p>
                            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Support provided by the organizer for {buyerName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPage;
