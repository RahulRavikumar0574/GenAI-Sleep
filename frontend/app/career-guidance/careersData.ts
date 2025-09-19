// This file contains the data for all career paths, including images.
export const CAREER_PATHS = [
  {
    slug: 'lawyer',
    title: 'Lawyer (LLB)',
    category: 'Business & Management',
    image: '/images/lawyer.jpg',
    desc: "Advocate for justice, represent clients in court, and provide legal advice.",
    details: `Lawyers play a crucial role in upholding justice and the rule of law. They represent clients in legal proceedings, draft legal documents, and provide counsel on legal matters. Specializations include criminal law, corporate law, family law, and more.`,
    dos: ["Study case law", "Practice public speaking", "Intern at law firms"],
    donts: ["Ignore ethical standards", "Neglect research", "Overlook client needs"],
    requiredSkills: ['Communication', 'Research', 'Critical Thinking', 'Negotiation'],
    softSkills: ['Empathy', 'Time Management', 'Writing'],
    education: {
      minimum: "Bachelor's + LLB",
      recommended: ["LLB", "LLM (optional)"],
      alternative: ["Paralegal certification"],
      licenses: ["Bar Council Registration"]
    },
    salaries: { entry: 400000, mid: 800000, senior: 2000000, currency: 'INR' },
    outlook: { demand: 'Medium', futureTrends: ['Corporate compliance', 'Cyber law', 'ADR growth'] },
    resources: [
      { title: 'Legal Research Basics (YouTube)', url: 'https://www.youtube.com/results?search_query=legal+research+basics' },
      { title: 'Intro to Law (Coursera)', url: 'https://www.coursera.org' }
    ],
    timeline: [
      { time: '8:00 AM', activity: 'Arrive at office/court, review case files', color: 'primary' },
      { time: '9:30 AM', activity: 'Meet with clients and prepare legal documents', color: 'secondary' },
      { time: '11:00 AM', activity: 'Attend court hearings or negotiations', color: 'info' },
      { time: '2:00 PM', activity: 'Research case law and draft arguments', color: 'success' },
      { time: '4:00 PM', activity: 'Consult with colleagues, finalize paperwork', color: 'warning' },
      { time: '6:00 PM', activity: 'Wrap up, plan for next day', color: 'error' },
    ],
    relatedSlugs: ['legal-advisor', 'judge']
  },
  {
    slug: 'scientist',
    title: 'Scientist (Physics, Chemistry, Biology)',
    category: 'Engineering & Tech',
    image: '/images/scientist.png',
    desc: "Conduct research, analyze data, and contribute to scientific advancements.",
    details: `Scientists investigate the natural world, conduct experiments, and publish findings. They may work in academia, industry, or government, and often collaborate internationally.`,
    dos: ["Stay curious", "Collaborate with peers", "Publish findings"],
    donts: ["Falsify data", "Work in isolation", "Ignore safety protocols"],
    requiredSkills: ['Data Analysis', 'Mathematics', 'Chemistry', 'Biology', 'Physics', 'Problem Solving'],
    softSkills: ['Documentation', 'Teamwork', 'Presentation'],
    education: {
      minimum: "Bachelor's in relevant science",
      recommended: ["Master's", "PhD (research roles)"],
      alternative: ["Online research methods courses"],
      licenses: []
    },
    salaries: { entry: 500000, mid: 1000000, senior: 2000000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['AI-driven discovery', 'Biotech growth', 'Clean energy research'] },
    resources: [
      { title: 'Research Methods (edX)', url: 'https://www.edx.org' },
      { title: 'Data Analysis with Python (Coursera)', url: 'https://www.coursera.org' }
    ],
    timeline: [
      { time: '7:30 AM', activity: 'Arrive at lab/office, check experiment status', color: 'primary' },
      { time: '9:00 AM', activity: 'Conduct experiments and collect data', color: 'secondary' },
      { time: '12:00 PM', activity: 'Analyze results, discuss with team', color: 'info' },
      { time: '2:00 PM', activity: 'Write research papers or grant proposals', color: 'success' },
      { time: '4:00 PM', activity: 'Attend seminars or collaborate with peers', color: 'warning' },
      { time: '6:00 PM', activity: 'Plan next steps, document findings', color: 'error' },
    ],
    relatedSlugs: ['data-scientist', 'biomedical-engineer']
  },
  {
    slug: 'journalist',
    title: 'Journalist / News Anchor',
    category: 'Business & Management',
    image: '/images/journalist.png',
    desc: "Report news, investigate stories, and inform the public with integrity.",
    details: `Journalists gather, assess, and present news and information. They may work in print, broadcast, or digital media, and must adhere to ethical standards of accuracy and fairness.`,
    dos: ["Verify facts", "Develop sources", "Practice clear communication"],
    donts: ["Spread misinformation", "Ignore deadlines", "Compromise ethics"],
    requiredSkills: ['Communication', 'Writing', 'Research', 'Interviewing'],
    softSkills: ['Storytelling', 'Time Management', 'Networking'],
    education: {
      minimum: "Bachelor's in Journalism/Communications",
      recommended: ["Media internships"],
      alternative: ["Content creation bootcamps", "YouTube creator programs"],
      licenses: []
    },
    salaries: { entry: 350000, mid: 700000, senior: 1500000, currency: 'INR' },
    outlook: { demand: 'Medium', futureTrends: ['Digital-first news', 'Data journalism'] },
    resources: [
      { title: 'Journalism Ethics (Khan Academy)', url: 'https://www.khanacademy.org' },
      { title: 'Writing for the Web (Coursera)', url: 'https://www.coursera.org' }
    ],
    timeline: [
      { time: '6:00 AM', activity: 'Scan news wires, check emails for leads', color: 'primary' },
      { time: '8:00 AM', activity: 'Editorial meeting, plan coverage', color: 'secondary' },
      { time: '10:00 AM', activity: 'Conduct interviews, gather information', color: 'info' },
      { time: '1:00 PM', activity: 'Write articles or prepare news scripts', color: 'success' },
      { time: '3:00 PM', activity: 'Edit content, fact-check, coordinate with team', color: 'warning' },
      { time: '6:00 PM', activity: 'Go live on air or publish stories', color: 'error' },
    ],
    relatedSlugs: ['content-strategist', 'pr-specialist']
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Engineering & Tech',
    image: '/images/frontend.png',
    desc: 'Build interactive user interfaces for web applications.',
    details: 'Works with HTML, CSS, JavaScript/TypeScript and modern frameworks to deliver responsive, accessible UIs.',
    requiredSkills: ['Programming', 'JavaScript', 'HTML', 'CSS', 'React'],
    softSkills: ['Communication', 'Problem Solving'],
    education: { minimum: 'Bachelor (preferred)', recommended: ['B.Tech/CS', 'Frontend bootcamp'], alternative: ['Self-taught + portfolio'], licenses: [] },
    salaries: { entry: 600000, mid: 1200000, senior: 2500000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['Web performance', 'Accessibility', 'AI tooling'] },
    resources: [
      { title: 'Frontend Developer Roadmap', url: 'https://roadmap.sh/frontend' },
      { title: 'React Docs', url: 'https://react.dev' }
    ],
    relatedSlugs: ['backend-developer', 'ui-ux-designer']
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    category: 'Engineering & Tech',
    image: '/images/backend.png',
    desc: 'Design and build server-side logic, APIs, and databases.',
    details: 'Focuses on scalability, security, and reliability of services.',
    requiredSkills: ['Programming', 'Databases', 'APIs', 'Node.js'],
    softSkills: ['Problem Solving', 'Collaboration'],
    education: { minimum: 'Bachelor (preferred)', recommended: ['B.Tech/CS'], alternative: ['Bootcamps'], licenses: [] },
    salaries: { entry: 700000, mid: 1400000, senior: 2800000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['Cloud native', 'Serverless', 'Security'] },
    resources: [
      { title: 'Node.js Docs', url: 'https://nodejs.org' },
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
    ],
    relatedSlugs: ['frontend-developer', 'devops-engineer']
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Engineering & Tech',
    image: '/images/datascience.png',
    desc: 'Extract insights from data using statistics and machine learning.',
    details: 'Works across data cleaning, modeling, and communication.',
    requiredSkills: ['Programming', 'Data Analysis', 'Statistics', 'Machine Learning'],
    softSkills: ['Communication', 'Business Acumen'],
    education: { minimum: 'Bachelor', recommended: ['Masters in DS/AI'], alternative: ['Online specializations'], licenses: [] },
    salaries: { entry: 800000, mid: 1600000, senior: 3000000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['Generative AI', 'MLOps'] },
    resources: [
      { title: 'fast.ai', url: 'https://www.fast.ai' },
      { title: 'Hands-On ML (O’Reilly)', url: 'https://www.oreilly.com' }
    ],
    relatedSlugs: ['machine-learning-engineer', 'data-analyst']
  },
  {
    slug: 'registered-nurse',
    title: 'Registered Nurse',
    category: 'Medical & Healthcare',
    image: '/images/nurse.png',
    desc: 'Provide patient care and support clinical procedures.',
    details: 'Works in hospitals, clinics, and community settings.',
    requiredSkills: ['Biology', 'Communication', 'Empathy', 'Record Keeping'],
    softSkills: ['Teamwork', 'Stress Management'],
    education: { minimum: 'B.Sc Nursing', recommended: ['Specializations'], alternative: ['Diploma Nursing'], licenses: ['Nursing Council Registration'] },
    salaries: { entry: 300000, mid: 600000, senior: 1200000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['Telemedicine', 'Aging population care'] },
    resources: [
      { title: 'Nursing Basics (YouTube)', url: 'https://www.youtube.com/results?search_query=nursing+basics' }
    ],
    relatedSlugs: ['physician-assistant', 'medical-technologist']
  },
  {
    slug: 'physician-assistant',
    title: 'Physician Assistant',
    category: 'Medical & Healthcare',
    image: '/images/pa.png',
    desc: 'Support physicians in diagnosis and patient management.',
    details: 'Performs exams, orders tests, and assists in treatment.',
    requiredSkills: ['Biology', 'Communication', 'Clinical Skills'],
    softSkills: ['Empathy', 'Attention to Detail'],
    education: { minimum: 'Bachelors + PA program', recommended: ['Clinical rotations'], alternative: [], licenses: [] },
    salaries: { entry: 600000, mid: 1200000, senior: 2000000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['Primary care expansion'] },
    resources: [
      { title: 'Clinical Skills (edX)', url: 'https://www.edx.org' }
    ],
    relatedSlugs: ['registered-nurse', 'doctor']
  },
  {
    slug: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business & Management',
    image: '/images/ba.png',
    desc: 'Bridge business needs with technology solutions.',
    details: 'Elicits requirements, analyzes processes, and recommends improvements.',
    requiredSkills: ['Communication', 'Data Analysis', 'Documentation', 'SQL'],
    softSkills: ['Stakeholder Management', 'Critical Thinking'],
    education: { minimum: 'Bachelor', recommended: ['MBA (optional)', 'CBAP'], alternative: ['BA bootcamps'], licenses: [] },
    salaries: { entry: 500000, mid: 1000000, senior: 1800000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['Data-driven decision making', 'Automation'] },
    resources: [
      { title: 'BA Body of Knowledge', url: 'https://www.iiba.org' },
      { title: 'SQL for Data Analysis', url: 'https://mode.com/sql-tutorial' }
    ],
    relatedSlugs: ['product-manager', 'project-manager']
  },
  {
    slug: 'product-manager',
    title: 'Product Manager',
    category: 'Business & Management',
    image: '/images/pm.png',
    desc: 'Own product strategy and execution across teams.',
    details: 'Defines roadmaps, prioritizes features, and aligns stakeholders.',
    requiredSkills: ['Communication', 'Prioritization', 'Business Acumen', 'User Research'],
    softSkills: ['Leadership', 'Negotiation'],
    education: { minimum: 'Bachelor', recommended: ['MBA (optional)'], alternative: ['PM bootcamps'], licenses: [] },
    salaries: { entry: 900000, mid: 1800000, senior: 3500000, currency: 'INR' },
    outlook: { demand: 'High', futureTrends: ['AI-first products', 'Outcome-driven PM'] },
    resources: [
      { title: 'Product School', url: 'https://www.productschool.com' },
      { title: 'Lean Product Playbook', url: 'https://leanproductplaybook.com' }
    ],
    relatedSlugs: ['business-analyst', 'project-manager']
  }
];
