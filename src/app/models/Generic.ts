// Heroes
// export type MovementType = "infantry" | "armor" | "cavalry" | "flying";
// export type WeaponType = "blue_dagger" | "blue_breath" | "blue_lance" | "blue_tome" | "blue_beast" | "blue_bow" | "red_dagger" | "red_breath" | "red_sword" | "red_tome" | "red_beast" | "red_bow" | "green_dagger" | "green_breath" | "green_axe" | "green_tome" | "green_beast" | "green_bow" | "colorless_dagger" | "colorless_breath" | "colorless_staff" | "colorless_tome" | "colorless_beast" | "colorless_bow";
export type HeroRarity = "five_star" | "five_star_four_star" | "four_star_three_star" | "none";
export type HeroAvailability = "seasonal" | "legendary" | "mythic" | "duo" | "grail" | "regular" | "resonant" | "permanent";
// export type Origins = "heroes" | "shadow_dragon_new_mystery" | "echoes" | "genealogy" | "thracia" | "binding" | "blazing" | "sacred" | "path" | "dawn" | "awakening" | "fates" | "houses" | "mirage";
export type AssetFlaw = "hp" | "atk" | "spd" | "def" | "res" | "neutral";
export type Stats = {hp: number, atk: number, spd: number, def: number, res: number};
export type Blessings = null | "fire" | "water" | "earth" | "wind" | "light" | "dark" | "astra" | "anima";
// Aether Raids
export type ARTile = {selected?: boolean, slot?: number, uid?: string, image: string, display: string, folder: "aether_raids" | "units", type: "blank" | "building" | "trap" | "decoration" | "unit" | "hero" | "other", permanent: boolean, isSchool: boolean};