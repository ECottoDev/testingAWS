/**
* BudgetView.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-14 initial version
*/

import { addClasses, appendChildren, createElementContainer, createHeadingText, createPillBox, getDateObj } from "../../../helpers/basicElements.js";
import { getBudgetData } from "../../databaseCallers/budgetDataCalls.js";

export class BudgetView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.date = getDateObj();
        this.view = addClasses(createPillBox(), 'budgetView_view');
        this.fetch();
    }
    async fetch() {
        this.budgetList = await getBudgetData();
        console.log(this.budgetList);
        this.setView();
    }
    setView() {
        appendChildren(this.view, [(
            appendChildren(addClasses(createElementContainer(), 'budgetView_topContainer'), [
                addClasses(createHeadingText(`Available budget in ${this.date.month}`), 'budgetView_heading'),
                addClasses(createHeadingText(`${this.date.year}`), 'budgetView_amount')
            ])),
        appendChildren(addClasses(createElementContainer(), 'budgetView_bottomContainer'), [
            addClasses(createHeadingText('Budget Cards'), 'budgetView_heading'),
            appendChildren(addClasses(createElementContainer(), 'budgetView_cardContainer'), [
                ...this.budgetList.map((card) => {
                    return addClasses(createElementContainer(), 'budgetView_card');
                })
            ])
        ]),
        ]);

    }
}