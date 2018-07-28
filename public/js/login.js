var userId = sessionStorage.getItem("userId");

$(".submitBtn").on("click", function(){
    event.preventDefault();
    var loginInfo = {
        email : $("#login-email").val().trim(),
        password: $("#login-pass").val().trim()
    };
    $.post("/api/login", loginInfo, function(result) {
        if (!result){
            alert("incorrect user/pass")
        }else{
            sessionStorage.setItem("userId", result.id);
            sessionStorage.setItem("userName", result.username);
            alert("Login successful")
            window.location.href = "/dashboard/"+result.id;
        }
      });

})

function getSession(){
    if (userId){
        return userId;
    }else{
        return false;
    }
}

if (getSession()){
    window.location.href = "/dashboard/"+userId;
}