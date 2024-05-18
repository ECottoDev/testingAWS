/**
* CardTile.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-15 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar, toCurrencyFormat, toTitleCase } from "../../../../helpers/basicElements.js";
import { updateCard } from "../../../databaseCallers/budgetDataCalls.js";

export class CardTile {
    constructor(parentProps, cardEntry, refresh = ()=>{}) {
	this.refresh = refresh;
        this.parentProps = parentProps;
        this.cardEntry = cardEntry;
        this.view = addClasses(createElementContainer(), 'cardTile_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText(toTitleCase(this.cardEntry.cardName)), 'cardTile_cardName'),
            appendChildren(addClasses(createElementContainer(), 'cardTile_inputBars'), [
            this.amountButton = addClasses(createInputBar({ placeholder: toCurrencyFormat(this.cardEntry.amountDue) }), 'cardTile_amountDue'),
                addClasses(createInputBar({ placeholder: toCurrencyFormat(this.cardEntry.amountMinDue) }), 'cardTile_amountMinDue'),
	    ]),
           addEvent(addClasses(createButton('Update Card'), 'cardTile_updateButton'),async() => {await updateCard(this.cardEntry.cardID, this.amountButton.value); this.refresh()}, 'click' )
        ])
    }

}
