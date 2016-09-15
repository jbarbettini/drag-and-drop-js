// Get image JSON information 
var xhr = new XMLHttpRequest();

xhr.open('GET', "http://localhost:3000/assets/images.json", true);
xhr.send();

xhr.onreadystatechange = processRequest;
 
function processRequest(e) {
 if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    var images = response.images;
    var imageHTML = images.reduce(function(prev, image) {
      return prev += buildLI(image);
    }, '');
    document.getElementById("images").innerHTML = imageHTML;
 }
}

function buildLI(imageUrl) {
  return '<li draggable="true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)"><img src=' + imageUrl + '></li>';
}

// Handle Drag/Drop events 
var source; 

function dragStarted(event){
  source = event.target;
  event.dataTransfer.effectAllowed = "move";
}

function draggingOver(event){
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function dropped(event){
  event.preventDefault();
  event.stopPropagation();
  var temp = source.parentElement.outerHTML; 
  source.parentElement.outerHTML = event.target.parentElement.outerHTML;
  event.target.parentElement.outerHTML = temp; 
}