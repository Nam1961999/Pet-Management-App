'use strict';

// Selecting element
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

let petArrBackup = JSON.parse(localStorage.getItem('storageKey'));
let breedArrBackup = JSON.parse(localStorage.getItem('key'));

if (petArrBackup === null)
    petArrBackup = [];

let petArr = petArrBackup;

// checkText
const checkText = (booleanText) => {
    if (booleanText) {
        return "bi bi-check-circle-fill";
    } else {
        return "bi bi-x-circle-fill";
    }
};

// Render table
function renderTableData(petArr) {
    tableBodyEl.innerHTML = "";

    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${petArr[i].id}</th><td>${petArr[i].namePet
            }</td><td>${petArr[i].age}</td><td>${petArr[i].type}</td><td>${petArr[i].weight
            } kg</td><td>${petArr[i].lengthPet} cm</td><td>${petArr[i].breed
            }</td><td><i class="bi bi-square-fill" style="color: ${petArr[i].color
            }"></i></td><td><i class="${checkText(
                petArr[i].vaccinated
            )}"></i></td><td><i class="${checkText(
                petArr[i].dewormed
            )}"></i></td><td><i class="${checkText(
                petArr[i].sterilized
            )}"></i></td><td>${petArr[i].date
            }</td>`;
        tableBodyEl.appendChild(row);
    }
}

function searchPet() {
    let id = idInput.value;
    let name = nameInput.value;
    let vaccinated = vaccinatedInput.checked;
    let dewormed = dewormedInput.checked;
    let type = typeInput.value;
    let breed = breedInput.value;
    let sterilized = sterilizedInput.checked;

    let result = [];
    for (let i = 0; i < petArr.length; i++) {
        let pet = petArr[i];
        // console.log(pet);
        if (!(pet.id.includes(id) && pet.namePet.includes(name) && (pet.vaccinated == vaccinated || !vaccinated) && (pet.dewormed == dewormed || !dewormed) &&
                (pet.sterilized == sterilized || !sterilized))) continue;
        console.log("abc")
        if ((pet.type == type || type == "Select Type") && (pet.breed == breed || breed == "Select Breed")) {
            result.push(pet);
        }
    }

    console.log(result);

    return result;
}


findBtn.addEventListener("click", function() {
    renderTableData(searchPet());
});

renderTableData(searchPet());

function loadListBreed() {
    var type = document.getElementById("input-type").value;

    let breedArr = breedArrBackup.filter((breed) => breed.type === type);
    breedInput.innerHTML = '';
    let option = document.createElement('option');
    option.innerHTML = "Select Breed";
    breedInput.appendChild(option)

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