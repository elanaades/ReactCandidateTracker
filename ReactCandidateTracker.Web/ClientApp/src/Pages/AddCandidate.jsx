import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCandidateCount } from '../Components/CandidateCountContext';

const AddCandidate = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { refreshCandidateCounts} = useCandidateCount();

    const onSubmitClick = async () => {
        setIsSubmitting(true);
        await axios.post('/api/CandidateTracker/addcandidate', {
            firstName,
            lastName,
            email,
            phoneNumber,
            notes,
            status: 'pending',
        });
        setIsSubmitting(false);
        await refreshCandidateCounts();
        navigate('/pending');
    }


    const isFormValid = !!firstName && !!lastName && !!email && !!phoneNumber;

    return (

        <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h4>Add Candidate</h4>
                    <form>
                        <input type="text" name="firstName" placeholder="First Name" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <br />
                        <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                        <br />
                        <input type="text" name="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        <br />
                        <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        <br />
                        <textarea rows={5} className="form-control" name="notes" value={notes} onChange={e => setNotes(e.target.value)} />
                        <br />
                        <button className="btn btn-primary" disabled={!isFormValid || isSubmitting} onClick={onSubmitClick}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCandidate;