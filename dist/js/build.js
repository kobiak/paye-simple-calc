(function($){$.formatCurrency={};$.formatCurrency.regions=[];$.formatCurrency.regions[""]={symbol:"$",positiveFormat:"%s%n",negativeFormat:"(%s%n)",decimalSymbol:".",digitGroupSymbol:",",groupDigits:true};
$.fn.formatCurrency=function(destination,settings){if(arguments.length==1&&typeof destination!=="string"){settings=destination;destination=false
}var defaults={name:"formatCurrency",colorize:false,region:"",global:true,roundToDecimalPlace:2,eventOnDecimalsEntered:false};defaults=$.extend(defaults,$.formatCurrency.regions[""]);
settings=$.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){$this=$(this);var num="0";num=$this[$this.is("input, select, textarea")?"val":"html"]();if(num.search("\\(")>=0){num="-"+num
}if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return}if(isNaN(num)){num=num.replace(settings.regex,"");if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return
}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")}if(isNaN(num)){num="0"}}var numParts=String(num).split(".");var isPositive=(num==Math.abs(num));
var hasDecimals=(numParts.length>1);var decimals=(hasDecimals?numParts[1].toString():"0");var originalDecimals=decimals;num=Math.abs(numParts[0]);
num=isNaN(num)?0:num;if(settings.roundToDecimalPlace>=0){decimals=parseFloat("1."+decimals);decimals=decimals.toFixed(settings.roundToDecimalPlace);
if(decimals.substring(0,1)=="2"){num=Number(num)+1}decimals=decimals.substring(2)}num=String(num);if(settings.groupDigits){for(var i=0;i<Math.floor((num.length-(1+i))/3);
i++){num=num.substring(0,num.length-(4*i+3))+settings.digitGroupSymbol+num.substring(num.length-(4*i+3))}}if((hasDecimals&&settings.roundToDecimalPlace==-1)||settings.roundToDecimalPlace>0){num+=settings.decimalSymbol+decimals
}var format=isPositive?settings.positiveFormat:settings.negativeFormat;var money=format.replace(/%s/g,settings.symbol);money=money.replace(/%n/g,num);
var $destination=$([]);if(!destination){$destination=$this}else{$destination=$(destination)}$destination[$destination.is("input, select, textarea")?"val":"html"](money);
if(hasDecimals&&settings.eventOnDecimalsEntered&&originalDecimals.length>settings.roundToDecimalPlace){$destination.trigger("decimalsEntered",originalDecimals)
}if(settings.colorize){$destination.css("color",isPositive?"black":"red")}})};$.fn.toNumber=function(settings){var defaults=$.extend({name:"toNumber",region:"",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){var method=$(this).is("input, select, textarea")?"val":"html";$(this)[method]($(this)[method]().replace("(","(-").replace(settings.regex,""))
})};$.fn.asNumber=function(settings){var defaults=$.extend({name:"asNumber",region:"",parse:true,parseType:"Float",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
settings.parseType=validateParseType(settings.parseType);var method=$(this).is("input, select, textarea")?"val":"html";var num=$(this)[method]();
num=num?num:"";num=num.replace("(","(-");num=num.replace(settings.regex,"");if(!settings.parse){return num}if(num.length==0){num="0"}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")
}return window["parse"+settings.parseType](num)};function getRegionOrCulture(region){var regionInfo=$.formatCurrency.regions[region];if(regionInfo){return regionInfo
}else{if(/(\w+)-(\w+)/g.test(region)){var culture=region.replace(/(\w+)-(\w+)/g,"$1");return $.formatCurrency.regions[culture]}}return null}function validateParseType(parseType){switch(parseType.toLowerCase()){case"int":return"Int";
case"float":return"Float";default:throw"invalid parseType"}}function generateRegex(settings){if(settings.symbol===""){return new RegExp("[^\\d"+settings.decimalSymbol+"-]","g")
}else{var symbol=settings.symbol.replace("$","\\$").replace(".","\\.");return new RegExp(symbol+"|[^\\d"+settings.decimalSymbol+"-]","g")}}})(jQuery);;// Calculating tax
function myCalc() {

    $("#yourIncome").remove();

    var incomeBeforeTax = $("#income").val();
    var kiwiSaverRate = $('input:radio[class=kiwiSaver]:checked').val();
    var studentLoanRate = $('input:radio[class=studentLoan]:checked').val();
    var studentLoanMinIncome = 19084;
    var incomeAfterTax = 0;


    if (incomeBeforeTax == "") {

        $('.error-message').show().addClass('alert bg-danger text-center col-md-6 col-md-offset-3').html('please specify your income');
        return;

    } else if (isNaN(incomeBeforeTax)) {

        $('.error-message').show().addClass('alert bg-danger text-center col-md-6 col-md-offset-3').html('your income should be a number');
        return;

    } else if (!isNaN(incomeBeforeTax)) {

        $('.error-message').hide();

    };    

    var kiwiSaver = incomeBeforeTax * kiwiSaverRate;

    var studentLoan = 0;

    if (incomeBeforeTax > studentLoanMinIncome) {
        studentLoan = (incomeBeforeTax - studentLoanMinIncome) * studentLoanRate;
    };

    if (incomeBeforeTax > 70001) {
        incomeAfterTax = (incomeBeforeTax - ((incomeBeforeTax - 70000) * 0.33 + 22000 * 0.30 + 34000 * 0.175 + 14000 * 0.105)) - incomeBeforeTax * 0.0145 - kiwiSaver - studentLoan;
    } else if (incomeBeforeTax > 48001) {

        incomeAfterTax = (incomeBeforeTax - ((incomeBeforeTax - 48000) * 0.3 + 34000 * 0.175 + 14000 * 0.105)) - incomeBeforeTax * 0.0145 - kiwiSaver - studentLoan;

    } else if (incomeBeforeTax >= 14001) {

        incomeAfterTax = incomeBeforeTax - (incomeBeforeTax - 14000) * 0.175 - (14000 * 0.105) - incomeBeforeTax * 0.0145 - kiwiSaver - studentLoan;


    } else if (incomeBeforeTax < 14001) {

        incomeAfterTax = (incomeBeforeTax - (incomeBeforeTax * 0.105)) - incomeBeforeTax * 0.0145 - kiwiSaver - studentLoan;

    };


    incomeAfterTax = incomeAfterTax.toFixed(2);
    var yourTax = (incomeBeforeTax - incomeAfterTax - incomeBeforeTax * 0.0145 - kiwiSaver).toFixed(2);
    var yourACC = (incomeBeforeTax * 0.0145).toFixed(2);

    $('#grossIncome').html(incomeBeforeTax);
    $('#taxAmount').html(yourTax);
    $('#accAmount').html(yourACC);
    $('.netIncome').html(incomeAfterTax);
    $('.perMonth').html(incomeAfterTax / 12);
    $('.perWeek').html(incomeAfterTax / 52);

    var minIncome = 29640;
    var avgIncome = 51532;
    var mdnIncome = 44876;

    var minIncomeAfterTax = minIncome - 4207 - 29.78;
    var avgIncomeAfterTax = avgIncome - 8479.60 - 747.21;
    var mdnIncomeAfterTax = mdnIncome - 6873.30 - 650.70;

    // minimum wage
    $('#grossIncomeMin').html(minIncome);
    $('#taxAmountMin').html(4207);
    $('#accAmountMin').html(429.78);
    $('#resultMin').html(minIncomeAfterTax);

    // average wage
    $('#grossIncomeAvr').html(avgIncome);
    $('#taxAmountAvr').html(8479.60);
    $('#accAmountAvr').html(747.21);
    $('#resultAvr').html(avgIncomeAfterTax);

    // median wage
    $('#grossIncomeMed').html(mdnIncome);
    $('#taxAmountMed').html(6873.30);
    $('#accAmountMed').html(650.70);
    $('#resultMed').html(mdnIncomeAfterTax);



    $('.hide').removeClass('hide');


    // pie chart data
    var pieData = [{
        value: incomeAfterTax,
        color: "#5BBD84",
        label: "You take home"
    }, {
        value: yourTax,
        color: "#F7C474",
        label: "Tax you pay"
    }, {
        value: yourACC,
        color: "#FCA268",
        label: "ACC you pay"
    }, {
        value: kiwiSaver,
        color: "#c0392b",
        label: "KiwiSaver"
    }, {
        value: studentLoan,
        color: "#8e44ad",
        label: "Student Loan"
    }];
    // pie chart options
    var pieOptions = {
        percentageInnerCutout: 70,
        animationEasing: "easeInOutQuart",
        tooltipFontSize: 18,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%>$<%= value %>",
    }
    $(".chartBox").append("<canvas id=\"yourIncome\" width=\"300\" height=\"300\">123</canvas><div id=\"chartSum\" class=\"currency big-number-gross\"></div>");
    $("#chartSum").html(incomeBeforeTax);
    // get pie chart canvas
    var yourIncome = document.getElementById("yourIncome").getContext("2d");
    // draw pie chart
    new Chart(yourIncome).Doughnut(pieData, pieOptions);

    /*
        if (incomeAfterTax > minIncomeAfterTax) {
            var diffMinIncome = (incomeAfterTax / minIncomeAfterTax) * 100;
            diffMinIncome = diffMinIncome.toFixed(2);
            $('.diff1').html("<span class='medium-number'>" + diffMinIncome + " % </span>");
            $('.diff1').append("<span>larger than minimum wage in New Zealand</span>");
            return;

        } else if (incomeAfterTax === minIncomeAfterTax) {
            $('.diff1').html("equals minimum wage in New Zealand");
            return;

        } else if (incomeAfterTax < minIncomeAfterTax) {
            var diffMinIncome = (minIncomeAfterTax / incomeAfterTax) * 100;
            diffMinIncome = diffMinIncome.toFixed(2);
            $('.diff1').html("<span class='medium-number'>" + diffMinIncome + " % </span>");
            $('.diff1').append("<span>less than minimum wage in New Zealand</span>");
            return;
        };*/

    // additional contribution

    $('.kiwiSaverResults').html(kiwiSaver.toFixed(2));
    $('.studentLoanResults').html(studentLoan.toFixed(2));

    $('.currency').formatCurrency();


}
