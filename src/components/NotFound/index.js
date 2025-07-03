import React from 'react';

import './index.css';
import { Link } from 'react-router-dom';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const NotFound = () => {
  return (
    <div id='root'>
      <div className='authincation'>
        <div className='container'>
          <div className='row justify-content-center h-100 align-items-center '>
            <div className='col-md-7'>
              <div className='form-input-content text-center error-page'>
                <h1 className='error-text fw-bold'>404</h1>
                <h4>
                  <BsFillExclamationTriangleFill className='text-warning' />
                  The page you were looking for is not found!
                </h4>
                <p>
                  You may have mistyped the address or the page may have moved.
                </p>
                <div>
                  <Link className='btn btn-danger' to='/'>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
