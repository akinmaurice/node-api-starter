const crypto = require('crypto');


const encryption = (data) => {
    const cipher = crypto.createCipher('aes-256-ctr', 'd67fgt');
    let code = cipher.update(data, 'utf8', 'hex');
    code += cipher.final('hex');
    return code;
};


const decryption = (data) => {
    const cipher = crypto.createDecipher('aes-256-ctr', 'd67fgt');
    let decode = cipher.update(data, 'hex', 'utf8');
    decode += cipher.final('utf8');
    return decode;
};

// Format numbers from 080 Pattern to +234
const formatNumber = (arg) => {
    let number = arg;
    number = number.toString();
    if (number.length === 11 || number[0] === '0') {
        number = number.substr(1, number.length + 1);
        number = `234${number}`;
    }
    return number;
};


const roundNumber = (value, decimals) => Number(`${Math.abs(Math.round(`${value}e${decimals}`))}e-${decimals}`);


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
    formatNumber,
    roundNumber,
    formatAmount
};
