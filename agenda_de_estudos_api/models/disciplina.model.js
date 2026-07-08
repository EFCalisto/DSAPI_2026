const db = require('../config/database');

class Disciplina {

    static async listar(usuarioId) {

        const [rows] = await db.query(
            `SELECT *
             FROM disciplinas
             WHERE usuario_id = ?
             ORDER BY nome`,
            [usuarioId]
        );

        return rows;
    }

    static async buscarPorId(id) {

        const [rows] = await db.query(
            `SELECT *
             FROM disciplinas
             WHERE id = ?`,
            [id]
        );

        return rows[0];
    }

    static async criar(disciplina) {

        const {
            nome,
            professor,
            periodo,
            usuario_id
        } = disciplina;

        const [result] = await db.query(
            `INSERT INTO disciplinas
            (nome,professor,periodo,usuario_id)
            VALUES (?,?,?,?)`,
            [nome, professor, periodo, usuario_id]
        );

        return result.insertId;
    }

    static async atualizar(id, disciplina) {

        const {
            nome,
            professor,
            periodo
        } = disciplina;

        await db.query(
            `UPDATE disciplinas
             SET nome=?,
                 professor=?,
                 periodo=?
             WHERE id=?`,
            [nome, professor, periodo, id]
        );
    }

    static async excluir(id) {

        await db.query(
            `DELETE FROM disciplinas
             WHERE id=?`,
            [id]
        );
    }

}

module.exports = Disciplina;