import React, { useState } from 'react';
import "./signup.css"

const Signup = () => {
    const [formData, setFormData] = useState({
        phone: '',
        addressX: '',
        addressY: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData); // replace with your API call to submit the data
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            
        <form onSubmit={handleSubmit}>
            <div className="content">
                <label className="label">Phone:</label>
                <input className="input" type="text" name="phone" onChange={handleChange} value={formData.phone} required />
            </div>
            <div className="content">
                <label className="label">AddressX:</label>
                <input className="input" type="text" name="addressX" onChange={handleChange} value={formData.addressX} required />
            </div>
            <div className="content">
                <label className="label">AddressY:</label>
                <input className="input" type="text" name="addressY" onChange={handleChange} value={formData.addressY} required />
            </div>
            <div className="content">
                <label className="label">Password:</label>
                <input className="input" type="password" name="password" onChange={handleChange} value={formData.password} required />
            </div>
            <div className="content">
                <label className="label">First Name:</label>
                <input className="input" type="text" name="firstName" onChange={handleChange} value={formData.firstName} required />
            </div>
            <div className="content">
                <label className="label">Last Name:</label>
                <input className="input"  type="text" name="lastName" onChange={handleChange} value={formData.lastName} required />
            </div>
            <button className="button" type="submit">Sign Up</button>
        </form>
        </div>
    );
};

export default Signup