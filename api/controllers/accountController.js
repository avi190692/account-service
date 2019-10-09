const {getAccounts} = require('../adaptors/userAdaptor');
const Account = require('../models/Account');
const nconf = require('nconf');
const stringify = require('json-stringify-safe')


const createAccount= async (req, reply) => {
    try{
    const account=new Account({
        accountType:req.body.accountType,
        customerId:req.body.customerId,
        accountNo:req.body.accountNo,
        balanceAmount:req.body.balanceAmount
    })
    await account.save();
    reply.send('Account created successfully')
}catch(err) {
    console.log(err);
    throw err;
}
}

const getAccount=async(req,reply)=>{
    try{
        const acc = await Account.where('accountNo',req.params.accountNo)
        if(acc[0]===undefined){
            reply.send('Account does not exist')
        }else{
            reply.send(acc)
        }
    }catch(err) {
        console.log(err);
        throw err;
    }
}

const getBalance=async (req,reply)=>{
    try{
        const acc=await Account.where('accountNo',req.params.accountNo)
        if(acc[0]===undefined){
            reply.send('Account does not exist')
        }else{
            reply.send(acc[0].balanceAmount)
        }
        
    }catch(err){
        console.log(err)
        throw err
    }
}

const updateAccount=async(req,reply)=>{
    try{

        let acc=await Account.where('accountNo',req.params.accountNo)
   
        acc[0].accountType=req.body.accountType
        acc[0].customerId=req.body.customerId
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
    getBalance,
    updateAccount,
    deleteAccount
}