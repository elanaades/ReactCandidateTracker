import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import AddCandidate from './Pages/AddCandidate';
import Confirmed from './Pages/Confirmed';
import Pending from './Pages/Pending';
import Refused from './Pages/Refused';
import ViewDetails from './Pages/ViewDetails';
import { CandidateCountContextComponent } from './Components/CandidateCountContext';

const App = () => {

    return (
        <CandidateCountContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/addcandidate' element={<AddCandidate />} />
                    <Route exact path='/Confirmed' element={<Confirmed />} />
                    <Route exact path='/Pending' element={<Pending />} />
                    <Route exact path='/Refused' element={<Refused />} />
                    <Route exact path='/ViewDetails/:id' element={<ViewDetails />} />
                </Routes>
            </Layout>
        </CandidateCountContextComponent >
    );

}

export default App;