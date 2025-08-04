/* eslint-disable no-console */
class Logger {
  log(...args: unknown[]) {
    return args;
    console.log(...args);
  }

  error(...args: unknown[]) {
    return args;
    console.error(...args);
  }

  warning(...args: unknown[]) {
    return args;
    console.warn(...args);
  }
}

const logger = new Logger();
export default logger;
