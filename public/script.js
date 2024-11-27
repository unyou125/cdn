function login() {
    const passwordInput = document.getElementById("password").value;
    if (passwordInput === "superiorsgreat") {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("file-manager").style.display = "block";
        fetchFiles();
    } else {
        document.getElementById("error-message").innerText = "Incorrect password!";
    }
}

function fetchFiles() {
    fetch('/files')
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById("file-list");
            fileList.innerHTML = files.map(file => `<li>${file}</li>`).join('');
        });
}

document.getElementById("upload-form").addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/upload', {
        method: 'POST',
        body: formData,
    }).then(() => fetchFiles());
});
