const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const cors = require('cors');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {maxAge: 604800000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(cors());
app.use(session(sess)); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`NOW Listening http://localhost:${PORT}`));
  });