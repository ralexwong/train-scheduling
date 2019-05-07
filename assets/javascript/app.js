$(document).ready(function () {

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

    });

























    // // Firebase watcher .on("child_added"
    // database.ref().on("child_added", function(snapshot) {

    //     // console logging the last user's data
    //     console.log(snapshot.val());

    //     var randomDate = snapshot.val().startDate;
    //     console.log(randomDate);


    //     var monthsWorked = moment().diff(moment(randomDate, "X"), "months");
    //     var monthlyRate = snapshot.val().monthlyRate;
    //     console.log('Monthlyrate' + monthlyRate);
      

    //     var ENameDiv = $("<div>").text(snapshot.val().trainName);
    //     var destanationDiv = $("<div>").text(snapshot.val().destanation);
    //     var startDateDiv = $("<div>").text(snapshot.val().startDate);
    //     var monthlyRateDiv = $("<div>").text(snapshot.val().monthlyRate);
    //     var monthsWorkedDiv = $("<div>").text(monthsWorked);
    //     var totalBilled = (monthlyRate * monthsWorked);
        
        

    //     ENameDiv.addClass("newEmployees");
    //     roleDiv.addClass("newRole");
    //     startDateDiv.addClass("NewStartDate");
    //     monthlyRateDiv.addClass("NewMonthlyRate");
    //     monthsWorkedDiv.addClass("NewMonthsWorked");

        
        
    //     // grab information from firebase and append the info to each respective column

    //     $("#EName").append(ENameDiv);
    //     $("#role").append(roleDiv);
    //     $("#startDate").append(startDateDiv);
    //     $("#monthlyRate").append(monthlyRateDiv);
    //     $("#monthsWorked").append(monthsWorkedDiv);
    //     $("#totalBilled").append(totalBilled);

    
    //     // Handle the errors
    //     }, function(errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // });



});