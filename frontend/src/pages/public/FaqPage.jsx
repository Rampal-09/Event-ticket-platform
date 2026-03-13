import React from 'react';
import FAQSection from '../../components/faq/FAQSection';

const FAQ_DATA = [
    {
        title: "Ticket Purchase",
        items: [
            {
                question: "How do I buy a ticket?",
                answer: "Browse our events, select the one you like, and click the 'Buy Ticket' button. You'll be asked to provide your name, email, and quantity before proceeding to payment."
            },
            {
                question: "Can I use promo codes?",
                answer: "Yes! During checkout, you'll see a field to enter a promo code. If valid, your total price will be discounted immediately."
            }
        ]
    },
    {
        title: "Refunds & Cancellations",
        items: [
            {
                question: "What is the refund policy?",
                answer: "Refund policies are determined by the event organizers. Generally, tickets are non-refundable unless the event is cancelled by the host."
            }
        ]
    },
    {
        title: "Entry & Scanning",
        items: [
            {
                question: "How do I use my ticket?",
                answer: "After purchase, you'll receive a ticket with a QR code. Simply show this QR code (on your phone or printed) to the staff at the event gate for scanning."
            }
        ]
    }
];

const FaqPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-16 px-6 sm:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                    Frequently Asked <span className="text-indigo-600">Questions</span>
                </h1>
                <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    Everything you need to know about purchasing tickets, managing events, and using our platform.
                </p>
            </div>

            <div className="space-y-12">
                {FAQ_DATA.map((section, idx) => (
                    <FAQSection
                        key={idx}
                        title={section.title}
                        items={section.items}
                    />
                ))}
            </div>

            {/* Support CTA */}
            <div className="mt-20 p-8 rounded-3xl bg-indigo-600 text-white text-center shadow-xl shadow-indigo-200">
                <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
                <p className="text-indigo-100 mb-8 max-w-md mx-auto">We're here to help you. Send us a message and we'll get back to you as soon as possible.</p>
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors">
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default FaqPage;
