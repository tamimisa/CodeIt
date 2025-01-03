function func() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const photo = document.getElementById('photo').files[0];
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const gender = document.getElementById('gender').value;

  // Validate name field
  const nameValue = name.trim();
  if (nameValue === '' || /^\d/.test(nameValue)) {
    alert('Please enter a valid name. Names cannot start with numbers.');
    return false;
  }

  // Validate photo input
  if (!photo) {
    alert('Please select a file.');
    return false;
  }

  // Validate date input
  if (date === '') {
    alert('Please select a date.');
    return false;
  } else if (new Date(date).getFullYear() > 2017) {
    alert('Sorry, kids younger than 6 years are not accepted.');
    return false;
  }

  // Validate gender field
  if (gender === '') {
    alert('Please select a gender.');
    return false;
  }

  // Validate email field
  const emailValue = email.trim(); //email pattern is checked automatically
  if (emailValue === '') {
    alert('Please enter a valid email address.');
    return false;
  }

  // Validate phone number field
  const phoneNumberValue = phone.trim();
  if (phoneNumberValue === '' || !/^\d{10}$/.test(phoneNumberValue)) {
    alert('Please enter a valid 10-digit phone number.');
    return false;
  }

  alert('Your form has been submitted successfully.');

  const printableContent = `
    <img id="print-photo" alt="Kid's Photo" style="max-width: 200px">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Date of Birth:</strong> ${date}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(printableContent);

  const printPhoto = printWindow.document.getElementById('print-photo');
  printPhoto.onload = function () {
    printWindow.print();
    printWindow.document.close();

    const storedNames = localStorage.getItem('childNames');
    const namesArray = storedNames ? JSON.parse(storedNames) : [];

    // Add the submitted name to the array
    namesArray.push(name);

    // Store the updated array in local storage
    localStorage.setItem('childNames', JSON.stringify(namesArray));

    const storedImages = localStorage.getItem('childImages');
    const imagesArray = storedImages ? JSON.parse(storedImages) : [];

    // Add the submitted image to the array
    imagesArray.push(printPhoto.src);

    // Store the updated array in local storage
    localStorage.setItem('childImages', JSON.stringify(imagesArray));
  };

  printPhoto.src = URL.createObjectURL(photo);

  return true;
}

  
 