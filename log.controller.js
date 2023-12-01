import LogRepository from './log.repository.js';

export default class LogControllers {
  constructor() {
    this.logRepository = new LogRepository();
  }

  async createLog(req, res) {
    try {
      const createdNewLogs = await this.logRepository.createLog(req.body);
      return res.status(201).send(createdNewLogs);
    } catch (error) {
      return res.status(404).send(error);
    }
  }

  async getAllLogs(req, res) {
    try {
      const allLogs = await this.logRepository.allLogs();
      return res.status(201).send(allLogs);
    } catch (error) {
      return res.status(404).send(error);
    }
  }

  async getFilteredLogs(req, res) {
    try {
      const { key, value, from, to } = req.query;
      const logsByFilter = await this.logRepository.getLogsByFilter(key, value, from, to);
      return res.status(200).json(logsByFilter);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}