const CHAR_CODE_A = "A".charCodeAt(0);
const CHAR_CODE_Z = "Z".charCodeAt(0);
const CHAR_COUNT = CHAR_CODE_Z - CHAR_CODE_A + 1;
const max = Math.max;
const min = Math.min;

export default class CSearch {
    constructor() {
        // Size X is named of AA to ZZ, current size is IB = 26 * 8 + 2  (AA is zone number 1, AZ zone number 26, BA
        // zone number 27...)
        this._NbZoneX = 0x100;

        /// Number zones on Y axis of landscape
        this._NbZoneY = 0x100;

        /// Size X of one zone (in meters)
        this._SizeZoneX = 160;

        /// Size X of one zone (in meters)
        this._SizeZoneY = 160;

        this.maxX = this._SizeZoneX * this._NbZoneX - 1;
        this.maxY = this._SizeZoneY * this._NbZoneY - 1;
    }

    /**
     * @param {uint16} zone_id
     * @returns {string}
     */
    static getName( zone_id ) {
        const x = zone_id & 0xFF;
        const y = (zone_id >> 8) & 0xFF;

        const x_1 = String.fromCharCode(CHAR_CODE_A + x / CHAR_COUNT);
        const x_2 = String.fromCharCode(CHAR_CODE_A + x % CHAR_COUNT);

        return `${y + 1}_${x_1}${x_2}.zonel`;
    }

    /**
     *
     * @param x
     * @param y
     * @param sizeArea
     */
    getIds( x, y, sizeArea ) {
        let startPosX, startPosY;
        let lastPosX, lastPosY;
        const ids = [];
        const _SizeZoneX = this._SizeZoneX;
        const _SizeZoneY = this._SizeZoneY;
        startPosX = x - sizeArea;
        lastPosX = x + sizeArea;
        startPosY = y - sizeArea;
        lastPosY = y + sizeArea;

        startPosX = max(startPosX, 0);
        lastPosX = min(lastPosX, this.maxX);

        startPosY = max(startPosY, 0);
        lastPosY = min(lastPosY, this.maxY);

        for ( let i = startPosY; i <= lastPosY; i += _SizeZoneY ) {
            for ( let j = startPosX; j <= lastPosX; j += _SizeZoneX ) {
                ids.push(this.getId(j, i));
            }
        }

        return ids;
    }

    getId( x, y ) {
        let zoneY = y / this._SizeZoneY;
        let zoneX = x / this._SizeZoneX;

        return (zoneX & 0xff) + (zoneY << 8);
    }
}
