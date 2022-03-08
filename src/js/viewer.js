$( document ).ready( processData );

let galaxy;
let canvas;

function processData() {
    try {
        $.ajax({
            url: "http://localhost:8080/galaxy",
            success: function( result ) {
                galaxy = JSON.parse(result);
                canvas = $("#mapCanvas").get(0);
                canvas = canvas.getContext("2d");
            }
        });
    } catch(err) {
        console.log(err);
    }
}

setInterval(renderer, 1000);

function renderer() {
    if(galaxy) {
        canvas.fillStyle = 'rgb(200, 0, 0)';
        canvas.fillRect(10, 10, 50, 50);
    }
}