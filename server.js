const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const base64Img = require('base64-img');
var multer = require('multer');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const app = express();

var corsOptions = {
    origin: "*"
};
  
// var link = 'http://localhost:8081'
// var link = 'https://api.hpkmaeka.com'
var link = 'https://api-hpkmae.ci2ict.com/'
// var linkfront = 'http://localhost:8082'
var linkfront = 'https://hpkmaeka.ci2ict.com/'
// var linkfront = 'https://www.hpkmaeka.com'

setInterval(function () {
    axios.get(link + '/api/notification/1')
        .then(response => {
            //    console.log(response.data);
            var noti = response.data
            var t = response.data.time
            //    console.log(t);
            var time = t.split(':')
            var d = new Date()
            var hour = String((d.getHours()).toString().padStart(2, "0"));
            var minute = String((d.getMinutes()).toString().padStart(2, "0"));
            var second = String((d.getSeconds()).toString().padStart(2, "0"));
            // console.log(hour, minute, second);
            //   
            if (hour == time[0] && minute == time[1] && second == time[2]) {
                var day = (d.getDate() + parseInt(noti.day)).toString().padStart(2, "0");
                var month = (d.getMonth() + 1).toString().padStart(2, "0");
                var year = d.getFullYear()
                var date = year + '-' + month + '-' + day

                var daycurrent = (d.getDate()).toString().padStart(2, "0");
                var monthcurrent = (d.getMonth() + 1).toString().padStart(2, "0");
                var yearcurrent = d.getFullYear()
                var datecurrent = yearcurrent + '-' + monthcurrent + '-' + daycurrent

                //   console.log(date);
                axios.get(link + '/api/events/geteventbydate?date=' + date + '&&datecurrent=' + datecurrent)
                    .then(res => {
                        // console.log(res.data);
                        for (let r = 0; r < res.data.length; r++) {
                            var breaktime = new Date(res.data[r].date)
                            var daytoday = (breaktime.getDate()).toString().padStart(2, "0");
                            var monthtoday = (breaktime.getMonth() + 1).toString().padStart(2, "0");
                            var yeartoday = breaktime.getFullYear()
                            var datetoday = yeartoday + '-' + monthtoday + '-' + daytoday

                            var header = breaktime.toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) + res.data[r].time
                            // console.log(datecurrent,datetoday);
                            var linkconfirm = ''
                            if (datecurrent == datetoday) {
                                linkconfirm = 'กรุณายืนยันคิวได้ที่ลิงก์นี้ ' + linkfront + '/Confirmmasseuse?id=' + res.data[r].id
                            }
                            var message = noti.message_chiropractor + ' '+res.data[r].typename+' หมอ' + res.data[r].firstname + ' ' + res.data[r].lastname + ' วันที่ ' + header + ' ที่ ' + res.data[r].shph + ' ' + linkconfirm
                            // console.log(message);
                            axios.get(link + '/notify?message=' + message + '&&token=' + res.data[r].line_token).then(() => {
                            });
                        }

                    });

                    axios.get(link + '/api/events/getappoint?date=' + date)
                    .then(res => {
                        // console.log(res.data);

                        for (let r = 0; r < res.data.length; r++) {
                            var message_appointment = ''
                            if (res.data[r].eventtype == 1) {
                                message_appointment = noti.message_appointment_chiropractor
                            }else{
                                message_appointment = noti.message_appointment_dentist
                            }
                            var breaktime = new Date(res.data[r].date)
                            var header = breaktime.toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) + res.data[r].time
                            var message = message_appointment + ' '+res.data[r].appoint+' '+res.data[r].typename+' หมอ' + res.data[r].firstname + ' ' + res.data[r].lastname + ' วันที่ ' + header + ' ที่ ' + res.data[r].location
                            
                            // console.log(message);
                            axios.get(link + '/notify?message=' + message + '&&token=' + res.data[r].line_token).then(() => {
                            });
                        }

                    });

                axios.get(link + '/api/eventsdentist/geteventbydate?date=' + date + '&&datecurrent=' + datecurrent)
                    .then(res => {
                        // console.log(res.data);
                        for (let r = 0; r < res.data.length; r++) {
                            var breaktimecurrent = new Date(res.data[r].date)
                            var daydentist = (breaktimecurrent.getDate()).toString().padStart(2, "0");
                            var monthdentist = (breaktimecurrent.getMonth() + 1).toString().padStart(2, "0");
                            var yeardentist = breaktimecurrent.getFullYear()
                            var datedentist = yeardentist + '-' + monthdentist + '-' + daydentist
                            var headercurrent = breaktimecurrent.toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) +res.data[r].time
                            // console.log(header);
                            var linkconfirmden = ''
                            if (datecurrent == datedentist) {
                                linkconfirmden = 'กรุณายืนยันคิวได้ที่ลิงก์นี้ ' + linkfront + '/Confirmdentist?id=' + res.data[r].id
                            }

                            var messagecurrent = noti.message_dentist + ' '+res.data[r].typename+ ' หมอ' + res.data[r].firstname + ' ' + res.data[r].lastname + ' วันที่ ' + headercurrent+ ' ที่ ' + res.data[r].shph + ' ' + linkconfirmden
                            // console.log(message);
                            axios.get(link + '/notify?message=' + messagecurrent + '&&token=' + res.data[r].line_token).then(() => {
                            });
                        }

                    });
            }



        })
        .catch((error) => {
            console.log('error ' + error);
        });

}
    , 1000) //logs hi every second


