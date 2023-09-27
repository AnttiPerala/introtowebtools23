// User Info
var userInfo = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phone: '123-456-7890',
    email: 'john.doe@example.com',
    greeting: 'With warm regards, Antti Perälä, Media & Arts'
};

// Store user info in chrome.storage.local
chrome.storage.local.set({ userInfo: userInfo }, () => {
    console.log('User info stored');
});

// Create context menu items for each user info key
for (const key of Object.keys(userInfo)) {
    chrome.contextMenus.create({
        id: key,
        title: `Fill with ${key}`,
        contexts: ['editable'],
    }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log('Context menu item created');
        }
    });
}

// Listen for context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('Context menu item clicked', info.menuItemId);  // Debugging line
    const value = userInfo[info.menuItemId];
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fillInput,
        args: [value]
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error executing script:', chrome.runtime.lastError.message);  // Debugging line
        }
    });
});

// Function to fill the right-clicked input field with the selected value
function fillInput(value) {
    console.log('fillInput executed with value:', value);  // Debugging line
    document.activeElement.value = value;
}
