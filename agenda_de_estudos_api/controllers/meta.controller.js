const Meta = require("../models/meta.model");

class MetaController {

    static async listar(req, res) {

        try {

            const metas = await Meta.listar(req.usuario.id);

            return res.json(metas);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao listar metas."
            });

        }

    }

    static async buscarPorId(req, res) {

        try {

            const meta = await Meta.buscarPorId(req.params.id);

            if (!meta) {

                return res.status(404).json({
                    erro: "Meta não encontrada."
                });

            }

            return res.json(meta);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao buscar meta."
            });

        }

    }

    static async criar(req, res) {

        try {

            const id = await Meta.criar({

                ...req.body,

                usuario_id: req.usuario.id

            });

            return res.status(201).json({
                mensagem: "Meta criada.",
                id
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao criar meta."
            });

        }

    }

    static async atualizar(req, res) {

        try {

            await Meta.atualizar(req.params.id, req.body);

            return res.json({
                mensagem: "Meta atualizada."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao atualizar meta."
            });

        }

    }

    static async excluir(req, res) {

        try {

            await Meta.excluir(req.params.id);

            return res.json({
                mensagem: "Meta excluída."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao excluir meta."
            });

        }

    }

}

module.exports = MetaController;