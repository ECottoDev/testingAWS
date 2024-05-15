/**
* ResumeView.js
*
* @author Edwin Cotto <edtowers1037@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-February-03 initial version
*/

import { addClasses, appendChildren, createElementContainer, createHeadingText, sortArrayOfObj } from "../../../helpers/basicElements.js";
import { EducationHistory } from "../../containers/educationHistory/EducationHistory.js";
import { Skills } from "../../containers/skills/Skills.js";
import { WorkExperience } from "../../containers/workExperience/WorkExperience.js";
import { getEducationData, getExperienceData } from "../../databaseCallers/resumeDataCalls.js";

export class ResumeView {
    constructor(parentProps) {
        this.parentProps = parentProps;
        this.view = addClasses(createElementContainer(), 'resumeView_view');
        this.fetch();
    }
    async fetch() {
        this.educationData = await getEducationData();
        this.educationData.sort(sortArrayOfObj('-schoolYear'));
        this.experienceData = await getExperienceData();
        this.experienceData.sort(sortArrayOfObj('-id'));
        this.setView();
    }
    setView() {
        appendChildren(this.view, [
            appendChildren(addClasses(createElementContainer(), 'resumeView_educationHistory'), [
                new EducationHistory(this.parentProps).view
            ]),
            appendChildren(addClasses(createElementContainer(), 'resumeView_workHistory'), [
                new WorkExperience(this.parentProps).view
            ]),
            appendChildren(addClasses(createElementContainer(), 'resumeView_skills'), [
                new Skills(this.parentProps).view
            ]),

        ]);
    }
}