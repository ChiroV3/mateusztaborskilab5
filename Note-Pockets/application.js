
var notes =[];
if(localStorage.getItem("noteEntity") === null){ 
    localStorage.setItem('noteEntity', JSON.stringify(notes));
}

//wypelnienei formularza
document.addEventListener( "DOMContentLoaded", () => {  
    var form = document.querySelector( "#form" );
    form.addEventListener( "submit", function( e ) {
        e.preventDefault();
        var json = toJSONString( this );
    }, false);
});

var retrievedObject = localStorage.getItem('noteEntity');
notes = JSON.parse(retrievedObject);
showNotes();

//odswizanie notatek
function showNotes(){                         
//div z notatkami
var wrapper = document.querySelector("#wrapper");
for(i=1;i<wrapper.childElementCount;i++){    
    wrapper.removeChild[i];
}

var ids=0;

 // utworzenie notatek
notes.forEach(element => {              

    var note = document.createElement("div");
    note.className = "note "+element.color;
    note.id=ids++;

    if(element.priority === 1){                       
        note.style.order=1;
    }
    //dodanie tytulu i opisu
    var noteTitle = document.createElement('textarea');
    noteTitle.className="noteTitle";
    noteTitle.value = element.title;
    noteTitle.disabled=true;

    
    var noteDesc = document.createElement('textarea');
    noteDesc.className="noteDesc";
    noteDesc.value = element.description;
    noteDesc.disabled=true;

    var noteFooter= document.createElement('footer');
    noteFooter.className="noteFooter";
    noteFooter.appendChild(document.createTextNode("Last modified: "+element.date));

    var noteCheck = document.createElement('input'); 
    noteCheck.type='checkbox';
    if(element.priority==1){
        noteCheck.checked=true;
    }
    else{
        noteCheck.checked=false;
    }
    noteCheck.disabled=true;

    //tworzenie calego diva 
    note.appendChild(noteTitle); 
    note.appendChild(noteDesc);
    noteFooter.appendChild(noteCheck);
    note.appendChild(noteFooter);

    var flag= true;
    wrapper.childNodes.forEach(e=>{
        if(e.id==note.id){
            flag=false;
            }
        })
    if(flag){
        wrapper.appendChild(note);     
    }

});
}


//dodanie notatki przez formularz
function toJSONString( form ) {          

    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" ); 
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value;
        if(element.type =="checkbox"){
            if(element.checked== true){
                 value = 1;
            }   
            else{ value = 2;}
        }
        else{
             value = element.value;
        }
        if( name ) {
            obj[ name ] = value;
        }
    }

    obj["color"]= form.parentNode.className.split(' ')[1];
    console.log(obj["color"]);
    obj["date"] = new Date();
    notes.push(obj)                                           
    localStorage.setItem('noteEntity', JSON.stringify(notes));
    //odswiezenie notatek
    showNotes();                                             
}

function changeColor(e){
    let parent = e.parentNode.parentNode.parentNode.parentNode;
    parent.classList.remove("blue");
    parent.classList.remove("black");
    parent.classList.remove("red");
    parent.classList.remove("yellow");
    parent.classList.remove("green");
    parent.classList.add(e.className.split(' ')[1]);
}