$( document ).ready(function() {

	console.log("hellou");


var config = {
    apiKey: "AIzaSyBnWCP4hHL24GipKiwjXJab2NZjjsoFKsg",
    authDomain: "fir-type.firebaseapp.com",
    databaseURL: "https://fir-type.firebaseio.com",
    projectId: "fir-type",
    storageBucket: "fir-type.appspot.com",
    messagingSenderId: "433219159007"
};

  firebase.initializeApp(config);

  var dataRef = firebase.database();

  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;

  $("#add-train-btn").on("click", function(event) {
	 	event.preventDefault();

	 	trainName = $("#train-name-input").val().trim();
	 	destination = $("#destination-input").val().trim();
		firstTrainTime = $("#first-input").val().trim();
		frequency = $("#frequency-input").val().trim();

		firstTrainTime = moment(moment(firstTrainTime, "hh:mm A").subtract(1, "years"),"hh:mm").format("hh:mm A");
  		

		console.log(trainName);
	    console.log(destination);
	    console.log(frequency);
	    console.log(firstTrainTime);

		dataRef.ref().push({
		    trainName: trainName,
		    destination:destination ,
		    frequency:frequency,
		    firstTrainTime:firstTrainTime
		});
		// end of #add-employee-btn button click
	});

  dataRef.ref().on("child_added", function(childSnapshot) {

  		var trainName = childSnapshot.val().trainName;
		var destination =  childSnapshot.val().destination;
		var frequency = childSnapshot.val().frequency;
		var firstTrainTime = childSnapshot.val().firstTrainTime;

		var currentTime = moment().format("HH:mm");



		var nextArrival = null;
		var minutesAway = null;

		var diff = moment().diff(moment(firstTrainTime, "hh:mm A"), "m");
		var modTime = diff % frequency;
		var minutesAway = frequency - modTime;

		console.log(minutesAway);

		nextArrival = moment().add(minutesAway, "m");

		var actualArrive = moment(nextArrival).format("hh:mm A");




		var table = $("tbody");




		table.append(`<tr>
			<td>${trainName}</td>
			<td>${destination}</td>
			<td>${frequency}</td>
			<td>${actualArrive}</td>
			<td>${minutesAway}</td>
			</tr>`)






});

});
