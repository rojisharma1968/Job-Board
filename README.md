
# JobHub - Modern Job Board

![JobHub Logo](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop&auto=format)

## Overview

JobHub is a clean, responsive job board built with React and Tailwind CSS. It provides a modern interface for job seekers to discover opportunities across different industries and for employers to showcase their openings.

## Features

- **Responsive Design:** Mobile-first approach ensuring compatibility across all devices
- **Job Search & Filtering:** Search jobs by title, company, or keywords with advanced filtering options
- **Company Profiles:** Detailed company pages with information and active job listings
- **Job Details:** Comprehensive job descriptions with requirements and responsibilities
- **Save Jobs:** Bookmark interesting positions with local storage persistence
- **Post Jobs:** Mock job posting form for demonstration purposes
- **Lazy Loading:** Optimized image loading and skeleton states for better UX

## Tech Stack

- **React:** UI library for building component-based interfaces
- **React Router:** For navigation and routing
- **Tailwind CSS:** Utility-first CSS framework for styling
- **TypeScript:** Type safety and improved developer experience
- **Vite:** Fast, modern frontend build tool
- **React Query:** For data fetching and state management
- **Lucide Icons:** Beautiful, consistent SVG icons
- **Recharts:** Composable charting library

## Folder Structure

```
src/
├── components/         # Reusable components
│   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   └── ui/             # UI components (Button, Card, etc.)
├── data/               # Mock JSON data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jobhub.git
   cd jobhub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All images are from [Unsplash](https://unsplash.com)
- Icons provided by [Lucide](https://lucide.dev)
