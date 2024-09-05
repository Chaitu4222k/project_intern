// src/components/Feedback/FeedbackForm.js
import React, { useState } from 'react';
import { createFeedback } from '../../api'; // Ensure this API function is defined

const FeedbackForm = ({ refresh }) => {
    const [internName, setInternName] = useState('');
    const [managerName, setManagerName] = useState('');
    const [feedbackContent, setFeedbackContent] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFeedback = { internName, managerName, feedbackContent, date };
        try {
            await createFeedback(newFeedback);
            refresh();
            setInternName('');
            setManagerName('');
            setFeedbackContent('');
            setDate('');
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <input 
                type="text" 
                placeholder="Intern Name" 
                value={internName} 
                onChange={(e) => setInternName(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Manager Name" 
                value={managerName} 
                onChange={(e) => setManagerName(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Feedback Content" 
                value={feedbackContent} 
                onChange={(e) => setFeedbackContent(e.target.value)} 
                required 
            />
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />
            <button type="submit">Add Feedback</button>
        </form>
    );
};

export default FeedbackForm;
