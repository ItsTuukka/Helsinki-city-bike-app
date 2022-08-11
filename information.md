# Information about the project

This file contains some information and thoughts about the project.

## Data from files to database

In the backend/data folder there is a python script get_data.py that gets data from 4 .csv files. It then transforms and validates that data and sends it to a database.
The database in question being MongoDB. The free version of MongoDB could only hold 1.8 million journyes from the original 3.1 million.
<br>
<br>
Since from the start I planned on not doing endpoints for adding new stations or journyes, so I made the decision to do calculations for the addition information about a single station in the script. This approach has upsides and downsides.
