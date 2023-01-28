"use strict";

// Selecting element
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");


//* Variable creation
let healthyCheck = false;
const storageKey = 'petArr';
let petArrBackup = JSON.parse(localStorage.getItem('storageKey'));
let breedArrBackup = JSON.parse(localStorage.getItem('key'));

if (petArrBackup === null)
    petArrBackup = [];

let petArr = petArrBackup;

let healthyPetArr = [];

//* Function creation

//Capitalize word
const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
};

// checkText
const checkText = (booleanText) => {
    if (booleanText) {
        return "bi bi-check-circle-fill";
    } else {
        return "bi bi-x-circle-fill";
    }
};

// Clear Input
const clearTypeText = (...properNames) => {
    for (let i of properNames) {
        i.value = "";
    }
};
const clearInput = () => {
    clearTypeText(
        idInput,
        nameInput,
        ageInput,
        typeInput,
        weightInput,
        lengthInput,
        breedInput
    );
    colorInput.value = "#000000";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};
renderTableData(petArr); // rendertable data từ  localStorage

//SubFunction Validation(Age,Weight,Length)
function checkValue(inputData, proper, min, max) {
    if (inputData[proper] < min || inputData[proper] > max) {
        alert(`${capitalize(proper)} must be between ${min} and ${max}!`);
        return false;
    } else {
        return true;
    }
}

//Validation
function validateData(inputData) {
    // Check empty data
    const propertyNames = Object.keys(inputData);
    for (let i = 0; i < propertyNames.length; i++) {
        if (inputData[propertyNames[i]] === "") {
            if (propertyNames[i] === "type" || propertyNames[i] === "breed") {
                alert(`Please select ${capitalize(propertyNames[i])}!`);
                return false;
            } else {
                alert(`Please input for ${capitalize(propertyNames[i])}!`);
                return false;
            }
        }
    }

    // Duplicate ID
    for (let i = 0; i < petArr.length; i++) {
        if (inputData.id === petArr[i].id) {
            alert("ID must unique!");
            return false;
        }
    }

    // Age,Weight,Length validation
    if (!checkValue(inputData, "age", 1, 15) ||
        !checkValue(inputData, "weight", 1, 15) ||
        !checkValue(inputData, "lengthPet", 1, 100)
    )
        return false;

    // return true if everything is correct
    return true;
}

// Render table
function renderTableData(petArr) {
    tableBodyEl.innerHTML = "";

    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${petArr[i].id}</th><td>${
      petArr[i].namePet
    }</td><td>${petArr[i].age}</td><td>${petArr[i].type}</td><td>${
      petArr[i].weight
    } kg</td><td>${petArr[i].lengthPet} cm</td><td>${
      petArr[i].breed
    }</td><td><i class="bi bi-square-fill" style="color: ${
      petArr[i].color
    }"></i></td><td><i class="${checkText(
      petArr[i].vaccinated
    )}"></i></td><td><i class="${checkText(
      petArr[i].dewormed
    )}"></i></td><td><i class="${checkText(
      petArr[i].sterilized
    )}"></i></td><td>${
      petArr[i].date
    }</td><td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button></td>`;
        tableBodyEl.appendChild(row);
    }
}

// Table update
const updateT = () => {
    if (healthyCheck) {
        renderTableData(healthyPetArr);
    } else {
        renderTableData(petArr);
    }
};

// Delete pet
const deletePet = (petId) => {
    //Confirm before delete
    if (confirm("Are you sure")) {
        const index1 = petArr.findIndex((pet) => pet.id === petId);
        const index2 = healthyPetArr.findIndex((pet) => pet.id === petId);
        // console.log(index1, index2);//test
        petArr.splice(index1, 1);
        healthyPetArr.splice(index2, 1);
        localStorage.setItem('storageKey', JSON.stringify(petArr)); // overwrite data
    }
    updateT();
};

//* Submit event

submitBtn.addEventListener("click", function() {
    const data = {
        id: idInput.value,
        namePet: nameInput.value,
        age: ageInput.value,
        type: typeInput.value,
        weight: weightInput.value,
        lengthPet: lengthInput.value,
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date().toLocaleDateString("en-GB"),
    };

    // console.log(data); //test
    const validate = validateData(data);
    // console.log(validate);//test
    if (validate) {
        petArr.push(data);
        clearInput();
        renderTableData(petArr);
        console.log(petArr);
        localStorage.setItem('storageKey', JSON.stringify(petArr));
    }
});

// *Healthy event

healthyBtn.addEventListener("click", function() {
    if (healthyBtn.innerText === "Show Healthy Pet") {
        healthyBtn.innerText = "Show All Pet";
        healthyCheck = true;
    } else {
        healthyBtn.innerText = "Show Healthy Pet";
        healthyCheck = false;
    }

    healthyPetArr = petArr.filter(
        (item) =>
        item.vaccinated === true &&
        item.dewormed === true &&
        item.sterilized === true
    );
    updateT();
});

function loadListBreed() {
    var type = document.getElementById("input-type").value;

    let breedArr = breedArrBackup.filter((breed) => breed.type === type);
    breedInput.innerHTML = '';

    for (let i = 0; i < breedArr.length; i++) {
        let breed = breedArr[i];
        let option = document.createElement('option');
        option.innerHTML = breed.breed;
        breedInput.appendChild(option)
    }
}

function changeType() {
    loadListBreed();
}

loadListBreed(); //chạy ngay lập tức khi file script.js được load xong bởi browser