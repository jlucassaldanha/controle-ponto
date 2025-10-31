import Link from "next/link";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { requireUserSession } from "@/lib/session";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const user = await requireUserSession()

  const userPreferences = await getUserPreferences(user.id)

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Card>
        <CardHeader 
          title="Opções"
        />
        <Divider />
        <CardContent>
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
                href='/punch/history'
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
        </CardContent>
      </Card>      
    </div>
  );
}
