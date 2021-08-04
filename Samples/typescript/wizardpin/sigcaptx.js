System.register(["./SigCaptX-WizSessionCtrl"], function (exports_1, context_1) {
    "use strict";
    var SigCaptX_WizSessionCtrl_1, btnStartStopWizard;
    var __moduleName = context_1 && context_1.id;
    function handleStartStop() {
        console.log("Start/stop clicked!");
        SigCaptX_WizSessionCtrl_1.WizardEventController.start_stop(1);
    }
    return {
        setters: [
            function (SigCaptX_WizSessionCtrl_1_1) {
                SigCaptX_WizSessionCtrl_1 = SigCaptX_WizSessionCtrl_1_1;
            }
        ],
        execute: function () {
            // Declare event handlers for the buttons on the HTML form
            btnStartStopWizard = document.getElementById("btnStartStopWizard");
            btnStartStopWizard.addEventListener("click", handleStartStop);
            // Now start up the wizard script
            SigCaptX_WizSessionCtrl_1.WizardEventController.body_onload();
        }
    };
});
