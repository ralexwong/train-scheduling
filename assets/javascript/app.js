$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCyaFkzE1aRDV--y1Bw7N6JfqDT0nfwNS4",
        authDomain: "train-scheduling-7a438.firebaseapp.com",
        databaseURL: "https://train-scheduling-7a438.firebaseio.com",
        projectId: "train-scheduling-7a438",
        storageBucket: "train-scheduling-7a438.appspot.com",
        messagingSenderId: "1016778049156",
        appId: "1:1016778049156:web:d07e6765016a1d07"
    };

    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var startTime = 0;
    var frequency = 0;


    // Creating the initial `.on("click")` event that will dynamically trigger new HTML rows to be generated.
    $("#submit-button").on("click", function () {
        event.preventDefault();

        // Grabbed values from text boxes
        trainName = $("#trainName-input").val().trim();
        destination = $("#destination-input").val().trim();
        startTime = $("#startTime-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        console.log("train name: " + trainName);
        console.log("destination: " + destination);
        console.log("startTime: " + startTime);
        console.log("frequency: " + frequency);

        // push information into firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency
        });

    });

    // Firebase watcher .on("child_added")
    database.ref().on("child_added", function(snapshot) {

        // console logging the last user's data
        console.log(snapshot.val());

        var randomDate = snapshot.val().startTime;
        console.log(randomDate);


        var monthsWorked = moment().diff(moment(randomDate, "X"), "months");
        var frequency = snapshot.val().frequency;
        console.log('frequency: ' + frequency);

        var minutesAway = (frequency * monthsWorked);
      
        var newRow = $("<div class='row'>");

        var trainNameDiv = $("<div class='col-2'>").text(snapshot.val().trainName);
        var destinationDiv = $("<div class='col-2'>").text(snapshot.val().destination);
        var frequencyDiv = $("<div class='col-2'>").text(snapshot.val().frequency);
        var nextArrivalDiv = $("<div class='col-2'>").text();
        var minutesAwayDiv = $("<div class='col-2'>").text();

        $("#new-train").append("<hr>");
        newRow.append(trainNameDiv);
        newRow.append(destinationDiv);
        newRow.append(frequencyDiv);
        newRow.append(nextArrivalDiv);
        newRow.append(minutesAwayDiv);

        $("#new-train").append(newRow);

        
        
        // grab information from firebase and append the info to each respective column

    
        // Handle the errors
        }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



});