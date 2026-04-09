import { useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppAuth } from "@/context/AppAuthContext";
import { userService } from "@/services/userService";
import { validatePhone, validateRequired } from "@/utils/validation";

const EmployerProfilePage = () => {
  const { user, refreshUser } = useAppAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [companyName, setCompanyName] = useState(user?.companyName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (nameError || companyNameError || phoneError) {
      toast.error("Fix the highlighted profile fields before saving");
      return;
    }
    try {
      await userService.updateMe({ name, companyName, phone });
      await refreshUser();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  const nameError = validateRequired("Name", name);
  const companyNameError = validateRequired("Company name", companyName);
  const phoneError = validatePhone(phone);
  const showError = (value: string) => submitAttempted || value.trim().length > 0;

  return (
    <AppShell title="Employer Profile" subtitle="Manage your employer identity and contact details.">
      <form onSubmit={save} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} />
            {showError(name) && nameError ? <p className="mt-1 text-sm text-rose-600">{nameError}</p> : null}
          </div>
          <div>
            <Label>Company Name</Label>
            <Input className="mt-2" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            {showError(companyName) && companyNameError ? <p className="mt-1 text-sm text-rose-600">{companyNameError}</p> : null}
          </div>
          <div>
            <Label>Phone</Label>
            <Input className="mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {showError(phone) && phoneError ? <p className="mt-1 text-sm text-rose-600">{phoneError}</p> : null}
          </div>
        </div>
        <Button type="submit" className="mt-8 rounded-2xl bg-slate-950 hover:bg-slate-800">
          Save Changes
        </Button>
      </form>
    </AppShell>
  );
};

export default EmployerProfilePage;
