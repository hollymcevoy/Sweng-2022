import { auth } from 'express-oauth2-jwt-bearer';
import { auth0_base_url, auth0_domain } from "../config";
export const authMiddleware = auth({
    audience: auth0_domain,
    issuerBaseURL: auth0_base_url
});