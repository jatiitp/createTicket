angular.module('GeekCtrl', []).controller('GeekController', function($scope,$http) {


    $scope.typeOptions = [
        'Wallet',
        'Shopping',
        'Movies',
        'KYC',
        'Other'
    ];

    $scope.typeSearchOptions = [
        'All',
        'Wallet',
        'Shopping',
        'Movies',
        'KYC',
        'Other'
    ];

	$scope.fetchDataOnLoad = function() {
        $http.get('/getData')
            .then(function(resp) {
                console.log(resp);
                $scope.ticketListMain = resp.data.docs;
                $scope.searchType = 'All';
                $scope.searchByType('All');
                
            }, function(resp) {
                /* Failure */
                
            });
    }
    $scope.fetchDataOnLoad();	
    
    $scope.searchByType = function(searchType) {

        console.log(searchType);
        console.log($scope.ticketListMain);
        $scope.ticketList = [];

        if (!searchType || searchType == 'All') {
            $scope.ticketList =  $scope.ticketListMain;
        }

        for (var i = 0; i < $scope.ticketListMain.length; i++) {
            if ($scope.ticketListMain[i].data.type == searchType) {
                $scope.ticketList.push($scope.ticketListMain[i]);
            }
        }
        console.log($scope.ticketList);

    }

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
                $scope.fetchDataOnLoad();
                $scope.snackBar('Succesful');
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    $scope.ticketData = {
        firstName : "",
        lastName : "",
        age : "",
        designation : "",

    };
   
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

    $scope.isEdit = false;
    $scope.edit = function(index) {

        $scope.isEdit = true;
        $scope.ticketData = $scope.ticketList[index].data;

    };

    $scope.mainIndex = 0;
    $scope.delete = function(index) {
        var obj = {
        	"data" : $scope.ticketList[index].data,
        	'date' : $scope.ticketList[index].date
        }
        $scope.post("/delete", obj);
    };

    $scope.save = function(ticketData) {
         
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
        	"data" : ticketData,
        	'date' : $scope.ticketList[$scope.mainIndex].date
        }
        $scope.post("/saveData", obj);
        $scope.isEdit = false;
    };

    $scope.cancel = function(index) {
        $scope.isEdit = false;
    };

});