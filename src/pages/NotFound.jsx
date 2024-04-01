import React from 'react';
import { useLocation } from 'react-router-dom';
import errorpages from '../assets/404.svg'

function NotFound() {
  const location = useLocation();

  return (
    <>
        <img width='680rem' src={errorpages} />
        <h1>Error 404 Not Found Pages</h1>
        <h2 className="read-the-docs">มันไม่มีหน้า {location.pathname} น้องงงไปเอามาจากไหน!!</h2>
    </>
  );
}

export default NotFound;
