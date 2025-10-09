import { auth } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import SubmitButton from '../ui/SubmitButton';
import { logOutAction } from '@/actions/auth.action';
import { prisma } from '@/lib/prisma';

export default async function Header() {
  const session = await auth();

  
	const user = await prisma.user.findUnique({
		where: {
			id: session?.user.id
		}
	})
  
  

  return (
    <header className="flex justify-between items-center p-4 border-b-[1px] border-[#ccc]" 
    >
      <Link href="/">
        <h1>Controle de Ponto</h1>
      </Link>
      <nav>
        {session?.user ? (
          <div className="flex items-center gap-4" >
            <span>Olá, {user?.username}</span>
            <form action={logOutAction}>
				<SubmitButton text="Sair" pendingText="Saindo..." />
			</form>
          </div>
        ) : (
          <Link href="/login">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}