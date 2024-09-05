import React, { useState, useEffect } from 'react';
import { fetchInterns, createIntern, updateIntern, deleteIntern } from '../api'; // Adjust the import path
import './InternPage.css'; // Import the CSS file

const InternPage = () => {
    const [interns, setInterns] = useState([]);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [filterName, setFilterName] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');

    useEffect(() => {
        const loadInterns = async () => {
            try {
                const data = await fetchInterns();
                setInterns(Array.isArray(data) ? data : []); // Ensure interns is an array
            } catch (error) {
                console.error('Error loading interns:', error);
            }
        };
        loadInterns();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newIntern = { name, contact, department, startDate, endDate };
        try {
            if (editing) {
                await updateIntern(currentId, newIntern);
            } else {
                await createIntern(newIntern);
            }
            const updatedInterns = await fetchInterns();
            setInterns(updatedInterns);
            resetForm();
        } catch (error) {
            console.error('Error saving intern:', error);
        }
    };

    const handleEdit = (intern) => {
        setName(intern.name);
        setContact(intern.contact);
        setDepartment(intern.department);
        setStartDate(intern.startDate);
        setEndDate(intern.endDate);
        setEditing(true);
        setCurrentId(intern._id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteIntern(id);
            const updatedInterns = await fetchInterns();
            setInterns(updatedInterns);
        } catch (error) {
            console.error('Error deleting intern:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setContact('');
        setDepartment('');
        setStartDate('');
        setEndDate('');
        setEditing(false);
        setCurrentId(null);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const filteredInterns = interns.filter(intern => 
        (!filterName || intern.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterDate || new Date(intern.startDate).toLocaleDateString().includes(new Date(filterDate).toLocaleDateString())) &&
        (!filterDepartment || intern.department.toLowerCase().includes(filterDepartment.toLowerCase()))
    );

    return (
        <div className="intern-page">
            <h1>Intern Management</h1>

            <form onSubmit={handleSubmit} className="intern-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
                <div className="date-inputs">
                    <label htmlFor="start-date">Start Date:</label>
                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="date-inputs">
                    <label htmlFor="end-date">End Date:</label>
                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type="submit">{editing ? 'Update Intern' : 'Add Intern'}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>

            <div className="intern-filter">
                <h2>Search or Filter Here</h2>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Filter by Joining Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Department"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                />
            </div>

            <table className="intern-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Department</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInterns.map(intern => (
                        <tr key={intern._id}>
                            <td>{intern.name}</td>
                            <td>{intern.contact}</td>
                            <td>{intern.department}</td>
                            <td>{formatDate(intern.startDate)}</td>
                            <td>{formatDate(intern.endDate)}</td>
                            <td>
                                <button onClick={() => handleEdit(intern)}>Edit</button>
                                <button onClick={() => handleDelete(intern._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InternPage;
