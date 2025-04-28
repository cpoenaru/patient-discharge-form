/**
 * Fundus Examination Module
 *
 * Handles all functionality related to fundus examinations
 * including UI setup, field handling, and data processing
 */

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
                    resultText += `OD: ${differentFieldsOD.join(', ')}\n`;
                }

                if (differentFieldsOS.length > 0) {
                    resultText += `OS: ${differentFieldsOS.join(', ')}\n`;
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