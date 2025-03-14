import { load } from "../utilities/authGuard";
// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = load('apiKey');

export const API_BASE = 'https://v2.api.noroff.dev';

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_AUCTION = `${API_BASE}/auction`;

export const API_LISTINGS = `${API_AUCTION}/listings`;

export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;
