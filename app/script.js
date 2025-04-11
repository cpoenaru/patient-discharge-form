/**
 * Patient Discharge Form Application
 *
 * This script manages the interactive behavior of a comprehensive
 * medical patient discharge form, handling multiple eye examinations,
 * differential diagnoses for each eye, treatments and recommendations.
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
    // Biomicroscopic examination checkboxes
    addBiomicroscopicCheckboxListeners();

    // Fundus examination checkboxes
    addFundusCheckboxListeners();

    // Vision/visualization toggles
    addVisionToggleListeners();

    // Additional examinations toggles
    addExaminationToggleListeners();

    // Reflex foveolar selects
    addReflexFoveolarListeners();

    // Eye operation checkboxes
    addEyeOperationListeners();

    // Treatment options
    addTreatmentListeners();

    // Add buttons functionality
    addButtonListeners();
}

// =============== BIOMICROSCOPIC EXAM FUNCTIONALITY ===============

/**
 * Create and set up the UI for biomicroscopic differential diagnosis
 */
function setupBiomicroscopicDifferentialUI() {
    // Create a div to hold the different values
    let differentValuesColumn = document.createElement('div');
    differentValuesColumn.id = 'bmDifferentValuesColumn';
    differentValuesColumn.className = 'eye-column hidden';
    differentValuesColumn.innerHTML = `
        <h3>Ambii Ochi (AO) - diferențe</h3>
        <div id="differentValuesContainer"></div>
    `;

    // Add this column to the eye-section after the bmaoAllFields column
    const bmaoContainer = document.querySelector('#bmaoAllFields');
    if (bmaoContainer && bmaoContainer.parentNode) {
        bmaoContainer.parentNode.insertBefore(
            differentValuesColumn,
            bmaoContainer.nextSibling
        );
    }
}

/**
 * Add event listeners for all biomicroscopic checkboxes
 */
function addBiomicroscopicCheckboxListeners() {
    const biomicroscopicFields = [
        'conjunctiva', 'sclera', 'cornee', 'ca', 'iris', 'pupila', 'cristalin'
    ];

    biomicroscopicFields.forEach(field => {
        const checkbox = document.getElementById(field + '_other');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                handleDifferentValue(field, this.checked);
            });
        }
    });

    // Checkbox for toggling between AO and individual eye columns
    document.getElementById('bmSameCheckbox').addEventListener('change', function() {
        if (this.checked) {
            resetBMODOS();
        } else {
            resetBMAO();
        }

        document.getElementById('bmaoAllFields').classList.toggle('hidden', !this.checked);
        document.getElementById('bmodAllFields').classList.toggle('hidden', this.checked);
        document.getElementById('bmosAllFields').classList.toggle('hidden', this.checked);
    });
}

/**
 * Handle toggling different values for biomicroscopic fields
 * @param {string} fieldName - The field name (e.g., 'conjunctiva', 'iris')
 * @param {boolean} isChecked - Whether the checkbox is checked
 */
function handleDifferentValue(fieldName, isChecked) {
    // Get the container for different values
    const container = document.getElementById('differentValuesContainer');
    const fieldId = fieldName + '_different';

    if (isChecked) {
        // Show the "diferențe" column
        document.getElementById('bmDifferentValuesColumn').classList.remove('hidden');

        // Change the label text to indicate it's for OD only
        document.querySelector(`label[for="${fieldName}_ao"]`).childNodes[0].nodeValue = `${getFieldLabel(fieldName)} OD:`;

        // Check if we already have a form field for this difference
        if (!document.getElementById(fieldId + '_os')) {
            // Create form fields for OD
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            formGroup.id = fieldId + '_container';

            const label = document.createElement('label');
            label.setAttribute('for', fieldId + '_os');
            label.textContent = `${getFieldLabel(fieldName)} OS:`;

            const input = document.createElement('input');
            input.type = 'text';
            input.id = fieldId + '_os';
            input.name = fieldId + '_os';
            input.placeholder = getDefaultValue(fieldName);

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            container.appendChild(formGroup);
        } else {
            // Just make it visible if it already exists
            document.getElementById(fieldId + '_container').classList.remove('hidden');
        }
    } else {
        // Change the label text back to normal
        document.querySelector(`label[for="${fieldName}_ao"]`).childNodes[0].nodeValue = `${getFieldLabel(fieldName)}:`;

        // Hide the specific field's form group if it exists
        const formGroup = document.getElementById(fieldId + '_container');
        if (formGroup) {
            formGroup.classList.add('hidden');
        }

        // Check if we should hide the "diferențe" column
        if (!document.querySelectorAll('#bmaoAllFields input[type="checkbox"]:checked').length) {
            document.getElementById('bmDifferentValuesColumn').classList.add('hidden');
        }
    }
}

/**
 * Get the proper field label for biomicroscopic fields
 * @param {string} fieldName - The field name
 * @returns {string} The human-readable label
 */
function getFieldLabel(fieldName) {
    const labels = {
        'conjunctiva': 'Conjunctiva',
        'sclera': 'Sclera',
        'cornee': 'Cornee',
        'ca': 'Camera anterioară',
        'iris': 'Iris',
        'pupila': 'Pupilă',
        'cristalin': 'Cristalin'
    };
    return labels[fieldName] || fieldName;
}

/**
 * Get default values for biomicroscopic fields
 * @param {string} fieldName - The field name
 * @returns {string} The default value
 */
function getDefaultValue(fieldName) {
    const defaults = {
        'conjunctiva': 'conjunctiva normal colorata',
        'sclera': 'sclera alb sidefie',
        'cornee': 'cornee transparenta, neteda, lucioasa',
        'ca': 'CA medie, libera',
        'iris': 'iris integru',
        'pupila': 'pupila reactiva, centrala, simetrica, rotunda',
        'cristalin': 'cristalin transparent'
    };
    return defaults[fieldName] || '';
}

/**
 * Reset all biomicroscopic AO fields
 */
function resetBMAO() {
    const ids = [
        "conjunctiva_ao", "sclera_ao", "cornee_ao", "ca_ao", "iris_ao", "pupila_ao", "cristalin_ao",
    ];
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).value = "";
    }

    // Reset the different value checkboxes
    document.querySelectorAll('#bmaoAllFields input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        handleDifferentValue(checkbox.id.replace('_other', ''), false);
    });

    // Reset any field values in the different values column
    document.querySelectorAll('#differentValuesContainer input').forEach(input => {
        input.value = "";
    });

    // Hide the different values column
    document.getElementById('bmDifferentValuesColumn').classList.add('hidden');
}

