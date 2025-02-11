# Focus Flow

**Focus Flow** is an innovative productivity application designed to help users streamline their daily workflow by managing tasks efficiently and integrating cutting-edge AI assistance. With a modern, responsive design and robust backend services, Focus Flow delivers an optimal experience for users aiming to enhance their focus and productivity.

## Overview

Focus Flow aims to deliver a seamless task management experience by combining the best practices of modern web development with intelligent automation. The application features a dynamic task planner, secure user authentication, AI-powered assistance, and responsive UI components—all built using state-of-the-art technologies.

## Planned Functionalities

- **Dynamic Task Planner:**
  - Create, edit, and remove tasks.
  - Break down complex tasks into smaller, manageable steps.
  - Prioritize tasks using an interactive Eisenhower Matrix.

- **User Authentication:**
  - Secure login and logout functionality powered by Supabase.
  - Session persistence to maintain user state across page refreshes.

- **AI Integration:**
  - Leverage OpenAI’s API (via secure server-side API routes) to provide helpful AI responses.
  - Customizable prompts for specific tasks (e.g., generating cleaning plans based on room photos).

- **Responsive UI & Forms:**
  - Built with React, Next.js, and Tailwind CSS for a responsive, accessible design.
  - Uses react-hook-form with Zod for robust form validation.

- **State Management:**
  - Global state is managed with Zustand to ensure smooth, client-side interactions.

## Technologies

**Frontend:**

- Next.js with React and TypeScript
- Tailwind CSS for styling
- React Hook Form and Zod for form validation
- Zustand for global state management

**Backend:**

- Supabase for authentication, database, and real-time subscriptions
- Next.js API Routes for secure server-side handling (including OpenAI integration)

**AI:**

- OpenAI API (integrated securely via server-side endpoints)

**Testing:**

- Vitest for unit and integration testing
- Axios for HTTP requests (with custom request handlers)


## Usage

### Authentication

Users can log in and log out securely. The app maintains session persistence so that users remain logged in across page refreshes.

### Task Management

Users can add new tasks, break them down into subtasks, edit, and delete tasks. Tasks are prioritized using an interactive matrix for better organization.

### AI Features

Users can test AI-powered functionalities (e.g., generating creative responses) via secure server-side endpoints, ensuring that sensitive API keys remain protected.

### Responsive Interface

The application features a modern, responsive UI that adapts to various devices, ensuring a smooth user experience.

## Deployment

Focus Flow is built with Next.js, making it easy to deploy on platforms like Vercel or Netlify. These platforms support Next.js features such as SSG, SSR, and ISR, ensuring fast and scalable performance.
