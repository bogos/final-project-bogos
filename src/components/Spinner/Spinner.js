import React from 'react';
import spinner from './spinner.svg';
import './Spinner.css';
const Spinner = (props) => (
    <div  className='spinner'>
        <img src={spinner} alt="spinner"/> 
    </div>
);

export default Spinner;