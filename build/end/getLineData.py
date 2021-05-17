import json


if __name__ == '__main__':
    List = {
        "1": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        "2": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"],
        "3": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        "4": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
        "5": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        "6": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
        "7": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
    }
    stations = ["Sta104", "Sta65", "Sta49", "Sta149", "Sta74", "Sta128", "Sta34", "Sta106", "Sta110", "Sta97", "Sta80", "Sta89", "Sta150", "Sta154", "Sta107", "Sta83", "Sta108", "Sta159", "Sta1", "Sta51", "Sta105", "Sta24", "Sta139", "Sta71", "Sta57", "Sta76", "Sta52", "Sta68", "Sta151", "Sta48", "Sta27", "Sta81", "Sta127", "Sta123", "Sta47", "Sta18", "Sta79", "Sta78", "Sta53", "Sta163", "Sta9", "Sta129", "Sta155", "Sta143", "Sta156", "Sta61", "Sta50", "Sta119", "Sta66", "Sta12", "Sta161", "Sta21", "Sta133", "Sta22", "Sta138", "Sta41", "Sta30", "Sta67", "Sta144", "Sta5", "Sta98", "Sta143", "Sta29", "Sta126", "Sta40", "Sta131", "Sta39", "Sta100", "Sta167", "Sta113", "Sta141", "Sta142", "Sta156", "Sta158", "Sta44",
        "Sta117", "Sta147", "Sta42", "Sta35", "Sta109", "Sta33", "Sta112", "Sta153", "Sta121", "Sta125", "Sta11", "Sta38", "Sta58", "Sta165", "Sta62", "Sta19", "Sta59", "Sta84", "Sta54", "Sta69", "Sta16", "Sta37", "Sta132", "Sta96", "Sta100", "Sta43", "Sta157", "Sta114", "Sta168", "Sta135", "Sta134", "Sta85", "Sta2", "Sta4", "Sta103", "Sta88", "Sta162", "Sta94", "Sta106", "Sta7", "Sta6", "Sta8", "Sta75", "Sta102", "Sta28", "Sta124", "Sta99", "Sta166", "Sta36", "Sta122", "Sta77", "Sta140", "Sta111", "Sta13", "Sta170", "Sta55", "Sta20", "Sta23", "Sta56", "Sta118", "Sta115", "Sta86", "Sta46", "Sta63", "Sta3", "Sta25", "Sta146", "Sta130", "Sta120", "Sta82", "Sta164", "Sta152", "Sta45", "Sta73", "Sta14", "Sta137", "Sta136", "Sta101", "Sta17", "Sta26", "Sta90", "Sta95", "Sta72", "Sta93", "Sta31", "Sta92", "Sta116", "Sta32", "Sta91", "Sta60", "Sta148"
    ]
    xs = [month + '月' + day + '日' for month in List for day in List[month]]
    print(len(xs))
    with open('./data/day.json', 'r', encoding='utf8') as file:
        days = json.load(file)
    final = {p: [0] * len(xs) for p in stations}
    for month in List:
        for day in List[month]:
            day_str = day if int(day) >= 10 else '0' + day
            if day_str in days['0' + month]:
                for trip in days['0' + month][day_str]:
                    index = xs.index(month + '月' + day + '日')
                    if trip['in_station_name'] in stations:
                        final[trip['in_station_name']][index] += 1
                    else:
                        print('not have', trip['in_station_name'])
                    if trip['out_station_name'] in stations:
                        final[trip['out_station_name']][index] += 1
                    else:
                        print('not have', trip['out_station_name'])
            else:
                print('not have', day_str, '************************')
    with open('./data/linesData.json', 'w', encoding='utf8') as file:
        json.dump(final, file)


        