/**
 * Reset all biomicroscopic OD and OS fields
 */
function resetBMODOS() {
    const ids = [
        "conjunctiva_od", "sclera_od", "cornee_od", "ca_od", "iris_od", "pupila_od", "cristalin_od",
        "conjunctiva_os", "sclera_os", "cornee_os", "ca_os", "iris_os", "pupila_os", "cristalin_os",
    ];
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).value = "";
    }
}

// =============== FUNDUS EXAM FUNCTIONALITY ===============

/**
 * Create and set up the UI for fundus differential diagnosis
 */
function setupFundusDifferentialUI() {
    // Create a div to hold the different fundus values
    let foDifferentValuesColumn = document.createElement('div');
    foDifferentValuesColumn.id = 'foDifferentValuesColumn';
    foDifferentValuesColumn.className = 'eye-column hidden';
    foDifferentValuesColumn.innerHTML = `
        <h3>Ambii Ochi (AO) - diferențe</h3>
        <div id="foDifferentValuesContainer"></div>
    `;

    // Add this column to the eye-section after the foaoAllFields column
    const foaoAllFields = document.querySelector('#foaoAllFields');
    if (foaoAllFields && foaoAllFields.parentNode) {
        foaoAllFields.parentNode.insertBefore(
            foDifferentValuesColumn,
            foaoAllFields.nextSibling
        );
    }
}

/**
 * Add event listeners for all fundus checkboxes
 */
function addFundusCheckboxListeners() {
    const fundusFields = [
        'pno', 'cd', 'emergenta_vase', 'calibru_vase', 'macula', 'periferie'
    ];

    fundusFields.forEach(field => {
        const checkbox = document.getElementById(field + '_other');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                handleFundusDifferentValue(field, this.checked);
            });
        }
    });

    // Special handling for reflex foveolar which has a select and input
    const rfOtherCheckbox = document.getElementById('rf_other');
    if (rfOtherCheckbox) {
        rfOtherCheckbox.addEventListener('change', function() {
            handleReflexFoveolarDifferentValue(this.checked);
        });
    }

    // Checkbox for toggling between AO and individual eye columns
    document.getElementById('foSameCheckbox').addEventListener('change', function() {
        if (this.checked) {
            resetFoODOS();
        } else {
            resetFoAO();
        }

        document.getElementById('foaoAllFields').classList.toggle('hidden', !this.checked);
        document.getElementById('foodAllFields').classList.toggle('hidden', this.checked);
        document.getElementById('foosAllFields').classList.toggle('hidden', this.checked);
    });
}

/**
 * Handle toggling different values for fundus exam fields
 * @param {string} fieldName - The field name (e.g., 'pno', 'macula')
 * @param {boolean} isChecked - Whether the checkbox is checked
 */
function handleFundusDifferentValue(fieldName, isChecked) {
    // Get the container for different values
    const container = document.getElementById('foDifferentValuesContainer');
    const fieldId = fieldName + '_different';

    if (isChecked) {
        // Show the "diferențe" column
        document.getElementById('foDifferentValuesColumn').classList.remove('hidden');

        // Change the label text to indicate it's for OD only
        document.querySelector(`label[for="${fieldName}_ao"]`).childNodes[0].nodeValue = `${getFundusFieldLabel(fieldName)} OD:`;

        // Check if we already have a form field for this difference
        if (!document.getElementById(fieldId + '_os')) {
            // Create form fields for OS
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            formGroup.id = fieldId + '_container';

            const label = document.createElement('label');
            label.setAttribute('for', fieldId + '_os');
            label.textContent = `${getFundusFieldLabel(fieldName)} OS:`;

            const input = document.createElement('input');
            input.type = 'text';
            input.id = fieldId + '_os';
            input.name = fieldId + '_os';
            input.placeholder = getFundusDefaultValue(fieldName);

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            container.appendChild(formGroup);
        } else {
            // Just make it visible if it already exists
            document.getElementById(fieldId + '_container').classList.remove('hidden');
        }
    } else {
        // Change the label text back to normal
        document.querySelector(`label[for="${fieldName}_ao"]`).childNodes[0].nodeValue = `${getFundusFieldLabel(fieldName)}:`;

        // Hide the specific field's form group if it exists
        const formGroup = document.getElementById(fieldId + '_container');
        if (formGroup) {
            formGroup.classList.add('hidden');
        }

        // Check if we should hide the "diferențe" column
        if (!hasAnyFundusCheckboxChecked()) {
            document.getElementById('foDifferentValuesColumn').classList.add('hidden');
        }
    }
}

/**
 * Special handler for reflex foveolar which has a select and potentially an input
 * @param {boolean} isChecked - Whether the checkbox is checked
 */
function handleReflexFoveolarDifferentValue(isChecked) {
    // Get the container for different values
    const container = document.getElementById('foDifferentValuesContainer');
    const fieldId = 'rf_different';

    if (isChecked) {
        // Show the "diferențe" column
        document.getElementById('foDifferentValuesColumn').classList.remove('hidden');

        // Change the label text to indicate it's for OD only
        document.querySelector('label[for="rf_ao"]').childNodes[0].nodeValue = `Reflex foveolar OD:`;

        // Check if we already have a form field for this difference
        if (!document.getElementById(fieldId + '_os_container')) {
            // Create form fields for OS
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            formGroup.id = fieldId + '_os_container';

            const label = document.createElement('label');
            label.setAttribute('for', fieldId + '_os');
            label.textContent = `Reflex foveolar OS:`;

            // Create select element
            const select = document.createElement('select');
            select.id = fieldId + '_os';
            select.className = 'select-option';

            // Add options
            const options = [
                {value: 'reflex foveolar prezent', text: 'Prezent'},
                {value: 'reflex foveolar absent', text: 'Absent'},
                {value: 'other', text: 'Altul (specificați)'}
            ];

            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                select.appendChild(optionElement);
            });

            // Create the "other" input field
            const otherInput = document.createElement('input');
            otherInput.type = 'text';
            otherInput.id = fieldId + '_os_other';
            otherInput.className = 'hidden';
            otherInput.placeholder = 'Specificați reflexul foveolar';

            // Add change event to select to show/hide other input
            select.addEventListener('change', function() {
                otherInput.classList.toggle('hidden', this.value !== 'other');
            });

            formGroup.appendChild(label);
            formGroup.appendChild(select);
            formGroup.appendChild(otherInput);
            container.appendChild(formGroup);
        } else {
            // Just make it visible if it already exists
            document.getElementById(fieldId + '_os_container').classList.remove('hidden');
        }
    } else {
        // Change the label text back to normal
        document.querySelector('label[for="rf_ao"]').childNodes[0].nodeValue = `Reflex foveolar:`;

        // Hide the specific field's form group if it exists
        const formGroup = document.getElementById(fieldId + '_os_container');
        if (formGroup) {
            formGroup.classList.add('hidden');
        }

        // Check if we should hide the "diferențe" column
        if (!hasAnyFundusCheckboxChecked()) {
            document.getElementById('foDifferentValuesColumn').classList.add('hidden');
        }
    }
}

