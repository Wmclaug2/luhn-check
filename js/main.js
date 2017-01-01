let cardType = '';

function clearElement (elementID) {
    document.getElementById(elementID).innerHTML = '';
}

function appendItem(elementID, item) {
    document.getElementById(elementID).insertAdjacentHTML('beforeend',item);
}

function createItem (elementID, elementType, item, id) {
    if (elementType === 'img') {
        var createdHTML = '<'+elementType+' src = "'+item+'" id = "'+id+'"></img>';
    } else { 
        var createdHTML = '<'+elementType+' id = '+id+'>'+item+'</'+elementType+'>';
    }
    appendItem(elementID, createdHTML);
}

function colorElement(element, colorToChange) {
    document.getElementById(element).style.color = colorToChange;
}

function applyCardType (img_src){
    createItem('result-container','img', img_src, 'logo');
}

function styleResult () {
    let result = document.getElementById('result-container');
    result.style.backgroundColor = '#dedede';
    result.style.width = '80%';
    result.style.borderRadius = '10px';
    result.style.padding = '30px';
    result.style.margin ='20px auto';
    result.style.fontSize = '2em';
}

function checkCardType(ccNum){
    const visaCheckArray = ['4'];
    const amexCheckArray = ['34','37'];
    const mastercardCheckArray = ['51','52','53','54','55'];
    const discoverCheckArray = ['6'];
    let length = ccNum.length;
    if (length < 13 || length > 16){
        return false;
    } else if (length === 15){
        if (amexCheckArray.indexOf(ccNum.substring(0,2) >= 0)){
            cardType = 'AMEX';
            return true;
        }
    } else if (length === 13 || length === 16 ){
        if (visaCheckArray.indexOf(ccNum.substring(0,1)) >= 0){
            cardType = 'VISA';
            return true;
        } else if (mastercardCheckArray.indexOf(ccNum.substring(0,2)) >= 0 ){
            cardType = 'MasterCard';
            return true;
        } else if (discoverCheckArray.indexOf(ccNum.substring(0,1) >= 0)) {
            cardType = 'Discover';
            return true;
        }
    } else {
        return false;
    }
}
 
function luhnsCheck(ccNum) {
    if (ccNum.length <= 0){
        createItem('result-container', 'p', 'There was no credit card number entered!','result');
        colorElement('result', 'red');
        return false;
    }
    let luhnCheck = ccNum.split('')
        .reduceRight(function(previousNumber, currentNumber, index){
        previousNumber = parseInt(previousNumber, 10);
        if ((index + 1) % 2 !== 0) {
            currentNumber = (currentNumber * 2).toString()
                .split('')
                .reduce( function(p, c) { return parseInt(p, 10) + parseInt(c, 10)});
        }
        return previousNumber + parseInt(currentNumber, 10);
    }) % 10 === 0;
    if (luhnCheck) {  
        if (checkCardType(ccNum)){
            let message = 'The card number ending in *'+ccNum.substring(ccNum.length - 4)+' is a valid '+cardType+' card number!';
            let cardUrl = 'img/'+cardType.toLowerCase()+'.png';
            applyCardType(cardUrl);
            createItem('result-container','p', message,'result');
            colorElement('result','green');
        }         
    } else {
        createItem('result-container', 'p', 'This card does not pass the requirements of a Luhn Check.','result');
        colorElement('result','red');
    }
    styleResult();
}

window.onload = function (){
    document.getElementById('about').style.width = '70%';
    document.getElementById('about').style.margin='0 auto';
    var submitButton = document.getElementById('submit');
    var clearButton = document.getElementById('clear');
    submitButton.addEventListener('click', function(){
        let ccInput = document.getElementById('credit-card-number-input').value;
        clearElement('result-container');
        luhnsCheck(ccInput);
    });
    clearButton.addEventListener('click', function(){
        clearElement('result-container');
        document.getElementById('result-container').removeAttribute('style');
        document.getElementById('credit-card-number-input').value = '';
    });   
}