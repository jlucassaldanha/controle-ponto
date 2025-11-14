import { getTotalOvertime } from "@/core/punch/punch.reports"

export type OverTimeCardProps = {
	totalOvertime: ReturnType<typeof getTotalOvertime>
}