import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { UserModel } from "@/models/user.model";
import jwt from "jsonwebtoken"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashedToken 
        var token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string);

        if (emailType === "VERIFY") {
            await UserModel.findByIdAndUpdate(userId,
                { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            console.log("email reset");
            await UserModel.findByIdAndUpdate(userId,
                { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD
            }
        });
        const mailOption = {
            from: `SHAHWAIZ APP <${process.env.GMAIL}>`, // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify Your Email' : "Reset Your Password", // Subject line
            html: `
             <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2>${emailType === "VERIFY" ? "Email Verification" : "Password Reset"}</h2>
                    <p>Please click the button below to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}.</p>
                    <div style="text-align:center">
                        <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${token}" 
                           style="background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; border-radius: 4px;">
                           ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                        </a>
                    </div>
                    <p>Or copy and paste the following link in your browser:</p>
                    <p>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${token}</p>
                    <p>This link will expire in 1 hour.</p>
            </div>
            `, // html body
        }
        const mailResponse = await transport.sendMail(mailOption)
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}