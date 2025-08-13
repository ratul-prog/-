// লগইন ফাংশন
function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        firebase.auth().signOut();
        showMessage('error', 'ইমেইল ভেরিফাই করা হয়নি। ইমেইল চেক করুন।');
        return;
      }
      window.location.href = 'admin.html';
    })
    .catch((error) => {
      showMessage('error', error.message);
    });
}

// লগআউট ফাংশন
function logout() {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = 'login.html';
    });
}

// ইমেইল ভেরিফিকেশন সেন্ড করুন
function sendVerificationEmail() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(() => {
      showMessage('success', 'ভেরিফিকেশন ইমেইল পাঠানো হয়েছে!');
    });
}

// অথেন্টিকেশন স্টেট ট্র্যাক করুন
function checkAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      if (window.location.pathname.includes('login.html')) {
        window.location.href = 'admin.html';
      }
    } else {
      if (!window.location.pathname.includes('login.html') && 
          !window.location.pathname.includes('verify-email.html')) {
        window.location.href = 'login.html';
      }
    }
  });
}

// মেসেজ শো করার ফাংশন
function showMessage(type, message) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}