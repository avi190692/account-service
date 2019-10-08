const mongoose = require('mongoose');
const validator = require('validator')

const AccountType=Object.freeze({
    CURRENT: 'CURRENT',
    SAVINGS: 'SAVINGS'
})
const accountSchema = mongoose.Schema( {
    accountType: {
        type: String,
        enum:Object.values(AccountType),
        unique:false
    },
    customerId: {
        type: Number,
        required: true,
        trim: true,
    },
    accountNo: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
    },
    balanceAmount: {
        type: Number,
        required: true,
        trim: true,
    }
},
{
        timestamps: true
});

accountSchema.methods.toJSON = function () {
    const account = this
    const accountObject = account.toObject()
    return accountObject
}



const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
