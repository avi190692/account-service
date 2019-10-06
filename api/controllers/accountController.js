const {getAccounts} = require('../adaptors/userAdaptor');
const Account = require('../models/Account');
const nconf = require('nconf');
const stringify = require('json-stringify-safe')


const createAccount= async (req, reply) => {
    try{
    const account=new Account({
        name:req.body.name,
        customerId:req.body.customerId,
        accountNo:req.body.accountNo,
        balanceAmount:req.body.balanceAmount
    })
    account.save();
    reply.send('Account created successfully')
}catch(err) {
    console.log(err);
    throw err;
}
}

const getAccount=async(req,reply)=>{
    try{
        const acc=await Account.where('accountNo',req.params.accountNo)
        reply.send(acc)
    }catch(err) {
        console.log(err);
        throw err;
    }
}

const updateAccount=async(req,reply)=>{
    try{
        // const data={
        //     name:req.body.name,
        //     accountNo:req.body.accountNo,
        //     balanceAmount:req.body.balanceAmount
        // }
        let acc=await Account.where('accountNo',req.params.accountNo)
   
        acc[0].name=req.body.name
        acc[0].accountNo=req.body.accountNo
        acc[0].balanceAmount=req.body.balanceAmount
        acc[0].save();

        console.log(acc[0])
        reply.send(acc[0])
    }catch(err){
        console.log(err);
        throw err;
    }
}

const deleteAccount=async(req,reply)=>{
    try{
        console.log(req.params.accountNo)
        const result=await Account.deleteOne({accountNo:req.params.accountNo})
        
        reply.send(result)
    }catch(err) {
        console.log(err);
        throw err;
    }
}
module.exports= {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount
}