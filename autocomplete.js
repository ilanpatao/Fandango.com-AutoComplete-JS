/////////////////////////////
// Written by: Ilan Patao //
// ilan@dangerstudio.com //
//////////////////////////

// Request function to fire on textbox input change
jQuery('#fandango').on('input', function() {
// Clear the search results for a new search
$("#searchresults").empty();
// Store search term in variable
var term = $("#fandango").val();
// Build the request
var proxifyer = "https://proxifyer.herokuapp.com/";
var url = proxifyer + "http://www.fandango.com/api/search/autocompletemulti?q=" + term;
		// Request the data
		$.get(url, function (fandata) {
		// Store the data in a new variable
		var data = fandata;
		// Go through the data and return results back to the searchdata div
		$.each(data, function(i, obj) {
		// Store the data in seperate variables
		var id = data[i].Id;
		var name = data[i].Name;
		var type = data[i].Type;
		// Define icons for search results
		if (type == "City"){
			var icon = '<i class="fa fa-building-o" aria-hidden="true"></i>&nbsp;';
		} else if (type == "Movie"){
			var icon = '<i class="fa fa-film" aria-hidden="true"></i>&nbsp;';
		} else if (type == "Theater"){
			var icon = '<i class="fa fa-ticket" aria-hidden="true"></i>&nbsp;';
		} else {
			var icon = '<i class="fa fa-location-arrow" aria-hidden="true"></i>&nbsp;';
		}
		// Append results to the list
		$("#searchresults").append('<li style="margin: 10px 0;"><h4 style="display:inline;">' + icon + '<a href="#" data-toggle="popover" data-placement="top" data-trigger="hover" title="' + name + '" data-content="Data returned for: ' + name + ' a ' + type + ' with a Fandango ID of: ' + id +'">' + name + '<span class="pull-right"><i class="fa fa-info-circle text-info" aria-hidden="true"></i></span></a></h4></li>');
		});
		// Initialize popoever
		$('[data-toggle="popover"]').popover(); 
		// Output Json Preview
    	var json = JSON.stringify(data);
		$("#jsonresults").val(json);
	});
});