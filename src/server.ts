import app from './app';
import { env } from './config/env.config';
import { connectDB } from './config/db.config';
import logger from './logger';

const startServer = async () => {
  try {
    // Database connection
    await connectDB();

    const PORT = env.PORT;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server', error);
    process.exit(1);
  }
};

startServer();
