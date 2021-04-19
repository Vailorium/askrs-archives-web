import { SkillModel } from "..";

// Build Data for App
export interface BuildModel{
    buildName?: string;
    userName?: string; //! Never return UserID, always userName even if userName can change
    buildId?: number;
    unitId: string; // unit PID
    visible?: boolean;
    rarity: number;
    merges: number;
    skills: { weapon?: SkillModel, assist?: SkillModel, special?: SkillModel, a?: SkillModel, b?: SkillModel, c?: SkillModel, s?: SkillModel};
    resplendent: boolean;
    ivs: {boon: number, bane: number};
    dragonflowers: number;
    blessing: number;
    allySupport: {rank: number, allyUnitId?: string};
    summonerSupport: number;
};