import { Component, Input, OnInit } from '@angular/core';
import { SkillModel } from 'src/app/models';
import { SkillsService } from 'src/app/services/skills.service';
import { UnitFinderService } from 'src/app/services/unit-finder.service';

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit {

  @Input() data: SkillModel;

  refines: SkillModel[];

  hasFodder: boolean;
  
  constructor(private skills: SkillsService, public units: UnitFinderService) {

  }

  ngOnInit() {
    if(this.data.might > 0){
      this.refines = this.getRefines();
    }

    this.hasFodder = this.data.fodder.filter((item) => item.length > 0).length > 0;
  }

  getRefines = (): SkillModel[] => {
    return this.skills.getRefinesById(this.data.id);
  }

}
