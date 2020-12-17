import { Dictionary } from '.';
import { HeroModel } from './HeroModel';

export class SkillModel{
    name: string;
    description: string;
    image: string;
    id: string;
    fodder: string[][];
    inheritable: boolean;
    refined: boolean;
    might: number;
    restrictedTo: {moveType: number[], weaponType: number[]};
    sp: number;
    score: number;
    cooldown: number; // for special skills only
    stats: Dictionary<number>;
}