//podstawowe zmienne
var sourceImg = document.querySelector('#source');
var canvas = document.querySelector('#canvas');
var canvasContext = canvas.getContext('2d');

//obsluga filtrow
function hue(e) {

    canvasContext.filter = 'hue-rotate(' + e + 'deg)';
    canvasContext.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
    
}

function sepia(e) {

    canvasContext.filter = 'sepia(' + e + '%)';
    canvasContext.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
  
  }
function grayscale(e) {
    canvasContext.filter = 'grayscale(' + e + '%)';
    canvasContext.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
}

function brightness(e) {

  canvasContext.filter = 'brightness(' + e + ')';
  canvasContext.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);

}

function contrast(e) {

  canvasContext.filter = 'contrast(' + e + '%)';
  canvasContext.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);

}

function saturate(e) {

    canvasContext.filter = 'saturate(' + e + '%)';
    canvasContext.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);

}
//akcja na wrzucenie pliku
document.querySelector('#fileUpload').onchange = function(e) {

    var tgt = e.target || window.event.srcElement,
        files = tgt.files;
        
        if (FileReader && files && files.length) {

            var fileReader = new FileReader();
            fileReader.onload = function (e) {

                document.querySelector('#source').src = fileReader.result;
                setTimeout(function() {
                  canvasContext.filter = 'none';
                  canvasContext.drawImage(document.querySelector('#source'), 0, 0, canvas.width, canvas.height);
                }, 500);
            };

            fileReader.readAsDataURL(files[0]);

        }
  };
