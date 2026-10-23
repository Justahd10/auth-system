import createEmailClient from "../clients/email";
import createRedisClient from "../clients/redis";
import createPostgresClient from "../clients/postgres";
import ClientsRegister from "../clients/register";



// Clients creation strategys interface
const clients = {
  'postgres': createPostgresClient,
  'redis': createRedisClient,
  'email': createEmailClient
};


function createClients(sessionsConfig, envConfig) {
  // For client config

  // Create client instance

  // return instances
};

function createSessions(clients) {
  // For client instance

  // Create client session
};

function testSessions(clients) {
  // For client instance

  // Test client session
};

function registerClients(clients) {
  // Create register

  // For client instance


  // Register client instance
};

export default function setAppClients(config) {
  // For client configuration

  // Create clients


  // Create sessions


  // Test sessions if required


  // Register clients
};