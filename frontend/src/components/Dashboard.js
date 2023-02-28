import React from 'react'

const Dashboard = () => {
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
            <a class="nav-link" href="#">
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
    </main>
  </div>
</div>

  )
}

export default Dashboard