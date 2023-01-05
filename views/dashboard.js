document.addEventListener("DOMContentLoaded", function(event) {
  // Check if the document is ready
//   if (document.readyState === "complete") {
    // Access and manipulate the element
    const grid = document.querySelector('.grid');
    grid.style.display = "none";
    const info = document.querySelector('.info');
    info.style.display = "none";
});



// window.addEventListener('load', function() {
  
// });

const shorte = () => {
    // Get the current month and year
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const grid = document.querySelector('.grid');
	grid.style.display = "grid";

    const info = document.querySelector('.info');
    info.style.display = "grid";
    
    document.getElementById("banner").style.display = "none";

    const h3Element = document.querySelector("h3");
    h3Element.innerHTML = `Your top 50 songs of ${month} ${year}`;


    

    // Update the inner HTML of the element with the center class
    grid.innerHTML = `<div class="center">Your top songs of ${month} ${year}</div>`;

    let topSongsTable = document.querySelector("tbody");
    topSongsTable.innerHTML = "";
    
    //add fetched changes from api backend thing fuck
    fetch('http://localhost:3000/tracksShort')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let tracksShort = data.tracksShort;
            // Store the data in Local Storage
            let j = 0;
            for (let i = 0; i < 49; i++) {
                //info table
                let song = tracksShort[i];
                let row = document.createElement("tr");
                row.innerHTML = `<td>${song.name}</td><td>${song.album.name}</td><td>${song.artists[0].name}</td>`;
                topSongsTable.appendChild(row);

                if (i == 23 || i == 24 || i == 25) {
                    j++;
                    grid.innerHTML += `<div class="center"></div>`;
                } else {
                    let imageUrl = tracksShort[i-j].album.images[1].url;
                    let imgElement = `<img src="${imageUrl}" alt="track image">`;
                    grid.innerHTML += imgElement;
                }
            }
        });
}

const mediume = () => {
    const grid = document.querySelector('.grid');
    grid.style.display = "grid";

    const info = document.querySelector('.info');
    info.style.display = "grid";

    document.getElementById("banner").style.display = "none";

    const h3Element = document.querySelector("h3");
    h3Element.innerHTML = `Your top songs of the last 6 months`;
      
        // Add the center element back to the grid
    grid.innerHTML = `<div class="center">Your top 50 songs of the last 6 months</div>`;

    // Load top songs for this month
    let topSongsTable = document.querySelector("tbody");
    topSongsTable.innerHTML = "";

    fetch('http://localhost:3000/tracksMedium')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let tracksMedium = data.tracksMedium;
            // Store the data in Local Storage
            let j = 0;
            for (let i = 0; i < 49; i++) {

                let song = tracksMedium[i];
                let row = document.createElement("tr");
                row.innerHTML = `<td>${song.name}</td><td>${song.album.name}</td><td>${song.artists[0].name}</td>`;
                topSongsTable.appendChild(row);

                if (i == 23 || i == 24 || i == 25) {
                    j++;
                    grid.innerHTML += `<div class="center"></div>`;
                } else {
                    let imageUrl = tracksMedium[i-j].album.images[1].url;
                    let imgElement = `<img src="${imageUrl}" alt="track image">`;
                    grid.innerHTML += imgElement;
                }
            }
        });

    };

const longe = () => {
    const grid = document.querySelector('.grid');
    grid.style.display = "grid";

    const info = document.querySelector('.info');
    info.style.display = "grid";

    document.getElementById("banner").style.display = "none";

    const h3Element = document.querySelector("h3");
    h3Element.innerHTML = `Your top 50 songs of all time`;

    // Load top songs for this month
    grid.innerHTML = `<div class="center">Your top songs of all time</div>`;

    // Load top songs for this month
    let topSongsTable = document.querySelector("tbody");
    topSongsTable.innerHTML = "";

    fetch('http://localhost:3000/tracksLong')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let tracksLong = data.tracksLong;
            // Store the data in Local Storage
            let j = 0;
            for (let i = 0; i < 49; i++) {

                let song = tracksLong[i];
                let row = document.createElement("tr");
                row.innerHTML = `<td>${song.name}</td><td>${song.album.name}</td><td>${song.artists[0].name}</td>`;
                topSongsTable.appendChild(row);

                if (i == 23 || i == 24 || i == 25) {
                    j++;
                    grid.innerHTML += `<div class="center"></div>`;
                } else {
                    let imageUrl = tracksLong[i-j].album.images[1].url;
                    let imgElement = `<img src="${imageUrl}" alt="track image">`;
                    grid.innerHTML += imgElement;
                }
            }
        });
};
