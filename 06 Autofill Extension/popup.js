document.getElementById('autofill').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: autofillForm
        });
    });
});

function autofillForm() {
    // User Information
    var userInfo = {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        phone: '123-456-7890',
        email: 'john.doe@example.com'
    };

    // Autofill Logic
    document.getElementsByName('firstName')[0].value = userInfo.firstName;
    document.getElementsByName('lastName')[0].value = userInfo.lastName;
    document.getElementsByName('address')[0].value = userInfo.address;
    document.getElementsByName('phone')[0].value = userInfo.phone;
    document.getElementsByName('email')[0].value = userInfo.email;
}
