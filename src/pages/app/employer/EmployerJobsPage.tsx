import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobService } from "@/services/jobService";
import type { Job, JobFormValues } from "@/types";
import { validateFutureOrTodayDate, validatePositiveInteger, validateRequired } from "@/utils/validation";

const emptyJob: JobFormValues = {
  title: "",
  description: "",
  location: "",
  employmentType: "",
  packageOffered: "",
  openings: 1,
  minimumCgpa: null,
  applicationDeadline: "",
  skillsRequired: "",
};

const EmployerJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<JobFormValues>(emptyJob);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const load = async () => {
    setJobs(await jobService.getEmployerJobs());
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (Object.values(errors).some(Boolean)) {
      toast.error("Fix the highlighted job fields before saving");
      return;
    }
    try {
      if (editingId) {
        await jobService.updateJob(editingId, form);
        toast.success("Job updated");
      } else {
        await jobService.createJob(form);
        toast.success("Job created");
      }
      setForm(emptyJob);
      setEditingId(null);
      setSubmitAttempted(false);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save job");
    }
  };

  const errors = {
    title: validateRequired("Title", form.title),
    location: validateRequired("Location", form.location),
    employmentType: validateRequired("Employment type", form.employmentType),
    packageOffered: validateRequired("Package", form.packageOffered),
    openings: validatePositiveInteger("Openings", form.openings),
    applicationDeadline: validateFutureOrTodayDate(form.applicationDeadline ?? ""),
    skillsRequired: validateRequired("Skills required", form.skillsRequired),
    description: validateRequired("Description", form.description),
  };
  const showError = (value: string | number | null) =>
    submitAttempted || (typeof value === "string" ? value.trim().length > 0 : value !== null);

  return (
    <AppShell title="Manage Jobs" subtitle="Create, edit, and remove jobs that students can match against.">
      <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input className="mt-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            {showError(form.title) && errors.title ? <p className="mt-1 text-sm text-rose-600">{errors.title}</p> : null}
          </div>
          <div>
            <Label>Location</Label>
            <Input className="mt-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            {showError(form.location) && errors.location ? <p className="mt-1 text-sm text-rose-600">{errors.location}</p> : null}
          </div>
          <div>
            <Label>Employment Type</Label>
            <Input className="mt-2" value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })} />
            {showError(form.employmentType) && errors.employmentType ? <p className="mt-1 text-sm text-rose-600">{errors.employmentType}</p> : null}
          </div>
          <div>
            <Label>Package</Label>
            <Input className="mt-2" value={form.packageOffered} onChange={(e) => setForm({ ...form, packageOffered: e.target.value })} />
            {showError(form.packageOffered) && errors.packageOffered ? <p className="mt-1 text-sm text-rose-600">{errors.packageOffered}</p> : null}
          </div>
          <div>
            <Label>Openings</Label>
            <Input className="mt-2" type="number" value={form.openings} onChange={(e) => setForm({ ...form, openings: Number(e.target.value) })} />
            {showError(form.openings) && errors.openings ? <p className="mt-1 text-sm text-rose-600">{errors.openings}</p> : null}
          </div>
          <div>
            <Label>Minimum CGPA</Label>
            <Input className="mt-2" type="number" value={form.minimumCgpa ?? ""} onChange={(e) => setForm({ ...form, minimumCgpa: e.target.value ? Number(e.target.value) : null })} />
          </div>
          <div>
            <Label>Deadline</Label>
            <Input className="mt-2" type="date" value={form.applicationDeadline ?? ""} onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })} />
            {showError(form.applicationDeadline ?? "") && errors.applicationDeadline ? <p className="mt-1 text-sm text-rose-600">{errors.applicationDeadline}</p> : null}
          </div>
          <div>
            <Label>Skills Required</Label>
            <Input className="mt-2" value={form.skillsRequired} onChange={(e) => setForm({ ...form, skillsRequired: e.target.value })} placeholder="java, spring boot, mysql" />
            {showError(form.skillsRequired) && errors.skillsRequired ? <p className="mt-1 text-sm text-rose-600">{errors.skillsRequired}</p> : null}
          </div>
        </div>
        <div className="mt-4">
          <Label>Description</Label>
          <Textarea className="mt-2 min-h-32" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          {showError(form.description) && errors.description ? <p className="mt-1 text-sm text-rose-600">{errors.description}</p> : null}
        </div>
        <Button type="submit" className="mt-6 rounded-2xl bg-slate-950 hover:bg-slate-800">
          {editingId ? "Update Job" : "Create Job"}
        </Button>
      </form>

      <div className="mt-6 grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-[2rem] bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-2 text-slate-600">{job.description}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl"
                  onClick={() => {
                    setEditingId(job.id);
                    setForm({
                      title: job.title,
                      description: job.description,
                      location: job.location,
                      employmentType: job.employmentType,
                      packageOffered: job.packageOffered,
                      openings: job.openings,
                      minimumCgpa: job.minimumCgpa,
                      applicationDeadline: job.applicationDeadline ?? "",
                      skillsRequired: job.skillsRequired.join(", "),
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-2xl"
                  onClick={async () => {
                    try {
                      await jobService.deleteJob(job.id);
                      toast.success("Job deleted");
                      await load();
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Unable to delete job");
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
};

export default EmployerJobsPage;
