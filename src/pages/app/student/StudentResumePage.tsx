import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useAppAuth } from "@/context/AppAuthContext";
import { resumeService } from "@/services/resumeService";
import type { Resume } from "@/types";

const StudentResumePage = () => {
  const { refreshUser } = useAppAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setResume(await resumeService.getMine());
      } catch {
        setResume(null);
      }
    };
    void load();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith(".pdf") && !lowerName.endsWith(".doc") && !lowerName.endsWith(".docx")) {
      toast.error("Only PDF, DOC, or DOCX files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Resume must be 10 MB or smaller");
      return;
    }

    try {
      setUploading(true);
      const uploaded = await resumeService.upload(file);
      setResume(uploaded);
      await refreshUser();
      toast.success("Resume uploaded successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async () => {
    try {
      await resumeService.deleteMine();
      setResume(null);
      await refreshUser();
      toast.success("Resume removed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  return (
    <AppShell
      title="Upload Resume First"
      subtitle="Resume upload is mandatory. Until this is completed, all student placement features stay blocked."
    >
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.25em] text-rose-500">Mandatory Gate</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">Upload Resume First</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Once your resume is uploaded, the backend extracts skills, stores metadata in MySQL, and unlocks matched jobs,
          applications, and profile updates.
        </p>

        <div className="mt-8 rounded-[1.75rem] border border-dashed border-emerald-200 bg-emerald-50 p-6">
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} disabled={uploading} />
          <p className="mt-3 text-sm text-slate-500">Supported formats: PDF, DOC, DOCX. Max size: 10 MB.</p>
        </div>

        {resume && (
          <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">{resume.fileName}</h3>
            <p className="mt-1 text-sm text-slate-500">Uploaded at {new Date(resume.uploadedAt).toLocaleString()}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  {skill}
                </span>
              ))}
            </div>
            <Button variant="outline" className="mt-6 rounded-2xl" onClick={handleDelete}>
              Delete Resume
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default StudentResumePage;
