const count = 10;
const api_key = "LzT1_TZMFiS24o6YWWg_TTHEXxQS2LuoZhFqBr8DYss";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let isFetching = false;
let photoArray = [];

// function to display photos
function displayPhotos(photoArray) {
  const fragment = document.createDocumentFragment();
  photoArray.forEach((photo) => {
    let a = document.createElement("a");
    setAttributes(a, {
      href: photo.links.html,
      target: "_blank",
    });

    let img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    a.appendChild(img);
    fragment.appendChild(a);
  });
  loader.hidden = true;
  imageContainer.appendChild(fragment);
  setTimeout(() => {
    isFetching = false;
  }, 1000);
}

// fetch photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photoArray = await response.json();
    displayPhotos(photoArray);
  } catch (error) {
    console.log(error);
    loader.hidden = true;
    imageContainer.innerText = "Unsplash API Error";
  }
}

function setAttributes(element, props) {
  for (let key in props) {
    element.setAttribute(key, props[key]);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 &&
    !isFetching
  ) {
    isFetching = true;
    getPhotos();
  }
});
window.onload = getPhotos();
