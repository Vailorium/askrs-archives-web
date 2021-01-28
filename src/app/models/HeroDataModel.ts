import { Stats } from '.';
import { Blessings, HeroAvailability, HeroRarity, MovementType, Origin, WeaponType } from './';

// Model for grabbing data from JSON files
export interface HeroDataModel{
    name: string;
    title: string;
    id: string;
    image: string;
    max_dragonflowers: number;
    base_stats: Stats;
    growth_rates: Stats;
    blessing_bonus: Stats;
    blessing: number;
    resplendent: boolean;
    movement_type: number;
    unit_type: number;
    availability: HeroAvailability;
    skills: string[][];
    game: number[];
    refresher: boolean;
    pair_up: boolean;
    ar_extra: boolean;
    special_kind: number;
}