/**
 * Check if any fundus checkbox is checked
 * @returns {boolean} True if any fundus checkbox is checked
 */
function hasAnyFundusCheckboxChecked() {
    const fundusCheckboxes = [
        'pno_other', 'cd_other', 'emergenta_vase_other',
        'calibru_vase_other', 'macula_other', 'rf_other', 'periferie_other'
    ];

    for (const checkboxId of fundusCheckboxes) {
        if (document.getElementById(checkboxId) && document.getElementById(checkboxId).checked) {
            return true;
        }
    }

    return false;
}

/**
 * Get the proper field label for fundus fields
 * @param {string} fieldName - The field name
 * @returns {string} The human-readable label
 */
function getFundusFieldLabel(fieldName) {
    const labels = {
        'pno': 'Papila Nervului Optic',
        'cd': 'C/D (Raport Cap/Disc)',
        'emergenta_vase': 'Emergența vaselor',
        'calibru_vase': 'Calibru vase',
        'macula': 'Macula',
        'periferie': 'Periferie'
    };
    return labels[fieldName] || fieldName;
}

/**
 * Get default values for fundus fields
 * @param {string} fieldName - The field name
 * @returns {string} The default value
 */
function getFundusDefaultValue(fieldName) {
    const defaults = {
        'pno': 'PNO contur net, normal colorata',
        'cd': 'C/D - in limite fiziologice',
        'emergenta_vase': 'vase emergente central',
        'calibru_vase': 'calibru normal',
        'macula': 'macula fara leziuni',
        'periferie': 'periferie fara leziuni'
    };
    return defaults[fieldName] || '';
}

/**
 * Reset all fundus AO fields
 */
function resetFoAO() {
    const ids = [
        "pno_ao", "cd_ao", "emergenta_vase_ao", "calibru_vase_ao", "macula_ao", "periferie_ao"
    ];
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).value = "";
    }
    document.getElementById('rf_ao').value = "reflex foveolar prezent";
    document.getElementById('foaoCheckbox').checked = false;

    // Reset the different value checkboxes
    const fundusCheckboxes = [
        'pno_other', 'cd_other', 'emergenta_vase_other',
        'calibru_vase_other', 'macula_other', 'rf_other', 'periferie_other'
    ];

    fundusCheckboxes.forEach(checkboxId => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = false;
            // Call the appropriate handler based on field type
            if (checkboxId === 'rf_other') {
                handleReflexFoveolarDifferentValue(false);
            } else {
                handleFundusDifferentValue(checkboxId.replace('_other', ''), false);
            }
        }
    });

    // Reset any field values in the different values column
    document.querySelectorAll('#foDifferentValuesContainer input, #foDifferentValuesContainer select').forEach(input => {
        if (input.tagName === 'SELECT') {
            input.value = "reflex foveolar prezent";
        } else {
            input.value = "";
        }
    });

    // Hide the different values column
    if (document.getElementById('foDifferentValuesColumn')) {
        document.getElementById('foDifferentValuesColumn').classList.add('hidden');
    }
}

/**
 * Reset all fundus OD and OS fields
 */
function resetFoODOS() {
    const ids = [
        "pno_od", "cd_od", "emergenta_vase_od", "calibru_vase_od", "macula_od", "periferie_od",
        "pno_os", "cd_os", "emergenta_vase_os", "calibru_vase_os", "macula_os", "periferie_os",
    ];
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).value = "";
    }

    document.getElementById('rf_od').value = "reflex foveolar prezent";
    document.getElementById('rf_os').value = "reflex foveolar prezent";
    document.getElementById('rf_od_other').value = "";
    document.getElementById('rf_os_other').value = "";
    document.getElementById('foodCheckbox').checked = false;
    document.getElementById('foosCheckbox').checked = false;
}

// =============== VISION & EXAMINATION TOGGLES ===============

/**
 * Add event listeners for vision/visualization toggles
 */
function addVisionToggleListeners() {
    document.getElementById('foodCheckbox').addEventListener('change', function() {
        document.getElementById('foodFields').classList.toggle('hidden', this.checked);
    });

    document.getElementById('foosCheckbox').addEventListener('change', function() {
        document.getElementById('foosFields').classList.toggle('hidden', this.checked);
    });

    document.getElementById('foaoCheckbox').addEventListener('change', function() {
        document.getElementById('foaoFields').classList.toggle('hidden', this.checked);
    });
}

/**
 * Add event listeners for additional examination toggles
 */
function addExaminationToggleListeners() {
    document.getElementById('octCheckbox').addEventListener('change', function() {
        document.getElementById('octFields').classList.toggle('hidden', !this.checked);
    });

    document.getElementById('octMacularCheckbox').addEventListener('change', function() {
        document.getElementById('octMacularFields').classList.toggle('hidden', !this.checked);
    });

    document.getElementById('octNervCheckbox').addEventListener('change', function() {
        document.getElementById('octNervFields').classList.toggle('hidden', !this.checked);
    });

    document.getElementById('cvCheckbox').addEventListener('change', function() {
        document.getElementById('cvFields').classList.toggle('hidden', !this.checked);
    });

    document.getElementById('ecoCheckbox').addEventListener('change', function() {
        document.getElementById('ecoFields').classList.toggle('hidden', !this.checked);
    });
}

/**
 * Add event listeners for reflex foveolar selects
 */
function addReflexFoveolarListeners() {
    document.getElementById('rf_od').addEventListener('change', function() {
        document.getElementById('rf_od_other').classList.toggle('hidden', this.value !== 'other');
    });

    document.getElementById('rf_os').addEventListener('change', function() {
        document.getElementById('rf_os_other').classList.toggle('hidden', this.value !== 'other');
    });
}

