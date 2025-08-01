const collegeData = [
  {
    _id: "66aa9f2b1c4d5e7f9a123456",
    name: "Springfield University",
    image:
      "https://i2-prod.cambridge-news.co.uk/news/cambridge-news/article24183175.ece/ALTERNATES/s615/0_JS238376993.jpg",
    galleryImages: [
      "https://example.com/images/graduates-group-2023.jpg",
      "https://example.com/images/commencement-2024.jpg",
      "https://example.com/images/campus-festival-2025.jpg",
    ],
    admissionDates: {
      start: "2025-01-15",
      end: "2025-03-15",
    },
    rating: 4.7,
    events: [
      {
        name: "Annual Science Fair",
        date: "2025-04-10",
        description:
          "Showcasing innovative student projects in AI, robotics, and sustainable energy.",
      },
      {
        name: "Springfield Cultural Fest",
        date: "2025-05-20",
        description:
          "A celebration of diversity with music, food, and performances.",
      },
    ],
    researchHistory: [
      {
        title: "AI-Powered Healthcare Diagnostics",
        authors: ["Dr. Jane Smith", "John Doe"],
        link: "https://example.com/research/ai-healthcare.pdf",
        publicationDate: "2024-06-20",
      },
      {
        title: "Sustainable Energy Solutions for Urban Areas",
        authors: ["Dr. Alan Brown", "Emma Wilson"],
        link: "https://example.com/research/sustainable-energy.pdf",
        publicationDate: "2024-09-10",
      },
    ],
    sports: [
      {
        name: "Basketball",
        description:
          "NCAA Division I team with a state-of-the-art training facility.",
      },
      {
        name: "Soccer",
        description: "Competitive team with access to a 10,000-seat stadium.",
      },
    ],
    admissionProcess:
      "Applicants must submit an online application via the university portal, including academic transcripts, a personal statement, and two recommendation letters. Standardized test scores (SAT/ACT) are optional for 2025 admissions. Interviews may be required for competitive programs.",
    reviews: [
      {
        userId: "66aa9f2b1c4d5e7f9a123457",
        rating: 5,
        comment:
          "Amazing campus with top-notch facilities and supportive faculty!",
        date: "2025-07-10",
      },
      {
        userId: "66aa9f2b1c4d5e7f9a123458",
        rating: 4,
        comment:
          "Great research opportunities, but the admission process is rigorous.",
        date: "2025-07-15",
      },
    ],
    location: "Springfield, Illinois, USA",
    numberOfResearchWorks: 12,
    contact: {
      email: "admissions@springfield.edu",
      phone: "+1-217-555-1234",
      website: "https://springfield.edu",
    },
    facilities: [
      {
        name: "Central Library",
        description:
          "24/7 access with over 50,000 volumes and digital resources.",
      },
      {
        name: "Innovation Lab",
        description:
          "Equipped with 3D printers, VR setups, and AI workstations.",
      },
    ],
    tuition: {
      undergraduate: 28000,
      graduate: 32000,
    },
    programs: [
      {
        name: "Computer Science",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Environmental Science",
        degreeType: "MSc",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/springfielduni",
      twitter: "https://twitter.com/springfielduni",
      instagram: "https://instagram.com/springfielduni",
    },
    enrollment: {
      undergraduate: 6000,
      graduate: 2500,
    },
    campusLocation: {
      address: "Mymensingh, Bangladesh",
      location: {
        lat: 24.7471,
        lng: 90.4203,
      },
    },
  },
  {
    _id: "66ab0c3d2e5f6a8g0b123789",
    name: "Riverview College",
    image:
      "https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg",
    galleryImages: [
      "https://example.com/images/graduates-riverview-2023.jpg",
      "https://example.com/images/riverview-commencement-2024.jpg",
      "https://example.com/images/riverview-campus-event-2025.jpg",
    ],
    admissionDates: {
      start: "2025-02-01",
      end: "2025-04-01",
    },
    rating: 4.3,
    events: [
      {
        name: "Riverview Tech Summit",
        date: "2025-03-25",
        description:
          "A gathering of tech enthusiasts showcasing advancements in cybersecurity and IoT.",
      },
      {
        name: "Arts & Music Festival",
        date: "2025-06-05",
        description:
          "Featuring student performances, art exhibitions, and local bands.",
      },
    ],
    researchHistory: [
      {
        title: "Quantum Computing Applications",
        authors: ["Dr. Emily Chen", "Mark Lee"],
        link: "https://example.com/research/quantum-computing.pdf",
        publicationDate: "2024-08-15",
      },
      {
        title: "Climate Change Mitigation Strategies",
        authors: ["Dr. Sarah Patel", "Lisa Wong"],
        link: "https://example.com/research/climate-strategies.pdf",
        publicationDate: "2024-11-01",
      },
    ],
    sports: [
      {
        name: "Volleyball",
        description:
          "Competitive women’s and men’s teams with indoor and beach facilities.",
      },
      {
        name: "Track and Field",
        description:
          "State-of-the-art track with regional championship hosting capabilities.",
      },
    ],
    admissionProcess:
      "Prospective students must complete an online application, submit high school transcripts, a 500-word essay, and one letter of recommendation. Virtual interviews are available for international applicants. Early decision applications are encouraged.",
    reviews: [
      {
        userId: "66ab0c3d2e5f6a8g0b123790",
        rating: 4,
        comment:
          "Beautiful campus and excellent programs, but parking can be an issue.",
        date: "2025-06-20",
      },
      {
        userId: "66ab0c3d2e5f6a8g0b123791",
        rating: 5,
        comment:
          "The faculty are incredibly supportive, and the tech summit was inspiring!",
        date: "2025-07-01",
      },
    ],
    location: "Portland, Oregon, USA",
    numberOfResearchWorks: 8,
    contact: {
      email: "admissions@riverview.edu",
      phone: "+1-503-555-9876",
      website: "https://riverview.edu",
    },
    facilities: [
      {
        name: "Science Research Center",
        description:
          "Equipped with advanced labs for physics, chemistry, and biology.",
      },
      {
        name: "Performing Arts Theater",
        description:
          "A 500-seat venue for plays, concerts, and guest lectures.",
      },
    ],
    tuition: {
      undergraduate: 26000,
      graduate: 29000,
    },
    programs: [
      {
        name: "Cybersecurity",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Fine Arts",
        degreeType: "BA",
        duration: "4 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/riverviewcollege",
      twitter: "https://twitter.com/riverviewcollege",
      instagram: "https://instagram.com/riverviewcollege",
    },
    enrollment: {
      undergraduate: 4500,
      graduate: 1800,
    },
    campusLocation: {
      address: "Rangpur, Bangladesh",
      location: {
        lat: 25.7465,
        lng: 89.2517,
      },
    },
  },
  {
    _id: "66ab1d4e3f6g7b9h1c234890",
    name: "Harborview Institute",
    image:
      "https://cdn.britannica.com/85/13085-050-C2E88389/Corpus-Christi-College-University-of-Cambridge-England.jpg",
    galleryImages: [
      "https://example.com/images/graduates-harborview-2023.jpg",
      "https://example.com/images/harborview-commencement-2024.jpg",
      "https://example.com/images/harborview-campus-tour-2025.jpg",
    ],
    admissionDates: {
      start: "2025-01-10",
      end: "2025-03-30",
    },
    rating: 4.5,
    events: [
      {
        name: "Harborview Innovation Expo",
        date: "2025-04-15",
        description:
          "A platform for students to present cutting-edge projects in biotechnology and AI.",
      },
      {
        name: "Literary Symposium",
        date: "2025-05-10",
        description:
          "Featuring guest authors, poetry readings, and writing workshops.",
      },
    ],
    researchHistory: [
      {
        title: "Advancements in Biotechnology for Cancer Treatment",
        authors: ["Dr. Michael Carter", "Sophie Kim"],
        link: "https://example.com/research/biotech-cancer.pdf",
        publicationDate: "2024-07-25",
      },
      {
        title: "Machine Learning for Predictive Analytics",
        authors: ["Dr. Laura Evans", "James Park"],
        link: "https://example.com/research/ml-analytics.pdf",
        publicationDate: "2024-10-05",
      },
    ],
    sports: [
      {
        name: "Swimming",
        description: "Olympic-sized pool with a nationally ranked team.",
      },
      {
        name: "Tennis",
        description:
          "Eight professional-grade courts with year-round training programs.",
      },
    ],
    admissionProcess:
      "Applicants are required to submit an online application, including official transcripts, a 750-word personal essay, and three recommendation letters. SAT/ACT scores are optional, but AP/IB scores are considered. Virtual or in-person interviews are mandatory for scholarship candidates.",
    reviews: [
      {
        userId: "66ab1d4e3f6g7b9h1c234891",
        rating: 5,
        comment:
          "The biotech program is phenomenal, and the campus is stunning!",
        date: "2025-06-25",
      },
      {
        userId: "66ab1d4e3f6g7b9h1c234892",
        rating: 4,
        comment:
          "Great academic support, but the dining options could be better.",
        date: "2025-07-05",
      },
    ],
    location: "San Diego, California, USA",
    numberOfResearchWorks: 10,
    contact: {
      email: "admissions@harborview.edu",
      phone: "+1-619-555-4321",
      website: "https://harborview.edu",
    },
    facilities: [
      {
        name: "Biotech Research Lab",
        description:
          "Cutting-edge facility with gene-editing and molecular biology equipment.",
      },
      {
        name: "Student Wellness Center",
        description:
          "Offers counseling, fitness classes, and medical services.",
      },
    ],
    tuition: {
      undergraduate: 27000,
      graduate: 31000,
    },
    programs: [
      {
        name: "Biotechnology",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Creative Writing",
        degreeType: "MFA",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/harborviewinstitute",
      twitter: "https://twitter.com/harborviewinstitute",
      instagram: "https://instagram.com/harborviewinstitute",
    },
    enrollment: {
      undergraduate: 5200,
      graduate: 2000,
    },
    campusLocation: {
      address: "Khulna, Bangladesh",
      location: {
        lat: 22.8456,
        lng: 89.5403,
      },
    },
  },
  {
    _id: "66ab2e5f4g7h8c0i2d345901",
    name: "Crestwood Academy",
    image:
      "https://static.independent.co.uk/2022/06/08/21/3f1c0f46776f76b5a239dfe8096df8f1Y29udGVudHNlYXJjaGFwaSwxNjU0Nzk1MzY2-2.67230106.jpg",
    galleryImages: [
      "https://example.com/images/graduates-crestwood-2023.jpg",
      "https://example.com/images/crestwood-graduation-2024.jpg",
      "https://example.com/images/crestwood-campus-fair-2025.jpg",
    ],
    admissionDates: {
      start: "2025-01-20",
      end: "2025-04-10",
    },
    rating: 4.6,
    events: [
      {
        name: "Crestwood Engineering Symposium",
        date: "2025-03-30",
        description:
          "Students present projects in robotics, renewable energy, and civil engineering.",
      },
      {
        name: "Global Culture Night",
        date: "2025-05-15",
        description:
          "A vibrant event with international cuisine, music, and cultural performances.",
      },
    ],
    researchHistory: [
      {
        title: "Renewable Energy Systems for Rural Communities",
        authors: ["Dr. Robert Hayes", "Aisha Khan"],
        link: "https://example.com/research/renewable-energy.pdf",
        publicationDate: "2024-05-12",
      },
      {
        title: "Neural Networks in Autonomous Vehicles",
        authors: ["Dr. Clara Nguyen", "Samir Patel"],
        link: "https://example.com/research/neural-networks.pdf",
        publicationDate: "2024-12-01",
      },
    ],
    sports: [
      {
        name: "Football",
        description:
          "Competitive team with a 15,000-seat stadium and professional coaching staff.",
      },
      {
        name: "Rowing",
        description:
          "Access to a scenic riverfront for training and competitions.",
      },
    ],
    admissionProcess:
      "Applicants must submit an online application with high school transcripts, a personal statement (600 words), and two letters of recommendation. Standardized tests are optional, but a portfolio is required for engineering programs. Virtual interviews are offered for out-of-state applicants.",
    reviews: [
      {
        userId: "66ab2e5f4g7h8c0i2d345902",
        rating: 5,
        comment:
          "The engineering program is outstanding, and the campus feels like home!",
        date: "2025-06-30",
      },
      {
        userId: "66ab2e5f4g7h8c0i2d345903",
        rating: 4,
        comment:
          "Excellent facilities, but the application process took longer than expected.",
        date: "2025-07-12",
      },
    ],
    location: "Boulder, Colorado, USA",
    numberOfResearchWorks: 15,
    contact: {
      email: "admissions@crestwood.edu",
      phone: "+1-303-555-6789",
      website: "https://crestwood.edu",
    },
    facilities: [
      {
        name: "Engineering Innovation Hub",
        description:
          "State-of-the-art labs for robotics, 3D printing, and material science.",
      },
      {
        name: "Student Recreation Center",
        description: "Features a gym, climbing wall, and indoor pool.",
      },
    ],
    tuition: {
      undergraduate: 29000,
      graduate: 33000,
    },
    programs: [
      {
        name: "Mechanical Engineering",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Data Science",
        degreeType: "MSc",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/crestwoodacademy",
      twitter: "https://twitter.com/crestwoodacademy",
      instagram: "https://instagram.com/crestwoodacademy",
    },
    enrollment: {
      undergraduate: 4800,
      graduate: 2200,
    },
    campusLocation: {
      address: "Barisal, Bangladesh",
      location: {
        lat: 22.701,
        lng: 90.3535,
      },
    },
  },
  {
    _id: "66ab3f6g5h8i9d0j3e456012",
    name: "Maplewood University",
    image:
      "https://www.timeshighereducation.com/student/sites/default/files/cbh_rhul_arch1_0026v1_1_0.jpg",
    galleryImages: [
      "https://example.com/images/graduates-maplewood-2023.jpg",
      "https://example.com/images/maplewood-graduation-2024.jpg",
      "https://example.com/images/maplewood-campus-event-2025.jpg",
    ],
    admissionDates: {
      start: "2025-02-15",
      end: "2025-04-20",
    },
    rating: 4.4,
    events: [
      {
        name: "Maplewood Sustainability Conference",
        date: "2025-04-22",
        description:
          "Exploring eco-friendly solutions with keynote speakers and student-led panels.",
      },
      {
        name: "Winter Arts Gala",
        date: "2025-12-10",
        description:
          "Showcasing student art, theater performances, and musical recitals.",
      },
    ],
    researchHistory: [
      {
        title: "Urban Green Spaces and Mental Health",
        authors: ["Dr. Olivia Grant", "Maya Singh"],
        link: "https://example.com/research/urban-green-spaces.pdf",
        publicationDate: "2024-07-30",
      },
      {
        title: "Blockchain for Secure Voting Systems",
        authors: ["Dr. Ethan Moore", "Liam Chen"],
        link: "https://example.com/research/blockchain-voting.pdf",
        publicationDate: "2024-11-15",
      },
    ],
    sports: [
      {
        name: "Lacrosse",
        description:
          "Competitive team with a dedicated field and professional coaching.",
      },
      {
        name: "Cross Country",
        description: "Scenic trails for training and hosting regional meets.",
      },
    ],
    admissionProcess:
      "Submit an online application with academic transcripts, a 500-word personal statement, and one recommendation letter. SAT/ACT scores are optional. International students must provide proof of English proficiency (TOEFL/IELTS). Virtual interviews are available.",
    reviews: [
      {
        userId: "66ab3f6g5h8i9d0j3e456013",
        rating: 4,
        comment:
          "The sustainability focus is inspiring, but dorms need some upgrades.",
        date: "2025-07-08",
      },
      {
        userId: "66ab3f6g5h8i9d0j3e456014",
        rating: 5,
        comment: "Fantastic arts program and a welcoming community!",
        date: "2025-07-20",
      },
    ],
    location: "Burlington, Vermont, USA",
    numberOfResearchWorks: 9,
    contact: {
      email: "admissions@maplewood.edu",
      phone: "+1-802-555-3456",
      website: "https://maplewood.edu",
    },
    facilities: [
      {
        name: "Eco-Innovation Lab",
        description:
          "Dedicated to sustainability research with solar-powered workstations.",
      },
      {
        name: "Arts Studio Complex",
        description:
          "Spaces for painting, sculpture, and digital media creation.",
      },
    ],
    tuition: {
      undergraduate: 26500,
      graduate: 30000,
    },
    programs: [
      {
        name: "Environmental Studies",
        degreeType: "BA",
        duration: "4 years",
      },
      {
        name: "Digital Media",
        degreeType: "MFA",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/maplewooduni",
      twitter: "https://twitter.com/maplewooduni",
      instagram: "https://instagram.com/maplewooduni",
    },
    enrollment: {
      undergraduate: 4300,
      graduate: 1700,
    },
    campusLocation: {
      address: "Rajshahi, Bangladesh",
      location: {
        lat: 24.3745,
        lng: 88.6042,
      },
    },
  },
  {
    _id: "66ab507h6i9j0e1k4f567123",
    name: "Oakridge College",
    image:
      "https://images.shiksha.com/mediadata/images/articles/1744019588phpVCRWzS.jpeg",
    galleryImages: [
      "https://example.com/images/graduates-oakridge-2023.jpg",
      "https://example.com/images/oakridge-commencement-2024.jpg",
      "https://example.com/images/oakridge-campus-fest-2025.jpg",
    ],
    admissionDates: {
      start: "2025-01-25",
      end: "2025-04-05",
    },
    rating: 4.8,
    events: [
      {
        name: "Oakridge AI Hackathon",
        date: "2025-03-18",
        description:
          "A 48-hour coding competition focused on AI-driven solutions.",
      },
      {
        name: "Spring Wellness Fair",
        date: "2025-04-28",
        description:
          "Promoting mental and physical health with workshops and activities.",
      },
    ],
    researchHistory: [
      {
        title: "Deep Learning for Natural Language Processing",
        authors: ["Dr. Sophia Lin", "Rahul Gupta"],
        link: "https://example.com/research/nlp-deep-learning.pdf",
        publicationDate: "2024-08-10",
      },
      {
        title: "Smart Grid Technologies for Energy Efficiency",
        authors: ["Dr. Henry Walsh", "Anita Desai"],
        link: "https://example.com/research/smart-grid.pdf",
        publicationDate: "2024-10-20",
      },
    ],
    sports: [
      {
        name: "Baseball",
        description:
          "Competitive team with a modern stadium and professional training.",
      },
      {
        name: "Gymnastics",
        description:
          "State-of-the-art facility with nationally recognized coaches.",
      },
    ],
    admissionProcess:
      "Applicants must complete an online application, provide high school transcripts, a 650-word essay, and two recommendation letters. Standardized test scores are optional. A virtual or in-person interview is required for competitive programs.",
    reviews: [
      {
        userId: "66ab507h6i9j0e1k4f567124",
        rating: 5,
        comment:
          "The AI hackathon was a game-changer! Amazing faculty support.",
        date: "2025-07-15",
      },
      {
        userId: "66ab507h6i9j0e1k4f567125",
        rating: 4,
        comment:
          "Great programs, but the campus could use more parking spaces.",
        date: "2025-07-22",
      },
    ],
    location: "Asheville, North Carolina, USA",
    numberOfResearchWorks: 11,
    contact: {
      email: "admissions@oakridge.edu",
      phone: "+1-828-555-7890",
      website: "https://oakridge.edu",
    },
    facilities: [
      {
        name: "AI Research Lab",
        description:
          "Equipped with high-performance GPUs for machine learning projects.",
      },
      {
        name: "Health and Wellness Center",
        description: "Offers yoga classes, counseling, and a modern gym.",
      },
    ],
    tuition: {
      undergraduate: 27500,
      graduate: 31500,
    },
    programs: [
      {
        name: "Artificial Intelligence",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Public Health",
        degreeType: "MPH",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/oakridgecollege",
      twitter: "https://twitter.com/oakridgecollege",
      instagram: "https://instagram.com/oakridgecollege",
    },
    enrollment: {
      undergraduate: 5000,
      graduate: 1900,
    },
    campusLocation: {
      address: "Sylhet, Bangladesh",
      location: {
        lat: 24.89493,
        lng: 91.868706,
      },
    },
  },
  {
    _id: "66ab618i7j0k1f2l5g678234",
    name: "Silverlake University",
    image:
      "https://www.travelandleisure.com/thmb/E5szi7N2r1eN-8b3vkl5STvWz9o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/notre-dame-university-COLLEGECAMP0421-039ce0bfd40b4e429b825c6fb6ebfaa6.jpg",
    galleryImages: [
      "https://example.com/images/graduates-silverlake-2023.jpg",
      "https://example.com/images/silverlake-graduation-2024.jpg",
      "https://example.com/images/silverlake-campus-rally-2025.jpg",
    ],
    admissionDates: {
      start: "2025-02-10",
      end: "2025-04-15",
    },
    rating: 4.5,
    events: [
      {
        name: "Silverlake Data Science Bootcamp",
        date: "2025-03-22",
        description:
          "An intensive workshop on data analytics and visualization techniques.",
      },
      {
        name: "Cultural Heritage Festival",
        date: "2025-05-25",
        description:
          "Celebrating global traditions with food stalls, dances, and art displays.",
      },
    ],
    researchHistory: [
      {
        title: "Big Data Analytics for Urban Planning",
        authors: ["Dr. Amelia Foster", "Vikram Sharma"],
        link: "https://example.com/research/big-data-urban.pdf",
        publicationDate: "2024-06-18",
      },
      {
        title: "Augmented Reality in Education",
        authors: ["Dr. Lucas Reed", "Priya Malhotra"],
        link: "https://example.com/research/ar-education.pdf",
        publicationDate: "2024-09-28",
      },
    ],
    sports: [
      {
        name: "Hockey",
        description:
          "Competitive team with a modern ice rink and regional tournaments.",
      },
      {
        name: "Archery",
        description: "Professional range with coaching for all skill levels.",
      },
    ],
    admissionProcess:
      "Applicants must submit an online application, including transcripts, a 700-word personal essay, and one recommendation letter. Standardized test scores are optional. International applicants require TOEFL/IELTS scores. Interviews are conducted for merit-based scholarships.",
    reviews: [
      {
        userId: "66ab618i7j0k1f2l5g678235",
        rating: 5,
        comment:
          "The data science program is top-tier, and the campus vibe is amazing!",
        date: "2025-07-18",
      },
      {
        userId: "66ab618i7j0k1f2l5g678236",
        rating: 4,
        comment: "Great faculty, but the wifi could be more reliable.",
        date: "2025-07-25",
      },
    ],
    location: "Madison, Wisconsin, USA",
    numberOfResearchWorks: 10,
    contact: {
      email: "admissions@silverlake.edu",
      phone: "+1-608-555-1234",
      website: "https://silverlake.edu",
    },
    facilities: [
      {
        name: "Data Science Lab",
        description:
          "Equipped with cloud computing resources and advanced software.",
      },
      {
        name: "Cultural Arts Center",
        description: "Hosts exhibitions, performances, and community events.",
      },
    ],
    tuition: {
      undergraduate: 28000,
      graduate: 32000,
    },
    programs: [
      {
        name: "Data Science",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Cultural Studies",
        degreeType: "MA",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/silverlakeuni",
      twitter: "https://twitter.com/silverlakeuni",
      instagram: "https://instagram.com/silverlakeuni",
    },
    enrollment: {
      undergraduate: 4600,
      graduate: 2100,
    },
    campusLocation: {
      address: "Chittagong, Bangladesh",
      location: {
        lat: 22.356851,
        lng: 91.783182,
      },
    },
  },
  {
    _id: "66ab729j8k1l2g3m6h789345",
    name: "Pinecrest Institute",
    image:
      "https://static.toiimg.com/thumb/msid-120576896,width-1070,height-580,imgsize-378465,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    galleryImages: [
      "https://example.com/images/graduates-pinecrest-2023.jpg",
      "https://example.com/images/pinecrest-commencement-2024.jpg",
      "https://example.com/images/pinecrest-campus-event-2025.jpg",
    ],
    admissionDates: {
      start: "2025-02-05",
      end: "2025-04-25",
    },
    rating: 4.6,
    events: [
      {
        name: "Pinecrest Robotics Challenge",
        date: "2025-04-12",
        description:
          "A competition for students to design and showcase autonomous robots.",
      },
      {
        name: "Global Health Summit",
        date: "2025-06-08",
        description:
          "Discussions on public health innovations with global experts.",
      },
    ],
    researchHistory: [
      {
        title: "Robotics for Disaster Recovery",
        authors: ["Dr. Thomas Lee", "Nina Patel"],
        link: "https://example.com/research/robotics-disaster.pdf",
        publicationDate: "2024-05-25",
      },
      {
        title: "Epidemiological Modeling for Disease Prevention",
        authors: ["Dr. Rachel Kim", "Omar Hassan"],
        link: "https://example.com/research/epidemiology.pdf",
        publicationDate: "2024-10-10",
      },
    ],
    sports: [
      {
        name: "Soccer",
        description:
          "Competitive team with a modern field and professional coaching.",
      },
      {
        name: "Fencing",
        description: "Dedicated salle with national-level training programs.",
      },
    ],
    admissionProcess:
      "Applicants must submit an online application, including academic transcripts, a 600-word personal essay, and two recommendation letters. Standardized test scores are optional. Virtual interviews are required for health sciences programs.",
    reviews: [
      {
        userId: "66ab729j8k1l2g3m6h789346",
        rating: 5,
        comment:
          "The robotics program is cutting-edge, and the campus is beautiful!",
        date: "2025-07-10",
      },
      {
        userId: "66ab729j8k1l2g3m6h789347",
        rating: 4,
        comment:
          "Great faculty, but the application portal could be more user-friendly.",
        date: "2025-07-20",
      },
    ],
    location: "Santa Fe, New Mexico, USA",
    numberOfResearchWorks: 13,
    contact: {
      email: "admissions@pinecrest.edu",
      phone: "+1-505-555-2345",
      website: "https://pinecrest.edu",
    },
    facilities: [
      {
        name: "Robotics Lab",
        description:
          "Advanced facility with robotic arms and simulation software.",
      },
      {
        name: "Health Sciences Center",
        description:
          "Equipped with medical simulation labs and research facilities.",
      },
    ],
    tuition: {
      undergraduate: 27000,
      graduate: 31000,
    },
    programs: [
      {
        name: "Robotics Engineering",
        degreeType: "BSc",
        duration: "4 years",
      },
      {
        name: "Global Health",
        degreeType: "MPH",
        duration: "2 years",
      },
    ],
    socialMedia: {
      facebook: "https://facebook.com/pinecrestinstitute",
      twitter: "https://twitter.com/pinecrestinstitute",
      instagram: "https://instagram.com/pinecrestinstitute",
    },
    enrollment: {
      undergraduate: 4700,
      graduate: 2000,
    },
    campusLocation: {
      address: "Dhaka, Bangladesh",
      location: {
        lat: 23.7808875,
        lng: 90.2792371,
      },
    },
  },
];
export default collegeData;
