const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendMasiveEmail = async (req, res) => {
    const { recipients, subject, text } = req.body;

    if (!recipients) {
            return res.status(400).json({
            message: "Recipiens are required"
        })
    }

    if (!subject) {
        return res.status(400).json({
            message: "subject is required"
        })
    }

    if (!text) {
        return res.status(400).json({
            message: "message is required"
        })
    }

    try {

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: Array.isArray(recipients) ? recipients : [recipients],
            subject,
            text
        } 

        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: "Email sent"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error
        })
    }
}

module.exports = sendMasiveEmail;