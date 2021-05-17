import json

def getStations():
    with open('./data/stations.json', 'r', encoding='utf8') as file:
        stations = json.load(file)
    return [p['station'] for p in stations]

def getRoute():
    with open('./data/stations.json', 'r', encoding='utf8') as file:
        stations = json.load(file)
    return [str(p['route']) for p in stations]

def find():
    with open('./data/month.json', 'r', encoding='utf8') as file:
        months = json.load(file)
    stations = getStations()
    trips = [trip for month in months for trip in months[month]]
    for s in stations:
        for trip in trips:
            if trip['in_station_name'] == s or trip['out_station_name'] == s:
                break
        else:
            print(s)

def getAge():
    with open('./data/month.json', 'r', encoding='utf8') as file:
        months = json.load(file)
    min_year = min([int(trip['year_of_birth']) for month in months for trip in months[month]])
    max_year = max([int(trip['year_of_birth']) for month in months for trip in months[month]])
    print(json.dumps([str(i) for i in range(min_year, max_year+1)]))




if __name__ == '__main__':
    # print(json.dumps(getStations()))
    # print(json.dumps(list(set(getRoute()))))
    # getAge()
    data = {
        "1": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        "2": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
        "3": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        "4": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        "5": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        "6": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        "7": ['无', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    }
    print(json.dumps(data))