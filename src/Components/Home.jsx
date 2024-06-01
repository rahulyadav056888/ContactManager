import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader/loader.component";

let Home = () => {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contacts');
            setLoading(false);
            setContacts(response.data);
            setFilteredContacts(response.data); // Initially, show all contacts
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter(contact =>
                contact.name.toLowerCase().includes(query.toLowerCase()) ||
                contact.email.toLowerCase().includes(query.toLowerCase()) ||
                contact.mobile.includes(query)
            );
            setFilteredContacts(filtered);
        }
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    //         fetchContacts(); // Refresh contacts after deletion
    //     } catch (error) {
    //         console.error('Error deleting contact:', error);
    //     }
    // };
    if (loading) return <div><Loader /></div>;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand me-5" to="/"><i className="fa fa-mobile me-2"></i>Contact <span className="text-warning">Manager</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <form className="d-flex me-auto">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            {/* <button className="btn btn-outline-success" type="button" onClick={() => setSearchQuery("")}>Search</button> */}
                        </form>
                        <div className="d-flex ms-auto">
                            <Link to="/add" className="btn btn-success">
                                <i className="fas fa-plus"></i> Add Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="row">
                {filteredContacts.map((contact) => (
                    <div key={contact._id} className="col-sm-6">
                        <div className="card shadow-lg mt-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <img
                                            alt={contact.name}
                                            className="img-fluid rounded-circle"
                                            src={contact.imageUrl}
                                        />
                                    </div>
                                    <div className="col-sm-8">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                Name: <span className="fw-bold">{contact.name}</span>
                                            </li>
                                            <li className="list-group-item">
                                                Email: <span className="fw-bold">{contact.email}</span>
                                            </li>
                                            <li className="list-group-item">
                                                Mobile: <span className="fw-bold">{contact.mobile}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-1 d-flex flex-column align-items-center">
                                        <Link className="btn btn-warning mb-2" to={`/view/${contact._id}`}>
                                            <i className="fa fa-eye"></i>
                                        </Link>
                                        <Link className="btn btn-primary mb-2" to={`/edit/${contact._id}`}>
                                            <i className="fa fa-pencil"></i>
                                        </Link>
                                        <Link className="btn btn-danger" to={`/delete/${contact._id}`} >
                                            <i className="fa fa-trash"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;
