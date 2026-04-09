# Placement Interaction System

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Spring Boot 3 + Java 17
- Database: MySQL
- Auth: JWT with role-based access control
- HTTP Client: Axios-style API layer in `src/api/api.ts`

## Key Rules Implemented

- Student access is blocked until resume upload completes.
- Resume metadata and extracted skills are stored in MySQL.
- Matched jobs for students come from resume skill matching.
- Role-based dashboards exist for `student`, `employer`, `officer`, and `admin`.
- JWT is stored in local storage and attached to protected requests.

## Project Structure

### Frontend

- `src/components/`
- `src/pages/app/`
- `src/services/`
- `src/routes/AppRoutes.tsx`
- `src/context/AppAuthContext.tsx`

### Backend

- `backend/src/main/java/com/placeit/placementsystem/controller/`
- `backend/src/main/java/com/placeit/placementsystem/service/`
- `backend/src/main/java/com/placeit/placementsystem/repository/`
- `backend/src/main/java/com/placeit/placementsystem/model/`
- `backend/src/main/java/com/placeit/placementsystem/security/`

## MySQL Setup

1. Create MySQL if it is not already installed.
2. Ensure a user exists with access to create and update the database.
3. Default backend config currently expects:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/placement_interaction_system?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: root
    password: root
```

4. Change `backend/src/main/resources/application.yml` if your username or password is different.
5. Optional manual schema file: `backend/database/schema.sql`

## Backend Run Steps

1. Open a terminal in [backend/pom.xml](./backend/pom.xml)'s folder:
   `cd backend`
2. Compile:
   `mvn -DskipTests compile`
3. Run:
   `mvn spring-boot:run`
4. Backend starts on `http://localhost:8082`

## Frontend Run Steps

1. Open a terminal in the project root.
2. Install frontend packages if needed:
   `npm install`
3. Start dev server:
   `npm run dev`
4. Frontend starts on `http://localhost:8080`

## Verified Commands

- Frontend build:
  `npm run build`
- Backend compile:
  `mvn -q -DskipTests compile`

## Main Frontend Routes

- `/`
- `/login`
- `/register`
- `/student`
- `/student/resume`
- `/student/jobs`
- `/student/applications`
- `/student/profile`
- `/employer`
- `/employer/jobs`
- `/employer/applications`
- `/employer/profile`
- `/officer`
- `/officer/reports`
- `/officer/interactions`
- `/admin`
- `/admin/users`
- `/admin/applications`

## API Endpoint List

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users/me`
- `PUT /api/users/me`

### Resume

- `POST /api/resumes/me`
- `GET /api/resumes/me`
- `DELETE /api/resumes/me`

### Jobs

- `GET /api/jobs`
- `GET /api/jobs/matched`
- `POST /api/jobs`
- `PUT /api/jobs/{jobId}`
- `DELETE /api/jobs/{jobId}`

### Applications

- `POST /api/applications`
- `GET /api/applications/me`
- `GET /api/applications/employer`
- `GET /api/applications/job/{jobId}`
- `GET /api/applications`
- `PATCH /api/applications/{applicationId}/status`
- `DELETE /api/applications/{applicationId}`

### Officer

- `GET /api/officer/reports/summary`
- `GET /api/officer/reports/placements`
- `GET /api/officer/interactions`
- `POST /api/officer/interactions`
- `PUT /api/officer/interactions/{interactionId}`
- `DELETE /api/officer/interactions/{interactionId}`

### Admin

- `GET /api/admin/users`
- `PATCH /api/admin/users/{userId}/role`
- `DELETE /api/admin/users/{userId}`
- `GET /api/admin/overview`
- `GET /api/admin/applications`

## Resume Matching Logic

- Resume upload accepts `pdf`, `doc`, and `docx`.
- Apache Tika extracts text from the file.
- `SkillExtractionService` scans for known keywords.
- Extracted skills are stored as comma-separated metadata in the `resumes` table.
- Student matched jobs come from overlap between resume skills and `skillsRequired`.
- Students cannot apply unless the overlap score is greater than zero.

## Important Files

- Frontend app routes: [src/routes/AppRoutes.tsx](./src/routes/AppRoutes.tsx)
- Frontend auth context: [src/context/AppAuthContext.tsx](./src/context/AppAuthContext.tsx)
- Frontend API layer: [src/api/api.ts](./src/api/api.ts)
- Backend security config: [backend/src/main/java/com/placeit/placementsystem/security/SecurityConfig.java](./backend/src/main/java/com/placeit/placementsystem/security/SecurityConfig.java)
- Backend auth controller: [backend/src/main/java/com/placeit/placementsystem/controller/AuthController.java](./backend/src/main/java/com/placeit/placementsystem/controller/AuthController.java)
- Backend resume service: [backend/src/main/java/com/placeit/placementsystem/service/ResumeService.java](./backend/src/main/java/com/placeit/placementsystem/service/ResumeService.java)
- Schema file: [backend/database/schema.sql](./backend/database/schema.sql)

## Notes

- JWT secret and MySQL credentials are currently local-development defaults and should be changed before production use.
- The frontend currently uses an Axios-compatible local shim because package registry access was restricted during implementation in this environment.
- Backend tests were not added in this pass; compile verification was completed successfully.
