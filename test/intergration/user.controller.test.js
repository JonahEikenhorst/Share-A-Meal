const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const server = require('../../index');
let database = [];

chai.should();
chai.use(chaiHttp);

describe('Manage users', ()=> {
    describe('UC201 create user /api/user', () => {
        beforeEach((done) => {
            //empty database
            database = [];
            done();
        });
        it('TC-201-1 should return a valid error when required input is missing', (done) => {
            chai
                .request(server)
                .post('/api/user')
                .send({
                    // email is misssing
                    password: 'test123',
                })
                .end((err, res) => {
                    res.should.be.an('object');
                    let { status, result } = res.body;
                    status.should.equals(400);
                    result.should.be.a('string').that.equals('Email Adress must be a string');
                    done();
                });
        });
    });

});