/**
 * @projectName - CRUD Operation in LocalStorage
 *
 * @description - CRUD operation in LocalStorage with search and sort functionality is a JavaScript program
 *                that allows users to create, read, update, and delete items from a memberLists stored in
 *                LocalStorage. It also includes search and sort functionality to easily find and organize
 *                products. Users can add, edit, and delete product details, including name, price, description,
 *                and image. The program generates an HTML code for each product card and displays them on the
 *                webpage. This program provides an efficient way to manage and manipulate data in LocalStorage.
 *
 * @devloper - raymund niconi
 *
 * @github - https://github.com/joroni/maple-bowling-leaderboard
 */

/**
 * @function validateForm
 *
 * @description Function validates form input for name, price, description,
 *              and image attachment, returning true if valid and false
 *              with error message if not.
 *
 * @param none
 */

let btnCls = document.querySelectorAll(".btn-close");
if (btnCls) {
    for (s = 0; s < btnCls.length; s++) {
        btnCls[s].addEventListener("click", function () {
            location.reload();
            console.log("reloaded");
        });
    }
}

/****** EDIT INPUTS / CONTAINERS *******/
let scorecard_edit = document.getElementById("scorecard-edit"),
    name_show = document.getElementById("name-show"),
    name_image_show = document.querySelector("#name-image-show .circle-inner"),
    name_edit = document.getElementById("name-edit"),
    name_edit_text = document.getElementById("name-edit-text"),
    id_edit = document.getElementById("id-edit"),
    onpot_toggle = document.getElementById("onpot-toggle"),
    addScoreParent = document.getElementById("addScore"),
    cardBodyAll = document.querySelector(".card-body-all"),
    profile_img = document.getElementById("profile-img"),
    profile_img2 = document.getElementById("profile-img2"),
    onpot_edit = document.getElementById("onpot-edit"),
    isplaying_toggle = document.getElementById("isplaying-toggle"),
    isplaying_edit = document.getElementById("isplaying-edit"),
    step_edit = document.getElementById("step-edit"),
    scratch_edit = document.getElementById("scratch-edit"),
    divisions_edit = document.getElementById("divisions-edit"),
    event_id_edit = document.getElementById("event_id-edit"),
    image_edit = document.getElementById("image-edit"),
    image_show = document.getElementById("image-show"),
    image_show2 = document.getElementById("image-show2"),
    myTab = document.getElementById("myTab"),
    myTabContent = document.getElementById("myTabContent"),
    curd_table = document.querySelector("#curd-table"),
    filter_table = document.querySelector("#filter-table"),
    sort_table = document.querySelector("#sort-table"),
    searchMemberForm = document.getElementById("searchMember"),
    registerBox = document.getElementById("registerBox"),
    listTitle = document.getElementById("listTitle"),
    filterTitle = document.getElementById("filterTitle"),
    updateBtn = document.getElementById("update"),
    homeChart = document.getElementById("HomeChart"),
    filterMsg = document.getElementById("filterMsg"),
    addScore = document.getElementById("addscore"),
    gameChecker = document.getElementById("gameChecker");

/****** EDIT INPUTS *******/
var getInitials = function (name) {
    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== "") {
            initials += parts[i][0];
        }
    }
    return initials;
};

function randColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    /* name_image_show.stye.backgroundColor = randColor(); */
    return color;
}

//console.log(randColor());

function validateForm() {
    // Get references to the form elements
    let nameInput = document.getElementById("name");
    let divisionsInput = document.getElementById("divisions");
    let eventIDInput = document.getElementById("event_id");
    //let scratchInput = document.getElementById("scratch");
    let scoreCardInput = document.getElementById("scorecard");
    let image = document.getElementById("inputGroupFile01");

    // Get the values from the input fields and remove extra white spaces.
    let name = nameInput.value.trim();
    let divisions = divisionsInput.value.trim();
    // let scratch = scratchInput.value.trim();
    let scorecard = scoreCardInput.value.trim();

    // Validate name input
    if (name === "") {
        document.getElementById("name-error-msg").innerHTML = " Please enter your name";
        return false;
    } else {
        document.getElementById("name-error-msg").innerHTML = "";
    }

    // Validate price input
    if (divisions === "") {
        document.getElementById("divisions-error-msg").innerHTML = " Please enter the divisions";
        return false;
    } else {
        document.getElementById("divisions-error-msg").innerHTML = "";
    }

    if (isNaN(scorecard) || scorecard.startsWith("0")) {
        document.getElementById("scorecard-error-msg").innerHTML = "Zero value entered";
        return true;
    } else {
        document.getElementById("scorecard-error-msg").innerHTML = "";
    }

    // Validate eventIDInput input
    if (eventIDInput.value.length > 50) {
        document.getElementById("event-error-msg").innerHTML = " Event ID can be maximum 50 characters";
        return false;
    } else if (eventIDInput.value == "") {
        document.getElementById("event-error-msg").innerHTML = " Please enter the EventID";
        return false;
    } else {
        document.getElementById("event-error-msg").innerHTML = "";
    }

    // Validate image input
    if (image.files.length === 0) {
        document.getElementById("image-error-msg").innerHTML = "No image selected";
        // return false; BYPASS required
        return true;
    } else {
        document.getElementById("image-error-msg").innerHTML = "";
    }

    // regular expression for image format
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(image.files[0].name)) {
        document.getElementById("image-error-msg").innerHTML =
            " Please attach a valid image file (jpg, jpeg, png, or gif)";
        image.value = "";
        return false;
    } else {
        document.getElementById("image-error-msg").innerHTML = "";
    }

    // Check the file size of the uploaded image
    let fileSize = image.files[0].size / 1024; // in KB
    if (fileSize > 750) {
        document.getElementById("image-error-msg").innerHTML = " Please attach an image that is smaller than 750KB";
        image.value = "";
        return false;
    } else {
        document.getElementById("image-error-msg").innerHTML = "";
    }
    return true;
}

/**
 * @function showData
 *
 * @description The function is retrieves the memberLists from localStorage,
 *              generates HTML code for each product card, and displays them
 *              on the webpage. It also handles empty memberLists and provides
 *              options to edit and delete each product.
 *
 * @param none
 */

