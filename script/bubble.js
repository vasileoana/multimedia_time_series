$(function() {

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext("2d");
    var W = canvas.width;
    var H = canvas.height;
    var interval;
    var miscare = true;
    values = {};
    var year = $('year').val();

    readJson("data.json");

    $('#anim').click(function() {
        if (miscare) {
            interval = setInterval(apelare, 200);
        }
        else {
            clearInterval(interval);
        }
        miscare = !miscare;
    })


    $('#btnBubbleChart').click(function() {


        ctx.beginPath();
        ctx.clearRect(0, 0, W, H);
        readJson("data.json");

        function drawBubble(data) {

            var n = data.length;
            var xValues = [];
            var yValues = [];
            var rValues = [];
            for (var i = 0; i < data.length; i++) {
                xValues.push(data[i].c1);
                yValues.push(data[i].c2);
                rValues.push(data[i].c3);

            }
            var xMax = Math.max.apply(null, xValues);
            var yMax = Math.max.apply(null, yValues);
            var rMax = Math.max.apply(null, rValues);

            var x = (W) / xMax * 0.8;
            var y = (H) / yMax * 0.8;
            var r = (H) / (rMax * 2);



            function SortByRadius(a, b) {
                return ((a.c3 / 2 < b.c3 / 2) ? 1 : ((a.c3 / 2 > a.c3 / 2) ? -1 : 0));
            }
            data.sort(SortByRadius);



            for (var i = 0; i < n; i++) {
                var c1 = data[i].c1 * x;
                var c2 = data[i].c2 * y;
                var c3 = data[i].c3 * r;
                ctx.beginPath();
                ctx.moveTo(c1 + c3 / 2, c2);
                ctx.arc(c1, c2, c3 / 2, 0, 2 * Math.PI);

                if (data[i].tara === 'Romania') {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "#ffff99";


                }
                else if (data[i].tara === 'Italy') {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "#7FFFD4";

                }
                else {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "#AF002A";
                }
                ctx.lineWidth = 2;
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();

            }
        }
        var data = [];
        var i = 0;
        while (i < values.length) {
            year = $('#year').val();
            if (values[i].year == year) {
                var obj = {}
                obj.tara = values[i].country;
                obj.c1 = values[i].gas;
                obj.c2 = values[i].nuclear;
                obj.c3 = values[i].energy;

                data.push(obj);
                i += values.length / 3;
            }
            else {
                i++;
            }

        }

        drawBubble(data);
        DrawLines();


        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.fillStyle = "yellow"
        ctx.font = "12px Arial";
        ctx.stroke();
        ctx.fillText("Romania", 55, 40);
        ctx.fillStyle = "#7FFFD4"
        ctx.fillText("Italy", 55, 55);
        ctx.stroke();
        ctx.fillStyle = "red"
        ctx.fillText("United Kingdom", 55, 70);

    });



    DrawLines();

    function DrawLines() {
        ctx.beginPath();
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3;
        ctx.moveTo(6, H - 15);
        ctx.lineTo(W - 9, H - 15)
        ctx.stroke();
        ctx.moveTo(7, 3);
        ctx.lineTo(7, H - 14)
        ctx.stroke();

    }

    function readJson(file) {
        $.getJSON(file, function(data) {
            values = data.values;
        });
    }

    function apelare() {
        $("#btnBubbleChart").trigger("click");
        year++;
        if (year > values[values.length / 3 - 1].year) {
            year = values[0].year;
        }
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.font = "24px Arial";

        ctx.fillText(year, 55, 20);
        $('#year').val(year++);

    }

});
