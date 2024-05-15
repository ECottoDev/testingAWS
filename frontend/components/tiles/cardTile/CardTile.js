/**
* CardTile.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-15 initial version
*/

import { addClasses, createElementContainer } from "../../../../helpers/basicElements";

export class CardTile {
    constructor(parentProps, cardEntry) {
        this.parentProps = parentProps;
        this.cardEntry = cardEntry;
        this.view = addClasses(createElementContainer(), 'cardTile_view');
        this.setView();
    }
    setView() {

    }
}