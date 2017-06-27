var express = require('express');
// var config = require('../config');
var mandrill = require('mandrill-api/mandrill');
var mandrill_Client = new mandrill.Mandrill('kQKG7moJ9DJ75to2oDbHNA');
// var models = require('../models');
// var timelineData = require('../models/timelineData');
// var webshot = require('webshot');
// Define router
// var router = express.Router();
const router = express();
const bodyParser = require('body-parser');
// Body Parser Middleware
router.use(bodyParser.json());
/**
 * POST /api/email/send
 */
router.post('/test1', (req, res , next) => {
    res.send("in mail file-==============")
    console.log(req.body.myhead);
});
router.post('/send', (req, res) => {

    // console.log(req.body.myhead)
    // mandrill_client = new mandrill.Mandrill('YOUR_API_KEY');
    // var template_name = "moneytor_template";
    var template_name = "temp_Mchimp";
    var template_content = [
        {
            "name": "myhead",
            "content": req.body.myhead
        },
        {
            "name": "main_body",
            "content": req.body.content
        }
    ]
    var message = {
        // "html": "<p>Example HTML content</p>",
        // "text": "Example text content",
        "subject": "example subject from Prince",
        "from_email": "message.test@viraluat.com",
        "from_name": "Example Name Prince",
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
    // var send_at =(new Date()).toISOString();
    mandrill_Client.messages.sendTemplate({ "template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool }, function (result) {
        console.log(result);
        res.send(result);
        /*
        [{
                "email": "princebgt28@gmail.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function (e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        res.send(e);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });

});



// Start Server
const port = 3000;
router.listen(port, () => {
    console.log('Server started on port ' + port);
});

// module.exports = router;