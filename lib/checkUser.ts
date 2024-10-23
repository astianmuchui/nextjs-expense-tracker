import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export default async function checkUser() {
    const user = await currentUser()

    if (!user) return null

    // Check if the user is already in db

    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })
    // If the user is in the database, return the user

    if (loggedInUser) return loggedInUser

    const newUser = await db.user.create({
        data : {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })
    return newUser;
}