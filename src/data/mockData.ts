import { User, Job, Application, PlacementRecord } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'student@test.com', role: 'student', department: 'Computer Science', phone: '9876543210', active: true, cgpa: 8.5, skills: ['React', 'Node.js', 'Python', 'MongoDB'], resumeUrl: '/resumes/rahul_sharma.pdf', resumeName: 'rahul_sharma_resume.pdf' },
  { id: '2', name: 'Priya Patel', email: 'student2@test.com', role: 'student', department: 'Electronics', phone: '9876543211', active: true, cgpa: 9.1, skills: ['Python', 'SQL', 'Tableau', 'Statistics'], resumeUrl: '/resumes/priya_patel.pdf', resumeName: 'priya_patel_resume.pdf' },
  { id: '3', name: 'Amit Kumar', email: 'student3@test.com', role: 'student', department: 'Mechanical', phone: '9876543212', active: true, cgpa: 7.2, skills: ['AWS', 'Docker', 'Python'], resumeUrl: '/resumes/amit_kumar.pdf', resumeName: 'amit_kumar_resume.pdf' },
  { id: '4', name: 'TechCorp HR', email: 'employer@test.com', role: 'employer', company: 'TechCorp Solutions', phone: '9876543220', active: true },
  { id: '5', name: 'InnoSoft HR', email: 'employer2@test.com', role: 'employer', company: 'InnoSoft Technologies', phone: '9876543221', active: true },
  { id: '6', name: 'Dr. Meena Gupta', email: 'officer@test.com', role: 'officer', department: 'Placement Cell', phone: '9876543230', active: true },
  { id: '8', name: 'Sneha Reddy', email: 'student4@test.com', role: 'student', department: 'Information Technology', phone: '9876543213', active: false, cgpa: 8.0, skills: ['React', 'TypeScript', 'CSS', 'TensorFlow'] },
];

export const mockJobs: Job[] = [
  { id: '1', title: 'Software Engineer', company: 'TechCorp Solutions', description: 'Build scalable web applications using React and Node.js. Work with cross-functional teams on cutting-edge products.', package: '12 LPA', location: 'Bangalore', type: 'Full-time', skills: ['React', 'Node.js', 'MongoDB'], deadline: '2026-03-15', employerId: '4', postedDate: '2026-02-10', openings: 5, requiredCGPA: 7.5, requiredSkills: ['React', 'Node.js'] },
  { id: '2', title: 'Data Analyst', company: 'InnoSoft Technologies', description: 'Analyze large datasets to drive business decisions. Strong SQL and Python skills required.', package: '8 LPA', location: 'Hyderabad', type: 'Full-time', skills: ['Python', 'SQL', 'Tableau'], deadline: '2026-03-20', employerId: '5', postedDate: '2026-02-12', openings: 3, requiredCGPA: 7.0, requiredSkills: ['Python', 'SQL'] },
  { id: '3', title: 'Frontend Developer', company: 'TechCorp Solutions', description: 'Create beautiful user interfaces with modern frontend technologies.', package: '10 LPA', location: 'Pune', type: 'Full-time', skills: ['React', 'TypeScript', 'CSS'], deadline: '2026-03-25', employerId: '4', postedDate: '2026-02-15', openings: 4, requiredCGPA: 7.0, requiredSkills: ['React', 'TypeScript'] },
  { id: '4', title: 'DevOps Engineer', company: 'InnoSoft Technologies', description: 'Manage CI/CD pipelines and cloud infrastructure on AWS.', package: '14 LPA', location: 'Mumbai', type: 'Full-time', skills: ['AWS', 'Docker', 'Kubernetes'], deadline: '2026-04-01', employerId: '5', postedDate: '2026-02-18', openings: 2, requiredCGPA: 8.0, requiredSkills: ['AWS', 'Docker', 'Kubernetes'] },
  { id: '5', title: 'ML Intern', company: 'TechCorp Solutions', description: 'Work on machine learning models for recommendation systems.', package: '30K/month', location: 'Remote', type: 'Internship', skills: ['Python', 'TensorFlow', 'Statistics'], deadline: '2026-03-10', employerId: '4', postedDate: '2026-02-08', openings: 6, requiredCGPA: 8.0, requiredSkills: ['Python', 'TensorFlow'] },
];

export const mockApplications: Application[] = [
  { id: '1', studentId: '1', studentName: 'Rahul Sharma', jobId: '1', jobTitle: 'Software Engineer', company: 'TechCorp Solutions', status: 'shortlisted', appliedDate: '2026-02-12', interviewDate: '2026-03-01' },
  { id: '2', studentId: '1', studentName: 'Rahul Sharma', jobId: '2', jobTitle: 'Data Analyst', company: 'InnoSoft Technologies', status: 'applied', appliedDate: '2026-02-14' },
  { id: '3', studentId: '2', studentName: 'Priya Patel', jobId: '1', jobTitle: 'Software Engineer', company: 'TechCorp Solutions', status: 'offered', appliedDate: '2026-02-11', interviewDate: '2026-02-28', offerLetter: '12 LPA - Software Engineer at TechCorp Solutions' },
  { id: '4', studentId: '2', studentName: 'Priya Patel', jobId: '3', jobTitle: 'Frontend Developer', company: 'TechCorp Solutions', status: 'applied', appliedDate: '2026-02-16' },
  { id: '5', studentId: '3', studentName: 'Amit Kumar', jobId: '4', jobTitle: 'DevOps Engineer', company: 'InnoSoft Technologies', status: 'rejected', appliedDate: '2026-02-19' },
  { id: '6', studentId: '3', studentName: 'Amit Kumar', jobId: '5', jobTitle: 'ML Intern', company: 'TechCorp Solutions', status: 'shortlisted', appliedDate: '2026-02-10', interviewDate: '2026-03-05' },
];

export const mockPlacementRecords: PlacementRecord[] = [
  { id: '1', studentId: '2', studentName: 'Priya Patel', company: 'TechCorp Solutions', role: 'Software Engineer', package: '12 LPA', department: 'Electronics', year: 2026 },
  { id: '2', studentId: '10', studentName: 'Vikram Singh', company: 'Google', role: 'SDE-1', package: '25 LPA', department: 'Computer Science', year: 2025 },
  { id: '3', studentId: '11', studentName: 'Anjali Verma', company: 'Microsoft', role: 'Program Manager', package: '22 LPA', department: 'Computer Science', year: 2025 },
  { id: '4', studentId: '12', studentName: 'Karan Mehta', company: 'Amazon', role: 'SDE-1', package: '28 LPA', department: 'Information Technology', year: 2025 },
  { id: '5', studentId: '13', studentName: 'Deepa Nair', company: 'Infosys', role: 'Systems Engineer', package: '6 LPA', department: 'Mechanical', year: 2025 },
  { id: '6', studentId: '14', studentName: 'Ravi Teja', company: 'TCS', role: 'Developer', package: '7 LPA', department: 'Electronics', year: 2025 },
  { id: '7', studentId: '15', studentName: 'Sakshi Gupta', company: 'Wipro', role: 'Analyst', package: '5.5 LPA', department: 'Mechanical', year: 2024 },
  { id: '8', studentId: '16', studentName: 'Mohit Agrawal', company: 'Flipkart', role: 'SDE-1', package: '18 LPA', department: 'Computer Science', year: 2024 },
];
