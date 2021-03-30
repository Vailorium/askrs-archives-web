import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BuildModel, HeroInfoModel } from 'src/app/models';
import { BuildService } from 'src/app/services/build-service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public builds: HeroInfoModel[] = [];

  filter: FormControl = new FormControl('');
  constructor(private buildService: BuildService) {
    this.builds = this.buildService.convertFromAPIBuilds([{buildName: "Test", unitId: "PID_マルス", visible: false, rarity: 5, merges: 0, skills: {}, resplendent: false, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0}]);
    console.log(this.builds);
  }

  ngOnInit(): void {

  }

  getBuilds(){

  }

}
