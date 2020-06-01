// required npm packages
var express = require('express');
var atob = require('atob');
var Redis = require('ioredis'); 

// gmail-pubsub-router and redis publisher
var gmailPubSubWebhookRouter = express.Router();
var redis = new Redis();
var pub = new Redis();

// required modules
var isEmpty = require('../utils/isEmptyObj');
var GMAIL_PULL = require('../utils/redisChannel');

// route to handle gmail-pubsub-webhook
gmailPubSubWebhookRouter.route('/')
.post((req, res) => {

    let reqBody = req.body;
    let statusCode = 200;

    if(!isEmpty(reqBody)) {

        console.log("req handles succesfully");
        let decodedMessageData = JSON.parse(atob(reqBody["message"]["data"]));
        let messageId = reqBody["message"]["message_id"];
        console.log(messageId);
        console.log(decodedMessageData);
        console.log(GMAIL_PULL.GMAIL_PULL);
        console.log(typeof GMAIL_PULL);
        
        if(decodedMessageData["emailAddress"]) {

            let emailAddress = decodedMessageData["emailAddress"].trim();
            let historyId = decodedMessageData["historyId"];

            let pubMsg = {};
            pubMsg["emailAddress"] = emailAddress;
            pubMsg["historyId"] = historyId;
            pubMsg["messageId"] = messageId;
    

            console.log("Push Notification came for Email: " + emailAddress + " and History Id: " + historyId);
            // pub.publish(GMAIL_PULL.GMAIL_PULL, "Push Notification came for Email: " + emailAddress + " and History Id: " + historyId);
            pub.publish(GMAIL_PULL.GMAIL_PULL, JSON.stringify(pubMsg));
            
        } else {

            console.log("emailAddress is null");
            res.status(500).send("emailAddress is null");
        }

        // console.log(reqBody);
        res.status(statusCode).send('req handles succesfully');
    } else {

        console.log("message is null");
        res.status(500).send("message is null");
    }
})

module.exports = gmailPubSubWebhookRouter;


