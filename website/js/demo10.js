(function() {
	// http://stackoverflow.com/a/2450976
	function shuffle(array) {
		var currentIndex = array.length
		, temporaryValue
		, randomIndex
		;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' ),
		paths = [].slice.call( overlay.querySelectorAll( 'svg > path' ) ),
		pathsTotal = paths.length;

	function toggleOverlay() {

        var email = $("#email").val();
        if (email.length > 5) {

			var cnt = 0;

			shuffle( paths );

			if( classie.has( overlay, 'open' ) ) {
				classie.remove( overlay, 'open' );
				classie.add( overlay, 'close' );

				paths.forEach( function( p, i ) {
					setTimeout( function() {
						++cnt;
						p.style.display = 'none';
						if( cnt === pathsTotal ) {
							classie.remove( overlay, 'close' );
                            initAnimation();
						}
					}, i * 30 );
				});
			}
			else if( !classie.has( overlay, 'close' ) ) {
				classie.add( overlay, 'open' );
				paths.forEach( function( p, i ) {
					setTimeout( function() {
						p.style.display = 'block';
                        initAnimation();
					}, i * 30 );
				});
			}
			$.post("http://gdgbeijing.org/checkApplication", {"email": email}, function (result) {
				if (result.state == 'success') {
					if (result.data && result.data.email) {
						if (result.data.session && result.data.session.length >= 3) {
                            $("#loading").css("display", "none");
                            $("#error").css("display", "none");
                            if (result.data.session == "Android") {
                                $("#androidAnimation").css("display", "block");
							} else if (result.data.session == "Web") {
                                $("#webAnimation").css("display", "block");
							} else if (result.data.session == "TensorFlow") {
                                $("#tfAnimation").css("display", "block");
							}
                            $("#meetingPlace").text(result.data.session);
                            $("#attendeeName").text(result.data.name);
                            $("#attendeeEmail").text(result.data.email);
                            $("#invitationCard").css("display", "block");
						} else {
                            $("#error").text("很遗憾，您本次报名未通过，暂无法签到。");
                            $("#error").css("display", "block");
						}
					} else {
                        $("#error").text("很遗憾，未查询到您报名此次 DevFest 2017·北京站 的活动的信息，暂无法签到。");
                        $("#error").css("display", "block");
					}
				} else {
                    $("#error").text("网络故障，请重试...");
                    $("#error").css("display", "block");
				}
			})
        } else {
            alert("请输入正确的邮箱格式！")
			return
        }
	}

	function initAnimation() {
        $("#loading").css("display", "block");
        $("#error").css("display", "none");
        $("#androidAnimation").css("display", "none");
        $("#webAnimation").css("display", "none");
        $("#tfAnimation").css("display", "none");
        $("#meetingPlace").text("");
        $("#attendeeName").text("");
        $("#attendeeEmail").text("");
        $("#invitationCard").css("display", "none");
    }

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
})();