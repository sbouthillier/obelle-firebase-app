document.addEventListener("DOMContentLoaded", function(){
    // listen for auth status changes
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user logged in");
        console.log(user);
        setupUI(user);
        var uid = user.uid;
        console.log(uid);
      } else {
        console.log("user logged out");
        setupUI();
      }
    });
  
    // login
    auth.signInAnonymously().then((cred) => {

    });
  });