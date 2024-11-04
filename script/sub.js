const data = [
    {
        eventID: "AAA-001",
        eventName: "Super Hero Squad",
        homeTown: "MCS",
        datetimeStart: "2018-06-12T02:30",
        datetimeEnd: "2018-06-12T19:30",
        companyID: "USBC",
        active: true,
        members: [
            {
                name: "Dan Jukes",
                grp2: 42,
                onPot: "1",
                isPlaying: "1",
                division: ["grp2"],
                scorcard: [120, 201, 120],
            },
            {
                name: "Jane Wilson",
                grp1: 30,
                senrs: 35,
                onPot: "0",
                isPlaying: "1",
                division: ["grp1", "senrs"],
                scorcard: [80, 210, 180],
            },
            {
                name: "Bernie Santos",
                grp1: 15,
                onPot: "1",
                isPlaying: "1",
                division: ["grp1"],
                scorcard: [70, 200, 151],
            },
        ],
    },
    //, {}
];
const keys_0 = ["eventID", "eventName", "homeTown", "datetimeStart", "datetimeEnd", "companyID", "active"];
const keys_1 = ["name", "onPot", "isPlaying", "scorcard", "division", "grp1", "grp2", "senrs"];

data.forEach((herosGroup) => {
    let tableModal = document.getElementById("TableData");
    let tabEl = document.createElement("table"),
        tHead = tabEl.createTHead(),
        tBody = tabEl.createTBody(),
        newRow = tHead.insertRow();
    tabEl.className = "top";
    // document.body.appendChild(tabEl)
    tableModal.appendChild(tabEl);
    keys_0.forEach((prop) => (newRow.insertCell().textContent = prop));
    newRow = tBody.insertRow();
    keys_0.forEach((prop) => (newRow.insertCell().textContent = herosGroup[prop]));

    // 'name', 'age', 'scorcard', 'division' trip...
    tabEl = document.createElement("table");
    tHead = tabEl.createTHead();
    tBody = tabEl.createTBody();
    tabEl.className = "bottom";
    newRow = tHead.insertRow();
    tableModal.appendChild(tabEl);
    //  document.body.appendChild(tabEl)

    keys_1.forEach((prop) => (newRow.insertCell().textContent = prop));

    herosGroup.members.forEach((hero) => {
        newRow = tBody.insertRow();

        keys_1.forEach((prop) => {
            if (prop != "division") newRow.insertCell().textContent = hero[prop];
            else newRow.insertCell().innerHTML = hero[prop].join("<br>");
        });
    });
}); // forEach(herosGroup=>
