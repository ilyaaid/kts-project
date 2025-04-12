/* eslint-disable no-console */
class Logger {
  log(...args: unknown[]) {
    console.log(...args);
  }

  error(...args: unknown[]) {
    console.error(...args);
  }

  warning(...args: unknown[]) {
    console.warn(...args);
  }
}

const logger = new Logger();
export default logger;
