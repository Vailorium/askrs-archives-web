import { Injectable } from '@angular/core';
import { Dictionary, ARTile } from '../models';

const AR_MAPS: Dictionary<ARTile[]> = require('../data/maps/AR.json');

@Injectable({
    providedIn: 'root'
})
export class MapFinderService {
    constructor(){}

    private maps: string[] = ["springwater", "wintry", "abandoned_castle", "snowdust", "desert", "spring_breeze", "leafy_canopy", "lost_castle", "bright_grassland", "lava_floes"];
    private mapDisplay: Dictionary<string> = {"springwater": "Springwater", "wintry": "Wintry", "abandoned_castle": "Abandoned Castle", "snowdust": "Snowdust", "desert": "Desert", "spring_breeze": "Spring Breeze", "leafy_canopy": "Leafy Canopy", "lost_castle": "Lost Castle", "bright_grassland": "Bright Grassland", "lava_floes": "Lava Floes"};


    public getARMaps = (): Dictionary<ARTile[]> => {
        return AR_MAPS;
    }

    public getARMapById = (id: string): ARTile[] => {
        return AR_MAPS[id];
    }

    public getMapIds = (): string[] => {
        return this.maps;
    }

    public getMapDisplayNames = (): Dictionary<string> => {
        return this.mapDisplay;
    }
}