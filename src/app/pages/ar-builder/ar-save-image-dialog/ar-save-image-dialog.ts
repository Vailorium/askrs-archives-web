import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ARTile, Blessing, Dictionary, HeroInfoModel, IVS, Kind, MovementType, WeaponType } from "src/app/models";
// const path = require('path');
import { join } from 'path';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HeroSkillFilterByPipe } from "src/app/pipes";
import { ChangeDetectorRef } from "@angular/core";
import { PortraitService } from "src/app/services/portrait.service";
import { StatsCalcualator } from "src/app/services/stats-calculator.service";
import { SkillsService } from "src/app/services/skills.service";
import { TitleCasePipe } from "@angular/common";
import { ThrowStmt } from "@angular/compiler";


@Component({
    selector: 'ar-save-image-dialog',
    templateUrl: './ar-save-image-dialog.html',
    styleUrls: ['./ar-save-image-dialog.scss']
})
export class ARSaveImageDialog implements AfterViewInit {
    
    private MAX_LIFT_LOSS = 100;

    // Form
    public options: FormGroup;
    
    // Vars
    private mapName: string;
    private map: ARTile[];
    private units: HeroInfoModel[];
    
    public imageData: string = "";
    
    public width: string = "402px";

    public totalWidth: number = 450;
    public totalHeight: number = 600;

    // Modal
    public loading: boolean = true;
    public loadingMessage: string = "Loading images...";
    
    // Font Fix
    public fontFix: boolean = true;

    // Images
    private canvasImages: Dictionary<HTMLImageElement> = {};
    
    // Canvas
    @ViewChild('previewCanvas') previewCanvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;
    
    constructor(private titlecase: TitleCasePipe, private skill: SkillsService, private stats: StatsCalcualator, private portrait: PortraitService, private cdr: ChangeDetectorRef, private fb: FormBuilder, public dialogRef: MatDialogRef<ARSaveImageDialog>, @Inject(MAT_DIALOG_DATA) public data: {mapName: string, map: ARTile[], units: HeroInfoModel[], season: number[]}){
        this.options = this.fb.group({
            movement: [false],
            weapons: [false],
            builds: [false],
            // season: [false],
            // lift: [false],
            mythics: [false],
            season_lift_loss: [false],
            watermark: [this.getWidth() >= 810]
        });

        // this.options.controls['builds'].valueChanges
        this.options.controls['movement'].valueChanges.subscribe(() => {
            this.clearMap();
            this.drawMap();
        });

        this.options.controls['weapons'].valueChanges.subscribe(() => {
            this.clearMap();
            this.drawMap();
        });

        this.options.controls['builds'].valueChanges.subscribe((val) => {
            if(val === true){
                this.totalWidth = 810;
                if(this.units.length === 7){
                    this.totalHeight = 700;
                }
                this.drawBuilds();
            } else {
                this.totalWidth = 450;
                if(this.units.length === 7 && this.options.value['season_lift_loss'] === false){
                    this.totalHeight = 600;
                }
                this.width = "402px";
            }
        });

        this.options.controls['mythics'].valueChanges.subscribe((val) => {

        });


        this.mapName = data.mapName;
        this.map = data.map;
        this.units = data.units;
    }
    
    async ngAfterViewInit(){
        this.ctx = this.previewCanvas.nativeElement.getContext('2d', {alpha: false});
        
        // Set Text
        this.loading = true;
        this.loadingMessage = "Loading images...";
        await this.loadAllImages();
        this.updateCanvas();
        this.loading = false;
        
        setTimeout(() => {
            this.fontFix = false;
        }, 100);
        
    }

    getImage(tile: ARTile){
        if(tile.type === "hero"){
            return this.portrait.getIcon(this.getHeroByUID(tile.uid));
        } else {
            return 'assets/'+tile.folder+'/'+tile.image+'.png';
        }
    }
    
    getHeroByUID(uid: string): HeroInfoModel{
        for(let unit of this.units){
            if(unit.uid === uid){
            return unit;
            }
        }
    }
    
