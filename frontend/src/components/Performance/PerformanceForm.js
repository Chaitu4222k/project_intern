import React, { useState } from 'react';
import { createPerformance } from '../../api'; // Import API function

const PerformanceForm = ({ refreshPerformances }) => {
    const [internName, setInternName] = useState('');
    const [score, setScore] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPerformance = {
            internName,
            score,
            review
        };
        try {
            await createPerformance(newPerformance);
            refreshPerformances();
            setInternName('');
            setScore('');
            setReview('');
        } catch (error) {
            console.error('Error adding performance:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Performance</h2>
            <label>Intern Name:
                <input type="text" value={internName} onChange={(e) => setInternName(e.target.value)} required />
            </label>
            <label>Score:
                <input type="number" value={score} onChange={(e) => setScore(e.target.value)} required />
            </label>
            <label>Review:
                <textarea value={review} onChange={(e) => setReview(e.target.value)} />
            </label>
            <button type="submit">Add Performance</button>
        </form>
    );
};

export default PerformanceForm;
