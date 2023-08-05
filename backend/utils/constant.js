/** генерация сикрет-ключа в терминале через
 * node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" */

const SECRET_KEY = 'f057c6e1089b507699fe5000affa3284566e577c6c99a859b717c0f57edb2479';

module.exports = {
  SECRET_KEY,
};
