// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

// const client = require("mailchimp-marketing");
// const { options } = require("nodemon/lib/config");
// const { response } = require("express");


const app = express();
app.use(bodyParser.urlencoded({extended: true}))

// app.use(express.static("static"));
app.use(express.static(`${__dirname}/public`));


app.listen(3000, function () {
    console.log("workin")
});


app.get("/",function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
  
app.post("/",function (req, res) {
    // res.sendFile(__dirname + "/signup.html"
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.Email;

    // console.log(firstname + lastname + email)

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);



    const url = "https://us20.api.mailchimp.com/3.0/lists/2dab2c6c05"

    const options = {
        method: "POST",
        auth: "namanajain28:25ec7ac258b0564b686c6bfe8166e313-us20"

    }


    const request = https.request(url, options, function(response) {

        if (response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data))
            
        })
    })

    // console.log(request.STATUS_CODES())



    request.write(jsonData)
    request.end()

})


app.post("/fail", function (req, res) {
    res.redirect("/")
    
})








// 25ec7ac258b0564b686c6bfe8166e313-us20

// list id 2dab2c6c05