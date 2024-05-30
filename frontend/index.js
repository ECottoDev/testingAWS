
import { addClasses, addEvent, appendChildren, createButton, createElementContainer, createHeadingText, createImg, createSVG, createSVGButton, createScrollArea, detachChildren, getURLParam, navigate, parseRequestURL, toPhoneFormat } from "../helpers/basicElements.js";
import { routes } from "../helpers/router.js";
import { DisplayBox } from "./components/displayBox/DisplayBox.js";
import { NavigationBar } from "./containers/navigationBar/NavigationBar.js";
import { BudgetView } from "./views/budgetView/BudgetView.js";
import { ResumeView } from "./views/resumeView/ResumeView.js";
import { BrandView } from "./views/brandView/BrandView.js";

window.onload = async () => { appendChildren(document.getElementById('root'), [new Index().view]); }

export class Index {
    constructor() {
        window.onhashchange = () => { this.setNavState() };
        const root = document.getElementById('root');
        this.displayBox = new DisplayBox(root);
        this.setNavObj();
        this.setAppProps();
        this.container = addClasses(createScrollArea(), 'index_container');
        this.view = addClasses(createElementContainer(), 'index_view');
        this.setView();
    }
    setAppProps() {
        const root = document.getElementById('root');
        //if any problems arise with the appProps, add {}, before the swirly brackets
        this.appProps = Object.assign({
            displayBox: this.displayBox.display,
            setNavState: this.setNavState.bind(this),
            showMsg: () => { console.log('display showMessage'); }
        });
    }
    async setView() {
        appendChildren(detachChildren(this.view), [
            appendChildren(addClasses(createElementContainer(), 'index_navBarContainer'), [
                addEvent(addClasses(createSVGButton('frontend/assets/icons/lucifer.svg'), 'index_lucifer'), () => { this.setNavState(routes.HOME_VIEW); }),
                this.navBar = addClasses(new NavigationBar(this.appProps).view, 'index_navBar'),
                addClasses(createHeadingText('Edwin Cotto Resume', { bold: true }), 'index_heading'),
                addClasses(createHeadingText('Full Stack Developer\n', { italic: true }), 'index_heading2'),
                //addClasses(createHeadingText(toPhoneFormat('7875858791')))
		    ]),
            this.container,
        ]);
        this.setNavState(this.navState, this.setParams());
    }
    /**
     * helps to set the navigation object and move from pages
     */
    setNavObj() {
        this.navigation = {
            [routes.HOME_VIEW]: () => new ResumeView(this.appProps).view,
            [routes.BUDGET_VIEW]: () => new BudgetView(this.appProps).view,
            [routes.POLY_VIEW]: () => new BrandView(this.appProps).view, 
	}
    }
    /**
     * helps to direct the user to another page
     * @param {*} hash 
     * @param {*} params (default = false) 
     */
    async setNavState(hash = '', params = false) {
        hash && navigate(hash, params);
        this.navState = parseRequestURL().split('?')[0];
        if (this.navState == '' || this.navState == '#/' || this.navState == '/' || !this.navigation[this.navState]) {
            this.navState = routes.HOME_VIEW;
            navigate(this.navState);
        }
        const navView = this.navigation[this.navState] ? this.navigation[this.navState]() : false;
        (navView && this.navigation[this.navState]) && appendChildren(detachChildren(this.container), navView);
    }
    /**
     * helps to get the params to the url
     */
    setParams() {
        const URLParams = getURLParam();
        return URLParams.success ? URLParams.urlParam : false;
    }
}

