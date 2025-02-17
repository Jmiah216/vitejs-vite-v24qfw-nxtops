export const assessmentQuestions = [
  {
    id: 1,
    text: "How many years did you serve in the military?",
    type: "select",
    category: "background",
    options: [
      "1-3 years",
      "4-6 years", 
      "7-10 years",
      "11-15 years",
      "16-20 years",
      "20+ years"
    ]
  },
  {
    id: 2,
    text: "What was your highest rank achieved?",
    type: "select",
    category: "background",
    options: [
      "E1-E4 (Junior Enlisted)",
      "E5-E6 (NCO)",
      "E7-E9 (Senior NCO)",
      "O1-O3 (Junior Officer)",
      "O4-O6 (Field Grade Officer)",
      "O7+ (General/Flag Officer)",
      "W1-W5 (Warrant Officer)"
    ]
  },
  {
    id: 3,
    text: "Select your primary military roles",
    type: "multiSelectLimited",
    category: "experience",
    maxSelections: 3,
    options: [
      "Infantry/Combat Arms",
      "Intelligence/Security",
      "Logistics/Supply Chain",
      "Communications/IT",
      "Medical/Healthcare",
      "Engineering",
      "Aviation/Aircraft Maintenance",
      "Vehicle/Equipment Maintenance",
      "Administration/Personnel",
      "Security Forces/Military Police",
      "Special Operations",
      "Training/Instruction",
      "Software/Microsoft Suite Training"
    ]
  },
  {
    id: 4,
    text: "Are you eligible for a security clearance?",
    type: "select",
    category: "clearance",
    options: [
      "Yes",
      "No",
      "Unsure"
    ]
  },
  {
    id: 5,
    text: "What level of security clearance do you currently hold?",
    type: "select",
    category: "clearance",
    options: [
      "None",
      "Public Trust",
      "Secret",
      "Top Secret (TS)",
      "Top Secret/SCI (TS/SCI)"
    ],
    customOption: {
      label: "Other",
      placeholder: "Please specify"
    }
  },
  {
    id: 6,
    text: "What type of work environments interest you most?",
    type: "multiSelectLimited",
    category: "preferences",
    maxSelections: 3,
    description: "Select up to 3 environments where you'd feel most comfortable working",
    options: [
      "Office/Corporate Setting",
      "Remote/Work from Home",
      "Field Operations",
      "Technical/Laboratory",
      "Customer-Facing",
      "Government/Public Sector",
      "Training/Education"
    ]
  },
  {
    id: 7,
    text: "What are your salary expectations?",
    type: "select",
    category: "preferences",
    options: [
      "Under $40,000",
      "$40,000 - $60,000",
      "$60,000 - $80,000",
      "$80,000 - $100,000",
      "$100,000 - $120,000",
      "$120,000+"
    ]
  },
  {
    id: 8,
    text: "Which IT career paths align with your interests and experience?",
    type: "multiSelectLimited",
    category: "interests",
    maxSelections: 3,
    description: "Select up to 3 areas that match your skills and career goals",
    options: [
      "Information Security/Cybersecurity",
      "Network Engineering",
      "Systems Administration",
      "Cloud Computing",
      "Software Development",
      "IT Project Management",
      "Database Administration",
      "DevOps Engineering",
      "IT Training/Education",
      "Technical Support/Help Desk"
    ]
  }
];