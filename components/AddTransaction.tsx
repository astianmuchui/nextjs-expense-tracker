"use client"

import addTransaction from "@/app/actions/addTransaction"
import { toast } from "react-toastify"

const AddTransaction = () => {
    const clientAction = async (formdata: FormData) => {
        const { data, error } = await addTransaction(formdata)

        // check for error
        if (error) {
            toast.error(error)
        }
        else {
            toast.success("Transaction added")
        }
    }
    return (
        <>
            <h3>Add Transaction</h3>
            <form action={clientAction}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" name="text" id="text" placeholder="Enter text ..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)  </label>
                    <input type="number" name="amount" id="amount" placeholder="Enter amount..." step="0.01" />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction