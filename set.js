




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtaanVEWUJMWW02TGVrYm82V2Q2UUM4QmcvVnV3UzRiQ0QrTXFKT3FWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOU1LQVFyVGtwbUg2dnczY0VpQ0gySWhWRHhoaHBMa1ZSV0JtVjFQdXRsST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2THJiNmVrdzAzeE1pNkdqZG11REpZcERxRHAwKzd6d2pyTVVkZ1NSYm5NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqNmNESW4zUk9HT2hLQ1BPUXJoWFh0alV0QXVQL2FLL29taXFncDJMUVZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlBcXVuWW5hMkpnRUlzUytqdGZra0pQTllPV1FSaStPWktZOXVpUUNlMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhrR0tUalhmVGNkeFM4QmRBai9kaHJnZXQ3bFFleWdVVW1QOXJWZ1dlQ1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkh3YUxLMkQ5dENGY2pudzRqQnFLbHRaU0Q5UlplSi9XQUdKYXFuZzNVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOG1sTkpFdE1LTURTMEVuZnJQRGpHbUdpcVZjcG9JMisyR2RiUFUrbWgyaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjMvSmNqWkV5UGpTbUNYRUZOYWszWGUxZVlkWlBVWE1LOHRLUlZRMlF4M1QwY0FyTkNPRmM4R0FpdFFaNzFWZFJOMDhFTEtxaFZtOWluMW5rSXlFVkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjQsImFkdlNlY3JldEtleSI6InBhSWttbmdicFE1SS82ajMzTTVSMmw1ejVnUjNCTGdzRWduRnNSOEJZdTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU0OEMwQ0I2NzBEMjlBQzA0NkRCNjUxQjAwMjQ1NTA1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgzNzg3OTJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2MkVGRjY3N0JFRjhBNDBDRThGNThFMjM2NEM3NjM1RSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4Mzc4NzkzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxS0U0NzlHOCIsIm1lIjp7ImlkIjoiMjYzNzEwNzgxNzk1OjM0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTk0OTAxOTYwMTczMjA6MzRAbGlkIiwibmFtZSI6IvCdkLfwnZC18J2RjOKcryJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTExrdEpBRUVKZkoyTUVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidDJ5SHJqNUJHRk44RUc4NVhLS2JvbERySkExUHQvSGRPSCtrK09WZ3dDVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZjNJTTRhd1NNVU9hZkJPRTdKS1hoZ1U2dWc5OWdOeGtCTUVzWmZkdTl4R01MVm9UdHFtVENmaGlJVzFlR2N6eGhLelUxS1djM084UkFKTjd2Yk51Q2c9PSIsImRldmljZVNpZ25hdHVyZSI6IllDT2wrenZaQ1MxT0IrVnNBZ3FibzdTdTY0WnVRbW8wTGt5N21lWTV6aytFWThhOThYTHhOSldEd0UvNW0vc20wSnd4alZCN0QraVNSYmR5ODRCa0F3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzEwNzgxNzk1OjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJkc2g2NCtRUmhUZkJCdk9WeWltNkpRNnlRTlQ3ZngzVGgvcFBqbFlNQWwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0ODM3ODc4OSwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhudiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "263710781795",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐷𝐵𝑌✯",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐷𝐵𝑌✯_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