    async drawStatText(i: number) {
        // HP
        this.ctx.font = "11px Fire_Emblem_Heroes_Font";
        if(this.units[i].build.ivs.boon === IVS.hp){
            this.ctx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.hp){
            this.ctx.fillStyle = "#f0a5b3";
        } else {
            this.ctx.fillStyle = "#ffffff";
        }
        this.ctx.strokeText("HP", 539, 48 + (100 * i));
        this.ctx.fillText("HP", 539, 48 + (100 * i));
        
        // ATK
        this.ctx.lineWidth = 2;
        if(this.units[i].build.ivs.boon === IVS.atk){
            this.ctx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.atk){
            this.ctx.fillStyle = "#f0a5b3";
        } else {
            this.ctx.fillStyle = "#ffffff";
        }
        this.ctx.strokeText("Atk", 539, 73 + (100 * i));
        this.ctx.fillText("Atk", 539, 73 + (100 * i));
        
        // SPD
        if(this.units[i].build.ivs.boon === IVS.spd){
            this.ctx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.spd){
            this.ctx.fillStyle = "#f0a5b3";
        } else {
            this.ctx.fillStyle = "#ffffff";
        }
        this.ctx.strokeText("Spd", 600, 73 + (100 * i));
        this.ctx.fillText("Spd", 600, 73 + (100 * i));
        
        // DEF
        if(this.units[i].build.ivs.boon === IVS.def){
            this.ctx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.def){
            this.ctx.fillStyle = "#f0a5b3";
        } else {
            this.ctx.fillStyle = "#ffffff";
        }
        this.ctx.strokeText("Def", 539, 91 + (100 * i));
        this.ctx.fillText("Def", 539, 91 + (100 * i));
        
        // RES
        if(this.units[i].build.ivs.boon === IVS.res){
            this.ctx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.res){
            this.ctx.fillStyle = "#f0a5b3";
        } else {
            this.ctx.fillStyle = "#ffffff";
        }
        this.ctx.strokeText("Res", 600, 91 + (100 * i));
        this.ctx.fillText("Res", 600, 91 + (100 * i));
        
        this.ctx.fillStyle = "#ffffff";
    }
    
    async updateCanvas(){
        this.imageData = "";
        this.cdr.detectChanges();
        
        this.ctx.clearRect(0, 0, this.previewCanvas.nativeElement.width, 600);
        
        // Builds
        if(this.options.value['builds'] === true){
            this.totalWidth = 810;
            // this.previewCanvas.nativeElement.width = 810;
            this.width = "762px";
        } else {
            this.totalWidth = 450;
            // this.previewCanvas.nativeElement.width = 450;
            this.width = "402px";
        }
        
        if(this.options.value['season_lift_loss'] === true || (this.units.length === 7 && this.options.value['builds'] === true)){
            // this.previewCanvas.nativeElement.height = 700;
            this.totalHeight = 700;
            
            this.ctx.drawImage(this.canvasImages['save_image_bg'], 0, 600);
        } else {
            this.totalHeight = 600;
            // this.previewCanvas.nativeElement.height = 600;
        }
        
        this.drawBottom();
        
        this.drawMap();
        
        
        // Builds
        if(this.options.value['builds'] === true){
            this.drawBuilds();
        }
        
        this.imageData = this.previewCanvas.nativeElement.toDataURL('image/png');
        
        this.cdr.detectChanges();
    }
    
