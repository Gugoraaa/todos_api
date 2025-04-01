import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Usa la URL de la base de datos en desarrollo
const sql = neon(process.env.DATABASE_URL!);

export default sql;
