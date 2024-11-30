import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    // Attempt to connect to MongoDB
    const res = await mongoose.connect(config.database_url as string);

    // Check if the connection is successful
    if (res.connection.readyState === 1) {
      console.log('MongoDB connection successful');
    } else {
      console.log('MongoDB connection failed');
    }

    // Start your app after successful connection
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    // Log any connection error
    console.error('Error connecting to MongoDB:', error);
  }
}

main();
