import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_KEY + '/user/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sign-up successful! Redirecting...');
                navigate('/searchfilter');
            } else {
                alert(`Error: ${data.error || 'Sign-up failed'}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <div className='center-vertically'>
                <div className='center-horizontally'>
                    <div className="loginInfo">
                        <form id="signUpForm">
                            <h1 className="signHeader">Sign Up</h1>
                            <input type="text" name="first_name" placeholder="First Name" required className="user" value={formData.first_name} onChange={handleChange} /><br />
                            <input type="text" name="last_name" placeholder="Last Name" required className="user" value={formData.last_name} onChange={handleChange} /><br />
                            <input type="email" name="email" placeholder="Email" required className="user" value={formData.email} onChange={handleChange} /><br />
                            <input type="password" name="password" placeholder="Password" required className="pass" value={formData.password} onChange={handleChange} /><br /><br />
                        </form>
                    </div>
                    <h2 className="subtitle">Let's find your next favorite study spot!</h2>
                    <div className="card">
                        <button onClick={handleSubmit} className="signBttn">Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
