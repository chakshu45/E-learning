const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchData = async (endpoint: string, options: RequestInit = {}) => {
    const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('sky_user') || '{}')?.token : null;

    
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Handle potential non-JSON or empty responses
    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : {};
    } catch (e) {
        data = { message: text || 'Invalid JSON response from server' };
    }

    if (!response.ok) {
        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('sky_user');
                window.location.href = '/login';
            }
        }
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};
