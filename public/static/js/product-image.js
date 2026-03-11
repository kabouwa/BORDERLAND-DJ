// Image preview
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const placeholder = document.getElementById("image-placeholder");
const removeBtn = document.getElementById("remove-image");
const dropZone = document.getElementById("image-drop-zone");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  imagePreview.src = url;
  imagePreview.style.display = "block";
  placeholder.style.display = "none";
  removeBtn.style.display = "inline-block";
  dropZone.style.borderColor = "var(--primary)";
});

removeBtn.addEventListener("click", () => {
  imageInput.value = "";
  imagePreview.style.display = "none";
  imagePreview.src = "";
  placeholder.style.display = "block";
  removeBtn.style.display = "none";
  dropZone.style.borderColor = "var(--border)";
});
