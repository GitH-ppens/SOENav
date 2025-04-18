(async function () {
    //NOTE: To be used, and can only be used in degreeNav window's console.
    
    /*
    let list = []
    for(var i = 7500;i<9000;i++){//Change the range for more programs
        const response = await fetch(`https://dn.rutgers.edu/DN/Audit/DegreeAudit.aspx?pageid=audit&degreeID=${i}`);
        
        if(!response.redirected){
            console.log(i);
            list.push(i)
        }

    }
    console.log(list)
    //filter only engineering// Program that has 'Engineering'
    for(let i of all_degrees){
        const response = await fetch(`https://dn.rutgers.edu/DN/Audit/DegreeAudit.aspx?pageid=audit&degreeID=${i}`);
        
        const html = await response.text();
        // Create a temporary DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const program = doc.querySelector('#ctl00_mainContent_selectedDegreeLabel')?.innerText.trim();
        program.includes('Engineering') ? console.log(i) : "";

    }*/
        const eng_degrees = [8362, 8363, 8521, 8621, 8622, 8623, 8624, 8625, 8641, 8642, 8643, 8644];
        const all_degrees = [7561, 7581, 7601, 7602, 7603, 7621, 7641, 7642, 7661, 7682, 7683, 7684, 7685, 7686, 7687, 7688, 7689, 7701, 7702, 7721, 7741, 7781, 7801, 7821, 7823, 7841, 7862, 7881, 7882, 7883, 7884, 7902, 7941, 7961, 7962, 7964, 7981, 7982, 7983, 7984, 7985, 7986, 7987, 8001, 8041, 8042, 8061, 8081, 8101, 8123, 8124, 8125, 8126, 8141, 8143, 8144, 8145, 8146, 8147, 8148, 8149, 8150, 8151, 8161, 8181, 8202, 8221, 8222, 8223, 8224, 8225, 8226, 8227, 8228, 8229, 8237, 8238, 8241, 8242, 8243, 8244, 8245, 8246, 8247, 8248, 8249, 8250, 8251, 8252, 8253, 8261, 8262, 8265, 8266, 8267, 8268, 8269, 8281, 8301, 8321, 8341, 8342, 8362, 8363, 8381, 8401, 8421, 8441, 8461, 8481, 8482, 8501, 8521, 8524, 8526, 8561, 8562, 8581, 8582, 8601, 8602, 8621, 8622, 8623, 8624, 8625,8641, 8642, 8643, 8644, 8661, 8663, 8664, 8666, 8667, 8668, 8669, 8670, 8671, 8672, 8673, 8674, 8675, 8676, 8677, 8681, 8701, 8721, 8741, 8761, 8763, 8781, 8801, 8802, 8803, 8804, 8805, 8821, 8822, 8841, 8861, 8862, 8863, 8864, 8865, 8866, 8881, 8883, 8901, 8902, 8903, 8921, 8922]    

        let eng_requirements = {};

        for(let i of eng_degrees){
        const response = await fetch(`https://dn.rutgers.edu/DN/Audit/DegreeAudit.aspx?pageid=audit&degreeID=${i}`);
        
        const html = await response.text();
     
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
    
        const program = doc.querySelector('#ctl00_mainContent_selectedDegreeLabel')?.innerText.trim();
        const version = doc.querySelector('#ctl00_mainContent_degreeVersionDropDown option[selected]')?.innerText.trim();
      
        function extractRequirements(rowClass) {
          return Array.from(doc.querySelectorAll(`#ctl00_mainContent_ctl13_gridVisualReqs tr.${rowClass}`)).map(section => {
            const reqTitleElem = section.querySelector('a[name]');
            const reqTitle = reqTitleElem?.textContent.trim() || "";
            const reqID = reqTitleElem?.getAttribute('name') || "";
      
            let section_table = section.querySelector("table.requirement_body tr td table");
            let courses = Array.from(section_table.querySelectorAll('tr'))//section.querySelectorAll('a[title]')
          .map(a => {
            const match = a.innerText.match(/\{.*\}/);
            return match ? match[0] : '';
        })
          .filter(c => c.includes('{'));
          courses = courses.filter((item, index) => courses.indexOf(item) === index);
          //console.log(courses);//courses for a reqx
      
            const statusImg = section.querySelector('img');
      
            return { reqID, reqTitle, courses };
          });
        }
      
        const reqA = extractRequirements("ReportGridItemA");
        const reqB = extractRequirements("ReportGridItemB");
      
        const payload = {
          degreePoint: i,
          program,
          version,
          requirements: [...reqA, ...reqB]//You can sort it with R1,R2... later if you guys want
        };
        
        eng_requirements[program] = payload;
    }
    console.log(eng_requirements);//debugging...It works 
    
    const resp = await fetch('http://localhost:3000/saverequirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eng_requirements)
    });

    console.log(resp.message);
      })();
      
      