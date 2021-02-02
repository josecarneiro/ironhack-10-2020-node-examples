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

- Add titles at the top of each authentication view
- Move resource item and topics into partials.
- Style topics in separate stylesheet
- Place authentication views into authentication directory.
- Display appropriate error messages in error template.
- Move authentication to bottom of navbar.
- Add dynamic subtitles to pages.
- Display user's resources on their profile.
- Send welcome email to user on account creation.
- Add 'use strict' where missing.
- Add sorting algorythm.
- Change promise chains into async/await.
