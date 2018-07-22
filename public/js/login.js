$("#submitBtn").on("click", function(){
    event.preventDefault();
    var loginInfo = {
        email : $("#login-email").val().trim(),
        password: $("#login-pass").val().trim()
    };
    $.post("/api/login", loginInfo, function(result) {
        if (result === "404"){
            alert("incorrect user/pass")
        }else{
            sessionStorage.setItem("userId", result.id);
            alert("Login successful")
            window.location.href = "/index";
        }
      });

})

function getSession(){
    var userId = sessionStorage.getItem("userId");
    if (userId){
        return userId;
    }else{
        return false;
    }
}

if (getSession()){
    window.location.href = "/index";
}