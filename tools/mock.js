import jsonServer from 'json-server';
import enableDestroy from 'server-destroy';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
// import { chalkSuccess } from '.alkConfig';

let server = null;
const db = './app/data/db.json';
const middlewares = jsonServer.defaults();
let router = jsonServer.router(db);
const token = "1213";

function isAuthorized(req) {
  return true;
  //return req.get("Authorization") == token;
}

function start() {
  const app = jsonServer.create();
  app.use(middlewares);
  app.use(function (req, res, next) {
    if (req.originalUrl == "/api/auth") {
      return res.send({
        access_token: token
      });
    }
    if (req.originalUrl == '' || isAuthorized(req)) { // add your authorization logic here
      // continue to Mock Server router
      next();
    } else {
      res.sendStatus(401);
    }
  });
  // Add this before app.use(router)
  app.use(jsonServer.rewriter({
    '/api1/': '/'
  }));

  app.use(router);
  server = app.listen(4000, function () {
    console.log('-------Mock Server is running-------');
  });
  // Enhance with a destroy function
  enableDestroy(server);
}

chokidar
  .watch(path.dirname(db))
  .on('change', function (file) {
    const obj = JSON.parse(fs.readFileSync(file));
    const isDatabaseDifferent = !_.isEqual(obj, router.db.getState());
    if (isDatabaseDifferent) {
      server && server.destroy();
      router = jsonServer.router(obj);
      start();
    }
  });

start();
