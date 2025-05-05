function getCurriculumByMajor(major) {
    const curricula = {
        "Computer Engineering": {
          "FreshmanYear": {
            "Fall": [
              { "courseNumber": "14:440:101", "courseName": "Introduction to Data-Driven Design for Engineering Applications", "credits": 2, "term": "Fall" },
              { "courseNumber": "01:160:159", "courseName": "General Chemistry for Engineers", "credits": 3, "term": "Fall" },
              { "courseNumber": "01:160:171", "courseName": "Introduction to Experimentation", "credits": 1, "term": "Fall or Spring" },
              { "courseNumber": "01:355:101", "courseName": "College Writing", "credits": 3, "term": "Fall or Spring" },
              { "courseNumber": "01:640:151", "courseName": "Calculus I", "credits": 4, "term": "Fall" },
              { "courseNumber": "01:750:123", "courseName": "Analytical Physics I", "credits": 2, "term": "Fall" },
              { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
              { "courseNumber": "14:440:102", "courseName": "Integrated Data-Driven Design for Engineering Applications", "credits": 2, "term": "Spring" },
              { "courseNumber": "01:160:160", "courseName": "General Chemistry for Engineers II", "credits": 3, "term": "Spring" },
              { "courseNumber": "01:640:152", "courseName": "Calculus II", "credits": 4, "term": "Spring" },
              { "courseNumber": "01:750:124", "courseName": "Analytical Physics IB", "credits": 2, "term": "Spring" },
              { "courseNumber": "14:440:221", "courseName": "Engineering Mechanics: Statics", "credits": 3, "term": "Spring" },
              { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Spring" }
            ]
          },
          "SophomoreYear": {
            "Fall": [
              { "courseNumber": "14:332:221", "courseName": "Principles of Electrical Engineering I", "credits": 3, "term": "Fall" },
              { "courseNumber": "14:332:223", "courseName": "Principles of EE I Lab", "credits": 1, "term": "Fall" },
              { "courseNumber": "14:332:231", "courseName": "Digital Logic Design", "credits": 3, "term": "Fall" },
              { "courseNumber": "14:332:233", "courseName": "Digital Logic Design Lab", "credits": 1, "term": "Fall" },
              { "courseNumber": "01:640:251", "courseName": "Multivariable Calculus", "credits": 4, "term": "Fall" },
              { "courseNumber": "01:750:227", "courseName": "Analytical Physics IIA", "credits": 3, "term": "Fall" },
              { "courseNumber": "01:750:229", "courseName": "Analytical Physics II Lab", "credits": 1, "term": "Fall" }
            ],
            "Spring": [
              { "courseNumber": "14:332:222", "courseName": "Principles of Electrical Engineering II", "credits": 3, "term": "Spring" },
              { "courseNumber": "14:332:224", "courseName": "Principles of EE II Lab", "credits": 1, "term": "Spring" },
              { "courseNumber": "14:332:226", "courseName": "Probability & Random Processes", "credits": 3, "term": "Spring" },
              { "courseNumber": "14:332:252", "courseName": "Programming Methodology I", "credits": 4, "term": "Spring" },
              { "courseNumber": "01:640:244", "courseName": "Differential Equations", "credits": 4, "term": "Spring" }
            ]
          },
          "JuniorYear": {
            "Fall": [
              { "courseNumber": "14:332:331", "courseName": "Computer Architecture", "credits": 3, "term": "Fall" },
              { "courseNumber": "14:332:333", "courseName": "Computer Architecture Lab", "credits": 1, "term": "Fall" },
              { "courseNumber": "14:332:345", "courseName": "Linear Systems & Signals", "credits": 3, "term": "Fall" },
              { "courseNumber": "14:332:351", "courseName": "Programming Methodology II", "credits": 3, "term": "Fall" },
              { "courseNumber": "Restricted Elective", "courseName": "Restricted Computer Elective", "credits": 3, "term": "Fall" },
              { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+ level)", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
              { "courseNumber": "14:332:312", "courseName": "Discrete Mathematics", "credits": 3, "term": "Spring" },
              { "courseNumber": "14:332:452", "courseName": "Software Engineering", "credits": 3, "term": "Spring" },
              { "courseNumber": "14:332:434", "courseName": "Introduction to Computer Systems", "credits": 3, "term": "Spring" },
              { "courseNumber": "14:332:393", "courseName": "Professionalism and Ethics", "credits": 1, "term": "Spring" },
              { "courseNumber": "14:540:343", "courseName": "Engineering Economics", "credits": 3, "term": "Spring" },
              { "courseNumber": "Technical Elective", "courseName": "Technical Elective", "credits": 3, "term": "Spring" }
            ]
          },
          "SeniorYear": {
            "Fall": [
              { "courseNumber": "14:332:437", "courseName": "Digital System Design", "credits": 3, "term": "Fall" },
              { "courseNumber": "14:332:449", "courseName": "Introduction to Capstone Design", "credits": 1, "term": "Fall" },
              { "courseNumber": "Computer Elective", "courseName": "Computer Elective", "credits": 3, "term": "Fall" },
              { "courseNumber": "Computer Elective", "courseName": "Computer Elective", "credits": 3, "term": "Fall" },
              { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+ level)", "credits": 3, "term": "Fall" },
              { "courseNumber": "SME Elective", "courseName": "Science/Math/Engineering Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
              { "courseNumber": "14:332:448", "courseName": "Capstone Design in ECE", "credits": 3, "term": "Spring" },
              { "courseNumber": "Computer Elective", "courseName": "Computer Elective", "credits": 3, "term": "Spring" },
              { "courseNumber": "Technical Elective", "courseName": "Technical Elective", "credits": 3, "term": "Spring" },
              { "courseNumber": "General Elective", "courseName": "General Elective", "credits": 3, "term": "Spring" }
            ]
          }
        },

        "Electrical Engineering": {
            "FreshmanYear": {
            "Fall": [
                { "courseNumber": "14:440:101", "courseName": "Introduction to Data-Driven Design for Engineering Applications", "credits": 2, "term": "Fall" },
                { "courseNumber": "01:160:159", "courseName": "General Chemistry for Engineers", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:160:171", "courseName": "Introduction to Experimentation", "credits": 1, "term": "Fall or Spring" },
                { "courseNumber": "01:355:101", "courseName": "College Writing", "credits": 3, "term": "Fall or Spring" },
                { "courseNumber": "01:640:151", "courseName": "Calculus I", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:123", "courseName": "Analytical Physics I", "credits": 2, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:440:102", "courseName": "Integrated Data-Driven Design for Engineering Applications", "credits": 2, "term": "Spring" },
                { "courseNumber": "01:160:160", "courseName": "General Chemistry for Engineers II", "credits": 3, "term": "Spring" },
                { "courseNumber": "01:640:152", "courseName": "Calculus II", "credits": 4, "term": "Spring" },
                { "courseNumber": "01:750:124", "courseName": "Analytical Physics IB", "credits": 2, "term": "Spring" },
                { "courseNumber": "14:440:221", "courseName": "Engineering Mechanics: Statics", "credits": 3, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "SophomoreYear": {
            "Fall": [
                { "courseNumber": "14:332:221", "courseName": "Principles of Electrical Engineering I", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:332:223", "courseName": "Principles of EE I Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "14:332:231", "courseName": "Digital Logic Design", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:332:233", "courseName": "Digital Logic Design Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "01:640:251", "courseName": "Multivariable Calculus", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:227", "courseName": "Analytical Physics IIA", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:750:229", "courseName": "Analytical Physics II Lab", "credits": 1, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:332:222", "courseName": "Principles of Electrical Engineering II", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:332:224", "courseName": "Principles of EE II Lab", "credits": 1, "term": "Spring" },
                { "courseNumber": "14:332:226", "courseName": "Probability & Random Processes", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:332:252", "courseName": "Programming Methodology I", "credits": 4, "term": "Spring" },
                { "courseNumber": "01:640:244", "courseName": "Differential Equations", "credits": 4, "term": "Spring" }
            ]
            },
            "JuniorYear": {
            "Fall": [
                { "courseNumber": "14:332:345", "courseName": "Linear Systems & Signals", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:332:361", "courseName": "Electronic Devices", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:332:363", "courseName": "Electronic Devices Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "14:332:331", "courseName": "Computer Architecture", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:332:333", "courseName": "Computer Architecture Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+ level)", "credits": 3, "term": "Fall" },
                { "courseNumber": "Restricted Elective", "courseName": "Restricted Electrical Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:332:322", "courseName": "Principles of Communication Systems", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:332:374", "courseName": "Digital Electronics", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:332:376", "courseName": "Digital Electronics Lab", "credits": 1, "term": "Spring" },
                { "courseNumber": "14:332:373", "courseName": "Elements of Electrical Engineering", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:332:393", "courseName": "Professionalism and Ethics", "credits": 1, "term": "Spring" },
                { "courseNumber": "14:540:343", "courseName": "Engineering Economics", "credits": 3, "term": "Spring" },
                { "courseNumber": "Technical Elective", "courseName": "Technical Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "SeniorYear": {
            "Fall": [
                { "courseNumber": "14:332:437", "courseName": "Digital System Design", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:332:449", "courseName": "Introduction to Capstone Design", "credits": 1, "term": "Fall" },
                { "courseNumber": "Computer Elective", "courseName": "Computer Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "Computer Elective", "courseName": "Computer Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+ level)", "credits": 3, "term": "Fall" },
                { "courseNumber": "SME Elective", "courseName": "Science/Math/Engineering Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:332:448", "courseName": "Capstone Design in ECE", "credits": 3, "term": "Spring" },
                { "courseNumber": "Computer Elective", "courseName": "Computer Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "Technical Elective", "courseName": "Technical Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "General Elective", "credits": 3, "term": "Spring" }
            ]
            }
        },

        "Aerospace Engineering": {
            "FreshmanYear": {
              "Fall": [
                { "courseNumber": "14:440:101", "courseName": "Introduction to Data-Driven Design for Engineering Applications", "credits": 2, "term": "Fall" },
                { "courseNumber": "01:160:159", "courseName": "General Chemistry for Engineers", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:160:171", "courseName": "Introduction to Experimentation", "credits": 1, "term": "Fall or Spring" },
                { "courseNumber": "01:355:101", "courseName": "College Writing", "credits": 3, "term": "Fall or Spring" },
                { "courseNumber": "01:640:151", "courseName": "Calculus I", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:123", "courseName": "Analytical Physics I", "credits": 2, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
              ],
              "Spring": [
                { "courseNumber": "14:440:102", "courseName": "Integrated Data-Driven Design for Engineering Applications", "credits": 2, "term": "Spring" },
                { "courseNumber": "01:160:160", "courseName": "General Chemistry for Engineers II", "credits": 3, "term": "Spring" },
                { "courseNumber": "01:640:152", "courseName": "Calculus II", "credits": 4, "term": "Spring" },
                { "courseNumber": "01:750:124", "courseName": "Analytical Physics IB", "credits": 2, "term": "Spring" },
                { "courseNumber": "14:440:221", "courseName": "Engineering Mechanics: Statics", "credits": 3, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Spring" }
              ]
            },
            "SophomoreYear": {
              "Fall": [
                { "courseNumber": "01:640:251", "courseName": "Multivariable Calculus", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:227", "courseName": "Analytical Physics IIA", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:750:229", "courseName": "Analytical Physics II Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "14:440:222", "courseName": "Mechanics of Solids", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:650:231", "courseName": "Introduction to Aerospace Engineering", "credits": 3, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
              ],
              "Spring": [
                { "courseNumber": "01:640:244", "courseName": "Differential Equations", "credits": 4, "term": "Spring" },
                { "courseNumber": "14:440:127", "courseName": "Introduction to Computers for Engineers", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:650:233", "courseName": "Computer-Based Design Tools for Aerospace", "credits": 2, "term": "Spring" },
                { "courseNumber": "14:650:312", "courseName": "Dynamics", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:440:403", "courseName": "Professionalism and Ethics", "credits": 1, "term": "Spring" }
              ]
            },
            "JuniorYear": {
              "Fall": [
                { "courseNumber": "14:650:342", "courseName": "Aerodynamics I", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:650:351", "courseName": "Aerospace Structures", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:650:312", "courseName": "Flight Dynamics and Control", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:650:453", "courseName": "Numerical Methods in Aerospace", "credits": 3, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "Aerospace Technical Elective", "credits": 3, "term": "Fall" }
              ],
              "Spring": [
                { "courseNumber": "14:650:360", "courseName": "Thermal Systems", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:650:361", "courseName": "Propulsion Systems", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:650:354", "courseName": "Flight Lab", "credits": 1, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+)", "credits": 3, "term": "Spring" },
                { "courseNumber": "Restricted Elective", "courseName": "Aerospace Design Elective", "credits": 3, "term": "Spring" }
              ]
            },
            "SeniorYear": {
              "Fall": [
                { "courseNumber": "14:650:491", "courseName": "Aerospace Systems Design I", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:650:465", "courseName": "Spacecraft Systems", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:540:343", "courseName": "Engineering Economics", "credits": 3, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "Technical Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Fall" }
              ],
              "Spring": [
                { "courseNumber": "14:650:492", "courseName": "Aerospace Systems Design II", "credits": 3, "term": "Spring" },
                { "courseNumber": "Technical Elective", "courseName": "Aerospace Technical Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "General Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+)", "credits": 3, "term": "Spring" }
              ]
            }
          },
        "Applied Sciences In Engineering": {
            "FreshmanYear": {
            "Fall": [
                { "courseNumber": "14:440:101", "courseName": "Intro to Data-Driven Design", "credits": 2, "term": "Fall" },
                { "courseNumber": "01:160:159", "courseName": "General Chemistry for Engineers", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:160:171", "courseName": "Introduction to Experimentation", "credits": 1, "term": "Fall" },
                { "courseNumber": "01:355:101", "courseName": "College Writing", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:640:151", "courseName": "Calculus I", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:123", "courseName": "Analytical Physics I", "credits": 2, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:440:102", "courseName": "Integrated Data-Driven Design", "credits": 2, "term": "Spring" },
                { "courseNumber": "01:160:160", "courseName": "General Chemistry II", "credits": 3, "term": "Spring" },
                { "courseNumber": "01:640:152", "courseName": "Calculus II", "credits": 4, "term": "Spring" },
                { "courseNumber": "01:750:124", "courseName": "Analytical Physics IB", "credits": 2, "term": "Spring" },
                { "courseNumber": "14:440:221", "courseName": "Statics", "credits": 3, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "SophomoreYear": {
            "Fall": [
                { "courseNumber": "01:640:251", "courseName": "Multivariable Calculus", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:227", "courseName": "Analytical Physics IIA", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:750:229", "courseName": "Analytical Physics II Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "01:640:244", "courseName": "Differential Equations", "credits": 4, "term": "Fall" },
                { "courseNumber": "General Elective", "courseName": "Approved Track Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:440:403", "courseName": "Professionalism and Ethics", "credits": 1, "term": "Spring" },
                { "courseNumber": "Technical Elective", "courseName": "Approved Engineering Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Approved Track Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Approved Track Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "JuniorYear": {
            "Fall": [
                { "courseNumber": "General Elective", "courseName": "Approved Track Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "Engineering Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "Engineering Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "Technical Elective", "courseName": "Engineering Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "SeniorYear": {
            "Fall": [
                { "courseNumber": "Capstone I", "courseName": "Senior Design Project I", "credits": 3, "term": "Fall" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "Engineering Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "Capstone II", "courseName": "Senior Design Project II", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Free Elective", "credits": 3, "term": "Spring" }
            ]
            }
        },

        "Biomedical Engineering": {
            "FreshmanYear": {
            "Fall": [
                { "courseNumber": "14:440:101", "courseName": "Intro to Data-Driven Design", "credits": 2, "term": "Fall" },
                { "courseNumber": "01:160:159", "courseName": "General Chemistry for Engineers", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:160:171", "courseName": "Introduction to Experimentation", "credits": 1, "term": "Fall or Spring" },
                { "courseNumber": "01:355:101", "courseName": "College Writing", "credits": 3, "term": "Fall or Spring" },
                { "courseNumber": "01:640:151", "courseName": "Calculus I", "credits": 4, "term": "Fall" },
                { "courseNumber": "01:750:123", "courseName": "Analytical Physics I", "credits": 2, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:440:102", "courseName": "Integrated Data-Driven Design", "credits": 2, "term": "Spring" },
                { "courseNumber": "01:160:160", "courseName": "General Chemistry II", "credits": 3, "term": "Spring" },
                { "courseNumber": "01:640:152", "courseName": "Calculus II", "credits": 4, "term": "Spring" },
                { "courseNumber": "01:750:124", "courseName": "Analytical Physics IB", "credits": 2, "term": "Spring" },
                { "courseNumber": "14:440:221", "courseName": "Engineering Mechanics: Statics", "credits": 3, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "SophomoreYear": {
            "Fall": [
                { "courseNumber": "01:640:251", "courseName": "Multivariable Calculus", "credits": 4, "term": "Fall" },
                { "courseNumber": "14:125:201", "courseName": "Introduction to Biomedical Engineering", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:750:227", "courseName": "Analytical Physics IIA", "credits": 3, "term": "Fall" },
                { "courseNumber": "01:750:229", "courseName": "Analytical Physics II Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "14:125:208", "courseName": "Computer Aided Design in BME", "credits": 2, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "01:640:244", "courseName": "Differential Equations", "credits": 4, "term": "Spring" },
                { "courseNumber": "14:125:202", "courseName": "Quantitative Physiology", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:125:210", "courseName": "BME Thermodynamics", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:125:209", "courseName": "Biomedical Engineering Graphics and Computation", "credits": 2, "term": "Spring" },
                { "courseNumber": "14:440:403", "courseName": "Professionalism and Ethics", "credits": 1, "term": "Spring" }
            ]
            },
            "JuniorYear": {
            "Fall": [
                { "courseNumber": "14:125:301", "courseName": "Bioinstrumentation", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:125:303", "courseName": "Bioinstrumentation Lab", "credits": 1, "term": "Fall" },
                { "courseNumber": "14:125:304", "courseName": "Biomedical Signals and Systems", "credits": 3, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "BME Track Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+)", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:125:315", "courseName": "Biomechanics", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:125:316", "courseName": "Biomechanics Lab", "credits": 1, "term": "Spring" },
                { "courseNumber": "14:125:320", "courseName": "Transport Phenomena in BME", "credits": 3, "term": "Spring" },
                { "courseNumber": "Technical Elective", "courseName": "BME Track Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Open Elective", "credits": 3, "term": "Spring" }
            ]
            },
            "SeniorYear": {
            "Fall": [
                { "courseNumber": "14:125:401", "courseName": "Capstone Design in BME I", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:125:405", "courseName": "BME Lab I", "credits": 1, "term": "Fall" },
                { "courseNumber": "Technical Elective", "courseName": "BME Technical Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "General Elective", "courseName": "Open Elective", "credits": 3, "term": "Fall" },
                { "courseNumber": "14:540:343", "courseName": "Engineering Economics", "credits": 3, "term": "Fall" }
            ],
            "Spring": [
                { "courseNumber": "14:125:402", "courseName": "Capstone Design in BME II", "credits": 3, "term": "Spring" },
                { "courseNumber": "14:125:406", "courseName": "BME Lab II", "credits": 1, "term": "Spring" },
                { "courseNumber": "Technical Elective", "courseName": "BME Technical Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "General Elective", "courseName": "Open Elective", "credits": 3, "term": "Spring" },
                { "courseNumber": "H/SS Elective", "courseName": "Humanities/Social Sciences Elective (200+)", "credits": 3, "term": "Spring" }
            ]
            }
        },

        
          
      }
      
  
    return curricula[major] || null;
  }
  