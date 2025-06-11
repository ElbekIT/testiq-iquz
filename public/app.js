// Firebase SDK'ni boshlash
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 1. Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyCSKikqFMUAAjQmL0OUK5HydHrmIIc2MXs",
  authDomain: "testiq-465b5.firebaseapp.com",
  databaseURL: "https://testiq-465b5-default-rtdb.firebaseio.com",
  projectId: "testiq-465b5",
  storageBucket: "testiq-465b5.firebasestorage.app",
  messagingSenderId: "871440661556",
  appId: "1:871440661556:web:24433eee7f44744db29e61",
  measurementId: "G-072S2C078T"
};

// 2. Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 3. HTML elementlar
const leaderboardBody = document.getElementById("leaderboardBody");
const leaderboardModal = document.getElementById("leaderboardModal");
const leaderboardBtn = document.getElementById("leaderboardBtn");
const registerBtn = document.getElementById("registerBtn");
const userNameInput = document.getElementById("userNameInput");
const avatarsDiv = document.getElementById("avatars");

// 4. Avatar URL'lari
const avatarUrls = [
  'https://i.pravatar.cc/60?img=1',
  'https://i.pravatar.cc/60?img=2',
  'https://i.pravatar.cc/60?img=3',
  'https://i.pravatar.cc/60?img=4',
  'https://i.pravatar.cc/60?img=5',
  'https://i.pravatar.cc/60?img=6',
  'https://i.pravatar.cc/60?img=7',
  'https://i.pravatar.cc/60?img=8',
  'https://i.pravatar.cc/60?img=9',
  'https://i.pravatar.cc/60?img=10'
];

// 5. Foydalanuvchini Firebase'ga yozish
function saveUserToFirebase(user) {
  const userRef = ref(db, "users/" + user.name);
  set(userRef, user);
}

// 6. Reytingni ko‘rsatish
function showLeaderboard() {
  leaderboardBody.innerHTML = "";

  get(ref(db, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      leaderboardBody.innerHTML = `<tr><td colspan="6">Hech qanday foydalanuvchi yo'q</td></tr>`;
      return;
    }

    const data = snapshot.val();
    const sorted = Object.values(data).sort((a, b) => b.score - a.score);

    sorted.forEach((u, i) => {
      leaderboardBody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td><img src="${avatarUrls[u.avatarIndex]}" class="leaderAvatar" /></td>
          <td>${escapeHtml(u.name)}</td>
          <td>${u.correct}</td>
          <td>${u.wrong}</td>
          <td>${u.score}</td>
        </tr>
      `;
    });

    leaderboardModal.style.display = "block";
  });
}

// 7. HTML maxsus belgilarni qochirish
function escapeHtml(text) {
  return text.replace(/[&<>"]'/g, function (m) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
  });
}

// 8. Register tugmasiga ishlov berish
registerBtn.addEventListener("click", () => {
  const name = userNameInput.value.trim();
  const selectedAvatar = parseInt(registerBtn.dataset.selectedAvatar);

  if (!name) {
    alert("Ismingizni kiriting!");
    return;
  }

  const currentUser = {
    name: name,
    avatarIndex: selectedAvatar || 0,
    correct: 0,
    wrong: 0,
    score: 0
  };

  saveUserToFirebase(currentUser);
});

// 9. Reyting tugmasiga ishlov berish
leaderboardBtn.addEventListener("click", showLeaderboard);
