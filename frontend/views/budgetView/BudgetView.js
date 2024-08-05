/**
* BudgetView.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-14 initial version
*/

import { addClasses, appendChildren, createElementContainer, createHeadingText, createPillBox, detachChildren, getDateObj, toTitleCase } from "../../../helpers/basicElements.js";
import { CardTile } from "../../components/tiles/cardTile/CardTile.js";
import { getBudgetData } from "../../databaseCallers/budgetDataCalls.js";

export class BudgetView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.date = getDateObj();
	    this.totalBudget = 8800;
        this.view = addClasses(createPillBox(), 'budgetView_view');
        this.fetch();
    }
    async fetch() {
        this.budgetList = await getBudgetData();
        console.log(this.budgetList);
        this.setView();
    }
	   setView() {
        appendChildren(this.view, [
        addClasses(createHeadingText(`Available budget in ${this.date.month} ${this.date.year}`), 'budgetView_heading'),
        appendChildren(addClasses(createElementContainer(), 'budgetView_bottomContainer'), [
            addClasses(createHeadingText('Budget Cards'), 'budgetView_heading'),
            appendChildren(addClasses(createElementContainer(), 'budgetView_cardContainer'), [
                ...this.budgetList.map((card) => {
                    return new CardTile(this.parentProps, card, ()=>{detachChildren(this.view); this.fetch();}).view;
                })
            ]),
		 appendChildren(addClasses(createElementContainer(), 'budgetView_budgetInfo'), [
                addClasses(createHeadingText(toTitleCase(`total budget: ${this.totalBudget}`),'budgetView_total')),
                addClasses(createHeadingText(toTitleCase(`total due without loan: ${this.totalDueNoLoan()}`)), 'budgetView_noLoan'),
		addClasses(createHeadingText(toTitleCase(`total due with loan: ${this.totalDue()}`)), 'budgetView_loan'),
        	addClasses(createHeadingText(toTitleCase(`total Budget Available: ${this.totalBudget - this.totalDueNoLoan()}`)), 'budgetView_available'),
		 ])

        ]),
        ]);
    }
    totalDueNoLoan(){
	this.result = 0;
        this.budgetList.map((card)=> {
            this.result += card.amountDue;
        })
        return (this.result - this.budgetList[4].amountDue);
    }
    totalDue(){
        this.result = 0;
        this.budgetList.map((card)=> {
            this.result += card.amountDue;
        })
        return (this.result);
    }
}
