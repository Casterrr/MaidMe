const express = require('express');

const RegisterController = require('./controllers/RegisterController');
const ProfileController = require('./controllers/ProfileController');
const MailController = require('./controllers/MailController');

const routes = express.Router();

routes.get('/housekeepers', RegisterController.index);
routes.post('/housekeepers', RegisterController.create);
routes.delete('/housekeepers', RegisterController.delete);

routes.get('/mail', MailController.sendEmailVerifiCode);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;