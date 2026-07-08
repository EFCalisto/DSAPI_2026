const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario.model");

class AuthController {

    // Cadastro de usuário
    static async registrar(req, res) {

        try {

            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    erro: "Todos os campos são obrigatórios."
                });
            }

            // Verifica se já existe
            const usuarioExistente = await Usuario.buscarPorEmail(email);

            if (usuarioExistente) {
                return res.status(409).json({
                    erro: "E-mail já cadastrado."
                });
            }

            // Criptografa a senha
            const senhaHash = await bcrypt.hash(senha, 10);

            const id = await Usuario.criar({
                nome,
                email,
                senha: senhaHash
            });

            return res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso.",
                id
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });

        }

    }

    // Login
    static async login(req, res) {

        try {

            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    erro: "Informe email e senha."
                });
            }

            const usuario = await Usuario.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).json({
                    erro: "E-mail ou senha inválidos."
                });
            }

            if (senha !== usuario.senha) {
                return res.status(401).json({
                    erro: "E-mail ou senha inválidos."
                });
}

            const token = jwt.sign(
                {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "8h"
                }
            );

            return res.status(200).json({
                mensagem: "Login realizado com sucesso.",
                token
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });

        }

    }

}

module.exports = AuthController;