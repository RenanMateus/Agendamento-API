const http = require("http");
const express = require("express");
const sequelize = require("./database/database");

const agendamentosRoute = require("./routes/agendamentos");
const clienteRoute = require("./routes/cliente");
const pendenciaRoute = require("./routes/pendencia");
const perfilRoute = require("./routes/perfil");
// const permissoesRoute = require("./routes/permissoes");
const usuarioRoute = require("./routes/usuario");

const app = express();

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());

app.use("/api", agendamentosRoute);
app.use("/api", clienteRoute);
app.use("/api", pendenciaRoute);
app.use("/api", perfilRoute);
// app.use("/api", permissoesRoute);
app.use("/api", usuarioRoute);

app.use((request, response, next) => {
  response.status(404).send();
});

app.use((error, request, response, next) => {
  response.status(500).json({
    error
  });
});

sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;

  app.set("port", port);

  const server = http.createServer(app);

  server.listen(port);
});
