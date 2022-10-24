import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import UserService from '../services/User';
import {
  findOne, invalidEmail, invalidPassword, noEmail,
  rigthResp, validUser
} from './mocks/login.mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes Session 01', () => {
  beforeEach(sinon.restore);

  describe('Testes rota login', () => {
    it('01 = teste invalidPassword', async () => {

      sinon.stub(User, 'findOne').resolves(findOne as User);
      sinon.stub(bcrypt, 'compare').resolves(false);

      const response = await chai.request(app).post('/login').send(invalidPassword);

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Incorrect email or password');
    });

    it('02 - teste invalido login ou password', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const response = await chai.request(app).post('/login').send(invalidEmail);

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Incorrect email or password');
    });

    it('03  - teste todos os campos devem ser preenchidos', async () => {
      const response = await chai.request(app).post('/login').send(noEmail);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.deep.equal('All fields must be filled');
    });

    it('04 - validação token', async () => {
      sinon.stub(User, 'findOne').resolves(findOne as User);
      sinon.stub(jwt, 'sign').resolves(rigthResp);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const response = await chai.request(app).post('/login').send(validUser);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('token');
    });
  });

  describe('teste rota login/validate', () => {
    it('05 - teste autorização', async () => {
      const response = await chai.request(app).get('/login/validate');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('unauthorized');
    });

    it('06 - teste role', async () => {
      const userService = new UserService();

      sinon.stub(User, 'findOne').resolves(findOne as User);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(userService, 'getRole').resolves({ role: 'admin' });

      const response = await chai.request(app).post('/login').send(validUser);

      const getToken = response.body.token;

      const vldToken = await chai.request(app).get('/login/validate').set('authorization', getToken);

      expect(vldToken.status).to.be.equal(200);
      expect(vldToken.body.role).to.be.equal('admin');
    });
  });
});