// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAYykyc4P38e5Mr5UJur4N9W1183ZUJEp8",
  authDomain: "macetitasyco.firebaseapp.com",
  projectId: "macetitasyco",
  storageBucket: "macetitasyco.firebasestorage.app",
  messagingSenderId: "488328805836",
  appId: "1:488328805836:web:e46746db9fbf110cb7f169",
  measurementId: "G-W32590HYTY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

function save() {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var username = document.getElementById('username').value
  var say_something = document.getElementById('say_something').value
  var favourite_food = document.getElementById('favourite_food').value

  database.ref('users/' + username).set({
    email : email,
    password : password,
    username : username,
    say_something : say_something,
    favourite_food : favourite_food
  })

  alert('Saved')
}

function get() {
  var username = document.getElementById('username').value

  var user_ref = database.ref('users/' + username)
  user_ref.on('value', function(snapshot) {
    var data = snapshot.val()

    alert(data.email)

  })

}

function update() {
  var username = document.getElementById('username').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  var updates = {
    email : email,
    password : password
  }

  database.ref('users/' + username).update(updates)

  alert('updated')
}

function remove() {
  var username = document.getElementById('username').value

  database.ref('users/' + username).remove()

  alert('deleted')
}