import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname"
        }
    }
});

export function logInfo(message: string): void {
    logger.info(`✅ ${message}`);
}

export function logError(message: string): void {
    logger.error(`❌ ${message}`);
}

export function logWarn(message: string): void {
    logger.warn(`⚠️ ${message}`);
}
