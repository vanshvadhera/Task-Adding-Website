//if user add some notes, then save them to local storage
let addbtn = document.getElementById("add-button");
//call shoownote function when page load
shownote();

addbtn.addEventListener("click", function () {
    let notes = document.getElementById("add-Txt");
    let notesValue = notes.value;
    let storage = localStorage.getItem("notes");
    if (storage == null) {
        storageobj = [];
    }
    else {
        storageobj = JSON.parse(storage);
    }
    storageobj.push(notesValue);
    localStorage.setItem("notes", JSON.stringify(storageobj));
    notes.value = "";
    shownote();
});

//shownote function to show notes in the page
function shownote() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="card m-2" style="width:18rem" >
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1} </h5>
                <p class="card-text">${element}</p>
                <button id="${index}"  onclick="deletnode(this.id)" class="btn btn-primary mt-2" >Delete</button>
            </div>
        </div>`;
    }
    );
    let notesadd = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesadd.innerHTML = html;
    }else{
        notesadd.innerHTML = `<h4 class="text-center " style="margin-top:20px">No Notes</h4>`;
    }
}

//delete note function
function deletnode(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {   
        notesobj = [];
    } else {      
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownote(); 

}

//search note function
let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    let searchValue = search.value.toLowerCase();
    console.log(searchValue);
    let cardvalue = document.getElementsByClassName("card m-2");
    Array.from(cardvalue).forEach(function (element) {
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        if(cardtext.includes(searchValue)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }

})
});

