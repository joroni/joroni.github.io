/**
 * @projectName - CRUD Operation in LocalStorage
 *
 * @division - CRUD operation in LocalStorage with search and sort functionality is a JavaScript program
 *                that allows users to create, read, update, and delete items from a productList stored in
 *                LocalStorage. It also includes search and sort functionality to easily find and organize
 *                products. Users can add, edit, and delete product details, including name, scorecard, division,
 *                and image. The program generates an HTML code for each product card and displays them on the
 *                webpage. This program provides an efficient way to manage and manipulate data in LocalStorage.
 *
 * @devloper - samarth dadhaniya
 *
 * @github - https://github.com/samarthdadhaniya/CRUD-Operation-in-LocalStorage
 */

/**
 * @function validateForm
 *
 * @division Function validates form input for name, scorecard, division,
 *              and image attachment, returning true if valid and false
 *              with error message if not.
 *
 * @param none
 */

var rootElement = document.documentElement;

function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

const scrollTop = function () {
    // create HTML button element
    const rootElement = document.documentElement;
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "&uarr;";
    scrollBtn.setAttribute("id", "scroll-btn");
    document.body.appendChild(scrollBtn);
    // hide/show button based on scroll distance
    const scrollBtnDisplay = function () {
        window.scrollY > window.innerHeight ? scrollBtn.classList.add("show") : scrollBtn.classList.remove("show");
    };
    if (scrollBtnDisplay) {
        window.addEventListener("scroll", scrollBtnDisplay);
    }
    // scroll to top when button clicked
    const scrollWindow = function () {
        if (window.scrollY != 0) {
            setTimeout(function () {
                window.scrollTo(0, window.scrollY - 50);
                scrollWindow();
            }, 100);
        }
    };

    /*  const scrollToTop = function () {
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }; */
    scrollBtn.addEventListener("click", scrollToTop);
};
scrollTop();

function checkAvailStorage() {
    var _lsTotal = 0,
        _xLen,
        _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
        // console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
    }
    // console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    document.getElementById("storeageInfo").innerHTML = " Total = " + (_lsTotal / 1024).toFixed(2) + " KB";
}

