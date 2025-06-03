/**
 * Form Validation Module
 *
 * Handles form validation and form generation
 */

// =============== FORM VALIDATION & GENERATION ===============

/**
 * Validate required fields and generate form if valid
 */
function validateAndGenerateForm() {
    document.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });

    document.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });

    const numePrenume = document.getElementById('numePrenume');
    const istoric = document.getElementById('istoric');

    let isValid = true;

    if (!numePrenume.value.trim()) {
        markFieldAsError(numePrenume, 'Acest câmp este obligatoriu');
        isValid = false;
    }

    if (!istoric.value.trim()) {
        markFieldAsError(istoric, 'Acest câmp este obligatoriu');
        isValid = false;
    }

    if (!isValid) {
        const firstError = document.querySelector('.input-error, .error-message');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    generateDischargeForm();
}

/**
 * Mark a field as having an error
 * @param {HTMLElement} field - The field with the error
 * @param {string} message - The error message to display
 */
function markFieldAsError(field, message) {
    field.classList.add('input-error');

    // Add error message below the field
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Insert after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

/**
 * Generate the discharge form based on user input
 */
function generateDischargeForm() {
    // Get basic patient info
    const numePrenumeValue = document.getElementById('numePrenume').value;
    const istoricValue = document.getElementById('istoric').value;

    // Get visual acuity and intraocular pressure values
    const eyeMeasurements = getEyeMeasurements();

    // Get biomicroscopic examination results
    const biomicroscopicResults = getBiomicroscopicResults();

    // Get fundus examination results
    const fundusResults = getFundusResults();

    // Get additional examinations
    const additionalExams = getAdditionalExaminations();

    // Get surgical information
    const surgicalInfo = getSurgicalInformation();

    // Get recommendations and treatments
    const recommendations = getRecommendations();
    const treatments = getTreatments(surgicalInfo.ochiOperat);

    const controlDateText = formatControlDate();

    let resultContent = `EXTERNARE ${numePrenumeValue}\n\n`;
    resultContent += `${istoricValue}\n\n`;

    if (eyeMeasurements.length > 0) {
        resultContent += eyeMeasurements.join('\n') + '\n\n';
    }

    resultContent += biomicroscopicResults;

    resultContent += fundusResults;

    if (additionalExams.oct_results) {
        resultContent += `${additionalExams.oct_results}\n\n`;
    }

    if (additionalExams.cv_results) {
        resultContent += `${additionalExams.cv_results}\n\n`;
    }

    if (additionalExams.eco_results) {
        resultContent += `${additionalExams.eco_results}\n\n`;
    }

    if (additionalExams.gonio_results) {
        resultContent += `${additionalExams.gonio_results}\n\n`;
    }

    if (surgicalInfo.parcursInternare) {
        resultContent += `${surgicalInfo.parcursInternare}\n\n`;
    }

    if (surgicalInfo.ext.length > 0 && surgicalInfo.ochiOperat) {
        resultContent += `LA EXTERNARE:\n${surgicalInfo.ext.join('\n')}\n\n`;
    }

    resultContent += `RECOMANDĂRI:\n`;

    let recNumber = 1;
    for (const rec of recommendations) {
        resultContent += `${recNumber}. ${rec}\n`;
        recNumber++;
    }

    if (treatments.length > 0) {
        resultContent += `\nTratament conform rețetei cu:\n`;
    }

    let treatNumber = 1;
    for (const treatment of treatments) {
        resultContent += `${treatNumber}. ${treatment}\n`;
        treatNumber++;
    }

    if (controlDateText) {
        resultContent += `\n\n${controlDateText}`;
    }

    document.getElementById('resultContent').textContent = resultContent;
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');

    document.querySelector('.sticky-buttons').classList.add('hidden');

    document.getElementById('resultContainer').scrollIntoView({behavior: 'smooth', block: 'start'});
}