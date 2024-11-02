"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { Transaction } from "@/types/Transaction"


export default async function deleteTransaction(transactionid: string): Promise< boolean | object > {
    const { userId } =  auth()
    if (!userId) return {error: "could not find user"}

    try {
        const deleted = await db.transaction.delete({
            where: { userId: userId, id: transactionid }
        })
        if (deleted)
        {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return {error: "database error"}
    }
}