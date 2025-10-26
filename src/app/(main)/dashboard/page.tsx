import Link from "next/link";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { requireUserSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const user = await requireUserSession()

  const userPreferences = await getUserPreferences(user.id)

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col border-[1px] border-gray-300 rounded-md p-3 gap-2 m-8">
        <span className="flex justify-center border-b-[1px] border-gray-300 pb-2">Opções</span>
        {userPreferences ? (
          <div className="flex flex-col">
            <Link 
              className="text-blue-500 p-4 hover:bg-blue-50 rounded-md"
              href='/preferences'
            >
              Editar preferencias
            </Link>
            <Link 
              className="text-blue-500 p-4 hover:bg-blue-50 rounded-md"
              href='/punch/add'
            >
              Adicionar ponto
            </Link>
            <Link 
              className="text-blue-500 p-4 hover:bg-blue-50 rounded-md"
              href='/punch'
            >
              Visualizar pontos
            </Link>
          </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl mx-5">
                Você ainda não tem suas preferencias configuradas nem pontos registrados.
              </p>
              <Link 
                className="text-blue-500 p-4 hover:bg-blue-50 rounded-md"
                href='/preferences'
              >
                Editar preferencias
              </Link>
            </div>
          )}
        
      </div>
      
    </div>
  );
}
