# Location based application

## Features

User should be able to add new restaurant to restaurants collection, by selecting the position of the restaurant in the map and filling restaurant details.

User should be able to locate restaurants around their position.

User should be able to view page for restaurant and get directions.

## Model

Restaurant

- name
<!-- - latitude
- longitude -->
- location
  - coordinates: [ longitude, latitude ]
  - type: 'Point'
- rating (1-5)
- category

## Routes

GET - '/' - A button to get user's location, and a form
GET - '/restaurant/search?latitude=ABC&longitude=DEF&distance=1000' - Displays home page with a map with restaurants that are close-by
GET - '/restaurant/create' - Displays creation form
POST - '/restaurant/create' - Handles form submission
GET - '/restaurant/:id' - Displays information about specific restaurant
