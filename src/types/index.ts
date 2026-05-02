export type Role = "student" | "employer" | "officer";

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: Role;
  department?: string | null;
  phone?: string | null;
  companyName?: string | null;
  company?: string | null;
  cgpa?: number | null;
  active: boolean;
  resumeUploaded?: boolean;
  skills?: string[];
  resumeUrl?: string;
  resumeName?: string;
}

export interface Resume {
  id: number;
  fileName: string;
  filePath: string;
  contentType: string;
  skills: string[];
  uploadedAt: string;
}

export interface Job {
  id: number | string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  packageOffered: string;
  openings: number;
  minimumCgpa?: number | null;
  applicationDeadline?: string | null;
  skillsRequired: string[];
  createdAt?: string;
  employerId: number | string;
  employerName?: string;
  matchScore?: number;
  company?: string;
  package?: string;
  type?: string;
  skills?: string[];
  deadline?: string;
  postedDate?: string;
  requiredCGPA?: number | null;
  requiredSkills?: string[];
}

export interface Application {
  id: number | string;
  jobId: number | string;
  jobTitle: string;
  company: string;
  studentId: number | string;
  studentName: string;
  status:
    | "APPLIED"
    | "SHORTLISTED"
    | "REJECTED"
    | "SELECTED"
    | "applied"
    | "shortlisted"
    | "rejected"
    | "selected"
    | "offered"
    | "accepted"
    | "declined";
  appliedAt?: string;
  appliedDate?: string;
  interviewDate?: string;
  offerLetter?: string;
}

export interface Interaction {
  id: number;
  title: string;
  description: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  interactionDate: string;
  officerId: number;
  officerName: string;
  studentId?: number | null;
  studentName?: string | null;
  employerId?: number | null;
  employerName?: string | null;
  meetingUrl?: string;
  waitingParticipants?: MeetingParticipant[];
  admittedParticipants?: MeetingParticipant[];
  joinStatus?: "NOT_REQUESTED" | "WAITING" | "ADMITTED";
}

export interface MeetingParticipant {
  id: number;
  name: string;
  email: string;
}

export interface ReportSummary {
  totalStudents: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
  studentsApplied: number;
  studentsPlaced: number;
  selectedCount: number;
  rejectedCount: number;
  resumesUploaded: number;
}

export interface AuthPayload {
  token: string;
  sessionExpiresAt: number;
  user: User;
}

export interface CaptchaChallenge {
  token: string;
  challenge: string;
  expiresAt: number;
}

export interface JobFormValues {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  packageOffered: string;
  openings: number;
  minimumCgpa?: number | null;
  applicationDeadline?: string | null;
  skillsRequired: string;
}

export interface ProfileFormValues {
  name: string;
  department?: string;
  phone?: string;
  companyName?: string;
  cgpa?: number | null;
}
