$(document).ready(function() {
    
    let result = 0;              // result of all calculations so far

    let cur = 0;                    // current value being digited    
    let curIntegerDisplay = [];     // integer part of current value
    let curFractionalDisplay = [];  // fractional part of current value
    
    let op = 0;               
    /* 
        current operation
        0: none
        1: sum
        2: multiplication
        3: division
        4: minus
    */

    let startCalc = false;
    let numberStated = false;

    let fractionalFlag = false;  // flag to know if we are waiting for fractional digits
    let dec = 0.1;               // a helper variable to indicate which postion the next fractional digit will go

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
                    if(!cur) {
                        $('#screen1').html('&nbsp;');
                        $('#screen2').html('Division By Zero');
                        resetCalc();
                        return;
                    }
                    else
                        result /= cur;

                    break;
                case 4: 
                    result -= cur;
                    break;
            }

            cur = 0;
        }
        else {
            result = cur;
            startCalc = true;
            cur = 0;
        }

        fractionalFlag = false;
        dec = 0.1;

        displayResult(result);
        console.log(result);
        curIntegerDisplay = [];
        curFractionalDisplay = [];
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

    function displayResult(x) {
        
        let number = x;
        number = +number.toFixed(10);

        integerPart = Math.floor(number);
        fractionalPart = (number + "").split(".")[1];
        
        if(fractionalPart) {
            $('#screen2').html(integerPart + ',' + fractionalPart);
        }
        else {
            $('#screen2').html(integerPart);
        }
    }

    function displayCurrentValue() {
        integerPart = curIntegerDisplay.join("");
        fractionalPart = curFractionalDisplay.join("");

        if(fractionalPart.length > 0) $('#screen2').html(integerPart + ',' + fractionalPart);
        else {
            if(!fractionalFlag) {
                $('#screen2').html(integerPart);
            }
            else {
                $('#screen2').html(integerPart + ',');
            }
        }
    }

    function resetCalc() {
        /*
            This function resets the calculator, so we reinitialize the variables
        */

        result = 0;

        cur = 0;
        curIntegerDisplay = [];
        curFractionalDisplay = [];

        op = 0;

        startCalc = false;

        fractionalFlag = false;
        dec = 0.1;
    }

    function getDigit(d) {
        /*
            This function receives the current digit being pressed/clicked 
        */

        if(!fractionalFlag) {
            cur = cur * 10 + d;
            
            curIntegerDisplay.push(d);
        }
        else {
            cur = cur + dec * d;
            dec /= 10;

            curFractionalDisplay.push(d);
        }

        displayCurrentValue();
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

    // active the decimals flag
    function addDecimals() { 
        fractionalFlag = true; 
        displayCurrentValue();
    }

    function backSpace() {

    }

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

    // keypress events
    $('body').on("keydown", function(event) {
        if(event.which >= 96 && event.which <= 105) 
            getDigit(event.which - 96);

        if(event.which == 107) getOp(1);
        if(event.which == 106) getOp(2);
        if(event.which == 111) getOp(3);
        if(event.which == 109) getOp(4);

        if(event.which == 13) hitEnter();
        
        // comma press
        if(event.which == 110) addDecimals(); 0

        // backspace press
        if(event.which == 8) backSpace();
    });

    // correct buttons
    $('#AC').click(function() {
        resetCalc();
        displayCurrentValue();
    });

    $('#CE').click(function() {
        /*
            Reset the current value
        */
        
        cur = 0;
        curIntegerDisplay = [];
        curFractionalDisplay = [];
        fractionalFlag = false;
        dec = 0.1;

        displayCurrentValue();
    }); 
    // end correct buttons

    $('#sign').click(function() {
        cur = -cur;
        displayCurrentValue();
    });

    // click operation buttons
    $('#sum').click(function()            { getOp(1); } );
    $('#multiplication').click(function() { getOp(2); } );
    $('#division').click(function()       { getOp(3); } );
    $('#minus').click(function()          { getOp(4); } );
    $("#equals").click(function()         { applyOp() } );

});