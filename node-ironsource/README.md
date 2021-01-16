

PAGE               METHOD    PATH                  DESCRIPTION
Home               GET       /                     Displaying latest resources
Create Resource    GET       /resource/create      Display resource creation form
Create Resource    POST      /resource/create      Add resource to database
Single Resource    GET       /resource/:id         Display single resource (link to the update form, deletion form)
Update Resource    GET       /resource/:id/update   Display resource updating form
Update Resource    POST      /resource/:id/update   Update resource
Delete Resource    GET       /resource/:id/delete   Displays deletion confirmation
Delete Resource    POST      /resource/:id/delete   Delete resource
Upvote Resource    POST      /resource/:id/upvote   Increments points of resource by 1

Error              GET       /error                Display error message