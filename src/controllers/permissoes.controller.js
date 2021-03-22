// const Permissoes = require("../models/permissoes");

// exports.buscarTodos = async (request, response, next) => {
//   let limite = parseInt(request.params.limite || 0);
//   let pagina = parseInt(request.params.pagina || 0);

//   if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
//     response.status(400).send();
//   }

//   const ITENS_POR_PAGINA = 10;

//   limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
//   pagina = pagina <= 0 ? 0 : pagina * limite;

//   await Permissoes.findAll({
//     limit: limite,
//     offset: pagina
//   }).then(permissoes => {
//     response.send(permissoes);

//   }).catch(error => next(error));
// };