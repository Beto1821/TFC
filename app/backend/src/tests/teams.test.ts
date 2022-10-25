import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';
import { Ateams, teamById } from './mocks/teams.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando /teams', () => {
  beforeEach(sinon.restore)

  it('01 - Retorno All Teams', async() => {
    sinon.stub(Teams, 'findAll').resolves(Ateams as Teams[])

    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200)
  })
});

describe('Testando /teams/:id', () => {
  beforeEach(sinon.restore)

  it('02 - Retorno team id', async () => {
    sinon.stub(Teams, 'findOne').resolves(teamById as Teams)

    const response = await chai.request(app).get('/teams/5')

    expect(response.status).to.be.equal(200)
  })

  it('03 - Retorno resposta com erro', async () => {
    sinon.stub(Teams, 'findOne').resolves(null)

    const response = await chai.request(app).get('/teams/33')

    expect(response.status).to.be.equal(400)
  })
});