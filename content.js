function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function getOrigPass() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("password", function(value) {
            if (value["password"]) {
                resolve(value["password"]);
            } else {
                resolve("");
            }
        });
    });
}

(async () => {
    try {
        const result = await getOrigPass();
        var origPass = result;
        if (getCookie("secure_site_auth") != 1) {
			var code = prompt("Введите код: ");
			while (origPass != code) {
				var code = prompt("Введите код доступа: ");
			}
			var cookie_date = new Date();
			var date = cookie_date.setTime(cookie_date.getTime() + 600000);
			setCookie("secure_site_auth", "1", {"expires" : "" + new Date(date).toGMTString() + ""});
		}
    } catch (error) {
        console.log('error: ', error);
    }
})();


