import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { captainDataContext } from '../assets/context/CaptainContext';
import axios from 'axios';

function CaptainProtectedWrapper({ children }) {
    const navigate = useNavigate();
    const { captain, setCaptain, loading, setLoading, error, setError } = useContext(captainDataContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/captains-login');
            return;
        }

        setLoading(true); // Set loading to true before making the API call
        setError(null);   // Clear any previous errors

        axios.get('http://localhost:4000/captains/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                setCaptain(response.data);
                setLoading(false);        
            })
            .catch(err => {
                console.error('Error fetching captain profile:', err);
                setError('Failed to fetch profile. Please log in again.');
                localStorage.removeItem('token');
                setLoading(false);
                navigate('/captains-login');
            });
    }, [token, navigate, setCaptain, setLoading, setError]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return children;
}

export default CaptainProtectedWrapper;
