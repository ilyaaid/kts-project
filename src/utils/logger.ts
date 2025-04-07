class Logger {
  log(...args: unknown[]) {
    console.log(...args);
  }

  error(...args: unknown[]) {
    console.error(...args);
  }
}

const logger = new Logger();
export default logger;
