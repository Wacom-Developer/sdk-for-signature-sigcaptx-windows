System.register(["./SigCaptX-Globals", "./SigCaptX-WizSessionCtrl"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_Globals_1, SigCaptX_WizSessionCtrl_1, HTMLTags;
    var __moduleName = context_1 && context_1.id;
    function handleStartStop() {
        console.log("Start/stop clicked!");
        SigCaptX_WizSessionCtrl_1.WizardEventController.start_stop(3);
    }
    return {
        setters: [
            function (SigCaptX_Globals_1_1) {
                SigCaptX_Globals_1 = SigCaptX_Globals_1_1;
            },
            function (SigCaptX_WizSessionCtrl_1_1) {
                SigCaptX_WizSessionCtrl_1 = SigCaptX_WizSessionCtrl_1_1;
            }
        ],
        execute: function () {
            // Set up global variables referencing the HTML elements needed later
            exports_1("HTMLTags", HTMLTags = new SigCaptX_Globals_1.HTMLIds());
            // Declare event handlers for the buttons on the HTML form
            HTMLTags.btnStartStop.addEventListener("click", handleStartStop);
            // Now start up the wizard script
            SigCaptX_WizSessionCtrl_1.WizardEventController.body_onload();
        }
    };
});
