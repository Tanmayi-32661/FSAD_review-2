import { useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppAuth } from "@/context/AppAuthContext";
import { userService } from "@/services/userService";
import { validateCgpa, validatePhone, validateRequired } from "@/utils/validation";

const StudentProfilePage = () => {
  const { user, refreshUser } = useAppAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [department, setDepartment] = useState(user?.department ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [cgpa, setCgpa] = useState(user?.cgpa?.toString() ?? "");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (nameError || phoneError || cgpaError) {
      toast.error("Fix the highlighted profile fields before saving");
      return;
    }
    try {
      await userService.updateMe({
        name,
        department,
        phone,
        cgpa: cgpa ? Number(cgpa) : null,
      });
      await refreshUser();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  const nameError = validateRequired("Name", name);
  const phoneError = validatePhone(phone);
  const cgpaError = validateCgpa(cgpa);
  const showError = (value: string) => submitAttempted || value.trim().length > 0;

  return (
    <AppShell title="Student Profile" subtitle="Student profile updates stay locked until a resume has been uploaded.">
      <form onSubmit={save} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" className="mt-2" value={name} onChange={(e) => setName(e.target.value)} />
            {showError(name) && nameError ? <p className="mt-1 text-sm text-rose-600">{nameError}</p> : null}
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" className="mt-2" value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" className="mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {showError(phone) && phoneError ? <p className="mt-1 text-sm text-rose-600">{phoneError}</p> : null}
          </div>
          <div>
            <Label htmlFor="cgpa">CGPA</Label>
            <Input id="cgpa" className="mt-2" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
            {showError(cgpa) && cgpaError ? <p className="mt-1 text-sm text-rose-600">{cgpaError}</p> : null}
          </div>
        </div>

        <Button type="submit" className="mt-8 rounded-2xl bg-slate-950 hover:bg-slate-800">
          Save Changes
        </Button>
      </form>
    </AppShell>
  );
};

export default StudentProfilePage;
