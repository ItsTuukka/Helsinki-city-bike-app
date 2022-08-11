# Information about the project

This file contains some information and thoughts about the project.

## Data from files to database

In the backend/data folder there is a python script get_data.py that gets data from 4 .csv files (which are too big for github). It then transforms and validates that data and sends it to a database.
The database in question being MongoDB. The free version of MongoDB could only hold 1.8 million journyes from the original 3.1 million.
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

## Backend

The backend uses Node.js and Express for the server side and Mongoose is used to interact with the MongoDB database.
<br>
Being such a simple backend and having so little routes, I left it all in the index.js file and decided not to refactoring.
<br>
<br>
The backend is hosted in the cloud via Heroku service at https://citybike-app.herokuapp.com/ (api/stations or api/journeys). With the right id there is also a single station/journey view.

## Frontend

Frontend is a react-app, done with React.js and Javascript in combination with some addtional libraries.
<br>
There are also e2e test with cypress, more on those in the README.md
