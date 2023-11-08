const accessKey = '';

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputDate = "";
let page = 1;

async function searchImages() {
    inputDate = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputDate}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResultEl.innerHTML = "";
    }

    const results = data.results;

    for (const result of results) {
        // Make a separate request for each ID
        const id = result.id;
        const infoUrl = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`;
        const infoResponse = await fetch(infoUrl);
        const infoData = await infoResponse.json();
      
        const imageWraper = document.createElement("div");
        imageWraper.classList.add("search-result");
      
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const cameraName = document.createElement("span");
        cameraName.style.marginLeft = '10px';
        cameraName.style.fontSize = '12px'
        cameraName.textContent = infoData.exif.model === null ? '-' : `Camera: ${infoData.exif.model}`;

        const cameraExposure = document.createElement("span");
        cameraExposure.style.marginLeft = '10px';
        cameraExposure.style.fontSize = '10px'
        cameraExposure.textContent = infoData.exif.exposure_time === null ? '-' : `Lens: Exp:${infoData.exif.exposure_time} Focal:${infoData.exif.focal_length} ISO:${infoData.exif.iso} Aperture:${infoData.exif.aperture} `;
      
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
      
        imageWraper.appendChild(image);
        imageWraper.appendChild(cameraName); // Add cameraDetails to the container
        imageWraper.appendChild(cameraExposure); // Add cameraDetails to the container
        imageWraper.appendChild(imageLink);
        searchResultEl.appendChild(imageWraper);
      }
      
    page++;

    if (page > 1) {
        showMoreButtonEl.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
    searchImages();
});
