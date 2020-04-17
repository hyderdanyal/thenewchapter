

var UserProfile = (function () {
    var full_name = "";
    var isLogin = Boolean;


    var getName = function () {
        return full_name;    // Or pull this from cookie/localStorage
    };

    var setName = function (name) {
        full_name = name;
        // Also set this in cookie/localStorage
    };
    var setIsLogin = function () {
        isLogin = true;

    }
    var setIsLogout = function () {
        isLogin = false

    }
    var isLoginActive = function () {
        return isLogin;

    }

    return {
        getName: getName,
        setName: setName,
        isLoginActive: isLoginActive,
        setIsLogin: setIsLogin,
        setIsLogout: setIsLogout,
    }

})();

export default UserProfile;