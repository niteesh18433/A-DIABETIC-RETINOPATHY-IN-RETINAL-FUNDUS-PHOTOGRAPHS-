import express from 'express';
const router = express.Router();

import LogControllers from './log.controller.js';

const logController = new LogControllers();

router.get('/fetchAllLogs', (req, res) => {
  logController.getAllLogs(req, res);
});

router.post('/create', (req, res) => {
  logController.createLog(req, res);
});

router.get('/getFilteredLogs', (req, res) => {
  logController.getFilteredLogs(req, res);
});

export default router;