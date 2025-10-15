import Link from "next/link";
import SubmitButton from "../ui/SubmitButton";
import { logOutAction } from "@/actions/auth.action";
import { getCurrentUser } from "@/lib/session";

export default async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="flex justify-between items-center p-4 border-b-[1px] border-[#ccc]">
      <Link href="/">
        <h1>Controle de Ponto</h1>
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <span>Olá, {user?.username}</span>
            </Link>
            <form action={logOutAction}>
              <SubmitButton text="Sair" pendingText="Saindo..." />
            </form>
          </div>
        ) : (
          <Link className="text-blue-400" href="/login">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}
