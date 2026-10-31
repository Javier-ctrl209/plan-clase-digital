
import { motion } from "framer-motion";

function ObjetivosCard({ competencia, indicadorLogro }) {
  return (
    <motion.section
      className="tarjeta-objetivo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2>Objetivos de aprendizaje</h2>

      <div className="objetivo">
        <h3>Competencia</h3>
        <p>{competencia}</p>
      </div>

      <div className="objetivo">
        <h3>Indicador de logro</h3>
        <p>{indicadorLogro}</p>
      </div>
    </motion.section>
  );
}

export default ObjetivosCard;

