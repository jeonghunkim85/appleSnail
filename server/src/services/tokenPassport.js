// https://github.com/jaredhanson/passport-http-bearer
// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
// import db from '../models';
const env = process.env.NODE_ENV || "development";
const config = require('../../config/config.json')[env].jwt;
const jwt = require('jsonwebtoken');

/**passport */
const tokenPassport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;


/**토큰 체크 로직 */
tokenPassport.use(new Strategy((token, done) => {
  if(!jwt.verify(token, config.secret)){
    return done(err);
  }
  const user = jwt.decode(token);
  return done(null, user);
}));

//로그인 성공시 실행
tokenPassport.serializeUser(function(user, done) {
  // console.log('serializeUser. user:', user);
  done(null, user);
});

//서버로 들어오는 요청마다 실제 DB와 비교
tokenPassport.deserializeUser(function(user, cb) {
  // console.log('deserial');
  db.Users.find({
    where: {
      userId: user.userId
    }
  }).then(user => {
    cb(null, user.dataValues);
  }, err=>{
    // console.log('deserializeUser err', err);
    cb(err);
  })
});


// router.use(passport.session());

export default tokenPassport;