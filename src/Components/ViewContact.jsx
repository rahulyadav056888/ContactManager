import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader/loader.component';

const ViewContact = () => {
    const { id } = useParams(); // Get the contact id from the URL parameters
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const [contactResponse, groupsResponse] = await Promise.all([
                    axios.get(`https://contact-manager-server-nine.vercel.app/api/contacts/${id}`),
                    axios.get('https://contact-manager-server-nine.vercel.app/api/groups')
                ]);

                setContact(contactResponse.data);
                setGroups(groupsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    const getGroupName = (groupId) => {
        const group = groups.find(group => group._id === groupId);
        return group ? group.name : 'Unknown';
    };

    if (loading) return <div><Loader /></div>;

    if (!contact) return <div>Contact not found</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>View Contact</h3>
                        </div>
                        <div className="card-body">
                            <img src={contact.imageUrl} alt={contact.name} className="img-fluid rounded-circle mb-3 " height='200' width='200' />
                            <h5>Name: {contact.name}</h5>
                            <p>Email: {contact.email}</p>
                            <p>Mobile: {contact.mobile}</p>
                            <p>Company: {contact.company}</p>
                            <p>Title: {contact.title}</p>
                            <p>Group: {getGroupName(contact.groupId)}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Contacts</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewContact;
