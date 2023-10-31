let button = document.getElementById('createButton');
button.addEventListener('click', addContact);
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addContact();
    }
});

let contactId = 0;
let removeAllBtnCreated = false;

function createRemoveAllButton(){
    let contactAddForm = document.getElementById('contact-input-form');
    let removeAllBtn = document.createElement('button');
    removeAllBtn.textContent = "Remove all";
    removeAllBtn.id = 'removeAllBtn';
    removeAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            confirmRemoveAll();
        });
    contactAddForm.appendChild(removeAllBtn);
}

function addContact() {
    
    let inputName = document.getElementById('nameInput').value;
    let inputPhone = document.getElementById('telInput').value;
    
    let validationResult = validateInput(inputName, inputPhone);

    if(validationResult === false){
        return;
    }
    
    document.getElementById('nameInput').value = '';
    document.getElementById('telInput').value = '';

    displayContact(inputName, inputPhone);

    if (!removeAllBtnCreated) {
        createRemoveAllButton();
        removeAllBtnCreated = true;
    }
}

function removeAllContacts(){
    let contactList = document.getElementById('contactList');
    let removeAllBtn = document.getElementById('removeAllBtn');

    while (contactList.firstChild) {
        contactList.removeChild(contactList.firstChild);
    }
    removeAllBtnCreated = false;
    removeAllBtn.remove();
}


function confirmRemoveAll() {
    if (confirm('Are you sure? If you click OK all contacts will be deleted.')) {
      removeAllContacts();
    } else {
      return;
    }
  }

function displayContact(inputName, inputPhone){
    let contactList = document.getElementById('contactList');
    let contactElement = document.createElement('li')
    contactElement.id = 'contactElement' + contactId;

    let displayName = document.createElement('input');
    displayName.value = inputName;
    displayName.setAttribute('readonly', true);
    displayName.id = 'inputName' + contactId;

    let displayPhone = document.createElement('input');
    displayPhone.value= inputPhone;
    displayPhone.setAttribute('readonly', true);
    
    displayPhone.id = 'inputPhone' + contactId;

    let removeBtn = document.createElement('img');
    removeBtn.src = "delete.png";
    removeBtn.id = 'removeBtn';
    removeBtn.addEventListener('click', function () {
        removeContact(contactElement.id);
    });

    let updateBtn = document.createElement('img');
    updateBtn.src = "edit.png";
    updateBtn.id = 'updateBtn' + contactId;
    updateBtn.addEventListener('click', function () {
        beginUpdateContact(displayName.id, displayPhone.id, updateBtn.id);
    });

    contactElement.append(displayName, displayPhone, removeBtn, updateBtn);
    contactList.appendChild(contactElement);
    contactId++;
}

function removeContact(contactElementId){
    let contactElement = document.getElementById(contactElementId);
    contactElement.remove();
}

function beginUpdateContact(inputNameId, inputPhoneId, updateBtnId){
    let inputName = document.getElementById(inputNameId);
    inputName.removeAttribute('readonly');

    let inputPhone = document.getElementById(inputPhoneId);
    inputPhone.removeAttribute('readonly');

    let updateBtn = document.getElementById(updateBtnId);
    updateBtn.src = "check.png";

    updateBtn.removeEventListener('click', function () {
        beginUpdateContact(inputNameId, inputPhoneId, updateBtnId);
    });

    updateBtn.addEventListener('click', function () {
        updateContact(inputNameId, inputPhoneId, updateBtnId);
    });
}

function updateContact(inputNameId, inputPhoneId, updateBtnId){
    let inputName = document.getElementById(inputNameId);
    let inputPhone = document.getElementById(inputPhoneId);

    let validationResult = validateInput(inputName.value, inputPhone.value);

    if(validationResult === false){
        return;
    }

    inputName.setAttribute('readonly', true);
    inputPhone.setAttribute('readonly', true);

    let updateBtn = document.getElementById(updateBtnId);
    updateBtn.src = "edit.png";

    updateBtn.removeEventListener('click', function () {
        updateContact(inputNameId, inputPhoneId, updateBtnId);
    });

    updateBtn.addEventListener('click', function () {
        beginUpdateContact(inputNameId, inputPhoneId, updateBtnId);
    });
}

function validateInput(inputName, inputPhone) {
    let message = document.getElementById('validation-msg');
 
    if (inputName === "" || inputPhone === "") {
        message.innerText = "Contact can not be empty.";
        return false;
    }
    else {
        message.innerText = "";
        return true;
    }
}

const audio = new Audio();
  audio.src = "dialup.mp3";

  function playAudio() {
    audio.play();
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
  }

