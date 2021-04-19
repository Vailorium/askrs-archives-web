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

  public time = new Date().getTime();

  filter: FormControl = new FormControl('');
  constructor(private buildService: BuildService) {
    this.builds = this.buildService.convertFromAPIBuilds([{buildName: "Test", unitId: "PID_マルス", visible: false, rarity: 5, merges: 0, skills: {}, resplendent: false, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0},
  {buildName: "Test 2", unitId: "PID_ティアモ", visible: true, rarity: 5, merges: 0, skills: {}, resplendent: true, ivs: {boon: 0, bane: 0}, dragonflowers: 0, blessing: 0, allySupport: {rank: 0}, summonerSupport: 0}]);
    console.log(this.builds);
  }

  ngOnInit(): void {

  }

  getBuilds(){

  }

}
