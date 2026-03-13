import pool from "../config/db.js";

const getDetails = async(req, res) => {
    const { name } = req.params;

    try {
        const data = await pool.query(
            `select * from q1 where first_name ilike '${name}%'`
        )
    
        res.status(200).json({
            success: true,
            message: "Data fetched",
            data: data.rows
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        })
    }

    // res.status(500).json({
    //         success: false,
    //         message: "Server error",
    //         data: null
    //     })
}

export { getDetails }