function timeformat(time) {
    time = time.split(':')
    return time[0] + '.' + time[1] + ' น.'
}
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.use(cors(corsOptions));
app.use(fileUpload());

var bodyParser = require('body-parser');
const internal = require("stream");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(express.static('./'))
app.use("./uploads/cars", express.static("./uploads/cars"));

var upload = multer({ dest: __dirname + '/uploads/' });
var type = upload.single('upl');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

app.get("/up", (req, res) => {
    res.json({ message: "45 to application." });
});

app.get("/notify", (req, res) => {
    // console.log(req.query.token);
    const url_line_notification = "https://notify-api.line.me/api/notify";
    request({
        method: 'POST',
        uri: url_line_notification,
        header: {
            'Content-Type': 'multipart/form-data',
        },
        auth: {
            bearer: req.query.token,
        },
        form: {
            message: req.query.message
        },
    }, (err, httpResponse, body) => {
        var data = ''
        if (err) {
            console.log(err)
            data = err
        } else {
            console.log(body)
            data = body
        }
        res.json(body)
    });
});

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {EeJEoF3HFj/MWOAurYRMn9BgERfQA4d5oW7J9wtP4uSNXBvYda4w4OzgM7to1kaOEWF6bbgVBTm+Gc2yBPT08tJaygqIO1zTZYgrBgpaY/3BXMf2qcKDH5kjAwN3XgPfegrlkg0PT1t3ZvsPx8jgIAdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

app.get("/notifyconfirm", (req, res) => {
    // console.log(req.query.token);
    const url = "https://api.line.me/v2/bot/message/push";
    axios.post(url, {
        to: req.query.token,
        message: [
            {
                "type": "flex",
                "altText": "This is a Flex Message",
                "contents": {
                    "type": "bubble",
                    "body": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Hello,"
                            },
                            {
                                "type": "text",
                                "text": "World!"
                            }
                        ]
                    }
                }
            }
        ],
    }, {
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer EeJEoF3HFj/MWOAurYRMn9BgERfQA4d5oW7J9wtP4uSNXBvYda4w4OzgM7to1kaOEWF6bbgVBTm+Gc2yBPT08tJaygqIO1zTZYgrBgpaY/3BXMf2qcKDH5kjAwN3XgPfegrlkg0PT1t3ZvsPx8jgIAdB04t89/1O/w1cDnyilFU='
        },
        // data: JSON.stringify(jsonData),
    }).then(response => {
        // console.log(response)
        res.json(response.data)
    })
        .catch(error => {
            console.log(error.response)
        });

    // const url_line_notification = "https://api.line.me/v2/bot/message/push";
    // request({
    //     method: 'POST',
    //     uri: url_line_notification,
    //     header: {
    //         'Content-Type': 'application/json',
    //     },
    //     auth: {
    //         bearer: "EeJEoF3HFj/MWOAurYRMn9BgERfQA4d5oW7J9wtP4uSNXBvYda4w4OzgM7to1kaOEWF6bbgVBTm+Gc2yBPT08tJaygqIO1zTZYgrBgpaY/3BXMf2qcKDH5kjAwN3XgPfegrlkg0PT1t3ZvsPx8jgIAdB04t89/1O/w1cDnyilFU=",
    //     },
    //     form: {
    //         to: req.query.token,
    //         message: [
    //             {
    //               "type": "flex",
    //               "altText": "This is a Flex Message",
    //               "contents": {
    //                 "type": "bubble",
    //                 "body": {
    //                   "type": "box",
    //                   "layout": "horizontal",
    //                   "contents": [
    //                     {
    //                       "type": "text",
    //                       "text": "Hello,"
    //                     },
    //                     {
    //                       "type": "text",
    //                       "text": "World!"
    //                     }
    //                   ]
    //                 }
    //               }
    //             }
    //           ]

    //     },
    // }, (err, httpResponse, body) => {
    //     var data = ''
    //     if (err) {
    //         console.log(err)
    //         data = err
    //     } else {
    //         console.log(body)
    //         data = body
    //     }
    //     res.json(body)
    // });
});

