import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { UserModel } from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashedToken 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await UserModel.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            console.log("email reset");
            await UserModel.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e23abf1eac1e04",
                pass: "ac5513e17c970e"
            }
        });
        const mailOption = {
            from: 'syedshahwaiz32@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'Verify' ? 'Verify Your Email' : "Reset Your Password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> Here</a> to ${emailType === "Verify" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. 
            <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }
        const mailResponse = await transport.sendMail(mailOption)
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}