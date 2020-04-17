"use strict"

const firebase = require('firebase')
const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors);

let transporter = nodemailer.createTransport({
    host: "mail.spm.technofiz.com",
    // port: 26,
    secure: false,
    auth: {
        user: "test@spm.technofiz.com",
        pass: "test@123"
    },
    tls: {
        rejectUnauthorized: false
    }
})

var firebaseConfig = {
    apiKey: "AIzaSyAj6L6nME_IOb-NvW6hFqsb_AKYQ3Pk15Y",
    authDomain: "book-bf31c.firebaseapp.com",
    databaseURL: "https://book-bf31c.firebaseio.com",
    projectId: "book-bf31c",
    storageBucket: "book-bf31c.appspot.com",
    messagingSenderId: "29877262803",
    appId: "1:29877262803:web:dd2b8f42bd475aaa4cf726",
    measurementId: "G-542LZTKW60"
};
firebase.initializeApp(firebaseConfig);


app.get("*", function (req, res) {
    let { name, message, email } = req.query;
    console.log(`Name: ${name}`);
    let mailOptions = {
        from: "test@spm.technofiz.com",
        to: "hyderdanyal@gmail.com",
        subject: "Website Form",
        text: `Name: ${name}\n Message:${message}\n Email: ${email}`
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent: " + info.response);
            firebase.database().ref(`messages/${name}`)
                .set({
                    details: {
                        email, message
                    }
                })
                .then(() => res.send("Done\n"))
        }
    })
})

module.exports = app;