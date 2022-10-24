import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('deve retornar um status 400', () => {
  it('quando o campo "email" não for informado', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'any_password' })
    expect(httpResponse.status).to.be.eq(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
  it('quando o campo "senha" não for informado', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any-email@any.com' })
    expect(httpResponse.status).to.be.eq(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  })
})

describe('deve retornar um status 401', () => {
  it('quando o campo "email" estiver incorreto', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any-email@any.com', password: 'secret_admin' })
    expect(httpResponse.status).to.be.eq(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('quando o campo "password" estiver incorreto', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'any_password' })
    expect(httpResponse.status).to.be.eq(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  })
})

