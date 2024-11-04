/* let initEventData,
    delimiter = ",";
if (localStorage.getItem("initEventData") == null) {
    initEventData = [];
    alert("Import Data");
} else {
    initEventData = JSON.parse(localStorage.getItem("initEventData"));
}
 */

let productList;
if (localStorage.getItem("productList") == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("productList"));
}

let initialObj = [];
const fileInput = document.getElementById("fileInput");

const splitCSVColumns = (string) => {
    const array = string.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    return array.map((value) => value.trim().replace(/^"|"$/g, ""));
};

const readCSV = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    const promise = new Promise((resolve, reject) => {
        // If the file reader doesn't load, we'll reject the promise
        reader.onerror = (event) => reject(["Failed to read file"]);

        // If the file reader loads, we'll process the data, but may still reject the promise if other conditions are not met
        reader.onload = (event) => {
            //    Just because the file reader has loaded, doesn't mean everything is fine
            //    We can set up other conditions here to reject the promise
            //    For example, your csv may require a fixed number of columns
            //    If the uploaded CSV has a different number, we can reject the promise

            // If we encounter errors along the way, push them to this errors array and notify the user later.
            let errors = [];

            // This array will contain our final data
            const objArray = [];

            const csvText = event.target.result.trim();

            const rows = csvText.split(/\r\n/g);

            // const columHeaders = splitCSVColumns(rows.shift().toLowerCase());
            const columHeaders = splitCSVColumns(rows.shift().toLowerCase());

            rows.forEach((row, rowIndex) => {
                const columns = splitCSVColumns(row);
                console.log(columns);
                const obj = {};

                for (let i = 0; i < columHeaders.length; i++) {
                    console.log(columns[i]);
                    if (columns[i] === undefined) {
                        errors.push(`Column ${i} on row ${rowIndex} is missing.`);
                    }
                    // else if(columHeaders="Account Number" && isNaN(columns[i]) ) {
                    //     errors.push(`Column ${i} on row ${rowIndex} is not a valid number.`);
                    // }
                    else {
                        //  obj[columHeaders[i]] = columns[i].toLowerCase();
                        obj[columHeaders[i]] = columns[i];
                    }
                    console.log("columns[i]", columns[i]);
                }
                objArray.push(obj);
            });

            if (errors.length === 0) {
                return resolve(objArray);
            }
            return reject(errors);
        };
    });

    return promise;
};

fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0 && e.target.files[0] && e.target.files[0].type === "text/csv") {
        readCSV(e.target.files[0])
        .then((csvRows) => {
            /*    const preview = document.getElementById("preview");
            preview.innerHTML = JSON.stringify(csvRows)
            .replaceAll("{", "&nbsp;&nbsp;&nbsp;&nbsp;{")
            .replaceAll("[", "[<br>")
            .replaceAll("]", "<br>]")
            .replaceAll("},", "},<br>"); */

            console.log(csvRows);
            if (csvRows) {
                /*  let d = 20,
                    divisions = ["div1", "div2", "div3", "div4", "div5", "div6", "div7", "div8", "div9", "div10"];
 */
                //  console.log(divItem);
                /*   if (divItem in csvRows[0]) {
                    console.log(divItem);
                } */

                const fullHeaders = Object.keys(csvRows[0]); //use full header
                // const selectedHeaders = ["name", "score"]; //or filter as needed

                const table1 = makeTable(fullHeaders, csvRows);
                // const table2 = makeTable(selectedHeaders, csvRows);

                function makeTable(headers, csvRows, target = document.getElementById("target")) {
                    const newTable = document.createElement("table");
                    newTable.classList.add("table", "table-striped");

                    const thead = document.createElement("thead");
                    for (header of headers) {
                        const th = document.createElement("th");
                        th.setAttribute("scope", "col");
                        th.textContent = header;
                        console.log(th);
                        thead.appendChild(th);
                    }
                    newTable.appendChild(thead);

                    for (csvRow of csvRows) {
                        const newRow = document.createElement("tr");
                        for (header of headers) {
                            const td = document.createElement("td");
                            td.textContent = csvRow[header];
                            newRow.appendChild(td);
                        }
                        newTable.appendChild(newRow);
                    }

                    return target.appendChild(newTable);
                }

                //   let divi = [];
                for (let i = 0; i < csvRows.length; i++) {
                    console.log(csvRows.length + " items");
                    let formatter = csvRows[i].division.toLowerCase();
                    csvRows[i].scorecard = "";
                    csvRows[i].isPlaying = "0";
                    csvRows[i].numOfGames = "0";
                    csvRows[i].onPot = "0";
                    csvRows[i].isPlaying = "0";
                    csvRows[i].divisions = formatter;

                    /*    const hasKey = (obj, key) => Object.keys(obj).includes(key);

                    if (hasKey(csvRows[i], "div1")) {
                        //  divi.push("div1");
                        csvRows[i].divisioning.push("div1");
                    } else if (hasKey(csvRows[i], "div2")) {
                        // divi.push("div2");
                        csvRows[i].divisioning.push("div2");
                    } else {
                        return false;
                    } */

                    /*  if ("div1" in csvRows[i]) {
                        divi.push("div1");
                    }
                    if ("div2" in csvRows[i]) {
                        divi.push("div2");
                    }
 */
                    //    csvRows[i].divisioning = divi;
                    //   console.log("divi ", divi);
                    console.log("csvRows[i]", csvRows[i]);
                    // Output: Proceed or continue driving.
                    /*  const hasKeyDeep = (obj, keys) => {
                        return (
                            keys.length > 0 &&
                            keys.every((key) => {
                                if (typeof obj !== "object" || !obj.hasOwnProperty(key)) return false;
                                obj = obj[key];
                                return true;
                            })
                        );
                    };
                    for (let x = 0; x < divisions.length; x++) {
                        if (hasKeyDeep(csvRows[i], divisions[x])) {
                            console.log(divisions[x]);
                        }
                    } */
                }
                console.log(csvRows);
                localStorage.setItem("productList", JSON.stringify(csvRows));
            }
        })
        .catch((errors) => {
            console.log(errors);
        })
        .finally(() => {
            // You can do something here, like hide a loader or enable a disabled button.
        });
    }
});
