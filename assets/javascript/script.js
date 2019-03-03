$(document).ready(function() {
    
    //1.create an array of animals
    var animals = [
        "dog","cat", "horse", "turtle", "lion", "whale", "tiger", "moose", "wolf", "salmon", "eagle", "jaguar" ];
    //2.create a function to make button that will be invoked at the end with 3 parameters.
    function createButtons(arrayToStore, classToAdd, areaToAdd) {
        //if user refreshes the page, it will empty out the area were appending our buttons too.
        $(areaToAdd).empty();


        //First parameter is we need an arrayToStore so that we can use the for loop to go through and create buttons and calling them variable a.
        //next were adding a Class to var a and including the second parameter classToAdd. 
        //adding the attribute "data-type" to our variable a with a value of the arrayToStore[i] and using the text method to store the text in var a
        // append th items within our animal array.
        for(var i=0; i < arrayToStore.length; i++) {
            var a =$("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToStore[i]);
            a.text(arrayToStore[i]);
            $(areaToAdd).append(a);
        }
    }
    //3.create an onclick event to with anything that has the class of .animal-button and 
    //when the user enters an animal name the image of the animal must generate when the state is not active.   
    $(document).on("click", ".animal-button", function() {
        $("#animals").empty();
        $(".animal-button").removeClass("active");
        $(this).addClass("active");
    

    //creating a jS variable so we can use special keyword "This".
        var type = $(this).attr("data-type");

    
    //not including the s will prevent functionality... 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type +  "&api_key=4LKXAcolauoiQG48z8HGwkSNjLWJCGZH";
    //make an ajax call to go within our querURL to create a div class=\animal-item\

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
    //need to create temporary containers for the results (the actual animalDiv, rating, paragraph to display the rating)
    //need to create 2 variables that determine status of the gif 
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class =\"animal-item\">");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
    //create an image tag and include, attributes to determine status of the gif. first still / clicked animated/ clicked stop. 
                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");
    //append the paragraph and image to the AnimalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);
    //append the animalDiv to the div id animal on t he html page
                $("#animals").append(animalDiv);
            }
         });
    });
    //when an animal image is clicked create an if else statment to allow user features.
    $(document).on("click", ".animal-image", function() {

        var state =$(this).attr("data-state");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    //within our form. the submit button with the id of #add-animal when clicked will trigger an event 
    //creating a new variable newAnimal and setting the .eq( index ) to zero so we can push it to our array of animals. 
    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("input").eq(0).val();

        if(newAnimal.length > 2) {
            animals.push(newAnimal);
        }

        createButtons(animals, "animal-button", "#animal-buttons");

    });
    createButtons(animals, "animal-button", "#animal-buttons");
});