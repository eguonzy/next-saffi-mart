const logger = {
  info: (message: string | undefined | unknown) => {
    console.log("\x1b[36m%s\x1b[0m", message);
  },
  warning: (message: string) => console.log("\x1b[33m%s\x1b[0m", message),
  error: (message) => console.log("\x1b[31m%s\x1b[0m", message),
};

export default logger;
