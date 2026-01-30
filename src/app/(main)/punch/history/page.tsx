import { getFirstPunch } from "@/core/punch/punch.services";
import { requireUserSession } from "@/lib/session";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { getDailySchedulesTime } from "@/core/preferences/preferences.utils";
import PunchTable from "@/components/punch/punchTable/PunchTable";
import {
  getWorkdayBalanceReport,
  getTotalOvertime,
} from "@/core/punch/punch.reports";
import OvertimeCard from "@/components/punch/OvertimeCard/OvertimeCard";
import { getInitialBalance } from "@/core/user/user.services";
import { Typography } from "@mui/material";
import { getJustificationsReport } from "@/core/justification/justification.reports";

export const dynamic = "force-dynamic";

export default async function PunchHistory() {
  const session = await requireUserSession();

  const firstPunch = await getFirstPunch(session.id);
  const initialDate = firstPunch?.timestamp || new Date();
  const todayDate = new Date();

  const userPreferences = await getUserPreferences(session.id);
  const dailySchedulesTime = getDailySchedulesTime(
    userPreferences?.dailySchedules
  );
  
  const initialBalance = await getInitialBalance(session.id);

  const punchesPerDay = await getWorkdayBalanceReport(
    session.id,
    initialDate,
    todayDate,
    dailySchedulesTime
  );

  const justifications = await getJustificationsReport(session.id, initialDate, todayDate);

  /*const totalOvertimeData = getTotalOvertime(
    punchesPerDay,
    dailySchedulesTime,
    initialBalance
  );
  console.log(totalOvertimeData)*/

  const totalOvertimeData = getTotalOvertime(
    punchesPerDay,
    dailySchedulesTime,
    justifications,
    initialBalance
  );

  const reversedPunchesPerDay = [...punchesPerDay].toReversed();
  const reversedJustifications = [...justifications].toReversed();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Espelho Ponto
      </Typography>
      <OvertimeCard totalOvertime={totalOvertimeData} />
      <PunchTable
        punchesPerDay={reversedPunchesPerDay}
        justifications={reversedJustifications}
        dailySchedulesTime={dailySchedulesTime}
      />
    </div>
  );
}
