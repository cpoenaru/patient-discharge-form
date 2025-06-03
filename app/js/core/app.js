/**
 * Patient Discharge Form Application - Main Module
 *
 * This script initializes the application and coordinates
 * between different modules for a comprehensive patient discharge form
 */

// =============== INITIALIZATION & SETUP ===============

/**
 * Initialize the application when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initDateControls();
    setupBiomicroscopicDifferentialUI();
    setupFundusDifferentialUI();
    addAllEventListeners();
});

/**
 * Set the minimum date for the control date field to today
 */
function initDateControls() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    document.getElementById('controlDate').min = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

/**
 * Add all event listeners for the application
 */
function addAllEventListeners() {
    // Patient information checkboxes
    addPatientInfoToggleListeners();

    // Biomicroscopic examination checkboxes
    addBiomicroscopicCheckboxListeners();

    // Fundus examination checkboxes
    addFundusCheckboxListeners();

    // Vision/visualization toggles
    addVisionToggleListeners();

    // Additional examinations toggles
    addExaminationToggleListeners();
    addAdditionalExamsListeners();

    // Reflex foveolar selects
    addReflexFoveolarListeners();

    // Eye operation checkboxes
    addEyeOperationListeners();

    // Treatment options
    addTreatmentListeners();

    // Add buttons functionality
    addButtonListeners();
}

// Variables to track additional treatments and recommendations
let treatmentCount = 1;
let recommendationCount = 1;