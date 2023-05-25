import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {



    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(238,238,238)', height: '100vh' }}>
            <div className='text-center'>
                <h1 className="display-4">Welcome to the Candidate Tracker. </h1>
                <h2 className="display-6" style={{fontStyle: 'italic'} }>
                    Use the links above to navigate.
                </h2>
            </div>
        </div>
    );
}

export default Home;
