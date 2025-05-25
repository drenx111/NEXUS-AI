




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0RkNmFldXlILzNSVTR0MDIyeEs3ZitvQVhObzM5V21iOFhtdElqUTBWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGcyNUNKWld3dHdIRENCd2NaS3ZWQnJjb0NXa1NQWEg2b0ZTcCt5aG0zUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyS0dEWUcvQk9SYWRIckNLVSs2b0c2MG1mdWxPdHgvLy92Qkl4TGVabTFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnNEpNZS9wUkd5dVdBdVpkenBuNTl2ZWJucmJselYvUUpGdnFWck1abzF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndFOGtsWW9mV1hFdTZOQU04WW5CelREc0FHMjhURTQ5Y1hBSjlkajdMbG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJwOXRReUNCQ3Ruektvb21BM3ljUjNYWFovMk1KMXlPV3E0SzZwQi9hbjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUdVZFkrU1NlV1E1QjVCdFVOWHVyeG5oNGpqVXZ5UUdiY0s1ZWIrM25XWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMzV5RHV6U0xYWFRrR3lCak5EUUFRUThVdVBsNGhmcjZtdGI0SWxPQmZuaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5mV2NkRDBSNTNlOEZjR1lvSzZmZDJhemp6ck5kMW90SzBCNGhpWjNSdFZKY2o5Vnk2UVhiTWxnM2xTK2tyWWV1TEhWSjkyb1Q5Tldxam5oZzF6b2p3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6IldBTGR4R2NkTWhzVGVSV0h1dGpqUGFnODNrUFI2ZUNTZzl3REk5aVMySjQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg1QkE2MjdEOTczOUMyNUY2QTk0NkYzQTJFRkZFOEFCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgxNzM3NzF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4QTgyODY2NzNENThEMkE4Nzc3NDIxNzE3NjY2NTA2QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MTczNzcyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI4NFg0TDlSQiIsIm1lIjp7ImlkIjoiMjYzNzEwNzgxNzk1OjMxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTk0OTAxOTYwMTczMjA6MzFAbGlkIiwibmFtZSI6IvCdkLfwnZC18J2RjOKcryJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTEhrdEpBRUVMaUh6TUVHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidDJ5SHJqNUJHRk44RUc4NVhLS2JvbERySkExUHQvSGRPSCtrK09WZ3dDVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibDlkWEN0NlN2T3EzdHBJWGc2TFlzOHBiL2xOekpPVjc1K2plb0E4NFFsaDNaZlZVRHBuTjIzTEZWNTJHN25uWW9OUHNzZk9TUmhLWGt1SGNxTHZ6RGc9PSIsImRldmljZVNpZ25hdHVyZSI6IjdNUmllTEJ0am5ZeDFCMnRpMk5YcUpkRTd3aWF2cE5NbmVYaEt1YXgvL0huNTZ6Z2Y1WFpWUVdmNkl6d0YrdkR4RTdmbnBPVS9NSERiUFRuQVZGampnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzEwNzgxNzk1OjMxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJkc2g2NCtRUmhUZkJCdk9WeWltNkpRNnlRTlQ3ZngzVGgvcFBqbFlNQWwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0ODE3Mzc2NiwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtvRyJ9',
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
                  AUTO_READ : process.env.AUTO_READ || 'yes',
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
