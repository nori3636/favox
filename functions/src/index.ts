import * as functions from 'firebase-functions';
// import * as firebase from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import {
  ping, addNewPlaylist, getItems, getItemByNumber,
} from './handler';
import { verifyRequest } from './auth';

// firebase.initializeApp();

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/', ping);

app.get('/api/secure/', verifyRequest, ping);

app.get('/api/:userID/', getItems);
app.get('/api/:userID/item/:itemNumber', getItemByNumber);
app.post('/api/:userID/spotify/', verifyRequest, addNewPlaylist);

exports.api = functions.https.onRequest(app);