checkAvailStorage();
function validateForm() {
    // Get references to the form elements
    let nameInput = document.getElementById("name");
    let scoreInput = document.getElementById("scorecard");
    let divisionInput = document.getElementById("division");
    let image = document.getElementById("inputGroupFile01");

    // Get the values from the input fields and remove extra white spaces.
    let name = nameInput.value.trim();
    let scorecard = scoreInput.value.trim();

    // Validate name input
    if (name === "") {
        document.getElementById("name-error-msg").innerHTML = " Please enter your name";
        return false;
    } else {
        document.getElementById("name-error-msg").innerHTML = "";
    }

    // Validate scorecard input
    if (scorecard === "") {
        document.getElementById("scorecard-error-msg").innerHTML = " Please enter the scorecard";
        return false;
    } else {
        document.getElementById("scorecard-error-msg").innerHTML = "";
    }

    if (isNaN(scorecard) || scorecard.startsWith("0")) {
        document.getElementById("scorecard-error-msg").innerHTML =
            "Please enter a valid scorecard number that not start with zero";
        return false;
    } else {
        document.getElementById("scorecard-error-msg").innerHTML = "";
    }

    // Validate division input
    if (divisionInput.value.length > 50) {
        document.getElementById("disc-error-msg").innerHTML = " Description can be maximum 50 characters";
        return false;
    } else if (divisionInput.value == "") {
        document.getElementById("disc-error-msg").innerHTML = " Please enter the Discription";
        return false;
    } else {
        document.getElementById("disc-error-msg").innerHTML = "";
    }

    // Validate image input
    if (image.files.length === 0) {
        document.getElementById("image-error-msg").innerHTML = " Please attach an image";
        return false;
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
 * @division The function is retrieves the productList from localStorage,
 *              generates HTML code for each product card, and displays them
 *              on the webpage. It also handles empty productList and provides
 *              options to edit and delete each product.
 *
 * @param none
 */
function showData() {
    let productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }
    let html = "";
    if (productList.length === 0) {
        // Display an image if the productList array is empty

        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products">
            </div>
          </div>
        </div>
      </div>`;
    } else {
        productList.forEach(function (element, index) {
            let img = function () {
                if (!element.image) {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                } else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }
            };

            let scrTch = function () {
                if (!element.scratch) {
                    return `0`;
                } else {
                    return `${element.scratch}`;
                }
            };

            html += `<li  data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb" onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto"  onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                        <div class="fw-bold">${element.name}</div>
                        ${scrTch()} points
                    </div>
                                <div class="m-widget4__progress ms-auto"><div class="m-widget4__progress-wrapper"> <span class="m-widget17__progress-number"> 63% </span> <span class="m-widget17__progress-label"> London </span><div class="progress m-progress--sm"><div class="progress-bar bg-danger" role="progressbar" style="width: 63%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="63"></div></div></div></div>
                    <div class="dropdown ms-auto">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData("${index}")'>
                                                     <i class="fas mx-2 fa-solid fa-trash" style="color: #ff0000"></i> Delete
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                </li>`;
        });
    }
    document.querySelector("#curd-table > .row").innerHTML = html;
    // showTable()
}

// Load all data when document or page load
showData();

/**
 * @function AddData
 *
 * @division The function is adds a new product to the localStorage using
 *              form data, generates a new ID, and reloads the page to display
 *              the updated data. It also clears the form and displays an alert message.
 *
 * @param none
 */

function alertNotify(message, type) {
    const alertItem = document.getElementById("alertNotification");
    if (alertItem) {
        alertItem.classList.add("show");
        alertItem.classList.add(type);
        // alertItem.closest("#alertMssage").innerHTML = message;
        console.log(message, type);
    }
}
function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let scorecard = document.getElementById("scorecard").value;
        let division = document.getElementById("division").value;
        let grp1 = document.getElementById("grp1").value;
        let grp2 = document.getElementById("grp2").value;
        let senrs = document.getElementById("senrs").value;
        let image = document.getElementById("inputGroupFile01");

        let reader = new FileReader();

        let productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }

        // generate new ID by incrementing the highest existing ID
        let id = 1;
        if (productList.length > 0) {
            let ids = productList.map((product) => product.id);
            id = Math.max(...ids) + 1;
        }

        /**
         * @function anonymous-Function (Arrow Function)
         *
         * @division The function reads the data URL of an image file, and
         *              adds product details to the productList and stores it
         *              in localStorage.
         *
         * @param none
         */
        reader.readAsDataURL(image.files[0]);
        reader.addEventListener("load", () => {
            productList.push({
                id: id,
                name: name,
                division: division,
                grp1: grp1,
                grp2: grp2,
                senrs: senrs,
                scorecard: scorecard,
                image: reader.result,
            });
            localStorage.setItem("productList", JSON.stringify(productList));
            console.log(JSON.stringify(productList));
            location.reload();
            showData();
        });

        document.getElementById("name").value = "";
        document.getElementById("scorecard").value = "";
        document.getElementById("division").value = "";
        document.getElementById("grp1").value = "";
        document.getElementById("grp2").value = "";
        document.getElementById("senrs").value = "";
        document.getElementById("inputGroupFile01").value = "";
        document.getElementById("close-btn").click();
        document.getElementById("alertNotification");
        //  alert('Data Added Successfully')
        alertNotify("Add Success", "alert-success");
    }
}

/**
 * @function deleteData
 *
 * @division This function deletes an item from an array called 'productList'
 *              and updates local storage. It also displays a confirmation message
 *              to the user before deleting the item.
 *
 * @param index
 */
function deleteData(index) {
    let productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    // Display a confirmation message to the user
    if (confirm("Are you sure you want to delete this item?")) {
        productList.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        location.reload(); // Reload the current page
    }
}

/**
 * @function editData
 *
 * @division -This function edits the details of a product at a specific index. It
 *               reads the data from local storage and updates the HTML elements with
 *               the corresponding values. It also adds event handlers for an image and
 *               a button to update the data.
 *
 * @param index
 */

function editData(index) {
    let productList,
        scratch = 0,
        /*   hdcpGrp1 = 0,
    hdcpGrp2 = 0,
    hdcpSenr = 0, */
        delimiter = ",";
    if (localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    let arrString = productList[index].scorecard.toString();
    arrItems = arrString.split(delimiter);
    arrayNums = arrItems.map((i) => Number(i));
    console.log("current", arrayNums);
    console.log("current length", arrayNums.length);
    if (arrayNums.length >= 1) {
        buildScorObjs(productList[index], arrayNums);
    }

    // document.getElementById("update").disabled = true;
    scratch = arrayNums.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    let scrcard = document.getElementById("scorecard-edit");
    let addscore = document.getElementById("addscore");
    let arrCount = document.getElementById("arrCount");
    let scoreInputs = document.querySelectorAll(".score-inputs");
    let arrCountString = arrayNums.length + "/" + numOfGames;
    if (arrayNums.length === numOfGames) {
        scrcard.disabled = true;
        addscore.disabled = true;
        for (i = 0; i < scoreInputs.length; i++) {
            scoreInputs[i].disabled = true;
        }
    } else {
        scrcard.disabled = false;
        addscore.disabled = false;
        for (i = 0; i < scoreInputs.length; i++) {
            scoreInputs[i].disabled = false;
        }
    }

    arrCount.innerHTML = arrCountString;
    /*  function getScoreItem(pIndex) {
        arrayNums;
    } */

    function addHndcp(div) {
        if (div !== null || div !== NaN) {
            return scratch + parseInt(div);
        } else {
            return null;
        }
    }

    //console.log(scratch)
    document.getElementById("id-edit").value = productList[index].id;
    document.getElementById("name-edit").value = productList[index].name;
    document.getElementById("onPot-edit").value = productList[index].onPot;
    document.getElementById("isPlaying-edit").value = productList[index].isPlaying;
    document.getElementById("scorecard-edit").value = productList[index].scorecard;
    document.getElementById("grp1-edit").value = productList[index].grp1;
    document.getElementById("grp2-edit").value = productList[index].grp2;
    document.getElementById("senrs-edit").value = productList[index].senrs;

    document.getElementById("scratch-edit").value = scratch;
    document.getElementById("hdcpGrp1-edit").value = addHndcp(productList[index].grp1);
    document.getElementById("hdcpGrp2-edit").value = addHndcp(productList[index].grp2);
    document.getElementById("hdcpSenr-edit").value = addHndcp(productList[index].senrs);

    /*  let addScore = document.getElementById('scorecard-edit')
    addScore.val = addScore.value */
    document.getElementById("division-edit").value = productList[index].division;
    document.getElementById("division-edit").setAttribute("value", productList[index].division);
    let imagePreview = document.getElementById("image-div");
    imagePreview.src = productList[index].image;

    if (!imagePreview.src) {
        imagePreview.src = "./img/no-pic.jpg";
    } else {
        imagePreview.src = productList[index].image;
    }

    imagePreview.innerHTML =
        "<img src=" + imagePreview.src + " width='100%' height='100%' class='rounded-circle img-thumbnail'>";

    /**
     * @function anonymous-Function (Arrow Function)
     *
     * @division this function is used When the user selects an image file using the file dialog
     *              input element, the function reads the contents of the selected file and updates
     *              the image property of a iten object at a specific index in an array called productList.
     *
     * @param event
     */
    let imageEdit = document.getElementById("image-edit");
    imageEdit.onchange = function (event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function () {
            productList[index].image = reader.result;
            imagePreview.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    /**
     * @function anonymous-Function (Arrow Function)
     *
     * @division The code defines an event handler function for the onclick event of an
     *              HTML element with an id of "update". When the user clicks on this element,
     *              the function performs a series of actions related to updating a item's details,
     *              and store updated details into localstorage.
     *
     * @param none
     */

    document.querySelector("#update").onclick = function () {
        upDateItem(index);
    };

    /*   function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    } */

    document.querySelector("#addscore").onclick = function () {
        document.querySelector("#addscore").classList.add("hidden");
        document.querySelector("#update").disabled = true;
        let productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }
        (scratchLive = 0), (delimiter = ",");
        let scoreEdit = document.getElementById("scorecard-edit");
        // let scrcard = document.getElementById("scorecard-edit");
        let arrString = scoreEdit.value.toString();
        arrItems = arrString.split(delimiter);
        arrayNums = arrItems.map((i) => Number(i));
        console.log("curr ", arrayNums);
        let ajaxForm = document.getElementById("ajxForm");

        ajaxForm.innerHTML = `<div class="input-group mb-3">
                                            <input type="number" id="Glive" style="margin-top: 0px;" class="score-inputs form-control form-control-lg" placeholder="" aria-label="" aria-describedby="button-addon2">
                                            <button class="btn btn-outline-success" type="button" id="acceptScore"> <span class="material-icons"> check </span></button>
                                          </div>`;

        document.getElementById("Glive").focus();

        document.querySelector("#acceptScore").onclick = function () {
            acCeptNewScore(index);
            document.querySelector("#acceptScore").disabled = true;
            document.getElementById("update").disabled = false;
        };

        let glive = document.getElementById("Glive");
        glive.onchange = function (e) {
            let title = e.target.title;
            let value = e.target.value;
            console.log("curr Arr ", arrayNums);
            console.log("value ", value);

            document.querySelector("#acceptScore").classList.add("btn-success");
            arrayNums.push(parseInt(value));
            //alert(arrayNums);
            scratchLive = arrayNums.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            console.log("arrayNums ", arrayNums.filter(Number));
            scoreEdit.value = arrayNums.filter(Number);

            if (arrayNums.filter(Number).length >= 1) {
                buildScorObjs(productList[index], arrayNums.filter(Number));
            }

            document.getElementById("scratch-edit").value = scratchLive;
            document.getElementById("hdcpGrp1-edit").value = addHndcp(productList[index].grp1);
            document.getElementById("hdcpGrp2-edit").value = addHndcp(productList[index].grp2);
            document.getElementById("hdcpSenr-edit").value = addHndcp(productList[index].senrs);
            console.log("arrayNums length ", arrayNums.length);
        };
    };

    scrcard.onchange = function () {
        let productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }
        (scratchLive = 0), (delimiter = ",");

        let arrString = scrcard.value.toString();
        arrItems = arrString.split(delimiter);
        arrayNums = arrItems.map((i) => Number(i));

        scratchLive = arrayNums.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        console.log("scratchLive ", scratchLive);

        function addHndcp(div) {
            if (div !== null || div !== NaN) {
                return parseInt(scratchLive + div);
            } else {
                return null;
            }
        }

        document.getElementById("scratch-edit").value = scratchLive;
        document.getElementById("hdcpGrp1-edit").value = addHndcp(productList[index].grp1);
        document.getElementById("hdcpGrp2-edit").value = addHndcp(productList[index].grp2);
        document.getElementById("hdcpSenr-edit").value = addHndcp(productList[index].senrs);
    };

    function buildScorObjs(curobj, arr) {
        let scoreInputs = document.getElementById("scoreInputs");
        arrayNums = arr.map((i) => Number(i));
        console.log("arrayNums ", arrayNums);
        let html = "";
        let scrItems = [];

        if (arrayNums.length >= 1 && arrayNums[0] != 0) {
            arrayNums.forEach((element, index) => {
                //  console.log("Index: " + index + " Value: " + element);
                html += `<div class='col-lg-4 col-md-3 col-sm-6' data-index='${index}'>
                        <div class='form-group mt-2'>
                            <label for='exampleFormControlSelect1'>G-${index + 1}</label>
                            <input class="score-inputs form-control form-control-lg" type='number' key='${index}' title='${index}' value='${element}' id='g${
                    index + 1
                }-live' placeholder='' aria-label='Game scores' aria-describedby='inputGroup-sizing-default'>
                        </div>
                    </div>`;

                scrItems.push({["g" + [index + 1]]: element});
            });
            console.log("scrItems ", scrItems);
            // Object.assign(curobj, scrItems);
            console.log(curobj);
            //  console.log(Object.assign({}, ...scrItems));
            let newOb = Object.assign({}, ...scrItems);
            Object.assign(curobj, newOb); /************* This updates the array with new scores */
            console.log("New array ", Object.assign(curobj, newOb));

            scoreInputs.innerHTML = html;

            let scoreInput = document.querySelectorAll(".score-inputs");
            let scrcard = document.getElementById("scorecard-edit");

            for (i = 0; i < scoreInput.length; i++) {
                scoreInput[i].onchange = function (e) {
                    let title = e.target.title;
                    let value = e.target.value;
                    console.log("curr " + arrayNums);
                    console.log("scoreInput.length " + scoreInput.length);

                    const arr = arrayNums;
                    const index = parseInt(title);
                    const updatedData = parseInt(value);
                    arr.splice(index, index, updatedData);

                    console.log(index + " " + parseInt(index + 1));

                    console.log(arr);
                    scrcard.value = arr;
                    console.log(arr.splice(index, parseInt(index + 1), updatedData));

                    let productList;
                    if (localStorage.getItem("productList") == null) {
                        productList = [];
                    } else {
                        productList = JSON.parse(localStorage.getItem("productList"));
                    }
                    (scratchLive = 0), (delimiter = ",");

                    let arrString = scrcard.value.toString();
                    arrItems = arrString.split(delimiter);
                    arrayNums = arrItems.map((i) => Number(i));

                    scratchLive = arrayNums.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue;
                    }, 0);

                    console.log("scratchLive ", scratchLive);
                    document.getElementById("scratch-edit").value = scratchLive;
                    document.getElementById("hdcpGrp1-edit").value = addHndcp(productList[index].grp1);
                    document.getElementById("hdcpGrp2-edit").value = addHndcp(productList[index].grp2);
                    document.getElementById("hdcpSenr-edit").value = addHndcp(productList[index].senrs);
                };
            }
        }
    }

    function acCeptNewScore(index) {
        let productList,
            delimiter = ",";
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }
        let virtualAlert = `<div class="alert alert-success" role="alert">
  Added score successfully! Click "UPDATE" to save.
</div>`;
        document.getElementById("ajxAlert").innerHTML = virtualAlert;
        // document.getElementById("update").disabled = false;

        let arrString = productList[index].scorecard.toString();
        arrItems = arrString.split(delimiter);
        arrayNums = arrItems.map((i) => Number(i));
        console.log("current", arrayNums);
        console.log("current length", arrayNums.length);
        if (arrayNums.length >= 1) {
            buildScorObjs(productList[index], arrayNums);
        }

        productList[index].id = document.getElementById("id-edit").value;
        productList[index].name = document.getElementById("name-edit").value;
        productList[index].scorecard = document.getElementById("scorecard-edit").value;
        productList[index].division = document.getElementById("division-edit").value;
        productList[index].grp1 = document.getElementById("grp1-edit").value;
        productList[index].grp2 = document.getElementById("grp2-edit").value;
        productList[index].senrs = document.getElementById("senrs-edit").value;
        productList[index].scratch = document.getElementById("scratch-edit").value;
        productList[index].onPot = document.getElementById("onPot-edit").value;
        productList[index].isPlaying = document.getElementById("isPlaying-edit").value;
        // this line is used to convert the array to a JSON string before it is saved to local storage.

        document.getElementById("close-btn").click();
        localStorage.setItem("productList", JSON.stringify(productList));

        showTable();
        showData();
    }

    function upDateItem(index) {
        let productList,
            delimiter = ",";
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }

        let arrString = productList[index].scorecard.toString();
        arrItems = arrString.split(delimiter);
        arrayNums = arrItems.map((i) => Number(i));
        console.log("current", arrayNums);
        console.log("current length", arrayNums.length);
        if (arrayNums.length >= 1) {
            buildScorObjs(productList[index], arrayNums);
        }
        document.querySelector("#addscore").classList.remove("hidden");
        //productList[index].step = document.getElementById("step-edit").value;
        productList[index].id = document.getElementById("id-edit").value;
        productList[index].name = document.getElementById("name-edit").value;
        productList[index].scorecard = document.getElementById("scorecard-edit").value;
        productList[index].division = document.getElementById("division-edit").value;
        productList[index].grp1 = document.getElementById("grp1-edit").value;
        productList[index].grp2 = document.getElementById("grp2-edit").value;
        productList[index].senrs = document.getElementById("senrs-edit").value;
        productList[index].scratch = document.getElementById("scratch-edit").value;
        productList[index].onPot = document.getElementById("onPot-edit").value;
        productList[index].isPlaying = document.getElementById("isPlaying-edit").value;
        // this line is used to convert the array to a JSON string before it is saved to local storage.

        document.getElementById("id-edit").value = "";
        //document.getElementById("id-edit").value = "";
        document.getElementById("name-edit").value = "";
        document.getElementById("scorecard-edit").value = "";
        document.getElementById("scratch-edit").value = "";
        document.getElementById("grp1-edit").value = "";
        document.getElementById("grp2-edit").value = "";
        document.getElementById("senrs-edit").value = "";
        document.getElementById("division-edit").value = "";
        document.getElementById("onPot-edit").value = "";
        document.getElementById("isPlaying-edit").value = "";
        document.getElementById("close-btn").click();
        localStorage.setItem("productList", JSON.stringify(productList));
        // The is method, which refreshes the page with the updated data.
        showTable();
        showData();

        location.reload();
    }
}

/**
 * @function searchBar
 *
 * @division This function is designed to search for products in a Arraylist
 *              based on user input. It first gets the search value from an input
 *              field with an id of "searchProductText". It then give an array of
 *              item from the local storage using the key "productList".
 *
 * @param none
 */
function searchBar() {
    let searchvalue = document.querySelector("#serachProductText").value;
    console.log(searchvalue);
    let sortedItem = [];
    let sortedProduct = JSON.parse(localStorage.getItem("productList")) ?? [];
    let regex = new RegExp(searchvalue, "i");
    for (let element of sortedProduct) {
        let item = element;
        if (regex.test(item.name)) {
            sortedItem.push(element);
        }
    }
    console.log(sortedItem);
    searchProduct(sortedItem);
}

/**
 * @function searchProduct
 *
 * @division This function is generates HTML code to display search
 *              results for items. If there are no results, it displays an
 *              image and a error message. Otherwise, it generates a card
 *              for each product that matches the search query,
 *
 * @param sortedItem (a array format)
 */
function searchProduct(sortedItem) {
    let html = "";
    console.log("searchProduct", sortedItem);
    if (sortedItem.length === 0) {
        // Display an image if the productList array is empty
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products">
            </div>
          </div>
        </div>
      </div>`;
    } else {
        sortedItem.forEach(function (element, index) {
            let img = function () {
                if (!element.image) {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                } else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }
            };

            let scrTch = function () {
                if (!element.scratch) {
                    return `0`;
                } else {
                    return `${element.scratch}`;
                }
            };
            html += `<li  data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb" onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto"  onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                        <div class="fw-bold">${element.name}</div>
                        ${scrTch()} points
                    </div>
                     <div class="m-widget4__progress ms-auto"><div class="m-widget4__progress-wrapper"> <span class="m-widget17__progress-number"> 63% </span> <span class="m-widget17__progress-label"> London </span><div class="progress m-progress--sm"><div class="progress-bar bg-danger" role="progressbar" style="width: 63%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="63"></div></div></div></div>
                     <div class="dropdown ms-auto">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData("${index}")'>
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
    document.querySelector("#sort-table .mt-5.row").innerHTML = html;
}

/**
 * @function anonymous-Function (Arrow Function)
 *
 * @division When the user selects an option from the dropdown menu of
 *              sorting, the value of the selected option is stored in the sortBy variable.
 *              Then, the filterProduct function is called with sortBy as its
 *              argument to perform the sorting action based on the selected value.
 *
 * @param change (it take any event as a parameter)
 */
let selectElem = document.querySelector("#sort-select");
selectElem.addEventListener("change", (event) => {
    let sortBy = event.target.value;
    filterProduct(sortBy); // perform the sorting action based on the selected value
    if (sortBy == "refresh-btn") {
        localStorage.setItem("filterIsPlaying", JSON.stringify(""));
        location.reload(); // refresh the page
    }
});

let checkElem = document.querySelector("#filterIsPlaying");

if (checkElem) {
    let filterIsPlaying = "";
    let flS = localStorage.getItem("filterIsPlaying");
    if (flS === null) {
        localStorage.setItem("filterIsPlaying", JSON.stringify(filterIsPlaying));
    } else {
        filterIsPlaying = JSON.parse(flS);
        if (filterIsPlaying != "") {
            checkElem.checked = true;
            sortBy = "isPlaying";
            filterProduct(sortBy);
            console.log(checkElem.filterIsPlaying);
        } else {
            // alert("Unchecked");
            scrollToTop();
        }
    }
    checkElem.addEventListener("change", (event) => {
        let sortBy;
        if (event.currentTarget.checked) {
            sortBy = "isPlaying";
            localStorage.setItem("filterIsPlaying", JSON.stringify("checked"));
        } else {
            sortBy = "refresh-btn";
            localStorage.setItem("filterIsPlaying", JSON.stringify(""));
            location.reload();
        }
        filterProduct(sortBy);
    });
}

/**
 * @function filterProduct
 *
 * @division Overall, this function seems to be designed to sort an array of
 *              products based on different criteria like (with name, id, scorecard)
 *              and return the sorted data.
 *
 * @param sortvalue
 */
function filterProduct(sortvalue) {
    let sortedProduct = JSON.parse(localStorage.getItem("sortedProduct")) ?? [];
    let productList = JSON.parse(localStorage.getItem("productList")) ?? [];
    sortedProduct = productList;
    localStorage.setItem("sortedProduct", JSON.stringify(sortedProduct));

    /**
     * @division This code block is a conditional statement that checks
     *              the value of the sortvalue parameter to determine the
     *              sorting criteria to be used for the product list.
     */

    if (sortvalue == "isPlaying") {
        sortedProduct = sortedProduct.filter((sortedProduct) => sortedProduct.isPlaying == "1");
        console.log("Playing", sortedProduct);
        return filteredData(sortedProduct);
    }

    if (sortvalue == "desc") {
        let desc = true;
        sortedProduct = sortedProduct.sort((a, b) => (desc ? b.id - a.id : a.id - b.id));
        desc = !desc;
        console.log("descending", sortedProduct);
        scrollToTop();
        return filteredData(sortedProduct);
    } else if (sortvalue == "asc") {
        let desc = false;
        sortedProduct = sortedProduct.sort((a, b) => (desc ? b.id - a.id : a.id - b.id));
        console.log("Asc", sortedProduct);
        scrollToTop();
        return filteredData(sortedProduct);
    } else if (sortvalue == "name") {
        sortedProduct = sortedProduct = sortedProduct.sort((a, b) => a.name.localeCompare(b.name));
        console.log("name", sortedProduct);
        scrollToTop();
        return filteredData(sortedProduct);
    } else if (sortvalue == "scratch") {
        sortedProduct = sortedProduct.sort((a, b) => b.scratch - a.scratch);
        console.log("Scratch", sortedProduct);
        scrollToTop();
        return filteredData(sortedProduct);
    } else {
        scrollToTop();
        return false;
    }
}

/**
 * @function filteredData
 *
 * @division This is a function is takes array as a parameter. The function
 *              generates HTML code to display the sorted products in a card format.
 *
 * @param sortedProduct (as a Array format)
 */
function filteredData(sortedProduct) {
    let html = "";
    console.log("filterData", sortedProduct);
    if (sortedProduct.length === 0) {
        // This Below HTML Code Display when product list's array is Empty.
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products">
            </div>
          </div>
        </div>
      </div>`;
    } else {
        sortedProduct.forEach(function (element, index) {
            let img = function () {
                if (!element.image) {
                    return `<img src='./img/no-pic.jpg'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                } else {
                    return `<img
              src='${element.image}'
              class='rounded-circle img-thumbnail'
              alt='profile-image'
              />`;
                }
            };

            let scrTch = function () {
                if (!element.scratch) {
                    return `0`;
                } else {
                    return `${element.scratch}`;
                }
            };
            html += `<li  data-key="${
                element.id
            }" class="py-8 list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 thumb-md member-thumb" onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                        ${img()}
                    </div>
                    <div class="ms-2 me-auto"  onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                        <div class="fw-bold">${element.name}</div>
                        ${scrTch()} points
                    </div>
                     <div class="m-widget4__progress ms-auto"><div class="m-widget4__progress-wrapper"> <span class="m-widget17__progress-number"> 63% </span> <span class="m-widget17__progress-label"> London </span><div class="progress m-progress--sm"><div class="progress-bar bg-success" role="progressbar" style="width: 63%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="63"></div></div></div></div>
                        <div class="dropdown ms-auto">
                                        <i class="fas fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul class="dropdown-menu" style="">
                                            <li>
                                                <span class="dropdown-item" onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2'>
                                                    <i class="fas fa-pen mx-2"></i> Update
                                                </span>
                                            </li>
                                            <li>
                                                <span class="dropdown-item" onclick='deleteData("${index}")'>
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
    document.querySelector("#sort-table .mt-5.row").innerHTML = html;
    localStorage.setItem("sortedProduct", JSON.stringify(sortedProduct));
}

function loadData() {
    const productLists = [
        {
            id: 1,
            name: "Dan Jukes",
            grp2: 42,
            onPot: "1",
            image: "img/user.png",
            isPlaying: "1",
            division: ["grp2"],
            scorecard: "",
        },
        {
            id: 2,
            name: "Jane Wilson",
            grp1: 30,
            senrs: 35,
            onPot: "0",
            image: "img/user.png",
            isPlaying: "1",
            division: ["grp1", "senrs"],
            scorecard: "",
        },
        {
            id: 3,
            name: "Bernie Santos",
            grp1: 15,
            onPot: "1",
            image: "img/user.png",
            isPlaying: "1",
            division: ["grp1"],
            scorecard: "",
        },
        {
            id: 4,
            name: "Ed Santos",
            grp1: 10,
            onPot: "0",
            image: "",
            isPlaying: "0",
            division: ["grp1"],
            scorecard: "",
        },
    ];

    let playerList = "";
    let lS = localStorage.getItem("productList");
    //console.log('lS ', lS)
    if (lS === null) {
        localStorage.setItem("productList", JSON.stringify(productLists));
        playerList = JSON.parse(lS);
        // console.log(playerList)
    }
    showTable();
}

let numOfGames = 0;
let diVisions = 0;
function showTable() {
    let playerList = [];
    let lS = localStorage.getItem("productList");
    // console.log('lS ', lS)
    playerAllLists = JSON.parse(lS);
    playerList = playerAllLists.filter((playerAllList) => playerAllList.isPlaying == "1");
    console.log(playerList);

    const eventLists = [
        {
            eventID: "AAA-001",
            eventName: "Super Hero Squad",
            eventVenue: "MCS",
            numOfGames: "6",
            datetimeStart: "2018-06-12T02:30",
            datetimeEnd: "2018-06-12T19:30",
            divisions: "3",
            division: [
                {name: "Group 1", code: "grp1"},
                {name: "Group 2", code: "grp2"},
                {name: "Senior", code: "senr"},
            ],
            companyID: "USBC",
            active: true,
            members: playerList,
        },
        //, {}
    ];
    let text = "";
    let eventList = eventLists.filter((eventList) => eventList.active == true);

    //if (localStorage.getItem('eventData') === null) {
    localStorage.setItem("eventData", JSON.stringify(eventList));
    //}

    /* let scoreKeys = ""; */
    localStorage.setItem("scoreKeys", JSON.stringify(text));

    const keys_0 = [
        "eventID",
        "eventName",
        "eventVenue",
        "datetimeStart",
        "numOfGames",
        "datetimeEnd",
        "companyID",
        "active",
    ];
    //const keys_1 = ["name", "grp1", "grp2", "senrs", "scorecard"];
    const keys_1 = ["name", "grp1", "grp2", "senrs", "g1", "g2", "g3", "g4", "g5", "g6"];

    const eventData = JSON.parse(localStorage.getItem("eventData"));
    numOfGames = parseInt(eventData[0].numOfGames);
    diVisions = parseInt(eventData[0].divisions);

    console.log(numOfGames);
    console.log("diVisions ", diVisions);
    let j = 0;

    while (j < numOfGames) {
        text += "G" + j++;
        console.log(j++);
        console.log(text);
    }
    /*  for (var i = 0; i < numOfGames.length; i++) {
        console.log(numOfGames.length);
        
        keys_1.push(`g` + [i]);
        console.log(keys_1);
    } */

    /* const keys_1 = [
    'name',
    'grp1',
    'grp2',
    'senrs',
    'scorecard',
    'g2',
    'g3',
    'g4',
    'g5',
    'g6',
    'scratch',
    'hdcpGrp1',
    'hdcpGrp2',
    'hdcpSenr'
  ]*/
    //const keys_1 = ['name', 'scorecard']

    eventList.forEach((herosGroup) => {
        let scoreItems = [];
        let tableModal = document.getElementById("TableDataExport");
        let tabEl = document.createElement("table"),
            tHead = tabEl.createTHead(),
            tBody = tabEl.createTBody(),
            newRow = tHead.insertRow();
        tabEl.classList = "mytble top";
        // document.body.appendChild(tabEl)
        tableModal.appendChild(tabEl);
        keys_0.forEach((prop) => (newRow.insertCell().textContent = prop));

        newRow = tBody.insertRow();
        keys_0.forEach((prop) => (newRow.insertCell().textContent = herosGroup[prop]));

        // 'name', 'scorcard', 'division' trip...
        tabEl = document.createElement("table");
        tHead = tabEl.createTHead();
        tBody = tabEl.createTBody();
        tabEl.classList = "mytble bottom";
        tabEl.setAttribute("id", "GameResults");
        newRow = tHead.insertRow();
        tableModal.appendChild(tabEl);

        //  document.body.appendChild(tabEl)
        keys_1.forEach((prop) => (newRow.insertCell().textContent = prop));
        herosGroup.members.forEach((hero) => {
            newRow = tBody.insertRow();
            console.log("hero", hero);

            keys_1.forEach((prop) => {
                if (prop !== "scorecard") {
                    newRow.insertCell().textContent = hero[prop];
                } else if (prop == "scorecard") {
                    scoreItems = hero[prop]
                    .toString()
                    .split(",")
                    .map((i) => Number(i));
                    console.log(scoreItems);
                    for (var i = 0; i < scoreItems.length; i++) {
                        console.log(scoreItems.length);
                        newRow.insertCell().textContent = scoreItems[i];
                    }
                } else newRow.insertCell().innerHTML = hero[prop].join("<br>");
            });
        });
    }); // forEach(herosGroup=>

    function myDivision(obj) {
        let data = [];
        for (var i = 0; i < obj.length; i++) {
            data.push({
                name: obj[i].name,
                value: obj[i].code,
            });
        }
        // console.log(data)
        return data;
    }

    var myParent = document.getElementById("mySelect");
    //Create array of options to be added
    var array = myDivision(eventList[0].division);

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.id = "division";
    selectList.classList = "form-select sort-btn ms-2";
    /* selectList.setAttribute('data-role', 'tagsinput') */
    myParent.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i].value;
        option.text = array[i].name;
        selectList.appendChild(option);
    }
}
loadData();

let navItems = document.querySelector("#navItems");
let isPlayingList = document.getElementById("isPlayingList");

const searchParams = new URLSearchParams(window.location.search);

isPlayingList.onclick = function () {
    console.log(this);
    let param = searchParams.get("isPlaying");
    localStorage.setItem("filterIsPlaying", JSON.stringify(param));
};

/* for (const param of searchParams) {
    console.log(param);
} */
console.log(searchParams.has("isPlaying")); // true
console.log(searchParams.get("isPlaying"));
console.log(searchParams);

function resetMockData() {
    // Display a confirmation message to the user
    if (confirm("This will reset your data. Proceed?")) {
        localStorage.removeItem("eventData");
        localStorage.removeItem("productList");
        localStorage.removeItem("sortedProduct");
        location.reload(); // Reload the current page
    }
}
