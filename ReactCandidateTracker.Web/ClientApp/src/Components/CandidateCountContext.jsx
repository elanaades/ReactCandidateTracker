import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const CandidateCountContext = createContext();

const CandidateCountContextComponent = ({ children }) => {

    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [refusedCount, setRefusedCount] = useState(0);

    const refreshCandidateCounts = async () => {
        const { data } = await axios.get('/api/candidatetracker/getcandidates');

        const pendingCandidates = data.filter(candidate => candidate.status === 'Pending')
        const confirmedCandidates = data.filter(candidate => candidate.status === 'Confirmed')
        const refusedCandidates = data.filter(candidate => candidate.status === 'Refused')

        setPendingCount(pendingCandidates.length);
        setConfirmedCount(confirmedCandidates.length);
        setRefusedCount(refusedCandidates.length);
    }

    useEffect(() => {
        refreshCandidateCounts();
    }, []);

    return (
        <CandidateCountContext.Provider value={{ pendingCount, confirmedCount, refusedCount, refreshCandidateCounts }}>
            {children}
        </CandidateCountContext.Provider>
    )

}

const useCandidateCount = () => {
    return useContext(CandidateCountContext);
}

export { CandidateCountContextComponent, useCandidateCount };