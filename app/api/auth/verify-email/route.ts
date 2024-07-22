import { type NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('token')
    // query is "hello" for /api/search?query=hello
    if (!query) {
        return new Response("token no found", { status: 400 })
    }

    // we must to verify if token exist in db
    const verifyToken = await db.verificationToken.findFirst({
        where: {
            token: query
        }
    })
    if (!verifyToken) {
        return new Response("token no found", { status: 400 })

    }

    //verify is the toke has expired
    if (verifyToken.expires < new Date()) {
        return new Response("token has expired", { status: 400 })
        
    }

    //verify if the email has been  verified
    const user = await db.user.findUnique({
        where:{
            email: verifyToken.identifier
        }
    })
    if (user?.emailVerified) {
        return new Response("Email already verified", { status: 400 })
        
    }
    //mark email as verified
    await db.user.update({
        where: {
            email: verifyToken.identifier
        },
        data: {
            emailVerified: new Date(),
        }
    })
    //delete token
    await db.verificationToken.delete({
        where:{
            identifier: verifyToken.identifier
        }
    })
    // return Response.json({ query })
    //   console.log(query )    

    redirect("/login?verified=true")

}