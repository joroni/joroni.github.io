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
                        obj[columHeaders[i]] = columns[i].toLowerCase();
                    }
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
                let d = 20,
                    divisions = ["div1", "div2", "div3", "div4", "div5", "div6", "div7", "div8", "div9", "div10"];

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
                    newTable.classList.add("table", "table-success", "table-striped");

                    const thead = document.createElement("thead");
                    for (header of headers) {
                        const th = document.createElement("th");
                        th.textContent = header;
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
                /* 
                const preview = document.getElementById("preview");
                preview.innerHTML = JSON.stringify(csvRows)
                .replaceAll("{", "&nbsp;&nbsp;&nbsp;&nbsp;{")
                .replaceAll("[", "[<br>")
                .replaceAll("]", "<br>]")
                .replaceAll("},", "},<br>");
 */
                console.log(csvRows);

                let divi = [];
                for (let i = 0; i < csvRows.length; i++) {
                    console.log(csvRows.length + " items");

                    csvRows[i].scorecard = "";
                    csvRows[i].isPlaying = "0";
                    csvRows[i].numOfGames = "0";
                    csvRows[i].onPot = "0";
                    csvRows[i].isPlaying = "0";
                    console.log("csvRows[i]", csvRows[i]);

                    let diviSion = csvRows[i].div1;
                    divi.push(diviSion);
                    // Example array
                    /*  const array = csvRows[i];
                    const element = diviSion;
                    let exists = false;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === element) {
                            exists = true;
                            break;
                        }
                    }

                    console.log(exists);

                    console.log(array); */

                    switch (diviSion) {
                        case csvRows[i].div2:
                            divi.push(diviSion);
                            break;
                        case csvRows[i].div3:
                            divi.push(diviSion);
                            break;
                        case csvRows[i].div4:
                            divi.push(diviSion);
                            break;
                        default:
                            divi.push(diviSion);
                    }

                    console.log(divi);

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
                localStorage.setItem("initEventData", JSON.stringify(csvRows));
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
