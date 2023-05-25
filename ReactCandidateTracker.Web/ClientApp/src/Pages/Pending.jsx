import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pending = () => {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getCandidates = async () => {
            const { data } = await axios.get('/api/candidatetracker/getcandidates');
            const pendingCandidates = data.filter(candidate => candidate.status === 'Pending')
            setCandidates(pendingCandidates);
        }

        getCandidates();
    }, []);

    return (
        <div className="container" style={{marginTop: '80px'} }>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th />
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => (
                        <tr key={c.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                            <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                                <Link to={`/viewdetails/${c.id}`}>
                                    View Details
                                </Link>
                            </td>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{c.phoneNumber}</td>
                            <td>{c.email}</td>
                            <td>{c.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}

export default Pending;
