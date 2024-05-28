// event listener for input file for image selection
document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0]; // access the selected file
    const preview = document.getElementById('imagePreview'); // get the element responsible to preview the selected image

    if (file) {
        const reader = new FileReader(); // to read the selected file and store it as yrl
        reader.onload = function (e) {
            preview.src = e.target.result; // set the src of the element used to preview the selected image
            preview.style.display = 'block'; 
        };
        reader.readAsDataURL(file); // read the file and encode it as base64 data url
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});


// event listener for saving file to chrome local storage
document.getElementById('saveButton').addEventListener('click', function () {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            chrome.storage.local.set({ profilePic: imageData }, function () {
                alert('Image saved!');
            });  // save the image in the local storage
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image.');
    }
});
