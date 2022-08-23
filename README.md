# Helsinki city bike app

In this app you can view the list of city bike stations in Helsinki and Espoo.
You can search a station by name and click one to get additional information regarding that station.
<br>
There is also a list of journeys represented as a sortable data table. Journeys can be searched by the departure or return station name.

**Table of contents**
- [To run the app](#to-run-the-app)
- [E2E tests](#e2e-tests)
- [Information](#information)
  - [Data from files to database](#data-from-files-to-database)
  - [Backend](#backend)
  - [Frontend](#frontend)
    - [Home](#home)
    - [Stations](#stations)
    - [Single station view](#single-station-view)
    - [Journeys](#journeys)
  - [Final thoughts](#final-thoughts)

## To run the app

Node.js and npm needed to run the project!

1. Clone the project to your computer.

2. Head over to the frontend folder in your terminal.

3. Download depencies with:

```
npm install
```

4. Run the app with:

```
npm start
```

The backend is running in the cloud (Heroku), so running that locally is not needed.

## E2E tests

The app also features e2e test, made with cypress.
To run those, have the frontend running and use the command (in the frontend folder):

```
npm run cypress:open
```

Cypress will open, click E2E Testing, select chrome as your testing browser and click 'bikeApp.cy.js' in the Specs section.

## Information

Here you can find some more detailed information about the project.
<br>
The app has been created and tested on a Ubuntu-based system.

### Data from files to database

In the backend/data folder there is a python script get_data.py that gets data from four .csv files (which are too big for github). It then transforms and validates that data and sends it to a database.
The database in question being MongoDB. The free version of MongoDB could only hold 1.8 million journeys from the original 3.1 million.
<br>
<br>
Since from the start I planned on not doing endpoints for adding new stations or journyes, so I made the decision to do calculations for the addition information about a single station in the script. This approach has upsides and downsides.
<br>
<br>
The upsides being faster and more fluid user experience, since I do not have to make queries for information about a single station, since the information is already in the database. Also all of the calculations have been made with the full journey data, and not the imcomplete database data.
<br>
<br>
The downsides for making the calculations in the scipt are that it runs quite slow, even thought it is only ran once. Also if the need to expand the project arrives and new endpoints for adding new stations is needed, it will be more difficult and slower.
<br>
<br>
Weighing the upsides and the downsides and taking my original idea in to consideration, I am happy with my approach.

### Backend

The backend uses Node.js and Express for the server side and Mongoose is used to interact with the MongoDB database.
<br>
Being such a simple backend and having so little routes, I left it all in the index.js file and decided not to refactoring.
<br>
<br>
The backend is hosted in the cloud via Heroku service at https://citybike-app.herokuapp.com/ (api/stations or api/journeys). With the right id there is also a single station/journey view.

### Frontend

Frontend is a react-app, done with React.js and Javascript in combination with some addtional libraries.
<br>
There are also e2e test with cypress. [Here how to run them](#e2e-tests).
<br>
<br>
There are four main views in the app.

#### Home

Just some information about the features of the app.

#### Stations

This view has a list of all the stations. The stations are fetched from the backend using and saved using redux.
<br>
Features:

- Pagination, every page has 50 stations except the last one
- Searching, every station is searchable by its Finnish or Swedish name
  - Searches all the stations, even if its not on that current page
  - Searching happens on change, so even writing one letter makes a search
- Every station is clickable to get additional information on that station

#### Single station view

This view has additional information on any given station. Information includes:

- Station name
- Station address
- Buttons to choose the language in which the station name and adress are shown
- Total number of journeys startin from the station
- Total number of journeys ending at the station
- The average distance of a journey starting from the station
- The average distance of a journey ending at the station
- Top 5 most popular return stations for journeys starting from the station
- Top 5 most popular departure stations for journeys ending at the station

I also tried to get station location on map with Google Maps Platform, but could not get it to work to save my life (code is still up and commented in the project).

#### Journeys

This view shows a list of journeys presented as a datable. Journyes are fetched as needed from the backend/database.
<br>
Features:

- Pagination, every page has the data of 100 journeys
- Searching, journeys can be searched with the departure or return station name
  - Only searches data shown on page
  - Searching happens on change, so even writing one letter makes a search
- All the table columns are sortable, in ascending or descending order
  - Little arrow showing current sorting for clarity

### Final thoughts

Overall I am pretty happy on the end result. Of course there are things that could have been done differently, even better, but for being the most broad fullstack project I have done, I am satisfied. Many new skills learned and received more experince on old ones, so that is a victory on my book.
<br>
<br>
Thank you for reading and being interested!

