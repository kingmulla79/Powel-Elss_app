require("dotenv").config();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserVerification = require("../models/UserVerification");

function sendEmail(email, subject, text) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: `Email sent successfully` });
    });
  });
}

function sendVerificationEmail(id, email, res) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const uniqueString = uuidv4() + id;

    const mail_configs = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Powel Elss email verification",
      text: `Verify your email to complete the signup proccess.This link will expire in 6 hours.Press ${
        process.env.BASE_URL + "/verify/" + id + "/" + uniqueString
      } to verify`,
    };

    const saltRound = 10;
    bcrypt
      .hash(uniqueString, saltRound)
      .then((hashedUniqueString) => {
        const newVerification = new UserVerification({
          userId: id,
          uniqueString: hashedUniqueString,
          createdAt: Date.now(),
          expiresAt: Date.now() + 21600000,
        });
        newVerification
          .save()
          .then((result) => {
            console.log("Verification details successfully saved");
            transporter.sendMail(mail_configs, function (error, info) {
              if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
              }
              return resolve({ message: `Email sent successfully` });
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              success: false,
              message: "Could not save verification details",
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          message: "An error occured while hashing",
        });
      });
  });
}

module.exports = {
  sendEmail,
  sendVerificationEmail,
};
