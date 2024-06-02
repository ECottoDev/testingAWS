/**
* LoginView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-08 initial version
*/

import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createInputBar } from "../../../helpers/basicElements.js";
import { getUsers, systemLogin } from "../../databaseCallers/loginDataCalls.js";


export class LoginView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.view = addClasses(createElementContainer(), 'LoginView_view');
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            addClasses(createHeadingText('Login', { bold: true }), 'LoginView_heading'),
            this.username = addClasses(createInputBar({placeholder:'Username'}), 'LoginView_heading'),
            this.password = addClasses(createInputBar({placeholder:'Password'}), 'LoginView_heading'),
            addEvent(addClasses(createButton('Login'), 'LoginView_heading'), () => { this.submitLogin()}),
            addEvent(addClasses(createButton('xonsole'), 'LoginView_heading'), () => { this.submitLogin()})
        
        ])
    }

    async submitLogin() {
        //await systemLogin(this.username.value, this.password.value);
        await getUsers();
    }
}
