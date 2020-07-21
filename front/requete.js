class RequetePost {
    constructor() {
      this.url = "http://127.0.0.1:3000";
    }
  
    getPost(){
      var settings = {
        "url": this.url + "/posts",
        "method": "GET"
      };
      $.ajax(settings).done((response) => {
        this.showText(response);
      });
    }
  
    showText(response){
      let textBlock = document.getElementById("all-post");
      textBlock.innerHTML = "";
  
      for(let i = 0; i < response.length; i++) {
        //title :
        let block = document.createElement("div");
        block.className = "col-md-4";
        textBlock.appendChild(block);
  
        let card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";
        block.appendChild(card);
  
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);
  
        let title = document.createElement("h2");
        title.className = "card-Text";
        let titleText = document.createTextNode(`${response[i].title}`);
        title.appendChild(titleText); // <h2>Texte...</h2>
        cardBody.appendChild(title);
        //content :
          //Lien :
        let line = document.createElement("p");
        line.className = "card-Text";
        line.innerHTML = `${response[i].title} :`;
        cardBody.appendChild(line);
  
        //date et nom :
        let name = document.createElement("p");
        name.className = "card-Text";
        let nameText = document.createTextNode(`Suggéré par ${response[i].content}`)
        name.appendChild(nameText); // <p>Texte...</p>
        cardBody.appendChild(name);
  
        // suppression
        let boutonSuppr = document.createElement("button");
        boutonSuppr.className = "btn btn-sm btn-danger";
        boutonSuppr.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
        boutonsGroup.appendChild(boutonSuppr);
        boutonSuppr.addEventListener("click", () => {
          this.deletePost(response[i]._id);
        });
      }
    }
  
    addPost(){
      // Prends les infos pour créer un son :
      var data = {
        title: document.getElementById("champsTitre").value,
        content: document.getElementById("champsContenu").value
      };
      // Config la route d'envoie des infos :
      var settings = {
        url: this.url + "/posts",
        method: "POST",
        ContentType: "application/json",
        data: data
      };
      // Envoie la requete :
      $.ajax(settings).done((response) => {
        console.log(response);
        this.getPost();
      });
      //Reinitialise les valeurs a 0 :
      document.getElementById("champsTitre").value = "";
      document.getElementById("champsContenu").value = "";
    }
  
    deletePost(id){
      // Config la route d'envoie des infos :
      var settings = {
        url: this.url + "/posts/" + id,
        method: "DELETE",
        ContentType: "application/json"
      };
      console.log(settings);
      // Envoie la requete :
      $.ajax(settings).done((response) => {
        console.log(response);
        this.getPost();
        this.getTopPost();
      });
    }
  }
  
  var requete = new RequetePost();
  // let postButton = document.getElementById('getPostButton');
  // postButton.addEventListener('click', function () {requete.getPost()});
  
  let addPostButton = document.getElementById('addPostButton');
  addPostButton.addEventListener('click', function () {requete.addPost()});
  
  window.onload = requete.getPost();