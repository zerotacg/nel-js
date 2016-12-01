const CHAR_CODE_A = "A".charCodeAt(0);

export default class CSearch {
    static getName( zone_id ) {
        var x = zone_id & 0xFF;
        var y = (zone_id >> 8) & 0xFF;

        var x_1 = String.fromCharCode(CHAR_CODE_A + x / 26);
        var x_2 = String.fromCharCode(CHAR_CODE_A + x % 26);

        return `${y+1}_${x_1}${x_2}.zonel`;
    }
}
