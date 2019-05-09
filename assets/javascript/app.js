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
            frequency: frequency,
        });

    });

    // Firebase watcher .on("child_added")
    database.ref().on("child_added", function(snapshot) {

        // console logging the last user's data
        console.log(snapshot.val());

        // grab the startTime value from firebase
        var randomDate = snapshot.val().startTime;
        console.log(randomDate);

        // seperate the hours and minutes
        var currentHours = moment().format("HH");
        var currentMinutes = moment().format("mm");

        // split the hours and minutes
        var res = randomDate.split(":");

        // convert the hours and minute strings to numbers
        var firstTrainHours = parseInt(res[0]);
        var firstTrainMinutes = parseInt(res[1]);

        // convert both the first train and current time into minutes
        var firstTrainHoursToMinutes = (firstTrainHours * 60) + firstTrainMinutes;
        var currentTrainHoursToMinutes = (parseInt(currentHours) * 60) + parseInt(currentMinutes);

        // figure out the difference
        var diff = Math.abs(currentTrainHoursToMinutes - firstTrainHoursToMinutes);

        // figure out the minutes away
        var almostMinutesAway = diff % snapshot.val().frequency;
        var minutesAway = snapshot.val().frequency - almostMinutesAway;

        console.log(minutesAway);


        // add the minutesaway to the current time
        var nextArrival = moment.utc(moment().format("HH mm"),'hh:mm').add(minutesAway,'minutes').format('hh:mm')

        console.log(nextArrival);

        // create new rows and append respetive valyes into column divs
        var newRow = $("<div class='row'>");

        var trainNameDiv = $("<div class='col-2'>").text(snapshot.val().trainName);
        var destinationDiv = $("<div class='col-2'>").text(snapshot.val().destination);
        var frequencyDiv = $("<div class='col-2'>").text(snapshot.val().frequency);
        var nextArrivalDiv = $("<div class='col-2'>").text(nextArrival);
        var minutesAwayDiv = $("<div class='col-2'>").text(minutesAway);

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