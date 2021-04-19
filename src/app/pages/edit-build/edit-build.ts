import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Blessing, Dictionary, HeroDataModel, IVS, SkillModel, Stats } from 'src/app/models';
import { BuildModel } from 'src/app/models';
import { ARHeroInfoModel } from 'src/app/models';
import { SkillsService } from 'src/app/services/skills.service';
import { StatsCalcualator } from 'src/app/services/stats-calculator.service';
import { UnitFinderService } from 'src/app/services/unit-finder.service';

@Component({
    selector: 'app-edit-build',
    templateUrl: './edit-build.html',
    styleUrls: ['./edit-build.scss']
})
export class EditBuild implements OnInit, AfterViewInit{

    @Input() public heroData: ARHeroInfoModel;
    @Input() public settings: {heroEnabled: boolean, blessingEnabled: boolean, summonerSupportEnabled: boolean, allySupportEnabled: boolean} = {heroEnabled: true, blessingEnabled: true, summonerSupportEnabled: true, allySupportEnabled: true};
    @Output() public heroDataChange = new EventEmitter<ARHeroInfoModel>();

    dragonflowers: number[];

    hero_name_filter: FormControl = new FormControl();
    weapon_name_filter: FormControl = new FormControl();
    assist_name_filter: FormControl = new FormControl();
    special_name_filter: FormControl = new FormControl();
    a_name_filter: FormControl = new FormControl();
    b_name_filter: FormControl = new FormControl();
    c_name_filter: FormControl = new FormControl();
    seal_name_filter: FormControl = new FormControl();

    units: HeroDataModel[];

    unitsDic: Dictionary<HeroDataModel>;

    heroBuild: FormGroup;

    BlessingEnum = Blessing;

    IVEnum = IVS;

    skills: SkillModel[][];

    refines: SkillModel[] = [];

    stats: Stats;

    rarities = [[], [], [], ["bronze", "bronze", "bronze"], ["silver", "silver", "silver", "silver"], ["gold", "gold", "gold", "gold", "gold"]];


    constructor(private unitFinder: UnitFinderService, private fb: FormBuilder, private skill: SkillsService, public statCalculator: StatsCalcualator){
        this.skills = JSON.parse(JSON.stringify(this.skill.getAllMaxSkillsCategories())); //.map(a => a.sort((x, y) => x.name < y.name ? -1 : 0));
        for(let i = 0; i < this.skills.length; i++){
            this.skills[i] = this.skills[i].sort((x, y) => x.name < y.name ? -1 : 0);
        }
        this.skills[0] = this.skills[0].filter(a => !a.refined);

        this.units = Object.assign([], this.unitFinder.getHeroList()).sort((a,b) => {if(a.id < b.id){return -1;}return 0;});
        this.unitsDic = this.unitFinder.getHeroDictionary();
    }

    ngOnInit(){
        this.stats = this.statCalculator.calculateAllStats(this.heroData);

        this.dragonflowers = Array(this.heroData.max_dragonflowers + 1).fill(0).map((x, i) => i);
        this.heroBuild = this.fb.group({
            hero: [{value: this.heroData.id, disabled: !this.settings.heroEnabled}, Validators.required],
            merges: [this.heroData.build.merges, Validators.required],
            rarity: [this.heroData.build.rarity, Validators.required],
            dragonflowers: [this.heroData.build.dragonflowers, Validators.required],
            resplendent: [{value: this.heroData.build.resplendent, disabled: !this.heroData.resplendent}, Validators.required],
            blessing: [{value: this.heroData.blessing === 0 ? this.heroData.build.blessing : this.heroData.blessing, disabled: (!this.settings.blessingEnabled || this.heroData.blessing !== 0)}, Validators.required],
            boon: [this.heroData.build.ivs.boon, Validators.required],
            bane: [{value: this.heroData.build.ivs.bane, disabled: this.heroData.build.merges > 0}, Validators.required],
            weapon: [this.heroData.build.skills.weapon ? (this.heroData.build.skills.weapon.refined ? this.skill.getBaseForm(this.heroData.build.skills.weapon.id).id : this.heroData.build.skills.weapon.id) : null],
            refine: [{value: this.heroData.build.skills.weapon ? (this.heroData.build.skills.weapon.refined ? this.heroData.build.skills.weapon.id : null) : null, disabled: this.refines.length === 0}],
            assist: [this.heroData.build.skills.assist ? this.heroData.build.skills.assist.id : null],
            special: [this.heroData.build.skills.special ? this.heroData.build.skills.special.id : null],
            a: [this.heroData.build.skills.a ? this.heroData.build.skills.a.id : null],
            b: [this.heroData.build.skills.b ? this.heroData.build.skills.b.id : null],
            c: [this.heroData.build.skills.c ? this.heroData.build.skills.c.id : null],
            seal: [this.heroData.build.skills.s ? this.heroData.build.skills.s.id : null],
        });
        this.updateRefines();
        this.heroBuild.patchValue({blessing: this.heroData.blessing === 0 ? this.heroData.build.blessing : this.heroData.blessing});
        this.heroBuild.valueChanges.subscribe((data) => {
            data = this.heroBuild.getRawValue();
            let build: BuildModel = {unitId: "", allySupport: {rank: 0}, summonerSupport: 0, rarity: data.rarity, merges: data.merges, resplendent: data.resplendent, ivs: {boon: data.boon, bane: data.bane}, dragonflowers: data.dragonflowers, blessing: data.blessing, skills: {weapon: data.refine ? this.skill.getSkillById(data.refine) : this.skill.getSkillById(data.weapon), assist: this.skill.getSkillById(data.assist), special: this.skill.getSkillById(data.special), a: this.skill.getSkillById(data.a), b: this.skill.getSkillById(data.b), c: this.skill.getSkillById(data.c), s: this.skill.getSkillById(data.seal)}};
            let uid = this.heroData.uid;
            this.heroData = {...this.unitsDic[data.hero], uid: uid, build: build};

            this.stats = this.statCalculator.calculateAllStats(this.heroData);
            this.heroDataChange.emit(this.heroData);
        });
    }

    ngAfterViewInit(){

    }

    updateMerges(){
        if(this.heroBuild.value['merges'] > 0){
            this.heroBuild.patchValue({bane: 0});
            this.heroBuild.get('bane').disable();
        } else {
            this.heroBuild.get('bane').enable();
        }
    }
    
    updateRefines(){
        if(this.heroBuild.value['weapon']){
            if(this.heroBuild.value['refine']){
                if(this.heroBuild.value['weapon'] !== this.skill.getBaseForm(this.heroBuild.value['refine'])){
                    this.heroBuild.patchValue({refine: null})
                }
            }
            this.refines = this.skill.getRefinesById(this.heroBuild.value['weapon']);
            if(this.refines){
                if(this.refines.length > 0){
                    this.heroBuild.get('refine').enable();
                    return;
                }
                this.heroBuild.get('refine').disable();
            }
            this.heroBuild.get('refine').disable();
        }
    }
    
}