const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'cream5',
    database : 'smartbrainbackend'
  }
});

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("it's working!");
});

app.post('/signin', (req, res) => {signin.handlesignin(req, res, db, bcrypt)})

app.post('/register', (req, res) =>  {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) =>  {profile.handleprofile(req, res, db, bcrypt)})

app.put('/image', (req, res) =>  {image.handleimage(req, res, db)})

app.post('/imageurl', (req, res) =>  {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});



