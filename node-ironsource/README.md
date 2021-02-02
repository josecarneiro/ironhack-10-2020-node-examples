# Ironsource

## Routing

METHOD - PATH - PAGE - DESCRIPTION
GET - / - Home - Displaying latest resources
GET - /resource/create - Create Resource - Display resource creation form
POST - /resource/create - Create Resource - Add resource to database
GET - /resource/:id - Single Resource - Display single resource (link to the update form, deletion form)
GET - /resource/:id/update - Update Resource - Display resource updating form
POST - /resource/:id/update - Update Resource - Update resource
GET - /resource/:id/delete - Delete Resource - Displays deletion confirmation
POST - /resource/:id/delete - Delete Resource - Delete resource
POST - /resource/:id/upvote - Upvote Resource - Increments points of resource by 1

Error GET /error Display error message

## To Do

- Add dynamic subtitles to pages.
- Move resource item and topics into partials.
- Display user's resources on their profile.
- Add sorting algorythm.
- Send welcome message to user on account creation.
- Change promise chains into aasync/await.
- Add 'use strict' where missing.
