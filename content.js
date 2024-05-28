// URL of the new profile picture
const newProfilePicUrl = chrome.runtime.getURL('jerry.jpg');
const fixedPart = ["profile", "company-logo", "group-logo_image"]

function replaceProfilePics(newProfilePicUrl) {
    // Select all profile picture elements in LinkedIn posts
    const profilePics = document.querySelectorAll('img');

    // Replace the src of each profile picture with the new profile picture URL
    profilePics.forEach((img) => {
        if (fixedPart.some(part => img.src.includes(part))) {
            img.src = newProfilePicUrl;
            img.srcset = '';
        }
    });
}

chrome.storage.local.get('profilePic', function (data) {
    if (data.profilePic) {
        // replace the profile picture with the new profile picture
        replaceProfilePics(data.profilePic); 

        // mutation observer to replace the profile picture with the selected picture
        const observer = new MutationObserver(() => replaceProfilePics(data.profilePic));
        observer.observe(document.body, { childList: true, subtree: true });
    }
});