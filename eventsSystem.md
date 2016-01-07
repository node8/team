#Event management system
----------
## Events have
- Description:
	- Date
	- Place (Town/Club)
	- Short info
	- Image
- Users - list of users that will visit (have joined) the event
- Comments (created by users)
- Rating - every user (auth. user) can rate the event

## Public part (accessible without authentication)
- View events (w/o comments) 
- User login and user registration forms

## Private part (available for registered users)
- View events with comments
- View details for event
- Take part in events (Join event)
- Rate event (only once)
- Write comments for events
- User's profiles management functionality
	- edit profile
	- upload profile picture

## Administrative part (available for administrators only)
- create / edit / delete users and other administrators
- create / edit / delete events and comments
- remove users from events

### Optionally
- categories
- tags
- functionality
	- ...

## Routes

#### Users
- **POST** users/register - Registers a new user in the events system
- **POST** users/login - Logs in a user in the events system 
- **PUT** users/logout - Logs out a user from the events system 
- **GET** users/profile/{userId} - gets an existing user
- **PUT** users/profile/{userId} - updates an existing user

#### Events 
- **GET** events - Gets top 10 public events, sorted by their date of creation
- **POST** events - Creates a new event and redirects to the newly created event
- **PUT** events/{eventId} - Update an existing event, redirects to events
- **DELETE** events/{eventId} - Delete an existing event, returns the event created so it can be loaded in the UI
- **GET** events/{eventId} - Gets event with ID = eventID, with 10 comments sorted by date
- **GET** events?page=P - Gets the events at positions from P*10 to (P+1)*10. The events sorted by date of creation and are at most 10.
- **POST** events/{eventID}/comments - Creates a new comment for a given event
- **POST** events/{eventId}/rate header body: { “rate”: 1-5 (int)} - Creates rating by the current user for the event with Id = eventId
- **POST** events/{eventID}/join - Current user can join to the event with Id = eventId
- **POST** events/{eventID}/leave - Current user can leave an event with ID = eventId