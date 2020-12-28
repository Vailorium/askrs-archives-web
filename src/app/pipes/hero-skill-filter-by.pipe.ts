import { Pipe, PipeTransform } from '@angular/core';
import { SkillModel } from '../models';
import { UnitFinderService } from '../services/unit-finder.service';

@Pipe({
  name: 'heroSkillFilterBy'
})
export class HeroSkillFilterByPipe implements PipeTransform {

  unit: UnitFinderService = new UnitFinderService();

  transform(arr: SkillModel[], heroId: string): any {
    let hero = this.unit.getHeroById(heroId);
    if(!hero){
      return [];
    }
    return arr.filter((x) => { 
      return (x.inheritable &&                                    // if the skill is inheritable
        x.restrictedTo.moveType.includes(hero.movement_type) &&   // and the hero has the correct move type to inherit it
        x.restrictedTo.weaponType.includes(hero.unit_type)) ||    // and the hero has the correct weapon type to inherit it
        x.fodder.filter((y) => y.includes(heroId)).length > 0     // or if the hero is in the fodder list (i.e. for exclusive skills like "raging storm")
    });
  }

}
