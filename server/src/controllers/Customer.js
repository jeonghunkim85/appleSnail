
import express from 'express';
import bodyParser from 'body-parser';
import tokenPassport from '../services/tokenPassport';
import { defaultErrorHandler, Mapper } from '../helpers';
// import { reservationService } from '../services';
import { customerService } from '../services';

const router = express.Router();


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


//////////////////////////////////////////////////////
// /api/service/
// 서비스 리스트
//////////////////////////////////////////////////////
router.post('/search',
  (req, res) => {
    const user = req.user;
    const companyNo = user.cn;

    const criteria = {
      companyNo
    }

    customerService.getCustomerList(criteria).then(result => {
      res.send(result);
    }).catch(err=> defaultErrorHandler(res, err));
    
});


export default router;