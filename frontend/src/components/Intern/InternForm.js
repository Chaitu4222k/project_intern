import React from 'react';

const InternForm = ({ 
    name, 
    contact, 
    department, 
    startDate, 
    endDate, 
    setName, 
    setContact, 
    setDepartment, 
    setStartDate, 
    setEndDate, 
    handleSubmit 
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Contact:
                <input 
                    type="text" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Department:
                <input 
                    type="text" 
                    value={department} 
                    onChange={(e) => setDepartment(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Start Date:
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                />
            </label>
            <label>
                End Date:
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    required 
                />
            </label>
            <button type="submit">Add Intern</button>
        </form>
    );
};

export default InternForm;
