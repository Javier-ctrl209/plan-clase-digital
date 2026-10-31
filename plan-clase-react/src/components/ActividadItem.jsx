
import { useState } from "react";
import { motion } from "framer-motion";

function ActividadItem({ actividad, descripcion }) {
  const [completada, setCompletada] = useState(false);

  function cambiarEstado() {
    setCompletada(!completada);
  }

  return (
    <motion.article
      className={`actividad-item ${completada ? "completada" : "pendiente"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3>{actividad}</h3>
        <p>{descripcion}</p>

        <span className="estado-actividad">
          Estado: {completada ? "Completada" : "Pendiente"}
        </span>
      </div>

      <button onClick={cambiarEstado}>
        {completada ? "Marcar como pendiente" : "Completar actividad"}
      </button>
    </motion.article>
  );
}

export default ActividadItem;

