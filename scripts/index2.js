let inventoryURL = "../assets/techOpsInventory.json";

let hotel = [];

const hotelDiv = document.querySelector("[data-listing]")




function urlFor() {
    return fetch(inventoryURL).then(function(response) {
        return response.json()
    }).then(function(response) {
        Object.values(response).forEach(function(thing) {
    })
})
}
urlFor()



function urlKeys() {
    return fetch(inventoryURL).then(function(response){
        return response.json()
    }).then(function(response){
        // console.log(Object.keys(response))
        return Object.keys(response)
    })
}

// console.log(urlKeys())
urlKeys()


function filterByHotelName(letter) {
   step1 = hotel.join(",");
   step2 = step1.split(",");
    const filtered = step2.filter(function (character, index) {
        // console.log(character)
        if (character.includes(letter)) {
            return character;
        }
    });
        // console.log(`drawing for ${letter}`);
    drawListOfHotels(filtered);
}

function attachClickHotels() {
    const letters = document.querySelectorAll('[data-Hotel]');
    letters.forEach(function (letter){
        // console.log(letter)
        letter.addEventListener('click', function (){
            filterByHotelName(letter.textContent);
        });
    });
};
attachClickHotels()

// HOTEL DETAILS
function drawDetailToHotel(thing) {
    // console.log(thing);
    let objects = fetch(inventoryURL).then(function(response){
        return response.json()
    }) .then(function (response){ 
        let detailDiv = document.querySelector('[data-detail]');
        detailDiv.textContent = '';
        response[thing].forEach(function(item){
            const nameDiv = document.createElement('div');
            const quantityDiv = document.createElement('div');
            const notesDiv = document.createElement('div');
            const spaceDiv = document.createElement('div');
        
            nameDiv.textContent = `Name: ${item.Name}`;
            quantityDiv.textContent = `Quantity: ${item.Quantity}`;
            notesDiv.textContent = `Notes: ${item.Notes}`;
            spaceDiv.textContent = "**************";
        
        
            detailDiv.appendChild(nameDiv);
            detailDiv.appendChild(quantityDiv);
            detailDiv.appendChild(notesDiv);
            detailDiv.appendChild(spaceDiv);
        })

    })
    

}
// ROOMS //
function drawSingleHotelToListing(roomObject) {

    const anchorElement = document.createElement('a');
    anchorElement.textContent = roomObject;

    anchorElement.addEventListener('click', function(){
        drawDetailToHotel(roomObject);
    });

    const listItem = document.createElement('li');
    listItem.appendChild(anchorElement);

    const listArea = document.querySelector('[data-listing]');

    listArea.appendChild(listItem);
}

function drawListOfHotels(filtered){
    const listArea = document.querySelector('[data-listing]');
    listArea.textContent = '';
    filtered.forEach(drawSingleHotelToListing);
}

function addToHotels(textData) {
    textData
    .then(function (stuff) {
        // console.log("Every day, we stray further from gods light");
        hotel.push(stuff)

        stuff.forEach(function(singleStuff){
            // console.log(singleStuff)
            const newElement = document.createElement('h6')
            newElement.textContent = singleStuff;
            
            hotelDiv.appendChild(newElement);
        })
        drawSingleHotelToListing(stuff)
    })

}

addToHotels(urlKeys())
