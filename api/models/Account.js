const mongoose = require('mongoose');
const validator = require('validator')

const accountSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
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
