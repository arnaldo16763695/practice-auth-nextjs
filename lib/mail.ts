import { Resend } from 'resend'

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sedEmailVerification = async (email: string, token: string) => {
    try {

        await resend.emails.send({
            from: "Nextauth test <onboarding@resend.dev>",
            to: email,
            subject: "verify your email",
            html: `<p>your email is</p></br> <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verify Email</a>`

        })

        return {
            success: true
        }

    } catch (error) {
        console.log(error)
        return {
            error: true
        }
    }
}