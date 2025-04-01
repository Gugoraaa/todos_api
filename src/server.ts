import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import sql from "./db"; // Asegúrate de importar tu conexión a la base de datos

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 5000;

// Intenta conectar a la base de datos antes de iniciar el servidor
const startServer = async () => {
  try {
    await sql`SELECT 1`; // Prueba una consulta para verificar la conexión
    console.log("✅ Conectado a la base de datos PostgreSQL");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1); // Detiene la ejecución si la conexión falla
  }
};

startServer();
