$(document).ready(function () {
    /*
        Global Variables

        - result: result of all operations applied 
        - cur: current input value
        - curIntegerDisplay: integer digits list of the current input value (includes the - sign if the input value is negative)
        - curFractionalDisplay: decimal digits list of the current input value
        - fractionalFlag: flag to indicate if the user is writing integer or decimal digits
        - dec: indicates the position of the current fractional digit
        - chain: list of numbers and operations
        - chainDisplay: list of strings
    */

    let result = 0;

    let cur = 0;
    let curIntegerDisplay = [];
    let curFractionalDisplay = [];

    let fractionalFlag = false;
    let dec = 0.1;

    let chain = [];
    let chainDisplay = [];

    let operations = {};
    operations['+'] = 1;
    operations['*'] = 2;
    operations['/'] = 3;
    operations['-'] = 4;

    let mapOP = {};
    mapOP[1] = '+';
    mapOP[2] = '*';
    mapOP[3] = '/';
    mapOP[4] = '-';

    let Numbers = {
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
    const maxDecimals = 6;

    /* 
        Calculator Logic 
    */

    function isOP(c) {
        /*
            Checks if character c is an operation
        */

        for (let key in operations)
            if (key === c)
                return true;

        return false;
    }

    function resetCur() {
        /*
            Reset the current input value.
        */

        cur = 0;
        curIntegerDisplay = [];
        curFractionalDisplay = [];

        fractionalFlag = false;
        dec = 0.1;
    }

    function resetCalc() {
        /*
            Resets the calculator, so we reinitialize the variables
        */

        result = 0;
        resetCur();
        chain = [];
        chainDisplay = [];
    }

    function getDisplayResult(x) {
        /*
            Recieves a number x and return a string with the representation of this number.
            If it has decimals digits, the function will substitute the default '.' by a ','.
        */

        let number = Number(x);
        number = +number.toFixed(maxDecimals);

        let integerPart = Math.trunc(number).toString();
        let fractionalPart = (number + "").split(".")[1];

        if (fractionalPart) {
            if (!Math.trunc(number) && x < 0) return '-' + displayInteger(integerPart.split("")) + ',' + fractionalPart;
            return displayInteger(integerPart.split("")) + ',' + fractionalPart;
        }

        return displayInteger(integerPart.split(""));
    }

    function getDisplayCur() {
        /*
            Returns the string of the current value in the screen.
            Use the curFractionalDisplay and curIntegerDisplay lists to build the string.
        */

        let curDisplay = displayInteger(curIntegerDisplay);
        if (fractionalFlag) curDisplay = curDisplay + ',';
        if (curFractionalDisplay.length) curDisplay = curDisplay + curFractionalDisplay.join("");

        return curDisplay;
    }

    function correctDisplay() {
        /*
            Correct the format of the numbers:
            - Add parenthesis when the number is negative
            - Remove ',' when there are no fractional part
        */

        for(let i = 0; i < chainDisplay.length; i += 2) {
            let len = chainDisplay[i].length;

            if(chainDisplay[i][len - 1] === ',')
                chainDisplay[i] = chainDisplay[i].slice(0, len - 1);

            if(chainDisplay[i][0] === '-') 
                chainDisplay[i] = '(' + chainDisplay[i] + ')';
        }
    }

    function displayOperations() {
        /*
            Print in the upper screen the chain of operations
            If there are no operations, print empty string
        */

        correctDisplay();

        if (chainDisplay.length)
            $('#screen1').html(chainDisplay.join(" "));
        else
            $('#screen1').html('&nbsp;');
    }

    function displayInteger(l) {
        /*
            Recieves a list with digits of the integer part of a number and return a string with the representation of this number.
            Dots(.) are placed to separate 3-digits group.
        */

        if (!l.length) return "0";

        ret = []; // return value

        let cnt = 0;
        let flag = false;

        if (l.length && l[0] === '-') {
            l.shift();
            flag = true;
        }

        for (let i = l.length - 1; i >= 0; i -= 1) {
            cnt = cnt + 1;
            ret.push(l[i]);

            if (cnt == 3 && i > 0) {
                ret.push('.');
                cnt = 0;
            }
        }

        if (flag) {
            ret.push('-');
            l.unshift('-');
        }

        ret.reverse();

        return ret.join("");
    }

    function displayResult(x) {
        /*
            Print the result variable in the lower screen 
        */

        $('#screen2').html(getDisplayResult(x));
    }

    function displayCurrentValue() {
        /*
            Print in the lower screen the current input value
        */

        $('#screen2').html(getDisplayCur());
    }

    function applyOp() {
        /*
            Apply the chained operations
            The chain list will be used to find the result
        */

        let len = chain.length;
        result = 0;

        if (!len) return;

        result = chain[0];
        for (let i = 2; i < len; i += 2) {
            let op = operations[chain[i - 1]];
            let x = parseFloat(chain[i]);

            switch (op) {
                case 1:
                    result = parseFloat(parseFloat(result + x).toFixed(maxDigits));
                    break;
                case 2:
                    result = parseFloat(parseFloat(result * x).toFixed(maxDigits))
                    break;
                case 3:
                    if (!x) {
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

    function getDigit(d) {
        /*
            Receives the current digit being pressed/clicked 
        */

        let len = chain.length;

        if (curIntegerDisplay.length + curFractionalDisplay.length > maxDigits) return;

        if (!curIntegerDisplay.length && !d) {
            displayCurrentValue();
            curIntegerDisplay.push(0);
            chain.push(0);
            chainDisplay.push("0");
            return;
        }

        if (len > 0 && isOP(chain[len - 1]))
            resetCur();
        else
            if (len > 0) {
                chain.pop();
                chainDisplay.pop();
            }

        if (!fractionalFlag) {
            cur = parseFloat(parseFloat(cur * 10 + d).toFixed(maxDigits));

            if (curIntegerDisplay.length === 1 && !curIntegerDisplay[0])
                curIntegerDisplay.pop();

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

        if (!len) {
            chain.push(result);
            chain.push(mapOP[x]);
            chainDisplay.push(getDisplayResult(result));
            chainDisplay.push(mapOP[x]);

            displayOperations();

            if (applyOp()) {
                displayResult(result);
            }
        }
        else
            if (isOP(chain[len - 1])) {
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
                if (applyOp()) {
                    displayOperations();
                    displayResult(result);
                    resetCur();
                }
            }
    }

    function hitEnter() {
        /*
            Apply all chained operations and resets the calculator
        */

        if (applyOp()) {
            displayResult(result);
            chain = [];
            chainDisplay = [];
            resetCur();
            displayOperations();
        }
    }

    function addDecimals() {
        /*
            Active the decimals flag 
        */

        if (fractionalFlag) return;

        if (!curIntegerDisplay.length) {
            curIntegerDisplay.push(0);
            chain.push(0);
            chainDisplay.push("0");
        }
        fractionalFlag = true;
        displayCurrentValue();
    }

    function backSpace() {
        /*
            Remove the last digit of the current input value
        */

        if (!chain.length)
            return;

        if (!curIntegerDisplay.length && !fractionalFlag)
            return;

        if (curFractionalDisplay.length > 0) {
            let d = curFractionalDisplay.pop();

            dec = parseFloat(parseFloat(dec * 10).toFixed(maxDigits));
            cur = parseFloat(parseFloat(cur - dec * d).toFixed(maxDigits));

            chain.pop();
            chain.push(cur);
            chainDisplay.pop();
            chainDisplay.push(getDisplayCur());
        }
        else
            if (fractionalFlag) {
                fractionalFlag = false;

                if (curIntegerDisplay.length === 1 && !chain[chain.length - 1]) {
                    chain.pop();
                    curIntegerDisplay.pop();
                    chainDisplay.pop();
                }
            }
            else
                if (curIntegerDisplay.length > 0) {
                    let d = curIntegerDisplay.pop();
                    cur = ~~(cur / 10).toFixed(maxDigits);

                    chain.pop();
                    chainDisplay.pop();

                    if (cur) {
                        chain.push(cur);
                        chainDisplay.push(getDisplayCur());
                    }
                    
                    if(curIntegerDisplay.length === 1 && curIntegerDisplay[0] === '-')
                        curIntegerDisplay = [];
                }

        displayCurrentValue();
    }

    function changeSignal() {
        /*
            Changes the signal of the current input value
            Modifies the display of the current input value
        */

        let len = chain.length;

        if (!len || isOP(chain[len - 1])) {
            /*
                Input value is empty
            */

            return;
        }
        else {
            if (cur < 0) curIntegerDisplay.shift();
            else if (cur > 0) curIntegerDisplay.unshift('-');
            else {
                if(curIntegerDisplay[0] === '-') curIntegerDisplay.shift();
                else curIntegerDisplay.unshift('-');
            }

            cur = -cur;
            chain.pop();
            chain.push(cur);
            chainDisplay.pop();
            chainDisplay.push(getDisplayCur());
        }

        displayCurrentValue();
    }

    /* 
        Keypresses Events
    */

    function animationPress(s) {
        /*
            Apply hover "animation" on keypress events
        */

        let animationClick = $(s).toggleClass('buttonActive');
        setTimeout(function () {
            $(s).toggleClass('buttonActive');;
        }, 50);
    }

    $('body').keydown(function (event) {
        event.preventDefault();

        if (event.which >= 96 && event.which <= 105) {
            let btn = '#' + Numbers[event.which - 96] + 'Button';
            animationPress(btn);
            getDigit(event.which - 96);
        }

        if (event.which == 107) { animationPress('#sum'); getOp(1); }
        if (event.which == 106) { animationPress('#multiplication'); getOp(2); }
        if (event.which == 111) { animationPress('#division'); getOp(3); }
        if (event.which == 109) { animationPress('#minus'); getOp(4); }

        if (event.which == 13) { animationPress('#equals'); hitEnter(); }

        if (event.which == 110) { animationPress('#comma'); addDecimals(); }

        if (event.which == 8) { animationPress('#eraserButton'); backSpace(); }
    });

    /* 
        Click Events 
    */

    $('#zeroButton').click(function () { getDigit(0); });
    $('#oneButton').click(function () { getDigit(1); });
    $('#twoButton').click(function () { getDigit(2); });
    $('#threeButton').click(function () { getDigit(3); });
    $('#fourButton').click(function () { getDigit(4); });
    $('#fiveButton').click(function () { getDigit(5); });
    $('#sixButton').click(function () { getDigit(6); });
    $('#sevenButton').click(function () { getDigit(7); });
    $('#eightButton').click(function () { getDigit(8); });
    $('#nineButton').click(function () { getDigit(9); });

    $('#AC').click(function () {
        /*
            Reset the calculator
        */

        resetCalc();
        displayOperations();
        displayCurrentValue();
    });

    $('#CE').click(function () {
        /*
            Reset the input value
        */

        resetCur();
        displayCurrentValue();
    });

    $('#eraserButton').click(function () { backSpace(); });

    $('#sign').click(function () {
        changeSignal();
        displayCurrentValue();
    });

    $('#comma').click(function () { addDecimals(); });

    // Click operation buttons
    $('#sum').click(function () { getOp(1); });
    $('#multiplication').click(function () { getOp(2); });
    $('#division').click(function () { getOp(3); });
    $('#minus').click(function () { getOp(4); });
    $("#equals").click(function () { hitEnter(); });
});