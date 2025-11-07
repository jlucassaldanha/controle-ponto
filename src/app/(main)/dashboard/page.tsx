import Link from "next/link";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { requireUserSession } from "@/lib/session";
import { Card, CardContent, Typography } from "@mui/material";
import PunchRegister from "@/components/punch/PunchRegister";
import { getFirstPunch } from "@/core/punch/punch.services";
import { getDailySchedulesTime } from "@/core/preferences/preferences.utils";
import { getTotalOvertime, getWorkdayBalanceReport } from "@/core/punch/punch.reports";
import OvertimeCard from "@/components/punch/OvertimeCard/OvertimeCard";
import PunchTable from "@/components/punch/punchTable/PunchTable";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await requireUserSession()

  const firstPunch = await getFirstPunch(session.id)	
    const initialDate = firstPunch?.timestamp || new Date()
    const todayDate = new Date()
  
    const userPreferences = await getUserPreferences(session.id)
    const dailySchedulesTime = getDailySchedulesTime(userPreferences?.dailySchedules)
    
    const punchesPerDay = await getWorkdayBalanceReport(session.id, initialDate, todayDate, dailySchedulesTime)
    const slicedPunchesPerDay = punchesPerDay.slice(punchesPerDay.length - 6, punchesPerDay.length - 1)
  
    const totalOvertimeData = getTotalOvertime(punchesPerDay, dailySchedulesTime)
  
    let color = ''
    if (totalOvertimeData.overtime && !totalOvertimeData.undertime) {
      color = "green"
    } else if (!totalOvertimeData.overtime && totalOvertimeData.undertime) {
      color = "red"
    }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      {userPreferences ? (
        <section className="flex flex-col gap-8 items-center">
          <PunchRegister session={session}/>
          <Typography variant="h4" component="h3" className="mb-6 text-center">
            Última semana
          </Typography>
          <OvertimeCard time={totalOvertimeData.timeStr} color={color}/>
          <PunchTable punchesPerDay={slicedPunchesPerDay} dailySchedulesTime={dailySchedulesTime} />
      </section>
      ) : (
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
