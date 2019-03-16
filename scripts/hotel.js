const hotelDiv = document.querySelector('[data-hotel]');
let inventoryURL = "../assets/techOpsInventory.json"
let hotelArray = [];


function getNames(url) {
    fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(accum)
}

function accumulateHotels() {
    pass
}


function drawDetails(object) {
    console.log(object.hotel);
    let detailsDiv = document.querySelector('[data-details]');
    detailsDiv.textContent = '';
    console.log(detailsDiv);
    const nameDiv = document.createElement('div');
    const quantityDiv = document.createElement('div');
    const notesDiv = document.createElement('div');

    nameDiv.textContent = `object: ${object.hotel}`;
    quantityDiv = `quantity: ${object.quantity}`;
    notesDiv = `Notes: ${object.notes}`;


    detailsDiv.append(nameDiv);
    detailsDiv.append(quantityDiv);
    detailsDiv.append(notesDiv);
}


function main() {

} 