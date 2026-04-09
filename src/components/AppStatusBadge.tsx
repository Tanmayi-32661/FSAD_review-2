import { Badge } from "@/components/ui/badge";

const styles: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-amber-100 text-amber-700",
  REJECTED: "bg-rose-100 text-rose-700",
  SELECTED: "bg-emerald-100 text-emerald-700",
  SCHEDULED: "bg-sky-100 text-sky-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-slate-200 text-slate-700",
};

const AppStatusBadge = ({ status }: { status: string }) => {
  return <Badge className={styles[status] ?? "bg-slate-100 text-slate-700"}>{status}</Badge>;
};

export default AppStatusBadge;
