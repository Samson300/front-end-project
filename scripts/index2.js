// Add variables to send to HTML
let inventoryURL = "../assets/techOpsInventory.json";
let hotel = [];
const hotelDiv = document.querySelector("[data-listing]")


// Go fetch the URL of the JSON file
function urlFor() {
    return fetch(inventoryURL).then(function (response) {
        // Return the JSON response
        return response.json()
        // Then return the values of each thing
    }).then(function(response) {
        Object.values(response).forEach(function(thing) {
        })
    })
}
urlFor()


// Create a function to grab the keys for each hotel and the inventory
// and then return them
function urlKeys() {
    return fetch(inventoryURL).then(function(response){
        return response.json()
    }).then(function(response){
        // console.log(Object.keys(response))
        return Object.keys(response)
    })
}
// Check to make sure your function is working
console.log(urlKeys())
urlKeys()

// Filter each Hotel by their name and then filter out wach name to return each hotel name.
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

// Add an event listener ('click' in this case) to pull up a list of hotel rooms by the hotel
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
// Add the inventory for each Hotel Room
function drawDetailToHotel(roomItems) {
    // console.log(thing);
        //  grab the inventory url and return the detail to the HTML Div id `[data-detail]`
    let items = fetch(inventoryURL).then(function(response){
        return response.json()
    }).then(function (response) { 
        // data-detail is === to inventory-data and is returned in a <div> in the HTML
        let detailDiv = document.querySelector('[data-detail]');
        // set the content is an empty string
        detailDiv.textContent = '';
        // For each response in roomItems return just the item and assign it to a <div>
        response[roomItems].forEach(function (item) {
            // Give each item you want to return to HTML a variable name
            const nameDiv = document.createElement('div');
            const quantityDiv = document.createElement('div');
            const notesDiv = document.createElement('div');
            const spaceDiv = document.createElement('div');
            
            // Set how you want the data to appear on the screen using interpolation
            nameDiv.textContent = `Name: ${item.Name}`;
            quantityDiv.textContent = `Quantity: ${item.Quantity}`;
            notesDiv.textContent = `Notes: ${item.Notes}`;
            spaceDiv.textContent = "**************";
        
            // attach each rooms inventory to the HTML (BE SURE TO DEFINE THE ELEMENTS IN THE HTML)
            detailDiv.appendChild(nameDiv);
            detailDiv.appendChild(quantityDiv);
            detailDiv.appendChild(notesDiv);
            detailDiv.appendChild(spaceDiv);
        })

    })
    

}
// ROOMS //
// Draw each hotel room to the HTML
function drawSingleHotelToListing(roomObject) {
        // anchor each hotel to the page so when the room or hotel is clicked on the object will be displayed
    const anchorElement = document.createElement('a');
    anchorElement.textContent = roomObject;

    anchorElement.addEventListener('click', function(){
        drawDetailToHotel(roomObject);
    });
    // use the HTML 'li' element to attach the anchorElement to
    const listItem = document.createElement('li');
    listItem.appendChild(anchorElement);
    // show the information under '[data-listing]' in the HTML
    const listArea = document.querySelector('[data-listing]');
    listArea.appendChild(listItem);
}
// Filter each Hotel 
function drawListOfHotels(filtered){
    const listArea = document.querySelector('[data-listing]');
    listArea.textContent = '';
    filtered.forEach(drawSingleHotelToListing);
}

// Example of code to add additional information to the hotels
// Be sure to change the variables
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
// call the add to Hotels function
addToHotels(urlKeys())
