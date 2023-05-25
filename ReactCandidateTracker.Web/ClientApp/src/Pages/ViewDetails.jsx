import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCandidateCount } from '../Components/CandidateCountContext';

const ViewDetails = () => {

    const { id } = useParams();

    const [candidate, setCandidate] = useState();
    const [inProgress, setInProgress] = useState(false);
    const { refreshCandidateCounts } = useCandidateCount();

    const navigate = useNavigate();

    useEffect(() => {
        const getCandidate = async () => {
            const { data } = await axios.get(`/api/candidatetracker/getcandidatebyid?id=${id}`);
            setCandidate(data);
        }
        getCandidate();
    }, []);

    if (!candidate) {
        return <h1>Loading...</h1>
    }

    const onConfirmClick = async () => {
        setInProgress(true);

        const updatedCandidate = { ...candidate, status: 'confirmed' };
        setCandidate(updatedCandidate);

        await axios.post('/api/candidatetracker/updatecandidate', updatedCandidate);

        setInProgress(false);
        refreshCandidateCounts();
        navigate('/');
    }

    const onRefuseClick = async () => {
        setInProgress(true);

        const updatedCandidate = { ...candidate, status: 'refused' };
        setCandidate(updatedCandidate);

        await axios.post('/api/candidatetracker/updatecandidate', updatedCandidate);

        setInProgress(false);
        refreshCandidateCounts();
        navigate('/');
    }

    return (
        <div className="row" style={{ marginTop: '80px' }}>
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h4>First Name: {candidate.firstName} </h4>
                    <h4>Last Name: {candidate.lastName} </h4>
                    <h4>Email: {candidate.email}</h4>
                    <h4>Phone: {candidate.phoneNumber}</h4>
                    <h4>Status: {candidate.status}</h4>
                    <h4>Notes:</h4>
                    <p>{candidate.notes}</p>
                    <div>
                        <button className="btn btn-primary" onClick={onConfirmClick}>{inProgress ? 'Submitting...' : 'Confirm'}</button>
                        <button className="btn btn-danger" onClick={onRefuseClick}>{inProgress ? 'Submitting...' : 'Refuse'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetails;