submit = document.getElementById("submitButton").addEventListener("click", savePass);

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
	        if (origPass == "") {
				document.getElementById("lastPass").style.display = "none";
				document.getElementById("lassPass_name").style.display = "none";
			}
	    } catch (error) {
	        console.log('error: ', error);
	    }
	})();

function saveConfig(value) {
	if (!value) {
		alert('Настройки не сохранены');
		return;
	}
	chrome.storage.sync.set({"password": value}, function() {
		alert('Успешно. Настройки Сохранены');
	});
}
function savePass() {
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
	        if (origPass != "") {
				var lastPass = document.getElementById("lastPass").value;
			} else {
				var lastPass = "";
				document.getElementById("lastPass").style.display = "none";
			}
			var newPass = document.getElementById("newPass").value;
			var submitPass = document.getElementById("submitPass").value;
			if (origPass == lastPass) {
				if (newPass == submitPass) {
					saveConfig(newPass);
				} else {
					alert('Пароли не совпадают');
				}
			} else {
				alert('Неверный пароль');
			}
	    } catch (error) {
	        console.log('error: ', error);
	    }
	})();
}