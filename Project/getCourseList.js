//Get courses in the format: "courseNum : courseName" on webreg...embed the script in webreg page

let a = document.getElementById('courseDataParent');
let y = [];

if (a) {
    let i = 0;
    Array.from(a.children).forEach(child => {
        if (child.id) {
            let uv = `${child.id.substring(12,22)}.${i}.courseMetadata.title`;
            let diva = document.getElementById(uv) ? document.getElementById(uv).textContent : '';
            y.push(child.id.substring(12,22) + " : " + diva);
            i++;
        }
    });
}

let s = '';
for (let i of y) {
    s += `\n<option> ${i} </option>`;
}
console.log("Parsed courses:\n", s);