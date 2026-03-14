import React, { useState, useRef, useCallback } from 'react';
import { uploadToCloudinary, getOptimizedImageUrl } from '../../utils/cloudinary';

/**
 * EventGalleryUploader - Handles multiple image uploads with Cloudinary
 * Features: Drag & Drop, Progress Indicator, Validation
 */
const EventGalleryUploader = ({ images = [], onImagesUpdate }) => {
    const [uploadingItems, setUploadingItems] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

    const handleFiles = async (files) => {
        setUploadError('');
        const validFiles = Array.from(files).filter(file => validTypes.includes(file.type));

        if (validFiles.length !== files.length) {
            setUploadError('Only JPG, PNG, and WEBP files are allowed.');
        }

        if (validFiles.length === 0) return;

        // Create uploading items tracking objects
        const newTrackers = validFiles.map(file => ({
            id: Math.random().toString(36).substring(7),
            file,
            previewUrl: URL.createObjectURL(file), // temporary preview
            progress: 0,
            hasError: false
        }));

        setUploadingItems(prev => [...prev, ...newTrackers]);

        // Upload each valid file
        let currentUploadedUrls = [...images];
        for (const item of newTrackers) {
            try {
                const secureUrl = await uploadToCloudinary(item.file, (progress) => {
                    setUploadingItems(prev => prev.map(t => t.id === item.id ? { ...t, progress } : t));
                });

                // Clear temporary object URL
                URL.revokeObjectURL(item.previewUrl);

                // Add successful URL to our tracked list
                currentUploadedUrls = [...currentUploadedUrls, secureUrl];
                onImagesUpdate?.(currentUploadedUrls);
                
                setUploadingItems(prev => prev.filter(t => t.id !== item.id));
                
            } catch (err) {
                console.error("Upload failed for file:", item.file.name, err);
                setUploadingItems(prev => prev.map(t => t.id === item.id ? { ...t, hasError: true, errorMsg: err.message } : t));
            }
        }
    };

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const removeImage = (idx) => {
        const updated = images.filter((_, i) => i !== idx);
        onImagesUpdate?.(updated);
    };

    const removeFailedUpload = (id) => {
        setUploadingItems(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 border-l-4 border-indigo-600 pl-3">Event Gallery</h3>
                <span className="text-xs text-gray-500">{images.length} photos added</span>
            </div>

            {uploadError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                    {uploadError}
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Uploaded Images */}
                {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 bg-gray-50">
                        {/* Apply optimization delivery purely for display */}
                        <img src={getOptimizedImageUrl(img)} alt="" className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => removeImage(idx)}
                                className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
                                type="button"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Uploading Trackers */}
                {uploadingItems.map((item) => (
                    <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 group">
                        <img src={item.previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50 grayscale" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                            {item.hasError ? (
                                <div className="text-center">
                                    <span className="text-red-600 text-[10px] font-bold uppercase tracking-widest bg-red-100 px-2 py-1 rounded-full mb-2 inline-block">Failed</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFailedUpload(item.id)}
                                        className="mt-2 text-[10px] font-bold text-gray-600 bg-white px-3 py-1.5 rounded-xl hover:bg-gray-50 border border-gray-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                        <div 
                                            className="bg-indigo-600 h-1.5 transition-all duration-300 ease-out" 
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-700 bg-white/90 px-2 py-0.5 rounded-full">{item.progress}%</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Upload Trigger Dropzone */}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`aspect-square rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group
                        ${dragActive ? 'border-indigo-600 bg-indigo-50/50 scale-[0.98]' : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30'}
                    `}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                        ${dragActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400 group-hover:text-indigo-600'}
                    `}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 text-center px-2">
                        {dragActive ? 'Drop Files' : 'Add Photos'}
                    </span>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        multiple 
                        className="hidden" 
                        onChange={handleChange} 
                        accept={validTypes.join(',')} 
                    />
                </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
                 Recommended: 1920x1080px (16:9 ratio). Supported formats: JPG, PNG, WEBP.
            </p>
        </div>
    );
};

export default EventGalleryUploader;
