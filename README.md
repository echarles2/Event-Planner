# Event-Planner
A fullstack application for planning events with your friends.

## Project Team  
Ethan Charles, Julia Dimayuga, Lalaine Balmediano

## Project General Description  
The event-planner is a management tool designed for users to host events, share invites and collective calendars. This app is intended to make the planning of social gatherings simpler by allowing the participants view everyone's availabilities.

## User Stories  
- As a user, I want to be able to create events, so that I can invite and share them with others.  
- As a user, I want to see when my friends are busy, without the hassle of reaching out.  
- As a user, I want to create an account, so I can manage my own events and view past & upcoming invitations. 

## Local Setup
1. Clone the respository.  
    i) Copy the GitHub repository link.  

    ii) Open a terminal and enter the command `git clone <repository_url>`.

2. Install dependencies.  
    i) Open a new terminal and navigate to the backend directory.  
        - (eg. `cd Event-Planner\apps\backend`)  
          
    ii) Run `npm install`.  

    iii) Open a new terminal and navigate to the frontend directory.  
        - (eg. `cd Event-Planner\apps\frontend`)  
          
    iv) Run `npm install`.  

3. Set up the environment variables.  
    i) In the backend, create a .env file.  

    ii) Configure the following:  
        - `PORT=`  
        - `FRONTEND_URL=`  
        - `DATABASE_URL=`  
        - `CLERK_PUBLISHABLE_KEY=`  
        - `CLERK_SECRET_KEY=`  
          
    iii) In the frontend, create a .env file.  

    iv) Configure the following:  
        - `VITE_API_BASE_URL=`  
        - `VITE_CLERK_PUBLISHABLE_KEY=`  
          
4. Set up Prisma.  
    i) From the backend terminal, run `npx prisma migrate dev`.  

5. Start the servers.  
    i) From the backend terminal, run `npm run start`.  
    
    ii) From the frontend terminal, run `npm run dev`.  
        - `Ctrl + Click` the link in the frontend terminal to access the application.  

## Sprint 1
G.1: Organize your group- Entire team  
G.2: Pick a theme- Entire team  

T.1: Set up Project Git Repository- Lalaine  
T.2: Project Initialization- Ethan  
T.3: Project Readme- Lalaine  
T.4: App Integration- Entire Team  
T.5: App Stylesheet and Style Guide- Entire Team  
T.6: Team Vercel Account/Management- Ethan  

I.1: Header Component- Lalaine  
I.1: Create Event Component- Julia  
I.1: Calendar Component- Ethan  
I.1: Footer Component- Julia  

## Sprint 2
T.1 : Multi-page Navigation - Julia  
T.2: Navigation Interface(s) - Lalaine  
T.3: Shared state across pages - Ethan  

I.1: Feature Page  
My Checklist Feature Page - Lalaine  
Create Event Feature Page - Julia  
My Events Feature Page - Ethan  

I.2: Form Component  
Checklist Form - Lalaine  
Create Event Form - Julia  
Availability Form - Ethan  

I.3: Element Addition/Removal   
Add/Remove Checklist Item - Lalaine  
Add/Remove Event - Julia  
Add/Remove Availability - Ethan  

## Sprint 3
T.1: Hook Definition(s) - Julia  
T.2: Service Definition(s) - Lalaine  
T.4: Shared-page-state Refactor - Ethan  

I.1: Repository Definition(s) and Integration  
My Checklist Repository - Lalaine  
Create Event Repository - Julia  
Availability Repository - Ethan  

I.2: Test Data  
Checklist Data - Lalaine  
Event Data - Julia  
Availability Data - Ethan  

I.3: New / Refactored Component(s)  
My Checklist Refactor - Lalaine  
Create Event Refactor - Julia  
Calendar Refactor - Ethan    

I.4: Architectural Layout Document  
My Checklist Architecture Documentation - Lalaine  
Create Event Architecture Documentation - Julia  
Availability/Calendar Architecture Documentation - Ethan  

## Sprint 4  
T.1: Back-end App Initialization - Julia  
T.2: Development SQL Database - Ethan  
T.3: Prisma Installation and Client Initialization - Ethan  
T.4: Back-end CORS Configuration - Julia  

I.1: Back-end Resource Endpoint  
Create Event Endpoint - Julia  
Checklist Endpoint - Lalaine  
Availability Endpoint - Ethan  

I.2: Resource Database Schema  
Create Event Model - Julia  
Checklist/ChecklistItem Models - Lalaine  
AvailabilityEntry Model - Ethan  

I.3: Front-end Repository sends requests to back-end  
Create Event Repository Refactor - Julia  
Checklist Repository Refactor - Lalaine  
Availability Repository Refactor - Ethan  

I.4: Application State Persistence  
Recently Created Events Data Persistence - Julia  
Checklist Data Persistence - Lalaine  
Availability/Calendar Data Persistence - Ethan  

## Sprint 5  
T.1: Clerk Auth Setup - Lalaine  
T.2: Team Vercel Account/Management - Ethan  
T.3: Back-end User Management - Ethan  
T.4: User Login/Registration - Lalaine  
T.5: Local Setup Instructions - Julia  

I.1: Custom User-Associated Data and Session Management  
Create Event User-Associated Data and Session Management- Julia  
Checklist User-Associated Data and Session Management - Lalaine  
Calendar/Availability User-Associated Data and Session Management - Ethan  

I.2: Project Retrospective  
LB Project Retrospective Document - Lalaine  
EC Project Retrospective Document - Ethan  
JD Project Retrospective Document - Julia  