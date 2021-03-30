import { SkillModel } from '../skill/SkillModel';

export interface ARBuildModel{
    rarity: number;
    merges: number;
    skills: { weapon?: SkillModel, assist?: SkillModel, special?: SkillModel, a?: SkillModel, b?: SkillModel, c?: SkillModel, s?: SkillModel};
    resplendent: boolean;
    ivs: {boon: number, bane: number};
    dragonflowers: number;
    blessing: number;
}