// Calculating tax
(function ($) {

    var myCalc = function () {

        $('#yourIncome').remove();

        var incomeBeforeTax = $('#income').val();
        var kiwiSaverRate = $('input:radio[class=kiwiSaver]:checked').val();
        var studentLoanRate = $('input:radio[class=studentLoan]:checked').val();
        var studentLoanMinIncome = 19084;
        var incomeAfterTax = 0;

        if (incomeBeforeTax == '') {

            $('.error-message').show().addClass('alert bg-danger text-center col-md-6 col-md-offset-3').html('please specify your income');
            return;

        } else if (isNaN(incomeBeforeTax)) {

            $('.error-message').show().addClass('alert bg-danger text-center col-md-6 col-md-offset-3').html('your income should be a number');
            return;

        } else if (!isNaN(incomeBeforeTax)) {

            $('.error-message').hide();

        }

        var accLevy = (incomeBeforeTax * 0.0139).toFixed(2);

        var kiwiSaver = incomeBeforeTax * kiwiSaverRate;

        var studentLoan = 0;

        if (incomeBeforeTax > studentLoanMinIncome) {
            studentLoan = (incomeBeforeTax - studentLoanMinIncome) * studentLoanRate;
        }

        if (incomeBeforeTax > 70001) {

            incomeAfterTax = (incomeBeforeTax - ((incomeBeforeTax - 70000) * 0.33 + 22000 * 0.30 + 34000 * 0.175 + 14000 * 0.105)) - accLevy - kiwiSaver - studentLoan;

        } else if (incomeBeforeTax > 48001) {

            incomeAfterTax = (incomeBeforeTax - ((incomeBeforeTax - 48000) * 0.3 + 34000 * 0.175 + 14000 * 0.105)) - accLevy - kiwiSaver - studentLoan;

        } else if (incomeBeforeTax >= 14001) {

            incomeAfterTax = incomeBeforeTax - (incomeBeforeTax - 14000) * 0.175 - (14000 * 0.105) - accLevy - kiwiSaver - studentLoan;

        } else if (incomeBeforeTax < 14001) {

            incomeAfterTax = (incomeBeforeTax - (incomeBeforeTax * 0.105)) - accLevy - kiwiSaver - studentLoan;

        }


        incomeAfterTax = incomeAfterTax.toFixed(2);
        var yourTax = (incomeBeforeTax - incomeAfterTax - accLevy - kiwiSaver).toFixed(2);
        var yourACC = accLevy;

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
        var data = {
            datasets: [{
                data: [incomeAfterTax, yourTax, yourACC, kiwiSaver, studentLoan],
                backgroundColor: [
                    '#5BBD84',
                    '#F7C474',
                    '#FCA268',
                    '#c0392b',
                    '#8e44ad'
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'You take home',
                'Tax you pay',
                'ACC you pay',
                'KiwiSaver',
                'Student Loan'
            ]

        };

        $('.chartBox').append('<canvas id="yourIncome" width="300" height="300">&nbsp;</canvas><div id="chartSum" class="currency big-number-gross"></div>');
        $('#chartSum').html(incomeBeforeTax);

        // get pie chart canvas
        var ctx = $('#yourIncome');
        // draw pie chart
        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                legend: {
                    display: false
                }
            }

        });

        // additional contribution

        $('.kiwiSaverResults').html(kiwiSaver.toFixed(2));
        $('.studentLoanResults').html(studentLoan.toFixed(2));

        $('.currency').formatCurrency();


    };

    $('body').on('click touch', '.js-btn-calc', function () {
        myCalc();
    });

    $('body').on('submit', '#income-form', function (e) {
        e.preventDefault();
        myCalc();
    });
})(jQuery);
