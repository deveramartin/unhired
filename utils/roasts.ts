import { RoastRecord } from '../types/types';

export const LOADING_PHRASES = [
  "Laughing at your serif font choices...",
  "Formatting your 'Hobbies' section directly into our digital recycle bin...",
  "Running your credentials through our proprietary Disappointment Index™...",
  "Detecting AI-generated filler words ('Delved', 'Spearheaded', 'Testament to')...",
  "Measuring the alarming ratio of 'Synergy' to actual technical skills...",
  "Comparing your GitHub commit history to actual lawn grass...",
  "Sighing audibly at the 'Intermediate French' you claimed from 3 weeks of Duolingo...",
  "Calculating the exact milliseconds before our HR team would fall asleep...",
  "Pretend-reading your passionately redundant cover letter...",
  "Converting your 'Team Player' badge into a standard 'Lacks Originality' flag...",
  "Analyzing your tragic attempt at a two-column resume template...",
  "Consulting our corporate Magic 8-Ball... (It says: 'Apply for retail instead')...",
  "Checking if your GPA is low enough to qualify as a comedy act...",
  "Checking if you spelled 'Developer' wrong... Oh, you did.",
  "Simulating automated ghosting protocols after 14 days of silence..."
];

export const MOCK_ROASTS: Record<string, Omit<RoastRecord, 'id' | 'date' | 'fileName' | 'fileSize'>> = {
  swe: {
    parsedName: "Alex Mercer",
    role: "Full-Stack Software Engineer (Jack of All, Master of None)",
    rating: 2.1,
    buzzwords: ["Next-generation", "Paradigm-shifting", "Agile Ninja", "Synergistic APIs", "Cloud Native Architect"],
    grammarSins: [
      "Capitalized 'TypeScript' as 'typescrypt' three times.",
      "Used 'utilize' where 'use' is legally, morally, and syntactically superior.",
      "Referred to writing basic HTML/CSS as 'Engineering Web Solutions'."
    ],
    roastText: `### 🚨 THE DIAGNOSIS: OVER-ENGINEERED HOMELESSNESS
Congratulations, Alex. You’ve successfully written a resume that reads like a random word generator dropped in a blender with a mid-tier coding bootcamp syllabus.

#### 1. The Skill Salad 🥗
You listed **43 different programming languages and frameworks**. Who are you trying to fool? You list *Rust, Haskell, Cobol, React, Docker, and Kubernetes*. We both know the only thing you actually built in Rust was a single "Hello World" that took you 6 hours to compile. 

#### 2. The Project Padding 🛠️
* **"Spearheaded cloud migration of highly concurrent microservices."** 
  * *Translation:* You moved a single node app from a free Heroku tier to a free Render tier because the free hosting expired.
* **"Engineered an automated decentralized blockchain ledger algorithm."** 
  * *Translation:* You copied a Solitiy tutorial off Medium, lost $45 in gas fees, and deleted the folder.

#### 3. Tragic Omissions 📉
Where is the actual impact? Under every single experience, you wrote "Maintained codebase stability." Alex, this is the job equivalent of saying *"I drove to work and didn't crash the car."* That is the baseline expectation, not a promotion-worthy medal of honor.

#### 4. Prescription 💊
* Delete the "Familiar with" section immediately. Knowing how to spell "Docker" doesn't make you a DevOps specialist.
* Go outside and touch some actual grass. Green squares on GitHub do not photosynthesize.
`
  },
  pm: {
    parsedName: "Sarah Jenkins",
    role: "Lead Technical Product Manager (Professional Meeting Scheduler)",
    rating: 1.5,
    buzzwords: ["Leverage", "Value-Add", "North Star Metric", "Cross-Functional Synergy", "Agile Catalyst", "Double-Diamond Process"],
    grammarSins: [
      "Overused 'impactful' until the word lost all lexical meaning.",
      "Used 'circular alignment meetings' as a positive bullet point.",
      "Injected 14 buzzwords in a single 12-word subheader."
    ],
    roastText: `### 🚨 THE DIAGNOSIS: METAPHYSICAL SYNERGY EXPERT
Sarah, this resume is a work of non-fiction art. It contains thousands of syllables and yet, somehow, exactly **zero percent** of them describe actual work. You have mastered the art of talking about doing things without ever doing them.

#### 1. The Meeting Masterclass 📅
* **"Coordinated cross-functional alignments to foster organic roadmap synergy."**
  * *Translation:* You scheduled a 9:00 AM daily standup that everyone hated, where developers spent 15 minutes explaining why your feature specs made no physical sense.
* **"Championed the double-diamond user flow discovery matrix."**
  * *Translation:* You drew 4 squares on a Miro board and took credit for the UX designer's work.

#### 2. Metric Massaging 📊
* **"Optimized developer velocity by 24%."**
  * *Translation:* You bought JIRA tickets and kept changing the story points from 8s to 3s when developers told you they were going on vacation.
* **"Increased product visibility across executive stakeholder landscapes."**
  * *Translation:* You sent a weekly email newsletter with bullet points that no one opened except your direct manager (by accident).

#### 3. Absolute Red Flags 🚩
* You listed "Excellent listener". Sarah, this isn't a dating profile. If the best quality you can put on a tech resume is that you don't talk over people, we are in deep, systemic trouble.

#### 4. Prescription 💊
* Stop taking credit for the engineering team's database optimization. Everyone knows you didn't touch SQL once.
* Replace the word "Synergetic Collaboration" with "Telling people what to do in Slack."
`
  },
  junior: {
    parsedName: "Kyle Bennett",
    role: "Self-Taught React Developer (ChatGPT Prompt Engineer)",
    rating: 3.2,
    buzzwords: ["Self-starter", "Rapid Learner", "AI Co-pilot Expert", "Metaverse Ready", "Full Stack Prodigy"],
    grammarSins: [
      "Referred to a 3-month course as 'Years of Academic Rigor'.",
      "Spelled 'JavaScript' with a lowercase 's' throughout the document.",
      "Used a standard colorful bar chart to indicate skill levels (e.g., 'React: 90%'). What does 90% React even mean, Kyle?"
    ],
    roastText: `### 🚨 THE DIAGNOSIS: CODING BOOTCAMP CASUALTY
Ah, Kyle. Another brave soldier from the BootCamp Class of '25. You spent 12 weeks learning how to copy-paste template code, and now you want $140k/year to 'disrupt' modern tech. Let's look at the damage.

#### 1. The Skill "Bar Charts" 📊
You have a progress bar showing **React: 95%** and **SQL: 80%**. 
* Kyle, if you are 95% of the way to mastering React, why did your portfolio site break when I resized the browser window?
* Is Dan Abramov sitting at 96%? Please calibrate your self-confidence to match your actual commit history.

#### 2. The Copy-Paste Portfolios 📁
* **"Built a custom, hyper-scalable Weather Dashboard API app."**
  * *Heavily copied tutorial alert!* We have seen 4,812 weather dashboards this week alone. Your app does a client-side fetch to OpenWeatherMap on line 24. A stiff breeze would knock down your 'hyper-scalable architecture'.
* **"Created an offline-first Todo List app on React Native."**
  * *Translation:* A local-storage notebook that clears itself when the user opens incognito mode.

#### 3. AI Dependancy 🤖
We can feel the cursor hover over ChatGPT through the screen. Phrases like *"leveraging cutting-edge modern solutions"* practically smell of OpenAI's standard template. If ChatGPT went down for 4 hours, your career would require a complete industrial reboot.

#### 4. Prescription 💊
* Delete the skill bar charts. They are highly embarrassing.
* Build something that isn't a weather dashboard, a todo list, or a clones of Netflix. Try coding something without watching a YouTube tutorial side-by-side.
`
  },
  designer: {
    parsedName: "Maya Lin",
    role: "UI/UX Designer (Figma Components Hoarder)",
    rating: 2.8,
    buzzwords: ["Human-Centric Design", "Design Systems Catalyst", "Visual Storyteller", "Asynchronous Typography"],
    grammarSins: [
      "No grammar sins, but the line height of your description is so tiny it violates several international readability treaties.",
      "Used '#f3f4f6' on white background for the resume text, completely ignoring anyone without 20/20 cybernetic vision."
    ],
    roastText: `### 🚨 THE DIAGNOSIS: COLOR PALETTE DEPENDENT
Maya, your resume is visually gorgeous. It is a masterpiece of minimalist auto-layout. But once we copy-paste the text out of your custom SVG export, we realize there's absolutely no substance here.

#### 1. Aesthetic Supremacy, Usability Failure 🎨
Your color contrast is **1.2:1**. You claim to be an "Accessibility Advocate" but your document can only be read by owls and night-vision drones. If a recruiter has to turn up their screen brightness to 100% just to see your phone number, you have failed the most basic UX test of your career.

#### 2. Figma is Not a Personality 🖥️
* **"Engineered comprehensive micro-interaction libraries in design space."**
  * *Translation:* You made 400 variations of a button hover state that the developers wrote as \`button:hover { opacity: 0.8 }\` in 4 seconds.
* **"Orchestrated cross-canvas interactive flowboards."**
  * *Translation:* You didn't group your layers and the Figma canvas looks like a digital explosion in an icon factory.

#### 3. Portfolio Pretension 🕶️
Your case studies are 12,000 words long. They detail the "emotional journey" of a user changing their newsletter subscription setting. Maya, it is a checkbox. A user does not have a "heroic narrative arc" when checking a box.

#### 4. Prescription 💊
* Increase your text contrast before the Web Accessibility Initiative revokes your Figma license.
* Stop making developers cry by asking for 12-dimensional bezier path morphing animations for a hamburger menu.
`
  },
  generic: {
    parsedName: "Jordan Smith",
    role: "Unspecified Professional (Corporate Survivor)",
    rating: 1.8,
    buzzwords: ["Dynamic Professional", "Results-Oriented", "Self-Motivated", "Proven Track Record", "Goal-Driven Analyst"],
    grammarSins: [
      "Used the phrase 'proven track record' 4 times without proving a single track.",
      "List of skills includes 'Microsoft Word' and 'Internet Browsing' in the year 2026."
    ],
    roastText: `### 🚨 THE DIAGNOSIS: REVENUE-NEUTRAL CORPORATE CHAMELEON
Hello Jordan. Your resume is the equivalent of unseasoned mashed potatoes. It is completely inoffensive, utterly boring, and provides zero nutritional value to any prospective hiring manager.

#### 1. The Buzzword Emergency 🚨
You described yourself as an **"Innovative, results-oriented, highly collaborative, dynamic team player."** 
* Jordan, this translates directly to: *"I am a human who occupies physical space in an office and replies to emails when prompted."*
* Every single descriptive adjective you used is a synonym for "employed". Tell us what you actually *did*, not how many HR motivational posters you memorized.

#### 2. The Unverified Achievements 📉
* **"Significantly enhanced workflow execution strategies."**
  * *What does this mean?* Did you move a paper calendar onto Google Calendar? Did you send fewer emails? 
* **"Handled confidential client portfolios with extreme accuracy."**
  * *Translation:* You typed Excel spreadsheets and didn't leave the folder open in the cafeteria.

#### 3. Tragic Tech Skills 💻
Listing **"Microsoft Office Suite"** and **"Zoom"** as core skills is not the flex you think it is. That's like listing "fluent in breathing" or "capable of using a door handle." If it comes standard-issue on a computer bought at Best Buy, it doesn't belong in your special skills column.

#### 4. Prescription 💊
* Delete every single buzzword. If it can be applied to a golden retriever, delete it.
* Back up your claims with actual numbers (e.g., "Saved $X", "automated Y hours of work"). Otherwise, we assume you spent your days playing Minesweeper and looking busy.
`
  }
};

