import { Injectable } from '@angular/core';
import { Dictionary, ARTile } from '../models';

const AR_MAPS: Dictionary<ARTile[]> = require('../data/maps/AR.json');

@Injectable({
    providedIn: 'root'
})
export class MapFinderService {
    constructor(){}

    public getARMaps = (): Dictionary<ARTile[]> => {
        return AR_MAPS;
    }

    public getARMapById = (id: string): ARTile[] => {
        return AR_MAPS[id];
    }
}