import { redirect } from "next/navigation"
import { auth } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Button } from "@mui/material"
import { logOutAction } from "@/actions/auth.action"

function SubmitButton() {
    return (
        <Button type="submit" variant='contained' >
            Sair
        </Button>
    );
}

export default async function Dashboard() {
    const session = await auth()

    if (!session?.user?.id) {
        return redirect('/login')
    }

    const userId = session.user.id

    const userInfo = await prisma.user.findUnique({ where: {
        id: userId
    } })
    

    return (
        <div className="flex flex-col">
            Dashboard
            <div>{userInfo?.email}</div>
            <div>{userInfo?.username}</div>
            <div>{userInfo?.passwordHash}</div>
            <div>{userInfo?.id}</div>
            <form action={logOutAction}>
                <SubmitButton />
            </form>
        </div>
    )
}