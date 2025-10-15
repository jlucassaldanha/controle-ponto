import Link from "next/link";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { requireUserSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const user = await requireUserSession()

  const userPreferences = await getUserPreferences(user.id)

  return (
    <div className="flex justify-center items-center w-full">
      {userPreferences ? (
        <div className="flex flex-col">
          <Link 
            className="font-bold text-blue-500"
            href='/preferences'
          >
            Clique aqui para configurar suas preferencias
          </Link>
        </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl mx-5">
              Você ainda não tem suas preferencias configuradas nem pontos registrados.
            </p>
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
