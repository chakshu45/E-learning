const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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

    const data = await response.json();
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
