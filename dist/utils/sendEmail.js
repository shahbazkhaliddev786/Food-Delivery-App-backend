import nodemailer from 'nodemailer';
export const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "sk5659263@gmail.com",
            pass: "rtybdevmoulasdxt",
        },
    });
    const mailOptions = {
        from: '"Fred Foo" <sk5659263@gmail.com>',
        to,
        subject,
        html,
    };
    await transporter.sendMail(mailOptions);
};
//# sourceMappingURL=sendEmail.js.map