// http://developmentholic.blogspot.kr/2017/02/react-08-create-react-app-express.html

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import api from './routes';
import models from './models';

const app = express();
const port = 4000;

//bodyParser 
app.use(bodyParser.json());

// app.use('/', express.static(path.join(__dirname, './../../public')));

app.use('/api', api);

models.sequelize.sync().then(function () {
    console.log("----------------------------------------db-loading-has-been-done.");
    app.listen(port, () => {
        console.log('Express is listening on port', port);
    });
});