'use server'
import { loginSchema, registerSchema } from '@/lib/zod'
import { z } from 'zod'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'



const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn('credentials', { email: values.email, password: values.password, redirect: false })
        return { success: true }

    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return { error: "error 500" }
    }
}

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
    try {
        const { data, success } = registerSchema.safeParse(values);
        if (!success) {
            return {
                error: 'inalid data'
            }
        }

        // we must to verify if the user exist
        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (user) {
            return {
                error: "User already exist"
            }
        }
        
        //hash the password
        const passEncryp = await bcrypt.hash(data.password, 10);
        
        
        //create the user
       const res = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passEncryp,
            },
        });

        await signIn('credentials',
            {
                email: data.email,
                password: data.password,
                redirect: false
            }
        )

        return {success : true}

    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        
        return { error: "error 500" }
    }
}

export default loginAction