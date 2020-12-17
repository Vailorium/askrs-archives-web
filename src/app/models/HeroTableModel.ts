import { MovementType } from '.';
import { WeaponType, HeroRarity, HeroAvailability, Origin } from './';

export interface HeroTableModel{
    name: string;
    title: string;
    id: string;
    movement_type: number;
    unit_type: number;
    rarity: HeroRarity
    availability: HeroAvailability;
    game: number[];
    refresher: boolean;
}