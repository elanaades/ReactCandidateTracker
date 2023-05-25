﻿import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Confirmed = () => {

    const [candidates, setCandidates] = useState([]);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const getCandidates = async () => {
            const { data } = await axios.get('/api/candidatetracker/getcandidates');
            const confirmedCandidates = data.filter(candidate => candidate.status === 'Confirmed')
            setCandidates(confirmedCandidates);
        }

        getCandidates();
    }, []);

    const onToggleClick = () => {
        setToggle(!toggle);
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <h1>Confirmed Candidates</h1>
            <button className="btn btn-success" style={{ marginBottom: "10px", marginTop: '30px' }} onClick={onToggleClick}>Toggle Notes</button>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th />
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {toggle ? <th>Notes</th> : ''}
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
                            {toggle ? < td > {c.notes}</td> : ''}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


}

export default Confirmed;
