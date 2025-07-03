/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import profileImage from '../images/blank-profile-picture-g76cb0bab4_1280.png';
import { useMediaQuery } from '@mui/material';
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone';
import axios from 'axios';
import Swal from 'sweetalert2';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const profileDetails = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_USER_KEY)
  );

  const isMobile = useMediaQuery('(max-width: 600px)');
  const onClickLogout = async () => {
    const url = `${process.env.REACT_APP_API}/emp/logout`;
    const jwttoken = Cookies.get(`${process.env.REACT_APP_TOKEN}`);
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwttoken}`,
    };
    await axios.post(url, {}, { headers });
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Successfully loggedout',
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      Cookies.remove(`${process.env.REACT_APP_TOKEN}`);
      localStorage.removeItem(`${process.env.REACT_APP_USER_KEY}`);
      navigate('/login');
    }, 2000);
  };

  return (
    <div className='nav_container'>
      <div className='nav-header ms-1 ms-md-2 '>
        <Link className='brand-logo' to='/'>
          <img src='../../logo.svg' alt='hetero' className='navbar-logo' />
        </Link>
      </div>
      <div className='header  ms-auto'>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='nav-item d-flex align-items-center'></div>
              <ul
                className='navbar-nav header-right collapse navbar-collapse d-flex justify-content-between'
                id='navbarNavDropdown'>
                <li>
                  <Link
                    to='/'
                    className={`header-navigator ${
                      pathname === '/' ? 'activetab' : ''
                    }`}>
                    Sales
                  </Link>
                </li>
                <li>
                  <div className='btn-group'>
                    <button
                      className={`reports-btn dropdown-toggle  header-navigator ${
                        pathname.startsWith('/salesdata') ? 'activetab' : ''
                      }`}
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      Reports
                    </button>
                    <ul className='dropdown-menu'>
                      <li>
                        <Link
                          to='/salesdata/product'
                          className='header-navigator dropdown-item'>
                          Sales Performance by Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/salesdata/customerswise'
                          className='header-navigator dropdown-item'>
                          Sales by Customer Segmentation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {profileDetails.Desginationid === '1' && (
                  <li>
                    <Link
                      to='/logs'
                      className={`header-navigator ${
                        pathname === '/logs' ? 'activetab' : ''
                      }`}>
                      Logs
                    </Link>{' '}
                  </li>
                )}

                <li className='nav-item dropdown header-profile dropdown '>
                  <a
                    className={`nav-link i-false ${
                      isMobile ? '' : 'dropdown-toggle'
                    }`}
                    style={{ cursor: 'pointer', width: '100%' }}
                    id='react-aria806600641-5'
                    aria-expanded='false'
                    data-bs-toggle='dropdown'>
                    <img
                      src={profileDetails.image_src}
                      alt='propic'
                      className='profile-logo'
                    />
                  </a>
                  <div
                    x-placement='bottom-start'
                    aria-labelledby='react-aria806600641-5'
                    className='mt-3 dropdown-menu dropdown-menu-end dropdown-menu'
                    data-popper-reference-hidden='false'
                    data-popper-escaped='false'
                    data-popper-placement='bottom-start'>
                    <button className='dropdown-item ai-icon'>
                      <Link
                        to='/profile'
                        className='text-dark text-decoration-none'>
                        <svg
                          id='icon-user1'
                          xmlns='http://www.w3.org/2000/svg'
                          className='text-primary me-1'
                          width={18}
                          height={18}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'>
                          <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        <span className='ms-2'>{profileDetails?.EmpName}</span>
                      </Link>
                    </button>
                    <button className='dropdown-item ai-icon'>
                      <Link
                        to='/resetPassword'
                        className='text-dark text-decoration-none'>
                        <svg
                          id='icon-reset'
                          className='text-danger me-1'
                          width={22}
                          height={22}>
                          <LockResetTwoToneIcon color='primary' />
                        </svg>
                        <span className='ms-2'>Change Password</span>
                      </Link>
                    </button>
                    <button
                      className='dropdown-item ai-icon'
                      onClick={onClickLogout}
                      style={{ cursor: 'pointer' }}>
                      <svg
                        id='icon-logout'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-danger me-1'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                        <polyline points='16 17 21 12 16 7' />
                        <line x1={21} y1={12} x2={9} y2={12} />
                      </svg>
                      <span className='ms-2'>Logout </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
