
import type { NextAuthConfig } from "next-auth"
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod"
// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({

            authorize: async (credentials) => {

                const { data, success } = loginSchema.safeParse(credentials)
                if (!success) {
                    throw new Error("Invalid credentials")
                }

                // we must to verify if the user exist in the db
                const encrypPass = '';
                // await new Promise((resolve) => setTimeout(resolve, 3000));
                const user = await db.user.findUnique({
                    where: {
                        email: data.email,
                    }
                })

                if (!user || !user.password) throw new Error("Invalid credentials ");

                // we must to verify if the password is correct
                const isValid = await bcrypt.compare(data.password, user?.password)

                if (!isValid) throw new Error("Invalid credentials ");

                return user;

            },
        }),
    ],
} satisfies NextAuthConfig