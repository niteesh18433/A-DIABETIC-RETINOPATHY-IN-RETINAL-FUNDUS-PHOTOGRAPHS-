import mongoose from 'mongoose';
import { logSchema } from './log.schema.js';

const logModel = mongoose.model('Log', logSchema);

export default class LogRepository {
  async createLog(logData) {
    const log = new logModel(logData);
    const savedLog = await log.save();
    return savedLog;
  }

  async allLogs() {
    const logs = await logModel.find();
    return logs;
  }

  async getLogsByFilter(key, value, fromTimestamp, toTimestamp) {
    try {
      let filter = {};
      if (fromTimestamp) {
        key = 'timestamp';
        filter['timestamp'] = {
          $gte: new Date(fromTimestamp),
          $lte: new Date(toTimestamp)
        };
      } else if (key === 'parentResourceId') {
        filter['metadata.parentResourceId'] = value;
      } else {
        filter[key] = { $regex: value, $options: 'i' };
      }

      const logs = await logModel.find(filter);
      if (logs.length > 0) {
        return logs;
      }
      return 'Logs with the given key/value do not exist';
    } catch (error) {
      throw new Error('Error fetching logs by filter: ' + error.message);
    }
  }
}