import { Injectable } from '@angular/core';
import { HeroModel, HeroTableModel, Dictionary, HeroDataModel } from '../models';

const HERO_LIST: HeroDataModel[] = require('../data/units/hero_list.json');

const HERO_DICTIONARY: Dictionary<HeroDataModel> = require('../data/units/hero_dictionary.json');

@Injectable({
  providedIn: 'root'
})
export class UnitFinderService {

  constructor() { }

  public getHeroList(): HeroDataModel[]{
    return HERO_LIST; //! Most Recent Version
  }

  public getHeroDictionary(): Dictionary<HeroDataModel>{
    return HERO_DICTIONARY; //! Most Recent Version
  }

  public getHeroById(id: string): HeroDataModel{
    return HERO_DICTIONARY[id]; //! Most Recent Version
  }

  public getUnitNameById(id: string): string {
    return this.getHeroById(id).name; //! Most Recent Version
  }

  public getUnitTitleById(id: string): string {
    return this.getHeroById(id).title; //! Most Recent Version
  }
}
