import React, { useState } from 'react';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

/**
 * EventGallery - Displays multiple event images in a responsive grid/slider
 * Supports placeholder images if none are provided
 */
const EventGallery = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Fallback if no images
    const galleryImages = images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200'
    ];

    return (
        <div className="space-y-4">
            {/* Main Active Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-lg group">
                <img
                    src={getOptimizedImageUrl(galleryImages[activeIndex])}
                    alt={`Event view ${activeIndex + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {galleryImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative flex-shrink-0 w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-indigo-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img src={getOptimizedImageUrl(img)} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EventGallery;
