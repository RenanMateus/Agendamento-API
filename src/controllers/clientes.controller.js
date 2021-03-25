const Agendamento = require("../models/agendamentos");
const Cliente = require("../models/clientes");
const Pendencia = require("../models/pendencia");

exports.buscarUm = async (request, response, next) => {
  const id = request.params.id;

  await Cliente.findByPk(id).then(cliente => {
    if (cliente) {
      response.send({
        status: 1,
        dados: cliente,
        mensagem: 'OK'
      });

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Cliente não encontrado'
      });
    }

  }).catch(error => next(error));
};

exports.buscarTodos = async (request, response, next) => {
  let limite = parseInt(request.query.limite) || 20;
  let pagina = parseInt(request.query.pagina) || 0;
  let totalItens = 0;

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

  await Cliente.findAll({}).then(clientes => {
    totalItens = clientes.length;

    Cliente.findAll({
      limit: limite,
      offset: pagina
    }).then(clientes => {
      response.send({
        status: 1,
        dados: clientes,
        mensagem: 'OK',
        totalItens: totalItens
      });

    }).catch(error => next(error));

  }).catch(error => next(error));
};

exports.criar = async (request, response, next) => {
  const nome = request.body.nome;
  const cpfCnpj = request.body.cpfCnpj;
  const razaoSocial = request.body.razaoSocial;
  const inscricaoEstadual = request.body.inscricaoEstadual ? request.body.inscricaoEstadual : null;
  const segmento = request.body.segmento ? request.body.segmento : null;
  const cep = request.body.cep ? request.body.cep : null;
  const logradouro = request.body.logradouro ? request.body.logradouro : null;
  const numero = request.body.numero ? request.body.numero : null;
  const bairro = request.body.bairro ? request.body.bairro : null;
  const cidade = request.body.cidade ? request.body.cidade : null;
  const uf = request.body.uf ? request.body.uf : null;
  const complemento = request.body.complemento ? request.body.complemento : null;
  const telefone1 = request.body.telefone1;
  const telefone2 = request.body.telefone2 ? request.body.telefone2 : null;
  const responsavel = request.body.responsavel;
  const email = request.body.email ? request.body.email : null;

  await Cliente.create({
    nome: nome,
    cpfCnpj: cpfCnpj,
    razaoSocial: razaoSocial,
    inscricaoEstadual: inscricaoEstadual,
    segmento: segmento,
    cep: cep,
    logradouro: logradouro,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    uf: uf,
    complemento: complemento,
    telefone1: telefone1,
    telefone2: telefone2,
    responsavel: responsavel,
    email: email
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
  const cpfCnpj = request.body.cpfCnpj;
  const razaoSocial = request.body.razaoSocial;
  const inscricaoEstadual = request.body.inscricaoEstadual ? request.body.inscricaoEstadual : null;
  const segmento = request.body.segmento ? request.body.segmento : null;
  const cep = request.body.cep ? request.body.cep : null;
  const logradouro = request.body.logradouro ? request.body.logradouro : null;
  const numero = request.body.numero ? request.body.numero : null;
  const bairro = request.body.bairro ? request.body.bairro : null;
  const cidade = request.body.cidade ? request.body.cidade : null;
  const uf = request.body.uf ? request.body.uf : null;
  const complemento = request.body.complemento ? request.body.complemento : null;
  const telefone1 = request.body.telefone1;
  const telefone2 = request.body.telefone2 ? request.body.telefone2 : null;
  const responsavel = request.body.responsavel;
  const email = request.body.email ? request.body.email : null;

  await Cliente.findByPk(id).then(cliente => {
    if (cliente) {
      Cliente.update({
        nome: nome,
        cpfCnpj: cpfCnpj,
        razaoSocial: razaoSocial,
        inscricaoEstadual: inscricaoEstadual,
        segmento: segmento,
        cep: cep,
        logradouro: logradouro,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        complemento: complemento,
        telefone1: telefone1,
        telefone2: telefone2,
        responsavel: responsavel,
        email: email
      }, {
        where: {
          id: id
        }
      }).then(() => {
        response.status(200).send({
          status: 1,
          dados: {},
          mensagem: 'Cliente Atualizado com sucesso'
        });

      }).catch(error => next(error));

    } else {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Cliente não existente'
      });
    }
  }).catch(error => next(error));
};

exports.excluir = async (request, response, next) => {
  const id = request.params.id;

  Agendamento.findAll({
    where: {
      idCliente: id
    }
  }).then(agendamentos => {
    if (agendamentos.length > 0) {
      response.status(200).send({
        status: 2,
        dados: {},
        mensagem: 'Não épossível excluir o cliente\nExiste agendamentos para esse cliente'
      });

    } else {
      Pendencia.findAll({
        where: {
          idCliente: id
        }
      }).then(pendencias => {
        if (pendencias.length > 0) {
          response.send({
            status: 2,
            dados: {},
            mensagem: 'Não é possível excluir o cliente\nExiste pendências para esse cliente'
          });

        } else {
          Cliente.findByPk(id).then(cliente => {
            if (cliente) {
              Cliente.destroy({
                where: {
                  id: id
                }

              }).then(() => {
                response.status(200).send({
                  status: 1,
                  dados: {},
                  mensagem: 'Cliente excluido com sucesso'
                });

              }).catch(error => next(error));

            } else {
              response.status(200).send({
                status: 2,
                dados: {},
                mensagem: 'Cliente não existente'
              });
            }
          }).catch(error => next(error));
        }

      }).catch(error => next(error));
    }

  }).catch(error => next(error));

};