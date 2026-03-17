import pool from "../config/db.js";

const getUserDetails = async(req, res) => {
    const { name } = req.params;

    try {
        const value = await pool.query(
            `select distinct(u.name), sum(p.amount) as total_amount
                from users as u
                join payments as p
                on 
                u.id = p.user_id
                where u.name = $1
                group by u.name;`, [name]
        )
    
        res.status(200).json({
            success: true,
            message: "Data fetched",
            data: value.rows
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: error
        })
    }
}

export { getUserDetails }