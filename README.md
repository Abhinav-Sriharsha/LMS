# Learning Management System
### Team:
 1. Abhinav Sriharsha Anumanchi - 017514900
 2. Harshavardhan Kuruvella - 017534582
 3. Sai Dheeraj Gollu - 017520503
 4. Bhupalam Venkat Gowtham - 017510714

### Git repo:
https://github.com/gopinathsjsu/team-project-capabilities.git

### Sprint Task Sheet
https://docs.google.com/spreadsheets/d/1q92n4PIWmsXrDmGWioylL965BW6VPbtpyC3gvaE_4Z0/edit#gid=1374474283

### Project Journal
https://docs.google.com/spreadsheets/d/1jz8ZSahXFioPR01Pkcagu5i6P7xwHzaSpvlmbPZtx6I/edit#gid=0

### XP Values
Feedback and Communication (Weekly status update calls) We communicated regularly online and offline. We had status updates twice every week through calls, zoom and whatsapp.

## Project Overview

This React application, Learning Management System, is designed to facilitate educational processes for faculty and students. It supports a range of functionalities including course management, assignments, quizzes, grades, announcements, and user management.

- **React Version**: 18+
- **Node Version**: 18+
- **Project URL**: `http://<deployment-url>`

## Features

1. **Courses**: Allows users to view a list of available courses.
2. **Assignments**: Faculty members can create and update assignments, which students can view.
3. **Quizzes**: Similar to assignments, faculty can manage quizzes which are then available for student participation.
4. **Grades**: Faculty can input and update grades, which students can view for their courses.
5. **Announcements**: Used by faculty to make announcements which are visible to students.
6. **Add User**: Admin functionality to create new student or faculty accounts.

## Diagrams
## Component Diagram
![image](https://github.com/gopinathsjsu/team-project-capabilities/assets/101085681/811419e1-b37a-407a-baf7-1d044fadc769)

## Deployment Diagram
![image](https://github.com/gopinathsjsu/team-project-capabilities/assets/101085681/a8ed7457-1072-4ba0-9c44-bf1f3fda0844)

## Deployment
Our API and database are deployed on AWS, leveraging auto-scaling EC2 clusters with a load balancer to ensure high availability and performance.

## UI Wireframes
![image](https://github.com/gopinathsjsu/team-project-capabilities/assets/101085681/281e46d3-ff66-450f-81de-88539502420b)


## Team Contributions

### Abhinav Sriharsha Anumanchi

- **Responsibilities**:
  - Developed the frontend and backend for the **Courses** section.
  - Implemented React Router setup for navigation between different components.
- **Key Achievements**:
  - Successfully integrated API calls to fetch and display course data from the backend.

### Harshavardhan Kuruvella

- **Responsibilities**:
  - Designed and implemented the **Assignments** and **Quizzes** sections for faculty and students.
  - Ensured responsive design for these modules.
- **Key Achievements**:
  - Developed forms for creating assignments and quizzes.

### Sai Dheeraj Gollu

- **Responsibilities**:
  - Handled the **Grades** and **Announcements** features.
  - Setup the backend services to manage grades and announcements data.
- **Key Achievements**:
  - Created a seamless user interface for faculty to enter and modify grades.

### Bhupalam Venkat Gowtham

- **Responsibilities**:
  - Developed the **student grades** and **student profile** functionality for Admin users to create new accounts.
- **Key Achievements**:
  - Integrated login as different users i.e. Admin, Faculty and student.

## Setup and Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- AWS RDS MySQL database (for production)

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhinav-Sriharsha/LMS.git
   cd LMS
   ```

2. **Set up backend environment variables:**

   ```bash
   cd Node
   cp .env.example .env
   ```

   Edit `Node/.env` and add your database credentials:
   ```env
   DB_HOST=your-rds-endpoint.us-east-2.rds.amazonaws.com
   DB_USER=your_db_user
   DB_PASSWORD=your_secure_password_here
   DB_NAME=lms
   PORT=5000
   NODE_ENV=development
   ```

3. **Set up React environment variables:**

   ```bash
   cd ../React
   cp .env.example .env.local
   ```

   Edit `React/.env.local`:
   ```env
   REACT_APP_API=http://localhost:5000
   ```

4. **Install backend dependencies:**

   ```bash
   cd ../Node
   npm install
   ```

5. **Install frontend dependencies:**

   ```bash
   cd ../React
   npm install
   ```

6. **Start the development servers:**

   **Terminal 1 - Backend:**
   ```bash
   cd Node
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd React
   npm start
   ```

### Environment Variables

**IMPORTANT: Never commit `.env` files to version control!**

- `.env` files are git-ignored and should only exist locally
- Use `.env.example` files as templates for configuration
- For CI/CD deployments (Vercel, Render), set environment variables in platform settings

#### Backend Variables (Node/.env)
- `DB_HOST`: AWS RDS endpoint
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password (keep secret)
- `DB_NAME`: Database name
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

#### Frontend Variables (React/.env.local)
- `REACT_APP_API`: Backend API endpoint
