const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const models = require('../models');
const User = models.user;
const Posts = models.posts;
chai.use(chaiHttp);

let token;

let newUserTest = {
    email: getRandomEmail('@test.com', 9),
    password: getRandomEmail('', 5),
};

describe('Users Route', function() {
    after(function(done) {
        console.log('Deleting Test User');
        User.destroy({
            where: {
                email: newUserTest.email,
            },
        });
        User.findOne({ where: { email: newUserTest.email } }).then(res => {
            expect(res).to.equal(null);
            done();
        });
    });

    describe('signup', () => {
        it('should create new user if unique email', done => {
            chai.request('http://localhost:3000/api/')
                .post('user/signup')
                .send(newUserTest)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    done();
                });
        });

        it('should fail signup if account with given email already exists', done => {
            chai.request('http://localhost:3000/api/')
                .post('user/signup')
                .send(newUserTest)
                .end((err, res) => {
                    expect(res.status).to.equal(500);
                    done();
                });
        });
    });

    describe('login', () => {
        it('should authenticate user, and send token back if credentials are correct', done => {
            chai.request('http://localhost:3000/api/')
                .post('user/login')
                .send(newUserTest)
                .end((err, res) => {
                    token = res.body.token;
                    expect(res.status).to.equal(200);
                    expect(token).to.not.equal(null);
                    done();
                });
        });

        it('should not authenticate user if credentials are incorrect, return unauthorized', done => {
            chai.request('http://localhost:3000/api/')
                .post('user/login')
                .send({ email: 'test@dasfaewfwef.com', password: 'asd' })
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.token).to.equal(undefined);
                    done();
                });
        });
    });
});

describe('Posts Route', function() {
    let postId;
    after(function(done) {
        Posts.destroy({
            where: {
                id: postId,
            },
        }).then(res => {
            expect(res).to.equal(1);
            done();
        });
    });

    it('should allow post if logged in', done => {
        chai.request('http://localhost:3000/api/')
            .post('posts')
            .set({ Authorization: 'Bearer ' + token })
            .send({
                title: 'Test Title',
                content: 'Test Content',
                imagepath:
                    'http://localhost:3000/api/' + '/images/' + 'testFIleName',
            })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                postId = res.body.post.id;
                done();
            });
    });

    it('should not allow post if not logged in', done => {
        chai.request('http://localhost:3000/api/')
            .post('posts')
            .set({ Authorization: 'Bearer ' + 'adwdwdaawd' })
            .send({
                title: 'Test Title',
                content: 'Test Content',
                imagepath:
                    'http://localhost:3000/api/' + '/images/' + 'testFIleName',
            })
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });
});

function getRandomEmail(domain, length) {
    let text = '';
    let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + domain;
}
