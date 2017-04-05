$(function() {
    var apasat = false;
    $("#tableBtn").click(function() {

        if (apasat) {
            $("table").remove();
            $("<table></table>").appendTo("body")
        }
        apasat = true;



        function readJson(file) {
            $.getJSON(file, function(data) {
                values = data.values;
            });
        }

        readJson("data.json");

        var year = $("#yearTable").val();

        $("table").append("<caption>" + "Year: " + year.toString() + "</caption>")

        $("<thead></thead>")
            .append($("<th></th>").append("Country"))
            .append($("<th></th>").append("Natural Gas"))
            .append($("<th></th>").append("Nuclear"))
            .append($("<th></th>").append("Energy"))
            .appendTo("table")

        var tbody = $("<tbody></tbody>");

        for (var i = 0; i < values.length; i++) {
            if (values[i].year == year) {

                $("<tr></tr>").append($("<td></td>").append(values[i].country))
                    .append($("<td></td>").append(values[i].gas))
                    .append($("<td></td>").append(values[i].nuclear))
                    .append($("<td></td>").append(values[i].energy))
                    .appendTo(tbody)
            }
        }


        var table = $("<table></table>");
        $("table").
        append(tbody)
            .append($("<tfoot></tfoot>")
                .append($("<tr></tr>").append($("<td colspan='4'></td>").append("um: toe (tonnes oil equivalent)"))));




    });
});
