import { Injectable } from '@angular/core';
import { SkillModel, Dictionary } from '../models';
import { SkillInfoDialog } from '../pages/skill-info-dialog/skill-info-dialog';
import { MatDialogRef, MatDialog } from '@angular/material';

const SKILLS_DICTIONARY: Dictionary<SkillModel> = require('../data/skills/skills.json');
const SKILLS_BY_CATEGORIES: SkillModel[][] = require('../data/skills/skill_categories.json'); // indexed by CATEGORIES

const MAX_SKILLS_BY_CATEGORIES: SkillModel[][] = require('../data/skills/max_tier_skills_by_categories.json');

const REFINE_SKILLS: Dictionary<SkillModel[]> = require('../data/skills/refine_skill_data.json');

const CATEGORIES = ["weapon", "assist", "special", "a", "b", "c", "s", "refine", "beast"]; // index of categories in SKILLS_BY_CATEGORIES

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skillDialog: MatDialogRef<SkillInfoDialog>;

  constructor(public dialog: MatDialog) { }

  getAllSkills = (): Dictionary<SkillModel> => {
    return SKILLS_DICTIONARY;
  }

  getAllSkillCategories = (): SkillModel[][] => {
    return SKILLS_BY_CATEGORIES;
  }

  getAllMaxSkillsCategories = (): SkillModel[][] => {
    return MAX_SKILLS_BY_CATEGORIES;
  }

  getSkillById = (id: string): SkillModel => {
    return SKILLS_DICTIONARY[id];
  }

  getAllSkillsInCategory = (category: string): SkillModel[] => {
    return SKILLS_BY_CATEGORIES[CATEGORIES.indexOf(category)];
  }

  getAllMaxSkillsInCategory = (category: string): SkillModel[] => {
    return MAX_SKILLS_BY_CATEGORIES[CATEGORIES.indexOf(category)];
  }

  getRefinesById = (id: string): SkillModel[] => {
    return REFINE_SKILLS[id];
  }

  getAllRefines = (): Dictionary<SkillModel[]> => {
    return REFINE_SKILLS;
  }

  getBaseForm = (refine_id: string): SkillModel => {
    return SKILLS_DICTIONARY[SKILLS_DICTIONARY[refine_id].base];
  }

  openSkillDialog(skill: SkillModel): MatDialogRef<SkillInfoDialog>{
    return this.dialog.open(SkillInfoDialog, {
      width: '50%',
      height: '50%',
      data: skill
    });
  }
}
