import React, { useState } from 'react';

/**
 * EventGalleryUploader - Handles multiple image uploads with preview
 */
const EventGalleryUploader = ({ images = [], onImagesUpdate }) => {
    const [previews, setPreviews] = useState(images);

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        // In a real app, you'd upload these to a server. Here we just create local previews.
        const newPreviews = files.map(file => URL.createObjectURL(file));
        const updated = [...previews, ...newPreviews];
        setPreviews(updated);
        onImagesUpdate?.(updated);
    };

    const removeImage = (idx) => {
        const updated = previews.filter((_, i) => i !== idx);
        setPreviews(updated);
        onImagesUpdate?.(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 border-l-4 border-indigo-600 pl-3">Event Gallery</h3>
                <span className="text-xs text-gray-500">{previews.length} photos added</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => removeImage(idx)}
                                className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                type="button"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Upload Trigger */}
                <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-indigo-600">Add Photo</span>
                    <input type="file" multiple className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
            </div>
        </div>
    );
};

export default EventGalleryUploader;
