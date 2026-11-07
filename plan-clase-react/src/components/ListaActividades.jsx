
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_NOCODB_URL, {
      method: 'GET',
      headers: {
        'xc-token': import.meta.env.VITE_NOCODB_TOKEN,
        'Content-Type': 'application/json'
      }
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        return respuesta.json();
      })
      .then((datos) => {
        const registros = datos.records || datos.list || [];
        setActividades(registros);
      })
      .catch((error) => {
        console.error('Error al obtener actividades:', error);
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando actividades...</p>;
  }

  if (error) {
    return <p>Error al cargar actividades: {error}</p>;
  }

  return (
    <section className="seccion-actividades">
      <motion.h2
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Actividades complementarias
      </motion.h2>

      <div className="lista-actividades-nocodb">
        {actividades.length === 0 ? (
          <p>No se encontraron actividades.</p>
        ) : (
          actividades.map((item, index) => {
            const campos = item.fields || item;

            return (
              <motion.article
                className="tarjeta-actividad-nocodb"
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <h3>{campos.title}</h3>

                <span className="duracion-actividad">
                  Duración: {campos.duration} minutos
                </span>

                <p>
                  Categoría: {campos.category}
                </p>

                <p>
                  {campos["Descripción"]}
                </p>

                <span>
                  Estado: {campos.completed ? 'Completada' : 'Pendiente'}
                </span>
              </motion.article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ListaActividades;
