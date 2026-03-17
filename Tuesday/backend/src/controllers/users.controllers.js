import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from "jsonwebtoken"

const registerUser = async(req ,res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const insertData = await pool.query(
            "insert into users (name, email, password) values ($1, $2, $3) returning name",[name, email, hashedPassword]
        )
    
        res.status(201).json({
            success: true,
            message: `${insertData} user created successfully`,
            data: null
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server error`,
            data: error
        })
    } 
}


const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {

        // console.log(email, password)
        const user = await pool.query(
            "select * from users where email = $1", [email]
        )

        const existingUser = user.rows[0];

        const isMatched = await bcrypt.compare(password, existingUser.password);

        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
                data: null
            });
        }

        const token = jwt.sign(
            {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({
            success: true,
            message: "User loggedin successfully",
            data: {
                token,
                user: {
                    name: existingUser.name,
                    email: existingUser.email
                }
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: error
        })
    }
}

export { registerUser, loginUser }