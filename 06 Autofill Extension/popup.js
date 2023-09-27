// Store user info in chrome.storage.local when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    var userInfo = {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        email: 'john.doe@example.com'
    };

    chrome.storage.local.set({ userInfo: userInfo }, () => {
        console.log('User info stored');
    });

    // Create context menu items for each user info key
    for (const key of Object.keys(userInfo)) {
        chrome.contextMenus.create({
            id: key,
            title: `Fill with ${key}`,
            contexts: ['editable'],
        });
    }
});

// Listen for context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.storage.local.get(['userInfo'], (result) => {
        const value = result.userInfo[info.menuItemId];
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: fillInput,
            args: [value]
        });
    });
});

// Fill the right-clicked input field with the selected value
function fillInput(value) {
    document.activeElement.value = value;
}

// Listen for the Autofill button click in the popup
document.getElementById('autofill').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.storage.local.get(['userInfo'], (result) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: autofillForm,
                args: [result.userInfo]
            });
        });
    });
});

function autofillForm(userInfo) {
    document.getElementsByName('firstName')[0].value = userInfo.firstName;
    document.getElementsByName('lastName')[0].value = userInfo.lastName;
    document.getElementsByName('address')[0].value = userInfo.address;
    document.getElementsByName('phone')[0].value = userInfo.phone;
    document.getElementsByName('email')[0].value = userInfo.email;
}
