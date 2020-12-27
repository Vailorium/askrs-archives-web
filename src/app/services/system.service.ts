import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SystemService{
    constructor(){
        
    }

    numberToHexadecimal(num: number, length: number){
        let st = num.toString(16);
        if(st.length < length){
            st = st.replace(/^/, "0".repeat(length - st.length));
        } else if(st.length > length){
            console.error("Hexadecimal string larger than provided length!", num, length);
        }
        return st;
    }

    base36Encode(num: number, length: number): string{
        let st = num.toString(36);
        if(st.length < length){
            st = st.replace(/^/, "0".repeat(length - st.length));
        } else if(st.length > length){
            console.error("Base36 encoded string larger than provided length!", num, length);
        }
        return st;
    }

    base36Decode(st: string): number{
        let num = parseInt(st, 36);
        return num;
    }
}