// config to load in environment variables
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = String(process.env.PORT);
export const auth0_domain = String(process.env.AUTH0_DOMAIN);
export const auth0_base_url = String(process.env.AUTH0_BASE_URL);
