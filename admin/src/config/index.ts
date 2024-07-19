const env = process.env.NODE_ENV || 'local';

const masterConfig = {
  local: {
    server_url: 'http://localhost:5000',
    BASE_URL: 'http://localhost:3000',
  },
  staging: {
    server_url: 'https://staging-api.selfrideinc.com',
    BASE_URL: 'https://staging-api.selfrideinc.com',
  },
  prod: {
    server_url: 'https://rad-api.inaraconsultancy.com',
    BASE_URL: 'https://rad-api.inaraconsultancy.com',
  },
};

export const { server_url, BASE_URL } =
  masterConfig[env as keyof typeof masterConfig];
export const SERVER_ENV = env;
