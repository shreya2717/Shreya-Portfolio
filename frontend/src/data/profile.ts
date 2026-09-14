export const PROFILE = {
  name: "Shreya Bhattacharya",

  title: "Software Developer",

  badge: "B.Tech Electronics & Communication Engineering · 2026",

  intro:
    "Fresher Software Developer skilled in C++, Data Structures & Algorithms, and backend development. Experienced in real-time systems and IoT-based projects, with a strong problem-solving mindset and eagerness to learn.",

  about:
    "Electronics and Communication Engineering graduate with a strong foundation in software development, real-time systems, IoT, and problem solving. I enjoy building practical projects that combine software, hardware, and real-world applications.",

  resumeFile: "/Shreya_Bhattacharya_Resume.pdf",

  resumeFileName: "Shreya_Bhattacharya_Resume.pdf",

  stats: [
    { value: "8.52", label: "B.Tech CGPA" },
    { value: "89.8%", label: "10th Score" },
    { value: "84.16%", label: "12th Score" },
  ],

  skills: [
    {
      group: "Languages",
      items: ["C/C++", "Python (Basic)", "MATLAB"],
    },
    {
      group: "Tools",
      items: ["Git", "GitHub", "VS Code", "Raspberry Pi", "Arduino"],
    },
    {
      group: "Core Concepts",
      items: [
        "SQL",
        "Data Structures & Algorithms",
        "OOP",
        "DBMS",
        "Excel",
      ],
    },
  ],

  projects: [
    {
      version: "Feb 2026",
      status: "completed",
      name: "Real-Time Analytics Dashboard",
      description:
        "Developed a real-time dashboard using React and Node.js for live data visualization. Implemented WebSocket-based communication for concurrent data updates and reduced API response latency by 40% through backend optimization.",
      stack: ["React", "Node.js", "WebSocket"],
      links: [
        { label: "Code", href: "#" },
      ],
    },

    {
      version: "Aug 2024",
      status: "completed",
      name: "Gas Level Monitoring System",
      description:
        "Designed a real-time IoT-based monitoring solution using Raspberry Pi and MQ-02 gas sensor for continuous environmental surveillance. Integrated live data streaming and automated alerts using buzzer and LED indicators.",
      stack: ["Raspberry Pi", "MQ-02", "IoT"],
      links: [
        { label: "Code", href: "#" },
      ],
    },

    {
      version: "Apr 2025",
      status: "completed",
      name: "Criminal Detection Using Face Recognition",
      description:
        "Developed a real-time face detection surveillance system using OpenCV, Python, and Raspberry Pi with Haar Cascade classifiers. Worked on improving detection accuracy across different lighting and environmental conditions.",
      stack: ["Python", "OpenCV", "Raspberry Pi"],
      links: [
        { label: "Code", href: "#" },
      ],
    },
  ],

  education: [
    {
      period: "2022 — 2026",
      degree: "B.Tech Electronics and Communication Engineering",
      detail: "Vellore Institute of Technology · CGPA 8.52",
      current: false,
    },
    {
      period: "2019 — 2021",
      degree: "Higher Secondary — PCM",
      detail: "St. Xavier’s High School · 10th: 89.8% · 12th: 84.16%",
      current: false,
    },
  ],

  achievements: [
    "Technical Lead, VITRONIX Club, VIT Bhopal — Aug 2024 to Aug 2025",
    "Led a 25-member technical team through workshops and hands-on coding sessions",
    "Volunteer, National Symposium — ANRF, Feb 2025",
  ],

  certifications: [
    "VLSI Design Certification — Maven Silicon",
    "MATLAB Onramp & Simulink Onramp — MathWorks",
    "Computer Vision Certification — Vityarthi",
  ],

  links: [
    {
      label: "GitHub",
      href: "https://github.com/shreya2717",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shreya-bhattacharya-76817a309/",
    },
  ],
} as const;

export const SUGGESTED_QUESTIONS = [
  "Tell me about Shreya",
  "What are Shreya's skills?",
  "What projects has Shreya built?",
  "What is Shreya's educational background?",
  "What achievements does Shreya have?",
  "What certifications does Shreya have?",
  "Why should I hire Shreya?",
] as const;