import csv
import pymongo
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

journey_files = ['2021-05.csv', '2021-06.csv', '2021-07.csv']
station_file = 'asemat.csv'

journeys = []
stations = []

def main():
    dbname = get_database()
    get_journey_data(journey_files)
    get_station_data(station_file)
    send_station_data(dbname)
    send_journey_data(dbname)

def send_journey_data(dbname):
    collection_name = dbname['journeys']
    for i in range(0, len(journeys), 10000):
        try:
            collection_name.insert_many(journeys[i:i+10000])
        except:
            print('database memory full')
            break

def send_station_data(dbname):
    collection_name = dbname['stations']
    collection_name.insert_many(stations)

def get_database():
    CONNECTION_STRING=os.environ.get('MONGODB_URL')
    client = pymongo.MongoClient(CONNECTION_STRING)
    return client['bikeApp']

def get_journey_data(files):
    for filename in files:
        with open(filename) as csv_file:
            csvreader = csv.reader(csv_file)
            row_number = 0
            for row in csvreader:
                if row_number == 0:
                    row_number += 1
                    continue
                add_journey(row)
def add_journey(row):
    for value in row:
        if value == '':
            return
    if float(row[6]) >= 10 and float(row[7]) >= 10:
        journey = {
            'departureTime' : row[0],
            'returnTime' : row[1],
            'departureStationId' : row[2],
            'departureStationName' : row[3],
            'returnStationId' : row[4],
            'returnStationName' : row[5],
            'distance' : round((float(row[6]) / 1000), 2),
            'duration' : round((float(row[7]) / 60), 2)
        }
        journeys.append(journey)

def get_station_data(filename):
    with open(filename) as csv_file:
        csvreader = csv.reader(csv_file)
        row_number = 0
        for row in csvreader:
            if row_number == 0:
                row_number += 1
                continue
            add_station(row)

def add_station(row):
    details = get_station_details(row[2])
    if row[7] == ' ':
        kaupunki = 'Helsinki'
        stad = 'Helsingfors'
    else:
        kaupunki = row[7]
        stad = row[8]
    station = {
        'nimi' : row[2],
        'namn' : row[3],
        'name ': row[4],
        'osoite' : row[5], 
        'address': row[6],
        'kaupunki' : kaupunki,
        'stad' : stad,
        'x' : float(row[11]),
        'y' : float(row[12]),
        'journeysFrom' : details[0],
        'journeysTo' : details[1],
        'avgDistanceFrom' : details[2],
        'avgDistanceTo' : details[3],
        'mostPopularReturnStations': details[4],
        'mostPopularDepartureStations': details[5]
    }
    stations.append(station)

def get_station_details(name):
    if name == 'Aalto-yliopisto (M), Tietot':
        name = 'Aalto-yliopisto (M), Tietotie'
    if name == 'Aalto-yliopisto (M), Korkea':
        name = 'Aalto-yliopisto (M), Korkeakouluaukio'
    journyes_from = 0
    journyes_to = 0
    distance_from = 0
    distance_to = 0
    return_stations = []
    departure_stations = []
    for j in journeys:
        if j['departureStationName'] == name:
            journyes_from += 1
            distance_from += j['distance']
            return_stations.append(j['returnStationName'])
        if j['returnStationName'] == name:
            journyes_to += 1
            distance_to += j['distance']
            departure_stations.append(j['departureStationName'])
    try:
        avg_distance_from = distance_from / journyes_from
    except:
        avg_distance_from = 0
    try:
        avg_distance_to = distance_to / journyes_to
    except:
        avg_distance_to = 0
    most_popular_return_stations = sorted(set(return_stations), reverse=True)
    most_popular_departure_stations = sorted(set(departure_stations), reverse=True)
    return (journyes_from, journyes_to, 
            round(avg_distance_from, 2), round(avg_distance_to, 2), 
            most_popular_return_stations[:5], 
            most_popular_departure_stations[:5])

main()