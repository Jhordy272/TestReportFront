import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const response = await axios.get('http://localhost:8080/admin/all_users', {
          headers: {
            'Authorization': `Bearer ${token}`, // Agregar el token en el encabezado
            'Content-Type': 'application/json',
          },
        });
        setData(response.data); // Guardar los datos en el estado
      } catch (error) {
        setError(error.message); // Manejar el error
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.rol.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
