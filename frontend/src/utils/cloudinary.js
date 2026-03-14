// utils/cloudinary.js

/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * 
 * @param {File} file - The image file to upload.
 * @param {Function} onProgress - Callback function for upload progress (0-100).
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
export const uploadToCloudinary = async (file, onProgress) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary environment variables are not configured.');
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'event-platform/events');

    // Add Cloudinary image transformations (automatic quality, format, responsive sizing)
    // Applying f_auto,q_auto via the API during upload or we can append it directly to the returned URL.
    // However, the best practice is to store the original URL and append the f_auto,q_auto to the URL 
    // when displaying it, or append it to the upload parameters.
    
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                onProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                // secure_url is returned by Cloudinary
                resolve(response.secure_url);
            } else {
                reject(new Error(`Cloudinary Upload Failed: ${xhr.statusText}`));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error occurred during Cloudinary upload.'));
        };

        xhr.send(formData);
    });
};

/**
 * Utility to append optimization parameters to a Cloudinary URL.
 * Example transformation: f_auto,q_auto
 */
export const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    
    // Insert f_auto,q_auto into the Cloudinary upload URL
    const uploadPath = '/upload/';
    if (url.includes(uploadPath) && !url.includes('f_auto,q_auto')) {
        return url.replace(uploadPath, `${uploadPath}f_auto,q_auto/`);
    }
    return url;
};
