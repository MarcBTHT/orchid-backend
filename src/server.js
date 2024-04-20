import { connect } from './db/connect.js';
import app from './app.js';

const port = process.env.PORT || 3001;

try {
  await connect(); 
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}