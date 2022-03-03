// config to load in environment variables
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = String(process.env.PORT);

