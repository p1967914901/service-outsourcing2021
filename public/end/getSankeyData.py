import json

def handle_month():
    with open('./data/month.json', 'r', encoding='utf8') as file:
        months = json.load(file)
    colors = {
        "0": 'rgb(255,166,192)', "1": 'rgb(147,254,225)', "2": 'rgb(254,253,160)',
        "3": 'rgb(252,206,16)', "4": 'rgb(46,199,201)', "5": 'rgb(232,124,37)',
        "10": 'rgb(193,35,43)', "11": 'rgb(43,130,29)', "12": 'rgb(230,105,34)'
    }
    final = {}
    for month in months:
        routes = [trip['route'] for trip in months[month]]
        data, his, links, links_his = [], [], [], []
        for route in routes:
            if not route[0] in his:
                his.append(route[0])
                data.append({
                    'name': '线路' + str(route[0]),
                    'itemStyle': {
                        'color': colors[str(route[0])],
                    }
                })
                data.append({
                    'name': '线路' + str(route[0]) + ' ',
                    'itemStyle': {
                        'color': colors[str(route[0])],
                    }
                })
            if not route[1] in his:
                his.append(route[1])
                data.append({
                    'name': '线路' + str(route[1]),
                    'itemStyle': {
                        'color': colors[str(route[1])],
                    }
                })
                data.append({
                    'name': '线路' + str(route[1]) + ' ',
                    'itemStyle': {
                        'color': colors[str(route[1])],
                    }
                })
            if not (route[0], route[1]) in links_his:
                links_his.append((route[0], route[1]))
                links.append({
                    'source': '线路' + str(route[0]),
                    'target': '线路' + str(route[1]) + ' ',
                    'value': 1
                })
            else:
                for link in links:
                    if link['source'] == '线路' + str(route[0]) and link['target'] == '线路' + str(route[1]) + ' ':
                        link['value'] += 1
                        break
        final[month] = {
            'data': data,
            'links': links
        }
    with open('./data/sankey_month.json', 'w', encoding='utf8') as file:
        json.dump(final, file)


def handle_day():
    with open('./data/day.json', 'r', encoding='utf8') as file:
        months = json.load(file)
    colors = {
        "0": 'rgb(255,166,192)', "1": 'rgb(147,254,225)', "2": 'rgb(254,253,160)',
        "3": 'rgb(252,206,16)', "4": 'rgb(46,199,201)', "5": 'rgb(232,124,37)',
        "10": 'rgb(193,35,43)', "11": 'rgb(43,130,29)', "12": 'rgb(230,105,34)'
    }
    final = {}
    for month in months:
        final[month] = {}
        # print('month', month)
        for day in months[month]:
            # print('day', day)
            routes = [trip['route'] for trip in months[month][day]]
            data, his, links, links_his = [], [], [], []
            for route in routes:
                if route[0] == 0 or route[1] == 0:
                    print('*******************************')
                    break
                if not route[0] in his:
                    his.append(route[0])
                    data.append({
                        'name': '线路' + str(route[0]),
                        'itemStyle': {
                            'color': colors[str(route[0])],
                        }
                    })
                    data.append({
                        'name': '线路' + str(route[0]) + ' ',
                        'itemStyle': {
                            'color': colors[str(route[0])],
                        }
                    })
                if not route[1] in his:
                    his.append(route[1])
                    data.append({
                        'name': '线路' + str(route[1]),
                        'itemStyle': {
                            'color': colors[str(route[1])],
                        }
                    })
                    data.append({
                        'name': '线路' + str(route[1]) + ' ',
                        'itemStyle': {
                            'color': colors[str(route[1])],
                        }
                    })
                if not (route[0], route[1]) in links_his:
                    links_his.append((route[0], route[1]))
                    links.append({
                        'source': '线路' + str(route[0]),
                        'target': '线路' + str(route[1]) + ' ',
                        'value': 1
                    })
                else:
                    for link in links:
                        if link['source'] == '线路' + str(route[0]) and link['target'] == '线路' + str(route[1]) + ' ':
                            link['value'] += 1
                            break
            final[month][day] = {
                'data': data,
                'links': links
            }
    # with open('./data/sankey_day.json', 'w', encoding='utf8') as file:
    #     json.dump(final, file)

if __name__ == '__main__':
    # handle_month()
    handle_day()
    pass