// =============== OPERATIONS & TREATMENTS ===============

/**
 * Add event listeners for eye operation checkboxes
 */
function addEyeOperationListeners() {
    document.getElementById('ochiOperatOD').addEventListener('change', function() {
        document.getElementById('camputiOD').classList.toggle('hidden', !this.checked);
        document.getElementById('ochiOperatAO').checked = !!(this.checked && document.getElementById('ochiOperatOS').checked);
    });

    document.getElementById('ochiOperatOS').addEventListener('change', function() {
        document.getElementById('camputiOS').classList.toggle('hidden', !this.checked);
        document.getElementById('ochiOperatAO').checked = !!(this.checked && document.getElementById('ochiOperatOD').checked);
    });

    document.getElementById('ochiOperatAO').addEventListener('change', function() {
        if (this.checked) {
            // Check both eyes and show both sets of fields
            document.getElementById('ochiOperatOD').checked = true;
            document.getElementById('ochiOperatOS').checked = true;
            document.getElementById('camputiOD').classList.remove('hidden');
            document.getElementById('camputiOS').classList.remove('hidden');
        } else {
            // When unchecking AO, uncheck both individual eye selections
            document.getElementById('ochiOperatOD').checked = false;
            document.getElementById('ochiOperatOS').checked = false;
            document.getElementById('camputiOD').classList.add('hidden');
            document.getElementById('camputiOS').classList.add('hidden');
        }
    });
}

/**
 * Add event listeners for treatment options
 */
function addTreatmentListeners() {
    const treatmentOptions = [
        'tropicamida', 'betabioptal', 'maxitrol', 'indocollyre', 'ketorolac',
        'septozinc', 'dropsept', 'ducressa', 'trium', 'maxidex',
        'edenorm', 'ededay', 'edenight', 'floxal', 'loptic', 'hylocomod', 'thealozduo', 'vigamox', 'virgan', 'lubristil',
        'hylogel', 'corneregel', 'vitapos',
    ];

    treatmentOptions.forEach(treatment => {
        document.getElementById(treatment).addEventListener('change', function() {
            document.getElementById(treatment + '_details').classList.toggle('hidden', !this.checked);
        });
    });
}

// =============== FORM VALIDATION & GENERATION ===============

/**
 * Validate required fields and generate form if valid
 */
