const request = require('supertest');
const app = require('../server/index.js');
const should = require('should');
const supertest = require('supertest');
//var mongoose = require('mongoose');
// import React from 'react';
// import { shallow, mount, render, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import request from 'supertest';
// import app from '../server/index';

// configure({ adapter: new Adapter() });
 

describe('Test the root path', () => {

  beforeAll(async () => {
    jest.setTimeout(10000);
  });

  test('to return JSON from the experience/similar route', () => {
    request(app)
      .get('/similar/id/111')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if(err) {
          throw err;
        }
      });
  });

  test('It should respond to the root path', async () => {
    const response = await supertest(app).get('/');
    expect(response.statusCode).toBe(200);
  });
  test('It should respond with 404 from a wrong path', async () => {
    const response = await supertest(app).get('/experience/wrong');
    expect(response.statusCode).toBe(404);
  });
  //DOES NOT PASS ON CIRCLE CI YET BUT LOCALLY USING ACTUALY SEEDED DATABASE!
  //UNCOMMENT FOR LOCAL TESTING
  // test('to respond with data from DB', (done) => {
  //   request(app).get('/experience/similar/7').then((result) => {
  //     let check = result.body[0].hasOwnProperty('experience_photo_url');
  //     expect(check).toBe(true);
  //     done();
  //   })
  // })

  // test('to respond with specific/expected data from DB', (done) => {
  //   request(app).get('/experience/similar/7').then((result) => {
  //     let check = result.body[0].experience_category;
  //     expect(check).toEqual('Chrysler');
  //     done();
  //   })
  // })

})




