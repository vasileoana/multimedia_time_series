$(function() {

    $("#btnHistograma").on("click", function() {

        var selectedCountry = $("#selectCountry option").filter(':selected').text();
        var selectedCharac = $('input[name="charac"]:checked').val();


        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        var W = canvas.width;
        var H = canvas.height;
        ctx.beginPath();
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#ffff99";
        ctx.strokeStyle = "#4d4d00";
        ctx.rect(0, 0, W, H);
        ctx.textAlign = "center"
        ctx.font = "bold 9px Comic Sans MS "
        ctx.fill();
        ctx.stroke();


        var vector = new Array();
        var years = new Array();

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

        function DrawHistogram(data) {
            var n = data.length;
            var width = (W * 0.95 / n);
            var height = (H) / Math.max.apply(null, data) * 0.9;
            ctx.beginPath();
           
            for (var i = 0; i < n; i++) {
                var width_i = width * 0.7;
                var height_i = height * data[i];
                var xi = width * (i + 1);
                var yi = (H - 20) - height_i;

                ctx.fillStyle = "#" + (Math.random() * 0xFFFFFF << 0).toString(16)
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.rect(xi, yi, width_i, height_i);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "black";
                ctx.fillText(data[i], xi + width_i / 2, yi - 5);
                ctx.fillText(years[i], xi + width_i / 2, H - 3);
              
            }

        }

        function readJson(file) {

            $.getJSON(file, function(data) {
                var values = data.values;

                $.each(values, function(key, val) {
                    years.push(val.year);


                    if (val.country === selectedCountry) {
                        if (selectedCharac == 'gas') {
                            var x = (val.gas / 100000).toString();
                            vector.push(x.substring(0, 6));
                        }
                        else if (selectedCharac == 'nuclear') {
                            var x = (val.nuclear / 100000).toString();
                            vector.push(x.substring(0, 6));
                        }
                        else if (selectedCharac == 'energy') {
                            var x = (val.energy / 100000).toString();
                            vector.push(x.substring(0, 6));
                        }

                    }
                });

                DrawHistogram(vector);
            });
        }


        readJson("data.json");
        DrawLines()
    });
});
