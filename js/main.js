var linkedIn = {
    memberId: 0,
    memberFirstName: "",
    memberLastName: "",
    onLoad: function () {
        IN.Event.on(IN, "auth", linkedIn.oAuth);
        IN.Event.on(IN, "logout", linkedIn.logOut);

        // Bind click handlers
        $("#view-connections").bind("click", function () {
            linkedIn.find.init();
            return false;
        });

        // Logout
        $("#logout").bind("click", function () {
            IN.User.logout();
            return false;
        });
    },
    oAuth: function () {
        $(".step2").css("display", "block");
        $(".not-loggedin").hide();
    },
    logOut: function () {
        $(".step2").css("display", "none");
        $(".not-loggedin").show();
    },
    saveProfileInformation: function () {
        if (IN.User.isAuthorized()) {
            linkedIn.memberId = IN.User.getMemberId();
            IN.API.Profile("me").fields(["firstName", "lastName"]).result(function (result) {
                linkedIn.memberFirstName = result.values[0].firstName;
                linkedIn.memberLastName = result.values[0].lastName;
            });
        }
    },

    find: {
    	init: function(){
    		if (IN.hasOwnProperty("User") && IN.User.isAuthorized()) {
                if (IN.User.getMemberId() != linkedIn.memberId) {
                	// Save profile info
                    linkedIn.saveProfileInformation();

		    		IN.API.Raw("/people/~/connections")
		                .result(function (json) {
		                    $("#result").html(json);
		                }).error(function(){
		                	$("#result").html("403 Forbidden");
		                });
		             }
		         }
    	}
    }
};