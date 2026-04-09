import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { API } from "@/api/api";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

interface Application {
  id: number;
  studentId: number;
  jobId: number;
  status: string;
}

interface DataContextType {
  jobs: Job[];
  applications: Application[];
  applyForJob: (studentId: number, jobId: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // ================= LOAD JOBS =================
  useEffect(() => {
    API.getJobs()
      .then((data) => setJobs(data))
      .catch((err) => console.error("Jobs error:", err));
  }, []);

  // ================= LOAD APPLICATIONS =================
  useEffect(() => {
    API.getApplications()
      .then((data) => setApplications(data))
      .catch((err) => console.error("Applications error:", err));
  }, []);

  // ================= APPLY =================
  const applyForJob = async (studentId: number, jobId: number) => {
    try {
      const newApp = await API.apply({ studentId, jobId });

      setApplications((prev) => [newApp, ...prev]);

      alert("Applied successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Application failed ❌");
    }
  };

  return (
    <DataContext.Provider
      value={{
        jobs,
        applications,
        applyForJob,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ================= HOOK =================
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};