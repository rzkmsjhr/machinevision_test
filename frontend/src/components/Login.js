import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        }
    }

  return (
<div class="container d-flex justify-content-center align-items-center vh-100 text-center">
    <div className="border border-2 p-5 rounded">
        <form onSubmit={Auth}>
        <h2 class="mb-4">Login</h2>
            <div class="form-group">
        <label for="email"></label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
            <div class="form-group">
        <label for="password"></label>
            <input type="password" class="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
            <button type="submit" class="btn btn-primary my-4">Login</button>
        </form>

        <p>Don't Have an Account? <a href="/register">Sign Up</a></p>
    </div>
</div>

  )
}

export default Login