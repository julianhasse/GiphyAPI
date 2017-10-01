/* ===== Global Variables ===== */
/* ============================ */

var carArray = ["Audi", "Alfa Romeo", "Bentley", "Bugatti", "BMW", "Ferrari", "Fiat", "Ford", "Jaguar", "Land Rover", "Maserati", "Mercedes-Benz", "Porsche", "Volkswagen"];

/* ===== Main Functions ===== */
/* ============================ */

  function displayGif() {

    $("button").on("click", function() {
     
      var carSearch = $(this).attr("data-car");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carSearch + "&api_key=ScDTWzH3GRnAl92ms7roGPNhCobNKQT3&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          $("#gifsContainer").empty();
          
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var carImage = $("<img class='gif'>");
           
              carImage.attr("src", results[i].images.fixed_height_still.url);
              carImage.attr("data-state", "still");
              carImage.attr("data-animate", results[i].images.fixed_height.url);
              carImage.attr("data-still", results[i].images.fixed_height_still.url);
              
              gifDiv.append(carImage);
              gifDiv.append(p);

              
              $("#gifsContainer").prepend(gifDiv);
          }
        });
    });

  }

    function renderButtons() {

        $("#car-buttons").empty();

        for (var i = 0; i < carArray.length; i++) {

          var a = $("<button>");
          a.addClass("car");
          a.attr("data-car", carArray[i]);
          a.text(carArray[i]);
          $("#car-buttons").append(a);
        }
    }
    
    $("#add-car").on("click", function(event) {
        event.preventDefault();
        var car = $("#car-input").val().trim();
        carArray.push(car);
        renderButtons();
    });
      
    function switchGif(){
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
  }
      

      $(document).on("click", ".car", displayGif);
      $(document).on("click", ".gif", switchGif);
      
      renderButtons();
