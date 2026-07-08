const db = require('../config/database');

class Usuario {

    static async buscarPorEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async buscarPorId(id) {
        const [rows] = await db.query(
            'SELECT id,nome,email FROM usuarios WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async criar(usuario) {

        const { nome, email, senha } = usuario;

        const [result] = await db.query(
            `INSERT INTO usuarios
            (nome,email,senha)
            VALUES (?,?,?)`,
            [nome, email, senha]
        );

        return result.insertId;
    }

}

module.exports = Usuario;