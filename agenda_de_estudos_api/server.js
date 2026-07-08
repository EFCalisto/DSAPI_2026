require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const authRoutes = require("./routes/auth.routes");
const disciplinaRoutes = require("./routes/disciplina.routes");
const metaRoutes = require("./routes/meta.routes");
const entregaRoutes = require("./routes/entrega.routes");

app.use("/auth", authRoutes);
app.use("/disciplinas", disciplinaRoutes);
app.use("/metas", metaRoutes);
app.use("/entregas", entregaRoutes);

app.get("/", (req, res) => {

    res.status(200).json({

        mensagem: "API Agenda de Estudos",

        versao: "1.0.0"

    });

});

app.use((req, res) => {

    res.status(404).json({

        erro: "Rota não encontrada."

    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

});
