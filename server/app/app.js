const CONFIG = require("./config/locan.env.dev");
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';


mongoose.connection.close();
mongoose.connect(CONFIG.DB.mongo.uri, { useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('Successfully connected to MongoDB'))
.catch(err => console.error(err.message));

const app = express();

require('./express').default(app);
require('./routes').default(app);
require('./graphQL').default(app);

const server = http.Server(app);

require('./socket').default(server);

server.listen(CONFIG.SERVER.PORT, () => console.log('Server listening on port 3000'));