// Generates a mock roast using fileName and an optional role selection
export function generateRoastFromUpload(fileName: string, selectedRole?: string): RoastRecord {
  // Try to match file name keywords to select roast
  let foundKey = 'generic';
  
  if (selectedRole && MOCK_ROASTS[selectedRole]) {
    foundKey = selectedRole;
  } else {
    const lowerName = fileName.toLowerCase();
    if (lowerName.includes('engineer') || lowerName.includes('dev') || lowerName.includes('software') || lowerName.includes('tech') || lowerName.includes('frontend') || lowerName.includes('backend')) {
      foundKey = 'swe';
    } else if (lowerName.includes('product') || lowerName.includes('pm') || lowerName.includes('manager') || lowerName.includes('lead')) {
      foundKey = 'pm';
    } else if (lowerName.includes('junior') || lowerName.includes('student') || lowerName.includes('intern') || lowerName.includes('resume_v1')) {
      foundKey = 'junior';
    } else if (lowerName.includes('designer') || lowerName.includes('ux') || lowerName.includes('ui') || lowerName.includes('creative') || lowerName.includes('artist')) {
      foundKey = 'designer';
    }
  }

  const baseRoast = MOCK_ROASTS[foundKey] || MOCK_ROASTS.generic;

  // Extrapolate name or parse it elegantly
  let cleanedName = baseRoast.parsedName;
  const dotIndex = fileName.indexOf('.');
  const baseName = dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;
  const cleanBase = baseName.replace(/[-_]/g, ' ');
  
  // capitalize potential human name
  if (cleanBase.length > 2 && !cleanBase.toLowerCase().includes('resume') && !cleanBase.toLowerCase().includes('cv')) {
    cleanedName = cleanBase.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Create human-readable date
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate random file size (e.g. 154 KB)
  const sizeNum = Math.floor(Math.random() * 200) + 40;
  const fileSize = `${sizeNum} KB`;

  return {
    id: `roast_${Math.random().toString(36).substr(2, 9)}`,
    date: dateStr,
    fileName,
    fileSize,
    parsedName: cleanedName,
    role: baseRoast.role,
    rating: baseRoast.rating,
    buzzwords: baseRoast.buzzwords,
    grammarSins: baseRoast.grammarSins,
    roastText: baseRoast.roastText.replace(baseRoast.parsedName, cleanedName)
  };
}

export const INITIAL_HISTORY: RoastRecord[] = [
  {
    id: "roast_pre1",
    date: "Jun 3, 2026, 11:24 AM",
    fileName: "Chad_DevOps_Expert_v3_final.pdf",
    fileSize: "148 KB",
    parsedName: "Chadwick Vance",
    role: "DevOps Engineer (YAML Synthesizer)",
    rating: 1.2,
    buzzwords: ["Kubernetes Clusterizer", "Zero-Downtime Pipeline", "Hyper-scalable", "High-Availability Catalyst"],
    grammarSins: [
      "Capitalized 'yaml' as 'YAML!' with an exclamation mark twice.",
      "Described configuring a simple GitHub Actions cronjob as 'Orchestrating Autonomous Time-Triggered Operations'."
    ],
    roastText: `### 🚨 THE DIAGNOSIS: YAML-DEPENDENT INFRASTRUCTURE LARPER
Chadwick, you’ve managed to compile 3 pages of automated arrogance. You claim to hold the keys to high-availability nirvana, but we all know your single biggest fear is a slightly misaligned two-space indent in a docker-compose file.

#### 1. The Kubernetes Cult 🐳
You spent **half of your resume experience** explaining how you containerized simple web apps. Chadwick, you deployed a static HTML file to Docker inside a Kubernetes pod on AWS with 14 microservice layers. That isn't engineering; that's a digital Rube Goldberg machine. Your hosting bill is probably $400 a month to serve a personal blog with 12 organic visitors.

#### 2. The DevOps Buzzword Soup 🍲
* **"Implemented auto-scaling elastic load redirection loops."**
  * *Translation:* You turned on AWS auto-scaling defaults because your server crashed when two recruiters clicked on your link at the same time.
* **"Championed paradigm-shifting CI/CD pipeline structures."**
  * *Translation:* You set up a simple GitHub Actions runner that fails 80% of the time because your npm packages are outdated.

#### 3. Tragic Skills ⚠️
You listed "Mastery of Ansible, Terraform, Puppet, Chef, SaltStack, and Bash." Why are you collecting configuration managers like Pokémon cards? You don't build software; you write configuration scripts for systems you barely understand.

#### 4. Recommendation 🩹
* Learn a real programming language instead of spending your life writing YAML config loops.
* Admit that your containerized architecture is an over-complicated disaster designed to explain why you didn't finish coding the actual product.
`
  },
  {
    id: "roast_pre2",
    date: "May 28, 2026, 04:15 PM",
    fileName: "Emily_Growth_Hack_CV.pdf",
    fileSize: "89 KB",
    parsedName: "Emily Parker",
    role: "Senior Growth Marketing Associate (Buzzword Accelerator)",
    rating: 2.5,
    buzzwords: ["LTV/CAC Optimization", "Funnel Penetration", "Viral Coefficient Catalyst", "Omnichannel Growth Hacking"],
    grammarSins: [
      "Used 'leverage' and 'penetrate' in the same sentence describing a Facebook Ads campaign.",
      "Listed 'Advanced Instagramming' as a strategic marketing skill."
    ],
    roastText: `### 🚨 THE DIAGNOSIS: AD CLICK SPENDER
Emily, your CV reads like a corporate spam email that bypassed our filters. You call yourself a 'growth hacker', but you are actually just an expensive conduit for donating Google and Facebook Ad credits to Larry Page and Mark Zuckerberg.

#### 1. The Hack That Wasn't 💻
* **"Engineered an omni-channel acquisition funnel rendering massive organic traction."**
  * *Translation:* You posted 4 Tiktoks with trending audio, got 32 views, and spent $5,000 on Facebook Lookalike audiences to acquire 14 newsletter subscribers.
* **"Optimized viral product coefficients by 180%."**
  * *Translation:* You added a "Click here to share with friends!" pop-up that annoyed 100% of your current users until they clicked unsubscribe.

#### 2. Metaphorical Overkill 🤯
You described marketing as "Guerrilla-style psychological audience engineering." Emily, you are setting up retargeting ads for a company that sells leather wallets. You are not a combat operative; you are an online billboard planner.

#### 3. Hard Truths 💔
If your organic growth strategies were actually "viral", why did the company's marketing budget increase by 45% under your tenure? That's not growth hacking; that's just standard, expensive advertisement buying.

#### 4. Prescription 💊
* Stop calling basic advertising "growth hacking." It sounds like you are trying to break into our database using copy writing.
* Show actual organic, cost-free success, if you have any. If not, retitle your resume to "Digital Ad Spender with Laptop privileges."
`
  }
];
