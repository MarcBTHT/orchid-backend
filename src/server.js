import { connect } from './db/connect.js';
import app from './app.js';

const port = process.env.PORT || 3001;

try {
  await connect(); 
  await app.listen({
    port: port,
    host: '0.0.0.0' // Listen on all network interfaces
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}