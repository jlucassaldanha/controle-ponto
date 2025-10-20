import AddPunchForm from "@/components/punch/AddPunchForm";
import { requireUserSession } from "@/lib/session";
import Link from "next/link";

export default async function AddPunch() {
	await requireUserSession()

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2" >
			<AddPunchForm />
		</div>
	)
}