// src/components/Feedback/FeedbackList.js
import React from 'react';
import { deleteFeedback, updateFeedback } from '../../api'; // Import API functions

const FeedbackList = ({ feedbacks, refresh }) => {
    const handleDelete = async (id) => {
        try {
            await deleteFeedback(id);
            refresh();
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleEdit = async (id, updatedFeedback) => {
        try {
            await updateFeedback(id, updatedFeedback);
            refresh();
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Intern</th>
                    <th>Manager</th>
                    <th>Feedback</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {feedbacks.map(feedback => (
                    <tr key={feedback._id}>
                        <td>{feedback.intern}</td>
                        <td>{feedback.manager}</td>
                        <td>{feedback.feedback}</td>
                        <td>{new Date(feedback.date).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => handleEdit(feedback._id, feedback)}>Edit</button>
                            <button onClick={() => handleDelete(feedback._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FeedbackList;
