import config from "../../config/index.js";
import { pool } from "../../db/index.js"
import type { IRegister } from "./auth.inerface.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User_RegistrationService = async (userData : IRegister) => {
    const {name, email, password, role} = userData

    const hashPassword = await bcrypt.hash(password,10)

    const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *
        `,[name, email, hashPassword, role])

        delete result.rows[0].password

    return result.rows[0]


}

const User_LoginService = async (loginData : {email : string, password : string}) => {
     const {
        email,
        password
    } = loginData

    // find user
    const result =
        await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            `,
            [email]
        )

    const user =
        result.rows[0]
      

    // user not found
    if (!user) {
        throw new Error(
            "User not found"
        )
    }

    // compare password
    const isMatched =
        await bcrypt.compare(
            password,
            user.password
        )

    if (!isMatched) {
        throw new Error(
            "Invalid credentials"
        )
    }

    // generate token
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }
    const token =
        jwt.sign(
            payload,
          config.jwtSecret as string,

            {
                expiresIn: "1d"
            }
        )

    
     const {
        password: _,
        ...userData
    } = user
  

    return {

        token,

        user:userData

    }


}




export const authService = {
    User_RegistrationService,
    User_LoginService
}