const Account = require('../models/Account');

const updateAccount = async (account) => {
    await Account.findByIdAndUpdate(
        // the id of the item to find
        account.id,
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        account,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        // the callback function
        (err, account) => {
        // Handle any possible database errors
            if (err) {console.log(err);}
            else {
                return account;  
            }
        }
    )
}

module.exports = {
    updateAccount
}