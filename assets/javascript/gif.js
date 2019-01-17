
  destinationContainer = document.getElementById("destinations-view")
  // Initial array of destinations
  var destinations = ["London Tower", "Irland", "Switzerland", "New Zeland"];

  // displaydestinationInfo function re-renders the HTML to display the appropriate content
  function displaydestinationInfo() {

    var searchWord = $(this).attr("data-name");
    console.log(searchWord);
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=dc6zaTOxFJmzC&limit=1`;
    console.log(searchWord);
    console.log(queryURL);
$.ajax({
url: queryURL,
method: "GET"
}).then(function (response) {
console.log('response ' + response);
console.log(response.data);
console.log(response.data[0].url);
var results = response.data[0];
console.log(results)
// Only taking action if the photo has an appropriate rating
if (results.rating !== "r" && results.rating !== "pg-13") {
    // Creating a div template gif
    var ptemplate = `<p> Ratings:${results.rating}</p>
        <div>
        <img src="${ results.images.fixed_height_still.url }"  class="gif" data-animate="${ results.images.fixed_height.url }" data-still="${ results.images.fixed_height_still.url }" data-state="still">
        </div>`
        console.log(ptemplate);
        destinationContainer.innerHTML = ptemplate;

}
})
  };


  function renderButtons() {

    // Deleting the destinations prior to adding new destinations
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of destinations
    for (var i = 0; i < destinations.length; i++) {

      // Then dynamicaly generating buttons for each destination in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of destination-btn to our button
      a.addClass("destination-btn");
      // Adding a data-attribute
      a.attr("data-name", destinations[i]);
      // Providing the initial button text
      a.text(destinations[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  };

  // This function handles events where a destination button is clicked
  $("#add-destination").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var destination = $("#destination-input").val().trim();

    // Adding destination from the textbox to our array
    destinations.push(destination);

    // Calling renderButtons which handles the processing of our destination array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "destination-btn"
  $(document).on("click", ".destination-btn", displaydestinationInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  $(destinationContainer).on('click', ".gif", function(){ 
    console.log('click images')
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log('state '+ state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    console.log(this);
  });