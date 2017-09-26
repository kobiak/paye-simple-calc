// Calculating tax
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
