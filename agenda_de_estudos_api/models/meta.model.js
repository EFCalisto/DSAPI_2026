const db = require('../config/database');

class Meta {

    static async listar(usuarioId) {

        const [rows] = await db.query(
            `
            SELECT
                m.*,
                d.nome AS disciplina
            FROM metas m
            INNER JOIN disciplinas d
                ON d.id = m.disciplina_id
            WHERE m.usuario_id = ?
            ORDER BY data_fim
            `,
            [usuarioId]
        );

        return rows;
    }

    static async buscarPorId(id) {

        const [rows] = await db.query(
            `SELECT * FROM metas WHERE id=?`,
            [id]
        );

        return rows[0];
    }

    static async criar(meta) {

        const {
            titulo,
            descricao,
            horas,
            status,
            data_inicio,
            data_fim,
            disciplina_id,
            usuario_id
        } = meta;

        const [result] = await db.query(
            `
            INSERT INTO metas
            (
                titulo,
                descricao,
                horas,
                status,
                data_inicio,
                data_fim,
                disciplina_id,
                usuario_id
            )
            VALUES
            (?,?,?,?,?,?,?,?)
            `,
            [
                titulo,
                descricao,
                horas,
                status,
                data_inicio,
                data_fim,
                disciplina_id,
                usuario_id
            ]
        );

        return result.insertId;
    }

    static async atualizar(id, meta) {

        await db.query(
            `
            UPDATE metas
            SET
                titulo=?,
                descricao=?,
                horas=?,
                status=?,
                data_inicio=?,
                data_fim=?,
                disciplina_id=?
            WHERE id=?
            `,
            [
                meta.titulo,
                meta.descricao,
                meta.horas,
                meta.status,
                meta.data_inicio,
                meta.data_fim,
                meta.disciplina_id,
                id
            ]
        );
    }

    static async excluir(id) {

        await db.query(
            `DELETE FROM metas WHERE id=?`,
            [id]
        );
    }

}

module.exports = Meta;