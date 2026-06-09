export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('/uploads/')) return `${API_BASE_URL}${path}`;
    return path;
};
