import * as winston from "winston";
import "winston-daily-rotate-file";

const myFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    }
);

const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    format: winston.format.combine(
        winston.format.label({ label: "MQTT Server - WMS" }),
        winston.format.timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            level: "info",
            filename: "logs/info/%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
        }),
        new winston.transports.DailyRotateFile({
            level: "error",
            filename: "logs/error/%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
        }),
        new winston.transports.DailyRotateFile({
            level: "http",
            filename: "logs/http/%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
        }),
        new winston.transports.DailyRotateFile({
            level: "warn",
            filename: "logs/warn/%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
        }),
        new winston.transports.DailyRotateFile({
            level: "debug",
            filename: "logs/debug/%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "30d",
        }),
    ],
});

export default logger;