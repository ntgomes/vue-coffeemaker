/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PropertiesReader = require('properties-reader');
const Sequelize = require('sequelize');
const finale = require('finale-rest');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oa24v71hg6BByTwx4x6',
  issuer: 'https://dev-881738.okta.com/oauth2/default'
});

const pwProp = PropertiesReader(`${__dirname}/props/secureInfo.properties`);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// verify JWT token middleware
app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'));
  }
  const parts = req.headers.authorization.trim().split(' ');
  const accessToken = parts.pop();
  oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default')
    .then((jwt) => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next();
    })
    .catch(next) // jwt did not verify!
});

// Set up the database instance (disable eslint on file to avoid password reveal)
const database = new Sequelize('cm-vue', 'root', pwProp.get('sequelize.db.password').trim(), {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Confirm the connection
database.authenticate().then(() => {
  console.log('Successfully connected to cm-vue database');
}).catch((err) => {
  console.log(`Connection to database failed: ${err}`);
  throw err;
});

// Create the models for the database
const Inventory = require('./models/Inventory');
const Recipe = require('./models/Recipe');

Inventory.init(database, Sequelize);
Recipe.init(database, Sequelize);

// Initialize finale
finale.initialize({
  app,
  sequelize: database
});

// Create the dynamic REST resource for our Inventory model
finale.resource({
  model: Inventory,
  endpoints: ['/inventory']
});
finale.resource({
  model: Recipe,
  endpoints: ['/recipes', '/recipes/:id']
});

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('Listening to port localhost:8081');
    });

    // Set up the initial database environment; reset inventory ingredients
    Inventory.create({
      chocolate: 15,
      coffee: 15,
      milk: 15,
      sugar: 15
    }).then((inventory) => {
      console.log('Set default values to Inventory');
      console.log('Server successfully started');
    }).catch((err) => {
      console.log(`Could not set default values: ${err}`);
    });
  });
