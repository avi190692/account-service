const kafka = require('kafka-node')
const nconf = require('nconf');
const Account = require('../models/Account');
const { updateAccount } = require('../service/AccountService');
const  { publishTransactionUpdateMessage } = require('../producer/transactionStatusProducer');
const Consumer = kafka.Consumer;
const Client = kafka.KafkaClient;
const client = new Client(nconf.get('kafka.server'));


const listenDebitCreditTransaction = new Consumer(
    client,
    [{ topic: nconf.get('kafka.topics.credit-debit') }],
    {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
    }
);

console.log(nconf.get('kafka.topics.credit-debit') +' is listening');

listenDebitCreditTransaction.on('message', async function(message) {
    console.log(JSON.parse(message.value));
    handleMessage(message)
});

listenDebitCreditTransaction.on('error', function(err) {
    console.log('error'+ err);
});

async function handleMessage(message) {
    try {
        console.log(JSON.parse(message.value).accountUpdate)
        let account = new Account(JSON.parse(message.value).accountUpdate);
        account = await updateAccount(account);
        const trnsactionId = JSON.parse(message.value).trnsactionId;
        const transactionType = JSON.parse(message.value).transactionType;
        const transactionStatusUpdation = { 
            "trnsactionId" : trnsactionId,  
            "transactionType" : transactionType,
            "transactionStatus" : "PASSED"
        }
        await publishTransactionUpdateMessage(transactionStatusUpdation);
    } catch (err) {
        console.log(err)
    }  
}