
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';

require('./helpers/passport');



exports.default = app => {
  app.use(morgan('dev'));
  
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
  
  app.use(passport.initialize());
  
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, AccessCode');
    res.header('Access-Control-Expose-Headers', 'File-Name');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Cache-Control', 'no-cache');
    
    // intercept OPTIONS method
    if(req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
};