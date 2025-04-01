import { Router, Request, Response } from "express";
import sql from "./db";

const router = Router();

router.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await sql`
      SELECT id, name, importance, status 
        FROM todos 
        ORDER BY importance DESC;

    `; // Consulta a PostgreSQL

    res.json(todos);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

router.post("/todos", async (req: Request, res: Response) => {
  const { name, importance } = req.body;

  if (!name || !importance) {
    return res.status(400).json({ error: "Nombre e importancia son obligatorios" });
  }

  try {
    const [newTodo] = await sql`
      INSERT INTO todos (name, importance, status)
      VALUES (${name}, ${importance}, 'Pendiente')
      RETURNING *;
    `;
    res.json(newTodo);
  } catch (error) {
    console.error("Error al agregar To-Do:", error);
    res.status(500).json({ error: "Error al agregar To-Do" });
  }
});

router.put("/todos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, importance, status } = req.body;
  
    try {
      const [updatedTodo] = await sql`
        UPDATE todos
        SET name = ${name}, importance = ${importance}, status = ${status}
        WHERE id = ${id}
        RETURNING *;
      `;
      res.json(updatedTodo);
    } catch (error) {
      console.error("Error al actualizar To-Do:", error);
      res.status(500).json({ error: "Error al actualizar To-Do" });
    }
  });

export default router;
