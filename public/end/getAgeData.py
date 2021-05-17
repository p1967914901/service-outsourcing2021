import json

def handle_month():
    with open('./data/month.json', 'r', encoding='utf8') as file:
        days = json.load(file)
    # ages = [2021 - int(trip['year_of_birth']) for month in days for day in days[month] for trip in days[month][day]]
    final = {}
    for month in days:
        final[month] = [{'name': '少儿', 'value': 0},{'name': '青少年', 'value': 0},{'name': '青年', 'value': 0},{'name': '中年', 'value': 0},{'name': '老年', 'value': 0}]
        final[month] = {}
        for trip in days[month]:
            if not trip['in_station_name'] in final[month]:
                final[month][trip['in_station_name']] = {
                    'in': [{'name': '少儿', 'value': 0},{'name': '青少年', 'value': 0},{'name': '青年', 'value': 0},{'name': '中年', 'value': 0},{'name': '老年', 'value': 0}],
                    'out': [{'name': '少儿', 'value': 0},{'name': '青少年', 'value': 0},{'name': '青年', 'value': 0},{'name': '中年', 'value': 0},{'name': '老年', 'value': 0}]
                }
            if not trip['out_station_name'] in final[month]:
                final[month][trip['out_station_name']] = {
                    'in': [{'name': '少儿', 'value': 0},{'name': '青少年', 'value': 0},{'name': '青年', 'value': 0},{'name': '中年', 'value': 0},{'name': '老年', 'value': 0}],
                    'out': [{'name': '少儿', 'value': 0},{'name': '青少年', 'value': 0},{'name': '青年', 'value': 0},{'name': '中年', 'value': 0},{'name': '老年', 'value': 0}]
                }
            index = 0
            if 7 <= 2021 - int(trip['year_of_birth']) <= 12:
                index = 0
            elif 13 <= 2021 - int(trip['year_of_birth']) <= 17:
                index = 1
            elif 18 <= 2021 - int(trip['year_of_birth']) <= 45:
                index = 2
            elif 46 <= 2021 - int(trip['year_of_birth']) <= 69:
                index = 3
            elif 70 <= 2021 - int(trip['year_of_birth']):
                index = 4
            final[month][trip['in_station_name']]['in'][index]['value'] += 1
            final[month][trip['out_station_name']]['out'][index]['value'] += 1
    with open('./data/ages_month.json', 'w', encoding='utf8') as file:
        json.dump(final, file)

if __name__ == '__main__':
    handle_month()