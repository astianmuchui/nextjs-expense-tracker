"use server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache" // For refreshing

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

export default async function addTransaction(formdata: FormData): Promise<TransactionResult> {
    const textvalue = formdata.get('text')
    const amountvalue = formdata.get('amount')

    // Check for input values
    if (!textvalue || textvalue === '' || !amountvalue) {
        return { error: 'Text or amount is missing' }
    }

    // Get logged in user
    const { userId } = auth()

    // Check for user
    if (!userId) return { error: "user not found" }

    const text: string = textvalue.toString()
    const amount: number = parseFloat(amountvalue.toString())


    try {
        const transaction_data: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        })

        revalidatePath('/')
        return { data: transaction_data }
    }
    catch (e) {
        return {error : "Transaction not added"}
    }
}