function validateAndGenerateForm() {
    // Clear any previous error states
    document.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });

    document.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });

    // Check required fields
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

    // If validation failed, scroll to the first error
    if (!isValid) {
        const firstError = document.querySelector('.input-error, .error-message');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // If validation passed, continue with form generation
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

    // Format the control date
    const controlDateText = formatControlDate();

    // Generate the discharge form
    let resultContent = `EXTERNARE ${numePrenumeValue}\n\n`;
    resultContent += `${istoricValue}\n\n`;

    // Add eye measurements
    if (eyeMeasurements.length > 0) {
        resultContent += eyeMeasurements.join('\n') + '\n\n';
    }

    // Add biomicroscopic results
    resultContent += biomicroscopicResults;

    // Add fundus results
    resultContent += fundusResults;

    // Add additional examinations if performed
    if (additionalExams.oct_results) {
        resultContent += `${additionalExams.oct_results}\n\n`;
    }

    if (additionalExams.cv_results) {
        resultContent += `${additionalExams.cv_results}\n\n`;
    }

    if (additionalExams.eco_results) {
        resultContent += `${additionalExams.eco_results}\n\n`;
    }

    // Add PC internare section only if there is a procedure description
    if (surgicalInfo.parcursInternare) {
        resultContent += `${surgicalInfo.parcursInternare}\n\n`;
    }

    // Add LA EXTERNARE section only if there is surgical information
    if (surgicalInfo.ext.length > 0 && surgicalInfo.ochiOperat) {
        resultContent += `LA EXTERNARE:\n${surgicalInfo.ext.join('\n')}\n\n`;
    }

    resultContent += `RECOMANDĂRI:\n`;

    // Number the recommendations
    let recNumber = 1;
    for (const rec of recommendations) {
        resultContent += `${recNumber}. ${rec}\n`;
        recNumber++;
    }

    if (treatments.length > 0) {
        resultContent += `\nTratament conform rețetei cu:\n`;
    }

    // Number the treatments too
    let treatNumber = 1;
    for (const treatment of treatments) {
        resultContent += `${treatNumber}. ${treatment}\n`;
        treatNumber++;
    }

    if (controlDateText) {
        resultContent += `\n\n${controlDateText}`;
    }

    // Display the result
    document.getElementById('resultContent').textContent = resultContent;
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');

    // Hide the sticky buttons when showing results
    document.querySelector('.sticky-buttons').classList.add('hidden');

    // Scroll to the top of the result container
    document.getElementById('resultContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Get visual acuity and intraocular pressure values
 * @returns {string[]} Array of formatted eye measurement strings
 */
function getEyeMeasurements() {
    // New visual acuity fields
    const avodValue = document.getElementById('avod').value;
    const avosValue = document.getElementById('avos').value;
    const piodValue = document.getElementById('piod').value;
    const piosValue = document.getElementById('pios').value;
    const pleoapaodValue = document.getElementById('pleoapaod').value;
    const pleoapaosValue = document.getElementById('pleoapaos').value;

    // Only include values that are not empty, omit the FC/CC identifier
    const avod = avodValue ? 'AVOD: ' + avodValue : '';
    const avos = avosValue ? 'AVOS: ' + avosValue : '';
    const piod = piodValue ? 'PIOD: ' + piodValue + ' mmHg' : '';
    const pios = piosValue ? 'PIOS: ' + piosValue + ' mmHg' : '';
    const pleoapaod = pleoapaodValue ? 'Pleoapa OD: ' + pleoapaodValue : '';
    const pleoapaos = pleoapaosValue ? 'Pleoapa OS: ' + pleoapaosValue : '';

    return [avod, avos, piod, pios, pleoapaod, pleoapaos].filter(item => item);
}

/**
 * Get biomicroscopic examination results
 * @returns {string} Formatted biomicroscopic results text
 */
function getBiomicroscopicResults() {
    let resultText = '';
    let bmSameValue = (document.getElementById('bmSameCheckbox').checked);

    if (bmSameValue) {
        // Create list of fields that have different values for OD and OS
        const bmDifferentFields = [];
        document.querySelectorAll('#bmaoAllFields input[type="checkbox"]:checked').forEach(checkbox => {
            const fieldName = checkbox.id.replace('_other', '');
            bmDifferentFields.push(fieldName);
        });

        // Get common fields (those that don't have different values)
        const commonFields = [];
        const fieldNames = ['conjunctiva', 'sclera', 'cornee', 'ca', 'iris', 'pupila', 'cristalin'];

        for (const field of fieldNames) {
            if (!bmDifferentFields.includes(field)) {
                commonFields.push(document.getElementById(field + '_ao').value || getDefaultValue(field));
            }
        }

        if (bmDifferentFields.length === 0) {
            resultText += `EXAMEN BIOMICROSCOPIC AO: ${commonFields.join(', ')}\n\n`;
        } else {
            // Generate the common fields text
            if (commonFields.length > 0) {
                resultText += `EXAMEN BIOMICROSCOPIC AO: ${commonFields.join(', ')}\n`;
            }

            // Map the different field IDs to their full names for the output
            const fieldNameMap = {
                'conjunctiva': 'conjunctiva',
                'sclera': 'sclera',
                'cornee': 'cornee',
                'ca': 'camera anterioară',
                'iris': 'iris',
                'pupila': 'pupila',
                'cristalin': 'cristalin'
            };

            // Get the values for each different field for OD and OS
            let odSpecificContent = [];
            let osSpecificContent = [];

            for (let i = 0; i < bmDifferentFields.length; i++) {
                const fieldName = bmDifferentFields[i];
                const fieldDisplayName = fieldNameMap[fieldName] || fieldName;

                const odValue = document.getElementById(fieldName + '_ao').value || getDefaultValue(fieldName);
                const osValue = document.getElementById(fieldName + '_different_os').value || getDefaultValue(fieldName);

                odSpecificContent.push(`${fieldDisplayName} ${odValue}`);
                osSpecificContent.push(`${fieldDisplayName} ${osValue}`);
            }

            if (odSpecificContent.length > 0) {
                if (commonFields.length > 0) {
                    resultText += `OD: ${odSpecificContent.join(', ')}\n`;
                } else {
                    resultText += `EXAMEN BIOMICROSCOPIC OD: ${odSpecificContent.join(', ')}\n`;
                }
            }

            if (osSpecificContent.length > 0) {
                if (commonFields.length > 0){
                resultText += `OS: ${osSpecificContent.join(', ')}\n`;}
            } else {
                resultText += `EXAMEN BIOMICROSCOPIC OS: ${osSpecificContent.join(', ')}\n`;
            }

            resultText += `\n`;
        }
    } else {
        const bmod = [
            document.getElementById('conjunctiva_od').value || 'conjunctiva normal colorata',
            document.getElementById('sclera_od').value || 'sclera alb sidefie',
            document.getElementById('cornee_od').value || 'cornee transparenta, neteda, lucioasa',
            document.getElementById('ca_od').value || 'CA medie, libera',
            document.getElementById('iris_od').value || 'iris integru',
            document.getElementById('pupila_od').value || 'pupila reactiva, centrala, simetrica, rotunda',
            document.getElementById('cristalin_od').value || 'cristalin transparent'
        ];

        const bmos = [
            document.getElementById('conjunctiva_os').value || 'conjunctiva normal colorata',
            document.getElementById('sclera_os').value || 'sclera alb sidefie',
            document.getElementById('cornee_os').value || 'cornee transparenta, neteda, lucioasa',
            document.getElementById('ca_os').value || 'CA medie, libera',
            document.getElementById('iris_os').value || 'iris integru',
            document.getElementById('pupila_os').value || 'pupila reactiva, centrala, simetrica, rotunda',
            document.getElementById('cristalin_os').value || 'cristalin transparent'
        ];

        resultText += `EXAMEN BIOMICROSCOPIC OD: ${bmod.join(', ')}\n`;
        resultText += `EXAMEN BIOMICROSCOPIC OS: ${bmos.join(', ')}\n\n`;
    }

    return resultText;
}

/**
 * Get fundus examination results
 * @returns {string} Formatted fundus results text
 */
function getFundusResults() {
    let resultText = '';
    let fundusSameValue = (document.getElementById('foSameCheckbox').checked);

    if (fundusSameValue) {
        // Create list of fields that have different values for OD and OS
        const foDifferentFields = [];
        const fundusCheckboxes = [
            {id: 'pno_other', field: 'pno'},
            {id: 'cd_other', field: 'cd'},
            {id: 'emergenta_vase_other', field: 'emergenta_vase'},
            {id: 'calibru_vase_other', field: 'calibru_vase'},
            {id: 'macula_other', field: 'macula'},
            {id: 'rf_other', field: 'rf'},
            {id: 'periferie_other', field: 'periferie'}
        ];

        fundusCheckboxes.forEach(item => {
            if (document.getElementById(item.id) && document.getElementById(item.id).checked) {
                foDifferentFields.push(item.field);
            }
        });

        // Handle "nu se vizualizează" checkbox
        if (document.getElementById("foaoCheckbox").checked) {
            resultText += `FUND DE OCHI AO: nu se vizualizează\n\n`;
        } else {
            // Get common fields (those that don't have different values)
            const commonFields = [];
            const fieldNames = ['pno', 'cd', 'emergenta_vase', 'calibru_vase', 'macula', 'rf', 'periferie'];

            for (const field of fieldNames) {
                if (!foDifferentFields.includes(field)) {
                    if (field === 'rf') {
                        // Special handling for reflex foveolar
                        let rf_ao_value;
                        if (document.getElementById('rf_ao').value === 'other') {
                            rf_ao_value = document.getElementById('rf_ao_other').value;
                        } else {
                            rf_ao_value = document.getElementById('rf_ao').value;
                        }
                        commonFields.push(rf_ao_value);
                    } else {
                        const defaultValue = getFundusDefaultValue(field);
                        commonFields.push(document.getElementById(field + '_ao').value || defaultValue);
                    }
                }
            }

            if (foDifferentFields.length === 0) {
                resultText += `FUND DE OCHI AO: ${commonFields.join(', ')}\n\n`;
            } else {
                // Generate the common fields text
                if (commonFields.length > 0) {
                    resultText += `FUND DE OCHI AO: ${commonFields.join(', ')}\n`;
                }

                // Map the different field IDs to their full names for the output
                const fieldNameMap = {
                    'pno': 'papila nervului optic',
                    'cd': 'C/D',
                    'emergenta_vase': 'emergența vaselor',
                    'calibru_vase': 'calibru vase',
                    'macula': 'macula',
                    'rf': 'reflex foveolar',
                    'periferie': 'periferie'
                };

                // Get the different values for OD and OS
                const differentFieldsOD = [];
                const differentFieldsOS = [];

                for (const field of foDifferentFields) {
                    if (field === 'rf') {
                        // Special handling for reflex foveolar
                        let rf_od_value;
                        if (document.getElementById('rf_ao').value === 'other') {
                            rf_od_value = document.getElementById('rf_ao_other').value;
                        } else {
                            rf_od_value = document.getElementById('rf_ao').value;
                        }
                        differentFieldsOD.push(rf_od_value);

                        let rf_os_value;
                        if (document.getElementById('rf_different_os').value === 'other') {
                            rf_os_value = document.getElementById('rf_different_os_other').value;
                        } else {
                            rf_os_value = document.getElementById('rf_different_os').value;
                        }
                        differentFieldsOS.push(rf_os_value);
                    } else {
                        const defaultValue = getFundusDefaultValue(field);
                        differentFieldsOD.push(document.getElementById(field + '_ao').value || defaultValue);
                        differentFieldsOS.push(document.getElementById(field + '_different_os').value || defaultValue);
                    }
                }

                if (differentFieldsOD.length > 0) {
                    resultText += `FUND DE OCHI OD: ${differentFieldsOD.join(', ')}\n`;
                }

                if (differentFieldsOS.length > 0) {
                    resultText += `FUND DE OCHI OS: ${differentFieldsOS.join(', ')}\n`;
                }

                resultText += `\n`;
            }
        }
    } else {
        let rf_od_value;
        if (document.getElementById('rf_od').value === 'other') {
            rf_od_value = document.getElementById('rf_od_other').value;
        } else {
            rf_od_value = document.getElementById('rf_od').value;
        }

        let rf_os_value;
        if (document.getElementById('rf_os').value === 'other') {
            rf_os_value = document.getElementById('rf_os_other').value;
        } else {
            rf_os_value = document.getElementById('rf_os').value;
        }

        // Handle C/D values - format as "C/D - [value]" if a value is entered
        const cdOdValue = document.getElementById('cd_od').value;
        const cdOsValue = document.getElementById('cd_os').value;

        const cdOdFormatted = cdOdValue ? (cdOdValue.startsWith('C/D') ? cdOdValue : `C/D - ${cdOdValue}`) : 'C/D - in limite fiziologice';
        const cdOsFormatted = cdOsValue ? (cdOsValue.startsWith('C/D') ? cdOsValue : `C/D - ${cdOsValue}`) : 'C/D - in limite fiziologice';

        const food = document.getElementById("foodCheckbox").checked ? ["nu se vizualizează"] : [
            document.getElementById('pno_od').value || 'PNO contur net, normal colorata',
            cdOdFormatted,
            document.getElementById('emergenta_vase_od').value || 'vase emergente central',
            document.getElementById('calibru_vase_od').value || 'calibru normal',
            document.getElementById('macula_od').value || 'macula fara leziuni',
            rf_od_value,
            document.getElementById('periferie_od').value || 'periferie fara leziuni'
        ];

        const foos = document.getElementById("foosCheckbox").checked ? ["nu se vizualizează"] : [
            document.getElementById('pno_os').value || 'PNO contur net, normal colorata',
            cdOsFormatted,
            document.getElementById('emergenta_vase_os').value || 'vase emergente central',
            document.getElementById('calibru_vase_os').value || 'calibru normal',
            document.getElementById('macula_os').value || 'macula fara leziuni',
            rf_os_value,
            document.getElementById('periferie_os').value || 'periferie fara leziuni'
        ];

        resultText += `FUND DE OCHI OD: ${food.join(', ')}\n`;
        resultText += `FUND DE OCHI OS: ${foos.join(', ')}\n\n`;
    }

    return resultText;
}

/**
 * Get additional examination results
 * @returns {Object} Object containing formatted examination results
 */
function getAdditionalExaminations() {
    let oct_results = '';
    let cv_results = '';
    let eco_results = '';

    if (document.getElementById('octCheckbox').checked) {
        let has_oct_data = false;

        if (document.getElementById('octMacularCheckbox').checked) {
            const oct_macular_od = document.getElementById('octMacular_od').value;
            const oct_macular_os = document.getElementById('octMacular_os').value;
            if (oct_macular_od || oct_macular_os) {
                oct_results += `OCT Macular OD: ${oct_macular_od}\nOCT Macular OS: ${oct_macular_os}\n`;
                has_oct_data = true;
            }
        }

        if (document.getElementById('octNervCheckbox').checked) {
            const oct_nerv_od = document.getElementById('octNerv_od').value;
            const oct_nerv_os = document.getElementById('octNerv_os').value;
            if (oct_nerv_od || oct_nerv_os) {
                oct_results += `OCT de nerv optic OD: ${oct_nerv_od}\nOCT de nerv optic OS: ${oct_nerv_os}`;
                has_oct_data = true;
            }
        }

        if (!has_oct_data) {
            oct_results = 'OCT efectuat.';
        }
    }

    if (document.getElementById('cvCheckbox').checked) {
        const cv_od = document.getElementById('cv_od').value;
        const cv_os = document.getElementById('cv_os').value;
        cv_results = `CV OD: ${cv_od}\nCV OS: ${cv_os}`;
    }

    if (document.getElementById('ecoCheckbox').checked) {
        const eco_od = document.getElementById('eco_od').value;
        const eco_os = document.getElementById('eco_os').value;
        eco_results = `Eco OD: ${eco_od}\nEco OS: ${eco_os}`;
    }

    return { oct_results, cv_results, eco_results };
}

/**
 * Get surgical information
 * @returns {Object} Object containing surgical information
 */
function getSurgicalInformation() {
    // Check if at least one eye is selected
    const ochiOperatOD = document.getElementById('ochiOperatOD').checked;
    const ochiOperatOS = document.getElementById('ochiOperatOS').checked;
    const ochiOperatAO = document.getElementById('ochiOperatAO').checked;

    // Get surgical information
    let ochiOperat = '';
    if (ochiOperatAO || (ochiOperatOD && ochiOperatOS)) {
        ochiOperat = 'AO';
    } else if (ochiOperatOD) {
        ochiOperat = 'OD';
    } else if (ochiOperatOS) {
        ochiOperat = 'OS';
    }

    let parcursInternare = '';
    if (ochiOperat) {
        parcursInternare = 'Pe parcursul internării, s-a efectuat: ' + ochiOperat + ' - ' +
            (document.getElementById('parcursInternare').value || '');
    }

    const ext = [];
    if (ochiOperatOD) {
        const avodOp = document.getElementById('avOperatOD').value;
        const piodOp = document.getElementById('piOperatOD').value;
        const bmodOp = document.getElementById('bmOperatOD').value;
        const foodOp = document.getElementById('foOperatOD').value;

        if (avodOp) ext.push('AVOD: ' + avodOp);
        if (piodOp) ext.push('PIOD: ' + piodOp);
        if (bmodOp) ext.push('BMOD: ' + bmodOp);
        if (foodOp) ext.push('FOOD: ' + foodOp);
    }

    if (ochiOperatOS) {
        const avosOp = document.getElementById('avOperatOS').value;
        const piosOp = document.getElementById('piOperatOS').value;
        const bmosOp = document.getElementById('bmOperatOS').value;
        const foosOp = document.getElementById('foOperatOS').value;

        if (avosOp) ext.push('AVOS: ' + avosOp);
        if (piosOp) ext.push('PIOS: ' + piosOp);
        if (bmosOp) ext.push('BMOS: ' + bmosOp);
        if (foosOp) ext.push('FOOS: ' + foosOp);
    }

    return { ochiOperat, parcursInternare, ext };
}

/**
 * Get recommendations
 * @returns {string[]} Array of recommendation strings
 */
function getRecommendations() {
    let recommendations = [];

    if (document.getElementById('restrictieGenerala').checked) {
        recommendations.push('Evită manipularea zonei, vânt, praf, frig, efort fizic intens.');
    }

    if (document.getElementById('restrictiePozitieFata').checked) {
        recommendations.push('Interzisă poziția cu fața în sus.');
    }

    if (document.getElementById('restrictieZbor').checked) {
        recommendations.push('Interzis zborul cu avionul până la control.');
    }

    for (let i = 1; i <= recommendationCount; i++) {
        const recValue = document.getElementById('recommendation' + i).value;
        if (recValue && recValue !== '-') {
            recommendations.push(recValue);
        }
    }

    return recommendations;
}

/**
 * Get treatments
 * @param {string} ochiOperat - The operated eye(s) (OD, OS, or AO)
 * @returns {string[]} Array of treatment strings
 */
function getTreatments(ochiOperat) {
    const treatmentOptions = [
        'tropicamida', 'betabioptal', 'maxitrol', 'indocollyre', 'ketorolac',
        'septozinc', 'dropsept', 'ducressa', 'trium', 'maxidex',
        'edenorm', 'ededay', 'edenight', 'floxal', 'loptic', 'hylocomod', 'thealozduo', 'vigamox', 'virgan', 'lubristil',
        'hylogel', 'corneregel', 'vitapos',
    ];

    let treatments = [];

    // Process standard treatments with custom parameters
    treatmentOptions.forEach(treatment => {
        if (document.getElementById(treatment).checked) {
            const qty = document.getElementById(treatment + '_qty').value;
            const freq = document.getElementById(treatment + '_freq').value;
            const days = document.getElementById(treatment + '_days').value;

            // Capitalize first letter
            const treatmentName = treatment.charAt(0).toUpperCase() + treatment.slice(1);

            treatments.push(`${treatmentName}: ${qty} pic x ${freq} / zi, ${days} zile` +
                          (ochiOperat ? ' - ' + ochiOperat : ''));
        }
    });

    // Process custom treatments
    for (let i = 1; i <= treatmentCount; i++) {
        const treatmentValue = document.getElementById('treatment' + i).value;
        if (treatmentValue && treatmentValue !== '-') {
            const qtyValue = document.getElementById('treatment' + i + '_qty').value || '';
            const freqValue = document.getElementById('treatment' + i + '_freq').value || '';
            const daysValue = document.getElementById('treatment' + i + '_days').value || '';

            let treatmentDetails = '';
            if (qtyValue && freqValue && daysValue) {
                treatmentDetails = `: ${qtyValue} pic x ${freqValue} / zi, ${daysValue} zile`;
            }

            treatments.push(treatmentValue + treatmentDetails + (ochiOperat ? ' - ' + ochiOperat : ''));
        }
    }

    return treatments;
}

/**
 * Format the control date
 * @returns {string} Formatted control date text
 */
function formatControlDate() {
    let controlDateText = '';
    const controlDateValue = document.getElementById('controlDate').value;

    if (controlDateValue) {
        // Parse the datetime-local value (format: "YYYY-MM-DDThh:mm")
        const parts = controlDateValue.split('T');
        if (parts.length === 2) {
            const datePart = parts[0];
            const timePart = parts[1];

            const dateParts = datePart.split('-');
            if (dateParts.length === 3) {
                // Format: "DD.MM.YYYY ora hh:mm"
                controlDateText = 'Control pe: ' + dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0] + ' ora ' + timePart;
            } else {
                controlDateText = 'Control pe: ' + controlDateValue;
            }
        } else {
            controlDateText = 'Control pe: ' + controlDateValue;
        }
    }

    return controlDateText;
}

/**
 * Escape HTML special characters in a string
 * @param {string} str - The string to escape
 * @returns {string} - The escaped string
 */
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

// =============== PRINT & EXPORT FUNCTIONALITY ===============

/**
 * Print the discharge form
 */
function printDischargeForm() {
    // Get the content to print
    const contentToPrint = document.getElementById('resultContent').innerHTML;
    const patientName = escapeHtml(document.getElementById('numePrenume').value);

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    // Set up the document in the new window
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ro">
        <head>
            <title>Externare - ${patientName}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #000;
                    background: #fff;
                    padding: 20px;
                    margin: 0;
                }
                #printContent {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            <div id="printContent">
                ${contentToPrint}
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 300);
}

