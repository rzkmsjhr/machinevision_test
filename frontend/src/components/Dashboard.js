import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from "react-bootstrap";


const Dashboard = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout').then(res => {
                if (res.status === 200)
                    toast.success('Logout Successfully', {
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

    const [name, setName] = useState('');    
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        refreshToken();
        getPosts();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate('/');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getPosts = async () => {
        const response = await axiosJWT.get('http://localhost:5000/posts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setPosts(response.data);
    }
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
      };

    const createPost = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("tags", tags);
      formData.append("file", file);
      try {
          await axiosJWT.post('http://localhost:5000/posts', formData, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data"
              }
          }).then(res => {
              if (res.status === 201)
                  navigate(0);
                  toast.success('Post Created', {
                    position: toast.POSITION.TOP_RIGHT,

                  });
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
    <div class="container-fluid">
  <div class="row">
    <nav class="col-md-2 d-none d-md-block bg-light sidebar vh-100">
      <div class="sidebar-sticky">
        <ul class="nav flex-column text-center">
          <li class="nav-item">
          <a href="/dashboard" class="nav-link">
            <i className='fa fa-home fa-lg' aria-hidden="false"></i>
          </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              User
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Change Password
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Post
            </a>
          </li>
          <li class="nav-item position-fixed bottom-0">
            <a onClick={Logout} class="nav-link" href="#">
              Logout
              <i className='ms-2 fa fa-sign-out fa-lg' aria-hidden="false"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
      </div>

      <div class="input-group">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <button type="button" class="btn btn-outline-primary">Search</button>
      </div>
      <div class="container mt-4">
        <div class="row row-cols-4">
        {posts.map((posts) => (
            <>
            <div className="col">
            <div className="card">
            <img src={posts.url} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{posts.users.username}</h5>
                <p className="card-text">{posts.caption}</p>
                <p className="card-text">{posts.tags}</p>
            </div>
            </div>
            </div>
            </>
        ))}
        </div>
     </div>
        
     <button data-toggle="modal" data-target="#addpost" onClick={handleShow} type="button" class="btn btn-success rounded-circle position-fixed bottom-0 end-0 my-3 mx-4"><i class="fa fa-plus my-float"></i></button>
      
      <div class="modal fade" id="addpost" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </main>
  </div>
  <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createPost}>
        <Modal.Body>
        
        <div class="form-group">
            <label for="email"></label>
            <input required type="text" class="form-control" id="caption" aria-describedby="captionHelp" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)}/>
        </div>
        <div class="form-group">
            <label for="username"></label>
            <input required type="text" class="form-control" id="tags" aria-describedby="tagsHelp" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)}/>
        </div>
        <div class="form-group mt-3">
          <label for="image">Post Image</label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
        </Form>
        
      </Modal>
  </>
</div>

  )
}

export default Dashboard