const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const config = require('../../config');


const getCipherKey = (password) => {
    const key = crypto.createHash('sha256').update(password).digest();
    return key;
};

const getRandomString = (length = 20) => {
    const str = cryptoRandomString({ length });
    return str;
};


const encryption = (arg) => {
    const key = getCipherKey(config.CRYPTO_SECRET_KEY);
    const iv = crypto.randomBytes(config.INITIALIZATION_VECTOR_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let data = cipher.update(arg);
    data = Buffer.concat([ data, cipher.final() ]);
    data = `${iv.toString('hex')}:${data.toString('hex')}`;
    return data;
};


const decryption = (arg) => {
    const key = getCipherKey(config.CRYPTO_SECRET_KEY);
    const arg_parts = arg.split(':');
    const iv = Buffer.from(arg_parts.shift(), 'hex');
    const encrypted_arg = Buffer.from(arg_parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let data = decipher.update(encrypted_arg);
    data = Buffer.concat([ data, decipher.final() ]);
    data = data.toString();
    return data;
};


const encoder = (arg) => {
    const data = Buffer.from(arg).toString('base64');
    return data;
};


const formatPhone = (arg) => {
    let number = arg;
    number = number.toString();
    if (number.length === 11 || number[0] === '0') {
        number = number.substr(1, number.length + 1);
        number = `234${number}`;
    }
    return number;
};


const roundNumber = (value, decimals = 2) => Number(`${Math.abs(Math.round(`${value}e${decimals}`))}e-${decimals}`);


const formatAmount = (arg) => {
    let amount = arg;
    amount = amount.toString();
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return amount;
};


const stringToLowerCase = (str) => str.toLocaleLowerCase();


const stringToUpperCase = (str) => str.toLocaleUpperCase();


const stringToTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());


module.exports = {
    encryption,
    decryption,
    encoder,
    formatPhone,
    roundNumber,
    formatAmount,
    getCipherKey,
    stringToLowerCase,
    stringToUpperCase,
    stringToTitleCase,
    getRandomString
};