app.get("/gettoken", (req, res) => {
    console.log(req.query.code,);
    const url = 'https://notify-bot.line.me/oauth/token'
    // var valclient_id= String(process.env.client_id);
    //     var valclient_secret= String(process.env.client_secret);
    axios.post(url, {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: 'https://www.hpkmaeka.com/line',
        // redirect_uri: 'http://localhost:8082/line',
        client_id: 'do6mzoSxLMNnOTXkr7USva',
        client_secret: 'jjabdUGaLBeOkdDE8sexPwLr8hw5N0fuDFQtGEXPNyD',
    }, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // data: JSON.stringify(jsonData),
    }).then(response => {
        console.log(response)
        res.json(response.data.access_token)
    })
        .catch(error => {
            console.log(error.response)
        });
});

app.get("/getuserid", (req, res) => {
    const url = 'https://api.line.me/v2/profile'
    // var valclient_id= String(process.env.client_id);
    //     var valclient_secret= String(process.env.client_secret);
    axios.get(url, {
        headers: { Authorization: `Bearer k1ms49te0Uc8m56bAdvstnkSb5Wx5nTa29CW8n96pCN` }
    }).then(response => {
        // console.log(response)
        res.json(response.data)
    })
        .catch(error => {
            console.log(error.response)
        });
});

app.post('/upload', (req, res) => {
    const { image } = req.body;
    //console.log(req.body);
    base64Img.img(image, './uploads', new Date(), function (err, filepath) {
        const pathArr = filepath.split('/')
        const fileName = pathArr[pathArr.length - 1];

        res.status(200).json({
            success: true,
            url: `http://127.0.0.1:${PORT}/${fileName}`
        })
    });
});

// file upload api
app.post('/uploadimage', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.file;
    var name = req.query.name
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/uploads/news/${name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
})
app.post('/uploadbg', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.file;
    var name = req.query.name
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/uploads/bg/${name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
})
app.get("/img", (req, res) => {
    var image1 = "./uploads/" + req.query.name
    var base64Img = require('base64-img');
    var imageData1 = base64Img.base64Sync(image1);
    var base64Data = imageData1.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    var img = Buffer.from(base64Data, 'base64');

    //   res.writeHead(200, {
    //     'Content-Type': 'image/png',
    //     'Content-Length': img.length
    //   });
    // console.log(imageData1);
    res.json({ base64: imageData1 });
});

require("./app/routes/user.routes")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/role_menu.routes")(app);
require("./app/routes/menus.routes")(app);
require("./app/routes/permission_docs.routes")(app);
require("./app/routes/amphures.routes")(app);
require("./app/routes/districts.routes")(app);
require("./app/routes/provinces.routes")(app);
require("./app/routes/type_license.routes")(app);
require("./app/routes/documents.routes")(app);
require("./app/routes/master.routes")(app);
require("./app/routes/map_doc_permision.routes")(app);
require("./app/routes/log_notify.routes")(app);
require("./app/routes/agancy.routes")(app);
require("./app/routes/courses.routes")(app);
require("./app/routes/doctors.routes")(app);
require("./app/routes/queues.routes")(app);
require("./app/routes/events.routes")(app);
require("./app/routes/eventsdentist.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/shph.routes")(app);
require("./app/routes/historymasseuse.routes")(app);
require("./app/routes/historydentist.routes")(app);
require("./app/routes/map_history_user_dentist.routes")(app);
require("./app/routes/masseusetype.routes")(app);
require("./app/routes/doctorshph.routes")(app);
require("./app/routes/map_events.routes")(app);
require("./app/routes/map_events_dentist.routes")(app);
require("./app/routes/map_history_user_masseuse.routes")(app);
require("./app/routes/history_user_masseuse.routes")(app);
require("./app/routes/typesbook.routes")(app);
require("./app/routes/history_doctor_masseuse.routes")(app);
require("./app/routes/map_history_doctor_masseuse.routes")(app);
require("./app/routes/map_history_doctor_dentist.routes")(app);
require("./app/routes/history_doctor_dentist.routes")(app);
require("./app/routes/history_user_dentist.routes")(app);
require("./app/routes/dentisttype.routes")(app);
require("./app/routes/adminshph.routes")(app);
require("./app/routes/evaluation.routes")(app);
require("./app/routes/types.routes")(app);
require("./app/routes/shph_masseuse_time.routes")(app);
require("./app/routes/types_menu.routes")(app);
require("./app/routes/making_appointments.routes")(app);
require("./app/routes/locations.routes")(app);
require("./app/routes/appointments.routes")(app);
require("./app/routes/news.routes")(app);

app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}.`);
});