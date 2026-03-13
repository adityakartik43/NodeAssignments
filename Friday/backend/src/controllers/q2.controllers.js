import pool from "../config/db.js";

const getData = async (req, res) => {
  try {
    const data = await pool.query("select * from student;");

    res.status(200).json({
      success: true,
      message: "Data fetched",
      data: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};

const filterStudents = async(req, res) => {

    const { course } = req.params;

    try {
    const data = await pool.query(`select * from student where course = '${course}';`);

    res.status(200).json({
      success: true,
      message: "Data fetched",
      data: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
}

export { getData, filterStudents }
