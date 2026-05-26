// Firebase SDK'larını içe aktarıyoruz (Tek bir versiyon üzerinden: 10.11.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Projenin Bağlantı Kodları
const firebaseConfig = {
  apiKey: "AIzaSyB5WlQWhrTeX_Uc2MIseMUJ-Dp2KT0jyaQ",
  authDomain: "footyscopefg-df329.firebaseapp.com",
  projectId: "footyscopefg-df329",
  storageBucket: "footyscopefg-df329.firebasestorage.app",
  messagingSenderId: "1098459531879",
  appId: "1:1098459531879:web:6df8f70be1e360440662c2"
};

// Firebase'i Başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Arayüz Elementlerini Yakala
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const userDisplay = document.getElementById('user-display');
const btnLogout = document.getElementById('btn-logout');

// OTURUM DURUMUNU DİNLE
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Giriş yapmış bir kullanıcı index.html'e gitmeye çalışırsa dashboard'a çek
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            window.location.href = "dashboard.html";
        }
        
        if(loginSection) loginSection.style.display = 'none';
        if(dashboardSection) dashboardSection.style.display = 'block';
        if(userDisplay) userDisplay.innerText = user.email;
    } else {
        // Giriş yapmamış bir kullanıcı dashboard'a sızmaya çalışırsa index'e fırlat
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = "index.html";
        }
        
        if(loginSection) loginSection.style.display = 'block';
        if(dashboardSection) dashboardSection.style.display = 'none';
    }
});

// ÇIKIŞ YAPMA İŞLEMİ
if(btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Çıkış yaparken lisans durumunu tarayıcı hafızasından siliyoruz (Güvenlik)
        localStorage.removeItem('licenseActive');
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    });
}

// ŞİFREMİ UNUTTUM FONKSİYONU
window.forgotPassword = () => {
    const email = prompt("Şifre yenileme bağlantısı gönderilecek e-posta adresinizi giriniz:");
    
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.");
            })
            .catch((error) => {
                console.error("Hata:", error.code);
                if (error.code === 'auth/user-not-found') {
                    alert("Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.");
                } else {
                    alert("Bir hata oluştu. Lütfen e-posta adresinizi doğru girdiğinizden emin olun.");
                }
            });
    }
};