# Events Manager

Running the application in Development Mode

    npm run-script dev

Running the application normally

    npm start

# How to use

*Events Manager is an app that lets you create events and display them forward.*


***



## Clients


Clients are a straight forward process. They are asked to put in their name first (Hit enter or click the button that appears). Which follows up with asking them to enter in their email address. 

***Developer Note the email is treated as the clients "true" username and password.*

- After they provided their name and email they are taken to the area where a list of events is available for them to reserve tables. 

- When they "Reserve" an event they are asked to put in how big their party is and other details relevant to the event.

- Once they confirm the Reservation and details they are taken back to the main area.

- After they have signed up for an event, they have a diagonal stack of cards for events that they are signed up for. 


They also have the original vertical stack as well for the events they haven't signed up for yet. The user can logout and log back in by using the same email address for the original reservation.


***

## Administrators

Administrators have a more covert way of entering into the system. Since the system is designed to be public in nature the authentication for admin is made in a way that a back door is created on the root page. Where normally a client would put their name, an administrator that wants to make edits to the system would enter in by first typing "admin/" and then followed by their actual username.

### For example. 

If Billy has an admin user account set as "bill", he would type in "admin/bill" where the root page is asking for the client's name.

Typing "admin/" before his username would take him to the next step where he would be asked to enter in his password. After which he would be in the lobby for the administrators. Where Admins can create or edit events as they see fit.

## Admin Api (ish)

_(Also known as *api.ambassadors*)_

To create a admin it can be donw in two ways.. by visiting

    localhost/embassy/declare/delegate

or

By using POST with the keys of Username and Password

    POST localhost/api/ambassadors/create

    example {"username":"Bill", "password":"ok"}

## Events Api

_(Also known as *api.events*)_


To create an Event, two keys are needed (title and seatCapacity)

    POST localhost:8080/api/events/

    example {"title":"Hello Crazy World", "seatCapacity":"20"}


To edit/update an Event, the "_id" is needed

*note either method will work POST or PUT for updating*

    POST/PUT localhost/api/events/:_id

    example {"title":"Hello Sane World", "seatCapacity":"20"}
    example Ext. POST localhost/api/events/5ccb5e32a6a85b4f500dd901


To view all events

    GET localhost/api/events/

To view just one Event, the "_id" is needed

    GET localhost/api/events/:_id

    example GET localhost/api/events/5ccb5e32a6a85b4f500dd901


To Delete an event, the "_id" is needed

    DELETE localhost/api/events/:_id

    example DELETE localhost/api/events/5ccb5e32a6a85b4f500dd901


## Client Book Api

_(Also known as *api.clientBank*)_


To create a Client, only one key is needed (email)

*Note An optional key for creating a client is knownName, but is not required*


    POST localhost/api/nation/create
    {"email":"bill@aol.com", "knownName":"Billy"}

To show a list of all clients (Auth IS NEEDED)
**You would do this by going to the root and login as described above.

    GET localhost/api/nation/

To view just one client, the "_id" key is needed

    GET localhost/api/nation/:_id

    example GET localhost/api/nation/pOcb5e32a6a85b4f500dd901


To edit just one client, the "_id" key is needed

    PUT localhost/api/events/:_id

    example PUT localhost/api/nation/pOcb5e32a6a85b4f500dd901


To delete just one client, the "_id" key is needed

    DELETE localhost/api/events/:_id

    example DELETE localhost/api/nation/pOcb5e32a6a85b4f500dd901


## Reservations Api

_(Also known as *api.reserve*)_


This api is a little more complicated and is strictly HTML version only for now. It relies on the events database information in a number of ways as well as the client book to maintain sounded data.

- First the event number (eventNum) is taken to know which event is being reserved
- How many seats are available to be reserved.
- Which client is reserving the event in question.
- Update the original event itself with the number of seats taken by this reservation.

All of the following listed above is done by the application behind the scenes.


****


## _Developer Notes_

Some of the api uses hacks to redirect the user back to the HTML system and still allows for api calls to be made with json response. 80% of the Events api is edited with Administration in mind. The other 20% is the clients themselves making changes as they sign up for each event.
