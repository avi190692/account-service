const {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount
} = require('../controllers/accountController');
const { validatePostSignup } = require('../validations/auth');

module.exports = async (fastify) => {
    fastify.get('/account/:accountNo',getAccount)
    fastify.post('/account', createAccount);
    fastify.put('/account/:accountNo',updateAccount)
    fastify.delete('/account/:accountNo',deleteAccount)
} 

module.exports.autoload = true