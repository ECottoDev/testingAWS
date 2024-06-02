/**
* BrandView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-08 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar } from "../../../helpers/basicElements.js";
import { getUsers, systemLogin } from "../../databaseCallers/loginDataCalls.js";


export class BrandView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.view = addClasses(createElementContainer(), 'brandView_view');
        this.fetch();
    }
    async fetch() {
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Poly Brand', { bold: true }), 'brandView_heading'),
            this.user = createInputBar({ placeholder: 'User' }),
            this.password = createInputBar({type: 'password', placeholder: 'Password' }),
            addEvent(addClasses(createButton('get users'), 'brandView_addButton','brandView_button'), ()=>{this.getUsers()}),
            
        ])
    }

    async getUsers(){
        console.log(await getUsers())
        console.log(this.user.value, this.password.value)
        console.log(await systemLogin(this.user.value, this.password.value))
    }
}
