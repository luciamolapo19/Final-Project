document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const idNumber = document.getElementById('idNumber').value;
    const address = document.getElementById('address').value;
    const photo = document.getElementById('photo').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('idNumber', idNumber);
    formData.append('address', address);
    formData.append('photo', photo);

    fetch('/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful');
            document.getElementById('registration').style.display = 'none';
            document.getElementById('voting').style.display = 'block';
        } else {
            alert('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed');
    });
});

document.getElementById('votingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const party = document.querySelector('input[name="party"]:checked').value;

    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ party })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Vote successful');
        } else {
            alert('Vote failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Vote failed');
    });
});
