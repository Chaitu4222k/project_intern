import React from 'react';

const InternList = ({ interns, handleDelete }) => {
    return (
        <div>
            <h2>Intern List</h2>
            <table>
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
                    {interns.map(intern => (
                        <tr key={intern._id}>
                            <td>{intern.name}</td>
                            <td>{intern.contact}</td>
                            <td>{intern.department}</td>
                            <td>{new Date(intern.startDate).toLocaleDateString()}</td>
                            <td>{new Date(intern.endDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => {/* Handle Edit */}}>Edit</button>
                                <button onClick={() => handleDelete(intern._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InternList;
