const Perfil = require("../models/perfil");
const Usuario = require("../models/usuario");

exports.buscarUm = async (request, response, next) => {
  const id = request.params.id;

  await Perfil.findByPk(id).then(perfil => {
    if (perfil) {
      response.send({
        status: 1,
        dados: perfil,
        mensagem: 'OK'
      });

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Perfil não encontrado'
      });
    }

  }).catch(error => next(error));
};

exports.buscarTodos = async (request, response, next) => {
  let limite = parseInt(request.query.limite) || 20;
  let pagina = parseInt(request.query.pagina) || 0;

  if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
    response.status(200).send({
      status: 2,
      dados: {},
      mensagem: 'Error'
    });
  }

  const ITENS_POR_PAGINA = 20;

  limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
  pagina = pagina <= 0 ? 0 : pagina * limite;

  await Perfil.findAll({
    limit: limite,
    offset: pagina
  }).then(perfis => {
    response.send({
      status: 1,
      dados: perfis,
      mensagem: 'OK'
    });

  }).catch(error => next(error));
};

exports.criar = async (request, response, next) => {
  const nome = request.body.nome;
  const permissoes = request.body.permissoes;

  await Perfil.create({
    nome: nome,
    permissoes: permissoes
  }).then(() => {
    response.status(201).send({
      status: 1,
      dados: {},
      mensagem: 'OK'
    });

  }).catch(error => next(error));
};

exports.atualizar = async (request, response, next) => {
  const id = request.params.id;
  const nome = request.body.nome;
  const permissoes = request.body.permissoes;

  await Perfil.findByPk(id).then(perfil => {
    if (perfil) {
      Perfil.update({
        nome: nome,
        permissoes: permissoes
      }, {
        where: {
          id: id
        }
      }).then(() => {
        response.status(200).send({
          status: 1,
          dados: {},
          mensagem: 'Perfil atualizado com sucesso'
        });

      }).catch(error => next(error));

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Perfil não existente'
      });
    }
  }).catch(error => next(error));
};

exports.excluir = async (request, response, next) => {
  const id = request.params.id;
  await Usuario.findAll({
    where: {
      idPerfil: id
    }
  }).then(usuarios => {
    if (usuarios.length > 0) {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'O perfil está sendo utilizado por um usuário'
      });

    } else {
      Perfil.findByPk(id).then(perfil => {
        if (perfil) {
          Perfil.destroy({
            where: {
              id: id
            }

          }).then(() => {
            response.status(200).send({
              status: 1,
              dados: {},
              mensagem: 'Perfil excluido com sucesso'
            });

          }).catch(error => next(error));

        } else {
          response.status(200).send({
            status: 2,
            dados: {},
            mensagem: 'Perfil não encontrado'
          });
        }
      }).catch(error => next(error));
    }

  }).catch(error => next(error));

};