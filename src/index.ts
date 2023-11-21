import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controller/LoginController';
import './controller/CrowllerController';
import './controller/PeopleController';
import './controller/ArticleController';
import router from './router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['yts'],
    maxAge: 24 * 60 * 60 * 1000
  })
);
app.use(router);
app.use('/public/', express.static('./public/'));

app.listen(7001, () => {
  console.log('server is running');
});
