$(function (){

var NUMBER_OF_COLORS = 16777216;
var mouseIsDown = false;


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


var initializeBoard = function (width, height){

    console.log(arguments);
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
            cell.mousedown(changeColor);
            cell.mouseover(conditionalChangeColor);
            row.append(cell);

        }
    }
};


var clearBoard = function (){
    $('.cell').css('background-color', 'white');
};


initializeBoard(20, 20);

$('#clear').click(clearBoard);

$('body').mousedown(function (){
    mouseIsDown = true;
    console.log(mouseIsDown);
})

$('body').mouseup(function (){
    mouseIsDown = false;
    console.log(mouseIsDown);
})


})