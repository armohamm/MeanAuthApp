var express = require('express');
// var config = require('../config');
var mandrill = require('mandrill-api/mandrill');
var mandrill_Client = new mandrill.Mandrill('kQKG7moJ9DJ75to2oDbHNA');
// var models = require('../models');
// var timelineData = require('../models/timelineData');
// var webshot = require('webshot');
// Define router
var router = express.Router();
// const router = express();
/**
 * POST /api/email/send
 */
router.get('/test1', (req, res) => {
    res.send("in mail file-==============")
});
router.post('/send', (req, res) => {
    //  mandrill_client = new mandrill.Mandrill('YOUR_API_KEY');
    var message = {
        "html": "<p>Example HTML content</p>",
        "text": "Example text content",
        "subject": "example subject from Prince",
        "from_email": "message.test@viraluat.com",
        "from_name": "Example Name",
        "to": [{
            "email": "princebgt28@gmail.com",
            "name": "Recipient Name",
            "type": "to"
        }],
        // "headers": {
        //     "Reply-To": "message.reply@example.com"
        // },
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        // "bcc_address": "message.bcc_address@example.com",
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
        "global_merge_vars": [{
            "name": "merge1",
            "content": "merge1 content"
        }],
        "merge_vars": [{
            "rcpt": "princebgt28@gmail.com",
            "vars": [{
                "name": "merge2",
                "content": "merge2 content"
            }]
        }],
        "tags": [
            "password-resets"
        ],
        // "subaccount": "customer-123",
        // "google_analytics_domains": [
        //     "example.com"
        // ],
        // "google_analytics_campaign": "message.test@viraluat.com",
        "metadata": {
            "website": "www.example.com"
        },
        "recipient_metadata": [{
            "rcpt": "princebgt28@gmail.com",
            "values": {
                "user_id": 123456
            }
        }],
        // "attachments": [{
        //     "type": "text/plain",
        //     "name": "myfile.txt",
        //     // "content": "ZXhhbXBsZSBmaWxl"
        // }],
        // "images": [{
        //     "type": "image/png",
        //     "name": "IMAGECID",
        //     "content": "ZXhhbXBsZSBmaWxl"
        // }]
    };



    var async = false;
    var ip_pool = "Main Pool";
    // var send_at = "example send_at";
    var send_at = (new Date()).toISOString();//"2017-06-24 17:03:09"

    console.log(send_at);
    // console.log(new Date(dateString));
    mandrill_Client.messages.send({ "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at },
        function (result) {
            console.log("IN MANDRILL=====================")
            console.log(result);
            res.send(result)
            /*
            [{
                    "email": "recipient.email@example.com",
                    "status": "sent",
                    "reject_reason": "hard-bounce",
                    "_id": "abc123abc123abc123abc123abc123"
                }]
            */
        }, function (e) {
            // Mandrill returns the error as an object with name and message keys
            res.send(e);
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });
});



// Start Server
// const port = 3000;
// router.listen(port, () => {
//     console.log('Server started on port ' + port);
// });

module.exports = router;