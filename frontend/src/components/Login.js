import React from 'react'
const Login = () => {
  return (
<div class="container d-flex justify-content-center align-items-center vh-100 text-center">
    <div className="border border-2 p-5 rounded">
        <form class="">
        <h2 class="mb-4">Login</h2>
            <div class="form-group">
        <label for="email"></label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
            <div class="form-group">
        <label for="password"></label>
            <input type="password" class="form-control" id="password" placeholder="Password"/>
        </div>
            <button type="submit" class="btn btn-primary my-4">Login</button>
        </form>

        <p>Doesn't have account? <a href="/register">Sign Up</a></p>
    </div>
</div>

  )
}

export default Login