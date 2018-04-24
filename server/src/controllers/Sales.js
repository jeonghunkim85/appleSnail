// https://cheese10yun.github.io/Passport-part1/
// https://github.com/auth0/node-jsonwebtoken

import express from 'express';
import db from '../models';
import bodyParser from 'body-parser';
import tokenPassport from '../services/tokenPassport';

const router = express.Router();
const env = process.env.NODE_ENV || "development";
const config = require('../../config/config.json')[env].jwt;
const jwt = require('jsonwebtoken');


/** middlewares */
router.use(bodyParser.urlencoded({extended: true}));
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
  next();
});

// token 확인
router.use(tokenPassport.auth );

const errHandler = (res, err) => {
  res.status(200).send('err:'+err);
}


//search. 
router.post('/search', 
  (req, res) => {
    db.Sales.findAll().then( result => {
      if(!result){
        res.status(404).send({message: 'there is no data'});
      }else{
        const data = result.map(result => result.dataValues);
        res.status(200).json(data);
      }
    })
  
});

router.get('/:id',
  (req, res) => {
    // db.Sales.find()
    const id = req.url.replace(/[^0-9]/, '');
    console.log('#req id:', new Date(), req.url);

    db.Sales.findOne({where:{salesNo: id}}).then(result => {
      if(result){
        res.status(200).json(result.dataValues);
      }else{
        res.status(404).send({message: 'there is no data'});
      }
    }).catch(err => {
      res.status(500).send({message: 'internal service error'});
    });
});



export default router;