//your code here
// List of image class names
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

// STATE VARIABLES
let selectedImages = [];
let duplicatedClass = "";

// -----------------------------
// STEP 1: RANDOMIZE IMAGES
// -----------------------------
function loadImages() {
  container.innerHTML = "";
  result.textContent = "";

  // Randomly select one image class to duplicate
  duplicatedClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];

  // Create array with one duplicate
  let images = [...imageClasses, duplicatedClass];

  // Shuffle images
  images = images.sort(() => Math.random() - 0.5);

  // Render images to DOM
  images.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.class = cls;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    container.appendChild(img);
  });

  // Reset states
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
}

// -----------------------------
// STEP 2: HANDLE IMAGE CLICKS
// -----------------------------
function handleImageClick(img) {
  // If already selected, ignore
  if (selectedImages.includes(img)) return;

  // Add selected class visually
  img.classList.add("selected");
  selectedImages.push(img);

  // Show Reset button once clicked
  resetBtn.style.display = "inline-block";

  // Only allow two selections
  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  } else if (selectedImages.length > 2) {
    // Prevent more than two selections
    selectedImages[selectedImages.length - 1].classList.remove("selected");
    selectedImages.pop();
  }
}

// -----------------------------
// STEP 3: VERIFY IMAGES
// -----------------------------
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [first, second] = selectedImages;

  if (first.dataset.class === second.dataset.class) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// -----------------------------
// STEP 4: RESET FUNCTION
// -----------------------------
resetBtn.addEventListener("click", () => {
  loadImages(); // Reload and shuffle images
});

// -----------------------------
// INIT
// -----------------------------
loadImages();
