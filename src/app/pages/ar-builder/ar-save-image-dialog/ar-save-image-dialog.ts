import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ARTile, HeroInfoModel, MovementType, WeaponType } from "src/app/models";
// const path = require('path');
import { join } from 'path';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'ar-save-image-dialog',
    templateUrl: './ar-save-image-dialog.html',
    styleUrls: ['./ar-save-image-dialog.scss']
})
export class ARSaveImageDialog implements AfterViewInit {

    // Form
    public options: FormGroup;

    // Vars
    private mapName: string;
    private map: ARTile[];
    private units: HeroInfoModel[];

    public imageData: string;

    // Canvas
    @ViewChild('previewCanvas') previewCanvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ARSaveImageDialog>, @Inject(MAT_DIALOG_DATA) public data: {mapName: string, map: ARTile[], units: HeroInfoModel[]}){
        this.options = this.fb.group({
            movement: [false],
            weapons: [false],
            builds: [false],
            season: [false],
            lift: [false]
        });

        this.options.valueChanges.subscribe(() => {
            this.updateCanvas();
        });
        this.mapName = data.mapName;
        this.map = data.map;
        this.units = data.units;
    }

    ngAfterViewInit(){
        this.ctx = this.previewCanvas.nativeElement.getContext('2d');

        this.updateCanvas();
    }

    async updateCanvas(){
        this.imageData = "";

        this.ctx.clearRect(0, 0, this.previewCanvas.nativeElement.width, 600);

                // Builds
                if(this.options.value['builds'] === true){
                    this.previewCanvas.nativeElement.width = 810;
                } else {
                    this.previewCanvas.nativeElement.width = 450;
                }

        //Map Background
        let background = await this.loadImage(join('assets/maps/AR', this.mapName) + '.png');
        this.ctx.drawImage(background, 0, 0);

        // Tiles
        for(let i = 0; i < this.map.length; i++){
            if(this.map[i].image !== "blank"){
                let x = i % 6;
                let y = Math.floor(i / 6);

                let tile = new Image();
                if(this.map[i].type === "hero"){
                    tile = await this.loadImage(join('assets/units', this.map[i].image) + '.png');
                } else {
                    tile = await this.loadImage(join('assets/aether_raids', this.map[i].image) + '.png');
                }

                this.ctx.drawImage(tile, 75 * x, 75 * y, 75, 75);

                // Movement and Weapon type Icons
                if(this.map[i].type === "hero"){
                    let hero = this.units.find(a => a.uid === this.map[i].uid);
                    if(this.options.value['movement'] === true){
                        let movement = await this.loadImage(join('assets/ui/movement/', MovementType[hero.movement_type]) + '.png');

                        this.ctx.drawImage(movement, 75 * x + 48, 75 * y + 48, 25, 25);
                    }
                    if(this.options.value['weapons'] === true){
                        let weapon = await this.loadImage(join('assets/ui/weapon', WeaponType[hero.unit_type]) + '.png');

                        this.ctx.drawImage(weapon, 75 * x + 2, 75 * y + 2, 25, 25);
                    }
                }
            }
        }

        // Builds
        if(this.options.value['builds'] === true){
            for(let i = 0; i < 6; i++){
                let bg = await this.loadImage('assets/ui/build/back-base.jpg');
                let fg = await this.loadImage('assets/ui/build/front-base.png');

                this.ctx.drawImage(bg, 450, 100 * i, 360, 100);
                this.ctx.drawImage(fg, 450, 100 * i, 360, 100);
            }
        }
        this.imageData = this.previewCanvas.nativeElement.toDataURL('image/png');
    }

    async loadImage(src): Promise<HTMLImageElement>{
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = src;
        });
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
    
}