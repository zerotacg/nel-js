import AModel from "nel/io/a_model";

/**
 * @class nlmisc.CVector<T>
 */
export default class CVector extends AModel {
    static template( type ) {
        class CVectorType extends CVector {
        }

        CVectorType.fields = [
            { type, name: "x" },
            { type, name: "y" },
            { type, name: "z" }
        ];

        return CVectorType;
    }
}
