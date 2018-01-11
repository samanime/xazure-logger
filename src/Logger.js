export const Levels = {
  ERROR: 100,
  WARN: 50,
  INFO: 20,
  LOG: 10,
  DEBUG: 0
};

export const getDefaultConfig = () => ({
  level: Levels.VERBOSE,
  plugins: []
});

export const Logger = (initialConfig = {}) => {
  let plugins = [];
  const config = Object.assign({}, getDefaultConfig(), initialConfig);

  const shouldLog = messageLevel => messageLevel >= config.level;

  const log = (level, messages) => shouldLog(level) && plugins.forEach(p => p(level, messages));

  return {
    error(...messages) { log(Levels.ERROR, messages); },
    warn(...messages) { log(Levels.WARN, messages); },
    info(...messages) { log(Levels.INFO, messages); },
    log(...messages) { log(Levels.LOG, messages); },
    debug(...messages) { log(Levels.DEBUG, messages); },
    logAt: (level, ...messages) => shouldLog(level) && console.log.apply(console, messages),
    configure(newConfig) {
      Object.assign(config, newConfig);
      plugins = config.plugins.map(p => p(config))
    }
  };
};

export default Logger();