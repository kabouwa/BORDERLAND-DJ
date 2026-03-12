"use strict";

// Image preview
var imageInput = document.getElementById("image-input");
var imagePreview = document.getElementById("image-preview");
var placeholder = document.getElementById("image-placeholder");
var removeBtn = document.getElementById("remove-image");
var dropZone = document.getElementById("image-drop-zone");
imageInput.addEventListener("change", function () {
  var file = imageInput.files[0];
  if (!file) return;
  var url = URL.createObjectURL(file);
  imagePreview.src = url;
  imagePreview.style.display = "block";
  placeholder.style.display = "none";
  removeBtn.style.display = "inline-block";
  dropZone.style.borderColor = "var(--primary)";
});
removeBtn.addEventListener("click", function () {
  imageInput.value = "";
  imagePreview.style.display = "none";
  imagePreview.src = "";
  placeholder.style.display = "block";
  removeBtn.style.display = "none";
  dropZone.style.borderColor = "var(--border)";
});