import { pool } from "../../db/index.js"
import type { IRegister } from "./auth.inerface.js"

const User_RegistrationService = async (userData : IRegister) => {
    const {name, email, password, role} = userData

    const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *
        `,[name, email, password, role])

        delete result.rows[0].password

    return result.rows[0]


}




export const authService = {
    User_RegistrationService
}