export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080/api' //Replace this with the heroku server later.
    : 'http://localhost:8080/api';

export const CLIENT_ORIGIN = 
    process.env.CLIENT_ORIGIN || 'http://localhost:3000'


    