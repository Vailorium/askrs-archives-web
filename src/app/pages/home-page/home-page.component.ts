import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  articles = [
    {id: "version-0.2-update", title: "Version 0.2 Update - Seiros Mythic Banner + QOL Updates", img: "v02banner.png", text: "<p>Larger update this time. Including a few important requested features.</p>Firstly, new content: <ul><li>New Heroes Added (Seiros)</li><li>New Skills Added (Dragon Wall 3, Wings of Light)</li><li>New Weapons Added (Aurora Breath)</li></ul><p>Large numbers of small changes include:</p><ul><li>Moved to HTTPS</li><li>Added a toggleable grid overlay on AR-D Builder</li><li>Added dragging ranges for heroes/structures</li><li>Added asset/flaw colors to the unit build table</li><li>Added dragonflower icon next to count on table</li><li>Added unit/movement type icons to units on grid (toggleable)</li><li>Added UI Icons to buttons</li><li>Added github issues link in report a bug</li><li>Added drag boundary so you can't drag structures/heroes into the abyss</li><li>This page!</li><li>Settings page (will have more settings in the future)</li><li>Image saving - including adding unit builds to the image</li><li>7 Heroes can now be added provided you have a mythic hero that allows you to (i.e. currently just Seiros)</li><li>Heroes now show visibly as resplendent on the map</li></ul><p>Bug fixes include:</p><ul><li>Fixed being able to place structures on defense tiles</li><li>Fixed the resplendent toggle always being off in the edit build menu (even if the hero was set to repslendent on)</li></ul><p>A lot of features for this update came from ideas suggested to me through <a href='https://discord.gg/z9YSeEqzg4' target='_blank'>discord</a>, if you have any useful feedback or just want to chat feel free to drop by.", timestamp: "1611808388015"},
    {id: "version-0.1.2-update", title: "Version 0.1.2 Update - Dark Desert Rituals", img: "v012banner.png", text: "<p>Small content patch.</p>New content includes:<ul><li>New Heroes Added (Dorothea & Lene, Tharja, Raphael, Katarina, Kris)</li><li>New Skills Added (Def/Res Chill, Swift Impact)</li><li>New Seals Added (Brazen Spd/Def, Air Orders)</ul>", timestamp: "1610952749000"},
    {id: "version-0.1.1-update", title: "Version 0.1.1 Update - Shared Purpose", img: "v011banner.png", text: "<p>Content patch - nothing new website wise.</p>New content includes:<ul><li>New Heroes Added (Sara, Rowan, Asbel, Miranda, Veld)</li><li>New Skills Added (Close Ward, Seal Atk/Res, Spd/Res Oath, Swift Stance 3)</li><li>New Weapons Added (Grafcalibur, Indignant Bow, Kia Staff, Arden's Blade, Springtime Staff)<li>New Refines Added (Arden's Blade, Springtime Staff, Forseti, Warrior Princess)</ul>Small bug fixes:<ul><li>Added skill icons for Atk/Def Snag and Res Cantrip</li><li>Fixed Falchion refine issue</li></ul>", timestamp: "1609991958488"}
  ];
  constructor() { }

  ngOnInit(): void {

  }

}
