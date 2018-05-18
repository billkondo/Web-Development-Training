$(document).ready(function() {
    let result = 0;                 // result of all calculations so far

    let cur = 0;                    // current value being digited    
    let curIntegerDisplay = [];     // integer part of current value
    let curFractionalDisplay = [];  // fractional part of current value

    let fractionalFlag = false;     // flag to know if we are waiting for fractional digits
    let dec = 0.1;                  // a helper variable to indicate which postion the next fractional digit will go

    let chain = [];                 // a list with all operations so far  
    let chainDisplay = [];          // a list with all operations so far in the correct format

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

    var Numbers = {
        0: "zero",
        1: "one",
        2: "two", 
        3: "three", 
        4: "four",
        5: "five",
        6: "six", 
        7: "seven", 
        8: "eight", 
        9: "nine"
    }

    const maxDigits = 12;

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

    function displayInteger(l) {
        /*
            This function recieves a list with digits of the integer part of a number and return a string with the representation of this number.
            Dots(.) are placed to separate 3-digits group.
        */

        ret = []; // return value
        let cnt = 0;

        for(let i = l.length - 1; i >= 0; i -= 1) {
            cnt = cnt + 1;
            ret.push(l[i]);
            
            if(cnt == 3 && i > 0) {
                ret.push('.');
                cnt = 0;
            }
        }

        ret.reverse();
        return ret.join("");
    }

    function getDisplayCur() {
        /*
            This function return the string of the current value in the screen.
        */

        if(!curFractionalDisplay.length) 
            return displayInteger(curIntegerDisplay);
        else
            if(!curIntegerDisplay.length)
                return "0";
            else
                return displayInteger(curIntegerDisplay) + ',' + curFractionalDisplay.join("");
    }

    function getDisplayResult(x) {
        /*
            This function recieves a number x and return a string with the representation of this number.
            If it has decimals digits, the function will substitute the default '.' by a ','.
        */

        let number = Number(x);
        number = +number.toFixed(maxDigits);

        integerPart = Math.floor(number).toString();
        fractionalPart = (number + "").split(".")[1];

        if(fractionalPart)
            return displayInteger(integerPart.split("")) + ',' + fractionalPart;
        
        return displayInteger(integerPart.split(""));
    }

    function applyOp() {  
        let len = chain.length;
        result = 0;
        
        if(!len) return;
        
        result = chain[0];
        for(let i = 2; i < len; i += 2) {
            let op = operations[chain[i - 1]];
            let x = parseFloat(chain[i]);

            switch(op) {
                case 1:
                    result = parseFloat(parseFloat(result + x).toFixed(maxDigits));
                    break;
                case 2:
                    result = parseFloat(parseFloat(result * x).toFixed(maxDigits))
                    break;
                case 3:
                    if(!x) {
                        $('#screen1').html('&nbsp;');
                        $('#screen2').html('Division by Zero ?');
                        resetCalc();
                        return false;
                    }
                    else
                        result = parseFloat(parseFloat(result / x).toFixed(maxDigits));
                    break;
                case 4:
                    result = parseFloat(parseFloat(result - x).toFixed(maxDigits));
                    break;
            }
        } 

        return true;
    }

    function displayOperations() {
        if(chainDisplay.length) {
            $('#screen1').html(chainDisplay.join(" "));
        }
        else {
            $('#screen1').html('&nbsp;');
        }
    }

    function displayResult(x) { $('#screen2').html(getDisplayResult(result)); }

    function displayCurrentValue() {
        integerPart = displayInteger(curIntegerDisplay);
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
        chainDisplay = [];
    }

    function getDigit(d) {
        /*
            This function receives the current digit being pressed/clicked 
        */

        let len = chain.length;

        if(len > 0 && isOP(chain[len - 1])) 
            resetCur();
        else
            if(len > 0) {
                chain.pop();
                chainDisplay.pop();
            }

        if(!fractionalFlag) {
            cur = parseFloat(parseFloat(cur * 10 + d).toFixed(maxDigits));

            curIntegerDisplay.push(d);
        }
        else {
            cur = parseFloat((parseFloat(cur + dec * d)).toFixed(maxDigits));
            dec = parseFloat((dec / 10).toFixed(maxDigits));

            curFractionalDisplay.push(d);
        }

        chain.push(cur);
        chainDisplay.push(getDisplayCur());
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
            chainDisplay.push(getDisplayResult(result));
            chainDisplay.push(mapOP[x]);
            displayOperations();
           
            if(applyOp()) {
                displayResult(result);
            }
       }
       else
            if(isOP(chain[len - 1])) {
                chain.pop();
                chain.push(mapOP[x]);
                chainDisplay.pop();
                chainDisplay.push(mapOP[x]);
                displayOperations();
                displayResult(result);
            }
            else {
                chainDisplay.push(mapOP[x]);
                chain.push(mapOP[x]);
                if(applyOp()) {
                    displayOperations();
                    displayResult(result);
                    resetCur();
                }
            }
    }

    function hitEnter() {
        if(applyOp()) {
            displayResult(result);
            chain = [];
            chainDisplay = [];
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
        if(!chain.length)
            return;

        if(curFractionalDisplay.length > 0) {
            let d = curFractionalDisplay.pop();
            
            dec = parseFloat(parseFloat(dec * 10).toFixed(maxDigits));
            cur = parseFloat(parseFloat(cur - dec * d).toFixed(maxDigits));
            chain.pop();
            chain.push(cur);
            chainDisplay.pop();
            chainDisplay.push(getDisplayCur());
        }
        else
            if(fractionalFlag) 
                fractionalFlag = false;
            else
                if(curIntegerDisplay.length > 0) {
                    let d = curIntegerDisplay.pop();
                    cur = parseFloat(Math.floor(parseFloat(cur / 10)).toFixed(maxDigits));
                    chain.pop();
                    chain.push(cur);
                    chainDisplay.pop();
                    chainDisplay.push(getDisplayCur());
                }

        displayCurrentValue();
    }

    function changeSignal() {
        let len = chain.length;
        
        if(!len) {
            result = -result;
            cur = result;

            let number = cur;
            number = +number.toFixed(maxDigits);

            integerPart = Math.floor(Math.abs(number));
            fractionalPart = (number + "").split(".")[1];

            if(integerPart) 
                curIntegerDisplay = integerPart.toString().split("");
            else
                curIntegerDisplay.push(0);

            if(fractionalPart) curFractionalDisplay = fractionalPart.toString().split("");

            chain.push(result);
            chainDisplay.push(getDisplayCur());
        }
        else {
            if(isOP(chain[len - 1])) {
                cur = -result;
                chain.push(cur);
                chainDisplay.push(getDisplayResult());
            }
            else {
                cur = -cur;
                chain.pop();
                chain.push(cur);
                chainDisplay.pop();
                chainDisplay.push(getDisplayCur());
            }
        }

        displayCurrentValue();
    }

    function animationPress(s) {
        var animationClick = $(s).toggleClass('buttonActive');
        setTimeout(function() {
            $(s).toggleClass('buttonActive');;
        }, 50);
    }

    // digits buttons 
    $('#zeroButton').click(function()  { getDigit(0); } );
    $('#oneButton').click(function()   { getDigit(1); } );
    $('#twoButton').click(function()   { getDigit(2); } );
    $('#threeButton').click(function() { getDigit(3); } );
    $('#fourButton').click(function()  { getDigit(4); } );
    $('#fiveButton').click(function()  { getDigit(5); } );
    $('#sixButton').click(function()   { getDigit(6); } );
    $('#sevenButton').click(function() { getDigit(7); } );
    $('#eightButton').click(function() { getDigit(8); } );
    $('#nineButton').click(function()  { getDigit(9); } );

    // keypress events
    $('body').keydown(function(event) {
        event.preventDefault();

        if(event.which >= 96 && event.which <= 105) {
            let btn = '#' + Numbers[event.which - 96] + 'Button';
            animationPress(btn); 
            getDigit(event.which - 96);
        }

        if(event.which == 107) { animationPress('#sum'); getOp(1); }
        if(event.which == 106) { animationPress('#multiplication'); getOp(2); }
        if(event.which == 111) { animationPress('#division'); getOp(3); }
        if(event.which == 109) { animationPress('#minus'); getOp(4); }

        if(event.which == 13) { animationPress('#equals'); hitEnter(); }

        if(event.which == 110) { animationPress('#comma'); addDecimals(); }

        if(event.which == 8) { animationPress('#eraserButton'); backSpace(); }
    });

    $('#AC').click(function() {
        resetCalc();
        displayOperations();
        displayCurrentValue();
    });

    $('#CE').click(function() {
        /*
            Reset the current value
        */
        
        resetCur();
        displayCurrentValue();
    }); 

    $('#eraserButton').click(function() { backSpace(); } );
    
    $('#sign').click(function() {
        changeSignal();
        displayCurrentValue();
    });

    $('#comma').click(function() { addDecimals(); });

    // click operation buttons
    $('#sum').click(function()            { getOp(1); } );
    $('#multiplication').click(function() { getOp(2); } );
    $('#division').click(function()       { getOp(3); } );
    $('#minus').click(function()          { getOp(4); } );
    $("#equals").click(function()         { hitEnter(); } );
});