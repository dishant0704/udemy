const express = require('express');
const launchesRouter = express.Router();
const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } = require('./launches.controller');

launchesRouter.get('/', httpGetAllLaunches);       // GET /launches
launchesRouter.post('/', httpAddNewLaunch);        // POST /launches
launchesRouter.delete('/:id', httpAbortLaunch);    // DELETE /launches/:id

module.exports = launchesRouter;