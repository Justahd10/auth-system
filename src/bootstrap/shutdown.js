import { clientsConfigs } from "./client-setup";



/**
 * @param {string[]} signals 
 * @param {function} listenFn
 */
export function setTrigger(signals, listenFn) {
  signals.forEach(signal => process.on(signal, listenFn));
};

/**
 * @param {number} time 
 */
export function setSecureTimetout(time) {
  const timeout = setTimeout(() => {
    console.log(
      "Shutdown timed out. Forcing process exit..."
    );
    process.exit(1);
  }, time);

  return timeout
};

/**
 * @param {import('node:http').Server} server 
 */
export function closeHttpSessions(server) {
  server.close();
};

export async function closeClientSessions() {
  for (const config of Object.values(clientsConfigs)) {
    await config.close()
  };
};