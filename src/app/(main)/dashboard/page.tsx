import { redirect } from "next/navigation";
import { auth } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const userId = session.user.id;

  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <div className="flex flex-col">
      teste
    </div>
  );
}
