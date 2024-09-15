import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    console.log('Cuerpo de la solicitud (request body):', JSON.stringify(loginData));

    try {
      const response = await axios.post('http://localhost:8080/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        
        // Guardar el token o los datos de usuario en el localStorage o en el estado de la app
        localStorage.setItem('token', data.token); // Si estás usando JWT o algún token
        console.log('Login exitoso:', data);

        // Redirigir a otra página (por ejemplo, un dashboard)
        navigate('/Admin'); // Ruta a la que quieres redirigir
      } else {
        setErrorMessage('Login fallido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Error en la solicitud. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
