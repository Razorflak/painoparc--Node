"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SIGN_SECRET,
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    /**
     * Mailgun email credentials
     */
    emails: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    },

    dbPostgres: {
	    host: process.env.DBHOST,
	    port: process.env.DBPORT,
	    name: process.env.DBNAME,
	    user: process.env.DBUSER,
	    userPwd: process.env.USERPASSWORD
    }
};
//# sourceMappingURL=index.js.map