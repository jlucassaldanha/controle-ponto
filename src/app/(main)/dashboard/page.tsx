import { redirect } from "next/navigation";
import { auth } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { minutesToTimeString } from "@/lib/timeFormater";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const userId = session.user.id;

  const userPreferences = await prisma.config.findUnique({
    where: {
      userId: userId
    }
  })


  return (
    <div className="flex justify-center items-center w-full">
      {userPreferences ? (
        <div className="flex flex-col">
        </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">Você ainda não tem suas preferencias configuradas nem pontos registrados.</p>
            <Link 
              className="font-bold text-blue-500"
              href='/preferences'
            >
              Clique aqui para configurar suas preferencias
            </Link>
          </div>
        )}
    </div>
  );
}
