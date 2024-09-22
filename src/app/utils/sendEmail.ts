import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "sajibhasan9811@gmail.com",
      pass: "wxpt ajlj lfqf kjcn",
    },
});

export const sendResetLinkToEmail =async (to:string, html: string) => {    
    await transporter.sendMail({
        from: 'TripNest',
        to, 
        subject: "Reset you password within 5 minnute!", // Subject line
        text: "Hey, here is the link to reset your password !", // plain text body
        html
      });
}