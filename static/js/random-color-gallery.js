$(function (){

var WIDTH = 15;
var HEIGHT = 15;

var myDataRef = new Firebase('https://randomcolorpicker.firebaseio.com/');


var displayBoard = function (width, height, array, key){
    var i;
    var cell;
    var row;
    var link = $('<a>');
    link.attr('href', "index.html?board-id=" + key);
    var board = $('<div>');
    board.attr('class', 'board');
    board.attr('id', key);

    for (var n = 0; n < height; n++) {

        row = $('<div>');
        row.attr('class', 'row');
        board.append(row);

        for (var m = 0; m < width; m++) {
            i = (n * width) + m;
            cell = $('<div>');
            cell.attr('class', 'cell');
            cell.css('background-color', array[i]);
            row.append(cell);
        }
    }
    link.append(board)
    $('body').append(link);
};


// Attach an asynchronous callback to read the data at our posts reference
myDataRef.on("value", function(snapshot) {
    var boards = snapshot.val();
    for (key in boards) {
        displayBoard(WIDTH, HEIGHT, boards[key], key);
    }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);

});

})

