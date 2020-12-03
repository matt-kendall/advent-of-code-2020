import axios from 'axios';

const sessionToken = '$INSERT_SESSION_TOKEN_HERE$';
axios.defaults.headers.common.Cookie = `session=${sessionToken}`;
