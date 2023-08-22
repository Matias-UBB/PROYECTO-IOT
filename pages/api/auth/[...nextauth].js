import { connectToDatabase } from "@/utils/bd";
import { verifyPassword } from "@/utils/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "../../../models/User";



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "",
                
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********",
                },
            },
            async authorize(credentials) {
                await connectToDatabase();
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("No user found");
                }
                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Could not log you in");
                }
                return user;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
        maxAge: 6000,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.nombre = user.nombre;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.nombre = token.nombre;
            return session;
        },

    },
    pages: {
        signIn: "/login",
    },
};

export default (req, res) => NextAuth(req, res, authOptions);

