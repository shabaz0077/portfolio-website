export const cvData = {
  name: "SHAHBAZ AHMED",
  title: "App Developer",
  email: "shahbazahmed2001@outlook.com",
  phone: "0501185123",
  location: "Dubai, UAE",
  dob: "13 April 2001",
  summary:
    "Adaptable IT professional with a Bachelor's degree in Information Technology and hands-on experience in app development, system setup, and user support. Skilled in backend development (NestJS, TypeScript), AI/ML pipelines, and modern web technologies. Continuously improving technical knowledge with focus on efficient problem-solving.",
  workExperience: [
    {
      title: "App Developer (Internship)",
      company: "PureCS/Dawak",
      location: "Dubai, UAE",
      duration: "4 months (Recent)",
      highlights: [
        "Developed backend services using NestJS and TypeScript",
        "Built and maintained AI/ML pipelines for prescription OCR",
        "Integrated Docker for containerization and deployment",
        "Worked on digital pharmacy platform (PureHealth ecosystem)",
        "Collaborated with cross-functional teams on feature implementation",
      ],
    },
    {
      title: "Customer Service Associate",
      company: "PureHealth, Dubai Airport",
      location: "Dubai, UAE",
      duration: "09/2021 - 04/2022",
      highlights: [
        "Resolved customer complaints and identified problems",
        "Data entry and database management",
        "Created reports from system data",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Amity University",
      location: "Dubai, UAE",
      year: "09/2018 - 11/2022",
      courses: ["Web Development", "Python Programming", "Network Security", "Java Programming"],
    },
    {
      degree: "O Level (IGCSE)",
      school: "Grammar School",
      location: "Dubai, UAE",
      year: "09/2016 - 06/2018",
      courses: ["Economics", "Accounting"],
    },
  ],
  skills: {
    "AI & Automation": ["AI Tools", "Machine Learning Pipelines", "OCR/VLM", "Python"],
    "Web Development": ["Next.js", "React", "JavaScript", "TypeScript", "CSS", "HTML"],
    Backend: ["NestJS", "Node.js", "Python", "API Design"],
    DevOps: ["Docker", "Git", "Linux"],
    Data: ["Data Analysis", "Python", "SQL basics"],
    "Soft Skills": ["Problem Solving", "Creativity", "Communication", "Team Collaboration"],
  },
  languages: [
    { language: "Urdu", proficiency: "Native or Bilingual" },
    { language: "English", proficiency: "Full Professional" },
    { language: "Arabic", proficiency: "Limited Working" },
    { language: "Punjabi", proficiency: "Full Professional" },
  ],
  interests: [
    "Mindfulness",
    "Reading",
    "Peer Monitoring",
    "Volunteering",
    "Travelling",
    "Art",
    "Gaming",
    "Sports",
  ],
  projects: [
    {
      title: "Prescription OCR Pipeline",
      description:
        "AI/ML pipeline for extracting text and structured data from prescription images using VLM",
      tech: ["Python", "NestJS", "Docker", "AI/ML"],
    },
    {
      title: "Arduino Project",
      description:
        "Open-source electronics platform project. Managed team of 3, delivered 10+ presentations.",
      tech: ["Arduino", "Electronics", "Project Management"],
    },
  ],
};

export const featuredProjects = [
  {
    title: "Prescription OCR",
    description: "AI/ML pipeline that extracts structured data from prescription images using VLM.",
    tech: ["Python", "NestJS", "Docker", "OCR"],
    href: "/projects#ocr",
  },
  {
    title: "AI Chatbot",
    description: "Portfolio assistant powered by Hugging Face that answers questions about Shahbaz.",
    tech: ["Next.js", "Hugging Face", "Vercel KV"],
    href: "/projects#chat",
  },
  {
    title: "Live Weather",
    description: "Dubai-first weather widget with city search, caching, and OpenWeatherMap data.",
    tech: ["OpenWeatherMap", "Next.js"],
    href: "/projects#weather",
  },
];
