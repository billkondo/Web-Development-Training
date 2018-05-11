$(document).ready(function() {
    let result = 0;          // result of all calculations so far
    let cur = 0;             // current value being digited
    let op = 0;              // current operation
    let startCalc = false;
    let numberStated = false;
    let decimalFlag = false;
    let dec = 0.1;

    function applyOp() {        
        if(startCalc) {
            switch(op) {
                case 1:
                    result += cur;
                    break;
                case 2: 
                    result *= cur;
                    break;
                case 3: 
                    result /= cur;
                    break;
                case 4: 
                    result -= cur;
                    break;
            }

            cur = result;
            displayResult();
            cur = 0;
        }
        else {
            result = cur;
            startCalc = true;
            cur = 0;
        }

        decimalFlag = false;
        dec = 0.1;
    }

    function displayOperations() {
        switch(op) {
            case 1:
                $('#screen1').html('+');
                break;
            case 2:
                $('#screen1').html('*');
                break;
            case 3:
                $('#screen1').html('/');
                break;
            case 4:
                $('#screen1').html('-');
                break;
            default:
                $('#screen1').html('&nbsp;');
        }
    }

    function displayResult() {
        $('#screen2').html(cur);
    }

    function resetCalc() {
        cur = 0;
        result = 0;
    }

    function getDigit(d) {
        if(!decimalFlag) cur = cur * 10 + d;
        else {
            cur = cur + dec * d;
            dec /= 10;
        }
        displayResult();
    }

    function getOp(x) {
       op = x;
       displayOperations();
       applyOp();
    }

    function hitEnter() {
        applyOp();
        op = 0;
        displayOperations();
    }

    function addDecimals() { decimalFlag = true; }

    // digits buttons 
    $('#zeroButton').click(function()  { getDigit(0) } );
    $('#oneButton').click(function()   { getDigit(1) } );
    $('#twoButton').click(function()   { getDigit(2) } );
    $('#threeButton').click(function() { getDigit(3) } );
    $('#fourButton').click(function()  { getDigit(4) } );
    $('#fiveButton').click(function()  { getDigit(5) } );
    $('#sixButton').click(function()   { getDigit(6) } );
    $('#sevenButton').click(function() { getDigit(7) } );
    $('#eightButton').click(function() { getDigit(8) } );
    $('#nineButton').click(function()  { getDigit(9) } );
    // end digit button

    // keypresses events
    $('body').on("keydown", function(event) {
        if(event.which >= 96 && event.which <= 105) 
            getDigit(event.which - 96);

        if(event.which == 107) getOp(1);
        if(event.which == 106) getOp(2);
        if(event.which == 111) getOp(3);
        if(event.which == 109) getOp(4);

        if(event.which == 13) hitEnter();
        
        if(event.which == 110) addDecimals();
    });

    // correct buttons
    $('#AC').click(function() {
        cur = 0;
        result = 0;
        operations = "";
        waitingOp = false;
        displayResult();
    });

    $('#CE').click(function() {
        cur = 0;
        displayResult();
    }); 
    // end correct buttons

    $('#sign').click(function() {
        cur = -cur;
        displayResult();
    });

    $('#sum').click(function()            { getOp(1); } );
    $('#multiplication').click(function() { getOp(2); } );
    $('#division').click(function()       { getOp(3); } );
    $('#minus').click(function()          { getOp(4); } );
    $("#equals").click(function() { applyOp() } );

});