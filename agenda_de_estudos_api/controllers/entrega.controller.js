const Entrega = require("../models/entrega.model");

class EntregaController {

    static async listar(req, res) {

        try {

            const entregas = await Entrega.listar(req.usuario.id);

            return res.json(entregas);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao listar entregas."
            });

        }

    }

    static async buscarPorId(req, res) {

        try {

            const entrega = await Entrega.buscarPorId(req.params.id);

            if (!entrega) {

                return res.status(404).json({
                    erro: "Entrega não encontrada."
                });

            }

            return res.json(entrega);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao buscar entrega."
            });

        }

    }

    static async criar(req, res) {

        try {

            const id = await Entrega.criar({

                ...req.body,

                usuario_id: req.usuario.id

            });

            return res.status(201).json({
                mensagem: "Entrega cadastrada.",
                id
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao cadastrar entrega."
            });

        }

    }

    static async atualizar(req, res) {

        try {

            await Entrega.atualizar(req.params.id, req.body);

            return res.json({
                mensagem: "Entrega atualizada."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao atualizar entrega."
            });

        }

    }

    static async excluir(req, res) {

        try {

            await Entrega.excluir(req.params.id);

            return res.json({
                mensagem: "Entrega removida."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao excluir entrega."
            });

        }

    }

}

module.exports = EntregaController;