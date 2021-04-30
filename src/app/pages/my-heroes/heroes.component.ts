import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { BuildModel, HeroInfoModel } from 'src/app/models';
import { BuildService } from 'src/app/services/build-service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public builds: HeroInfoModel[] = [];

  public time = new Date().getTime();

  filter: FormControl = new FormControl('');
  constructor(private buildService: BuildService, private dialog: MatDialog) {
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

  deleteBuild(buildIndex: number){
    let confirm = this.dialog.open(ConfirmDialog, {data: {message: "Are you sure you want to delete this build?", title: "Confirm Clearing", default: false, options: [{display: "Cancel", color: "", value: false}, {display: "Clear", color: "warn", value: true}]}});
  
    confirm.afterClosed().subscribe((res: boolean) => {
      if(res === true){
        // Delete via API
        // .then()
        this.builds.splice(buildIndex, 1);
      }
    });
  }

}