/**
 * Download the discharge form as a text file
 */
function downloadDischargeForm() {
    const name = document.getElementById('numePrenume').value.replace(' ', '_');
    const textToDownload = document.getElementById('resultContent').textContent;
    const link = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = `externare_${name}`;
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * Copy the discharge form content to clipboard
 */
function copyToClipboard() {
    const textToCopy = document.getElementById('resultContent').textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Success feedback
        const copyButton = document.getElementById('copyButton');
        const originalText = copyButton.textContent;

        copyButton.textContent = 'Copiat!';
        copyButton.style.backgroundColor = '#27ae60';

        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.backgroundColor = '#3498db';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Nu s-a putut copia textul în clipboard. Încercați din nou.');
    });
}

/**
 * Send the discharge form content via email
 */
function sendEmail() {
    const emailSubject = encodeURIComponent("Externare " + document.getElementById('numePrenume').value);
    const emailBody = encodeURIComponent(document.getElementById('resultContent').textContent);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
}

/**
 * Add event listeners for all buttons
 */
function addButtonListeners() {
    // Add treatments button
    document.getElementById('addTreatment').addEventListener('click', addNewTreatment);

    // Add recommendations button
    document.getElementById('addRecommendation').addEventListener('click', addNewRecommendation);

    // Back to top button
    document.getElementById('backToTopButton').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Sticky generate button
    document.getElementById('generateButtonSticky').addEventListener('click', function() {
        document.getElementById('generateButton').click();
    });

    // Reset button
    document.getElementById('resetButton').addEventListener('click', resetForm);

    // Generate discharge form
    document.getElementById('generateButton').addEventListener('click', validateAndGenerateForm);

    // Print button
    document.getElementById('printButton').addEventListener('click', printDischargeForm);

    // Download button
    document.getElementById('downloadButton').addEventListener('click', downloadDischargeForm);

    // Copy to clipboard button
    document.getElementById('copyButton').addEventListener('click', copyToClipboard);

    // Email button
    document.getElementById('emailButton').addEventListener('click', sendEmail);

    // Back button
    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('formContainer').classList.remove('hidden');
        document.getElementById('resultContainer').classList.add('hidden');
        // Show the sticky buttons again when returning to the form
        document.querySelector('.sticky-buttons').classList.remove('hidden');
    });
}

