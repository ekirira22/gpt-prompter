//Set Up Providers

import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],

    async session({ session }){

    },

    async signIn({ profile }){
        try {
            //serverless -> lambda -> dynamodb
            await connectToDB()

            // check if a user already exists

            //if not create new user and register them in DB

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
})

export { handler as GET, handler as POST }