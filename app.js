$(document).ready(function() {
  
  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
//			redirectUrl: 'http://balticapp.fi/lukeA/callback',
      responseType: 'token',
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });
	
//	var lock = new Auth0Lock({
//    domain:       'nikitak.eu.auth0.com',
//    clientID:     'PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6',
//    responseType: 'token',
//		auth: {
//      params: { scope: 'openid email' }
//		}
//  });
	

  $('.btn-login').click(function(e) {
    e.preventDefault();
    lock.show();
  });

  $('.btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  })

  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }
			console.log('Authorization: Bearer '+ authResult.idToken);
			console.log('acstoken: '+ authResult.accessToken);
			console.log('payload: '+ authResult.idTokenPayload);
			console.log('profile: '+ JSON.stringify(profile));
			
      localStorage.setItem('id_token', authResult.idToken);
			localStorage.setItem('acstoken', authResult.accessToken);
			localStorage.setItem('payload', authResult.idTokenPayload);
//			localStorage.setItem('state', authResult.state);
			localStorage.setItem('profile', JSON.stringify(profile));
			
      // Display user information
      show_profile_info(profile);
    });
		
  });

  //retrieve the profile:
  var retrieve_profile = function() {
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

  var show_profile_info = function(profile) {
     $('.nickname').text(profile.nickname);
     $('.btn-login').hide();
     $('.avatar').attr('src', profile.picture).show();
     $('.btn-logout').show();
  };
	

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };

  retrieve_profile();
});