// Variables to track additional treatments and recommendations
let treatmentCount = 1;
let recommendationCount = 1;

/**
 * Add a new treatment field
 */
function addNewTreatment() {
    treatmentCount++;
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <label for="treatment${treatmentCount}">Tratament suplimentar:</label>
        <input type="text" id="treatment${treatmentCount}" name="treatment${treatmentCount}" placeholder="Nume tratament">
        <div class="treatment-details">
            <input type="number" id="treatment${treatmentCount}_qty" min="1" placeholder="Picături" class="small-input">
            <span>pic x</span>
            <input type="number" id="treatment${treatmentCount}_freq" min="1" placeholder="Frecvență" class="small-input">
            <span>/ zi,</span>
            <input type="number" id="treatment${treatmentCount}_days" min="1" placeholder="Zile" class="small-input">
            <span>zile</span>
        </div>
    `;
    document.getElementById('additionalTreatments').appendChild(div);
}

/**
 * Add a new recommendation field
 */
function addNewRecommendation() {
    recommendationCount++;
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <label for="recommendation${recommendationCount}">Recomandare suplimentară:</label>
        <input type="text" id="recommendation${recommendationCount}" name="recommendation${recommendationCount}">
    `;
    document.getElementById('additionalRecommendations').appendChild(div);
}

