export const INITIAL_USER = {
  id: "101",
  name: "Ajay",
  email: "ajay@gmail.com",
  password: "admin@123",
};

export const INITIAL_PROJECTS = [
  "Project Name",
  "Homepage Development",
  "Project Alpha",
  "Mobile App UI",
  "Design System",
  "Backend API Integrations"
];

export const INITIAL_WORK_TYPES = [
  "Bug fixes",
  "Feature Development",
  "UI / UX Design",
  "Code Review",
  "Documentation",
  "Testing & QA"
];

export const INITIAL_TIMESHEETS = [
  {
    id: 1,
    weekNumber: 1,
    dateRange: "1 - 5 January, 2024",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    targetHours: 40,
    days: [
      { date: "2024-01-01", dayLabel: "Jan 1" },
      { date: "2024-01-02", dayLabel: "Jan 2" },
      { date: "2024-01-03", dayLabel: "Jan 3" },
      { date: "2024-01-04", dayLabel: "Jan 4" },
      { date: "2024-01-05", dayLabel: "Jan 5" }
    ],
    entries: [
      { id: "e1-1", date: "2024-01-01", project: "Project Alpha", workType: "Feature Development", description: "Initial setup & architecture", hours: 8 },
      { id: "e1-2", date: "2024-01-02", project: "Project Alpha", workType: "UI / UX Design", description: "Component library design", hours: 8 },
      { id: "e1-3", date: "2024-01-03", project: "Project Alpha", workType: "Feature Development", description: "Authentication module", hours: 8 },
      { id: "e1-4", date: "2024-01-04", project: "Project Alpha", workType: "Bug fixes", description: "Fix login state persistence", hours: 8 },
      { id: "e1-5", date: "2024-01-05", project: "Project Alpha", workType: "Testing & QA", description: "End-to-end component testing", hours: 8 }
    ]
  },
  {
    id: 2,
    weekNumber: 2,
    dateRange: "8 - 12 January, 2024",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    targetHours: 40,
    days: [
      { date: "2024-01-08", dayLabel: "Jan 8" },
      { date: "2024-01-09", dayLabel: "Jan 9" },
      { date: "2024-01-10", dayLabel: "Jan 10" },
      { date: "2024-01-11", dayLabel: "Jan 11" },
      { date: "2024-01-12", dayLabel: "Jan 12" }
    ],
    entries: [
      { id: "e2-1", date: "2024-01-08", project: "Homepage Development", workType: "Feature Development", description: "Hero section implementation", hours: 8 },
      { id: "e2-2", date: "2024-01-09", project: "Homepage Development", workType: "Feature Development", description: "Navigation header & search", hours: 8 },
      { id: "e2-3", date: "2024-01-10", project: "Homepage Development", workType: "UI / UX Design", description: "Responsive mobile adjustments", hours: 8 },
      { id: "e2-4", date: "2024-01-11", project: "Homepage Development", workType: "Bug fixes", description: "Fix layout shift issues", hours: 8 },
      { id: "e2-5", date: "2024-01-12", project: "Homepage Development", workType: "Code Review", description: "PR reviews & refactoring", hours: 8 }
    ]
  },
  {
    id: 3,
    weekNumber: 3,
    dateRange: "15 - 19 January, 2024",
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    targetHours: 40,
    days: [
      { date: "2024-01-15", dayLabel: "Jan 15" },
      { date: "2024-01-16", dayLabel: "Jan 16" },
      { date: "2024-01-17", dayLabel: "Jan 17" },
      { date: "2024-01-18", dayLabel: "Jan 18" },
      { date: "2024-01-19", dayLabel: "Jan 19" }
    ],
    entries: [
      { id: "e3-1", date: "2024-01-15", project: "Design System", workType: "Feature Development", description: "Typography & color variables", hours: 8 },
      { id: "e3-2", date: "2024-01-16", project: "Design System", workType: "Feature Development", description: "Button & Modal primitives", hours: 8 },
      { id: "e3-3", date: "2024-01-17", project: "Design System", workType: "Documentation", description: "Storybook component docs", hours: 8 }
    ]
  },
  {
    id: 4,
    weekNumber: 4,
    dateRange: "21 - 26 January, 2024",
    startDate: "2024-01-21",
    endDate: "2024-01-26",
    targetHours: 40,
    days: [
      { date: "2024-01-21", dayLabel: "Jan 21" },
      { date: "2024-01-22", dayLabel: "Jan 22" },
      { date: "2024-01-23", dayLabel: "Jan 23" },
      { date: "2024-01-24", dayLabel: "Jan 24" },
      { date: "2024-01-25", dayLabel: "Jan 25" }
    ],
    entries: [
      { id: "e4-1", date: "2024-01-21", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-2", date: "2024-01-21", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-3", date: "2024-01-22", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-4", date: "2024-01-22", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-5", date: "2024-01-22", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-6", date: "2024-01-23", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-7", date: "2024-01-23", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-8", date: "2024-01-23", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-9", date: "2024-01-24", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-10", date: "2024-01-24", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 },
      { id: "e4-11", date: "2024-01-24", project: "Project Name", workType: "Feature Development", description: "Homepage Development", hours: 4 }
    ]
  },
  {
    id: 5,
    weekNumber: 5,
    dateRange: "28 January - 1 February, 2024",
    startDate: "2024-01-28",
    endDate: "2024-02-01",
    targetHours: 40,
    days: [
      { date: "2024-01-28", dayLabel: "Jan 28" },
      { date: "2024-01-29", dayLabel: "Jan 29" },
      { date: "2024-01-30", dayLabel: "Jan 30" },
      { date: "2024-01-31", dayLabel: "Jan 31" },
      { date: "2024-02-01", dayLabel: "Feb 1" }
    ],
    entries: []
  },
  {
    id: 6,
    weekNumber: 6,
    dateRange: "4 - 8 February, 2024",
    startDate: "2024-02-04",
    endDate: "2024-02-08",
    targetHours: 40,
    days: [
      { date: "2024-02-04", dayLabel: "Feb 4" },
      { date: "2024-02-05", dayLabel: "Feb 5" },
      { date: "2024-02-06", dayLabel: "Feb 6" },
      { date: "2024-02-07", dayLabel: "Feb 7" },
      { date: "2024-02-08", dayLabel: "Feb 8" }
    ],
    entries: [
      { id: "e6-1", date: "2024-02-04", project: "Mobile App UI", workType: "UI / UX Design", description: "Mobile screen wireframes", hours: 8 },
      { id: "e6-2", date: "2024-02-05", project: "Mobile App UI", workType: "Feature Development", description: "Bottom navigation & routes", hours: 8 },
      { id: "e6-3", date: "2024-02-06", project: "Mobile App UI", workType: "Feature Development", description: "Dashboard widgets integration", hours: 8 },
      { id: "e6-4", date: "2024-02-07", project: "Mobile App UI", workType: "Bug fixes", description: "Fix gesture navigation bugs", hours: 8 },
      { id: "e6-5", date: "2024-02-08", project: "Mobile App UI", workType: "Testing & QA", description: "iOS and Android device testing", hours: 8 }
    ]
  },
  {
    id: 7,
    weekNumber: 7,
    dateRange: "11 - 15 February, 2024",
    startDate: "2024-02-11",
    endDate: "2024-02-15",
    targetHours: 40,
    days: [
      { date: "2024-02-11", dayLabel: "Feb 11" },
      { date: "2024-02-12", dayLabel: "Feb 12" },
      { date: "2024-02-13", dayLabel: "Feb 13" },
      { date: "2024-02-14", dayLabel: "Feb 14" },
      { date: "2024-02-15", dayLabel: "Feb 15" }
    ],
    entries: [
      { id: "e7-1", date: "2024-02-11", project: "Backend API Integrations", workType: "Feature Development", description: "REST endpoint optimization", hours: 8 },
      { id: "e7-2", date: "2024-02-12", project: "Backend API Integrations", workType: "Feature Development", description: "GraphQL schema definitions", hours: 8 },
      { id: "e7-3", date: "2024-02-13", project: "Backend API Integrations", workType: "Code Review", description: "Backend PR reviews & caching", hours: 8 }
    ]
  },
  {
    id: 8,
    weekNumber: 8,
    dateRange: "18 - 22 February, 2024",
    startDate: "2024-02-18",
    endDate: "2024-02-22",
    targetHours: 40,
    days: [
      { date: "2024-02-18", dayLabel: "Feb 18" },
      { date: "2024-02-19", dayLabel: "Feb 19" },
      { date: "2024-02-20", dayLabel: "Feb 20" },
      { date: "2024-02-21", dayLabel: "Feb 21" },
      { date: "2024-02-22", dayLabel: "Feb 22" }
    ],
    entries: []
  },
  {
    id: 9,
    weekNumber: 9,
    dateRange: "25 - 29 February, 2024",
    startDate: "2024-02-25",
    endDate: "2024-02-29",
    targetHours: 40,
    days: [
      { date: "2024-02-25", dayLabel: "Feb 25" },
      { date: "2024-02-26", dayLabel: "Feb 26" },
      { date: "2024-02-27", dayLabel: "Feb 27" },
      { date: "2024-02-28", dayLabel: "Feb 28" },
      { date: "2024-02-29", dayLabel: "Feb 29" }
    ],
    entries: [
      { id: "e9-1", date: "2024-02-25", project: "Project Alpha", workType: "Feature Development", description: "Database migrations & seed script", hours: 8 },
      { id: "e9-2", date: "2024-02-26", project: "Project Alpha", workType: "Feature Development", description: "User permission matrix", hours: 8 },
      { id: "e9-3", date: "2024-02-27", project: "Project Alpha", workType: "UI / UX Design", description: "Dark mode theme styling", hours: 8 },
      { id: "e9-4", date: "2024-02-28", project: "Project Alpha", workType: "Bug fixes", description: "Fix form validation errors", hours: 8 },
      { id: "e9-5", date: "2024-02-29", project: "Project Alpha", workType: "Testing & QA", description: "Performance auditing & LCP fix", hours: 8 }
    ]
  },
  {
    id: 10,
    weekNumber: 10,
    dateRange: "3 - 7 March, 2024",
    startDate: "2024-03-03",
    endDate: "2024-03-07",
    targetHours: 40,
    days: [
      { date: "2024-03-03", dayLabel: "Mar 3" },
      { date: "2024-03-04", dayLabel: "Mar 4" },
      { date: "2024-03-05", dayLabel: "Mar 5" },
      { date: "2024-03-06", dayLabel: "Mar 6" },
      { date: "2024-03-07", dayLabel: "Mar 7" }
    ],
    entries: [
      { id: "e10-1", date: "2024-03-03", project: "Homepage Development", workType: "Feature Development", description: "SEO optimization & Meta tags", hours: 8 },
      { id: "e10-2", date: "2024-03-04", project: "Homepage Development", workType: "Feature Development", description: "Dynamic blog section feed", hours: 8 },
      { id: "e10-3", date: "2024-03-05", project: "Homepage Development", workType: "Bug fixes", description: "Fix image aspect ratio issues", hours: 8 }
    ]
  },
  {
    id: 11,
    weekNumber: 11,
    dateRange: "10 - 14 March, 2024",
    startDate: "2024-03-10",
    endDate: "2024-03-14",
    targetHours: 40,
    days: [
      { date: "2024-03-10", dayLabel: "Mar 10" },
      { date: "2024-03-11", dayLabel: "Mar 11" },
      { date: "2024-03-12", dayLabel: "Mar 12" },
      { date: "2024-03-13", dayLabel: "Mar 13" },
      { date: "2024-03-14", dayLabel: "Mar 14" }
    ],
    entries: []
  },
  {
    id: 12,
    weekNumber: 12,
    dateRange: "17 - 21 March, 2024",
    startDate: "2024-03-17",
    endDate: "2024-03-21",
    targetHours: 40,
    days: [
      { date: "2024-03-17", dayLabel: "Mar 17" },
      { date: "2024-03-18", dayLabel: "Mar 18" },
      { date: "2024-03-19", dayLabel: "Mar 19" },
      { date: "2024-03-20", dayLabel: "Mar 20" },
      { date: "2024-03-21", dayLabel: "Mar 21" }
    ],
    entries: [
      { id: "e12-1", date: "2024-03-17", project: "Design System", workType: "Feature Development", description: "Data table pagination components", hours: 8 },
      { id: "e12-2", date: "2024-03-18", project: "Design System", workType: "Feature Development", description: "Modal dialog primitives", hours: 8 },
      { id: "e12-3", date: "2024-03-19", project: "Design System", workType: "UI / UX Design", description: "Accessibility aria attributes", hours: 8 },
      { id: "e12-4", date: "2024-03-20", project: "Design System", workType: "Code Review", description: "Component tokens refactor", hours: 8 },
      { id: "e12-5", date: "2024-03-21", project: "Design System", workType: "Documentation", description: "Storybook release v2.0", hours: 8 }
    ]
  }
];
