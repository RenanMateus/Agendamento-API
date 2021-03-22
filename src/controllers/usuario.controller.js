const Usuario = require("../models/usuario");
const md5 = require('md5');

exports.buscarUm = (request, response, next) => {
  const id = request.params.id;

  Usuario.findByPk(id, {
    include: ['perfis']
  }).then(usuario => {
    if (usuario) {
      response.send({
        status: 1,
        dados: usuario,
        mensagem: 'OK'
      });

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Usuário não encontrado'
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
      mensagem: 'Erro'
    });
  }

  const ITENS_POR_PAGINA = 20;

  limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
  pagina = pagina <= 0 ? 0 : pagina * limite;

  await Usuario.findAll({
    limit: limite,
    offset: pagina,
    include: ['perfis']
  }).then(usuarios => {
    response.send({
      status: 1,
      dados: usuarios,
      mensagem: 'OK'
    });

  }).catch(error => next(error));
};

exports.criar = async (request, response, next) => {
  const email = request.body.email;
  let senha = request.body.senha;
  const idPerfil = request.body.idPerfil;
  const nome = request.body.nome;

  senha = md5(senha);

  await Usuario.create({
    nome: nome,
    email: email,
    senha: senha,
    idPerfil: idPerfil
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
  const email = request.body.email;
  const senha = request.body.senha;
  const idPerfil = request.body.idPerfil;

  await Usuario.findByPk(id).then(usuario => {
    if (usuario) {
      Usuario.update({
        email: email,
        senha: senha,
        idPerfil: idPerfil
      }, {
        where: {
          id: id
        }
      }).then(() => {
        response.status(200).send({
          status: 1,
          dados: {},
          mensagem: 'Usuário Atualizado com sucesso'
        });

      }).catch(error => next(error));

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Usuário não existente'
      });
    }
  }).catch(error => next(error));
};

exports.excluir = async (request, response, next) => {
  const id = request.params.id;

  await Usuario.findByPk(id).then(usuario => {
    if (usuario) {
      Usuario.destroy({
        where: {
          id: id
        }

      }).then(() => {
        response.status(200).send({
          status: 1,
          dados: {},
          mensagem: 'OK'
        });

      }).catch(error => next(error));

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Usuário não existente'
      });
    }
  }).catch(error => next(error));
};

exports.login = async (request, response, next) => {
  const email = request.body.email;
  let senha = request.body.senha;

  senha = md5(senha);

  Usuario.findOne({
    where: {
      email: email,
      senha: senha
    },
    include: ['perfis']
  }).then(usuario => {
    if (usuario) {
      response.send({
        status: 1,
        dados: usuario,
        mensagem: 'OK'
      });

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Login / senha inválido'
      });
    }

  }).catch(error => next(error));
};