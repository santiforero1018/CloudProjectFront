import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
// import md5 from 'md5';
//import crypto from 'crypto-js';
import Cookies from 'universal-cookie';
import logo from '../logo.svg';

const cookies = new Cookies();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (cookies.get('email')) {
      window.location.href = "./supplier";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    console.log(password)

    fetch('https://scwserver.azurewebsites.net/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid email or password');
        }
      }).then(data => {
        cookies.set('email', email, { path: "/" });
        window.location.href = "./supplier";
      }).catch(error => {
          if (error instanceof SyntaxError) {
            Swal.fire({
              title: 'Error!',
              text: 'Error al parsear la respuesta del servidor',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
      });
  }

  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 vh-100'>
      <div className='form_container_login card p-4 bg-white shadow bg-body-tertiary rounded'>
        <form onSubmit={handleSubmit}>
          <div class="text-center">
            <img src={logo} alt="BootstrapBrain Logo" width="150" height="150"></img>
          </div>

          <h1 className='fs-3 fw-normal text-center text-secondary'>Iniciar Sesión</h1>

          <div className='mb-3'>
            <label htmlFor='email' className="form-label">Correo electronico</label>
            <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)}
              className='form-control' placeholder='Ingrese su correo electronico' autoComplete='email'></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className="form-label">Contraseña</label>
            <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)}
              className='form-control' placeholder='Ingrese su contraseña' autoComplete='current-password'></input>
          </div>

          <div className='d-grid'>
            <button className='btn btn-secondary'>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;