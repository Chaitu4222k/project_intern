import React, { useState, useEffect } from 'react';
import { fetchPerformances } from '../../api'; // Import API function

const PerformanceList = () => {
    const [performances, setPerformances] = useState([]);

    useEffect(() => {
        const loadPerformances = async () => {
            try {
                const data = await fetchPerformances();
                setPerformances(data);
            } catch (error) {
                console.error('Error loading performances:', error);
            }
        };
        loadPerformances();
    }, []);

    return (
        <div>
            <h2>Performance List</h2>
            <ul>
                {performances.map(performance => (
                    <li key={performance._id}>
                        {performance.internName} - {performance.score}
                        {/* Add a link to performance details if needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PerformanceList;
