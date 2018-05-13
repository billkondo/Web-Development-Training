$(document).ready(function() {
    
    let result = 0;                 // result of all calculations so far

    let cur = 0;                    // current value being digited    
    let curIntegerDisplay = [];     // integer part of current value
    let curFractionalDisplay = [];  // fractional part of current value

    let fractionalFlag = false;     // flag to know if we are waiting for fractional digits
    let dec = 0.1;                  // a helper variable to indicate which postion the next fractional digit will go

    let chain = [];                 //a list with all operations so far  

    var operations = {};
    operations['+'] = 1;
    operations['*'] = 2;
    operations['/'] = 3;
    operations['-'] = 4;

    var mapOP = {};
    mapOP[1] = '+';
    mapOP[2] = '*';
    mapOP[3] = '/';
    mapOP[4] = '-';

    function isOP(c) {
        for(let key in operations)
            if(key === c)
                return true;

        return false;
    }

    function resetCur() {
        cur = 0;
        curIntegerDisplay = [];
        curFractionalDisplay = [];

        fractionalFlag = false;
        dec = 0.1;
    }

    function applyOp() {  
        let len = chain.length;
        result = 0;
        
        if(!len) return;
        
        result = chain[0];
        for(let i = 2; i < len; i += 2) {
            let op = operations[chain[i - 1]];
            let x = Number(chain[i]);

            switch(op) {
                case 1:
                    result += x;
                    break;
                case 2:
                    result *= x;
                    break;
                case 3:
                    if(!x) {
                        $('#screen1').html('&nbsp;');
                        $('#screen2').html('Division by Zero ?');
                        resetCalc();
                        return false;
                    }
                    else
                        result /= x;
                    break;
                case 4:
                    result -= x;
                    break;
            }
        } 

        return true;
    }

    function displayOperations() {
        if(chain.length) {
            $('#screen1').html(chain.join(" "));
        }
        else {
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

        if(!cur) {
            $('#screen2').html(0);
            return;
        }

        if(cur < 0) integerPart = '-' + integerPart;

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
        resetCur();
        chain = [];
    }

    function getDigit(d) {
        /*
            This function receives the current digit being pressed/clicked 
        */

        let len = chain.length;

        if(len > 0 && isOP(chain[len - 1])) 
            resetCur();
        else
            if(len > 0) 
                chain.pop();

        if(!fractionalFlag) {
            cur = cur * 10 + d;

            curIntegerDisplay.push(d);
        }
        else {
            cur = cur + dec * d;
            dec /= 10;

            curFractionalDisplay.push(d);
        }

        chain.push(cur);
        displayCurrentValue();
    }

    function getOp(x) {
        /*
            This function receives a operator 
        */
       
       let len = chain.length;

       if(!len) {
            chain.push(result);
            chain.push(mapOP[x]);
            displayOperations();
           
            if(applyOp()) {
                displayResult(result);
            }
       }
       else
            if(isOP(chain[len - 1])) {
                chain.pop();
                chain.push(mapOP[x]);
                displayOperations();
                displayResult(result);
            }
            else {
                chain.push(mapOP[x]);
                if(applyOp()) {
                    displayOperations();
                    displayResult(result);
                }
            }
    }

    function hitEnter() {
        $('.btn').unbind('click');

        if(applyOp()) {
            displayResult(result);
            chain = [];
            resetCur();
            displayOperations();
        }
    }

    // active the decimals flag
    function addDecimals() { 
        if(!curIntegerDisplay.length) {
            curIntegerDisplay.push(0);
        }
        fractionalFlag = true; 
        displayCurrentValue();
    }

    function backSpace() {

    }

    function changeSignal() {
        if(!chain.length) result = -result;
        else {
            cur = -cur;
            chain.pop();
            chain.push(cur);
        }
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
    $('body').keydown(function(event) {
        if(event.which >= 96 && event.which <= 105) {
            getDigit(event.which - 96);

        }
        if(event.which == 107) getOp(1);
        if(event.which == 106) getOp(2);
        if(event.which == 111) getOp(3);
        if(event.which == 109) getOp(4);

        if(event.which == 13) hitEnter();
        
        // comma press
        if(event.which == 110) addDecimals(); 

        // backspace press
        if(event.which == 8) backSpace();
    });

    // correct buttons
    $('#AC').click(function() {
        resetCalc();
        cur = 0;
        displayOperations();
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
        changeSignal();
        displayCurrentValue();
    });

    // click operation buttons
    $('#sum').click(function()            { getOp(1); } );
    $('#multiplication').click(function() { getOp(2); } );
    $('#division').click(function()       { getOp(3); } );
    $('#minus').click(function()          { getOp(4); } );
    $("#equals").click(function()         { hitEnter(); } );

});