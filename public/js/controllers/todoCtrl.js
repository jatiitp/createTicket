angular.module('todoCtrl', []).controller('todoCtrl', function($scope, $http, $location) {


    $scope.typeOptions = [
        'Wallet',
        'Shopping',
        'Movies',
        'KYC',
        'Other'
    ];

    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.snackBar('Succesful');
                $scope.getDefaultObj();
                $location.path('existing');
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    $scope.getDefaultObj = function() {
        $scope.ticketData = {
            name : "",
            email : "",
            complaintDetails : "",
            type : "",

        };
    };

    $scope.getDefaultObj();
    
    
    function isString(x) {
      return Object.prototype.toString.call(x) === "[object String]"
    }

    $scope.addMore = function(ticketData) {

        if (!isString(ticketData.name)) {
            $scope.snackBar("Only characters is allowed in user's Name");
            return;
        }

        if (!ticketData.name) {
            $scope.snackBar("Please enter your name");
            return;
        }

        if ((!ticketData.email)) {
            $scope.snackBar("Please enter a valid 'Email'");
            return;
        }

        if (!isString(ticketData.complaintDetails)) {
            $scope.snackBar("Only characters is allowed in Complaint Details");
            return;
        }

        if (!ticketData.complaintDetails) {
            $scope.snackBar("Please enter Complaint Details");
            return;
        }

        if (!ticketData.type) {
            $scope.snackBar("Please seelct a type");
            return;
        }
        
        var obj = {
            'data' : ticketData,
            'date' : Date.now()
        };
        console.log(obj);
        
        $scope.post('/saveDataManual', obj);
    };

});