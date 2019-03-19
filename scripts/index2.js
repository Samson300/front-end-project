
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







function filterByLetter(letter) {
   step1 = hotel.join(",");
   step2 = step1.split(",");
    const filtered = step2.filter(function (character, index) {
        // console.log(character)
        if (character.includes(letter)) {
            return character;
        }
    });
        // console.log(`drawing for ${letter}`);
    drawListOfCharacters(filtered);
}

function attachClickHotels() {
    const letters = document.querySelectorAll('[data-Hotel]');
    letters.forEach(function (letter){
        // console.log(letter)
        letter.addEventListener('click', function (){
            filterByLetter(letter.textContent);
        });
    });
};
attachClickHotels()

function drawCharacterToDetail(thing) {
    // console.log(thing);
    let objects = fetch(inventoryURL).then(function(response){
        return response.json()
    }) .then(function (response){ 
        let detailDiv = document.querySelector('[data-detail]');
        detailDiv.textContent = '';
        response[thing].forEach(function(item){
            // console.log(item.Name)

            const nameDiv = document.createElement('div');
            const quantityDiv = document.createElement('div');
            const notesDiv = document.createElement('div');
        
            nameDiv.textContent = `Name: ${item.Name}`;
            quantityDiv.textContent = `Quantity: ${item.Quantity}`;
            notesDiv.textContent = `Notes: ${item.Notes}`;
            // console.log(nameDiv)
        
        
            detailDiv.appendChild(nameDiv);
            detailDiv.appendChild(quantityDiv);
            detailDiv.appendChild(notesDiv);
        })

    })
    

}

function drawSingleCharacterToListing(characterObject) {

    const anchorElement = document.createElement('a');
    anchorElement.textContent = characterObject;

    anchorElement.addEventListener('click', function(){
        drawCharacterToDetail(characterObject);
    });

    const listItem = document.createElement('li');
    listItem.appendChild(anchorElement);

    const listArea = document.querySelector('[data-listing]');

    listArea.appendChild(listItem);
}

function drawListOfCharacters(filtered){
    const listArea = document.querySelector('[data-listing]');
    listArea.textContent = '';
    filtered.forEach(drawSingleCharacterToListing);
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
        drawSingleCharacterToListing(stuff)
    })

}

addToHotels(urlKeys())
