import React, { useState, useEffect } from 'react';
import { fetchPerformances, createPerformance, updatePerformance, deletePerformance } from '../api'; // Ensure API functions are defined
import './PerformancePage.css'; // Import the CSS file

const PerformancePage = () => {
    const [performances, setPerformances] = useState([]);
    const [name, setName] = useState('');
    const [score, setScore] = useState('');
    const [date, setDate] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [filterName, setFilterName] = useState('');
    const [filterDate, setFilterDate] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPerformance = { name, score, date };
        try {
            if (editing) {
                await updatePerformance(currentId, newPerformance);
            } else {
                await createPerformance(newPerformance);
            }
            const updatedPerformances = await fetchPerformances();
            setPerformances(updatedPerformances);
            resetForm();
        } catch (error) {
            console.error('Error saving performance:', error);
        }
    };

    const handleEdit = (performance) => {
        setName(performance.name);
        setScore(performance.score);
        setDate(performance.date);
        setEditing(true);
        setCurrentId(performance._id);
    };

    const handleDelete = async (id) => {
        try {
            await deletePerformance(id);
            const updatedPerformances = await fetchPerformances();
            setPerformances(updatedPerformances);
        } catch (error) {
            console.error('Error deleting performance:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setScore('');
        setDate('');
        setEditing(false);
        setCurrentId(null);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const filteredPerformances = performances.filter(performance => 
        (!filterName || performance.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterDate || new Date(performance.date).toLocaleDateString().includes(new Date(filterDate).toLocaleDateString()))
    );

    return (
        <div className="performance-page">
            <h1>Performance Management</h1>

            <form onSubmit={handleSubmit} className="performance-form">
                <input
                    type="text"
                    placeholder="Intern Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Performance Score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                />
                <div className="date-inputs">
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editing ? 'Update Performance' : 'Add Performance'}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>

            <div className="performance-filter">
                <h2>Search or Filter Here</h2>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Filter by Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            <table className="performance-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPerformances.map(performance => (
                        <tr key={performance._id}>
                            <td>{performance.name}</td>
                            <td>{performance.score}</td>
                            <td>{formatDate(performance.date)}</td>
                            <td>
                                <button onClick={() => handleEdit(performance)}>Edit</button>
                                <button onClick={() => handleDelete(performance._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PerformancePage;
