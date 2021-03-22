const Agendamento = require("../models/agendamentos");

exports.buscarUm = async (request, response, next) => {
  const id = request.params.id;

  Agendamento.findByPk(id, {
    include: ['clientes', 'usuarios']
  }).then(agendamento => {
    if (agendamento) {
      response.send({
        status: 1,
        dados: agendamento,
        mensagem: 'OK'
      });

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'O Agendamento não existe'
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

  Agendamento.findAll({
    limit: limite,
    offset: pagina,
    include: ['clientes', 'usuarios']
  }).then(agendamentos => {
    response.send({
      status: 1,
      dados: agendamentos,
      mensagem: 'OK'
    });

  }).catch(error => next(error));
};

exports.criar = async (request, response, next) => {
  const inicio = request.body.inicio;
  const situacao = request.body.situacao;
  const idUsuario = request.body.idUsuario;
  const idCliente = request.body.idCliente;
  const solicitante = request.body.solicitante;
  const descricao = request.body.descricao;
  const motivoCancelamento = request.body.motivoCancelamento ? request.body.motivoCancelamento : null;
  const atendimento = request.body.atendimento ? request.body.atendimento : null;

  Agendamento.create({
    inicio: inicio,
    situacao: situacao,
    idUsuario: idUsuario,
    idCliente: idCliente,
    solicitante: solicitante,
    descricao: descricao,
    motivoCancelamento: motivoCancelamento,
    atendimento: atendimento
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
  const inicio = request.body.inicio;
  const situacao = request.body.situacao;
  const idUsuario = request.body.idUsuario;
  const idCliente = request.body.idCliente;
  const solicitante = request.body.solicitante;
  const descricao = request.body.descricao;
  const motivoCancelamento = request.body.motivoCancelamento ? request.body.motivoCancelamento : '';
  const atendimento = request.body.atendimento ? request.body.atendimento : '';

  Agendamento.findByPk(id).then(agendamento => {
    if (agendamento) {
      Agendamento.update({
        inicio: inicio,
        situacao: situacao,
        idUsuario: idUsuario,
        idCliente: idCliente,
        solicitante: solicitante,
        descricao: descricao,
        motivoCancelamento: motivoCancelamento,
        atendimento: atendimento
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
        mensagem: 'O Agendamento não existe'
      });
    }
  }).catch(error => next(error));
};

exports.excluir = async (request, response, next) => {
  const id = request.params.id;

  Agendamento.findByPk(id).then(agendamento => {
    if (agendamento) {
      Agendamento.destroy({
        where: {
          id: id
        }

      }).then(() => {
        response.status(200).send({
          status: 1,
          dados: {},
          mensagem: 'O Agendamento Excluido com sucesso'
        });

      }).catch(error => next(error));

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'O Agendamento não existe'
      });
    }
  }).catch(error => next(error));
};