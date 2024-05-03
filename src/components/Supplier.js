import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Supplier() {
  const [nit, setNit] = useState('');
  const [banck, setBanck] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!cookies.get('email')) {
      window.location.href = "./";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleRemittance = (e) => {
    if (nit === '' || banck === '' || accountNumber === '' || amount === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    const transDta = {
        nit: nit,
        bank: banck,
        accountNumber: accountNumber,
        amount: amount
    }

    fetch('https://scwserverb.azurewebsites.net/v1/providers/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transDta)
      }).then(response => {
        if (response.ok) {
          Swal.fire({
            title: "Enviado!",
            text: "El dinero ha sido enviado con éxito",
            icon: "success",
            confirmButtonText: 'Aceptar'
          });
          setNit('');
          setBanck('');
          setAccountNumber('');
          setAmount('');
        } else {
          Swal.fire({
            title: "Error!",
            text: "No se pudo realizar la transacción",
            icon: "error",
            confirmButtonText: 'Aceptar'
          });
        }
      }).catch(error => {
        Swal.fire({
          title: "Error!",
          text: "No se pudo realizar la transacción",
          icon: "error",
          confirmButtonText: 'Aceptar'
        });
      });
  }

  const handleLogout = (e) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        cookies.remove('email', { path: "/" });
        window.location.href = "./";
      }
    });
  }

  return (
    <div className='supplier template d-flex justify-content-center align-items-center w-100 vh-100'>
      <div className='form_container_supplier card p-4 bg-white shadow bg-body-tertiary rounded'>
        <form onSubmit={handleSubmit}>
          <h1 className='text-center'>Proveedor</h1>

          <div className="row">
            <div className="col-lg-6">
              <div className='mb-3'>
                <label htmlFor='nit' className="form-label">Nit</label>
                <input type='text' id='nit' name='nit' value={nit} onChange={e => setNit(e.target.value)}
                  className='form-control' placeholder='Ingrese el nit' autoComplete='nit'></input>
              </div>
            </div>

            <div className="col-lg-6">
              <div className='mb-3'>
                <label htmlFor='banck' className="form-label">Banco</label>
                <input type='text' id='banck' name='banck' value={banck} onChange={e => setBanck(e.target.value)}
                  className='form-control' placeholder='Ingrese el tipo de banco' autoComplete='banck'></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className='mb-3'>
                <label htmlFor='accountNumber' className="form-label">Numero de cuenta</label>
                <input type='text' id='accountNumber' name='accountNumber' value={accountNumber} onChange={e => setAccountNumber(e.target.value)}
                  className='form-control' placeholder='Ingrese el numero de cuenta' autoComplete='accountNumber'></input>
              </div>
            </div>

            <div className="col-lg-6">
              <div className='mb-3'>
                <label htmlFor='amount' className="form-label">Cantidad</label>
                <input type='number' id='amount' name='amount' value={amount} onChange={e => setAmount(e.target.value)}
                  className='form-control' placeholder='Ingrese la cantidad de dinero' autoComplete='amount'></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <button type='submit' onClick={handleRemittance} className='btn btn-primary w-100'>Girar</button>
            </div>

            <div className="col-6">
              <button type='submit' onClick={handleLogout} className='btn btn-danger w-100'>Cerrar Sesión</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Supplier;
