const signForm = document.getElementById("signForm");

// Full list of engineering courses
const courses = [//all engineering courses
  "14:125:201 : INTRO BIOMEDICAL ENG",
  "14:125:255 : BME SYST PHYSIOLOGY",
  "14:125:291 : DIRECTED RESEARCH I",
  "14:125:303 : BIOMED TRANSP PHENOM",
  "14:125:304 : BIOMATERIAL",
  "14:125:305 : NUMER MODL & BIOMD SYS",
  "14:125:306 : BIOMED KINET & THERM",
  "14:125:308 : INTRO TO BIOMECHANIC",
  "14:125:309 : BME DEVICES & SYSTEM",
  "14:125:310 : BME DEVICE & SYS LAB",
  "14:125:401 : SENIOR DESIGN I LEC",
  "14:125:403 : CARDIOVASC ENG",
  "14:125:417 : MUSCULOSKELETAL MECH",
  "14:125:421 : SR DESIGN I PROJECTS",
  "14:125:424 : BIOMED INSTRUMNT LAB",
  "14:125:433 : FUND OF TISSUE ENGG",
  "14:125:445 : PRIN DRUG DELIVERY",
  "14:125:465 : BME MICROFLUIDICS",
  "14:125:489 : BME HA RESEARCH I",
  "14:125:491 : INDEPENT STUDY BME",
  "14:125:493 : BME HA ADV RES I",
  "14:125:495 : INTERNSHIP IN BME",
  "14:125:497 : CO-OP BIOMED ENGRG",
  "14:125:499 : TOPICS IN BME",
  "14:155:201 : CHEME MAT ENERGY BAL",
  "14:155:291 : UNDERGRAD RSRCH SO",
  "14:155:298 : PROF SKILLS DEV",
  "14:155:303 : TRANS PHEN CHEM E I",
  "14:155:307 : CHEME COMP METHOD",
  "14:155:309 : CHEM ENG THERMO II",
  "14:155:391 : UNDERGRAD RSRCH JR",
  "14:155:411 : BIOCHEMICAL ENGG",
  "14:155:415 : PROC ENGG LAB I",
  "14:155:422 : PROC SIM CTRL",
  "14:155:491 : UNDERGRAD RSRCH SR",
  "14:155:495 : INTERNSHIP IN CBE",
  "14:155:497 : CO-OP IN CBE",
  "14:180:215 : ENGINEERING GRAPHICS",
  "14:180:243 : MECHANICS OF SOLIDS",
  "14:180:305 : CONSTRUCTION ENGG",
  "14:180:318 : ELEMTS OF STRUCTURES",
  "14:180:331 : ELEMTS ENVIRONM ENGG",
  "14:180:387 : FLUID MECHANICS",
  "14:180:389 : FLUID MECHANICS LAB",
  "14:180:406 : CONSTRUC ENG MANAGMT",
  "14:180:411 : REINFORCED CONCRETE",
  "14:180:413 : THEORY INDETER STRUC",
  "14:180:421 : REINFOR CONCRETE LAB",
  "14:180:429 : WATER & WASTEWTR ENGG",
  "14:180:430 : INTRO TRANS PLANNING",
  "14:180:473 : FOUNDATION ENGG",
  "14:180:491 : SPEC PROB CIV ENGG",
  "14:180:493 : SPEC PROB ENVIR ENGG",
  "14:180:497 : CO-OP CIVIL ENV ENGG",
  "14:332:221 : PRIN ELEC ENGG I",
  "14:332:222 : PRIN ELEC ENGG II",
  "14:332:223 : PRIN ELECT ENG I LAB",
  "14:332:224 : PRIN ELEC ENG II LAB",
  "14:332:231 : DIGITAL LOGIC DESIGN",
  "14:332:233 : DIGITL LOGIC DES LAB",
  "14:332:312 : DISCRETE MATH ECE",
  "14:332:331 : COMP ARCH & ASM LANG",
  "14:332:333 : COMPUTER ARCHIT LAB",
  "14:332:345 : LINEAR SYS & SIGNALS",
  "14:332:351 : PROGRM METHODOLOGYII",
  "14:332:361 : ELECTRONICS DEVICES",
  "14:332:363 : ELECTRON DEVICES LAB",
  "14:332:366 : DIGITAL ELECTRONICS",
  "14:332:368 : DIGITAL ELECTRON LAB",
  "14:332:402 : SUSTAINABLE ENERGY",
  "14:332:417 : CONTROL SYSTM DESIGN",
  "14:332:421 : WIRELESS COMMUN SYS",
  "14:332:424 : INTRO-INFO & NETW SEC",
  "14:332:435 : TOPICS IN ECE",
  "14:332:437 : DIGITAL SYST DESIGN",
  "14:332:443 : MACHINE LEARNING",
  "14:332:445 : TOPICS IN ECE",
  "14:332:446 : TOPICS IN ECE",
  "14:332:448 : CAPSTONE DESIGN ECE",
  "14:332:449 : INTRO CAPSTONE ECE",
  "14:332:451 : PARALLEL & DIST PROG",
  "14:332:452 : SOFTWARE ENGINEERING",
  "14:332:460 : POWER ELECTRONICS",
  "14:332:463 : ANALOG ELECTRONICS",
  "14:332:465 : PHYSICAL ELECTRONICS",
  "14:332:472 : ROBOTICS & COMP VISION",
  "14:332:479 : VLSI DESIGN",
  "14:332:481 : ELECTROMAG WAVES",
  "14:332:491 : SPCL PROB/IND STUDY",
  "14:332:493 : TOPICS IN ECE",
  "14:332:494 : TOPICS IN ECE",
  "14:332:495 : INTERNSHIP IN ECE",
  "14:332:497 : CO-OP INTERNSHIP ECE",
  "14:440:101 : ID3EA I",
  "14:440:107 : METH INQUIRY ENGRS",
  "14:440:124 : RU-FIT SOE",
  "14:440:127 : INT COMPUTER FOR ENG",
  "14:440:221 : ENG MECH-STATICS",
  "14:440:222 : ENG MECH-DYNAMICS",
  "14:440:291 : HONORS ENG MECH-STAT",
  "14:440:292 : HONORS ENG MECH-DYNA",
  "14:440:298 : SKILLS TO SUCCEED",
  "14:440:301 : INTRO PACKAGING ENG",
  "14:440:302 : CAD FOR PACKG'G ENGR",
  "14:440:371 : PACKAGING EVAL MTDS",
  "14:440:373 : PKGG MANUFACTURING",
  "14:440:378 : SUSTAINABLE PACKAG'G",
  "14:440:419 : INNOVATION & DESIGN",
  "14:440:470 : PACKAGING LAB I",
  "14:440:489 : SPEC PROB PACKAGING",
  "14:440:497 : ENG CO-OP INTERNSHIP",
  "14:440:499 : PKG ENGG CO-OP/INTRN",
  "14:540:201 : WORK DESIGN & ERGO",
  "14:540:202 : WORK DESIGN LAB",
  "14:540:213 : INDUSTRIAL ENGG LAB",
  "14:540:320 : ENGR STATISTICS",
  "14:540:338 : PROB MODELS OP RES",
  "14:540:343 : ENGINEERNG ECONOMICS",
  "14:540:382 : AUTOMATION",
  "14:540:383 : AUTOMATION LAB",
  "14:540:400 : DES ENGR SYS II",
  "14:540:433 : QUALITY ENGINEERING",
  "14:540:434 : QUALITY ENGR LAB",
  "14:540:453 : PRODUCTION CONTROL",
  "14:540:487 : ENERGY SYS MODEL OPT",
  "14:540:491 : SPECIAL PROBLEMS",
  "14:540:492 : SPECIAL PROBLEMS",
  "14:540:496 : INTERNSHIP/CO-OP ISE",
  "14:540:497 : INTERNSHIP/CO-OP ISE",
  "14:635:203 : INTRO MATLS SCI ENGG",
  "14:635:205 : CRYSTAL CHEM& STRUCT",
  "14:635:305 : MATLS MICROPROC",
  "14:635:307 : KINETICS OF MAT PROC",
  "14:635:309 : CHARACT OF MATERIALS",
  "14:635:312 : GLASS ENGINEERING",
  "14:635:316 : EOM PROP OF MATLS",
  "14:635:353 : LAB II",
  "14:635:362 : PHYSICAL METALLURGY",
  "14:635:402 : SENIOR MSE LAB",
  "14:635:403 : MSE SEMINAR",
  "14:635:407 : MECH PROPS OF MATLS",
  "14:635:412 : MSE ENG'G DESIGN II",
  "14:635:491 : SPECIAL PROBLEMS",
  "14:635:497 : CO-OP CERAM & MAT ENGG",
  "14:650:210 : INTRO AERO ENG",
  "14:650:289 : PROF DEVELOPMENT MAE",
  "14:650:291 : MECH MATERIALS",
  "14:650:298 : UNDERGRD RES SOPHOMO",
  "14:650:312 : FLUID MECHANICS",
  "14:650:342 : DESIGN MECH COMPNTS",
  "14:650:350 : MECH ENG MES W/LAB",
  "14:650:351 : THERMODYNAMICS",
  "14:650:361 : INTRO MECHATRONICS",
  "14:650:388 : CAD IN MECH ENGG",
  "14:650:398 : UNDERGRD RES JUNIORS",
  "14:650:401 : DYN SYS & CNTL",
  "14:650:431 : MECH ENGG LAB I",
  "14:650:439 : MULTIPHYSICS SIMU",
  "14:650:443 : VIBRATIONS",
  "14:650:455 : DESIGN OF MECHANISMS",
  "14:650:457 : SPACECRAFT/MIS DE",
  "14:650:462 : POWER PLANTS",
  "14:650:465 : ORBITAL MECHANICS",
  "14:650:467 : DESIGN & MFG. I",
  "14:650:474 : ALT ENERGY I",
  "14:650:481 : HEAT TRANSFER",
  "14:650:487 : AE DESIGN 1",
  "14:650:495 : INTERNSHIP IN MAE",
  "14:650:497 : CO-OP INTERNSHIP MAE",
  "14:650:498 : UNDERGRD RES SENIORS"];

