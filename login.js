import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxl7x9-V0RIu5dU8sRI1zDmq07aJ3AVNo",
    authDomain: "nourishnest-f66d2.firebaseapp.com",
    projectId: "nourishnest-f66d2",
    storageBucket: "nourishnest-f66d2.appspot.com",
    messagingSenderId: "229819331025",
    appId: "1:229819331025:web:96982c4afc127a7ad570f0"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get the Auth service for the app
const auth = getAuth(app);

// Get a reference to the Firebase Realtime Database
const db = getDatabase(app);

// Add event listener to login form
document.getElementById("loginForm").addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Sign in user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Fetch data from Firebase database
            fetchDataFromDatabase();
        })
        .catch((error) => {
            // Handle errors
            alert("Failed to login: " + error.message);
        });
});

// Function to fetch data from Firebase database
function fetchDataFromDatabase() {
    const userId = auth.currentUser.uid; // Get the current user's ID
    const userRef = ref(db, 'users/' + userId); // Reference to the user's data in the database

    // Fetch the data
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log("User data:", userData);
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
