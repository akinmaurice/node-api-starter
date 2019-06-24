const crypto = require('crypto');


const encryption = (arg) => {
    const cipher = crypto.createCipher('aes-256-ctr', 'd67fgt');
    let data = cipher.update(arg, 'utf8', 'hex');
    data += cipher.final('hex');
    return data;
};


const decryption = (arg) => {
    const cipher = crypto.createDecipher('aes-256-ctr', 'd67fgt');
    let data = cipher.update(arg, 'hex', 'utf8');
    data += cipher.final('utf8');
    return data;
};


const encoder = (arg) => {
    const data = Buffer.from(arg).toString('base64');
    return data;
};


// Format numbers from 080 Pattern to +234
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


// Format Amount from 1000 to 1,000
const formatAmount = (arg) => {
    let amount = arg;
    amount = amount.toString();
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return amount;
};


module.exports = {
    encryption,
    decryption,
    encoder,
    formatPhone,
    roundNumber,
    formatAmount
};
