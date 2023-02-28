import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
      };

    const register = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confPassword", confPassword);
        formData.append("file", file);
        try {
            await axios.post('http://localhost:5000/users', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                if (res.status === 201)
                    toast.success('Register Complete', {
                    position: toast.POSITION.TOP_RIGHT
                    });
                    navigate('/');
                });
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
        <form onSubmit={register}>
        <h2 class="mb-4">Register</h2>
        <div class="form-group">
            <label for="email"></label>
            <input required type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div class="form-group">
            <label for="username"></label>
            <input required type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div class="form-group">
            <label for="email"></label>
            <input required type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div class="form-group">
            <label for="password"></label>
            <input required type="password" class="form-control" id="password" aria-describedby="paswordHelp" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div class="form-group">
            <label for="confirmPassword"></label>
            <input required type="password" class="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
        </div>
        <div class="form-group mt-3">
          <label for="image">Profile Image</label>
          <div class="custom-file mt-1">
            <input type="file" class="custom-file-input" id="image" onChange={loadImage} />
          </div>
          {preview ? (
            <figure className="figure-img rounded w-25 ">
              <img alt='profile' id="imagePreview" class="img-thumbnail mt-2" src={preview}/>
            </figure>
          ) : (
            ""
          )}
          
        </div>
            <button type="submit" class="btn btn-primary my-4">Register</button>
        </form>
    </div>
</div>
  )
}

export default Register