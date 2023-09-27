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


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.use(cors(corsOptions));
app.use(fileUpload());

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

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
    console.log(req.query.token);
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

app.get("/gettoken", (req, res) => {
    const url = 'https://notify-bot.line.me/oauth/token'
    // var valclient_id= String(process.env.client_id);
    //     var valclient_secret= String(process.env.client_secret);
    axios.post(url, {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: 'https://shphqueue.ponnipa.in.th/line',
        // redirect_uri: 'http://localhost:8082/line',
        client_id:'do6mzoSxLMNnOTXkr7USva',
client_secret:'jjabdUGaLBeOkdDE8sexPwLr8hw5N0fuDFQtGEXPNyD',
    }, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // data: JSON.stringify(jsonData),
    }).then(response => {
        // console.log(response)
        res.json(response.data.access_token)
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
    var type = req.query.type
    var dir = './uploads/' + type
    //  mv() method places the file inside public directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    myFile.mv(`${__dirname}/uploads/${type}/${name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({ name: myFile.name, path: `/${type}/${myFile.name}` });
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

app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}.`);
});