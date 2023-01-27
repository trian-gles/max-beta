inlets = 3
outlets = 1

var a = 1
var b = 1
var normalize = 1

function msg_float(v){
	if (inlet == 0){
		outlet(0, betaPDF(v, a, b) / normalize);
	}
	else if (inlet == 1){
		a = Math.max(v, 1.0001)
		normalize = betaMaximum(a, b)
	}
	else {
		b = Math.max(v, 1.0001)
		normalize = betaMaximum(a, b)
	}
	
}


function betaPDF(x, a, b) {
    return Math.exp(lnBetaPDF(x, a, b))
}

function lnBetaPDF(x, a, b) {
        // Log of the Beta Probability Density Function
    return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - lnBetaFunc(a,b)
}

function lnBetaFunc(a, b) {
	// Log Beta Function
	// ln(Beta(x,y))
    foo = 0.0;

    for (i=0; i<a-2; i++) {
        foo += Math.log(a-1-i);
    }
    for (i=0; i<b-2; i++) {
        foo += Math.log(b-1-i);
    }
    for (i=0; i<a+b-2; i++) {
        foo -= Math.log(a+b-1-i);
    }
    return foo
}

function betaMaximum(a, b){
	return betaPDF(betaMode(a, b), a, b)
}

function betaMode(a, b){
	return (a - 1) / (a + b - 2)
}