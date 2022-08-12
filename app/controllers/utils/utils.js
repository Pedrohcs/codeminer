module.exports.validateCertification = function(certification) {
    let evenSum = 0
    let oddSum = 0
    let char

    for(let evenPosition = certification.length - 2; evenPosition >= 0; evenPosition = evenPosition - 2) {
        char = parseInt(certification.charAt(evenPosition) + "")
        evenSum = evenSum + sum(char * 2)
    }

    for(let oddPosition = certification.length - 1; oddPosition >= 0; oddPosition = oddPosition - 2) {
        char = parseInt(certification.charAt(oddPosition) + "")
        oddSum = oddSum + char
    }

    return (evenSum + oddSum) % 10 === 0
}

function sum(number) {
    if(number < 9)
        return number
    else
        return number % 10 + 1
}
module.exports.sum = sum