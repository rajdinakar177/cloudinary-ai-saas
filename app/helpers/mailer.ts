// import nodemailer from "nodemailer";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import { BrevoClient } from '@getbrevo/brevo';

interface EmailParams {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}


const brevo = new BrevoClient({
    apiKey: () => {
        const key = process.env.BREVO_API_KEY;
        if (!key) throw new Error('BREVO_API_KEY is not set');
        return key;
    },
  timeoutInSeconds: 30,
  maxRetries: 3,
});

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: EmailParams) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                email: process.env.ADMIN_EMAIL!,
                name: "PixelForge AI",
            },

            to: [
                {
                    email,
                },
            ],

            subject:
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Password",

            htmlContent: `
      <div style="font-family:sans-serif">
        <h2>
          ${emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password"
                }
        </h2>

        <p>
          Click the button below:
        </p>

        <a
          href="${process.env.DOMAIN}/${emailType === "VERIFY"
                    ? "verifyemail"
                    : "resetpassword"
                }?token=${hashedToken}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          ${emailType === "VERIFY"
                    ? "Verify Email"
                    : "Reset Password"
                }
        </a>

      </div>
      `,
        });
        return {
            success: true,
        };

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email not sent" );
        
    }
};