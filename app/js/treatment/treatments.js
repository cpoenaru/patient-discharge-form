/**
 * Treatments Module
 *
 * Handles all functionality related to treatments and recommendations
 */

// =============== OPERATIONS & TREATMENTS ===============

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