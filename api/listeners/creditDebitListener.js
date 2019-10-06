const kafka = require('kafka-node')
const nconf = require('nconf');
const Account = require('../models/Account');

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
    handleMessage(message)
    console.log(message);
});

listenDebitCreditTransaction.on('error', function(err) {
    console.log('error'+ err);
});

// var insertDocument = function(db, doc, callback) {
//     // first try to update; if a document could be updated, we're done 
//     updateTop3ForContinent( db, doc, function (results) {      
//         if (!results || results.result.n == 0) {
//            // the document was not updated so presumably it does not exist; let's insert it  
//            db.collection('top3').insertOne( 
//                  doc
//                , function(err, result) {
//                     assert.equal(err, null);
//                     console.log("Inserted doc for "+doc.continent);
//                     callback();
//                  }
//                );   
//         }//if
//         else {
//           console.log("Updated doc for "+doc.continent);
//           callback();
//         }
//   }); //updateTop3ForContinent
//  };//insertDocument

function handleMessage(message) {
    const account = new Account(JSON.parse(message.value));
    console.log("------------"+account);
    debugger
    Account.findByIdAndUpdate(
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
                console.log("------"+account);  
            }
        }
    )
    // insertDocument(mongodb,top3, function() {
    //   console.log("Top3 recorded in MongoDB for "+top3.contMnent);  
    // });

}// handlemessage
 
// module.exports = {
//     listenDebitCreditTransaction
// }