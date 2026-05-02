import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import AppStatusBadge from "@/components/AppStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { officerService } from "@/services/officerService";
import type { Interaction } from "@/types";
import { validateRequired } from "@/utils/validation";

const OfficerInteractionsPage = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interactionDate, setInteractionDate] = useState("");
  const [status, setStatus] = useState<Interaction["status"]>("SCHEDULED");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const load = async () => {
    setInteractions(await officerService.getInteractions());
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (titleError || descriptionError || interactionDateError) {
      toast.error("Fix the highlighted interaction fields before saving");
      return;
    }
    try {
      await officerService.createInteraction({ title, description, interactionDate, status });
      setTitle("");
      setDescription("");
      setInteractionDate("");
      setStatus("SCHEDULED");
      setSubmitAttempted(false);
      toast.success("Interaction logged");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save interaction");
    }
  };

  const admitParticipant = async (interactionId: number, studentId: number) => {
    try {
      await officerService.admitMeetingParticipant(interactionId, studentId);
      toast.success("Participant admitted");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to admit participant");
    }
  };

  const titleError = validateRequired("Title", title);
  const descriptionError = validateRequired("Description", description);
  const interactionDateError = validateRequired("Date", interactionDate);
  const showError = (value: string) => submitAttempted || value.trim().length > 0;

  return (
    <AppShell title="Manage Interactions" subtitle="Track officer conversations, meetings, and follow-ups with employers or students.">
      <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input className="mt-2" value={title} onChange={(e) => setTitle(e.target.value)} />
            {showError(title) && titleError ? <p className="mt-1 text-sm text-rose-600">{titleError}</p> : null}
          </div>
          <div>
            <Label>Date</Label>
            <Input className="mt-2" type="datetime-local" value={interactionDate} onChange={(e) => setInteractionDate(e.target.value)} />
            {showError(interactionDate) && interactionDateError ? <p className="mt-1 text-sm text-rose-600">{interactionDateError}</p> : null}
          </div>
        </div>
        <div className="mt-4">
          <Label>Description</Label>
          <Textarea className="mt-2 min-h-24" value={description} onChange={(e) => setDescription(e.target.value)} />
          {showError(description) && descriptionError ? <p className="mt-1 text-sm text-rose-600">{descriptionError}</p> : null}
        </div>
        <div className="mt-4">
          <Label>Status</Label>
          <select className="mt-2 rounded-xl border border-slate-200 px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as Interaction["status"])}>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <Button type="submit" className="mt-6 rounded-2xl bg-slate-950 hover:bg-slate-800">Save Interaction</Button>
      </form>

      <div className="mt-6 grid gap-4">
        {interactions.map((interaction) => (
          <div key={interaction.id} className="rounded-[2rem] bg-white p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{interaction.title}</h3>
                <p className="mt-2 text-slate-600">{interaction.description}</p>
                <p className="mt-3 text-sm text-slate-500">{new Date(interaction.interactionDate).toLocaleString()}</p>
                {interaction.meetingUrl && interaction.status === "SCHEDULED" ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild className="rounded-2xl bg-slate-950 hover:bg-slate-800">
                      <a href={`${interaction.meetingUrl}?host=true`} target="_blank" rel="noreferrer">
                        Host Meeting
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-2xl">
                      <a href={interaction.meetingUrl} target="_blank" rel="noreferrer">
                        Join Meeting
                      </a>
                    </Button>
                  </div>
                ) : null}
                {interaction.waitingParticipants?.length ? (
                  <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-sm font-semibold text-amber-800">Waiting room</p>
                    <div className="mt-3 space-y-2">
                      {interaction.waitingParticipants.map((participant) => (
                        <div key={participant.id} className="flex flex-col gap-3 rounded-xl bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{participant.name}</p>
                            <p className="text-sm text-slate-500">{participant.email}</p>
                          </div>
                          <Button className="rounded-xl bg-slate-950 hover:bg-slate-800" onClick={() => admitParticipant(interaction.id, participant.id)}>
                            Admit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {interaction.admittedParticipants?.length ? (
                  <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-800">Admitted participants</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {interaction.admittedParticipants.map((participant) => (
                        <span key={participant.id} className="rounded-full bg-white px-3 py-1 text-sm text-emerald-700">
                          {participant.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="space-y-3 text-right">
                <AppStatusBadge status={interaction.status} />
                <Button
                  variant="destructive"
                  className="rounded-2xl"
                  onClick={async () => {
                    try {
                      await officerService.deleteInteraction(interaction.id);
                      toast.success("Interaction deleted");
                      await load();
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Unable to delete interaction");
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

export default OfficerInteractionsPage;