/**
 * Reset the entire form
 */
function resetForm() {
    if (confirm('Sunteți sigur că doriți să resetați formularul? Toate datele introduse vor fi pierdute.')) {
        document.querySelectorAll('input[type="text"], input[type="date"], input[type="datetime-local"], textarea').forEach(input => {
            input.value = '';
            input.classList.remove('input-error');
        });

        // Reset Biomicroscopy
        resetBMAO();
        resetBMODOS();

        // Reset Fundus
        resetFoAO();
        resetFoODOS();

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            // Reset to default state
            checkbox.checked = checkbox.id === 'restrictieGenerala';
        });

        // Hide all conditional fields
        document.querySelectorAll('.hidden, .eye-fields, .treatment-details').forEach(el => {
            if (!el.classList.contains('hidden')) {
                el.classList.add('hidden');
            }
        });

        // Restore default values for treatment details
        const treatmentOptions = [
            'tropicamida', 'betabioptal', 'maxitrol', 'indocollyre', 'ketorolac',
            'septozinc', 'dropsept', 'ducressa', 'trium', 'maxidex',
            'edenorm', 'ededay', 'edenight', 'floxal', 'loptic', 'hylocomod', 'thealozduo', 'vigamox', 'virgan', 'lubristil',
            'hylogel', 'corneregel', 'vitapos',
        ];

        treatmentOptions.forEach(treatment => {
            document.getElementById(treatment + '_qty').value = treatment === 'edenight' ? '1' : '1';
            document.getElementById(treatment + '_freq').value = treatment === 'edenight' ? '1' : '4';
            document.getElementById(treatment + '_days').value = treatment === 'tropicamida' || treatment === 'betabioptal' ? '21' :
                                               (treatment === 'maxitrol' || treatment === 'indocollyre' ||
                                                treatment === 'ketorolac' || treatment === 'ducressa' ||
                                                treatment === 'trium' || treatment === 'maxidex') ? '14' : '7';
        });

        // Remove any error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });

        // Reset treatment and recommendation counters
        treatmentCount = 1;
        recommendationCount = 1;

        // Reset additional treatments and recommendations to just one field
        document.getElementById('additionalTreatments').innerHTML = `
            <div class="form-group">
                <label for="treatment1">Tratament suplimentar:</label>
                <input type="text" id="treatment1" name="treatment1" placeholder="Nume tratament">
                <div class="treatment-details">
                    <input type="number" id="treatment1_qty" min="1" placeholder="Picături" class="small-input">
                    <span>pic x</span>
                    <input type="number" id="treatment1_freq" min="1" placeholder="Frecvență" class="small-input">
                    <span>/ zi,</span>
                    <input type="number" id="treatment1_days" min="1" placeholder="Zile" class="small-input">
                    <span>zile</span>
                </div>
            </div>
        `;

        document.getElementById('additionalRecommendations').innerHTML = `
            <div class="form-group">
                <label for="recommendation1">Recomandare suplimentară:</label>
                <input type="text" id="recommendation1" name="recommendation1">
            </div>
        `;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}