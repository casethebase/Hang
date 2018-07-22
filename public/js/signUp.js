$("#signup-submit").on("click", function(){
    event.preventDefault();
    var userInfo = {
        name: $("#signup-name").val().trim(),
        email: $("#signup-email").val().trim(),
        username: $("#signup-username").val().trim(),
        password: $("#signup-password").val().trim()
    };
    $.post("/api/signup", userInfo, function(result) {
        console.log(result)
        window.location.href = "/login";

      });
})