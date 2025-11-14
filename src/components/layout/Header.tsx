import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Profile from "../ui/Profile";
import { Tooltip } from "@mui/material";

export default async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="flex justify-between items-center p-4 border-b-[1px] border-[#ccc]">
      <Link className="flex gap-2" href="/">
        <WorkHistoryIcon />
        <h1>Controle de Ponto</h1>
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center gap-3">
            <Tooltip title="Dashboard">
              <Link href='/dashboard' className="hover:bg-blue-50 rounded-[50%] p-2">
                <HomeIcon color="primary"/>
              </Link>
            </Tooltip>
            <Profile username={user.username}/>
          </div>
        ) : (
          <Link className="text-blue-400 flex justify-center items-center gap-1" href="/login">
            Entrar
            <ArrowForwardIcon />
          </Link>
        )}
      </nav>
    </header>
  );
}
