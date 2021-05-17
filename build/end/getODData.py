import json


if __name__ == '__main__':
    with open('../data/hour.json', 'r', encoding='utf8') as file:
        hours = json.load(file)
    with open('../data/stations.json', 'r', encoding='utf8') as file:
        stations = json.load(file)
    routes = [1, 2, 3, 4, 5, 10, 11, 12]
    hours_list = ['00', "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    stations_by_select = {
        route: [p['station'] for p in stations if p['route'] == route] for route in routes
    }
    final = {}
    print(stations_by_select)
    c = 0
    for month in hours:
        # break
        for day in hours[month]:
            final['2020-' + month + '-' + day] = {
                station: {'top': [0] * 24, 'bottom': [0] * 24}
                for route in routes for station in stations_by_select[route]
            }
            for hour in hours[month][day]:
                # trips = hours[month][day][hour]
                c -= len(hours[month][day][hour])
                for trip in hours[month][day][hour]:
                    if trip['route'][0] == trip['route'][1]:
                        if not trip['in_station_name'] in stations_by_select[trip['route'][1]] or not trip['out_station_name'] in stations_by_select[trip['route'][1]]:
                            # print('not', trip['in_station_name'], trip['out_station_name'] )
                            c += 1
                            continue
                        in_index, out_index = stations_by_select[trip['route'][1]].index(trip['in_station_name']), stations_by_select[trip['route'][1]].index(trip['out_station_name'])
                        if -1 in [in_index, out_index]:
                            # print('-1')
                            c += 1
                            continue
                        direction = 'top' if in_index > out_index else 'bottom'
                        start, end = min([in_index, out_index]), max([in_index, out_index])
                        for i in range(start, end+1):
                            final['2020-' + month + '-' + day][stations_by_select[trip['route'][1]][i]][direction][int(hour)] += 1
    print(c)
    with open('../data/ODData.json', 'w', encoding='utf8') as file:
        json.dump(final, file)