function handleSearchForm(newCont, prevCont, searchOn) {
    let searchForm = `<form id='searchMember' class='searchx'>
    <div class='search__wrapper'>
        <input type='text' name='' placeholder='Search for...' class='search__field shadow'
            oninput='searchBarConditional()' id='serachProductText'>
        <button type='submit' class='fa fa-search search__icon'></button>
    </div>`;
    let registerBox = document.getElementById(newCont);
    let registerPrev = document.getElementById(prevCont);
    if (searchOn === false) {
        registerBox.innerHTML = "";
        registerPrev.innerHTML = "";
    } else {
        registerBox.innerHTML = searchForm;
        registerPrev.innerHTML = "";
    }
}
function showData() {
    let memberLists;
    if (localStorage.getItem("memberLists") == null) {
        memberLists = [];
    } else {
        memberLists = JSON.parse(localStorage.getItem("memberLists"));
    }
    let html = "";

    if (memberLists.length === 0) {
        // Display an image if the memberLists array is empty
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.jpg" class="img-fluid rounded mx-auto d-block" alt="No Products">
            </div>
          </div>
        </div>
      </div>`;
    } else {
        memberLists.forEach(function (element, index) {
            let img = function () {
                if (!element.image) {
                    return `<div class='circle' style='background-color: ${element.avatar_bg}'>
                    <p class='circle-inner'>${getInitials(element.name)}</p>
                    </div>`;
                } /*  if (!element.image) {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image' style='height: 62px; width: 62px;'
              />`; */ else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image' style='height: 62px; width: 62px;'
              />`;
                }
            };
            html += `<li data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb" onclick='editData("${
                        element.id
                    }")' type='button' data-bs-toggle='modal' data-bs-target='#registerModal'>
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto max-w-s mt-auto mb-auto">
                        <div class="fw-bold" onclick='editData("${
                            element.id
                        }")' type='button' data-bs-toggle='modal' data-bs-target='#registerModal'>${element.name}</div>
                      
                    </div>
                   
                        <div class="dropdown ms-auto mt-auto mb-auto">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData(${
                                                    element.id
                                                })' type='button' data-bs-toggle='modal' data-bs-target='#registerModal'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData(${element.id})'>
                                                     <i class="fas mx-2 fa-solid fa-trash" style="color: #ff0000"></i> Delete
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                    <span class="badge text-bg-primary rounded-pill hidden">14</span>
                </li>`;
        });
    }

    // curd_table.innerHTML = html;
    curd_table.classList.remove("d-none");
    curd_table.classList.remove("d-flex");
    filter_table.classList.add("d-none");
    document.querySelector("#curd-table > ul").innerHTML = html;
    /*  document.getElementById("filter-table").classList.add("d-none");
    document.getElementById("sort-table").classList.add("d-none");*/
}

// Load all data when document or page load
showData();

/**
 * @function AddData
 *
 * @description The function is adds a new product to the localStorage using
 *              form data, generates a new ID, and reloads the page to display
 *              the updated data. It also clears the form and displays an alert message.
 *
 * @param none
 */
function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let divisions = document.getElementById("divisions").value;
        let scorecard = document.getElementById("scorecard").value;
        let event_id = document.getElementById("event_id").value;
        let image = document.getElementById("inputGroupFile01");
        let reader = new FileReader();

        let memberLists;
        if (localStorage.getItem("memberLists") == null) {
            memberLists = [];
        } else {
            memberLists = JSON.parse(localStorage.getItem("memberLists"));
        }

        // generate new ID by incrementing the highest existing ID
        let id = 1;
        if (memberLists.length > 0) {
            let ids = memberLists.map((product) => product.id);
            id = Math.max(...ids) + 1;
        }

        /**
         * @function anonymous-Function (Arrow Function)
         *
         * @description The function reads the data URL of an image file, and
         *              adds product details to the memberLists and stores it
         *              in localStorage.
         *
         * @param none
         */
        memberLists.push({
            id: parseInt(id),
            name: name,
            event_id: event_id,
            divisions: divisions,
            scorecard: scorecard.trim(),
            image: reader.result,
        });
        localStorage.setItem("memberLists", JSON.stringify(memberLists));
        location.reload();
        showData();

        /*   reader.readAsDataURL(image.files[0]);
        reader.addEventListener("load", () => {
            memberLists.push({
                 id: parseInt(id),
                name: name,
                description: description,
                price: price,
                image: reader.result,
            });
            localStorage.setItem("memberLists", JSON.stringify(memberLists));
            location.reload();
            showData();
        }); */

        document.getElementById("name").value = "";
        document.getElementById("divisions").value = "";
        document.getElementById("scorecard").value = "";
        document.getElementById("event_id").value = "";
        document.getElementById("inputGroupFile01").value = "";
        //document.getElementById("close-btn").click();
        document.querySelector(".btn-close").click();
        alert("Data Added Successfully");
    }
}

/**
 * @function deleteData
 *
 * @description This function deletes an item from an array called 'memberLists'
 *              and updates local storage. It also displays a confirmation message
 *              to the user before deleting the item.
 *
 * @param index
 */
function deleteData(iD) {
    let memberLists;
    if (localStorage.getItem("memberLists") == null) {
        memberLists = [];
    } else {
        memberLists = JSON.parse(localStorage.getItem("memberLists"));
    }
    if (confirm("Are you sure you want to delete item with ID = " + iD + "?")) {
        memberLists = memberLists.filter((item) => item.id !== iD);
        localStorage.setItem("memberLists", JSON.stringify(memberLists));
        showData();
        location.reload(); // Reload the current page
    }
}

/**
 * @function editData
 *
 * @description -This function edits the details of a product at a specific index. It
 *               reads the data from local storage and updates the HTML elements with
 *               the corresponding values. It also adds event handlers for an image and
 *               a button to update the data.
 *
 * @param index
 */

function calcPercentage(x, y) {
    let stepCounts = ((x / y) * 100).toFixed();
    console.log("step ", stepCounts);
    return stepCounts;
}

var result = document.getElementById("scorecard-edit-error-msg");

function CheckNumeric(e) {
    if (window.event) {
        // IE
        if ((e.keyCode < 48 || e.keyCode > 57) & (e.keyCode != 8) && e.keyCode != 44) {
            //   result.innerHTML = number + " is a whole number.";
            event.returnValue = false;
            return false;
        }
    } else {
        // Fire Fox
        if ((e.which < 48 || e.which > 57) & (e.which != 8) && e.which != 44) {
            e.preventDefault();
            //  result.innerHTML = number + " is a whole number.";
            return false;
        }
    }
}
function editData(iD) {
    let memberLists,
        scratch = 0,
        delimiter = ",";
    if (localStorage.getItem("memberLists") == null) {
        memberLists = [];
    } else {
        memberLists = JSON.parse(localStorage.getItem("memberLists"));
    }

    let numOfGames = JSON.parse(localStorage.getItem("numOfGames"));
    let registerMember = document.querySelector("#registerMember");
    for (let i = 0; i < memberLists.length; i++) {
        if (memberLists[i].id == iD) {
            let stepVal = memberLists[i].step;
            let arrString = memberLists[i].scorecard.toString();
            arrItems = arrString.split(delimiter);

            arrayNums = arrItems.map((i) => Number(i));
            console.log("current", arrayNums);
            console.log("current length", arrayNums.length);
            step_edit.value = arrayNums.length;
            if (arrayNums.length > 0) {
                buildScorObjs(memberLists[i], arrayNums);
            }

            scratch = arrayNums.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            function addHndcp(div, mltplier) {
                //  alert(stepVal);
                if (
                    ((div !== null || div !== NaN) && mltplier !== null) ||
                    mltplier !== NaN ||
                    mltplier !== "undefined"
                ) {
                    console.log(mltplier);
                    return scratch + parseInt(div) * parseInt(mltplier);
                } else {
                    return null;
                }
            }

            /*  function addHndcp(div) {
                    if (div !== null || div !== NaN) {
                        return scratch + (parseInt(div));
                    } else {
                        return null;
                    }
                } */
            function imgSwitcher(img, name) {
                if (!img) {
                    return `<div id="name-image-show" class='circle' style='background-color: ${
                        memberLists[i].avatar_bg
                    };'>
                                            <p class='circle-inner'>${getInitials(name)}</p>
                                        </div>`;
                } else {
                    return `<img id="image-show2" src="${img}" class="rounded-circle img-thumbnail"
                                            alt="profile-image">`;
                }
            }
            function imgHandler(img) {
                if (!img) {
                    return "./img/no-pic.jpg";
                } else {
                    return img;
                }
            }
            if (arrayNums.length == numOfGames) {
                scorecard_edit.disabled = true;
                addScoreParent.classList.add("hidden");
            } else {
                scorecard_edit.disabled = false;
                addScoreParent.classList.remove("hidden");
            }

            id_edit.value = memberLists[i].id;
            name_show.textContent = memberLists[i].name;
            //name_image_show.textContent = getInitials(memberLists[i].name);
            /* name_image_show.stye.backgroundColor = randColor(); */

            profile_img.innerHTML = imgSwitcher(memberLists[i].image, memberLists[i].name);
            profile_img2.innerHTML = imgSwitcher(memberLists[i].image, memberLists[i].name);
            //  image_show.src = imgHandler(memberLists[i].image);
            name_edit.value = memberLists[i].name;
            name_edit_text.innerText = memberLists[i].name;
            isplaying_edit.value = memberLists[i].isplaying;
            divisions_edit.value = memberLists[i].divisions.replace(/\s/g, ",");
            event_id_edit.value = memberLists[i].event_id;
            scorecard_edit.value = memberLists[i].scorecard.replace(/\s/g, ",");
            scratch_edit.value = scratch;

            function removeLastComma(strng) {
                var n = strng.lastIndexOf(",");
                var a = strng.substring(0, n);
                return a;
            }

            function showReg() {
                if (!memberLists[i].isplaying) {
                    myTab.classList.add("hidden");
                    registerMember.classList.toggle("hidden");
                } else {
                    myTab.classList.remove("hidden");
                    registerMember.classList.toggle("hidden");
                }
            }
            showReg();

            function handleSwitchInput(isplaying_edit) {
                let toggleID = isplaying_edit.id;
                console.log("toggleID", toggleID);
                console.log("isplaying_edit.value ", JSON.parse(isplaying_edit.value));
                if (JSON.parse(isplaying_edit.value) === true || isplaying_edit.value == "true") {
                    //document.getElementById(toggleID).disabled = true;
                    document.getElementById(toggleID).parentNode.classList.remove("off", "btn-secondary");
                    document.getElementById(toggleID).parentNode.classList.add("btn-sucess");
                } else {
                    document.getElementById(toggleID).checked = false;
                    document.getElementById(toggleID).parentNode.classList.add("off", "btn-secondary");
                    document.getElementById(toggleID).parentNode.classList.remove("btn-sucess");
                }
                document.getElementById(toggleID).addEventListener("change", function (event) {
                    if (event.target.checked) {
                        console.log("Checkbox is checked..");
                        event.target.value = true;
                    } else {
                        console.log("Checkbox is not checked..");
                        event.target.value = false;
                        // registerMember.classList.toggle("hidden");
                    }
                    registerMember.classList.remove("hidden");
                });
            }

            //  handleSwitchInput(isplaying_toggle, isplaying_edit);
            handleSwitchInput(isplaying_edit);

            let img = function () {
                if (!memberLists[i].image) {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image' style='height: 100%; width: 100%;'
              />`;
                } else {
                    return `<img data-id=" + memberLists[i].id + "
              src='${memberLists[i].image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image' style='height: 100%; width: 100%;'
              />`;
                }
            };

            /*     let imagePreview = document.getElementById("image-div");
            imagePreview.src = memberLists[i].image;
            document.getElementById("image-div").innerHTML = img(); */

            /**
             * @function anonymous-Function (Arrow Function)
             *
             * @description this function is used When the user selects an image file using the file dialog
             *              input element, the function reads the contents of the selected file and updates
             *              the image property of a iten object at a specific index in an array called memberLists.
             *
             * @param event
             */
            let imageEdit = document.getElementById("image-edit");
            imageEdit.onchange = function (event) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onload = function () {
                    memberLists[i].image = reader.result;
                    imagePreview.src = reader.result;
                    imagePreview.src = reader.result;
                };
                reader.readAsDataURL(file);
            };
            // let validScore = document.getElementById("validateScore");

            /*  var result = document.getElementById("scorecard-edit-error-msg");
            var inp = document.getElementById("scorecard-edit");
            function check() {
                var num = inp.value;
                var number = Number(num);
                if (number === Math.floor(number)) {
                    result.innerHTML = number + " is a whole number.";
                } else {
                    result.innerHTML = number + " is a decimal number.";
                }
            } */

            addScore.onclick = function () {
                let ajaxForm = document.getElementById("ajxForm");

                ajaxForm.innerHTML = `<div class="input-group input-group-lg mb-3">
                                                        <input type="number" id="Glive" style="margin-top: 0px;" class="score-inputs form-control form-control-lg" placeholder="" aria-label="" aria-describedby="button-addon2">
                                                      
                                                        <button class="btn btn-outline-success" type="button" id="acceptScore"> <i class="fa-solid fa-check"></i></button>
                                                       <div id="GliveFeedback" class="invalid-feedback">
                                        Invalid score. Max value is 300.
                                        </div>
                                                        </div>`;
                let gLive = document.getElementById("Glive"),
                    acceptScore = document.querySelector("#acceptScore");
                addScore.classList.add("hidden");
                gLive.focus();
                updateBtn.disabled = true;
                console.log("arrayNums", arrayNums);
                let scoreArray = arrayNums;
                acceptScore.onclick = function () {
                    var score = gLive.value;
                    if (gLive.value > 300) {
                        gLive.classList.add("is-invalid");
                        addScore.disabled = true;
                        acceptScore.disabled = true;
                        updateBtn.disabled = true;
                        return false;
                    } else {
                        gLive.classList.remove("is-invalid");
                        addScore.disabled = false;
                        updateBtn.disabled = false;
                        updateBtn.disabled = false;
                        acceptScore.disabled = true;
                        //  updateBtn.classList.add("btn-success");
                        gLive.disabled = true;
                        ajaxForm.innerHTML = "";
                        // document.querySelector("#acceptScore").classList.remove("btn-outline-success");
                        //  alert(name);
                        scoreArray.push(score);
                        scorecard_edit.value = scoreArray.filter((cV) => cV != "0").join(",");
                        let valString = scoreArray.filter((cV) => cV != "0").join(",");
                        console.log("valString", valString.toString());
                        arrItems = valString.split(delimiter);
                        console.log("arrItems", arrItems);
                        arrayNums = arrItems.map((i) => Number(i));
                        console.log("arrayNums", arrayNums);
                        scratch = arrayNums.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue;
                        }, 0);
                        console.log(scratch);
                        scratch_edit.value = scratch;
                        step_edit.value = arrayNums.length;
                        updateScores(arrayNums.length);
                    }
                };

                gLive.onchange = function (e) {
                    if (e.target.value <= 300) {
                        gLive.classList.remove("is-invalid");
                        acceptScore.disabled = false;
                    } else {
                        gLive.classList.add("is-invalid");
                        acceptScore.disabled = true;
                    }
                };
            };

            scorecard_edit.onchange = function (event) {
                let valString = event.target.value.replaceAll(/\s/g, ",").replaceAll(/\s/g, ",").replace(/,\s*$/, "");
                scorecard_edit.value = valString;
                console.log("valString", valString.toString());
                arrItems = valString.split(delimiter);
                console.log("arrItems", arrItems);
                arrayNums = arrItems.map((i) => Number(i));
                console.log("arrayNums", arrayNums);
                scratch = arrayNums.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                }, 0);
                console.log(scratch);
                scratch_edit.value = scratch;
                step_edit.value = arrayNums.length;
                updateScores(arrayNums.length);
            };

            function updateScores(multiplier) {
                //   alert(multiplier);
                if (memberLists[i].div1) {
                    div1_edit.value = memberLists[i].div1;
                    div1_plus_hcp.value = addHndcp(memberLists[i].div1, multiplier);
                    memberLists[i].div1_plus_hcp = addHndcp(memberLists[i].div1, multiplier);
                    div1_plus_hcp.value = memberLists[i].div1_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }
                if (memberLists[i].div2) {
                    div2_edit.value = memberLists[i].div2;
                    div2_plus_hcp.value = addHndcp(memberLists[i].div2, multiplier);
                    memberLists[i].div2_plus_hcp = addHndcp(memberLists[i].div2, multiplier);
                    div2_plus_hcp.value = memberLists[i].div2_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div3) {
                    div3_edit.value = memberLists[i].div3;
                    div3_plus_hcp.value = addHndcp(memberLists[i].div3, multiplier);
                    memberLists[i].div3_plus_hcp = addHndcp(memberLists[i].div3, multiplier);
                    div3_plus_hcp.value = memberLists[i].div3_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div4) {
                    div4_edit.value = memberLists[i].div4;
                    div4_plus_hcp.value = addHndcp(memberLists[i].div4, multiplier);
                    memberLists[i].div4_plus_hcp = addHndcp(memberLists[i].div4, multiplier);
                    div4_plus_hcp.value = memberLists[i].div4_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div5) {
                    div5_edit.value = memberLists[i].div5;
                    div5_plus_hcp.value = addHndcp(memberLists[i].div5, multiplier);
                    memberLists[i].div5_plus_hcp = addHndcp(memberLists[i].div5, multiplier);
                    div5_plus_hcp.value = memberLists[i].div5_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div6) {
                    div6_edit.value = memberLists[i].div6;
                    div6_plus_hcp.value = addHndcp(memberLists[i].div6, multiplier);
                    memberLists[i].div6_plus_hcp = addHndcp(memberLists[i].div6, multiplier);
                    div6_plus_hcp.value = memberLists[i].div6_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div7) {
                    div7_edit.value = memberLists[i].div7;
                    div7_plus_hcp.value = addHndcp(memberLists[i].div7, multiplier);
                    memberLists[i].div7_plus_hcp = addHndcp(memberLists[i].div7, multiplier);
                    div7_plus_hcp.value = memberLists[i].div7_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div8) {
                    div8_edit.value = memberLists[i].div8;
                    div8_plus_hcp.value = addHndcp(memberLists[i].div8, multiplier);
                    memberLists[i].div8_plus_hcp = addHndcp(memberLists[i].div8, multiplier);
                    div8_plus_hcp.value = memberLists[i].div8_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div9) {
                    div9_edit.value = memberLists[i].div9;
                    div9_plus_hcp.value = addHndcp(memberLists[i].div9, multiplier);
                    memberLists[i].div9_plus_hcp = addHndcp(memberLists[i].div9, multiplier);
                    div9_plus_hcp.value = memberLists[i].div9_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }

                if (memberLists[i].div10) {
                    div10_edit.value = memberLists[i].div10;
                    div10_plus_hcp.value = addHndcp(memberLists[i].div10, multiplier);
                    memberLists[i].div10_plus_hcp = addHndcp(memberLists[i].div10, multiplier);
                    div10_plus_hcp.value = memberLists[i].div10_plus_hcp;
                    buildScorObjs(memberLists[i], arrayNums);
                }
            }
            function createDivDynamicInputs(i) {
                delimiter = ",";
                let mydivString = memberLists[i].divisions;
                console.log("mydivString", mydivString);
                let temp;
                divItems = mydivString.split(delimiter);
                console.log("divItems", divItems);
                /***** division assigned handicap  */
                let dvsionGrp = document.getElementById("divisionsGrp");
                for (var i = 0; i < divItems.length; i++) {
                    temp = document.createElement("div");
                    temp.classList.add("col");
                    let temp0 = document.createElement("div");
                    temp0.classList.add("form-floating", "mb-3");
                    let temp1 = document.createElement("label");
                    temp1.innerHTML = divItems[i].toUpperCase() + " <small>(handicap)</small>";
                    let temp2 = document.createElement("input");
                    temp2.setAttribute("readonly", "readonly");
                    temp2.setAttribute("id", divItems[i] + "_edit");
                    temp2.classList.add("form-control");
                    temp2.type = "number";

                    temp0.appendChild(temp2);
                    temp0.appendChild(temp1);
                    temp.appendChild(temp0);

                    dvsionGrp.appendChild(temp);
                }

                /***** division scoring with handicap  */
                let divisionsScoreHndcap = document.getElementById("divisionsScoreHndcap");
                for (var j = 0; j < divItems.length; j++) {
                    temp = document.createElement("div");
                    temp.classList.add("col");
                    let temp0 = document.createElement("div");
                    temp0.classList.add("form-floating", "mb-3");
                    let temp1 = document.createElement("label");
                    temp1.innerHTML = divItems[j].toUpperCase() + "+ <small>(handicap)</small>";
                    let temp2 = document.createElement("input");
                    temp2.setAttribute("readonly", "readonly");
                    temp2.setAttribute("id", divItems[j] + "_plus_hcp");
                    temp2.classList.add("form-control");
                    temp2.type = "number";

                    temp0.appendChild(temp2);
                    temp0.appendChild(temp1);
                    temp.appendChild(temp0);

                    divisionsScoreHndcap.appendChild(temp);
                }
            }

            createDivDynamicInputs(i);
            /****** DYNAMIC EDIT INPUTS *******/
            let div1_edit = document.getElementById("div1_edit"),
                div2_edit = document.getElementById("div2_edit"),
                div3_edit = document.getElementById("div3_edit"),
                div4_edit = document.getElementById("div4_edit"),
                div5_edit = document.getElementById("div5_edit"),
                div6_edit = document.getElementById("div6_edit"),
                div7_edit = document.getElementById("div7_edit"),
                div8_edit = document.getElementById("div8_edit"),
                div9_edit = document.getElementById("div9_edit"),
                div10_edit = document.getElementById("div10_edit"),
                div1_plus_hcp = document.getElementById("div1_plus_hcp"),
                div2_plus_hcp = document.getElementById("div2_plus_hcp"),
                div3_plus_hcp = document.getElementById("div3_plus_hcp"),
                div4_plus_hcp = document.getElementById("div4_plus_hcp"),
                div5_plus_hcp = document.getElementById("div5_plus_hcp"),
                div6_plus_hcp = document.getElementById("div6_plus_hcp"),
                div7_plus_hcp = document.getElementById("div7_plus_hcp"),
                div8_plus_hcp = document.getElementById("div8_plus_hcp"),
                div9_plus_hcp = document.getElementById("div9_plus_hcp"),
                div10_plus_hcp = document.getElementById("div10_plus_hcp");
            /****** DYNAMIC EDIT INPUTS *******/
            if (memberLists[i].div1) {
                div1_edit.value = memberLists[i].div1;
                memberLists[i].div1_plus_hcp = addHndcp(memberLists[i].div1, memberLists[i].step);
                div1_plus_hcp.value = memberLists[i].div1_plus_hcp;
            }

            if (memberLists[i].div2) {
                div2_edit.value = memberLists[i].div2;
                memberLists[i].div2_plus_hcp = addHndcp(memberLists[i].div2, memberLists[i].step);
                console.log(addHndcp(memberLists[i].div2, memberLists[i].step));
                div2_plus_hcp.value = memberLists[i].div2_plus_hcp;
            }

            if (memberLists[i].div3) {
                div3_edit.value = memberLists[i].div3;
                memberLists[i].div3_plus_hcp = addHndcp(memberLists[i].div3, memberLists[i].step);
                div3_plus_hcp.value = memberLists[i].div3_plus_hcp;
            }

            if (memberLists[i].div4) {
                div4_edit.value = memberLists[i].div4;
                memberLists[i].div4_plus_hcp = addHndcp(memberLists[i].div4, memberLists[i].step);
                div4_plus_hcp.value = memberLists[i].div4_plus_hcp;
            }

            if (memberLists[i].div5) {
                div5_edit.value = memberLists[i].div5;
                memberLists[i].div5_plus_hcp = addHndcp(memberLists[i].div5, memberLists[i].step);
                div5_plus_hcp.value = memberLists[i].div5_plus_hcp;
            }

            if (memberLists[i].div6) {
                div6_edit.value = memberLists[i].div6;
                memberLists[i].div6_plus_hcp = addHndcp(memberLists[i].div6, memberLists[i].step);
                div6_plus_hcp.value = memberLists[i].div6_plus_hcp;
            }

            if (memberLists[i].div7) {
                div7_edit.value = memberLists[i].div7;
                memberLists[i].div7_plus_hcp = addHndcp(memberLists[i].div7, memberLists[i].step);
                div7_plus_hcp.value = memberLists[i].div7_plus_hcp;
            }

            if (memberLists[i].div8) {
                div8_edit.value = memberLists[i].div8;
                memberLists[i].div8_plus_hcp = addHndcp(memberLists[i].div8, memberLists[i].step);
                div8_plus_hcp.value = memberLists[i].div8_plus_hcp;
            }

            if (memberLists[i].div9) {
                div9_edit.value = memberLists[i].div9;
                memberLists[i].div9_plus_hcp = addHndcp(memberLists[i].div9, memberLists[i].step);
                div9_plus_hcp.value = memberLists[i].div9_plus_hcp;
            }

            if (memberLists[i].div10) {
                div10_edit.value = memberLists[i].div10;
                memberLists[i].div10_plus_hcp = addHndcp(memberLists[i].div10, memberLists[i].step);
                div10_plus_hcp.value = memberLists[i].div10_plus_hcp;
            }

            /**
             * @function anonymous-Function (Arrow Function)
             *
             * @description The code defines an event handler function for the onclick event of an
             *              HTML element with an id of "update". When the user clicks on this element,
             *              the function performs a series of actions related to updating a item's details,
             *              and store updated details into localstorage.
             *
             * @param none
             */

            document.querySelector("#registerMember").onclick = function () {
                // memberLists[i].id = document.getElementById("id-edit").value;

                memberLists[i].isplaying = isplaying_edit.value;

                // this line is used to convert the array to a JSON string before it is saved to local storage.
                localStorage.setItem("memberLists", JSON.stringify(memberLists));
                // The is method, which refreshes the page with the updated data.
                location.reload();

                showData();

                document.querySelector(".btn-close").click();
                // alert("Registered Successfully");
            };

            function buildScorObjs(curobj, arr) {
                let scoreInputs = document.getElementById("scoreInputs");
                arrayNums = arr.map((i) => Number(i));
                console.log("arrayNums ", arrayNums);
                let html = "";
                let scrItems = [];

                if (arrayNums.length > 0 && arrayNums[0] != 0) {
                    arrayNums.forEach((element, index) => {
                        html += `<div class='col-lg-2 col-md-4 col-sm-6' data-index='${index}'>
                        <div class='form-floating mb-3 mt-2'>
                          
                            <input disabled class="score-inputs form-control form-control-lg" type='number' key='${index}' title='${index}' value='${element}' id='g${
                            index + 1
                        }-live' placeholder='' aria-label='Game scores' aria-describedby='inputGroup-sizing-default'>
                  <label for='exampleFormControlSelect1'>G-${index + 1}</label>
                        </div>
                    </div>`;
                        scrItems.push({["g" + [index + 1]]: element});
                    });

                    /*  let arrString = memberLists[i].scorecard.toString();
                    arrItems = arrString.split(delimiter);
                    arrayNums = arrItems.map((i) => Number(i));
                    console.log("scrItems current", arrayNums);
                    console.log("scrItems ecurrent length", arrayNums.length); */
                    /* if (arrayNums.length >= 1) {
                        buildScorObjs(productList[index], arrayNums);
                        document.getElementById("step-edit").value = arrayNums.length;
                    } */
                    console.log("scrItems ", scrItems);
                    let newOb = Object.assign({}, ...scrItems);
                    Object.assign(curobj, newOb); /************* This updates the array with new scores */
                    console.log("New array ", Object.assign(curobj, newOb));

                    scoreInputs.innerHTML = html;
                }
            }

            document.querySelector("#update").onclick = function () {
                // memberLists[i].id = document.getElementById("id-edit").value;
                memberLists[i].name = name_edit.value;
                memberLists[i].isplaying = isplaying_edit.value;
                memberLists[i].divisions = divisions_edit.value;
                memberLists[i].event_id = event_id_edit.value;
                memberLists[i].scorecard = scorecard_edit.value;
                memberLists[i].scratch = scratch_edit.value;
                memberLists[i].step = step_edit.value;
                checkNumRegister();
                // this line is used to convert the array to a JSON string before it is saved to local storage.
                localStorage.setItem("memberLists", JSON.stringify(memberLists));
                // The is method, which refreshes the page with the updated data.

                showData();
                id_edit.value = "";
                scorecard_edit.value = "";
                name_edit.value = "";
                divisions_edit.value = "";
                event_id_edit.value = "";
                step_edit.value = "";

                //  document.getElementById("close-btn").click();
                document.querySelector(".btn-close").click();
                //     alert("Data Updated Successfully");
                location.reload();
            };
        }
    }
}

