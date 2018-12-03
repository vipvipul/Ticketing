angular.module("busApp", []).controller("busController", function ($scope) {

	$scope.getBusDetails = function () {
		$scope.searchResult = [];
		angular.forEach($scope.busDetails, function (object, key) {
			if (object.Source.toLowerCase() == $scope.source.toLowerCase() && object.Destination.toLowerCase() == $scope.destination.toLowerCase())
				$scope.searchResult.push(object);
		});
		if ($scope.searchResult.length == 0) {
			$scope.errorMsg = "No Bus Details Found!";
		} else {
			$scope.errorMsg = "";
		}
	};

	$scope.searchBody = true;
	$scope.ob = [];
	$scope.addUser = function (busId, availability) {
		$scope.ob = [];
		$scope.availableSeats = availability;
		$scope.bookingBusId = busId;
	}

	$scope.addPassenger = function () {
		$scope.noOfPassengers.push($scope.noOfPassengers[$scope.noOfPassengers.length - 1] + 1);
	}

	$scope.removePassenger = function (index) {
		$scope.noOfPassengers.pop($scope.noOfPassengers[$scope.noOfPassengers.length - 1]);
		$scope.ob.splice(index, 1);
	}

	$scope.resetPassengers = function () {
		$scope.noOfPassengers = [1];
		$scope.ob = [];
	}
	$scope.resetPassengers();

	$scope.passengers = [];
	$scope.bookTicket = function () {
		var count = 0;

		for (var i = 0; i < $scope.searchResult.length; i++) {
			if ($scope.searchResult[i].BusId == $scope.bookingBusId) {
				angular.forEach($scope.ob, function (object, key) {
					object.BusName = $scope.searchResult[i].BusName;
					object.Source = $scope.searchResult[i].Source;
					object.Destination = $scope.searchResult[i].Destination;
					object.Departure = $scope.searchResult[i].Departure;
					object.Arrival = $scope.searchResult[i].Arrival;
					object.Duration = $scope.searchResult[i].Duration;
					object.Fare = $scope.searchResult[i].Fare;

					$scope.passengers.push(object);
					count++;
				});
				$scope.searchResult[i].Availability -= count;
				break;
			}
		}

		$scope.resetPassengers();
		$("#closeModal").click();
		$scope.successMsg = "Ticket booked successfully!";
	}

	$scope.busDetails = [
		{
			BusId: 1,
			BusName: "Sharma Travels",
			Source: "Hyderabad",
			Destination: "Chennai",
			Departure: "20:00",
			Arrival: "10:00",
			Duration: "14h 00m",
			Fare: 200,
			Availability: 5
		},
		{
			BusId: 2,
			BusName: "Kaveri Travels",
			Source: "Chennai",
			Destination: "Ranchi",
			Departure: "18:00",
			Arrival: "07:15",
			Duration: "13h 15m",
			Fare: 1100,
			Availability: 3
		},
		{
			BusId: 3,
			BusName: "Bharathi Travels",
			Source: "Chennai",
			Destination: "Ranchi",
			Departure: "12:00",
			Arrival: "06:00",
			Duration: "15h 00m",
			Fare: 500,
			Availability: 2
		},
		{
			BusId: 4,
			BusName: "LIMOLINER",
			Source: "Banglore",
			Destination: "Delhi",
			Departure: "05:00",
			Arrival: "08:30",
			Duration: "12h 45m",
			Fare: 1000,
			Availability: 6
		}
	]
	$scope.searchResult = $scope.busDetails;
});