// Populate the dropdown with all courses
function populateDropdown() {
    const dropdownOptions = document.getElementById("dropdown-options");
    dropdownOptions.innerHTML = courses.map(course => `
        <label>
            <input type="checkbox" name="courses-taken" value="${course}"> ${course}
        </label>
    `).join("");
}

// Filter dropdown based on search input
function filterOptions() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const labels = document.getElementById("dropdown-options").getElementsByTagName("label");

    for (let label of labels) {
        label.style.display = label.textContent.toLowerCase().includes(searchInput) ? "block" : "none";
    }
}

// Toggle dropdown visibility
document.getElementById("search-input").addEventListener("click", () => {
    document.getElementById("dropdown-options").classList.toggle("hidden");
});

// Initialize course dropdown
populateDropdown();

// Password validation
function validatePassword() {
    const pass = document.getElementById('password');
    const conpass = document.getElementById('confirm-password');

    if (pass.value.length < 4) {
        pass.style.background = "red";
        alert("Password too short. Must be at least 4 characters.");
        return false;
    }

    if (pass.value !== conpass.value) {
        conpass.style.background = "red";
        alert("Passwords do not match.");
        return false;
    }

    pass.style.background = "";
    conpass.style.background = "";
    return true;
}

// Handle form submit
signForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validatePassword()) return;

    const coursesTakenByUsers = Array.from(
        document.querySelectorAll('input[name="courses-taken"]:checked')
    ).map(checkbox => checkbox.value);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.coursesTaken = coursesTakenByUsers;

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message || "Registration successful!");
            window.location.href = "../Login/login.html";
        } else {
            alert(result.message || "Registration failed. Please try again.");
        }
    } catch (err) {
        console.error("Error during registration:", err);
        alert("A server error occurred. Please try again later.");
    }
});
