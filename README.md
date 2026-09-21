# 📚 Lesson Reminder App

A real-time, automated classroom timetable tracker and scheduling web application. It displays your current schedule, tracks live lesson status changes, and triggers native browser desktop notifications 10 minutes before any upcoming class starts.

## Live Demo
The application is automatically built and securely hosted on **AWS**.
**[View Live Deployment](https://your-aws-deployment-url-here.com)**

## Features
- **Live Visual Clock:** A synchronized high-precision ticking clock showing hours, minutes, and seconds.
- **Dynamic Lesson States:** Instantly filters and breaks down your timeline into *Current Lesson*, *Next Lesson*, and *Today's Schedule*.
- **Smart System Notifications:** Automatically triggers native desktop push alerts exactly 10 minutes prior to a class starting using the browser `Notification` API.
- **Custom Visual Branding:** Fully styled using Tailwind CSS with streamlined internal custom asset delivery.

## Tech Stack
- **Frontend Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Deployment Platform:** AWS (Amplify / S3 + CloudFront)

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd your-repo-name
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.
