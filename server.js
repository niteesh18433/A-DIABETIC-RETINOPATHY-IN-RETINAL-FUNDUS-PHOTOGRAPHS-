import app from './index.js';
import { connectUsingMongoose } from './config/mongodb.js';

app.listen(3000, () => {
  connectUsingMongoose();
  console.log('Server is running on port 3000');
});