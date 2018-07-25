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

 // Client ID and API key from the Developer Console
 var CLIENT_ID = '36664176782-bgca8fmolgd3tgc660bi0vme2rrgeret.apps.googleusercontent.com';
 var API_KEY = 'AIzaSyC8R5S3vQXjEiSB9FhFaP5WDDcHzvL6S-c';

 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

 var authorizeButton = document.getElementById('authorize_button');
 var signoutButton = document.getElementById('signout_button');
moment().format();

 /**
  *  On load, called to load the auth2 library and API client library.
  */
 function handleClientLoad() {
   gapi.load('client:auth2', initClient);
 }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
 function initClient() {
   gapi.client.init({
     apiKey: API_KEY,
     clientId: CLIENT_ID,
     discoveryDocs: DISCOVERY_DOCS,
     scope: SCOPES
   }).then(function () {
     // Listen for sign-in state changes.
     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

     // Handle the initial sign-in state.
     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
     authorizeButton.onclick = handleAuthClick;
     signoutButton.onclick = handleSignoutClick;
   });
 }

 /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 function updateSigninStatus(isSignedIn) {
   if (isSignedIn) {
     authorizeButton.style.display = 'none';
     signoutButton.style.display = 'block';
     listUpcomingEvents();
   } else {
     authorizeButton.style.display = 'block';
     signoutButton.style.display = 'none';
   }
 }

 /**
  *  Sign in the user upon button click.
  */
 function handleAuthClick(event) {
   gapi.auth2.getAuthInstance().signIn();
 }

 /**
  *  Sign out the user upon button click.
  */
 function handleSignoutClick(event) {
   gapi.auth2.getAuthInstance().signOut();
 }

 /**
  * Append a pre element to the body containing the given message
  * as its text node. Used to display the results of the API call.
  *
  * @param {string} message Text to be placed in pre element.
  */
 function appendPre(message) {
   var pre = document.getElementById('content');
   var textContent = document.createTextNode(message + '\n');
   pre.appendChild(textContent);
 }

 /**
  * Print the summary and start datetime/date of the next ten events in
  * the authorized user's calendar. If no events are found an
  * appropriate message is printed.
  */
 function listUpcomingEvents() {
   gapi.client.calendar.events.list({
     'calendarId': 'primary',
   }).then(function(response) {
     var events = response.result.items;

     if (events.length > 0) {
       for (i = 0; i < events.length; i++) {
         var event = events[i];
         var date = event.start.date;
         var time = event.start.dateTime;
         var endTime = event.end.dateTime;
         var start = moment(time).format("h:mm a")
         var end = moment(endTime).format("h:mm a")
         var formatDate = moment(date).format("M D YYYY");
         if (!start) {
           start = event.start.date;
         }
         if (!end) {
            end = event.end.date;
          }
         console.log("Event Title: " + event.summary + ' at: ' + start);
         var newEvent = {
            eventName: event.summary,
            date: formatDate,
            timeStart: start,
            timeEnd: end,
            userId: userId
        }
        $.post("/api/event", newEvent, function(result){
            console.log(result)
        })
       }
     } else {
       appendPre('No upcoming events found.');
     }
   });
 }

 //AJAX CALLS
$.get("/api/user/"+userId, function(result){
    console.log(result);
    $("#userName").text(result.name)
});


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
        hangDate: $("#hang-date").val().trim(),
        hangTime: $("#hang-time").val().trim(),
        UserId: userId
    }
    $.post("/api/hangs", newHang, function(result){
        console.log(result)
    })
    window.location.href = "/dashboard/"+userId;
    console.log(newHang)
})

