/**
* BrandView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-08 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar, createPillBox } from "../../../helpers/basicElements.js";
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
            // addEvent(addClasses(createButton('get users'), 'brandView_addButton','brandView_button'), ()=>{this.getUsers()}),
            addEvent(addClasses(createButton('test user'), 'brandView_addButton','brandView_button'), ()=>{this.testUsers()}),
            
        ])
    }

    async getUsers(){
        console.log(await getUsers())
    }
    async testUsers(){
        console.log(await systemLogin(this.user.value, this.password.value, ()=>{const close = this.parentProps.displayBox(appendChildren(createPillBox(), [createHeadingText('Login Successfull'), addEvent(createButton('close'),()=>close())]))}, ()=>{const close = this.parentProps.displayBox(appendChildren(createPillBox(), [createHeadingText('Login failed. Please check user and password and try again.'), addEvent(createButton('close'),()=>close())]))}))
    }
}
