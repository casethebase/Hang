function getSession(){
    var userId = sessionStorage.getItem("userId");
    if (userId){
        return userId;
    }else{
        return false;
    }
}


if (!getSession()){
    window.location.href = "/login";
}else{
    var userId = sessionStorage.getItem("userId");
    $.get("/api/user/"+userId, function(result){
        console.log(result);
        $("#userName").text(result.name)
    });
    $.get("/api/hangs/"+userId, function(result){
        console.log(result)
    })
}

$("#logOut-btn").on("click", function(){
    sessionStorage.clear();
    window.location.href = "/login";
})