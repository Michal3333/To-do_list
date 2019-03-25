class Lista{
    constructor(){
        this._list = [];
        this._size = 0;
        this._floatingElement = 0;
    }

    get lista(){
        return this._list;
    }

    get size(){
        return this._size;
    }

    set lista(value) {
        this._list = value;
    }


    get floatingElement() {
        return this._floatingElement;
    }

    set floatingElement(value) {
        this._floatingElement = value;
    }

    set size(value) {
        this._size = value;
    }

    swapItems(item1, item2){
        let temp = this.lista[item1];
        this.lista[item1] = this.lista[item2];
        this.lista[item2] = temp;
    }

    updateListNumbers(){
        let i=0;
        this.lista.forEach(x => {
            x.changeposition(i);
            i++;
        })
    }
    ElementInAir(element){
        this._floatingElement = element;
        console.log("elementInAIR")
        this.lista.forEach(x => {
            if(x.item !== element){
                x.item.onmouseenter = (e) =>{

                    let positon = e.target.style.order;
                    e.target.style.order = this._floatingElement.style.order;
                    this._floatingElement.style.order = positon;



                    // this.updateListNumbers();

                }
            }
        })
    }
    NoElementInAir(){
        this.floatingElement = null;
        this.lista.forEach(x => {
            x.item.onmouseenter = () => {}
        })
    }
    replace(item1, item2){
        this.swapItems(item1, item2);
        this.updateListNumbers();
    }

    delete(item){
        let index = this.lista.indexOf(item);
        let listaBefore = this.lista.slice(0, index);
        let listaAfter = this.lista.slice(index+1);
        this.lista=listaBefore.concat(listaAfter);
        console.log('usuwam sobie ' + listaBefore.length + ' ' + listaAfter.length + ' ' + this.lista.length);
        this.updateListNumbers();
    }

    addItem(item){
        this.lista.push(item);
        this.updateListNumbers();
        item.updateNumber();
    }
}

class Option{
    constructor(text, lista){
        this._text = text;
        this._number = 0;
        this._item = document.createElement('li');
        this._item.innerText = text;
        this._item.ondblclick = (element) => {
            element.target.style.backgroundColor = 'lightgreen';
        };
        this._item.oncontextmenu = (element) => {
            element.target.parentNode.removeChild(element.target);
            this._lista.delete(this);
            return false;
        };
        this._item.onmouseover = (element) =>{
            element.target.style.borderWidth = '5px';
        };
        this._item.onmouseout = (element) => {
            element.target.style.borderWidth = '3px';
        };
        this._item.onmousedown = (element) => {
            this.lista.ElementInAir(element.target);
            console.log("kliknal mnie")
        };

        document.querySelector('ul').appendChild(this._item);
        this._lista = lista;
    }
    set text(value) {
        this._text = value;
    }
    set number(value) {
        this._number = value + 1;
    }

    get number() {
        return this._number;
    }

    get text() {
        return this._text;
    }

    get lista() {
        return this._lista;
    }

    get item() {
        return this._item;
    }

    updateNumber(){
        // this.item.innerText = this.number + '.  ' + this.text;
    }
    changeposition(num){
        this.number = num;
        this._item.style.order = num;
        this.updateNumber();
    }
}
let button = document.getElementById("addButton");
let input = document.getElementById("task");
let ol = document.getElementById("lista");
let main = new Lista();
function createTask(){
    if(input.value !== ''){
        main.addItem(new Option(input.value, main));
        input.value = '';
    }
}
document.onmouseup = () =>{
    main.NoElementInAir();
};



button.onclick = createTask;