    async loadImage(src): Promise<HTMLImageElement>{
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = src;
        });
    }
    
    getBlessing(hero: HeroInfoModel, isLarge: boolean): string{
        if(hero.blessing !== Blessing.none){
            let st = Blessing[hero.blessing];
            if(hero.pair_up === true){
                st += "_pairup";
            } else {
                if(hero.blessing_bonus.atk > 0){
                    st += "_atk";
                } else if(hero.blessing_bonus.spd > 0){
                    st += "_spd";
                } else if(hero.blessing_bonus.def > 0){
                    st += "_def";
                } else {
                    st += "_res";
                }
                
                if(hero.ar_extra === false){
                    st += "_01";
                } else {
                    st += "_02";
                }
            }
            
            if(isLarge === true){
                st += "_large.png";
            } else {
                st += "_small.png";
            }
            return st;
        } else if(hero.build.blessing !== Blessing.none){
            let st = Blessing[hero.build.blessing];
            if(hero.special_kind === Kind.duo){
                st += "_duo";
            } else if(hero.special_kind === Kind.harmonic){
                st += "_harmonized";
            } else {
                st += "_default"
            }
            if(isLarge === true){
                st += "_large.png";
            } else {
                st += "_small.png";
            }
            return st;
        }
        return "";
    }
    
    getWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
            );
    }

    calculateLiftLoss(): number{
        let max = this.MAX_LIFT_LOSS;
        let numMythics = 0;
        let numBlessed = 0;
        for(let i = 0; i < 6; i++){
            let unit = this.units[i];
            if(unit){
                if(this.data.season[0] == unit.blessing){ // == as season.value is string, unit.blessing is int
                    max -= unit.build.merges;
                    if(numMythics < 2){
                        numMythics += 1;
                    }
                } else if(unit.build.blessing == this.data.season[0]){
                    numBlessed += 1;
                }
            }
        }
        max -= numMythics * numBlessed * 5;
        return max;
    }
    
    saveImage(){
        this.previewCanvas.nativeElement.toDataURL('image/png');
    }
    
    onNoClick() {
        this.dialogRef.close();
    }
    
    close() {
        this.dialogRef.close();
    }

    private async loadAllImages(){
        this.canvasImages['save_image_bg'] = await this.loadImage('assets/ui/save_image_bg.png');
        this.canvasImages[this.mapName] = await this.loadImage(join('assets/maps/AR', this.mapName) + '.png');
        this.canvasImages['generic_weapon'] = await this.loadImage('assets/ui/generic_weapon.png');

        // Tile images
        for(let i = 0; i < this.map.length; i++){
            let img = this.map[i].image;
            if(img !== "blank" && !Object.keys(this.canvasImages).includes(img)){
                if(this.map[i].type === "hero"){
                    let hero = this.units.find(a => a.uid === this.map[i].uid);

                    // hero icon
                    this.canvasImages[img] = await this.loadImage(this.getImage(this.map[i]));
                    
                    // hero-btl icon
                    this.canvasImages[img + '-btl'] = await this.loadImage(this.portrait.getBtlDefault(hero));
                    

                    // weapon & movement icon of hero
                    if(!Object.keys(this.canvasImages).includes(MovementType[hero.movement_type])){
                        this.canvasImages[MovementType[hero.movement_type]] = await this.loadImage(join('assets/ui/movement/', MovementType[hero.movement_type]) + '.png');
                    }
                    if(!Object.keys(this.canvasImages).includes(WeaponType[hero.unit_type])){
                        this.canvasImages[WeaponType[hero.unit_type]] = await this.loadImage(join('assets/ui/weapon', WeaponType[hero.unit_type]) + '.png');
                    }

                    //skills
                    if(hero.build.skills.weapon)
                        if(!Object.keys(this.canvasImages).includes(hero.build.skills.weapon.image))
                            this.canvasImages[hero.build.skills.weapon.image] = await this.loadImage('assets/skills/' + hero.build.skills.weapon.image + '.png');
                    if(hero.build.skills.a)
                        if(!Object.keys(this.canvasImages).includes(hero.build.skills.a.image))
                            this.canvasImages[hero.build.skills.a.image] = await this.loadImage('assets/skills/' + hero.build.skills.a.image + '.png');
                    if(hero.build.skills.b)
                        if(!Object.keys(this.canvasImages).includes(hero.build.skills.b.image))
                            this.canvasImages[hero.build.skills.b.image] = await this.loadImage('assets/skills/' + hero.build.skills.b.image + '.png');
                    if(hero.build.skills.c)
                        if(!Object.keys(this.canvasImages).includes(hero.build.skills.c.image))
                            this.canvasImages[hero.build.skills.c.image] = await this.loadImage('assets/skills/' + hero.build.skills.c.image + '.png');
                    if(hero.build.skills.s)
                        if(!Object.keys(this.canvasImages).includes(hero.build.skills.s.image))
                            this.canvasImages[hero.build.skills.s.image] = await this.loadImage('assets/skills/' + hero.build.skills.s.image + '.png');
                    
                    let blessing = this.getBlessing(hero, false);
                    if(!Object.keys(this.canvasImages).includes(blessing))
                        this.canvasImages[blessing] = await this.loadImage('assets/ui/blessings/' + blessing);
                
                } else {
                    this.canvasImages[img] = await this.loadImage(join('assets/aether_raids', this.map[i].image) + '.png');
                }
            }
        }

        // Build images
        this.canvasImages['back-base'] = await this.loadImage('assets/ui/build/back-base.jpg');
        this.canvasImages['front-base'] = await this.loadImage('assets/ui/build/front-base.png');

        this.canvasImages['empty_seal'] = await this.loadImage('assets/ui/empty_seal.png');
        this.canvasImages['empty_skill'] = await this.loadImage('assets/ui/empty_skill.png');
        this.canvasImages['a_icon'] = await this.loadImage('assets/ui/a.png');
        this.canvasImages['b_icon'] = await this.loadImage('assets/ui/b.png');
        this.canvasImages['c_icon'] = await this.loadImage('assets/ui/c.png');
        this.canvasImages['s_icon'] = await this.loadImage('assets/ui/s.png');

        this.canvasImages['name_frame'] = await this.loadImage('assets/ui/build/name_frame_5.png');
    }

    private async drawMap(){
        this.ctx.drawImage(this.canvasImages[this.mapName], 0, 0);

        for(let i = 0; i < this.map.length; i++){
            if(this.map[i].image !== "blank"){
                let x = i % 6;
                let y = Math.floor(i / 6);

                let tile = this.canvasImages[this.map[i].image];
                
                this.ctx.drawImage(tile, 75 * x, 75 * y, 75, 75);
                
                // Movement and Weapon type Icons
                if(this.map[i].type === "hero"){
                    let hero = this.units.find(a => a.uid === this.map[i].uid);
                    if(this.options.value['movement'] === true){
                        this.ctx.drawImage(this.canvasImages[MovementType[hero.movement_type]], 75 * x + 48, 75 * y + 48, 25, 25);
                    }
                    if(this.options.value['weapons'] === true){                        
                        this.ctx.drawImage(this.canvasImages[WeaponType[hero.unit_type]], 75 * x + 2, 75 * y + 2, 25, 25);
                    }
                }
            }
        }
    }

    private async drawBuilds(){
        let maxCount = 6;
        if(this.units.length === 7 || this.options.value['season_lift_loss'] === true){
            maxCount = 7;
        }
        for(let i = 0; i < maxCount; i++){
            // Character portrait
            this.ctx.drawImage(this.canvasImages['back-base'], 450, 100 * i, 360, 100);
            
            let hero = this.units[i];
            if(hero){
                this.ctx.drawImage(this.canvasImages[hero.image + '-btl'], 150, 0, 326, 300, 450, 100 * i, 108, 100);
            }
            
            this.ctx.drawImage(this.canvasImages['front-base'], 450, 100 * i, 360, 100);
            
            if(hero){
                // Rarity Frame
                this.ctx.drawImage(this.canvasImages['name_frame'], 520, 3 + (100 * i), 140, 23);
                
                // Weapon Icon
                this.ctx.drawImage(this.canvasImages[WeaponType[hero.unit_type]], 525, 6 + (100 * i), 17, 17);
                
                // Blessing
                let blessing = this.getBlessing(hero, false);
                if(hero.blessing === Blessing.none && hero.special_kind === Kind.none){
                    this.ctx.drawImage(this.canvasImages[blessing], 502, 68 + (100 * i), 25.51, 28);
                } else {
                    this.ctx.drawImage(this.canvasImages[blessing], 496, 56 + (100 * i), 39, 42);
                }
                
                // Skills
                // Seal first
                
                this.ctx.drawImage(this.canvasImages['empty_seal'], 780, 3 + (100 * i), 25, 25);
                if(hero.build.skills.s){
                    this.ctx.drawImage(this.canvasImages[hero.build.skills.s.image], 780, 3 + (100 * i), 25, 25);
                }
                this.ctx.drawImage(this.canvasImages['s_icon'], 793, 16 + (100 * i), 13, 13);
                
                this.ctx.drawImage(this.canvasImages['empty_skill'], 761, 3 + (100 * i), 25, 25);
                if(hero.build.skills.c){
                    this.ctx.drawImage(this.canvasImages[hero.build.skills.c.image], 761, 3 + (100 * i), 25, 25);
                }
                this.ctx.drawImage(this.canvasImages['c_icon'], 774, 16 + (100 * i), 13, 13);
                
                this.ctx.drawImage(this.canvasImages['empty_skill'], 742, 3 + (100 * i), 25, 25);
                if(hero.build.skills.b){
                    this.ctx.drawImage(this.canvasImages[hero.build.skills.b.image], 742, 3 + (100 * i), 25, 25);
                }
                this.ctx.drawImage(this.canvasImages['b_icon'], 755, 16 + (100 * i), 13, 13);
                
                this.ctx.drawImage(this.canvasImages['empty_skill'], 723, 3 + (100 * i), 25, 25);
                if(hero.build.skills.a){
                    this.ctx.drawImage(this.canvasImages[hero.build.skills.a.image], 723, 3 + (100 * i), 25, 25);
                }
                this.ctx.drawImage(this.canvasImages['a_icon'], 736, 16 + (100 * i), 13, 13);
                
                // Base Styles
                this.ctx.lineJoin = "miter";
                this.ctx.miterLimit = 1;
                this.ctx.strokeStyle = "#000000";
                this.ctx.fillStyle = "#ffffff";
                this.ctx.lineWidth = 3;
                this.ctx.textAlign = "left";
                this.ctx.font = "12px Fire_Emblem_Heroes_Font";
                
                // Hero Name
                this.ctx.strokeText(hero.name, 573, 19 + (100 * i));
                this.ctx.fillText(hero.name, 573, 19 + (100 * i));
                
                // Level
                let level = "40";
                if(hero.build.merges > 0) level += "+";
                this.ctx.strokeText(level, 694, 25 + (100 * i));
                this.ctx.fillText(level, 694, 25 + (100 * i));
                
                // BLUE (boon) COLOR = #b1ecfa
                // RED (bane) COLOR = #f0a5b3
                // GREEN (refine) COLOR = #84f34c
                
                // YELLOW (stats) COLOR = #FEF995
                
                // Stats
                this.drawStatText(i);
                
                // Weapon/Assist/Special Names
                // Weapon
                if(hero.build.skills.weapon){
                    this.ctx.drawImage(this.canvasImages[hero.build.skills.weapon.image], 664, 28 + (100 * i), 25, 25);
                    
                    let weapon_name = hero.build.skills.weapon.name;
                    if(hero.build.skills.weapon.refined === true){
                        this.ctx.fillStyle = "#84f34c";
                        weapon_name = this.skill.getBaseForm(hero.build.skills.weapon.id).name;
                    }
                    this.ctx.strokeText(weapon_name, 689, 45 + (100 * i));
                    this.ctx.fillText(weapon_name, 689, 45 + (100 * i));
                    this.ctx.fillStyle = "#ffffff";
                } else {
                    this.ctx.drawImage(this.canvasImages['generic_weapon'], 664, 28 + (100 * i), 25, 25);
                    
                    this.ctx.strokeText("-", 689, 45 + (100 * i));
                    this.ctx.fillText("-", 689, 45 + (100 * i));
                }
                
                // Assist
                if(hero.build.skills.assist){
                    this.ctx.strokeText(hero.build.skills.assist.name, 689, 67 + (100 * i));
                    this.ctx.fillText(hero.build.skills.assist.name, 689, 67 + (100 * i));
                } else {
                    this.ctx.strokeText("-", 689, 67 + (100 * i));
                    this.ctx.fillText("-", 689, 67 + (100 * i));
                }
                
                // Special
                if(hero.build.skills.special){
                    this.ctx.strokeText(hero.build.skills.special.name, 689, 89 + (100 * i));
                    this.ctx.fillText(hero.build.skills.special.name, 689, 89 + (100 * i));
                } else {
                    this.ctx.strokeText("-", 689, 89 + (100 * i));
                    this.ctx.fillText("-", 689, 89 + (100 * i));
                }
                
                // Stat Values
                let stats;
                
                console.log(this.units[i], {season: this.data.season, allies: this.units})
                if(this.options.value['mythics'] === true){
                    stats = this.stats.calculateAllStats(this.units[i], {season: this.data.season, allies: this.units});
                } else {
                    stats = this.stats.calculateAllStats(this.units[i]);
                }
                
                this.ctx.fillStyle = '#FEF995';
                
                this.ctx.strokeText(stats.atk.toString(), 575, 73 + (100 * i));
                this.ctx.fillText(stats.atk.toString(), 575, 73 + (100 * i));
                
                this.ctx.strokeText(stats.spd.toString(), 636, 73 + (100 * i));
                this.ctx.fillText(stats.spd.toString(), 636, 73 + (100 * i));
                
                this.ctx.strokeText(stats.def.toString(), 575, 91 + (100 * i));
                this.ctx.fillText(stats.def.toString(), 575, 91 + (100 * i));
                
                this.ctx.strokeText(stats.res.toString(), 636, 91 + (100 * i));
                this.ctx.fillText(stats.res.toString(), 636, 91 + (100 * i));
                
                let grd = this.ctx.createLinearGradient(0, 50 + (100 * i), 0, 30 + (100 * i));
                grd.addColorStop(0, "#FADA60");
                grd.addColorStop(1, "#FFFFFF");
                this.ctx.fillStyle = grd;
                
                this.ctx.strokeText(stats.hp.toString(), 618, 48 + (100 * i));
                this.ctx.fillText(stats.hp.toString(), 618, 48 + (100 * i));
                
                this.ctx.font = "16px Fire_Emblem_Heroes_Font";
                
                this.ctx.strokeText(stats.hp.toString(), 578, 49 + (100 * i));
                this.ctx.fillText(stats.hp.toString(), 578, 49 + (100 * i));
            }
        }
    }

    private async drawWatermark(){
        this.ctx.lineJoin = "miter";
        this.ctx.miterLimit = 1;
        this.ctx.strokeStyle = "#000000";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.lineWidth = 3;
        this.ctx.textAlign = "left";
        this.ctx.font = "12px Fire_Emblem_Heroes_Font";
        
        this.ctx.strokeText("Made on www.askrsarchives.com/ar-builder", 5, this.previewCanvas.nativeElement.height - 5);
        this.ctx.fillText("Made on www.askrsarchives.com/ar-builder", 5, this.previewCanvas.nativeElement.height - 5);
    }

    private async drawBottom(){
        if(this.options.value['watermark'] === true){
            this.drawWatermark();
        }

        if(this.options.value['season_lift_loss'] === true){
            this.ctx.lineJoin = "miter";
            this.ctx.miterLimit = 1;
            this.ctx.strokeStyle = "#000000";
            this.ctx.fillStyle = "#ffffff";
            this.ctx.lineWidth = 3;
            this.ctx.textAlign = "left";
            this.ctx.font = "12px Fire_Emblem_Heroes_Font";
            
            this.ctx.strokeText("Season: " + this.titlecase.transform(Blessing[this.data.season[0]]), 5, 617);
            this.ctx.fillText("Season: " + this.titlecase.transform(Blessing[this.data.season[0]]), 5, 617);
            
            this.ctx.strokeText("Max Lift Loss: " + this.calculateLiftLoss(), 5, 634);
            this.ctx.fillText("Max Lift Loss: " + this.calculateLiftLoss(), 5, 634);
        }
    }

    private clearMap(){
        this.ctx.clearRect(0, 0, 450, 600);
    }

    private clearBuilds(){
        this.ctx.clearRect(450, 0, 360, 700);
    }

    private clearBottom(){
        this.ctx.clearRect(0, 600, 450, 100);
    }
    
}