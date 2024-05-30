/**
* BrandView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-08 initial version
*/

import { addClasses, appendChildren, createElementContainer, createHeadingText, createImg } from "../../../helpers/basicElements.js";

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
            appendChildren(addClasses(createElementContainer(), 'brandView_background'), [
                // addClasses(createImg('frontend/assets/images/imgPlaceholder.png'), 'brandView_backgroundImage'),])
                createHeadingText("Sorry, this page is under construction.")])
        ]);
    }
}
