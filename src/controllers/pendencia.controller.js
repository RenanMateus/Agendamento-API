const Pendencia = require("../models/pendencia");

exports.buscarUm = async (request, response, next) => {
  const id = request.params.id;

  await Pendencia.findByPk(id, {
    include: ['clientes']
  }).then(pendencia => {
    if (pendencia) {
      response.send({
        status: 1,
        dados: pendencia,
        mensagem: 'OK'
      });

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Pendencia não encontrada'
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

  await Pendencia.findAll({
    limit: limite,
    offset: pagina,
    include: ['clientes']
  }).then(pendencias => {
    response.send({
      status: 1,
      dados: pendencias,
      mensagem: 'OK'
    });

  }).catch(error => next(error));
};

exports.criar = async (request, response, next) => {
  const nome = request.body.nome;
  const descricao = request.body.descricao;
  const situacao = request.body.situacao;
  const idCliente = request.body.idCliente ? request.body.idCliente : null;

  await Pendencia.create({
    nome: nome,
    descricao: descricao,
    situacao: situacao,
    idCliente: idCliente
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
  const descricao = request.body.descricao;
  const situacao = request.body.situacao;
  const idCliente = request.body.idCliente ? request.body.idCliente : null;

  await Pendencia.findByPk(id).then(pendencia => {
    if (pendencia) {
      Pendencia.update({
        nome: nome,
        descricao: descricao,
        situacao: situacao,
        idCliente: idCliente
      }, {
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
        mensagem: 'Pendência não existente'
      });
    }
  }).catch(error => next(error));
};

exports.excluir = async (request, response, next) => {
  const id = request.params.id;

  await Pendencia.findByPk(id).then(pendencia => {
    if (pendencia) {
      Pendencia.destroy({
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
        mensagem: 'Pendência não existente'
      });
    }
  }).catch(error => next(error));
};