$(function (){

var WIDTH = 15;
var HEIGHT = 15;
var NUMBER_OF_COLORS = 16777216;
var mouseIsDown = false;
var savedToken;
var savedBoard;

var myDataRef = new Firebase('https://randomcolorpicker.firebaseio.com/');

var getRandomColor = function (){

    var randInt = Math.floor(Math.random() * NUMBER_OF_COLORS);
    newColor = '#' + randInt.toString(16);
    return newColor;
};


var changeColor = function (evt){
    evt.preventDefault();

    var oldColor = $(this).css('background-color');
    var newColor = getRandomColor();

    while (newColor === oldColor){
        newColor = getRandomColor();
    }
    
    $(this).css('background-color', newColor);
};

var conditionalChangeColor = function (evt){

    if (mouseIsDown) {
        $(this).mousedown()
    }
}


var initializeBoard = function (width, height, savedBoard){

    console.log(arguments);
    var i;
    var cell;
    var row;
    var board = $('#board');


    for (var n = 0; n < height; n++) {

        row = $('<div>');
        row.attr('class', 'row');
        board.append(row);

        for (var m = 0; m < width; m++) {

            cell = $('<div>');
            cell.attr('class', 'cell');
            if (savedBoard !== undefined){
                i = (n * width) + m;
                cell.css('background-color', savedBoard[i]);
            }
            cell.mousedown(changeColor);
            cell.mouseover(conditionalChangeColor);
            row.append(cell);

        }
    }
};

var writeBoard = function (){
    var cellColorArray = [];
    var cells = $('#board .cell');

    for (var i = 0; i < cells.length; i++) {
        color = $(cells[i]).css('background-color');
        cellColorArray.push(color);
    };

    return cellColorArray;
}


var clearBoard = function (){
    $('.cell').css('background-color', 'white');
};


var setSavedToken = function (token){
    var savedToken = $('<span>').attr('id', 'saved-token');
    savedToken.data('token-id', token);
    $('body').append(savedToken);
};


var saveBoard = function (){
    var boardArray = writeBoard();
    var savedToken = $('#saved-token');

    if (savedToken.length){
        console.log('updated');
        myDataRef.child(savedToken.data('token-id')).set(boardArray);
    } else {
        var newBoardRef = myDataRef.push();
        newBoardRef.set(boardArray);
        setSavedToken(newBoardRef.key());
    }

    saveAlert();
};


// copied from http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
var getURLParameter = function(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
};

var saveAlert = function (){
    $('#saved-message').slideDown(function() {
    setTimeout(function() {
        $('#saved-message').slideUp();
    }, 2000);
});

}
savedToken = getURLParameter('board-id');


$('#clear').click(clearBoard);

$('#save').click(saveBoard);

$('body').mousedown(function (){
    mouseIsDown = true;
})

$('body').mouseup(function (){
    mouseIsDown = false;
})

if (savedToken !== undefined) {
    setSavedToken(savedToken);
    // Attach an asynchronous callback to read the data at our posts reference
    myDataRef.once("value", function(snapshot) {
            var boards = snapshot.val();
            console.log(boards);
            savedBoard = boards[savedToken];
            initializeBoard(WIDTH, HEIGHT, savedBoard);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          $('body').prepend("load failed");
          initializeBoard(WIDTH, HEIGHT);

    });
}else{
    initializeBoard(WIDTH, HEIGHT);
}


})