/**
 * @function searchBar
 *
 * @description This function is designed to search for products in a Arraylist
 *              based on user input. It first gets the search value from an input
 *              field with an id of "searchMemberText". It then give an array of
 *              item from the local storage using the key "memberLists".
 *
 * @param none
 */
function searchBar() {
    let searchvalue = document.querySelector("#serachProductText").value;
    console.log("searchvalue", searchvalue);
    let sortedItem = [];
    let sortedMembers = JSON.parse(localStorage.getItem("memberLists")) ?? [];
    let regex = new RegExp(searchvalue, "i");
    for (let element of sortedMembers) {
        console.log("regex", regex);
        let item = element;
        if (regex.test(item.name)) {
            sortedItem.push(element);
        }
    }
    console.log("sortedItem", sortedItem);
    searchMember(sortedItem);
}

/**
 * @function searchMember
 *
 * @description This function is generates HTML code to display search
 *              results for items. If there are no results, it displays an
 *              image and a error message. Otherwise, it generates a card
 *              for each product that matches the search query,
 *
 * @param sortedItem (a array format)
 */
function searchMember(sortedItem) {
    document.querySelector("#sort-table").classList.add("d-flex");

    let html = "";
    console.log("searchMember", sortedItem);
    if (sortedItem.length === 0) {
        // Display an image if the memberLists array is empty
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/search-not-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products" style="width: 18rem; height: 18rem;">
              <p class="text-center">No Similar Items Found..!</p>
            </div>
          </div>
        </div>
      </div>`;
    } else {
        sortedItem.forEach(function (element, index) {
            let img = function () {
                if (!element.image) {
                    return `<div class='circle' style='background-color: ${element.avatar_bg}'>
                <p class='circle-inner'  style='height: 100px; width: 100px;>${getInitials(element.name)}</p>
                </div>`;
                } /* {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image' style='height: 100px; width: 100px;'
              />`;
                }  */ else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image' style='height: 100px; width: 100px;'
              />`;
                }
            };
            html += `<div>
   <div class='row gx-2'>
      <div class='col'>
         <div class='p-3'>
            <div class='card d-flex card-all' >
               <div class='card-body'style="width: 100%;" onclick='editData("${
                   element.id
               }")' type='button' data-bs-toggle='modal' data-bs-target='#editMemberModal'>
                  <h5 class='card-title text-center hidden'><strong>MID</strong> ${element.id} </h5>
                  ${img()}
               </div>
               <ul class='list-group list-group-flush' onclick='editData("${
                   element.id
               }")' type='button' data-bs-toggle='modal' data-bs-target='#editMemberModal'>
                  <li class='list-group-item'>
                     <p class='text-center fs-5'><strong> ${element.name} </strong> </p>
                  </li>
                  <li class='list-group-item text-capitalize hidden'><strong>${element.divisions}</strong> </li>
               </ul>
               <div class='card-body'>
                  <div class="dropdown ms-auto text-right">
                     <i class="btn fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                     <ul class="dropdown-menu" style="">
                        <li>
                           <span class="dropdown-item" onclick='editData(${
                               element.id
                           })' type='button' data-bs-toggle='modal' data-bs-target='#editMemberModal'>
                           <i class="fas fa-pen mx-2"></i> Update
                           </span>
                        </li>
                        <li>
                           <span class="dropdown-item" onclick='deleteData(${element.id})'>
                           <i class="fas mx-2 fa-solid fa-trash" style="color: #ff0000"></i> Delete
                           </span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>`;
        });
    }
    curd_table.classList.add("d-none");
    filter_table.innerHTML = html;
    /*  document.querySelector("#curd-table").classList.add("d-none");
    document.querySelector("#filter-table").classList.remove("d-none");
    document.querySelector("#filter-table").innerHTML = html;
    document.querySelector("#sort-table").classList.remove("d-none"); */
}

/**
 * @function anonymous-Function (Arrow Function)
 *
 * @description When the user selects an option from the dropdown menu of
 *              sorting, the value of the selected option is stored in the sortBy variable.
 *              Then, the filterSort function is called with sortBy as its
 *              argument to perform the sorting action based on the selected value.
 *
 * @param change (it take any event as a parameter)
 */
let selectElem = document.querySelector("#sort-select");
selectElem.addEventListener("change", (event) => {
    let sortBy = event.target.value;
    filterSort(sortBy); // perform the sorting action based on the selected value
    console.log("current sortBy", sortBy);
    localStorage.setItem("sortBy", sortBy);
    if (sortBy == "refresh-btn") {
        location.reload(); // refresh the page
    }
});

/**
 * @function filterSort
 *
 * @description Overall, this function seems to be designed to sort an array of
 *              products based on different criteria like (with name, id, price)
 *              and return the sorted data.
 *
 * @param sortvalue
 */

function filterSort(sortvalue) {
    let memberLists = JSON.parse(localStorage.getItem("memberLists")) ?? [];
    let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers")) ?? [];
    let sortedMembers = JSON.parse(localStorage.getItem("sortedMembers")) ?? [];

    filteredMembers = memberLists;
    sortedMembers = filteredMembers;
    localStorage.setItem("sortedMembers", JSON.stringify(sortedMembers));
    let divHcp = 0;
    /**
     * @description This code block is a conditional statement that checks
     *              the value of the sortvalue parameter to determine the
     *              sorting criteria to be used for the product list.
     */

    if (sortvalue == "isplaying") {
        filteredMembers = filteredMembers.filter((filteredMember) => filteredMember.isplaying == "true");
        localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
        console.log("Playing", filteredMembers);
        return filteredData(filteredMembers, sortvalue);
    }

    if (sortvalue == "desc") {
        let desc = true;
        sortedMembers = sortedMembers.sort((a, b) => (desc ? b.id - a.id : a.id - b.id));
        desc = !desc;
        console.log("descending", sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "asc") {
        let desc = false;
        sortedMembers = sortedMembers.sort((a, b) => (desc ? b.id - a.id : a.id - b.id));
        console.log("Asc", sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } /* else if (sortvalue == "name") {
        sortedMembers = sortedMembers = sortedMembers.sort((a, b) => a.name.localeCompare(b.name));
        console.log("name", sortedMembers);
        return filteredData(sortedMembers);
    } else if (sortvalue == "price") {
        sortedMembers = sortedMembers.sort((a, b) => b.price - a.price);
        console.log("Price", sortedMembers);
        return filteredData(sortedMembers);
    } else if (sortvalue == "div1") {
        //   sortedMembers = sortedMembers.sort((a, b) => b.div1 - a.div1);
        sortedMembers = sortedMembers.filter((memberLists) => !!memberLists.div1).sort((a, b) => b.div1 - a.div1);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers);
    } else if (sortvalue == "div2") {
        sortedMembers = memberLists.filter((memberLists) => !!memberLists.div2).sort((a, b) => b.div2 - a.div2);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers);
    } else if (sortvalue == "div3") {
        sortedMembers = memberLists.filter((memberLists) => !!memberLists.div3).sort((a, b) => b.div3 - a.div3);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers);
    } */ else if (sortvalue == "div1_plus_hcp") {
        /********* Filter by div plus hcp *********/
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div1_plus_hcp)
        .sort((a, b) => b.div1_plus_hcp - a.div1_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div2_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div2_plus_hcp)
        .sort((a, b) => b.div2_plus_hcp - a.div2_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div3_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div3_plus_hcp)
        .sort((a, b) => b.div3_plus_hcp - a.div3_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div4_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div4_plus_hcp)
        .sort((a, b) => b.div4_plus_hcp - a.div4_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div5_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div5_plus_hcp)
        .sort((a, b) => b.div5_plus_hcp - a.div5_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div6_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div6_plus_hcp)
        .sort((a, b) => b.div6_plus_hcp - a.div6_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div7_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div7_plus_hcp)
        .sort((a, b) => b.div7_plus_hcp - a.div7_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div8_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div8_plus_hcp)
        .sort((a, b) => b.div8_plus_hcp - a.div8_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div9_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div9_plus_hcp)
        .sort((a, b) => b.div9_plus_hcp - a.div9_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else if (sortvalue == "div10_plus_hcp") {
        sortedMembers = memberLists
        .filter((memberLists) => !!memberLists.div10_plus_hcp)
        .sort((a, b) => b.div10_plus_hcp - a.div10_plus_hcp);
        console.log(sortvalue, sortedMembers);
        return filteredData(sortedMembers, sortvalue);
    } else {
        return false;
    }
}

/**
 * @function filteredData
 *
 * @description This is a function is takes array as a parameter. The function
 *              generates HTML code to display the sorted products in a card format.
 *
 * @param sortedMembers (as a Array format)
 */

function filteredData(sortedMembers, sortvalue) {
    document.querySelector("#sort-table").classList.remove("d-flex");
    let html = "";
    console.log("filterData", sortedMembers);
    //localStorage.setItem("currentFilterSort", JSON.stringify(sortvalue) + ":" + JSON.stringify(sortedMembers));
    localStorage.setItem("currentFilterSort", JSON.stringify(sortedMembers));
    console.log("sortvalue", sortvalue);
    let divHcp = sortvalue.replace("_plus_hcp", "");
    let currentFilterSort = JSON.parse(localStorage.getItem("currentFilterSort"));
    let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers"));

    let eventData = JSON.parse(localStorage.getItem("eventLists"));
    eventData[0].members = currentFilterSort;
    console.log("EVENT", eventData);

    console.log("divHcp", divHcp);
    localStorage.setItem("mergedEventData", JSON.stringify(eventData));

    let eventAllData = JSON.parse(localStorage.getItem("eventLists"));
    eventAllData[0].members = filteredMembers;
    localStorage.setItem("mergedAllEventData", JSON.stringify(eventAllData));
    console.log("EVENT ALL", eventAllData);
    showCurrTable(sortvalue);
    showAllTable();

    // console.log("currentFilterSort", currentFilterSort);
    if (sortedMembers.length === 0) {
        //  document.getElementById("footerExport").classList.add("hidden");
        // This Below HTML Code Display when product list's array is Empty.
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.jpg" class="img-fluid rounded mx-auto d-block" alt="No Items">
              <p class="text-center">No items to display</p>
            </div>
          </div>
        </div>
      </div>`;
    } else {
        /*  document.getElementById("footerExport").classList.remove("hidden"); */
        sortedMembers.forEach(function (element, index) {
            // This Below HTML code is generate Card For Sorted Items.

            let img = function () {
                if (!element.image) {
                    return `<div class='circle' style='background-color: ${element.avatar_bg}'>
                    <p class='circle-inner'>${getInitials(element.name)}</p>
                    </div>`;
                } /*  {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                } */ else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }
            };

            //  let divHCP = "<strong>" + element[divHcp] + "</strong>" + " " + divHcp + " hcp";
            let divHCP = "<span style='color: #7b7e8a;'><strong>" + element[divHcp] + "</strong>" + " hcp</span>";

            let scrTch = function () {
                // console.log("sortvalue", sortvalue);
                if (!element[sortvalue]) {
                    return `0`;
                } else {
                    return `${element[sortvalue]}`;
                }
            };

            let stepPercent = function () {
                let perc = calcPercentage(element.step, element.numofgames);
                if (!element.step) {
                    return ``;
                } else {
                    return `<div class="m-widget4__progress ms-auto"><div class="m-widget4__progress-wrapper"> <span class="m-widget17__progress-number"> ${perc}% </span> <span class="m-widget17__progress-label"> Complete </span><div class="progress m-progress--sm"><div class="progress-bar bg-success" role="progressbar" style="width: ${perc}%;" aria-valuenow="${element.step}" aria-valuemin="0" aria-valuemax="${element.numofgames}"></div></div></div></div>`;
                }
            };
            html += `<li data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb">
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto max-w-s mt-auto mb-auto">
                        <div class="fw-bold">${element.name}</div>
                        <span class="fw-bold">${scrTch()}</span> points | <span> ${divHCP}</span>
                    </div>
                    ${stepPercent()}
                        <div class="dropdown ms-auto hidden">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData(${
                                                    element.id
                                                })' type='button' data-bs-toggle='modal' data-bs-target='#editMemberModal'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData(${element.id})'>
                                                     <i class="fas mx-2 fa-solid fa-trash" style="color: #ff0000"></i> Delete
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                    <span class="badge text-bg-primary rounded-pill hidden">14</span>
                </li>`;
        });
    }
    /*     document.querySelector("#curd-table").classList.add("d-none");
    document.getElementById("filter-table").classList.add("d-none");
    document.querySelector("#sort-table > ol").innerHTML = html; */
    curd_table.classList.add("d-none");
    filter_table.classList.add("d-none");
    listTitle.innerText = divHcp.toUpperCase() + " Ranking";
    sort_table.classList.remove("d-none");
    document.querySelector("#sort-table > ol").innerHTML = html;
}

