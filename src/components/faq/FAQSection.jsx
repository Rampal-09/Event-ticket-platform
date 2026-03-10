import React from 'react';
import FAQItem from './FAQItem';

/**
 * FAQSection - Container for a list of FAQ items with a title
 */
const FAQSection = ({ title, items = [] }) => {
    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 last:mb-0">
            {title && (
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
                </div>
            )}

            <div className="divide-y divide-gray-50">
                {items.length === 0 ? (
                    <p className="py-8 text-center text-gray-400 italic text-sm font-medium">
                        No questions available in this section.
                    </p>
                ) : (
                    items.map((item, idx) => (
                        <FAQItem
                            key={idx}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default FAQSection;
