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
import { ThrowStmt, viewClassName } from "@angular/compiler";


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
    public mapName: string;
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
    // private canvasImages: Dictionary<HTMLImageElement> = {};
    
    // Canvas
    @ViewChild('previewCanvas') previewCanvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    //TODO (new) Canvases
    @ViewChild('mapImage') mapImage: ElementRef<HTMLImageElement>;

    @ViewChild('tileCanvas') tileCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('movCanvas') movCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('wepCanvas') wepCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('buildsCanvas') buildsCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('statsCanvas') statsCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('bottomCanvas') bottomCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('seasonMaxLossCanvas') seasonMaxLossCanvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('watermarkCanvas') watermarkCanvas: ElementRef<HTMLCanvasElement>;

    tileCtx: CanvasRenderingContext2D;
    movCtx: CanvasRenderingContext2D;
    wepCtx: CanvasRenderingContext2D;
    buildsCtx: CanvasRenderingContext2D;
    statsCtx: CanvasRenderingContext2D;
    bottomCtx: CanvasRenderingContext2D;
    seasonMaxLossCtx: CanvasRenderingContext2D;
    watermarkCtx: CanvasRenderingContext2D;

    // visible changers
    public movVisible: boolean = false;
    public wepVisible: boolean = false;
    public watermarkVisible: boolean = this.getWidth() >= 810;
    public buildsVisible: boolean = false;
    public bottomVisible: boolean = false;
    public seasonMaxLossVisible: boolean = false;

    @ViewChild('combinedCanvas') combinedCanvas: ElementRef<HTMLCanvasElement>;
    combinedCtx: CanvasRenderingContext2D;
    
    constructor(private titlecase: TitleCasePipe, private skill: SkillsService, private stats: StatsCalcualator, private portrait: PortraitService, private cdr: ChangeDetectorRef, private fb: FormBuilder, public dialogRef: MatDialogRef<ARSaveImageDialog>, @Inject(MAT_DIALOG_DATA) public data: {mapName: string, map: ARTile[], units: HeroInfoModel[], season: number[]}){
        this.options = this.fb.group({
            movement: [false],
            weapons: [false],
            builds: [false],
            mythics: [false],
            season_lift_loss: [false],
            watermark: [this.getWidth() >= 810],
            season: [data.season]
        });

        // this.options.controls['builds'].valueChanges
        this.options.controls['movement'].valueChanges.subscribe((val) => {
            this.movVisible = val;
        });

        this.options.controls['weapons'].valueChanges.subscribe((val) => {
            this.wepVisible = val;
        });

        this.options.controls['builds'].valueChanges.subscribe((val) => {
            this.buildsVisible = val;
            if(val === true){
                this.totalWidth = 810;
                this.dialogRef.updateSize("810px", "700px");
                if(this.units.length === 7){
                    this.bottomVisible = true;
                    this.totalHeight = 700;
                }

                // redraw watermark, doesn't matter if isn't visible
                this.clearWatermark();
                this.drawWatermark();
            } else {
                this.totalWidth = 450;
                if(this.options.value['season_lift_loss'] === false){
                    this.bottomVisible = false;
                    this.totalHeight = 600;

                    // redraw watermark, doesn't matter if isn't visible
                    this.clearWatermark();
                    this.drawWatermark();
                }
            }
        });

        this.options.controls['mythics'].valueChanges.subscribe(() => {
            this.statsCtx.clearRect(0, 0, 810, 700);
            this.drawStatValues();
        });

        this.options.controls['season_lift_loss'].valueChanges.subscribe((val) => {
            this.seasonMaxLossVisible = val;
            if(val === true){
                this.bottomVisible = true;
                this.totalHeight = 700;

                // redraw watermark, doesn't matter if isn't visible
                this.clearWatermark();
                this.drawWatermark();
            } else if(this.options.value['builds'] === false) {
                this.bottomVisible = false;
                this.totalHeight = 600;

                // redraw watermark, doesn't matter if isn't visible
                this.clearWatermark();
                this.drawWatermark();
            }
        })

        this.options.controls['watermark'].valueChanges.subscribe((val) => {
            this.watermarkVisible = val;
        });


        this.mapName = data.mapName;
        this.map = data.map;
        this.units = data.units;
    }
    
    async ngAfterViewInit(){
        /* DRAWING ORDER:
        - builds -> bottom -> map
        - everything else
        */
        // Setting canvas rendering context(s)
        this.tileCtx = this.tileCanvas.nativeElement.getContext('2d');
        this.movCtx = this.movCanvas.nativeElement.getContext('2d');
        this.wepCtx = this.wepCanvas.nativeElement.getContext('2d');
        this.buildsCtx = this.buildsCanvas.nativeElement.getContext('2d');
        this.statsCtx = this.statsCanvas.nativeElement.getContext('2d');
        this.bottomCtx = this.bottomCanvas.nativeElement.getContext('2d', {alpha: false});
        this.seasonMaxLossCtx = this.seasonMaxLossCanvas.nativeElement.getContext('2d');
        this.watermarkCtx = this.watermarkCanvas.nativeElement.getContext('2d');

        this.combinedCtx = this.combinedCanvas.nativeElement.getContext('2d', {alpha: false});

        // set font style
        this.statsCtx.lineJoin = "miter";
        this.statsCtx.miterLimit = 1;
        this.statsCtx.strokeStyle = "#000000";
        this.statsCtx.fillStyle = "#ffffff";
        this.statsCtx.lineWidth = 3;
        this.statsCtx.textAlign = "left";
        this.statsCtx.font = "11px Fire_Emblem_Heroes_Font";

        this.buildsCtx.lineJoin = "miter";
        this.buildsCtx.miterLimit = 1;
        this.buildsCtx.strokeStyle = "#000000";
        this.buildsCtx.fillStyle = "#ffffff";
        this.buildsCtx.lineWidth = 3;
        this.buildsCtx.textAlign = "left";
        this.buildsCtx.font = "12px Fire_Emblem_Heroes_Font";

        this.watermarkCtx.lineJoin = "miter";
        this.watermarkCtx.miterLimit = 1;
        this.watermarkCtx.strokeStyle = "#000000";
        this.watermarkCtx.fillStyle = "#ffffff";
        this.watermarkCtx.lineWidth = 3;
        this.watermarkCtx.textAlign = "left";
        this.watermarkCtx.font = "12px Fire_Emblem_Heroes_Font";

        this.seasonMaxLossCtx.lineJoin = "miter";
        this.seasonMaxLossCtx.miterLimit = 1;
        this.seasonMaxLossCtx.strokeStyle = "#000000";
        this.seasonMaxLossCtx.fillStyle = "#ffffff";
        this.seasonMaxLossCtx.lineWidth = 3;
        this.seasonMaxLossCtx.textAlign = "left";
        this.seasonMaxLossCtx.font = "12px Fire_Emblem_Heroes_Font";

        this.watermarkCtx.strokeText("Loading Font", 0, 0);
        this.watermarkCtx.fillText("Loading Font", 0, 0);

        this.watermarkCtx.clearRect(0,0,100,100);
        
        setTimeout(() => {
            this.fontFix = false;
            this.drawAll();
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
    
    async loadImage(src): Promise<HTMLImageElement>{
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = src;
        });
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
    
    async saveImage(){ //* DO NOT DELETE
        this.loading = true;
        this.loadingMessage = "Saving..."
        this.combinedCtx.clearRect(0, 0, 810, 700);

        if(this.options.value['builds'] === true){
            this.combinedCtx.drawImage(await this.loadImage(this.buildsCanvas.nativeElement.toDataURL()), 0, 0)
        }
        if(this.totalHeight === 700){
            this.combinedCtx.drawImage(await this.loadImage(this.bottomCanvas.nativeElement.toDataURL()), 0, 0)
        }
        this.combinedCtx.drawImage(this.mapImage.nativeElement, 0, 0);
        this.combinedCtx.drawImage(await this.loadImage(this.tileCanvas.nativeElement.toDataURL()), 0, 0);

        if(this.options.value['movement'] === true){
            this.combinedCtx.drawImage(await this.loadImage(this.movCanvas.nativeElement.toDataURL()), 0, 0);
        }
        if(this.options.value['weapons'] === true){
            this.combinedCtx.drawImage(await this.loadImage(this.wepCanvas.nativeElement.toDataURL()), 0, 0);
        }

        if(this.options.value['season_lift_loss'] === true){
            this.combinedCtx.drawImage(await this.loadImage(this.seasonMaxLossCanvas.nativeElement.toDataURL()), 0, 0);
        }

        if(this.options.value['watermark'] === true){
            this.combinedCtx.drawImage(await this.loadImage(this.watermarkCanvas.nativeElement.toDataURL()), 0, 0);
        }
        
        let a = document.createElement("a");
        a.download = "AR-D_Screenshot.png";
        a.href = this.combinedCanvas.nativeElement.toDataURL("image/png");
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();

        this.loading = false;
    }
    
    onNoClick() {
        this.dialogRef.close();
    }
    
    close() {
        this.dialogRef.close();
    }

    private drawAll(){
        // map is already drawn
        this.drawTiles(); // draws building and unit icons, mov and wep icons too
        this.drawBuilds(); // draws builds
        this.drawStatValues(); // draws the values of stats
        this.drawBottom(); // draws bottom 450x100 background
        this.drawSeasonMaxLoss(); // draws season + max lift loss
        this.drawWatermark(); // watermark
    }

    private async drawTiles(){ //TODO: others, this is complete
        for(let i = 0; i < this.map.length; i++){
            if(this.map[i].image !== "blank"){
                let x = i % 6;
                let y = Math.floor(i / 6);

                let tile = await this.loadImage(this.getImage(this.map[i]));
                
                this.tileCtx.drawImage(tile, 75 * x, 75 * y, 75, 75);
                
                // Movement and Weapon type Icons
                if(this.map[i].type === "hero"){
                    let hero = this.units.find(a => a.uid === this.map[i].uid);
                    this.movCtx.drawImage(await this.loadImage(join('assets', 'ui', 'movement', MovementType[hero.movement_type] + ".png")), 75 * x + 48, 75 * y + 48, 25, 25);                     
                    this.wepCtx.drawImage(await this.loadImage(join('assets', 'ui', 'weapon', WeaponType[hero.unit_type] + ".png")), 75 * x + 2, 75 * y + 2, 25, 25);
                }
            }
        }
    }

    private async drawBuilds(){
        let maxCount = 6;
        if(this.units[6] !== undefined){
            maxCount = 7;
        }
        for(let i = 0; i < maxCount; i++){
            console.log("drawn");
            // Character portrait
            this.buildsCtx.drawImage(await this.loadImage('assets/ui/build/back-base.jpg'), 450, 100 * i, 360, 100);
            
            let hero = this.units[i];
            if(hero !== undefined){
                this.buildsCtx.drawImage(await this.loadImage(this.portrait.getBtlDefault(hero)), 150, 0, 326, 300, 450, 100 * i, 108, 100);
            }
            
            this.buildsCtx.drawImage(await this.loadImage('assets/ui/build/front-base.png'), 450, 100 * i, 360, 100);
            
            if(hero !== undefined){
                // Rarity Frame
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/build/name_frame_5.png'), 520, 3 + (100 * i), 140, 23);
                
                // Weapon Icon
                this.buildsCtx.drawImage(await this.loadImage(join('assets', 'ui', 'weapon', WeaponType[hero.unit_type] + ".png")), 525, 6 + (100 * i), 17, 17);
                
                // Blessing
                let blessing = this.portrait.getBlessing(hero, false);
                if(hero.blessing === Blessing.none && hero.special_kind === Kind.none){
                    this.buildsCtx.drawImage(await this.loadImage('assets/ui/blessings/' + blessing), 502, 68 + (100 * i), 25.51, 28);
                } else {
                    this.buildsCtx.drawImage(await this.loadImage('assets/ui/blessings/' + blessing), 496, 56 + (100 * i), 39, 42);
                }
                
                // Skills
                // Seal first
                
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/empty_seal.png'), 780, 3 + (100 * i), 25, 25);
                if(hero.build.skills.s){
                    this.buildsCtx.drawImage(await this.loadImage('assets/skills/' + hero.build.skills.s.image + '.png'), 780, 3 + (100 * i), 25, 25);
                }
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/s.png'), 793, 16 + (100 * i), 13, 13);
                
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/empty_skill.png'), 761, 3 + (100 * i), 25, 25);
                if(hero.build.skills.c){
                    this.buildsCtx.drawImage(await this.loadImage('assets/skills/' + hero.build.skills.c.image + '.png'), 761, 3 + (100 * i), 25, 25);
                }
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/c.png'), 774, 16 + (100 * i), 13, 13);
                
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/empty_skill.png'), 742, 3 + (100 * i), 25, 25);
                if(hero.build.skills.b){
                    this.buildsCtx.drawImage(await this.loadImage('assets/skills/' + hero.build.skills.b.image + '.png'), 742, 3 + (100 * i), 25, 25);
                }
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/b.png'), 755, 16 + (100 * i), 13, 13);
                
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/empty_skill.png'), 723, 3 + (100 * i), 25, 25);
                if(hero.build.skills.a){
                    this.buildsCtx.drawImage(await this.loadImage('assets/skills/' + hero.build.skills.a.image + '.png'), 723, 3 + (100 * i), 25, 25);
                }
                this.buildsCtx.drawImage(await this.loadImage('assets/ui/a.png'), 736, 16 + (100 * i), 13, 13);
                
                // Hero Name
                this.buildsCtx.strokeText(hero.name, 573, 19 + (100 * i));
                this.buildsCtx.fillText(hero.name, 573, 19 + (100 * i));
                
                // Level
                let level = "40";
                if(hero.build.merges > 0) level += "+";
                this.buildsCtx.strokeText(level, 694, 25 + (100 * i));
                this.buildsCtx.fillText(level, 694, 25 + (100 * i));
                
                // Stats
                this.drawStatText(i);
                
                // Weapon/Assist/Special Names
                // Weapon
                if(hero.build.skills.weapon){
                    this.buildsCtx.drawImage(await this.loadImage('assets/skills/' + hero.build.skills.weapon.image + '.png'), 664, 28 + (100 * i), 25, 25);
                    
                    let weapon_name = hero.build.skills.weapon.name;
                    if(hero.build.skills.weapon.refined === true){
                        this.buildsCtx.fillStyle = "#84f34c";
                        weapon_name = this.skill.getBaseForm(hero.build.skills.weapon.id).name;
                    }
                    this.buildsCtx.strokeText(weapon_name, 689, 45 + (100 * i));
                    this.buildsCtx.fillText(weapon_name, 689, 45 + (100 * i));
                    this.buildsCtx.fillStyle = "#ffffff";
                } else {
                    this.buildsCtx.drawImage(await this.loadImage('assets/ui/generic_weapon.png'), 664, 28 + (100 * i), 25, 25);
                    
                    this.buildsCtx.strokeText("-", 689, 45 + (100 * i));
                    this.buildsCtx.fillText("-", 689, 45 + (100 * i));
                }
                
                // Assist
                if(hero.build.skills.assist){
                    this.buildsCtx.strokeText(hero.build.skills.assist.name, 689, 67 + (100 * i));
                    this.buildsCtx.fillText(hero.build.skills.assist.name, 689, 67 + (100 * i));
                } else {
                    this.buildsCtx.strokeText("-", 689, 67 + (100 * i));
                    this.buildsCtx.fillText("-", 689, 67 + (100 * i));
                }
                
                // Special
                if(hero.build.skills.special){
                    this.buildsCtx.strokeText(hero.build.skills.special.name, 689, 89 + (100 * i));
                    this.buildsCtx.fillText(hero.build.skills.special.name, 689, 89 + (100 * i));
                } else {
                    this.buildsCtx.strokeText("-", 689, 89 + (100 * i));
                    this.buildsCtx.fillText("-", 689, 89 + (100 * i));
                }
            }
        }
    }

    private async drawStatText(i: number) {
        // HP
        if(this.units[i].build.ivs.boon === IVS.hp){
            this.buildsCtx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.hp){
            this.buildsCtx.fillStyle = "#f0a5b3";
        } else {
            this.buildsCtx.fillStyle = "#ffffff";
        }
        this.buildsCtx.strokeText("HP", 539, 48 + (100 * i));
        this.buildsCtx.fillText("HP", 539, 48 + (100 * i));
        
        // ATK
        this.buildsCtx.lineWidth = 2;
        if(this.units[i].build.ivs.boon === IVS.atk){
            this.buildsCtx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.atk){
            this.buildsCtx.fillStyle = "#f0a5b3";
        } else {
            this.buildsCtx.fillStyle = "#ffffff";
        }
        this.buildsCtx.strokeText("Atk", 539, 73 + (100 * i));
        this.buildsCtx.fillText("Atk", 539, 73 + (100 * i));
        
        // SPD
        if(this.units[i].build.ivs.boon === IVS.spd){
            this.buildsCtx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.spd){
            this.buildsCtx.fillStyle = "#f0a5b3";
        } else {
            this.buildsCtx.fillStyle = "#ffffff";
        }
        this.buildsCtx.strokeText("Spd", 600, 73 + (100 * i));
        this.buildsCtx.fillText("Spd", 600, 73 + (100 * i));
        
        // DEF
        if(this.units[i].build.ivs.boon === IVS.def){
            this.buildsCtx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.def){
            this.buildsCtx.fillStyle = "#f0a5b3";
        } else {
            this.buildsCtx.fillStyle = "#ffffff";
        }
        this.buildsCtx.strokeText("Def", 539, 91 + (100 * i));
        this.buildsCtx.fillText("Def", 539, 91 + (100 * i));
        
        // RES
        if(this.units[i].build.ivs.boon === IVS.res){
            this.buildsCtx.fillStyle = "#b1ecfa";
        } else if(this.units[i].build.ivs.bane === IVS.res){
            this.buildsCtx.fillStyle = "#f0a5b3";
        } else {
            this.buildsCtx.fillStyle = "#ffffff";
        }
        this.buildsCtx.strokeText("Res", 600, 91 + (100 * i));
        this.buildsCtx.fillText("Res", 600, 91 + (100 * i));
        
        this.buildsCtx.fillStyle = "#ffffff";
    }

    private async drawStatValues(){
        let maxCount = 6;
        if(this.units[6] !== undefined){
            maxCount = 7;
        }
        for(let i = 0; i < maxCount; i++){
            if(this.units[i] !== undefined){
                // Stat Values
                let stats;

                this.statsCtx.font = "11px Fire_Emblem_Heroes_Font";
                    
                if(this.options.value['mythics'] === true){
                    stats = this.stats.calculateAllStats(this.units[i], {season: this.data.season, allies: this.units});
                } else {
                    stats = this.stats.calculateAllStats(this.units[i]);
                }
                
                this.statsCtx.fillStyle = '#FEF995';
                
                this.statsCtx.strokeText(stats.atk.toString(), 575, 73 + (100 * i));
                this.statsCtx.fillText(stats.atk.toString(), 575, 73 + (100 * i));
                
                this.statsCtx.strokeText(stats.spd.toString(), 636, 73 + (100 * i));
                this.statsCtx.fillText(stats.spd.toString(), 636, 73 + (100 * i));
                
                this.statsCtx.strokeText(stats.def.toString(), 575, 91 + (100 * i));
                this.statsCtx.fillText(stats.def.toString(), 575, 91 + (100 * i));
                
                this.statsCtx.strokeText(stats.res.toString(), 636, 91 + (100 * i));
                this.statsCtx.fillText(stats.res.toString(), 636, 91 + (100 * i));
                
                // HP has a special gradient
                let grd = this.statsCtx.createLinearGradient(0, 50 + (100 * i), 0, 30 + (100 * i));
                grd.addColorStop(0, "#FADA60");
                grd.addColorStop(1, "#FFFFFF");
                this.statsCtx.fillStyle = grd;
                
                this.statsCtx.strokeText(stats.hp.toString(), 618, 48 + (100 * i));
                this.statsCtx.fillText(stats.hp.toString(), 618, 48 + (100 * i));
                
                this.statsCtx.font = "16px Fire_Emblem_Heroes_Font";
                
                this.statsCtx.strokeText(stats.hp.toString(), 578, 49 + (100 * i));
                this.statsCtx.fillText(stats.hp.toString(), 578, 49 + (100 * i));
            }
        }
    }

    private drawWatermark(){
        this.watermarkCtx.strokeText("Made on www.askrsarchives.com/ar-builder", 5, this.totalHeight - 5);
        this.watermarkCtx.fillText("Made on www.askrsarchives.com/ar-builder", 5, this.totalHeight - 5);
    }

    private clearWatermark(){
        this.watermarkCtx.clearRect(0, 500, 450, 200);
    }

    private async drawBottom(){
        this.bottomCtx.drawImage(await this.loadImage(join('assets','ui','save_image_bg.png')), 0, 600);
    }

    private drawSeasonMaxLoss(){
        this.seasonMaxLossCtx.strokeText("Season: " + this.titlecase.transform(Blessing[this.data.season[0]]), 5, 617);
        this.seasonMaxLossCtx.fillText("Season: " + this.titlecase.transform(Blessing[this.data.season[0]]), 5, 617);
        
        this.seasonMaxLossCtx.strokeText("Max Lift Loss: " + this.calculateLiftLoss(), 5, 634);
        this.seasonMaxLossCtx.fillText("Max Lift Loss: " + this.calculateLiftLoss(), 5, 634);
    }
}