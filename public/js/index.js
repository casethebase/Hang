var userId = sessionStorage.getItem("userId");

function getSession(){
    if (userId){
        return userId;
    }else{
        return false;
    }
}


if (!getSession()){
    window.location.href = "/login";
}


$.get("/api/user/"+userId, function(result){
    console.log(result);
    $("#userName").text(result.name)
});

// $.get("/api/hangs/"+userId, function(result){
//     console.log("this"),
//     document.write(result)
// })


$("#logOut-btn").on("click", function(){
    sessionStorage.clear();
    window.location.href = "/login";
})

$("#addEvent").on("click", function(){
    event.preventDefault();
    var newEvent = {
        eventName: $("#event-name").val().trim(),
        date: $("#event-date").val().trim(),
        timeStart: $("#start-time").val().trim(),
        timeEnd: $("#end-time").val().trim(),
        userId: userId
    }
    $.post("/api/event", newEvent, function(result){
        console.log(result)
    })
    window.location.href = "/dashboard/"+userId;
    console.log(newEvent);
})

$("#addHang").on("click", function(){
    event.preventDefault();
    var newHang = {
        hangName: $("#hang-name").val().trim(),
        aboutHang: $("#about-hang").val().trim(),
        creatorId: userId
    }
    $.post("/api/hangs", newHang, function(result){
        console.log(result)
    })
    window.location.href = "/dashboard/"+userId;
    console.log(newHang)
})


