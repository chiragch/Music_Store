class UserItem {


    constructor(itemCode, itemName, catalogCategory, rating, madeIt) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._catalogCategory = catalogCategory;
        this._rating = rating;
        this._madeIt = madeIt;
    }
    
    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value){
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value){
        this._itemName = value;
    }

    get catalogCategory() {
        return this._catalogCategory;
    }

    set catalogCategory(value){
        this._catalogCategory = value;
    }

    get rating(){
        return this._rating;
    }

    set rating(value){
        this._rating = value;
    }

    get madeIt(){
        return this._madeIt;
    }

    set madeIt(value){
        this._madeIt = value;
    }
        
}
module.exports = UserItem;