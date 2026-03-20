import pool from "../config/db.js";

const insertTask = async (req, res) => {
  try {
    const { todo_name } = req.body;

    const insertValue = await pool.query(
      "insert into todos (todo_name) values ($1) returning *",
      [todo_name],
    );

    res.status(201).json({
      message: "Task added successfully",
      data: insertValue.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding task",
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const getValue = await pool.query("select * from todos");

    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: getValue.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updateValue = await pool.query(
      "update todos set iscompleted = true where todo_id = $1 returning *",
      [id],
    );

    res.status(200).json({
      message: "Task marked as completed",
      data: updateValue.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error marking task as completed",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("delete from todos where todo_id = $1", [id]);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

export { insertTask, getTasks, completeTask, deleteTask };
