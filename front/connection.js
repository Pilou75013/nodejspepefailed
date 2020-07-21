class RequeteUser {
  constructor() {
    this.url = "http://127.0.0.1:3000";
  }

  getUser(){
    let settings = {
      "url" : this.url + "/user",
      "method": "GET"
    }
    $.ajax(settings).done((response) => {
      var uName = response.name;
    });
  }

  login(){
    var data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    let settings = {
      "url" : this.url + "/user/connect",
      "method": "POST",
      ContentType: "application/json",
      data: data
    };
    $.ajax(settings).done((response) => {
      console.log(response);
      if (response.good) {
        window.open("./index.html");
      }
    });
  }

  addUser(){
    let pwd = document.getElementById("champsPassword").value;
    let pwd2 = document.getElementById("champsPassword2").value;
    // if (pwd != pwd2) {
    //   alert("Les 2 mots de passe doivent être identiques !");
    //   return;
    // }
    var data = {
      password: pwd,
      email: document.getElementById("champsEmail").value
    };
    // Config la route d'envoie des infos :
    var settings = {
      url: this.url + "/users/register",
      method: "POST",
      ContentType: "application/json",
      data: data
    };
    // Envoie la requete :
    $.ajax(settings).done((response) => {
      console.log(response);
      window.location.href = "connection.html";
    });
    //Reinitialise les valeurs a 0 :
    document.getElementById("champsPassword").value = "";
    document.getElementById("champsPassword2").value = "";
    document.getElementById("champsEmail").value = "";
  }
}


var requeteUser = new RequeteUser();



if (document.getElementsByTagName("h1")[0].textContent = " Sign up") {
  let registerUser = document.getElementById('inscription');
  registerUser.addEventListener('click', function () {requeteUser.addUser()});
} else{
  let connectUser = document.getElementById('connection');
  connectUser.addEventListener('click', function () {requeteUser.login()});
}
