

export const dnsoData = {
  "dnso_database": {
    "metadata": {
      "version": "2.0",
      "created_date": "2025-07-09",
      "total_dnsos": 50,
      "sectors_covered": ["Energy", "Chemical/Pharmaceutical", "Government/Defense", "Infrastructure", "Technology", "Manufacturing"],
      "target_markets": ["Healthcare", "Manufacturing", "Government", "Critical Infrastructure", "Financial Services"]
    },
    "dnsos": [   
    {
      "id": "DNSO-046",
      "title": "Advanced Persistent Threat Detection",
      "sector": "Government/Defense",
      "subsector": "Intelligence Agencies",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 1500000,
      "roi_max": 3000000,
      "risk_prevention": "Prevents nation-state APT attacks that can compromise classified information and national security",
      "expertise_tags": ["APT Detection", "Threat Hunting", "SIEM Integration", "Nation-State Threats"],
      "competitive_advantage": "Government security clearance and experience with classified systems requiring highest security levels",
      "urgency_factor": "Foreign intelligence services increasingly targeting government agencies through sophisticated APT campaigns",
      "implementation_time": "12-18 months",
      "target_client_size": "Federal Intelligence Agencies",
      "geography": "United States",
      "description": "We propose a comprehensive APT detection and response engagement designed to identify advanced persistent threats targeting government systems. This assessment will implement behavioral analytics, threat hunting capabilities, and advanced detection techniques to identify nation-state level adversaries.",
      "why_matters": [
        "National Security Critical: APT attacks can compromise classified information affecting national security",
        "Sophisticated Adversaries: Nation-state threats require advanced detection capabilities beyond traditional security tools",
        "Persistent Threat Landscape: APT groups maintain long-term access to government systems for intelligence gathering"
      ],
      "cost_components": [
        { "component": "APT Detection Platform Implementation", "min": 500000, "max": 1000000 },
        { "component": "Threat Hunting Program Development", "min": 400000, "max": 800000 },
        { "component": "Advanced Analytics & AI Integration", "min": 400000, "max": 800000 },
        { "component": "Intelligence Integration & Reporting", "min": 200000, "max": 400000 }
      ],
      "next_steps": [
        "Assess current threat detection capabilities and gaps",
        "Implement advanced behavioral analytics platform",
        "Develop threat hunting methodologies and procedures",
        "Integrate threat intelligence feeds and analysis"
      ]
    },
    {
      "id": "DNSO-047",
      "title": "Operational Technology Security Assessment",
      "sector": "Manufacturing",
      "subsector": "Industrial Operations",
      "client_type": "Manufacturing",
      "priority": "Critical",
      "roi_min": 800000,
      "roi_max": 1600000,
      "risk_prevention": "Prevents OT attacks that can shut down manufacturing operations and cause safety incidents",
      "expertise_tags": ["OT Security", "Industrial Networks", "Safety Systems", "Process Control"],
      "competitive_advantage": "Deep understanding of industrial processes and operational technology from manufacturing facility construction",
      "urgency_factor": "OT environments increasingly connected to IT networks creating new attack vectors for manufacturing disruption",
      "implementation_time": "6-12 months",
      "target_client_size": "Manufacturing Companies",
      "geography": "Global",
      "description": "We propose a specialized operational technology security assessment designed to evaluate security controls in manufacturing environments, industrial control systems, and safety-critical operations. This engagement will identify OT vulnerabilities and enhance manufacturing security posture.",
      "why_matters": [
        "Manufacturing Continuity: OT attacks can halt production lines causing millions in operational losses",
        "Safety System Protection: Compromised safety systems can result in industrial accidents and worker injuries",
        "IT-OT Convergence: Increasing connectivity between IT and OT systems creates new cybersecurity risks"
      ],
      "cost_components": [
        { "component": "OT Network Security Assessment", "min": 200000, "max": 400000 },
        { "component": "Industrial Control System Testing", "min": 300000, "max": 600000 },
        { "component": "Safety System Security Review", "min": 200000, "max": 400000 },
        { "component": "OT Security Framework Development", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Map OT network architecture and connected systems",
        "Conduct security assessment of industrial control systems",
        "Evaluate safety system security controls",
        "Develop OT security monitoring and incident response"
      ]
    },
    {
      "id": "DNSO-048",
      "title": "Mobile Application Security Testing",
      "sector": "Technology",
      "subsector": "Mobile Applications",
      "client_type": "Technology",
      "priority": "High",
      "roi_min": 400000,
      "roi_max": 800000,
      "risk_prevention": "Prevents mobile app vulnerabilities that can expose customer data and business systems",
      "expertise_tags": ["Mobile Security", "App Security Testing", "iOS Security", "Android Security"],
      "competitive_advantage": "Mobile application development expertise combined with security testing capabilities",
      "urgency_factor": "Mobile app vulnerabilities creating significant data breach risks as mobile adoption accelerates",
      "implementation_time": "3-6 months",
      "target_client_size": "Mobile App Developers",
      "geography": "Global",
      "description": "We propose comprehensive mobile application security testing designed to identify vulnerabilities in iOS and Android applications. This assessment will evaluate app security controls, data protection, and integration security across mobile platforms.",
      "why_matters": [
        "Data Protection Critical: Mobile apps handle sensitive customer data requiring robust security controls",
        "Platform-Specific Risks: iOS and Android platforms have unique security considerations and vulnerabilities",
        "Business System Integration: Mobile apps increasingly integrate with backend systems creating new attack vectors"
      ],
      "cost_components": [
        { "component": "Mobile App Security Testing", "min": 100000, "max": 200000 },
        { "component": "Platform Security Analysis", "min": 150000, "max": 300000 },
        { "component": "Backend Integration Security", "min": 100000, "max": 200000 },
        { "component": "Mobile Security Framework", "min": 50000, "max": 100000 }
      ],
      "next_steps": [
        "Inventory mobile applications and platforms",
        "Conduct automated and manual security testing",
        "Evaluate mobile app data protection controls",
        "Assess backend system integration security"
      ]
    },
    {
      "id": "DNSO-049",
      "title": "Insider Threat Detection Program",
      "sector": "Financial Services",
      "subsector": "Investment Banking",
      "client_type": "Financial Services",
      "priority": "Critical",
      "roi_min": 1000000,
      "roi_max": 2000000,
      "risk_prevention": "Prevents insider threats that can result in financial fraud and regulatory violations",
      "expertise_tags": ["Insider Threat", "User Behavior Analytics", "Financial Fraud", "Compliance Monitoring"],
      "competitive_advantage": "Financial services expertise combined with behavioral analytics and fraud detection capabilities",
      "urgency_factor": "Insider threats account for 60% of security incidents in financial services with devastating impact",
      "implementation_time": "8-12 months",
      "target_client_size": "Investment Banks",
      "geography": "Global",
      "description": "We propose a comprehensive insider threat detection program designed to identify malicious or negligent insider activities in financial services. This engagement will implement behavioral analytics, user monitoring, and fraud detection to protect against insider threats.",
      "why_matters": [
        "Financial Fraud Prevention: Insider threats can result in massive financial losses and market manipulation",
        "Regulatory Compliance: Financial regulations require monitoring and detection of insider trading and fraud",
        "Reputation Protection: Insider threat incidents can destroy financial institution reputation and client trust"
      ],
      "cost_components": [
        { "component": "User Behavior Analytics Platform", "min": 300000, "max": 600000 },
        { "component": "Insider Threat Detection Implementation", "min": 400000, "max": 800000 },
        { "component": "Financial Fraud Monitoring", "min": 200000, "max": 400000 },
        { "component": "Compliance Reporting & Analytics", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Assess current insider threat detection capabilities",
        "Implement user behavior analytics platform",
        "Develop insider threat detection policies and procedures",
        "Integrate compliance monitoring and reporting"
      ]
    },
    {
      "id": "DNSO-050",
      "title": "Quantum-Safe Cryptography Assessment",
      "sector": "Technology",
      "subsector": "Cryptography",
      "client_type": "Technology",
      "priority": "High",
      "roi_min": 700000,
      "roi_max": 1400000,
      "risk_prevention": "Prepares organizations for quantum computing threats that will break current encryption methods",
      "expertise_tags": ["Quantum Cryptography", "Post-Quantum Security", "Encryption Assessment", "Cryptographic Modernization"],
      "competitive_advantage": "Advanced cryptographic expertise and understanding of quantum computing implications for security",
      "urgency_factor": "Quantum computing advances threaten current encryption standards requiring proactive cryptographic migration",
      "implementation_time": "6-12 months",
      "target_client_size": "Technology Companies",
      "geography": "Global",
      "description": "We propose a quantum-safe cryptography assessment designed to evaluate current encryption implementations and develop migration strategies for post-quantum cryptographic standards. This engagement will prepare organizations for the quantum computing era.",
      "why_matters": [
        "Quantum Threat Preparation: Quantum computers will break current encryption methods requiring new cryptographic approaches",
        "Long-Term Data Protection: Sensitive data encrypted today may be vulnerable to future quantum attacks",
        "Regulatory Compliance: Government agencies mandating quantum-safe cryptography adoption timelines"
      ],
      "cost_components": [
        { "component": "Cryptographic Inventory & Assessment", "min": 200000, "max": 400000 },
        { "component": "Quantum Risk Analysis", "min": 200000, "max": 400000 },
        { "component": "Post-Quantum Migration Planning", "min": 200000, "max": 400000 },
        { "component": "Quantum-Safe Implementation", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Inventory all cryptographic implementations and systems",
        "Assess quantum vulnerability of current encryption",
        "Develop post-quantum cryptography migration roadmap",
        "Implement pilot quantum-safe cryptographic controls"
      ]
    },
    {
      "id": "DNSO-051",
      "title": "DevSecOps Security Integration",
      "sector": "Technology",
      "subsector": "Software Development",
      "client_type": "Technology",
      "priority": "High",
      "roi_min": 500000,
      "roi_max": 1000000,
      "risk_prevention": "Prevents security vulnerabilities in software development lifecycle and CI/CD pipelines",
      "expertise_tags": ["DevSecOps", "CI/CD Security", "Application Security", "Secure Development"],
      "competitive_advantage": "Software development expertise combined with security integration and automation capabilities",
      "urgency_factor": "Rapid software development cycles creating security gaps that attackers exploit in production systems",
      "implementation_time": "4-8 months",
      "target_client_size": "Software Development Companies",
      "geography": "Global",
      "description": "We propose a comprehensive DevSecOps security integration engagement designed to embed security controls throughout the software development lifecycle. This assessment will secure CI/CD pipelines, implement automated security testing, and establish secure development practices.",
      "why_matters": [
        "Shift-Left Security: Early security integration prevents costly vulnerabilities in production systems",
        "Development Speed: Automated security testing enables rapid development without compromising security",
        "Compliance Requirements: Software development must meet security standards and regulatory requirements"
      ],
      "cost_components": [
        { "component": "DevSecOps Assessment & Planning", "min": 125000, "max": 250000 },
        { "component": "CI/CD Security Integration", "min": 200000, "max": 400000 },
        { "component": "Automated Security Testing", "min": 125000, "max": 250000 },
        { "component": "Secure Development Training", "min": 50000, "max": 100000 }
      ],
      "next_steps": [
        "Assess current development and deployment processes",
        "Integrate security tools into CI/CD pipelines",
        "Implement automated security testing and scanning",
        "Train development teams on secure coding practices"
      ]
    },
    {
      "id": "DNSO-052",
      "title": "Critical Infrastructure Resilience Testing",
      "sector": "Energy",
      "subsector": "Power Grid",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 1200000,
      "roi_max": 2400000,
      "risk_prevention": "Prevents cascading failures in critical infrastructure that can affect national security and economy",
      "expertise_tags": ["Infrastructure Resilience", "Grid Security", "Disaster Recovery", "Business Continuity"],
      "competitive_advantage": "Critical infrastructure construction experience combined with resilience testing and disaster recovery expertise",
      "urgency_factor": "Climate change and cyber threats increasing risks to critical infrastructure requiring enhanced resilience",
      "implementation_time": "8-15 months",
      "target_client_size": "Critical Infrastructure Operators",
      "geography": "National",
      "description": "We propose comprehensive critical infrastructure resilience testing designed to evaluate recovery capabilities, identify single points of failure, and enhance disaster recovery procedures. This engagement will strengthen infrastructure resilience against cyber and physical threats.",
      "why_matters": [
        "National Security Impact: Critical infrastructure failures can cascade affecting national security and economic stability",
        "Disaster Recovery: Natural disasters and cyber attacks require robust recovery capabilities to restore operations",
        "Regulatory Requirements: Critical infrastructure regulations mandate resilience testing and disaster recovery planning"
      ],
      "cost_components": [
        { "component": "Infrastructure Resilience Assessment", "min": 300000, "max": 600000 },
        { "component": "Disaster Recovery Testing", "min": 400000, "max": 800000 },
        { "component": "Business Continuity Planning", "min": 300000, "max": 600000 },
        { "component": "Recovery Capability Enhancement", "min": 200000, "max": 400000 }
      ],
      "next_steps": [
        "Assess current infrastructure resilience capabilities",
        "Conduct disaster recovery testing and tabletop exercises",
        "Identify single points of failure and vulnerabilities",
        "Develop enhanced business continuity and recovery plans"
      ]
    },
    {
      "id": "DNSO-053",
      "title": "Blockchain Security Assessment",
      "sector": "Financial Services",
      "subsector": "Fintech",
      "client_type": "Financial Services",
      "priority": "High",
      "roi_min": 600000,
      "roi_max": 1200000,
      "risk_prevention": "Prevents blockchain vulnerabilities that can result in financial losses and smart contract exploits",
      "expertise_tags": ["Blockchain Security", "Smart Contract Auditing", "DeFi Security", "Consensus Mechanisms"],
      "competitive_advantage": "Blockchain technology expertise combined with financial services security and audit capabilities",
      "urgency_factor": "Blockchain adoption accelerating in financial services with insufficient security controls and audit practices",
      "implementation_time": "4-8 months",
      "target_client_size": "Blockchain Companies",
      "geography": "Global",
      "description": "We propose a comprehensive blockchain security assessment designed to evaluate blockchain implementations, smart contracts, and decentralized finance (DeFi) protocols. This engagement will identify blockchain vulnerabilities and enhance security controls.",
      "why_matters": [
        "Smart Contract Vulnerabilities: Flawed smart contracts can result in millions of dollars in losses",
        "DeFi Security Risks: Decentralized finance protocols face unique security challenges and attack vectors",
        "Regulatory Compliance: Blockchain financial services must meet regulatory requirements and security standards"
      ],
      "cost_components": [
        { "component": "Blockchain Architecture Security Review", "min": 150000, "max": 300000 },
        { "component": "Smart Contract Security Auditing", "min": 200000, "max": 400000 },
        { "component": "DeFi Protocol Security Assessment", "min": 150000, "max": 300000 },
        { "component": "Blockchain Security Framework", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Assess blockchain architecture and consensus mechanisms",
        "Conduct smart contract security auditing and testing",
        "Evaluate DeFi protocol security controls",
        "Develop blockchain security monitoring and incident response"
      ]
    },
    {
      "id": "DNSO-054",
      "title": "AI/ML Security and Privacy Assessment",
      "sector": "Technology",
      "subsector": "Artificial Intelligence",
      "client_type": "Technology",
      "priority": "High",
      "roi_min": 800000,
      "roi_max": 1600000,
      "risk_prevention": "Prevents AI/ML model attacks and data privacy breaches in machine learning systems",
      "expertise_tags": ["AI Security", "ML Model Protection", "Data Privacy", "Adversarial Attacks"],
      "competitive_advantage": "AI/ML development expertise combined with security and privacy protection capabilities",
      "urgency_factor": "AI/ML systems increasingly targeted by adversarial attacks requiring specialized security controls",
      "implementation_time": "6-10 months",
      "target_client_size": "AI/ML Companies",
      "geography": "Global",
      "description": "We propose a comprehensive AI/ML security and privacy assessment designed to evaluate machine learning model security, data protection, and adversarial attack resilience. This engagement will enhance AI/ML system security and privacy controls.",
      "why_matters": [
        "Model Protection: AI/ML models represent significant intellectual property requiring protection from theft",
        "Adversarial Attack Resilience: Machine learning systems vulnerable to adversarial attacks that can manipulate outputs",
        "Data Privacy Compliance: AI/ML systems must comply with privacy regulations and protect sensitive training data"
      ],
      "cost_components": [
        { "component": "AI/ML Security Assessment", "min": 200000, "max": 400000 },
        { "component": "Adversarial Attack Testing", "min": 250000, "max": 500000 },
        { "component": "Data Privacy & Protection Review", "min": 200000, "max": 400000 },
        { "component": "AI Security Framework Development", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Assess AI/ML model security and protection controls",
        "Conduct adversarial attack testing and resilience evaluation",
        "Evaluate data privacy and protection mechanisms",
        "Develop AI/ML security monitoring and incident response"
      ]
    },
    {
      "id": "DNSO-055",
      "title": "Satellite Communication Security Assessment",
      "sector": "Aerospace",
      "subsector": "Satellite Communications",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 1100000,
      "roi_max": 2200000,
      "risk_prevention": "Prevents satellite communication attacks that can disrupt military operations and national security",
      "expertise_tags": ["Satellite Security", "Space Communications", "Military Communications", "Signal Intelligence"],
      "competitive_advantage": "Aerospace and defense expertise combined with satellite communication security and signal analysis capabilities",
      "urgency_factor": "Satellite communications increasingly targeted by nation-state actors requiring enhanced security controls",
      "implementation_time": "10-18 months",
      "target_client_size": "Defense Contractors",
      "geography": "United States",
      "description": "We propose a specialized satellite communication security assessment designed to evaluate security controls in satellite systems, ground stations, and military communications. This engagement will enhance satellite communication security and resilience.",
      "why_matters": [
        "Military Communication Security: Satellite communications critical for military operations and national defense",
        "Space-Based Asset Protection: Satellite systems represent billions in investment requiring security protection",
        "Signal Intelligence Threats: Adversaries increasingly capable of intercepting and disrupting satellite communications"
      ],
      "cost_components": [
        { "component": "Satellite System Security Assessment", "min": 300000, "max": 600000 },
        { "component": "Ground Station Security Review", "min": 350000, "max": 700000 },
        { "component": "Communication Protocol Analysis", "min": 250000, "max": 500000 },
        { "component": "Space Communication Security Framework", "min": 200000, "max": 400000 }
      ],
      "next_steps": [
        "Assess satellite system security architecture",
        "Evaluate ground station security controls",
        "Analyze communication protocols and encryption",
        "Develop space communication security monitoring"
      ]
    }
 ,
 {
      "id": "DNSO-026",
      "title": "LNG Terminal Security for Medical Gas Supply",
      "sector": "Energy",
      "subsector": "LNG Operations",
      "client_type": "Healthcare",
      "priority": "Critical",
      "roi_min": 1200000,
      "roi_max": 2400000,
      "risk_prevention": "$500M+ medical gas supply disruption + patient safety",
      "expertise_tags": ["LNG Terminals", "Medical Gas Supply", "Process Safety", "Critical Infrastructure"],
      "competitive_advantage": "We build LNG terminals that supply gases essential for medical oxygen and anesthesia production",
      "urgency_factor": "Medical gas shortages can shut down entire hospitals and endanger thousands of patients",
      "implementation_time": "10-15 months",
      "target_client_size": "Regional Healthcare Networks",
      "geography": "Global",
      "description": "Secure LNG terminal operations that supply gases essential for medical oxygen, anesthesia, and life support systems in healthcare facilities.",
      "why_matters": [
        "Medical Gas Dependency: Hospitals require constant supply of medical gases for patient care and surgery",
        "Life Support Critical: Medical gas disruption can disable life support systems affecting ICU patients",
        "Supply Chain Vulnerability: Limited LNG terminals create single points of failure for medical gas supply"
      ],
      "cost_components": [
        { "component": "LNG Terminal Security Assessment", "min": 300000, "max": 600000 },
        { "component": "Medical Gas Supply Chain Protection", "min": 400000, "max": 800000 },
        { "component": "Process Safety Integration", "min": 300000, "max": 600000 },
        { "component": "Emergency Supply Monitoring", "min": 200000, "max": 400000 }
      ],
      "next_steps": [
        "Medical gas supply chain mapping",
        "LNG terminal vulnerability assessment",
        "Emergency supply contingency planning"
      ]
    },
    {
      "id": "DNSO-027",
      "title": "Biofuel Production Security for Pharmaceutical Solvents",
      "sector": "Energy",
      "subsector": "Biofuels",
      "client_type": "Healthcare",
      "priority": "High",
      "roi_min": 700000,
      "roi_max": 1400000,
      "risk_prevention": "$100M+ pharmaceutical solvent supply disruption",
      "expertise_tags": ["Biofuel Plants", "Pharmaceutical Solvents", "Chemical Processing", "Green Chemistry"],
      "competitive_advantage": "We build biofuel plants that produce ethanol and solvents used in pharmaceutical manufacturing",
      "urgency_factor": "Pharmaceutical production depends on bio-based solvents increasingly replacing petroleum derivatives",
      "implementation_time": "6-9 months",
      "target_client_size": "Pharmaceutical Manufacturers",
      "geography": "Global",
      "description": "Secure biofuel production facilities that supply ethanol and bio-based solvents essential for pharmaceutical manufacturing and drug formulation.",
      "why_matters": [
        "Pharmaceutical Manufacturing: Bio-based solvents essential for drug production and formulation",
        "Green Chemistry Transition: Pharmaceutical industry shifting to sustainable bio-based solvents",
        "Supply Security: Biofuel plant disruptions can halt pharmaceutical production globally"
      ],
      "cost_components": [
        { "component": "Biofuel Plant Security Assessment", "min": 175000, "max": 350000 },
        { "component": "Pharmaceutical Solvent Supply Protection", "min": 200000, "max": 400000 },
        { "component": "Green Chemistry Process Security", "min": 175000, "max": 350000 },
        { "component": "Supply Chain Integration", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Pharmaceutical solvent dependency analysis",
        "Biofuel plant security review",
        "Green chemistry supply chain assessment"
      ]
    },
    {
      "id": "DNSO-028",
      "title": "Specialty Chemical Manufacturing Security for Diagnostics",
      "sector": "Chemical/Pharmaceutical",
      "subsector": "Specialty Chemicals",
      "client_type": "Healthcare",
      "priority": "High",
      "roi_min": 800000,
      "roi_max": 1600000,
      "risk_prevention": "$200M+ diagnostic chemical supply disruption",
      "expertise_tags": ["Specialty Chemicals", "Diagnostic Reagents", "Chemical Manufacturing", "Quality Control"],
      "competitive_advantage": "We design specialty chemical plants producing reagents essential for medical diagnostics and testing",
      "urgency_factor": "Medical diagnostic testing depends on specialty chemicals with limited global production sources",
      "implementation_time": "8-12 months",
      "target_client_size": "Diagnostic Companies",
      "geography": "Global",
      "description": "Secure specialty chemical manufacturing facilities producing reagents, contrast agents, and chemicals essential for medical diagnostics and laboratory testing.",
      "why_matters": [
        "Diagnostic Testing Dependency: Medical diagnostics require specialty chemicals for accurate test results",
        "Limited Production Sources: Few facilities globally produce specialized diagnostic chemicals",
        "Patient Care Impact: Diagnostic chemical shortages delay critical medical testing and treatment"
      ],
      "cost_components": [
        { "component": "Specialty Chemical Plant Security", "min": 200000, "max": 400000 },
        { "component": "Diagnostic Reagent Protection", "min": 250000, "max": 500000 },
        { "component": "Quality Control Integration", "min": 200000, "max": 400000 },
        { "component": "Supply Chain Monitoring", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Diagnostic chemical supply mapping",
        "Specialty chemical plant assessment",
        "Quality control system review"
      ]
    },
    {
      "id": "DNSO-029",
      "title": "Medical Isotope Reactor Cybersecurity",
      "sector": "Chemical/Pharmaceutical",
      "subsector": "Medical Isotopes",
      "client_type": "Healthcare",
      "priority": "Critical",
      "roi_min": 1500000,
      "roi_max": 3000000,
      "risk_prevention": "$1B+ medical isotope supply + cancer treatment protection",
      "expertise_tags": ["Medical Isotope Reactors", "Nuclear Medicine", "Radiation Safety", "Medical Supply"],
      "competitive_advantage": "We build medical isotope production reactors essential for cancer diagnosis and treatment",
      "urgency_factor": "Medical isotope shortage affects millions of cancer patients globally with no substitute sources",
      "implementation_time": "15-24 months",
      "target_client_size": "Nuclear Medicine Centers",
      "geography": "North America, Europe",
      "description": "Secure medical isotope production reactors that produce radioactive materials essential for cancer imaging, diagnosis, and treatment.",
      "why_matters": [
        "Cancer Treatment Critical: Medical isotopes essential for cancer diagnosis and treatment with no alternatives",
        "Global Supply Shortage: Limited medical isotope reactors create critical supply vulnerabilities",
        "Patient Impact: Isotope shortages delay cancer treatment affecting survival rates"
      ],
      "cost_components": [
        { "component": "Medical Isotope Reactor Security", "min": 500000, "max": 1000000 },
        { "component": "Nuclear Medicine Supply Protection", "min": 400000, "max": 800000 },
        { "component": "Radiation Safety Integration", "min": 300000, "max": 600000 },
        { "component": "Medical Supply Chain Monitoring", "min": 300000, "max": 600000 }
      ],
      "next_steps": [
        "Medical isotope reactor assessment",
        "Nuclear medicine supply analysis",
        "Radiation safety protocol review"
      ]
    },
    {
      "id": "DNSO-030",
      "title": "Pharmaceutical Waste Treatment Security",
      "sector": "Chemical/Pharmaceutical",
      "subsector": "Waste Treatment",
      "client_type": "Healthcare",
      "priority": "Medium",
      "roi_min": 500000,
      "roi_max": 1000000,
      "risk_prevention": "$50M+ environmental liability + regulatory compliance",
      "expertise_tags": ["Pharmaceutical Waste", "Waste Treatment", "Environmental Compliance", "Hazmat Processing"],
      "competitive_advantage": "We design pharmaceutical waste treatment facilities ensuring safe disposal of medical and chemical waste",
      "urgency_factor": "Pharmaceutical waste requires specialized treatment to prevent environmental contamination and regulatory violations",
      "implementation_time": "6-10 months",
      "target_client_size": "Pharmaceutical Companies",
      "geography": "Global",
      "description": "Secure pharmaceutical waste treatment facilities that safely process and dispose of medical waste, expired drugs, and chemical byproducts.",
      "why_matters": [
        "Environmental Protection: Pharmaceutical waste can contaminate water supplies and ecosystems",
        "Regulatory Compliance: Improper pharmaceutical waste disposal triggers massive EPA penalties",
        "Public Health Safety: Pharmaceutical waste in environment affects community health"
      ],
      "cost_components": [
        { "component": "Pharmaceutical Waste Facility Security", "min": 125000, "max": 250000 },
        { "component": "Environmental Compliance Integration", "min": 150000, "max": 300000 },
        { "component": "Hazmat Processing Protection", "min": 125000, "max": 250000 },
        { "component": "Regulatory Monitoring", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Pharmaceutical waste processing assessment",
        "Environmental compliance review",
        "Regulatory framework integration"
      ]
    },
    {
      "id": "DNSO-031",
      "title": "Military Medical Facility Construction Security",
      "sector": "Government/Defense",
      "subsector": "Military Medical",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 1800000,
      "roi_max": 3600000,
      "risk_prevention": "Military medical readiness + operational security protection",
      "expertise_tags": ["Military Medical Facilities", "Defense Construction", "Medical Security", "OPSEC"],
      "competitive_advantage": "We build military medical facilities with integrated security that supports both combat and civilian medical operations",
      "urgency_factor": "Military medical facilities must maintain readiness while providing civilian emergency medical support",
      "implementation_time": "18-30 months",
      "target_client_size": "Department of Defense",
      "geography": "Global (US Military Bases)",
      "description": "Secure military medical facility construction with integrated cybersecurity for combat medical readiness and civilian emergency response.",
      "why_matters": [
        "Military Medical Readiness: Combat medical facilities essential for military operations and troop health",
        "Dual-Use Capability: Military medical facilities provide emergency civilian medical care during disasters",
        "Operational Security: Medical data can reveal military operations and personnel deployment patterns"
      ],
      "cost_components": [
        { "component": "Military Medical Facility Security", "min": 500000, "max": 1000000 },
        { "component": "Combat Medical System Protection", "min": 600000, "max": 1200000 },
        { "component": "OPSEC Integration", "min": 400000, "max": 800000 },
        { "component": "Dual-Use Medical Capability", "min": 300000, "max": 600000 }
      ],
      "next_steps": [
        "Military medical facility assessment",
        "Combat medical system review",
        "OPSEC integration planning"
      ]
    },
    {
      "id": "DNSO-032",
      "title": "Government Emergency Medical Stockpile Security",
      "sector": "Government/Defense",
      "subsector": "Emergency Preparedness",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 1200000,
      "roi_max": 2400000,
      "risk_prevention": "$5B+ strategic medical reserve protection",
      "expertise_tags": ["Strategic Medical Reserve", "Emergency Stockpiles", "Disaster Preparedness", "Medical Logistics"],
      "competitive_advantage": "We build and manage government medical stockpile facilities for national emergency preparedness",
      "urgency_factor": "Strategic medical reserves essential for pandemic response and national emergency medical capacity",
      "implementation_time": "12-18 months",
      "target_client_size": "Federal Emergency Agencies",
      "geography": "National",
      "description": "Secure government strategic medical stockpiles including vaccines, PPE, and emergency medical supplies for national disaster response.",
      "why_matters": [
        "National Preparedness: Strategic medical reserves essential for pandemic and disaster response",
        "Supply Chain Resilience: Government stockpiles provide backup when commercial medical supply chains fail",
        "Public Health Security: Medical stockpile disruption affects national emergency response capability"
      ],
      "cost_components": [
        { "component": "Strategic Stockpile Security Assessment", "min": 300000, "max": 600000 },
        { "component": "Medical Supply Protection", "min": 400000, "max": 800000 },
        { "component": "Emergency Distribution Security", "min": 300000, "max": 600000 },
        { "component": "National Coordination Integration", "min": 200000, "max": 400000 }
      ],
      "next_steps": [
        "Strategic medical stockpile assessment",
        "Emergency distribution planning",
        "National coordination integration"
      ]
    },
    {
      "id": "DNSO-033",
      "title": "Airport Medical Emergency Response Security",
      "sector": "Infrastructure",
      "subsector": "Airport Construction",
      "client_type": "Healthcare",
      "priority": "High",
      "roi_min": 900000,
      "roi_max": 1800000,
      "risk_prevention": "$200M+ airport medical emergency capability",
      "expertise_tags": ["Airport Construction", "Medical Emergency Response", "Air Medical Services", "Emergency Systems"],
      "competitive_advantage": "We build airports with integrated medical emergency response capabilities and air medical service support",
      "urgency_factor": "Airports serve as critical nodes for medical emergency response and air medical transport",
      "implementation_time": "8-14 months",
      "target_client_size": "Airport Authorities",
      "geography": "Global",
      "description": "Secure airport infrastructure supporting medical emergency response including air medical services, emergency medical facilities, and medical supply transport.",
      "why_matters": [
        "Medical Transport Hub: Airports essential for air medical transport and emergency medical response",
        "Emergency Medical Capability: Airport medical facilities provide critical emergency care for travelers and community",
        "Medical Supply Distribution: Airports serve as distribution hubs for emergency medical supplies during disasters"
      ],
      "cost_components": [
        { "component": "Airport Medical Emergency Security", "min": 225000, "max": 450000 },
        { "component": "Air Medical Service Protection", "min": 300000, "max": 600000 },
        { "component": "Emergency Medical Facility Security", "min": 225000, "max": 450000 },
        { "component": "Medical Supply Distribution Security", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Airport medical emergency assessment",
        "Air medical service integration",
        "Emergency medical facility planning"
      ]
    },
    {
      "id": "DNSO-034",
      "title": "Bridge Infrastructure Medical Access Security",
      "sector": "Infrastructure",
      "subsector": "Bridge Construction",
      "client_type": "Healthcare",
      "priority": "High",
      "roi_min": 700000,
      "roi_max": 1400000,
      "risk_prevention": "$150M+ medical access infrastructure protection",
      "expertise_tags": ["Bridge Construction", "Medical Access", "Emergency Routes", "Infrastructure Security"],
      "competitive_advantage": "We build bridges that provide critical access routes to healthcare facilities and emergency medical services",
      "urgency_factor": "Bridge infrastructure essential for medical emergency response and healthcare facility access",
      "implementation_time": "6-12 months",
      "target_client_size": "Transportation Authorities",
      "geography": "Global",
      "description": "Secure bridge infrastructure that provides critical access routes to healthcare facilities, emergency medical services, and medical supply transport.",
      "why_matters": [
        "Medical Emergency Access: Bridges provide critical access routes for emergency medical services",
        "Healthcare Facility Access: Patient access to healthcare facilities depends on secure bridge infrastructure",
        "Medical Supply Transport: Bridge infrastructure essential for medical supply chain transportation"
      ],
      "cost_components": [
        { "component": "Bridge Infrastructure Security Assessment", "min": 175000, "max": 350000 },
        { "component": "Medical Access Route Protection", "min": 225000, "max": 450000 },
        { "component": "Emergency Response Integration", "min": 175000, "max": 350000 },
        { "component": "Medical Supply Route Security", "min": 125000, "max": 250000 }
      ],
      "next_steps": [
        "Critical medical access route mapping",
        "Bridge infrastructure assessment",
        "Emergency response coordination"
      ]
    },
    {
      "id": "DNSO-035",
      "title": "Road Infrastructure Ambulance Response Security",
      "sector": "Infrastructure",
      "subsector": "Highway Construction",
      "client_type": "Healthcare",
      "priority": "Medium",
      "roi_min": 600000,
      "roi_max": 1200000,
      "risk_prevention": "$100M+ emergency medical response capability",
      "expertise_tags": ["Highway Construction", "Emergency Medical Services", "Ambulance Response", "Traffic Management"],
      "competitive_advantage": "We build highway infrastructure that supports rapid emergency medical response and ambulance services",
      "urgency_factor": "Highway infrastructure critical for ambulance response times and emergency medical service effectiveness",
      "implementation_time": "6-10 months",
      "target_client_size": "Emergency Medical Services",
      "geography": "Regional",
      "description": "Secure highway and road infrastructure supporting rapid ambulance response, emergency medical services, and medical transport coordination.",
      "why_matters": [
        "Ambulance Response Times: Highway infrastructure directly affects emergency medical response times",
        "Emergency Medical Access: Road infrastructure essential for emergency medical service delivery",
        "Medical Transport Security: Highway systems must remain operational during medical emergencies"
      ],
      "cost_components": [
        { "component": "Highway Infrastructure Security", "min": 150000, "max": 300000 },
        { "component": "Emergency Medical Service Integration", "min": 200000, "max": 400000 },
        { "component": "Ambulance Response Optimization", "min": 150000, "max": 300000 },
        { "component": "Medical Transport Coordination", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Emergency medical service route analysis",
        "Highway infrastructure assessment",
        "Ambulance response optimization"
      ]
          },
    {
      "id": "DNSO-036",
      "title": "Industrial Control Systems Penetration Testing",
      "sector": "Energy",
      "subsector": "Critical Infrastructure",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 850000,
      "roi_max": 1700000,
      "risk_prevention": "Prevents catastrophic OT/ICS breaches affecting power generation and distribution",
      "expertise_tags": ["ICS/SCADA Security", "OT Penetration Testing", "Critical Infrastructure", "Industrial Cybersecurity"],
      "competitive_advantage": "Deep expertise in industrial control systems across power plants, refineries, and critical infrastructure we've built",
      "urgency_factor": "Nation-state actors increasingly targeting industrial control systems in critical infrastructure",
      "implementation_time": "6-12 months",
      "target_client_size": "Energy Companies and Utilities",
      "geography": "Global",
      "description": "We propose a comprehensive ICS/SCADA penetration testing engagement designed to uncover vulnerabilities across operational technology networks, industrial control systems, and critical infrastructure components. This assessment will provide actionable insights to strengthen defenses, reduce breach risk, and support regulatory compliance.",
      "why_matters": [
        "Critical Infrastructure Protection: ICS breaches can cause widespread power outages affecting millions of people",
        "Nation-State Threat Landscape: Advanced persistent threats specifically target industrial control systems",
        "Regulatory Compliance Requirements: NERC CIP and other standards mandate regular ICS security assessments"
      ],
      "cost_components": [
        { "component": "ICS/SCADA Security Assessment", "min": 200000, "max": 400000 },
        { "component": "OT Network Penetration Testing", "min": 300000, "max": 600000 },
        { "component": "Industrial Protocol Analysis", "min": 200000, "max": 400000 },
        { "component": "Compliance Reporting & Remediation", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Conduct preliminary ICS network discovery and mapping",
        "Develop comprehensive OT penetration testing methodology",
        "Coordinate with operations teams for safe testing windows",
        "Deliver prioritized remediation roadmap"
      ]
    },
    {
      "id": "DNSO-037",
      "title": "Cloud Security Architecture Assessment",
      "sector": "Technology",
      "subsector": "Cloud Infrastructure",
      "client_type": "Healthcare",
      "priority": "High",
      "roi_min": 600000,
      "roi_max": 1200000,
      "risk_prevention": "Prevents cloud misconfigurations and data breaches in healthcare cloud environments",
      "expertise_tags": ["Cloud Security", "HIPAA Compliance", "Multi-Cloud Assessment", "Container Security"],
      "competitive_advantage": "Extensive experience securing cloud infrastructure for healthcare organizations with strict compliance requirements",
      "urgency_factor": "Healthcare cloud adoption accelerating without proper security controls, creating massive compliance risks",
      "implementation_time": "4-8 months",
      "target_client_size": "Healthcare Organizations",
      "geography": "North America",
      "description": "We propose a tailored cloud security assessment for healthcare organizations, designed to evaluate security posture across AWS, Azure, and GCP environments. This comprehensive review will identify misconfigurations, compliance gaps, and provide actionable remediation guidance.",
      "why_matters": [
        "HIPAA Compliance Critical: Cloud misconfigurations can expose patient data leading to massive fines",
        "Multi-Cloud Complexity: Healthcare organizations struggle with consistent security across multiple cloud providers",
        "Rapid Cloud Adoption: Healthcare cloud migration often bypasses security reviews creating vulnerabilities"
      ],
      "cost_components": [
        { "component": "Multi-Cloud Security Assessment", "min": 150000, "max": 300000 },
        { "component": "HIPAA Compliance Review", "min": 200000, "max": 400000 },
        { "component": "Container & Kubernetes Security", "min": 150000, "max": 300000 },
        { "component": "Cloud Security Architecture Design", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Inventory all cloud environments and workloads",
        "Conduct automated security configuration scanning",
        "Perform HIPAA compliance gap analysis",
        "Develop cloud security roadmap and implementation plan"
      ]
    },
    {
      "id": "DNSO-038",
      "title": "Supply Chain Cybersecurity Assessment",
      "sector": "Manufacturing",
      "subsector": "Supply Chain",
      "client_type": "Manufacturing",
      "priority": "Critical",
      "roi_min": 750000,
      "roi_max": 1500000,
      "risk_prevention": "Prevents supply chain cyber attacks that can halt manufacturing operations globally",
      "expertise_tags": ["Supply Chain Security", "Third-Party Risk", "Vendor Assessment", "Manufacturing Security"],
      "competitive_advantage": "Unique understanding of manufacturing supply chains and industrial processes from our construction projects",
      "urgency_factor": "Supply chain attacks like SolarWinds demonstrate devastating impact on manufacturing operations",
      "implementation_time": "6-10 months",
      "target_client_size": "Manufacturing Companies",
      "geography": "Global",
      "description": "We propose a comprehensive supply chain cybersecurity assessment designed to evaluate third-party risks, vendor security controls, and supply chain vulnerabilities. This engagement will provide actionable insights to strengthen supplier security and reduce supply chain attack risks.",
      "why_matters": [
        "Third-Party Risk Exposure: 60% of data breaches involve third-party vendors in manufacturing supply chains",
        "Manufacturing Disruption: Supply chain attacks can halt production lines causing millions in losses",
        "Regulatory Requirements: Increasing compliance mandates for supply chain security across industries"
      ],
      "cost_components": [
        { "component": "Supply Chain Risk Assessment", "min": 200000, "max": 400000 },
        { "component": "Vendor Security Evaluation", "min": 250000, "max": 500000 },
        { "component": "Manufacturing Process Security Review", "min": 200000, "max": 400000 },
        { "component": "Supply Chain Security Program Development", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Map complete supply chain and identify critical vendors",
        "Conduct security assessments of top-tier suppliers",
        "Evaluate manufacturing process integration security",
        "Develop supply chain security monitoring program"
      ]
    },
    {
      "id": "DNSO-039",
      "title": "Financial Services API Security Testing",
      "sector": "Financial Services",
      "subsector": "Digital Banking",
      "client_type": "Financial Services",
      "priority": "Critical",
      "roi_min": 900000,
      "roi_max": 1800000,
      "risk_prevention": "Prevents API vulnerabilities that could expose customer financial data and banking systems",
      "expertise_tags": ["API Security", "Financial Services", "Open Banking", "PCI DSS Compliance"],
      "competitive_advantage": "Deep expertise in financial technology security from our fintech infrastructure projects",
      "urgency_factor": "Open banking and API economy creating massive attack surface in financial services",
      "implementation_time": "4-8 months",
      "target_client_size": "Banks and Financial Institutions",
      "geography": "Global",
      "description": "We propose a specialized API security testing engagement for financial services, designed to identify vulnerabilities in banking APIs, payment systems, and open banking integrations. This assessment will ensure API security controls meet PCI DSS and regulatory requirements.",
      "why_matters": [
        "Financial Data Protection: API vulnerabilities can expose customer financial data and payment information",
        "Open Banking Security: New banking APIs create attack vectors requiring specialized security testing",
        "Regulatory Compliance: PCI DSS and banking regulations mandate robust API security controls"
      ],
      "cost_components": [
        { "component": "Banking API Security Assessment", "min": 250000, "max": 500000 },
        { "component": "Payment System Penetration Testing", "min": 300000, "max": 600000 },
        { "component": "Open Banking Security Review", "min": 200000, "max": 400000 },
        { "component": "PCI DSS Compliance Validation", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Inventory all banking APIs and integrations",
        "Conduct automated API security scanning",
        "Perform manual penetration testing of critical APIs",
        "Validate PCI DSS compliance across payment systems"
      ]
    },
    {
      "id": "DNSO-040",
      "title": "Ransomware Readiness Assessment",
      "sector": "Healthcare",
      "subsector": "Hospital Operations",
      "client_type": "Healthcare",
      "priority": "Critical",
      "roi_min": 500000,
      "roi_max": 1000000,
      "risk_prevention": "Prevents ransomware attacks that can shut down hospital operations and endanger patients",
      "expertise_tags": ["Ransomware Defense", "Incident Response", "Healthcare Security", "Business Continuity"],
      "competitive_advantage": "Healthcare-specific ransomware expertise understanding critical patient care systems and medical devices",
      "urgency_factor": "Healthcare ransomware attacks increasing 200% year-over-year with devastating patient impact",
      "implementation_time": "3-6 months",
      "target_client_size": "Hospitals and Health Systems",
      "geography": "North America",
      "description": "We propose a comprehensive ransomware readiness assessment designed to evaluate preparedness across technical defenses, incident response capabilities, and business continuity planning. This engagement will strengthen resilience against ransomware attacks targeting healthcare operations.",
      "why_matters": [
        "Patient Safety Impact: Ransomware can disable life support systems and delay critical medical procedures",
        "Healthcare Targeting: Hospitals specifically targeted due to critical nature and willingness to pay ransoms",
        "Operational Continuity: Ransomware attacks can shut down entire hospital systems affecting patient care"
      ],
      "cost_components": [
        { "component": "Ransomware Defense Assessment", "min": 125000, "max": 250000 },
        { "component": "Incident Response Planning", "min": 150000, "max": 300000 },
        { "component": "Business Continuity Testing", "min": 125000, "max": 250000 },
        { "component": "Ransomware Simulation Exercise", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Assess current ransomware defenses and backup systems",
        "Evaluate incident response procedures and capabilities",
        "Test business continuity and disaster recovery plans",
        "Conduct tabletop ransomware simulation exercise"
      ]
    },
    {
      "id": "DNSO-041",
      "title": "IoT Device Security Assessment",
      "sector": "Manufacturing",
      "subsector": "Smart Manufacturing",
      "client_type": "Manufacturing",
      "priority": "High",
      "roi_min": 400000,
      "roi_max": 800000,
      "risk_prevention": "Prevents IoT device vulnerabilities from compromising manufacturing operations and data",
      "expertise_tags": ["IoT Security", "Industrial IoT", "Device Security", "Smart Manufacturing"],
      "competitive_advantage": "Extensive experience with IoT implementations in industrial and manufacturing environments",
      "urgency_factor": "Manufacturing IoT adoption creating massive attack surface with insufficient security controls",
      "implementation_time": "4-8 months",
      "target_client_size": "Manufacturing Companies",
      "geography": "Global",
      "description": "We propose a comprehensive IoT security assessment for manufacturing environments, designed to identify vulnerabilities in connected devices, industrial sensors, and smart manufacturing systems. This evaluation will provide actionable security recommendations for IoT deployments.",
      "why_matters": [
        "Manufacturing Disruption: Compromised IoT devices can halt production lines and damage equipment",
        "Data Exfiltration Risk: IoT devices can provide attackers access to sensitive manufacturing data",
        "Scalability Challenges: Large-scale IoT deployments create management and security complexities"
      ],
      "cost_components": [
        { "component": "IoT Device Inventory & Assessment", "min": 100000, "max": 200000 },
        { "component": "Industrial IoT Security Testing", "min": 150000, "max": 300000 },
        { "component": "IoT Network Security Review", "min": 100000, "max": 200000 },
        { "component": "IoT Security Framework Development", "min": 50000, "max": 100000 }
      ],
      "next_steps": [
        "Inventory all IoT devices and connected systems",
        "Conduct security testing of representative device samples",
        "Evaluate IoT network segmentation and monitoring",
        "Develop IoT security management framework"
      ]
    },
    {
      "id": "DNSO-042",
      "title": "Zero Trust Architecture Implementation",
      "sector": "Government/Defense",
      "subsector": "Federal Agencies",
      "client_type": "Government",
      "priority": "Critical",
      "roi_min": 1200000,
      "roi_max": 2400000,
      "risk_prevention": "Implements zero trust security model to prevent insider threats and advanced persistent threats",
      "expertise_tags": ["Zero Trust", "Identity Management", "Network Security", "Federal Compliance"],
      "competitive_advantage": "Experience implementing zero trust architectures for government and defense contractors",
      "urgency_factor": "Federal zero trust mandate requires agencies to implement zero trust architecture by 2024",
      "implementation_time": "12-18 months",
      "target_client_size": "Federal Agencies",
      "geography": "United States",
      "description": "We propose a comprehensive zero trust architecture implementation designed to meet federal mandates and enhance security posture. This engagement will evaluate current infrastructure, design zero trust architecture, and implement identity-based security controls across the organization.",
      "why_matters": [
        "Federal Mandate Compliance: Executive Order 14028 requires federal agencies to implement zero trust architecture",
        "Advanced Threat Protection: Zero trust model provides enhanced protection against sophisticated adversaries",
        "Insider Threat Mitigation: Zero trust principles reduce risks from compromised credentials and insider threats"
      ],
      "cost_components": [
        { "component": "Zero Trust Architecture Assessment", "min": 300000, "max": 600000 },
        { "component": "Identity & Access Management Implementation", "min": 400000, "max": 800000 },
        { "component": "Network Segmentation & Monitoring", "min": 300000, "max": 600000 },
        { "component": "Federal Compliance Validation", "min": 200000, "max": 400000 }
      ],
      "next_steps": [
        "Assess current identity and access management systems",
        "Design zero trust architecture roadmap",
        "Implement pilot zero trust controls",
        "Scale zero trust implementation across organization"
      ]
    },
    {
      "id": "DNSO-043",
      "title": "Automotive Cybersecurity Testing",
      "sector": "Automotive",
      "subsector": "Connected Vehicles",
      "client_type": "Manufacturing",
      "priority": "High",
      "roi_min": 700000,
      "roi_max": 1400000,
      "risk_prevention": "Prevents vehicle cybersecurity vulnerabilities that could affect driver safety and brand reputation",
      "expertise_tags": ["Automotive Security", "Connected Vehicle Testing", "ECU Security", "V2X Security"],
      "competitive_advantage": "Automotive manufacturing expertise combined with cybersecurity testing capabilities",
      "urgency_factor": "Connected and autonomous vehicles creating new attack vectors requiring specialized security testing",
      "implementation_time": "6-12 months",
      "target_client_size": "Automotive Manufacturers",
      "geography": "Global",
      "description": "We propose specialized automotive cybersecurity testing designed to evaluate security controls in connected vehicles, electronic control units, and vehicle-to-everything (V2X) communications. This assessment will ensure automotive cybersecurity compliance and safety standards.",
      "why_matters": [
        "Driver Safety Critical: Vehicle cybersecurity vulnerabilities can directly impact driver and passenger safety",
        "Regulatory Compliance: UN WP.29 and other automotive cybersecurity regulations require security testing",
        "Brand Protection: Automotive cybersecurity incidents can cause massive recalls and reputation damage"
      ],
      "cost_components": [
        { "component": "ECU Security Testing", "min": 200000, "max": 400000 },
        { "component": "Connected Vehicle Assessment", "min": 250000, "max": 500000 },
        { "component": "V2X Communication Security", "min": 150000, "max": 300000 },
        { "component": "Automotive Compliance Validation", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Inventory vehicle electronic systems and connectivity",
        "Conduct ECU security testing and analysis",
        "Evaluate V2X and telematics security controls",
        "Validate compliance with automotive cybersecurity standards"
      ]
    },
    {
      "id": "DNSO-044",
      "title": "Data Center Physical Security Integration",
      "sector": "Technology",
      "subsector": "Data Centers",
      "client_type": "Technology",
      "priority": "High",
      "roi_min": 600000,
      "roi_max": 1200000,
      "risk_prevention": "Prevents physical security breaches that bypass cybersecurity controls in data centers",
      "expertise_tags": ["Physical Security", "Data Center Security", "Facility Security", "Access Control"],
      "competitive_advantage": "Data center construction experience combined with integrated physical-cyber security expertise",
      "urgency_factor": "Data centers vulnerable to physical attacks that can bypass sophisticated cybersecurity measures",
      "implementation_time": "4-8 months",
      "target_client_size": "Data Center Operators",
      "geography": "Global",
      "description": "We propose a comprehensive physical security assessment for data centers, designed to evaluate physical access controls, environmental security, and integration with cybersecurity systems. This engagement will identify physical vulnerabilities and enhance overall security posture.",
      "why_matters": [
        "Physical Access Risk: Physical access to data centers can bypass all cybersecurity controls",
        "Critical Infrastructure Protection: Data centers house critical infrastructure requiring maximum security",
        "Compliance Requirements: SOC 2, ISO 27001, and other standards mandate physical security controls"
      ],
      "cost_components": [
        { "component": "Physical Security Assessment", "min": 150000, "max": 300000 },
        { "component": "Access Control System Review", "min": 200000, "max": 400000 },
        { "component": "Environmental Security Analysis", "min": 150000, "max": 300000 },
        { "component": "Physical-Cyber Security Integration", "min": 100000, "max": 200000 }
      ],
      "next_steps": [
        "Assess current physical security controls and access systems",
        "Evaluate environmental monitoring and security systems",
        "Test physical penetration scenarios and social engineering",
        "Integrate physical security with cybersecurity monitoring"
      ]
    },
    {
      "id": "DNSO-045",
      "title": "Cryptocurrency Exchange Security Assessment",
      "sector": "Financial Services",
      "subsector": "Cryptocurrency",
      "client_type": "Financial Services",
      "priority": "Critical",
      "roi_min": 800000,
      "roi_max": 1600000,
      "risk_prevention": "Prevents cryptocurrency exchange hacks that can result in massive financial losses",
      "expertise_tags": ["Cryptocurrency Security", "Exchange Security", "Blockchain Security", "Digital Asset Protection"],
      "competitive_advantage": "Financial technology expertise combined with emerging cryptocurrency and blockchain security knowledge",
      "urgency_factor": "Cryptocurrency exchange hacks causing billions in losses, regulatory scrutiny increasing",
      "implementation_time": "6-10 months",
      "target_client_size": "Cryptocurrency Exchanges",
      "geography": "Global",
      "description": "We propose a specialized cryptocurrency exchange security assessment designed to evaluate trading platform security, wallet protection, and blockchain integration security. This comprehensive review will identify vulnerabilities and enhance digital asset protection.",
      "why_matters": [
        "Financial Loss Prevention: Exchange hacks have resulted in billions of dollars in cryptocurrency theft",
        "Regulatory Compliance: Increasing cryptocurrency regulations require enhanced security controls",
        "Customer Trust: Security breaches can destroy customer confidence and exchange reputation"
      ],
      "cost_components": [
        { "component": "Exchange Platform Security Testing", "min": 250000, "max": 500000 },
        { "component": "Cryptocurrency Wallet Assessment", "min": 200000, "max": 400000 },
        { "component": "Blockchain Integration Security", "min": 200000, "max": 400000 },
        { "component": "Digital Asset Protection Framework", "min": 150000, "max": 300000 }
      ],
      "next_steps": [
        "Assess trading platform and API security controls",
        "Evaluate cryptocurrency wallet and key management",
        "Test blockchain integration and smart contract security",
        "Develop digital asset protection strategy"
      ]
    }
 ,
      // ENERGY SECTOR - Leveraging oil/gas, renewable, nuclear expertise
      {
        "id": "DNSO-001",
        "title": "Critical Healthcare Energy Infrastructure Security",
        "sector": "Energy",
        "subsector": "Power Generation",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 850000,
        "roi_max": 1700000,
        "risk_prevention": "$100M+ liability + $50M+ regulatory losses",
        "expertise_tags": ["Power Plant Engineering", "Hospital Infrastructure", "SCADA Security", "Emergency Power"],
        "competitive_advantage": "We built the power infrastructure that hospitals depend on - unique OT security expertise",
        "urgency_factor": "Nation-state targeting of healthcare energy systems threatens patient safety",
        "implementation_time": "6-12 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Secure critical power infrastructure including backup generators, UPS systems, and energy management that support life-critical hospital operations.",
        "why_matters": [
          "Life-Critical Dependencies: Hospital energy systems support life support and surgical suites",
          "Nation-State Targeting: Healthcare energy infrastructure explicitly targeted by foreign adversaries",
          "Regulatory Compliance: New CISA directives require critical infrastructure cybersecurity reporting"
        ],
        "cost_components": [
          { "component": "Energy Infrastructure OT Assessment", "min": 200000, "max": 400000 },
          { "component": "SCADA & EMS Security Hardening", "min": 300000, "max": 600000 },
          { "component": "Emergency Generator Cyber Protection", "min": 150000, "max": 300000 },
          { "component": "24/7 Energy Systems Monitoring", "min": 200000, "max": 400000 }
        ],
        "next_steps": [
          "Emergency energy system vulnerability assessment",
          "SCADA security architecture review",
          "24/7 monitoring implementation pilot"
        ]
      },
      {
        "id": "DNSO-002",
        "title": "Renewable Energy Cybersecurity for Healthcare",
        "sector": "Energy",
        "subsector": "Renewables",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 600000,
        "roi_max": 1200000,
        "risk_prevention": "$50M+ renewable investment protection",
        "expertise_tags": ["Wind Energy", "Solar Systems", "Grid Integration", "Smart Grid Security"],
        "competitive_advantage": "We design and build renewable energy facilities - understand every component vulnerability",
        "urgency_factor": "Increasing renewable adoption in healthcare creates new attack vectors",
        "implementation_time": "4-8 months",
        "target_client_size": "Medium-Large Healthcare",
        "geography": "Global",
        "description": "Protect healthcare renewable energy investments including solar farms, wind installations, and grid-tie systems from cyber threats.",
        "why_matters": [
          "Investment Protection: Healthcare renewable energy projects worth $50M+ need cybersecurity",
          "Grid Stability: Compromised renewable systems can destabilize entire facility power",
          "Green Initiative Risk: Cyber incidents can derail sustainability goals and regulatory compliance"
        ],
        "cost_components": [
          { "component": "Renewable Systems Security Assessment", "min": 150000, "max": 300000 },
          { "component": "Smart Grid Integration Security", "min": 200000, "max": 400000 },
          { "component": "Inverter & Control System Hardening", "min": 100000, "max": 200000 },
          { "component": "Grid-Tie Security Monitoring", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Solar/wind system vulnerability scan",
          "Grid integration security review",
          "Smart inverter security assessment"
        ]
      },
      {
        "id": "DNSO-003",
        "title": "Nuclear Medical Isotope Production Security",
        "sector": "Energy",
        "subsector": "Nuclear",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 2000000,
        "roi_max": 5000000,
        "risk_prevention": "Unlimited liability + medical isotope supply protection",
        "expertise_tags": ["Nuclear Engineering", "Medical Isotopes", "Radiation Safety", "Nuclear Security"],
        "competitive_advantage": "We build nuclear facilities that produce medical isotopes - understand nuclear-grade security requirements",
        "urgency_factor": "Medical isotope shortage threatens cancer treatment nationwide",
        "implementation_time": "12-18 months",
        "target_client_size": "Major Medical Centers",
        "geography": "North America, Europe",
        "description": "Secure nuclear facilities producing medical isotopes essential for cancer treatment and medical imaging.",
        "why_matters": [
          "Patient Care Impact: Medical isotope supply disruption affects cancer treatment for millions",
          "Nuclear Security Requirements: Cyber threats to nuclear facilities trigger federal oversight",
          "Supply Chain Criticality: Limited global production makes each facility strategically critical"
        ],
        "cost_components": [
          { "component": "Nuclear Facility Security Assessment", "min": 500000, "max": 1000000 },
          { "component": "Medical Isotope Production Protection", "min": 600000, "max": 1200000 },
          { "component": "Nuclear-Grade Monitoring Systems", "min": 400000, "max": 800000 },
          { "component": "Regulatory Compliance Integration", "min": 500000, "max": 2000000 }
        ],
        "next_steps": [
          "Nuclear security clearance verification",
          "Medical isotope supply chain analysis",
          "Federal compliance framework review"
        ]
      },
      {
        "id": "DNSO-004",
        "title": "Oil & Gas Pharmaceutical Precursor Security",
        "sector": "Energy",
        "subsector": "Oil & Gas",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 750000,
        "roi_max": 1500000,
        "risk_prevention": "$25M+ pharmaceutical supply disruption",
        "expertise_tags": ["Petrochemical Plants", "Pipeline Security", "Refinery Operations", "Chemical Supply"],
        "competitive_advantage": "We build refineries and petrochemical plants that produce pharmaceutical precursors",
        "urgency_factor": "Pharmaceutical supply chains depend on petrochemical feedstocks",
        "implementation_time": "6-10 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Secure oil & gas facilities that produce pharmaceutical precursors and medical-grade chemicals essential for drug manufacturing.",
        "why_matters": [
          "Pharmaceutical Dependency: 80% of drug precursors come from petrochemical facilities we built",
          "Supply Chain Vulnerability: Cyber attacks can halt pharmaceutical production globally",
          "Strategic Resource Protection: Medical-grade chemicals are national security assets"
        ],
        "cost_components": [
          { "component": "Petrochemical Facility Security", "min": 200000, "max": 400000 },
          { "component": "Pipeline Cybersecurity Integration", "min": 250000, "max": 500000 },
          { "component": "Refinery Process Protection", "min": 200000, "max": 400000 },
          { "component": "Supply Chain Monitoring", "min": 100000, "max": 200000 }
        ],
        "next_steps": [
          "Pharmaceutical supply chain mapping",
          "Petrochemical facility risk assessment",
          "Pipeline security integration plan"
        ]
      },
      {
        "id": "DNSO-005",
        "title": "Energy Storage Battery Security for Hospitals",
        "sector": "Energy",
        "subsector": "Energy Storage",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 500000,
        "roi_max": 1000000,
        "risk_prevention": "$20M+ battery investment + fire safety",
        "expertise_tags": ["Battery Systems", "Energy Storage", "Grid Storage", "Fire Safety"],
        "competitive_advantage": "We design and install large-scale battery systems for healthcare facilities",
        "urgency_factor": "Hospital battery systems vulnerable to thermal runaway cyber attacks",
        "implementation_time": "4-6 months",
        "target_client_size": "Medium-Large Healthcare",
        "geography": "Global",
        "description": "Protect hospital battery energy storage systems from cyber attacks that could cause thermal runaway, fires, or power system failures.",
        "why_matters": [
          "Fire Safety Risk: Cyber attacks can trigger battery thermal runaway causing facility fires",
          "Emergency Power Protection: Battery systems provide critical backup during grid failures",
          "Investment Protection: Hospital battery installations worth $20M+ need cybersecurity"
        ],
        "cost_components": [
          { "component": "Battery Management System Security", "min": 125000, "max": 250000 },
          { "component": "Thermal Monitoring Integration", "min": 100000, "max": 200000 },
          { "component": "Fire Safety System Protection", "min": 150000, "max": 300000 },
          { "component": "Grid Integration Security", "min": 125000, "max": 250000 }
        ],
        "next_steps": [
          "Battery system vulnerability assessment",
          "Fire safety integration review",
          "Emergency power continuity testing"
        ]
      },

      // CHEMICAL/PHARMACEUTICAL SECTOR - Leveraging chemical plant expertise
      {
        "id": "DNSO-006",
        "title": "Pharmaceutical Manufacturing Process Security",
        "sector": "Chemical/Pharmaceutical",
        "subsector": "Drug Manufacturing",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 900000,
        "roi_max": 1800000,
        "risk_prevention": "$10B+ contamination liability + drug supply protection",
        "expertise_tags": ["Pharmaceutical Plants", "GMP Compliance", "Process Control", "Drug Safety"],
        "competitive_advantage": "We build the pharmaceutical plants that produce medications used by healthcare systems",
        "urgency_factor": "Drug contamination through cyber attacks can kill thousands of patients",
        "implementation_time": "8-12 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Secure pharmaceutical manufacturing processes to prevent drug contamination, ensure supply continuity, and maintain FDA compliance.",
        "why_matters": [
          "Drug Safety Critical: Cyber attacks can alter drug formulations causing patient deaths",
          "Supply Chain Protection: Manufacturing disruptions create life-threatening drug shortages",
          "FDA Compliance: Cyber incidents trigger immediate FDA investigations and plant shutdowns"
        ],
        "cost_components": [
          { "component": "Manufacturing Process Security Assessment", "min": 250000, "max": 500000 },
          { "component": "Pharmaceutical Supply Chain Protection", "min": 300000, "max": 600000 },
          { "component": "GMP-Compliant Security Controls", "min": 200000, "max": 400000 },
          { "component": "Drug Safety Monitoring Integration", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "FDA compliance security review",
          "Manufacturing process vulnerability scan",
          "Drug safety monitoring integration"
        ]
      },
      {
        "id": "DNSO-007",
        "title": "Chemical Precursor Security for Medical Supplies",
        "sector": "Chemical/Pharmaceutical",
        "subsector": "Chemical Processing",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 700000,
        "roi_max": 1400000,
        "risk_prevention": "$50M+ medical supply disruption",
        "expertise_tags": ["Chemical Plants", "Process Safety", "Hazmat Handling", "Supply Chain"],
        "competitive_advantage": "We design chemical plants producing precursors for medical devices and supplies",
        "urgency_factor": "Medical supply shortages from chemical plant cyber attacks",
        "implementation_time": "6-9 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Protect chemical plants producing precursors for medical supplies, PPE, and medical devices used in healthcare.",
        "why_matters": [
          "Medical Supply Dependency: Healthcare depends on chemical precursors for critical supplies",
          "Process Safety Risk: Cyber attacks can cause chemical releases threatening communities",
          "Supply Chain Resilience: Chemical plant disruptions affect entire healthcare supply chain"
        ],
        "cost_components": [
          { "component": "Chemical Plant Security Assessment", "min": 200000, "max": 400000 },
          { "component": "Process Control System Protection", "min": 250000, "max": 500000 },
          { "component": "Hazmat Safety Integration", "min": 150000, "max": 300000 },
          { "component": "Supply Chain Monitoring", "min": 100000, "max": 200000 }
        ],
        "next_steps": [
          "Chemical precursor supply mapping",
          "Process safety system review",
          "Emergency response integration"
        ]
      },
      {
        "id": "DNSO-008",
        "title": "Laboratory Chemical Supply Security",
        "sector": "Chemical/Pharmaceutical",
        "subsector": "Laboratory Chemicals",
        "client_type": "Healthcare",
        "priority": "Medium",
        "roi_min": 400000,
        "roi_max": 800000,
        "risk_prevention": "$15M+ laboratory operation disruption",
        "expertise_tags": ["Laboratory Design", "Chemical Storage", "Research Facilities", "Quality Control"],
        "competitive_advantage": "We build research laboratories and understand chemical storage and handling requirements",
        "urgency_factor": "Laboratory testing essential for patient diagnosis and treatment",
        "implementation_time": "4-6 months",
        "target_client_size": "Medium-Large Healthcare",
        "geography": "Global",
        "description": "Secure chemical supply chains for hospital laboratories, ensuring availability of reagents and testing chemicals.",
        "why_matters": [
          "Diagnostic Testing Impact: Chemical shortages halt laboratory testing affecting patient care",
          "Research Continuity: Clinical research depends on specialized chemical supplies",
          "Quality Assurance: Contaminated chemicals compromise test results and patient safety"
        ],
        "cost_components": [
          { "component": "Laboratory Supply Chain Security", "min": 100000, "max": 200000 },
          { "component": "Chemical Storage System Protection", "min": 150000, "max": 300000 },
          { "component": "Quality Control Integration", "min": 100000, "max": 200000 },
          { "component": "Research Continuity Planning", "min": 50000, "max": 100000 }
        ],
        "next_steps": [
          "Laboratory chemical inventory assessment",
          "Supply chain vulnerability analysis",
          "Quality control system review"
        ]
      },
      {
        "id": "DNSO-009",
        "title": "Fertilizer Plant Security for Food Safety",
        "sector": "Chemical/Pharmaceutical",
        "subsector": "Fertilizers",
        "client_type": "Healthcare",
        "priority": "Medium",
        "roi_min": 600000,
        "roi_max": 1200000,
        "risk_prevention": "$30M+ food supply impact on public health",
        "expertise_tags": ["Fertilizer Plants", "Agricultural Chemistry", "Food Safety", "Public Health"],
        "competitive_advantage": "We build fertilizer plants that impact food safety and public health outcomes",
        "urgency_factor": "Food contamination from fertilizer plant cyber attacks affects population health",
        "implementation_time": "6-8 months",
        "target_client_size": "Public Health Agencies",
        "geography": "Global",
        "description": "Secure fertilizer manufacturing to prevent contamination that could affect food safety and public health.",
        "why_matters": [
          "Public Health Impact: Contaminated fertilizers cause widespread foodborne illness",
          "Healthcare System Burden: Food safety incidents overwhelm healthcare capacity",
          "Agricultural Security: Food supply disruption affects population health outcomes"
        ],
        "cost_components": [
          { "component": "Fertilizer Plant Security Assessment", "min": 150000, "max": 300000 },
          { "component": "Agricultural Supply Chain Protection", "min": 200000, "max": 400000 },
          { "component": "Food Safety Monitoring Integration", "min": 150000, "max": 300000 },
          { "component": "Public Health Coordination", "min": 100000, "max": 200000 }
        ],
        "next_steps": [
          "Food safety impact assessment",
          "Agricultural supply chain mapping",
          "Public health coordination planning"
        ]
      },
      {
        "id": "DNSO-010",
        "title": "Polymer Medical Device Material Security",
        "sector": "Chemical/Pharmaceutical",
        "subsector": "Polymers",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 800000,
        "roi_max": 1600000,
        "risk_prevention": "$75M+ medical device supply disruption",
        "expertise_tags": ["Polymer Plants", "Medical Polymers", "Device Manufacturing", "Material Science"],
        "competitive_advantage": "We build polymer plants producing materials for medical devices and implants",
        "urgency_factor": "Medical device shortages from polymer supply disruption",
        "implementation_time": "6-10 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Protect polymer manufacturing facilities producing materials for medical devices, implants, and disposable medical supplies.",
        "why_matters": [
          "Medical Device Dependency: Healthcare devices require specialized medical-grade polymers",
          "Implant Safety: Contaminated polymers in implants cause patient harm and liability",
          "Supply Chain Criticality: Limited polymer sources create single points of failure"
        ],
        "cost_components": [
          { "component": "Polymer Plant Security Assessment", "min": 200000, "max": 400000 },
          { "component": "Medical Grade Material Protection", "min": 250000, "max": 500000 },
          { "component": "Device Manufacturing Integration", "min": 200000, "max": 400000 },
          { "component": "Quality Assurance Monitoring", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Medical polymer supply chain analysis",
          "Device manufacturer coordination",
          "Quality control system integration"
        ]
      },

      // GOVERNMENT/DEFENSE SECTOR - Leveraging defense contracting expertise
      {
        "id": "DNSO-011",
        "title": "Military-Grade Healthcare Infrastructure Security",
        "sector": "Government/Defense",
        "subsector": "Military Infrastructure",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 1400000,
        "roi_max": 2800000,
        "risk_prevention": "Nation-state attack prevention + $100M+ federal funding",
        "expertise_tags": ["Military Infrastructure", "Defense Contracting", "Security Clearance", "NIST 800-53"],
        "competitive_advantage": "We build military installations and understand defense-grade security requirements",
        "urgency_factor": "Healthcare infrastructure designated as critical national security asset",
        "implementation_time": "12-18 months",
        "target_client_size": "Major Healthcare Systems",
        "geography": "North America",
        "description": "Implement defense-grade cybersecurity controls for healthcare infrastructure to protect against nation-state threats.",
        "why_matters": [
          "Nation-State Targeting: Foreign governments explicitly target healthcare for social disruption",
          "Critical Infrastructure Status: Hospitals designated critical infrastructure under DHS directives",
          "Federal Integration: Emergency response requires compatibility with military medical systems"
        ],
        "cost_components": [
          { "component": "Defense-Grade Security Assessment", "min": 300000, "max": 600000 },
          { "component": "Military-Standard Controls Implementation", "min": 500000, "max": 1000000 },
          { "component": "Nation-State Threat Protection", "min": 400000, "max": 800000 },
          { "component": "Federal Emergency System Integration", "min": 200000, "max": 400000 }
        ],
        "next_steps": [
          "Security clearance verification",
          "Nation-state threat assessment",
          "Federal integration requirements review"
        ]
      },
      {
        "id": "DNSO-012",
        "title": "Defense Logistics Healthcare Supply Security",
        "sector": "Government/Defense",
        "subsector": "Military Logistics",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 1000000,
        "roi_max": 2000000,
        "risk_prevention": "$200M+ defense medical supply protection",
        "expertise_tags": ["Military Logistics", "Defense Supply Chain", "Strategic Materials", "ITAR Compliance"],
        "competitive_advantage": "We manage defense logistics and understand military supply chain security",
        "urgency_factor": "Military medical supplies essential for civilian healthcare during emergencies",
        "implementation_time": "10-15 months",
        "target_client_size": "Major Healthcare Systems",
        "geography": "North America",
        "description": "Secure defense logistics networks that supply critical medical equipment to civilian healthcare during emergencies.",
        "why_matters": [
          "Emergency Medical Supply: Military stockpiles supplement civilian healthcare during crises",
          "Strategic Material Protection: Defense medical supplies are national security assets",
          "Dual-Use Technology: Military medical innovations require export control compliance"
        ],
        "cost_components": [
          { "component": "Defense Supply Chain Security", "min": 250000, "max": 500000 },
          { "component": "Military Medical Equipment Protection", "min": 300000, "max": 600000 },
          { "component": "ITAR Compliance Integration", "min": 200000, "max": 400000 },
          { "component": "Strategic Reserve Monitoring", "min": 250000, "max": 500000 }
        ],
        "next_steps": [
          "Defense supply chain mapping",
          "ITAR compliance assessment",
          "Strategic reserve integration planning"
        ]
      },

      // INFRASTRUCTURE SECTOR - Leveraging construction expertise
      {
        "id": "DNSO-013",
        "title": "Smart Hospital Construction Cybersecurity",
        "sector": "Infrastructure",
        "subsector": "Hospital Construction",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 1500000,
        "roi_max": 3000000,
        "risk_prevention": "$1B+ construction investment + 50-year viability",
        "expertise_tags": ["Hospital Construction", "Smart Buildings", "IoT Infrastructure", "BIM Integration"],
        "competitive_advantage": "We build hospitals from ground up with security-by-design that others cannot retrofit",
        "urgency_factor": "New hospital construction must include embedded cybersecurity or become obsolete",
        "implementation_time": "18-36 months",
        "target_client_size": "Major Healthcare Systems",
        "geography": "Global",
        "description": "Integrate cybersecurity into new hospital construction with security-by-design for 50-year operational viability.",
        "why_matters": [
          "Investment Protection: Hospital construction investments of $1B+ must last 50+ years",
          "Security-by-Design: Retrofitting security costs 10x more than built-in protection",
          "Future-Proof Technology: Embedded security ensures long-term operational viability"
        ],
        "cost_components": [
          { "component": "Security-by-Design Architecture", "min": 400000, "max": 800000 },
          { "component": "Smart Building Security Integration", "min": 600000, "max": 1200000 },
          { "component": "IoT Infrastructure Hardening", "min": 300000, "max": 600000 },
          { "component": "Future-Proof Security Framework", "min": 200000, "max": 400000 }
        ],
        "next_steps": [
          "Construction project security requirements",
          "Smart building integration planning",
          "50-year security roadmap development"
        ]
      },
      {
        "id": "DNSO-014",
        "title": "Transportation Infrastructure Medical Emergency Security",
        "sector": "Infrastructure",
        "subsector": "Transportation",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 800000,
        "roi_max": 1600000,
        "risk_prevention": "$100M+ emergency response capability",
        "expertise_tags": ["Airport Construction", "Road Infrastructure", "Emergency Services", "Transportation Security"],
        "competitive_advantage": "We build airports and transportation infrastructure critical for medical emergencies",
        "urgency_factor": "Medical emergencies depend on secure transportation infrastructure",
        "implementation_time": "8-12 months",
        "target_client_size": "Regional Healthcare Networks",
        "geography": "Global",
        "description": "Secure transportation infrastructure systems that support medical emergency response and patient transport.",
        "why_matters": [
          "Emergency Response: Medical emergencies require secure transportation coordination",
          "Patient Transport: Air medical services depend on airport infrastructure security",
          "Mass Casualty Events: Transportation systems must remain operational during emergencies"
        ],
        "cost_components": [
          { "component": "Transportation Security Assessment", "min": 200000, "max": 400000 },
          { "component": "Emergency Response Integration", "min": 250000, "max": 500000 },
          { "component": "Air Medical Service Protection", "min": 200000, "max": 400000 },
          { "component": "Mass Casualty Coordination", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Emergency response coordination assessment",
          "Transportation security integration review",
          "Mass casualty preparedness planning"
        ]
      },
      {
        "id": "DNSO-015",
        "title": "Water Infrastructure Healthcare Dependency Security",
        "sector": "Infrastructure",
        "subsector": "Water Systems",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 1000000,
        "roi_max": 2000000,
        "risk_prevention": "$500M+ water system dependency + patient safety",
        "expertise_tags": ["Water Treatment", "Infrastructure Systems", "Public Health", "Utility Security"],
        "competitive_advantage": "We build water treatment facilities that hospitals depend on for operations",
        "urgency_factor": "Hospital operations require secure water supply for patient care and sterilization",
        "implementation_time": "10-15 months",
        "target_client_size": "Regional Healthcare Systems",
        "geography": "Global",
        "description": "Secure water infrastructure systems that hospitals depend on for patient care, sterilization, and emergency operations.",
        "why_matters": [
          "Patient Care Dependency: Hospitals require secure water for dialysis, surgery, and patient care",
          "Sterilization Requirements: Medical equipment sterilization depends on water quality and availability",
          "Emergency Operations: Hospital emergency response requires guaranteed water supply"
        ],
        "cost_components": [
          { "component": "Water Infrastructure Security Assessment", "min": 250000, "max": 500000 },
          { "component": "Hospital Water System Protection", "min": 300000, "max": 600000 },
          { "component": "Emergency Water Supply Security", "min": 200000, "max": 400000 },
          { "component": "Water Quality Monitoring Integration", "min": 250000, "max": 500000 }
        ],
        "next_steps": [
          "Hospital water dependency analysis",
          "Water treatment facility security review",
          "Emergency water supply planning"
        ]
      },

      // TECHNOLOGY/MANUFACTURING SECTOR - Leveraging tech facility expertise  
      {
        "id": "DNSO-016",
        "title": "Medical Device Manufacturing Cybersecurity",
        "sector": "Technology",
        "subsector": "Medical Device Production",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 900000,
        "roi_max": 1800000,
        "risk_prevention": "Unlimited liability + $50M+ recall costs + $100M+ revenue",
        "expertise_tags": ["Manufacturing Plants", "Medical Devices", "Quality Control", "FDA Compliance"],
        "competitive_advantage": "We build the factories that manufacture medical devices used in healthcare",
        "urgency_factor": "Medical device tampering during manufacturing can harm thousands of patients",
        "implementation_time": "8-12 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Secure medical device manufacturing to prevent firmware tampering, ensure device integrity, and maintain FDA compliance.",
        "why_matters": [
          "Device Integrity: Cyber attacks during manufacturing can embed malicious code in medical devices",
          "Patient Safety: Compromised devices can directly harm patients and create unlimited liability",
          "FDA Compliance: Device security vulnerabilities can trigger immediate FDA recalls"
        ],
        "cost_components": [
          { "component": "Medical Device Manufacturing Security", "min": 200000, "max": 400000 },
          { "component": "Firmware Integrity Protection", "min": 300000, "max": 600000 },
          { "component": "Quality Control Integration", "min": 250000, "max": 500000 },
          { "component": "FDA Compliance Monitoring", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Medical device manufacturing security review",
          "Firmware integrity assessment",
          "FDA compliance gap analysis"
        ]
      },
      {
        "id": "DNSO-017",
        "title": "Semiconductor Fab Security for Medical Electronics",
        "sector": "Technology",
        "subsector": "Semiconductor Manufacturing",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 1200000,
        "roi_max": 2400000,
        "risk_prevention": "$500M+ semiconductor supply + device security",
        "expertise_tags": ["Semiconductor Fabs", "Medical Electronics", "Chip Security", "Supply Chain"],
        "competitive_advantage": "We build semiconductor fabrication facilities that produce chips for medical devices",
        "urgency_factor": "Medical devices depend on secure semiconductors for patient safety",
        "implementation_time": "12-18 months",
        "target_client_size": "Medical Device Manufacturers",
        "geography": "Global",
        "description": "Secure semiconductor manufacturing for medical electronics to prevent hardware trojans and ensure device security.",
        "why_matters": [
          "Hardware Security: Medical device semiconductors must be free from hardware trojans",
          "Supply Chain Trust: Secure semiconductor supply essential for medical device integrity",
          "Nation-State Threats: Foreign adversaries target semiconductor supply chains"
        ],
        "cost_components": [
          { "component": "Semiconductor Fab Security Assessment", "min": 300000, "max": 600000 },
          { "component": "Medical Electronics Protection", "min": 400000, "max": 800000 },
          { "component": "Hardware Trojan Prevention", "min": 300000, "max": 600000 },
          { "component": "Supply Chain Verification", "min": 200000, "max": 400000 }
        ],
        "next_steps": [
          "Semiconductor supply chain analysis",
          "Hardware security assessment",
          "Medical electronics security review"
        ]
      },
      {
        "id": "DNSO-018",
        "title": "Data Center Security for Healthcare Cloud",
        "sector": "Technology",
        "subsector": "Data Centers",
        "client_type": "Healthcare",
        "priority": "Critical",
        "roi_min": 1100000,
        "roi_max": 2200000,
        "risk_prevention": "$500M+ data center investment + patient data protection",
        "expertise_tags": ["Data Center Construction", "Cloud Infrastructure", "Physical Security", "HIPAA Compliance"],
        "competitive_advantage": "We build the data centers that host healthcare cloud infrastructure and patient data",
        "urgency_factor": "Healthcare data migration to cloud creates massive cybersecurity requirements",
        "implementation_time": "8-14 months",
        "target_client_size": "Large Healthcare Systems",
        "geography": "Global",
        "description": "Secure data center infrastructure hosting healthcare cloud services and patient data with integrated physical-cyber security.",
        "why_matters": [
          "Patient Data Protection: Healthcare data centers store millions of patient records requiring maximum security",
          "Cloud Migration Risk: Healthcare cloud adoption creates new attack vectors and compliance requirements",
          "Physical-Cyber Integration: Data centers need integrated physical and cybersecurity that traditional IT vendors cannot provide"
        ],
        "cost_components": [
          { "component": "Data Center Physical-Cyber Security", "min": 300000, "max": 600000 },
          { "component": "Healthcare Cloud Infrastructure Protection", "min": 400000, "max": 800000 },
          { "component": "HIPAA Compliance Integration", "min": 250000, "max": 500000 },
          { "component": "Patient Data Security Monitoring", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Healthcare cloud security assessment",
          "HIPAA compliance gap analysis",
          "Physical-cyber security integration planning"
        ]
      },
      {
        "id": "DNSO-019",
        "title": "5G Network Infrastructure for Healthcare IoT",
        "sector": "Technology",
        "subsector": "Telecommunications",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 900000,
        "roi_max": 1800000,
        "risk_prevention": "$300M+ 5G healthcare infrastructure investment",
        "expertise_tags": ["5G Networks", "Healthcare IoT", "Network Infrastructure", "Edge Computing"],
        "competitive_advantage": "We build 5G network infrastructure enabling next-generation healthcare IoT and telemedicine",
        "urgency_factor": "5G healthcare applications create new attack vectors requiring specialized security",
        "implementation_time": "8-12 months",
        "target_client_size": "Regional Healthcare Networks",
        "geography": "Global",
        "description": "Secure 5G network infrastructure supporting healthcare IoT, telemedicine, and real-time patient monitoring systems.",
        "why_matters": [
          "Healthcare IoT Enablement: 5G networks enable critical healthcare IoT applications and remote monitoring",
          "Telemedicine Security: 5G telemedicine requires ultra-low latency and high security for patient care",
          "Edge Computing Risk: 5G edge computing in healthcare creates new cybersecurity challenges"
        ],
        "cost_components": [
          { "component": "5G Healthcare Network Security", "min": 250000, "max": 500000 },
          { "component": "Healthcare IoT Protection", "min": 200000, "max": 400000 },
          { "component": "Telemedicine Security Integration", "min": 250000, "max": 500000 },
          { "component": "Edge Computing Security", "min": 200000, "max": 400000 }
        ],
        "next_steps": [
          "5G healthcare network assessment",
          "IoT security framework development",
          "Telemedicine security planning"
        ]
      },
      {
        "id": "DNSO-020",
        "title": "Industrial Automation Security for Medical Manufacturing",
        "sector": "Technology",
        "subsector": "Industrial Automation",
        "client_type": "Manufacturing",
        "priority": "High",
        "roi_min": 700000,
        "roi_max": 1400000,
        "risk_prevention": "$200M+ manufacturing automation investment",
        "expertise_tags": ["Industrial Automation", "Manufacturing Systems", "Robotics", "Process Control"],
        "competitive_advantage": "We design and implement industrial automation systems for medical manufacturing facilities",
        "urgency_factor": "Automated medical manufacturing vulnerable to cyber attacks affecting drug and device production",
        "implementation_time": "6-10 months",
        "target_client_size": "Medical Manufacturing",
        "geography": "Global",
        "description": "Secure industrial automation systems used in medical device and pharmaceutical manufacturing to prevent production disruption.",
        "why_matters": [
          "Manufacturing Continuity: Automated systems control critical medical manufacturing processes",
          "Product Quality: Cyber attacks on automation can compromise medical product quality and safety",
          "Production Security: Industrial automation systems require specialized OT cybersecurity expertise"
        ],
        "cost_components": [
          { "component": "Industrial Automation Security Assessment", "min": 175000, "max": 350000 },
          { "component": "Manufacturing Process Protection", "min": 200000, "max": 400000 },
          { "component": "Robotics Security Integration", "min": 175000, "max": 350000 },
          { "component": "Process Control Monitoring", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Manufacturing automation security review",
          "Robotics security assessment",
          "Process control system hardening"
        ]
      },

      // MANUFACTURING SECTOR - Leveraging automotive and aerospace expertise
      {
        "id": "DNSO-021",
        "title": "Automotive Manufacturing for Medical Transport Security",
        "sector": "Manufacturing",
        "subsector": "Automotive",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 800000,
        "roi_max": 1600000,
        "risk_prevention": "$100M+ medical transport vehicle safety",
        "expertise_tags": ["Automotive Plants", "Vehicle Security", "Medical Transport", "Connected Vehicles"],
        "competitive_advantage": "We build automotive plants manufacturing ambulances and medical transport vehicles",
        "urgency_factor": "Connected medical vehicles vulnerable to cyber attacks during patient transport",
        "implementation_time": "6-10 months",
        "target_client_size": "Emergency Medical Services",
        "geography": "Global",
        "description": "Secure automotive manufacturing for medical transport vehicles including ambulances, medical helicopters, and patient transport systems.",
        "why_matters": [
          "Patient Transport Safety: Cyber attacks on medical vehicles can endanger patients during transport",
          "Emergency Response: Ambulances and medical helicopters require secure communication systems",
          "Connected Vehicle Risk: Medical transport vehicles increasingly connected and vulnerable"
        ],
        "cost_components": [
          { "component": "Medical Vehicle Manufacturing Security", "min": 200000, "max": 400000 },
          { "component": "Connected Vehicle Protection", "min": 250000, "max": 500000 },
          { "component": "Emergency Communication Security", "min": 200000, "max": 400000 },
          { "component": "Patient Transport Safety Integration", "min": 150000, "max": 300000 }
        ],
        "next_steps": [
          "Medical vehicle manufacturing assessment",
          "Connected vehicle security review",
          "Emergency communication integration"
        ]
      },
      {
        "id": "DNSO-022",
        "title": "Aerospace Medical Equipment Manufacturing Security",
        "sector": "Manufacturing",
        "subsector": "Aerospace",
        "client_type": "Healthcare",
        "priority": "High",
        "roi_min": 1000000,
        "roi_max": 2000000,
        "risk_prevention": "$200M+ aerospace medical equipment investment",
        "expertise_tags": ["Aerospace Manufacturing", "Medical Equipment", "Precision Manufacturing", "Quality Assurance"],
        "competitive_advantage": "We manufacture aerospace-grade medical equipment requiring highest precision and reliability",
        "urgency_factor": "Aerospace-grade medical equipment essential for critical care and surgery",
        "implementation_time": "10-15 months",
        "target_client_size": "Major Medical Centers",
        "geography": "Global",
        "description": "Secure aerospace manufacturing processes for medical equipment requiring aerospace-level precision and reliability.",
        "why_matters": [
          "Precision Requirements: Medical equipment requires aerospace-level precision manufacturing",
          "Life Support Systems: Aerospace medical equipment supports critical patient care",
          "Quality Assurance: Manufacturing defects in aerospace medical equipment can be fatal"
        ],
        "cost_components": [
          { "component": "Aerospace Manufacturing Security", "min": 300000, "max": 600000 },
          { "component": "Medical Equipment Protection", "min": 350000, "max": 700000 },
          { "component": "Precision Manufacturing Quality Control", "min": 250000, "max": 500000 },
          { "component": "Regulatory Compliance Integration", "min": 100000, "max": 200000 }
        ],
        "next_steps": [
          "Aerospace medical equipment assessment",
          "Precision manufacturing security review",
          "Quality control system integration"
        ]
      },

      // FINANCIAL SERVICES - New sector leveraging project finance expertise
      {
        "id": "DNSO-023",
        "title": "Healthcare Infrastructure Investment Security",
        "sector": "Financial Services",
        "subsector": "Project Finance",
        "client_type": "Financial Services",
        "priority": "High",
        "roi_min": 1500000,
        "roi_max": 3000000,
        "risk_prevention": "$5B+ healthcare infrastructure investment protection",
        "expertise_tags": ["Project Finance", "Infrastructure Investment", "Risk Management", "Asset Protection"],
        "competitive_advantage": "We finance and build healthcare infrastructure projects worth billions globally",
        "urgency_factor": "Healthcare infrastructure investments vulnerable to cyber threats affecting ROI",
        "implementation_time": "12-18 months",
        "target_client_size": "Investment Banks, Private Equity",
        "geography": "Global",
        "description": "Protect healthcare infrastructure investments through comprehensive cybersecurity due diligence and risk management.",
        "why_matters": [
          "Investment Protection: Healthcare infrastructure projects worth $5B+ need cybersecurity protection",
          "Due Diligence Requirements: Cyber risks increasingly important in investment decisions",
          "Asset Value Protection: Cyber incidents can destroy billions in asset value overnight"
        ],
        "cost_components": [
          { "component": "Cybersecurity Due Diligence", "min": 400000, "max": 800000 },
          { "component": "Investment Risk Assessment", "min": 500000, "max": 1000000 },
          { "component": "Asset Protection Planning", "min": 400000, "max": 800000 },
          { "component": "Ongoing Risk Monitoring", "min": 200000, "max": 400000 }
        ],
        "next_steps": [
          "Healthcare investment portfolio analysis",
          "Cyber risk assessment framework",
          "Investment protection strategy development"
        ]
      },
      {
        "id": "DNSO-024",
        "title": "Critical Infrastructure Finance Cybersecurity",
        "sector": "Financial Services",
        "subsector": "Infrastructure Finance",
        "client_type": "Financial Services",
        "priority": "Critical",
        "roi_min": 2000000,
        "roi_max": 4000000,
        "risk_prevention": "$10B+ critical infrastructure investment protection",
        "expertise_tags": ["Infrastructure Finance", "Critical Infrastructure", "Cyber Insurance", "Risk Assessment"],
        "competitive_advantage": "We finance critical infrastructure projects and understand both construction and cyber risks",
        "urgency_factor": "Critical infrastructure investments increasingly targeted by nation-state cyber attacks",
        "implementation_time": "15-24 months",
        "target_client_size": "Infrastructure Investment Funds",
        "geography": "Global",
        "description": "Comprehensive cybersecurity solutions for critical infrastructure financing including energy, water, and transportation projects.",
        "why_matters": [
          "National Security Impact: Critical infrastructure finance affects national security and economic stability",
          "Regulatory Compliance: Infrastructure financing requires enhanced cybersecurity due diligence",
          "Investment Risk Management: Cyber attacks can cause complete loss of infrastructure investments"
        ],
        "cost_components": [
          { "component": "Critical Infrastructure Cyber Assessment", "min": 600000, "max": 1200000 },
          { "component": "Nation-State Threat Analysis", "min": 500000, "max": 1000000 },
          { "component": "Investment Protection Framework", "min": 600000, "max": 1200000 },
          { "component": "Regulatory Compliance Integration", "min": 300000, "max": 600000 }
        ],
        "next_steps": [
          "Critical infrastructure investment analysis",
          "Nation-state threat assessment",
          "Investment protection framework development"
        ]
      },

      // ADDITIONAL HIGH-VALUE DNSOs
      {
        "id": "DNSO-025",
        "title": "Mining Operations Medical Material Security",
        "sector": "Infrastructure",
        "subsector": "Mining",
        "client_type": "Healthcare",
        "priority": "Medium",
        "roi_min": 600000,
        "roi_max": 1200000,
        "risk_prevention": "$50M+ medical material supply disruption",
        "expertise_tags": ["Mining Operations", "Mineral Processing", "Material Supply", "Strategic Materials"],
        "competitive_advantage": "We develop mining operations that extract materials for medical devices and equipment",
        "urgency_factor": "Medical devices require rare earth elements and specialized materials from mining",
        "implementation_time": "8-12 months",
        "target_client_size": "Healthcare Supply Chain",
        "geography": "Global",
        "description": "Secure mining operations that extract materials essential for medical devices, equipment, and pharmaceuticals.",
        "why_matters": [
          "Material Dependency: Medical devices require rare earth elements and specialized metals",
          "Supply Chain Security: Mining disruptions affect global medical device production",
          "Strategic Material Access: Critical materials for medical technology require secure supply"
        ],
        "cost_components": [
          { "component": "Mining Operation Security Assessment", "min": 150000, "max": 300000 },
          { "component": "Medical Material Supply Protection", "min": 200000, "max": 400000 },
          { "component": "Strategic Material Monitoring", "min": 150000, "max": 300000 },
          { "component": "Supply Chain Integration", "min": 100000, "max": 200000 }
        ],
        "next_steps": [
          "Medical material supply chain mapping",
          "Mining operation security review",
          "Strategic material availability assessment"
        ]
      }
    ]
  }
};

export const generateStats = () => {
  const dnsos = dnsoData.dnso_database.dnsos;
  const totalROI = dnsos.reduce((acc, dnso) => ({
    min: acc.min + dnso.roi_min,
    max: acc.max + dnso.roi_max
  }), { min: 0, max: 0 });

  const averageROI = {
    min: Math.round(totalROI.min / dnsos.length),
    max: Math.round(totalROI.max / dnsos.length)
  };

  const sectors = [...new Set(dnsos.map(dnso => dnso.sector))];
  const priorities = [...new Set(dnsos.map(dnso => dnso.priority))];
  
  const sectorStats = sectors.map(sector => {
    const sectorDNSOs = dnsos.filter(dnso => dnso.sector === sector);
    const sectorROI = sectorDNSOs.reduce((acc, dnso) => ({
      min: acc.min + dnso.roi_min,
      max: acc.max + dnso.roi_max
    }), { min: 0, max: 0 });
    
    return {
      sector,
      count: sectorDNSOs.length,
      roi: sectorROI,
      averageROI: {
        min: Math.round(sectorROI.min / sectorDNSOs.length),
        max: Math.round(sectorROI.max / sectorDNSOs.length)
      }
    };
  });

  const priorityStats = priorities.map(priority => {
    const priorityDNSOs = dnsos.filter(dnso => dnso.priority === priority);
    return {
      priority,
      count: priorityDNSOs.length,
      percentage: Math.round((priorityDNSOs.length / dnsos.length) * 100)
    };
  });

  return {
    total_dnsos: dnsos.length,
    total_roi_potential: totalROI,
    sectors_covered: sectors.length,
    average_roi: averageROI,
    sector_breakdown: sectorStats,
    priority_breakdown: priorityStats,
    expertise_tags: [...new Set(dnsos.flatMap(dnso => dnso.expertise_tags))].length,
    geographies: [...new Set(dnsos.map(dnso => dnso.geography))]
  };
};
