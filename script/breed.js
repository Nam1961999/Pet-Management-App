'use strict';

const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

let breedArrBackup = JSON.parse(localStorage.getItem('key'));

if (breedArrBackup === null)
    breedArrBackup = [];

let breedArr = breedArrBackup;

renderTableData(breedArr);


// clearTypeText
const clearTypeText = (...properNames) => {
    for (let i of properNames) {
        i.value = "";
    }
};
const clearInput = () => {
    clearTypeText(
        typeInput,
        breedInput
    );
};

// renderTableData
function renderTableData(breedArr) {
    tableBodyEl.innerHTML = "";

    for (let i = 0; i < breedArr.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${i + 1}</th>
        <td>${breedArr[i].breed
            }</td>
    <td>${breedArr[i].type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${breedArr[i].breed
            }')">Delete</button></td>`;
        tableBodyEl.appendChild(row);
    }
}

submitBtn.addEventListener("click", function() {
    const data = {
        type: typeInput.value,
        breed: breedInput.value,
    };
    //console.log(data); //test
    breedArr.push(data);
    clearInput();
    renderTableData(breedArr);
    console.log(breedArr);
    localStorage.setItem('key', JSON.stringify(breedArr));

});

// Delete breed  

const deletePet = (petBreed) => {
    //Confirm before delete
    if (confirm("Are you sure")) {
        const index1 = breedArr.findIndex((pet) => pet.breedAr === petBreed);
        breedArr.splice(index1, 1);
        localStorage.setItem('key', JSON.stringify(breedArr)); // overwrite data
        renderTableData(breedArr);
    }
}