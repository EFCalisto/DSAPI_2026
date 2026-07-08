const db = require('../config/database');

class Entrega {

    static async listar(usuarioId) {

        const [rows] = await db.query(
            `
            SELECT
                e.*,
                d.nome AS disciplina
            FROM entregas e
            INNER JOIN disciplinas d
                ON d.id = e.disciplina_id
            WHERE e.usuario_id = ?
            ORDER BY data_entrega
            `,
            [usuarioId]
        );

        return rows;
    }

    static async buscarPorId(id) {

        const [rows] = await db.query(
            `SELECT * FROM entregas WHERE id=?`,
            [id]
        );

        return rows[0];
    }

    static async criar(entrega) {

        const {
            titulo,
            descricao,
            data_entrega,
            prioridade,
            status,
            disciplina_id,
            usuario_id
        } = entrega;

        const [result] = await db.query(
            `
            INSERT INTO entregas
            (
                titulo,
                descricao,
                data_entrega,
                prioridade,
                status,
                disciplina_id,
                usuario_id
            )
            VALUES
            (?,?,?,?,?,?,?)
            `,
            [
                titulo,
                descricao,
                data_entrega,
                prioridade,
                status,
                disciplina_id,
                usuario_id
            ]
        );

        return result.insertId;
    }

    static async atualizar(id, entrega) {

        await db.query(
            `
            UPDATE entregas
            SET
                titulo=?,
                descricao=?,
                data_entrega=?,
                prioridade=?,
                status=?,
                disciplina_id=?
            WHERE id=?
            `,
            [
                entrega.titulo,
                entrega.descricao,
                entrega.data_entrega,
                entrega.prioridade,
                entrega.status,
                entrega.disciplina_id,
                id
            ]
        );
    }

    static async excluir(id) {

        await db.query(
            `DELETE FROM entregas WHERE id=?`,
            [id]
        );
    }

}

module.exports = Entrega;