function checkAvailStorage() {
    let limitLS = 5000;

    const localStorageSpace = () => {
        let allStrings = "";
        for (const key of Object.keys(window.localStorage)) {
            allStrings += window.localStorage[key];
        }
        // console.log("allStrings", allStrings.length * 16);
        return allStrings ? (9 + (allStrings.length * 16) / (8 * 1024)).toFixed(2) : "Empty (0 KB)";
    };

    if (limitLS - localStorageSpace() > 1000) {
        document.getElementById("storeageInfo").innerHTML =
            "<div class='bg-success rounded-pill'><small>" + localStorageSpace() + " KB </small></div>";
    } else {
        document.getElementById("storeageInfo").innerHTML =
            "<div class='bg-danger rounded-pill'><small>" + localStorageSpace() + "</small></div>";
    }
    console.log("localStorageSpace", localStorageSpace());
}

checkAvailStorage();

function initData() {
    let eventData = [
        {
            eventID: "AAA-001",
            eventName: "Super Hero Squad",
            eventVenue: "MCS",
            numOfGames: "6",
            datetimeStart: "2018-12-12T02:30",
            datetimeEnd: "2018-12-12T19:30",
            eventNumDivs: "3",
            eventDivs: [
                {
                    name: "Div 1",
                    value: "div1",
                },
                {
                    name: "Div 2",
                    value: "div2",
                },
                {
                    name: "Div 3",
                    value: "div3",
                },
            ],
            companyID: "USBC",
            active: true,
        },
    ];

    let memberData = [
        {
            id: 1,
            name: "Neil Sims",
            event_id: "AAA-001",
            price: "100",
            image: "https://flowbite.com/application-ui/demo/images/users/neil-sims.png",
            divisions: "div1,div3",
            div1: "30",
            div3: "35",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
        {
            id: 2,
            name: "Roberta Casas",
            event_id: "AAA-001",
            price: "200",
            image: "https://flowbite.com/application-ui/demo/images/users/roberta-casas.png",
            divisions: "div1",
            div1: "20",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
        {
            id: 3,
            name: "Jesse Leos",
            event_id: "AAA-001",
            price: "180",
            image: "https://flowbite.com/application-ui/demo/images/users/jese-leos.png",
            divisions: "div2",
            div2: "40",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
        {
            id: 4,
            name: "Helene Engels",
            event_id: "AAA-001",
            price: "190",
            image: "https://flowbite.com/application-ui/demo/images/users/helene-engels.png",
            divisions: "div2,div3",
            div2: "60",
            div3: "65",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
        {
            id: 5,
            name: "Bonnie Green",
            event_id: "AAA-001",
            price: "190",
            image: "",
            divisions: "div2",
            div2: "62",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
        {
            id: 6,
            name: "Michael Gough",
            event_id: "AAA-001",
            price: "190",
            image: "",
            divisions: "div2,div3",
            div2: "45",
            div3: "50",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },

        {
            id: 7,
            name: "Robert Brown",
            event_id: "AAA-001",
            price: "190",
            image: "",
            divisions: "div1",
            div1: "15",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },

        {
            id: 8,
            name: "Thomas Lean",
            event_id: "AAA-001",
            price: "190",
            image: "",
            divisions: "div2",
            div2: "45",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },

        {
            id: 9,
            name: "Lana Byrd",
            event_id: "AAA-001",
            price: "190",
            image: "",
            divisions: "div1",
            div1: "1",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
        {
            id: 10,
            name: "Leslie Livingston",
            event_id: "AAA-001",
            price: "190",
            image: "",
            divisions: "div1",
            div1: "10",
            div1_plus_hcp: "",
            div2_plus_hcp: "",
            div3_plus_hcp: "",
            scorecard: "",
            numofgames: "6",
            onpot: false,
            isplaying: false,
        },
    ];

    memberLists = "";
    if (localStorage.getItem("memberLists") == null) {
        window.localStorage.clear();
        localStorage.setItem("memberLists", JSON.stringify(memberData));
    } else {
        memberLists = JSON.parse(localStorage.getItem("memberLists"));
    }
    eventLists = "";
    if (localStorage.getItem("eventLists") == null) {
        localStorage.setItem("eventLists", JSON.stringify(eventData));
        localStorage.setItem("numOfGames", JSON.stringify(eventData[0].numOfGames));
        localStorage.setItem("eventNumDivs", JSON.stringify(eventData[0].eventNumDivs));
        localStorage.setItem("eventDivs", JSON.stringify(eventData[0].eventDivs));
        localStorage.setItem("companyID", eventData[0].companyID);
        localStorage.setItem("eventID", eventData[0].eventID);
    } else {
        eventObj = JSON.parse(localStorage.getItem("eventLists"));
        eventLists = eventObj.filter((item) => item.active == true);
        numOfGames = JSON.parse(localStorage.getItem("numOfGames"));
        eventNumDivs = JSON.parse(localStorage.getItem("eventNumDivs"));
        companyID = localStorage.getItem("companyID");
        eventID = localStorage.getItem("eventID");

        const arr = memberLists;
        arr.forEach((element) => {
            element.numofgames = numOfGames;
            element.eventnumdivs = eventNumDivs;
            element.company_id = companyID;
            element.event_id = eventID;
            element.avatar_bg = randColor();
        });
        localStorage.setItem("memberLists", JSON.stringify(arr));
    }

    /************ Appends a filter option on the dropdown based on Event's eventDivs **************/
    function createFiltertDivisions() {
        let eventDivs = JSON.parse(localStorage.getItem("eventDivs"));
        let json = eventDivs;
        let dropdown = document.getElementById("sort-select");
        for (let i = 0; i < json.length; i++) {
            console.log(json.length);
            var option = document.createElement("option");
            option.text = json[i].name + " + hcp";
            option.value = json[i].value + "_plus_hcp";
            dropdown.add(option);
        }
    }
    createFiltertDivisions();
    /************ Appends a filter option on the dropdown based on Event's eventDivs **************/
    //  isEmptyFiltered();
    // document.body.classList.add("isHome");
}
initData();

/********** Steps Filter  */

function filterStepsBy(listObjID) {
    let memberLists = JSON.parse(localStorage.getItem("memberLists")) ?? [];
    let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers")) ?? [];
    let Bod = document.body;
    let noFooter = Bod.classList.contains("footer-hide");
    filteredMembers = memberLists;

    localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));

    if (listObjID == "isHome") {
        filteredMembers = memberLists;
        /* localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers)); */
        // localStorage.setItem("memberLists", JSON.stringify(filteredMembers));
        localStorage.setItem("memberLists", JSON.stringify(memberLists));
        //  searchMemberForm.classList.add("d-none");
        curd_table.classList.add("d-none");
        filter_table.classList.add("d-none");
        selectElem.classList.add("d-none");
        filterTitle.innerText = "Dashboard";
        homeChart.classList.remove("d-none");
        Bod.classList.add("isHome");
        loadChart(true);
        renderHideBtns(false, false, false);
        Bod.classList.remove("reGister", "isNowPlaying", "ranKing", "footer-is-shown");
        /*   if (noFooter) {
            Bod.classList.remove("footer-is-shown");
        } */
        //  document.querySelector("footer").classList.add("hidden");
        console.log("unRegistered", filteredMembers);
        //  return filtrdStepComp(filteredMembers, "#registerModal");
    } else if (listObjID == "reGister") {
        filteredMembers = memberLists.filter((memberLists) => memberLists.isplaying != "true");
        localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
        selectElem.classList.add("d-none");
        toPlayMembers = memberLists.filter((memberLists) => memberLists.isplaying == "true");
        localStorage.setItem("toPlay", JSON.stringify(toPlayMembers.length));
        homeChart.classList.add("d-none");
        filterTitle.innerText = "Registration";
        loadChart(false);
        renderHideBtns(false, true, false);
        handleSearchForm("registerBox", "searchHolder", true);
        Bod.classList.add("reGister", "footer-hide");
        Bod.classList.remove("isHome", "isNowPlaying", "ranKing");
        localStorage.setItem("toRegister", JSON.stringify(filteredMembers.length));
        //   filterMsg.innerText = "Congratulations!";
        // searchMemberForm.classList.remove("d-none");
        let toRegister = localStorage.getItem("toRegister");
        filter_table.classList.remove("d-none");
        if (toRegister.length == 0) {
            document.querySelector("footer").classList.remove("hidden");
        }
        console.log("unRegistered", filteredMembers);
        return filtrdStepComp(filteredMembers, "#registerModal");
    } else if (listObjID == "isNowPlaying") {
        filteredMembers = filteredMembers.filter((filteredMember) => filteredMember.isplaying == "true");
        playedMembers = filteredMembers.filter(
            (filteredMember) => filteredMember.isplaying == "true" && filteredMember.scorecard != ""
        );
        localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
        localStorage.setItem("toPlay", JSON.stringify(filteredMembers.length));
        localStorage.setItem("playEd", JSON.stringify(playedMembers.length));
        selectElem.classList.add("d-none");
        loadChart(false);
        filter_table.classList.remove("d-none");
        homeChart.classList.add("d-none");
        Bod.classList.add("isNowPlaying");
        Bod.classList.remove("isHome", "reGister", "ranKing", "footer-hide");
        /* if (playedMembers.length == 0) {
            document.querySelector("footer").classList.add("hidden");
        } */
        filterTitle.innerText = "Get Scores";
        handleSearchForm("searchHolder", "registerBox", true);
        localStorage.setItem("joIned", JSON.stringify(filteredMembers.length));
        console.log("Registered", filteredMembers);
        return filtrdStepComp(filteredMembers, "#editMemberModal");
    } else if (listObjID == "ranKing") {
        filteredMembers = filteredMembers.filter(
            (filteredMember) => filteredMember.isplaying == "true" && filteredMember.scorecard !== ""
        );
        playedMembers = filteredMembers.filter(
            (filteredMember) => filteredMember.isplaying == "true" && filteredMember.scorecard != ""
        );
        loadChart(false);
        localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
        localStorage.setItem("playEd", JSON.stringify(playedMembers.length));
        selectElem.classList.remove("d-none");
        filterTitle.innerText = "Leaderboard";
        Bod.classList.add("ranKing", "footer-is-shown");
        Bod.classList.remove("isHome", "reGister", "isNowPlaying", "footer-hide");
        handleSearchForm("searchHolder", "registerBox", false);
        selectElem.focus();
        renderHideBtns(true, true, true);
        //   localStorage.setItem("canRank", JSON.stringify(filteredMembers.length));
        console.log("Registered", filteredMembers);
        filter_table.classList.remove("d-none");
        return filtrdStepComp(filteredMembers, "#editMemberModal");
    } else {
        return false;
    }
}
function isEmptyFiltered() {
    let obj = JSON.parse(localStorage.getItem("filteredMembers")) ?? [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    //alert("Empty");
    reGister.parentNode.classList.add("hidden");
    return true;
}

function filtrdStepComp(filtrdMembers, modalTarget) {
    document.querySelector("#filter-table").classList.remove("d-flex");
    let html = "";
    console.log("filterData", filtrdMembers);

    if (filtrdMembers.length === 0) {
        // This Below HTML Code Display when product list's array is Empty.
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.jpg" class="img-fluid rounded mx-auto d-block" alt="No Items">
              <p id="filterMsg" class="text-center">Yey!</p>
            </div>
          </div>
        </div>
      </div>`;
    } else {
        filtrdMembers.forEach(function (element, index) {
            // This Below HTML code is generate Card For Sorted Items.
            let gameCheckerString = function () {
                let filtMemLength = filtrdMembers.length;
                return `<strong>G1 </strong><span>2/${filtMemLength}</span>`;
            };
            // gameChecker.innerHTML = gameCheckerString();

            let gameStepper = function () {
                let numofgames = element.numofgames;
                let step = function () {
                    if (!element.step || element.scorecard.length === 0) {
                        return 0;
                    } else {
                        return parseInt(element.step);
                    }
                };
                return `<div style="width:100%; text-align:right; color: #7b7e8a;"><strong>${step()}</strong>/${numofgames} <small> games</small></div>`;
            };
            //            gameChecker.innerHTML = gameCheckerString();

            let img = function () {
                if (!element.image) {
                    return `<div class='circle' style='background-color: ${element.avatar_bg}'>
                    <p class='circle-inner'>${getInitials(element.name)}</p>
                    </div>`;
                } /* {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }  */ else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }
            };

            html += `<li data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb" onclick='editData("${
                        element.id
                    }")' type='button' data-bs-toggle='modal' data-bs-target='${modalTarget}'>
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto max-w-s mt-auto mb-auto">
                        <div class="fw-bold" onclick='editData("${
                            element.id
                        }")' type='button' data-bs-toggle='modal' data-bs-target='${modalTarget}'>${element.name}</div>
                      
                    </div>
                     <div class="mt-auto mb-auto m-widget4__ext game-stepper">${gameStepper()}</div>

                        <div class="dropdown ms-5 mt-auto mb-auto">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData(${
                                                    element.id
                                                })' type='button' data-bs-toggle='modal' data-bs-target='#editMemberModal'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData(${element.id})'>
                                                     <i class="fas mx-2 fa-solid fa-trash" style="color: #ff0000"></i> Delete
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                    <span class="badge text-bg-primary rounded-pill hidden">14</span>
                </li>`;
        });
    }

    document.querySelector("#curd-table").classList.add("d-none");
    document.querySelector("#sort-table").classList.add("d-none");
    document.querySelector("#filter-table > ul").innerHTML = html;
}

let overlayType_radio = document.querySelectorAll('input[type=radio][name="fiLSteps"]');

function filterStepsSetup() {
    let stpID;
    if (localStorage.getItem("stpID") == null) {
        stpID = "";
        localStorage.setItem("stpID", "isHome");
    } else {
        stpID = localStorage.getItem("stpID");
    }

    var checked = stpID;
    console.log(checked);
    overlayType_radio.forEach((el) => {
        if (el.id == checked) {
            document.getElementById(el.id).checked = checked;
            filterStepsBy(el.id);
        }
    });
}

filterStepsSetup();

var prev = null;
for (var i = 0; i < overlayType_radio.length; i++) {
    overlayType_radio[i].addEventListener("change", function (event) {
        let needRef = event.currentTarget.dataset.refresh;
        cardBodyAll.classList.toggle("enter");
        if (needRef == "true") {
            function loadReload() {
                location.reload();
                console.log("reloaded");
            }
            setTimeout(loadReload, 500);
        }
        if (cardBodyAll.classList.contains("enter")) {
            setTimeout(removeEnterClass, 2000);
        }

        function removeEnterClass() {
            cardBodyAll.classList.remove("enter");
        }

        prev ? console.log("radio prev value", prev.value) : null;
        if (this !== prev) {
            prev = this;
        }
        console.log("radio now value ", this.value);
        localStorage.setItem("stpID", this.value);
        filterStepsBy(this.value);
    });
}

/* } */

/********** Steps Filter  */

/********** Setting modal to persistent  */
const myModal = new bootstrap.Modal("#editMemberModal", {
    keyboard: false,
    backdrop: "static",
});

const myModal2 = new bootstrap.Modal("#registerModal", {
    keyboard: false,
    backdrop: "static",
});

function loadChart(isLoad) {
    let html = `<div class='row my-2x'>
            <div class='col-md-6 py-1'>
                <div class='card'>
                    <div class='card-body'>
                        <canvas id='chLine'></canvas>
                    </div>
                </div>
            </div>
            <div class='col-md-6 py-1'>
                <div class='card'>
                    <div class='card-body'>
                        <canvas id='chBar'></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class='row py-2x'>
            <div class='col-md-4 py-1'>
                <div class='card'>
                    <div class='card-body'>
                        <canvas id='chDonut1'></canvas>
                    </div>
                </div>
            </div>
            <div class='col-md-4 py-1'>
                <div class='card'>
                    <div class='card-body'>
                        <canvas id='chDonut2'></canvas>
                    </div>
                </div>
            </div>
            <div class='col-md-4 py-1'>
                <div class='card'>
                    <div class='card-body'>
                        <canvas id='chDonut3'></canvas>
                    </div>
                </div>
            </div>
        </div>`;
    if (isLoad === true) {
        homeChart.innerHTML = html;
    } else {
        homeChart.innerHTML = "";
    }
}

function searchBarConditional() {
    let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers")) ?? [];
    let memberLists = JSON.parse(localStorage.getItem("memberLists")) ?? [];
    let stpID = localStorage.getItem("stpID");
    let searchvalue = document.querySelector("#serachProductText").value;
    console.log("searchvalue", searchvalue);
    let sortedItem = [];
    let sortedMembers = "";
    let modalID = "";
    if (stpID == "reGister") {
        sortedMembers = memberLists;
        modalID = "#registerModal";
    } else {
        sortedMembers = filteredMembers;
        modalID = "#editMemberModal";
    }
    let regex = new RegExp(searchvalue, "i");
    for (let element of sortedMembers) {
        console.log("regex", regex);
        let item = element;
        if (regex.test(item.name)) {
            sortedItem.push(element);
        }
    }
    console.log("sortedItem", sortedItem);
    searchMemberByStep(sortedItem, modalID);
}

function searchMemberByStep(sortedItem, modalID) {
    document.querySelector("#sort-table").classList.add("d-flex");

    let html = "";
    console.log("searchMember", sortedItem);

    if (sortedItem.length === 0) {
        // This Below HTML Code Display when product list's array is Empty.
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.jpg" class="img-fluid rounded mx-auto d-block" alt="No Items">
             <p class="text-center">No items to display</p>
            </div>
          </div>
        </div>
      </div>`;
    } else {
        sortedItem.forEach(function (element, index) {
            // This Below HTML code is generate Card For Sorted Items.
            let img = function () {
                if (!element.image) {
                    return `<div class='circle' style='background-color: ${element.avatar_bg}'>
                <p class='circle-inner'>${getInitials(element.name)}</p>
                </div>`;
                } /*  {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }  */ else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }
            };

            html += `<li data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb" onclick='editData("${
                        element.id
                    }")' type='button' data-bs-toggle='modal' data-bs-target='${modalID}'>
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto max-w-s mt-auto mb-auto">
                        <div class="fw-bold" onclick='editData("${
                            element.id
                        }")' type='button' data-bs-toggle='modal' data-bs-target='${modalID}'>${element.name}</div>
                      
                    </div>
                   
                        <div class="dropdown ms-auto mt-auto mb-auto">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData(${
                                                    element.id
                                                })' type='button' data-bs-toggle='modal' data-bs-target='#editMemberModal'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData(${element.id})'>
                                                     <i class="fas mx-2 fa-solid fa-trash" style="color: #ff0000"></i> Delete
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                    <span class="badge text-bg-primary rounded-pill hidden">14</span>
                </li>`;
        });
    }

    curd_table.classList.add("d-none");
    document.querySelector("#filter-table > ul").innerHTML = html;
}
let keys_1 = [];
/* document.getElementById("close-btn-export").onclick = function () {
    keys_1 = [];
}; */
/************ JSON - TABLE TO CSV */
function showCurrTable(sortvalue) {
    let numOfGames = 0;
    let diVisions = 0;
    let showTitle = document.getElementById("showTitle");

    let mergedEventData = JSON.parse(localStorage.getItem("mergedEventData"));
    numOfGames = JSON.parse(localStorage.getItem("numOfGames"));
    diVisions = JSON.parse(localStorage.getItem("eventNumDivs"));
    console.log("numOfGames", parseInt(numOfGames));
    console.log("diVisions ", parseInt(diVisions));

    function nodeInc(label, num) {
        const myArray = [];
        for (let i = 0; i < parseInt(num); i++) {
            myArray.push(label + [i + 1]);
            console.log("nodeInc", myArray);
        }
        return myArray;
    }

    function incNode(label0, num, label) {
        const myArray = [];
        for (let i = 0; i < parseInt(num); i++) {
            myArray.push(label0 + [i + 1] + label);
            console.log("incNode", myArray);
        }
        return myArray;
    }
    /*  let keys_1 = []; */
    /*  const keys_1 = [
        "name",
        "step",
        "g1",
        "g2",
        "g3",
        "g4",
        "g5",
        "g6",
        "scratch",
        "div1",
        "div2",
        "div3",
        "div1_plus_hcp",
        "div2_plus_hcp",
        "div3_plus_hcp",
    ]; */
    // console.log("sortBysortBy", sortBy);
    keys_1 = ["name", "step"];
    let game_keys = nodeInc("g", numOfGames);
    let currSort = sortvalue.replace("div", "");
    let currSort2 = currSort.replace("_plus_hcp", "");
    console.log("currSort2", currSort2);
    let scrtch_key = ["scratch"];
    /* let curr_div_keys = nodeInc("div", currSort2);
    let curr_divhcp_keys = incNode("div", currSort2, "_plus_hcp");
 */
    keys_1.push(...game_keys);
    keys_1.push(...scrtch_key);
    let stringKeys = JSON.stringify(keys_1);
    console.log("stringKeys", stringKeys);
    let stringKeys2 = "[" + '"' + "div" + currSort2 + '"' + "," + '"' + "div" + currSort2 + "_plus_hcp" + '"' + "]";
    let newArrayKeys = keys_1.concat(JSON.parse(stringKeys2));
    console.log(keys_1);
    let newTitle = sortvalue.replace(/_/g, " ").replace("plus", "+");
    showTitle.textContent = newTitle.toUpperCase();
    mergedEventData.forEach((herosGroup) => {
        let tableModal = document.getElementById("TableDataExport");
        tableModal.innerHTML = "";
        tabEl = document.createElement("table");
        tHead = tabEl.createTHead();
        tBody = tabEl.createTBody();
        tabEl.classList.add("table", "table-striped", "bottom");
        tabEl.setAttribute("id", "GameResults");
        newRow = tHead.insertRow();
        console.log("newRow", newRow);
        tableModal.appendChild(tabEl);
        console.log("tabEl", tabEl);
        // showTitle.textContent = filsort.replace(/_/g, " ").toUpperCase();

        //  document.body.appendChild(tabEl)
        newArrayKeys.forEach((prop) => (newRow.insertCell().textContent = prop));
        herosGroup.members.forEach((hero) => {
            newRow = tBody.insertRow();
            console.log("hero", hero);
            newArrayKeys.forEach((prop) => {
                if (prop !== "scorecard") {
                    newRow.insertCell().textContent = hero[prop];
                } else {
                    newRow.insertCell().innerHTML = hero[prop].join("<br>");
                }
                console.log("newArrayKeys", newArrayKeys);
            });
        });
    });
    //showAllTable();
}

function showAllTable() {
    let numOfGames = 0;
    let diVisions = 0;

    let showTitle = document.getElementById("showTitleTab2");
    let filsort = "All Divisions";
    let mergedAllEventData = JSON.parse(localStorage.getItem("mergedAllEventData"));
    // let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers"));
    numOfGames = JSON.parse(localStorage.getItem("numOfGames"));
    diVisions = JSON.parse(localStorage.getItem("eventNumDivs"));
    console.log("numOfGames", parseInt(numOfGames));
    console.log("diVisions ", parseInt(diVisions));

    function nodeInc(label, num) {
        const myArray = [];
        for (let i = 0; i < parseInt(num); i++) {
            myArray.push(label + [i + 1]);
            console.log(myArray);
        }
        return myArray;
    }

    function incNode(label0, num, label) {
        const myArray = [];
        for (let i = 0; i < parseInt(num); i++) {
            myArray.push(label0 + [i + 1] + label);
            console.log(myArray);
        }
        return myArray;
    }

    /*  const keys_1 = [
        "name",
        "step",
        "g1",
        "g2",
        "g3",
        "g4",
        "g5",
        "g6",
        "scratch",
        "div1",
        "div2",
        "div3",
        "div1_plus_hcp",
        "div2_plus_hcp",
        "div3_plus_hcp",
    ]; */
    showTitle.textContent = filsort.toUpperCase();
    keys_1 = ["name", "step"];
    let game_keys = nodeInc("g", numOfGames);
    let scrtch_key = ["scratch"];
    let div_keys = nodeInc("div", diVisions);
    let divhcp_keys = incNode("div", diVisions, "_plus_hcp");

    keys_1.push(...game_keys);
    keys_1.push(...scrtch_key);
    keys_1.push(...div_keys);
    keys_1.push(...divhcp_keys);

    mergedAllEventData.forEach((herosGroup) => {
        let tableModal = document.getElementById("TableAllDataExport");
        tableModal.innerHTML = "";
        tabEl = document.createElement("table");
        tHead = tabEl.createTHead();
        tBody = tabEl.createTBody();
        tabEl.classList.add("table", "table-striped", "bottom");
        tabEl.setAttribute("id", "GameAllResults");
        newRow = tHead.insertRow();
        console.log("newRow", newRow);
        tableModal.appendChild(tabEl);

        //  document.body.appendChild(tabEl)
        keys_1.forEach((prop) => (newRow.insertCell().textContent = prop));
        herosGroup.members.forEach((hero) => {
            newRow = tBody.insertRow();
            console.log("hero", hero);
            keys_1.forEach((prop) => {
                if (prop !== "scorecard") {
                    newRow.insertCell().textContent = hero[prop];
                } else {
                    newRow.insertCell().innerHTML = hero[prop].join("<br>");
                }
            });
            console.log("curr", keys_1);
        });
    });
}

function downloadCSVFile(csv_data, fS, eVnt) {
    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv",
    });

    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement("a");

    // Download csv file
    temp_link.download = eVnt + "-" + fS + ".csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}

/* function tableToCSV() {
    // Variable to store the final csv data
    let csv_data = [];

    // Get each row data
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        // Get each column data
        let cols = rows[i].querySelectorAll("td,th");

        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join("\n");

    // Call this function to download csv file
    downloadCSVFile(csv_data);
}
 */
let dlCurrCSVData = document.getElementById("dlCurrCSVData");
let dlAllCSVData = document.getElementById("dlAllCSVData");

dlCurrCSVData.onclick = function () {
    let filsort = localStorage.getItem("sortBy");
    let evnt_id = localStorage.getItem("eventID");
    let thisTbl = document.getElementById("GameResults");
    // Variable to store the final csv data
    let csv_data = [];

    // Get each row data
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < thisTbl.rows.length; i++) {
        // Get each column data
        let cols = thisTbl.rows[i].querySelectorAll("td,th");

        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join("\n");

    // Call this function to download csv file
    downloadCSVFile(csv_data, filsort, evnt_id);
};

dlAllCSVData.onclick = function () {
    let filsort = "all_divisions";
    let evnt_id = localStorage.getItem("eventID");
    let thisTbl = document.getElementById("GameAllResults");
    // Variable to store the final csv data
    let csv_data = [];

    // Get each row data
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < thisTbl.rows.length; i++) {
        // Get each column data
        let cols = thisTbl.rows[i].querySelectorAll("td,th");

        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join("\n");

    // Call this function to download csv file
    downloadCSVFile(csv_data, filsort, evnt_id);
};
/************ JSON - TABLE TO CSV */

/*********GET SCROLL POSITION FOR FOOTER */
let plyEd;

if (localStorage.getItem("playEd") == null) {
    plyEd = 0;
} else {
    plyEd = JSON.parse(localStorage.getItem("playEd"));
}

/* let firstHandlerScroll = debounce(handleScroll, 10);
window.addEventListener("scroll", firstHandlerScroll); */
var cHeight = document.querySelector(".card-body-all").clientHeight;
var Bod = document.body;
var noFooter = Bod.classList.contains("footer-hide");

function scrollDetect() {
    var lastScroll = 0;

    window.onscroll = function () {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

        if (currentScroll > 0 && lastScroll <= currentScroll) {
            lastScroll = currentScroll;
            console.log("Scrolling DOWN");
            Bod.classList.remove("footer-is-shown");
        } else if (Bod.classList.contains("isHome")) {
            lastScroll = currentScroll;
            console.log("Scrolling DOWN");
            Bod.classList.remove("footer-is-shown");
        } else if (Bod.classList.contains("footer-hide")) {
            lastScroll = currentScroll;
            console.log("Scrolling DOWN");
            Bod.classList.remove("footer-is-shown");
        } else if ((plyEd) => 1) {
            console.log("You have some recorded scores already");
            Bod.classList.add("footer-is-shown");
        } else {
            lastScroll = currentScroll;
            console.log("Scrolling UP");
            Bod.classList.add("footer-is-shown");
        }
    };

    /*    function buttonShowHide() {
        if ((plyEd) => 1) {
            console.log("You have some recorded scores already");
            Bod.classList.add("footer-is-shown");
        } else if (noFooter === true) {
            console.log("You have some recorded scores already");
            Bod.classList.remove("footer-is-shown");
        } else {
            Bod.classList.add("footer-is-shown");
        }
    } */
}
scrollDetect();

/************ FOOTER BUTTON COMPONENTS */
function renderHideBtns(on1, on2, on3) {
    let footerEl = document.getElementById("Footer");
    /*  if (footerBtns.children().length === 0) {
        console.log("footr is empty");
        footerBtns.classList.add("hidden");
    } else {
        footerEl.classList.remove("hidden");
    } */
    const footerScoring = `<div class='col' id='footerScoring'>
    <input class='btn-check form-check-input filter-step' type='radio' name='fiLSteps2'
       id='isNowPlayingB' value='isNowPlaying' data-bs-dismiss='offcanvas' />
    <label class='btn btn-success-no-outline form-check-label  w-100' for='isNowPlaying'>Get
    Scores</label>
 </div>`;

    const footerRanking = `<div class='col' id='footerRanking'>
    <input class='btn-check form-check-input filter-step' type='radio' name='fiLSteps2' id='ranKingB'
       value='ranKing' data-bs-dismiss='offcanvas' />
    <label class='btn btn-success-no-outline form-check-label  w-100' for='ranKing'>Ranking</label>
 </div>`;

    const footerExport = `<div class='col' id='footerExport'>
    <button type='button' class='btn btn-success-no-outline w-100' data-bs-toggle='modal'
       data-bs-target='#showTableModal'>Export</button>
 </div>`;

    let div0 = document.createElement("div");
    div0.classList.add("container", "text-center", "pt-2", "pb-2");
    footerEl.appendChild(div0);

    let div1 = document.createElement("div");
    div1.classList.add("row");
    div1.setAttribute("id", "footerBtns");
    div0.appendChild(div1);

    /*  if (on1 == true) {
        div1.appendChild(footerScoring);
    }
    if (on2 == true) {
        div1.appendChild(footerRanking);
    }
    if (on3 == true) {
        div1.appendChild(footerExport);
    } */
    console.log("footerEl", footerEl);
}
/************ FOOTER BUTTON COMPONENTS */

/* console.log("cHeight", cHeight);
function handleScroll() {
    let scrollPosition =
        window.pageYOffset || window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
    console.log(scrollPosition);
    console.log("playEd", playEd);

    if (scrollPosition >= 200) {
        // console.log("more than 50");
        Bod.classList.remove("footer-is-shown");
    } else if (noFooter) {
        Bod.classList.remove("footer-is-shown");
    } else if ((plyEd) => 1) {
        console.log("Is greater");
        Bod.classList.add("footer-is-shown");
    } else {
        //  console.log("less than 50");
        Bod.classList.add("footer-is-shown");
    }
}

function debounce(fn, delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        }, delay);
    };
}
 */
/********* HIDE REGISTRATION AND RANKING IF EMPTY */
function checkNumRegister() {
    let toRegister,
        reGister = document.getElementById("reGister");
    if (localStorage.getItem("toRegister") == null) {
        toRegister = [];
    } else {
        toRegister = JSON.parse(localStorage.getItem("toRegister"));
    }

    if (parseInt(toRegister) === 0) {
        reGister.parentNode.classList.add("hidden");
        localStorage.setItem("stpID", "isNowPlaying");
        filterStepsSetup();
        // location.reload();
    }
}
let playEd,
    ranKing = document.getElementById("ranKing");
if (localStorage.getItem("playEd") == null) {
    playEd = 0;
} else {
    playEd = JSON.parse(localStorage.getItem("playEd"));
}

let toPlay,
    isNowPlaying = document.getElementById("isNowPlaying");
if (localStorage.getItem("toPlay") == null) {
    toPlay = 0;
} else {
    toPlay = JSON.parse(localStorage.getItem("toPlay"));
}

checkNumRegister();
if (parseInt(playEd) === 0) {
    ranKing.parentNode.classList.add("hidden");
    // localStorage.getItem("stpID", "isNowPlaying");
}

if (parseInt(toPlay) === 0) {
    isNowPlaying.parentNode.classList.add("hidden");
}

function clearStorage() {
    if (confirm("Are you sure you want to clear data")) {
        localStorage.clear();
        document.getElementById("isHome").cheked = true;
        filterStepsSetup();
        showData();
    }
    location.reload(); // Reload the current page
}

function modalFS() {
    let modalDialog = document.querySelectorAll(".fs-enabled .modal-dialog");
    for (i = 0; i < modalDialog.length; i++) {
        modalDialog[i].classList.toggle("modal-fullscreen");
    }
}

function modalFSClose() {
    let modalDialog = document.querySelectorAll(".fs-enabled .modal-dialog");
    for (i = 0; i < modalDialog.length; i++) {
        modalDialog[i].classList.remove("modal-fullscreen");
    }
}
