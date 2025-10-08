import { redirect } from "next/navigation"
import { auth } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { logOutAction } from "@/actions/auth.action"
import SubmitButton from "@/components/SubmitButton"



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
                <SubmitButton text="Sair" pendingText="Saindo..." />
            </form>
        </div>
    )
}