var selectie = [
    
];

var MAX = 12;


var VoegBox = document.getElementById("ItemNaam");
var ToDoList = document.getElementById("TodoLijst");
var BodyMain = document.getElementById("BodyMain");


function voegSpelerToe() {
    var naam = VoegBox.value.trim();

    if (naam === "") {
        alert("Vul iets in!");
        return;
    }

    if (selectie.length >= MAX) {
        alert("De Lijst zit vol!");
        return;
    }

    if (selectie.indexOf(naam) !== -1) {
        alert("Deze heb je al in toegevoegd!");
        return;
    }

    selectie.push(naam);
    updateLijst();

    VoegBox.value = "";
}


function updateLijst(){
    const NewItem = document.createElement("li")
    
    NewItem.textContent = selectie[selectie.length - 1]
    ToDoList.appendChild(NewItem)


    const ItemName = NewItem.textContent;

    let Clicked = false;
    let TimesClicked = 1;

    NewItem.addEventListener("click",Verwijder);

function Verwijder() {
        if (!Clicked) {
            NewItem.style.backgroundColor = "red";
            NewItem.textContent = "Verwijderen?";
            NewItem.style.textDecorationLine = "none"
            Clicked = true;
            setTimeout(() => {
            if(Clicked) {
                NewItem.style.backgroundColor = "#ffffff";
                NewItem.textContent = ItemName;
                if (TimesClicked == 1){
                    NewItem.style.textDecorationLine = "line-through";
                    TimesClicked = 2
                }else if (TimesClicked == 2){
                    TimesClicked = 1; NewItem.style.textDecorationLine = "none";
                }
                Clicked = false;
            }
            }, 800);
        } else {
            if (NewItem.textContent === "Verwijderen?" && NewItem.style.backgroundColor === "red") {
                selectie.pop(NewItem.textContent)
                NewItem.remove();
            }
        }
    }


}












