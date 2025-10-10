import { auth } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import SubmitButton from '../ui/SubmitButton';
import { logOutAction } from '@/actions/auth.action';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

export default async function Header() {
  const session = await auth();

  let user: User | null = null
  if (session) {
	user = await prisma.user.findUnique({
		where: {
			id: session?.user.id
		}
	})
  }

  return (
    <header 
		className="flex justify-between items-center p-4 border-b-[1px] border-[#ccc]" 
    >
      <Link href="/">
        <h1>Controle de Ponto</h1>
      </Link>
      <nav>
        {session?.user ? (
          <div className="flex items-center gap-4" >
			<Link href='/dashboard'>
				<span>Olá, {user?.username}</span>
			</Link>
            <form action={logOutAction}>
				<SubmitButton text="Sair" pendingText="Saindo..." />
			</form>
          </div>
        ) : (
          <Link 
		  	className='text-blue-400'
			href="/login">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}