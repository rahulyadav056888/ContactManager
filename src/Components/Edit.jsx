import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader/loader.component';

const EditContact = () => {
    const { id } = useParams(); // Get the contact id from the URL parameters
    const [contact, setContact] = useState({
        name: '',
        company: '',
        email: '',
        title: '',
        mobile: '',
        imageUrl: '',
        groupId: ''
    });
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const contactResponse = await axios.get(`http://localhost:5000/api/contacts/${id}`);
                setContact(contactResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        };

        const fetchGroups = async () => {
            try {
                const groupsResponse = await axios.get('http://localhost:5000/api/groups');
                setGroups(groupsResponse.data);

            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchContact();
        fetchGroups();
    }, [id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/contacts/${id}`, contact);
            navigate('/');
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    if (loading) return (<div><Loader /></div>)
    return (
        <div className="container mt-5">
            <h2>Edit Contact</h2>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">Company</label>
                        <input
                            type="text"
                            className="form-control"
                            id="company"
                            name="company"
                            value={contact.company}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={contact.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            value={contact.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imageUrl"
                            name="imageUrl"
                            value={contact.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="groupId" className="form-label">Group</label>
                        <select
                            className="form-control"
                            id="groupId"
                            name="groupId"
                            value={contact.groupId}
                            onChange={handleChange}
                        >
                            <option value="">Select Group</option>
                            {groups.map(group => (
                                <option key={group._id} value={group._id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Update Contact</button>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    {contact.imageUrl && (
                        <img
                            src={contact.imageUrl}
                            alt="Contact"
                            className="img-fluid rounded-circle"
                            style={{ maxHeight: '300px' }}
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditContact;
