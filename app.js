
$(document).ready(function () {


	//	$.getJSON("http://www.balticapp.fi/lukeA/authzero", function (result) {

	var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
		auth: {
			//			redirectUrl: 'http://balticapp.fi/lukeA/callback',
			responseType: 'token',
			params: {
				scope: 'openid email'
			} //Details: https://auth0.com/docs/scopes
		}
	});


	$('.btn-login').click(function (e) {
		e.preventDefault();
		lock.show();
	});

	$('.btn-logout').click(function (e) {
		e.preventDefault();
		logout();
	})

	lock.on("authenticated", function (authResult) {
		lock.getProfile(authResult.idToken, function (error, profile) {
			if (error) {
				// Handle error
				return;
			}
//			console.log('Authorization: Bearer ' + authResult.idToken);
//			console.log('acstoken: ' + authResult.accessToken);
//			console.log('payload: ' + authResult.idTokenPayload);
//			console.log('profile: ' + JSON.stringify(profile));

			localStorage.setItem('id_token', authResult.idToken);
			localStorage.setItem('acstoken', authResult.accessToken);
			localStorage.setItem('payload', authResult.idTokenPayload);
			//			localStorage.setItem('state', authResult.state);
			localStorage.setItem('profile', JSON.stringify(profile));

			// Display user information
			show_profile_info(profile);
		});

	});

	$.ajaxSetup({
		'beforeSend': function (xhr) {
			if (localStorage.getItem('id_token')) {
				xhr.setRequestHeader('Authorization',
					'Bearer ' + localStorage.getItem('id_token'));
			}
			if (localStorage.getItem('acstoken')) {
				xhr.setRequestHeader('acstoken',
					localStorage.getItem('acstoken'));
			}
		}
	});

	var accessToken = localStorage.getItem('acstoken');
	var idToken = localStorage.getItem('id_token');

	function httpGetAsync(theUrl, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
				callback(xmlHttp.responseText);
		}
		xmlHttp.open("GET", theUrl, true); // true for asynchronous 
		xmlHttp.send(null);
	}


	httpGetAsync('http://www.balticapp.fi/lukeA/login', function (response) {
		response.text().then(function (t) {
			if (response.status !== 200) {
				console.log('error');
				return;
			}
			alert('API Response: ' + JSON.stringify(JSON.parse(t)));
		}).catch(function (err) {
			alert('error: ' + err);
		});
	});


	//	fetch('http://www.balticapp.fi/lukeA/login', {
	//		method: 'get',
	//		headers: new Headers({
	//			'Content-Type': 'application/json',
	//			'Authorization': 'Bearer ' + idToken,
	//			'acstoken': accessToken
	//		})
	//	}).then(function (response) {
	//		response.text().then(function (t) {
	//			if (response.status !== 200) {
	//				console.log('error');
	//				return;
	//			}
	//			alert('API Response: ' + JSON.stringify(JSON.parse(t)));
	//		})
	//	}).catch(function (err) {
	//		alert('error: ' + err);
	//	});

	//retrieve the profile:
	var retrieve_profile = function () {
		var id_token = localStorage.getItem('id_token');
		if (id_token) {
			lock.getProfile(id_token, function (err, profile) {
				if (err) {
					return alert('There was an error getting the profile: ' + err.message);
				}
				// Display user information
				show_profile_info(profile);
			});
		}
	};

	var show_profile_info = function (profile) {
		$('.nickname').text(profile.nickname);
		$('.btn-login').hide();
		$('.avatar').attr('src', profile.picture).show();
		$('.btn-logout').show();
	};


	var logout = function () {
		localStorage.removeItem('id_token');
		window.location.href = "/";
	};

	retrieve_profile();
	//	});
});