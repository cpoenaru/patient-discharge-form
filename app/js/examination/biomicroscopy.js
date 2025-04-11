/**
 * Biomicroscopic Examination Module
 *
 * Handles all functionality related to biomicroscopic examinations
 * including UI setup, field handling, and data processing
 */

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