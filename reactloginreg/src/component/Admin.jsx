import React, { useState } from 'react';

function Admin() {
    const [allData, setAllData] = useState([]);

    async function sendData(e) {
        e.preventDefault();
        const sid = e.target.sid.value;

        if (sid === '*') {
            const response = await fetch("http://localhost:3001/admin/show");
            const res = await response.json();
            setAllData(res.message);
        } else {
            const response = await fetch(`http://localhost:3001/admin/searchbyemail/${sid}`);
            const res = await response.json();
            console.log(res);
            setAllData(Array.isArray(res.message) ? res.message : [res.message]);
        }
    }

    async function handleDelete(email) {
        const confirmDelete = window.confirm("Are you sure you want to delete this record?");
        if (!confirmDelete) return;

        const res = await fetch(`http://localhost:3001/admin/deletebyid/${email}`, {
            method: 'DELETE'
        });
        const result = await res.json();
        alert(result.message);

        // // Remove from UI
        // setAllData(prev => prev.filter(item => item.email !== email));
    }

    async function handleUpdate(email) {
        const newName = prompt("Enter new name:");
        const newPassword = prompt("Enter new password:");
        if (!newName && !newPassword) return;

        const res = await fetch(`http://localhost:3001/admin/updatebyid/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newName,
                password: newPassword
            }),
        });

        const result = await res.json();
        alert(result.message);

       
    }

    return (
        <div>
            <h2>Admin Panel</h2>
            <div className='container'>
                <form onSubmit={sendData}>
                    <div>
                        <input type='text' name='sid' placeholder='Enter student email or *' />
                        <h4>* for all students data</h4>
                    </div>
                    <div>
                        <button type='submit'>Search</button>
                    </div>
                </form>

                <div>
                    {
                        allData && allData.length > 0 ? (
                            <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allData.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>
                                                <button onClick={() => handleDelete(student.email)}>Delete</button>
                                                <button onClick={() => handleUpdate(student.email)}>Update</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h2>No Data Available</h2>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Admin;
