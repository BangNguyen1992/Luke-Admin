
var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  lock.show();
});

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);

    // Display user information
    $('.nickname').text(profile.nickname);
    $('.avatar').attr('src', profile.picture);
  });
});

var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    // Display user information
    $('.nickname').text(profile.nickname);
    $('.avatar').attr('src', profile.picture);
  });
}

//window.addEventListener('load', function () {
//	auth0 = new Auth0({
//		domain: "nikitak.eu.auth0.com",
//		clientID: "PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6",
//		callbackURL: "http://balticapp.fi/lukeA/callback",
//		responseType: 'token'
//	});
//});



var myHeaders = new Headers({
	"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL25pa2l0YWsuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE3NDEzMDM4NDQ5MDQ3NjQyNTQwIiwiYXVkIjoiUGlOcGRMbXBZSnJnS2xsblQ3R2JMYmpBRktqdGNBWTYiLCJleHAiOjE0NzkxNTg5MTcsImlhdCI6MTQ3OTEyMjkxN30.ZQM3pLWVMpP0-DR-du2zyajSpkfsrqaGXZHOTwHCIoM",
	"acstoken": "TAdB3rkjaMLQqs8O",

});


$.ajax({
	url: "http://www.balticapp.fi/lukeA/login",
	type: 'GET',
	dataType: 'json',
	headers: myHeaders,
	contentType: 'application/json; charset=utf-8',
	success: function (result) {
		// CallBack(result);
	},
	error: function (error) {

	}
});