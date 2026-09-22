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
      version: "June 2026",
      status: "completed",
      name: "Rubik's Cube Solver",
      description:
        "Developed an algorithm-based Rubik's Cube solver that analyzes cube configurations and computes a sequence of moves to reach the solved state. Implemented cube-state representation and search-based solving techniques to efficiently explore possible moves.",
      stack: ["C++", "Data Structures", "Algorithms"],
      links: [
        { label: "Code", href: "https://github.com/shreya2717/Rubic-s-Cube-Solver.git" },
      ],
    },

    {
      version: "Aug 2026",
      status: "completed",
      name: "High-Performance Network Packet Analyzer",
      description:
        "Designed a real-time IoT-based monitoring solution using Raspberry Pi and MQ-02 gas sensor for continuous environmental surveillance. Integrated live data streaming and automated alerts using buzzer and LED indicatorsDeveloped a multi-threaded network packet analyzer for capturing and analyzing network traffic. Implemented DNS and SNI extraction, application-level traffic classification, and a producer-consumer architecture with thread-safe queues to improve packet processing scalability.",
      stack: ["C++", "Networking", "Multi-threading"],
      links: [
        { label: "Code", href: "https://github.com/shreya2717/Packet-Analyzer.git" },
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
    "Volunteer, National Symposium — ANRF, Feb 2025",
  ],

  certifications: [
    "Microsoft Excel Beginners to Advance– Skill Course",
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