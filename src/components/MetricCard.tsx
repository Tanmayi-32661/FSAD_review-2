const MetricCard = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint: string;
}) => {
  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-card">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
};

export default MetricCard;
