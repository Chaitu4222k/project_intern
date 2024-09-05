import React, { useState, useEffect } from 'react';
import FeedbackList from '../components/Feedback/FeedbackList';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import { fetchFeedbacks, createFeedback } from '../api';
import './Feedback.css'; // Import the CSS file here

const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFeedbacks = async () => {
        setLoading(true);
        try {
            if (searchName) {
                const data = await fetchFeedbacks(searchName);
                setFeedbacks(data);
            } else {
                const data = await fetchFeedbacks();
                setFeedbacks(data);
            }
        } catch (error) {
            setError('Error loading feedbacks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeedbacks();
    }, [refresh, searchName]);

    return (
        <div className="feedback-page">
            <h1>Feedback Management</h1>
            <FeedbackForm refresh={() => setRefresh(!refresh)} />
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by intern name" 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)} 
                />
                <button onClick={() => loadFeedbacks()}>Search</button>
            </div>
            {loading ? <p>Loading...</p> : <FeedbackList feedbacks={feedbacks} refresh={() => setRefresh(!refresh)} />}
            {error && <p>{error}</p>}
        </div>
    );
};

export default FeedbackPage;
