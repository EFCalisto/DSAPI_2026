const Disciplina = require("../models/disciplina.model");

class DisciplinaController {

    static async listar(req, res) {

        try {

            const disciplinas = await Disciplina.listar(req.usuario.id);

            return res.status(200).json(disciplinas);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao listar disciplinas."
            });

        }

    }

    static async buscarPorId(req, res) {

        try {

            const disciplina = await Disciplina.buscarPorId(req.params.id);

            if (!disciplina) {
                return res.status(404).json({
                    erro: "Disciplina não encontrada."
                });
            }

            return res.status(200).json(disciplina);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao buscar disciplina."
            });

        }

    }

    static async criar(req, res) {

        try {

            const { nome, professor, periodo } = req.body;

            if (!nome) {
                return res.status(400).json({
                    erro: "Nome é obrigatório."
                });
            }

            const id = await Disciplina.criar({

                nome,
                professor,
                periodo,
                usuario_id: req.usuario.id

            });

            return res.status(201).json({
                mensagem: "Disciplina cadastrada.",
                id
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao cadastrar disciplina."
            });

        }

    }

    static async atualizar(req, res) {

        try {

            await Disciplina.atualizar(req.params.id, req.body);

            return res.status(200).json({
                mensagem: "Disciplina atualizada."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao atualizar disciplina."
            });

        }

    }

    static async excluir(req, res) {

        try {

            await Disciplina.excluir(req.params.id);

            return res.status(200).json({
                mensagem: "Disciplina removida."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro ao excluir disciplina."
            });

        }

    }

}

module.exports = DisciplinaController;