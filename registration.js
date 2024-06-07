import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxl7x9-V0RIu5dU8sRI1zDmq07aJ3AVNo",
    authDomain: "nourishnest-f66d2.firebaseapp.com",
    projectId: "nourishnest-f66d2",
    storageBucket: "nourishnest-f66d2.appspot.com",
    messagingSenderId: "229819331025",
    appId: "1:229819331025:web:96982c4afc127a7ad570f0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("registrationForm").addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    set(ref(db, 'user/' + username), {
        username: username,
        email: email,
        password: password
    }).then(() => {
        alert("Registration Successful!");
    }).catch((error) => {
        alert("Failed to register: " + error.message);
    });
});
