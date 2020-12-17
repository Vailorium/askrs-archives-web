import json

hero_data = []

with open('NEW_UNIT_DATA.json') as json_file:
    dum = json.load(json_file)
    for item in dum:
        hero_data.append({
            'name': item['name'],
            'title': item['title'],
            'id': item['id'],
            'movement_type': item['movement_type'],
            'unit_type': item['unit_type'],
            'rarity': item['rarity'],
            'availability': item['availability'],
            'game': item['game'],
            'referesher': item['refresher']
        })

with open('hero_data.json', 'w') as outfile:
    json.dump(hero_data, outfile)
