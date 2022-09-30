/* Author: 

*/
//Name, release-date, actor name, Producer Name 
let movie = {
  data: [{
          name: "Brahmastra",
          releaseDate: "09/09/2022",
          actorName: "Ranbir Kapoor",
          producerName: "Karan Johar"
      },
      {
          name: "Cutputlli",
          releaseDate: "02/09/2022",
          actorName: "akii",
          producerName: "ratsasan"
      },
      {
          name: "Salaar",
          releaseDate: "09/09/2022",
          actorName: "prabhas",
          producerName: "hombale"
      }, {
          name: "avatar 2",
          releaseDate: "09/09/2022",
          actorName: "alien",
          producerName: "jaadu"
      }, {
          name: "Adipurush",
          releaseDate: "12/01/2023",
          actorName: "prabhas",
          producerName: "om raut"
      }, {
          name: "karthikeya 2",
          releaseDate: "09/09/2022",
          actorName: "siddhart",
          producerName: "zee"
      }, {
          name: "fighter",
          releaseDate: "09/09/2022",
          actorName: "hritik roshan",
          producerName: "papa roshan"
      }, {
          name: "Ni po",
          releaseDate: "09/11/2022",
          actorName: "salmon",
          producerName: "Azgar"
      }, {
          name: "Ultra man",
          releaseDate: "09/09/2022",
          actorName: "lamie o",
          producerName: "angie pillai"
      }, {
          name: "ninja technique",
          releaseDate: "05/11/2022",
          actorName: "hatoori",
          producerName: "akie takie"
      }
  ],
  length: 10
};

let userInput, list, data, key, name, release, actor, producer, available, i, userInputLength, match, push,suggestionBox;
let suggestData = [],clickable = true,initialWidth = innerWidth;
data = movie.data;
list = document.querySelector(".data");
if(innerWidth>540) {
  const search = document.querySelector("form"),
  inputField = document.querySelector("input[name=search-key]");
  suggestionBox = document.querySelector(".suggestion");
  inputField.addEventListener('keyup', suggest);
  search.addEventListener('submit', showData);
}else {
  const search = document.querySelector("form");
  suggestionBox = document.querySelector(".modal-box .suggestion");
  search.addEventListener('submit', showData);
  if(!clickable){
      clickable = true;
      search.children[0].children[1].children[0].removeEventListener("click",modal);
      document.body.removeChild(modalBox);
    }else {
      search.children[0].children[1].children[0].addEventListener("click",modal);
    }    
}
//function for modal
function modal() {
  let modalBox,searchField,cancel,div;
  clickable = false;
  searchField = document.querySelector(".search");
  div = document.createElement("div");
  modalBox = document.createElement("div");
  cancel = document.createElement("span"); 
  modalBox.classList.add("modal-box");
  cancel.classList.add("cancel");
  div.classList.add("search");
  div.innerHTML = searchField.innerHTML;
  console.log(div);
  div.children[0].addEventListener('submit', showAndDelete);
  div.children[0].children[0].children[0].children[0].addEventListener('submit', showData);
  modalBox.appendChild(div);
  modalBox.appendChild(cancel);
  modalBox.addEventListener("click",(e)=>{
    if(e.target == modalBox) {
        document.body.removeChild(modalBox);
    }
  });
  document.body.appendChild(modalBox);
  inputField = document.querySelector(".modal-box input[name=search-key]");
  suggestionBox = document.querySelector(".modal-box .suggestion");
  inputField.addEventListener('keyup', suggest);
}
//functio show and delete
function showAndDelte() {
  showData();
  
}

//function to show data
function showData(e) {
  list.innerHTML = "";
  available = 0;
  key = userInput.toLowerCase();
  for (x in data) {
   let name,release,actor,producer,actorPattern;
      name = data[x].name;
      release = data[x].releaseDate;
      actor = data[x].actorName;
      producer = data[x].producerName;
      actorPattern = "/" + actor.toLowerCase() + "\1/";
      if (key == name.toLowerCase() || key == release.toLowerCase() || key == actor.toLowerCase() || key == producer.toLowerCase()) {
          available = 1;
          list.innerHTML += "<li class=\"movie\"><h2>" + name + "</h2><p class=\"movie-release\">" + release + "</p><p class =\"movie-info\">starring:" + actor + "<span>produced by:" + producer + "</span></p></li>";
      } else if (actorPattern.match(key)) {
          available = 1;
          list.innerHTML += "<li class=\"movie\"><h2>" + name + "</h2><p class=\"movie-release\">" + release + "</p><p class =\"movie-info\">starring:" + actor + "<span>produced by:" + producer + "</span></p></li>";
      }
  }
  if (available == 0) {
      list.innerHTML += "<li><h2 class=\"invalid \">Sorry no result found</h2></li>";
  }
  e.preventDefault();
}

//suggest function to give suggestion
function suggest() {
  userInput = document.forms[0]["search-key"].value;
  userInputLength = userInput.length;
  userInput = userInput.toLowerCase();
  match = false;
  push = false;
  if (userInput != "") {
      for (x in data) {
          name = data[x].name;
          for (i = 0; i < userInputLength; i++) {
              if (userInput[i] == name[i].toLowerCase()) {
                  match = true;
              } else {
                  match = false;
                  break;
              }
          }
          if (match == true) {
              if (suggestData.length > 0) {
                  for (x in suggestData) {
                      if (suggestData[x] != name) {
                          push = true;
                      } else {
                          push = false;
                          break;
                      }
                  }
              } else {
                  push = true;
              }
              if (push) {
                  suggestData.push(name);
              }
          }
      }
  } else {
      suggestionBox.innerHTML = "";
  }
  suggestionBox.innerHTML = "";
  for (x in suggestData) {
      suggestionBox.innerHTML += "<li class=\"suggest\">" + suggestData[x] + "</li>";
  }
  selectSuggestion();
  suggestData = [];
}
//function to select suggestion option
function selectSuggestion() {
  const suggestList = document.querySelectorAll(".suggest");
  suggestList.forEach((li) => {
      li.addEventListener('click', () => {
          inputField.value = li.innerHTML;
          userInput = inputField.value;
          suggestionBox.innerHTML = "";
      });
  });
}