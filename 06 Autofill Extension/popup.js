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
