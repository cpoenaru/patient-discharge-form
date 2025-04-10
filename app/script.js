// Set minimum date for control date to today
window.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    document.getElementById('controlDate').min = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
});

document.getElementById('foosCheckbox').addEventListener('change', function() {
    document.getElementById('foosFields').classList.toggle('hidden', this.checked);
});

document.getElementById('foodCheckbox').addEventListener('change', function() {
    document.getElementById('foodFields').classList.toggle('hidden', this.checked);
});

document.getElementById('foaoCheckbox').addEventListener('change', function() {
    document.getElementById('foaoFields').classList.toggle('hidden', this.checked);
});

document.getElementById('foodSameCheckbox').addEventListener('change', function() {
    if (this.checked) {
        // Delete all values for FOOD / FOOS
        const ids = [
            "pno_ao", "cd_ao", "emergenta_vase_ao", "calibru_vase_ao", "macula_ao", "periferie_ao"
        ]
        for (let i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).value = "";
        }
        document.getElementById('rf_ao').value = "reflex foveolar prezent"
    }
    else {
        // Delete all values for FOAO
        const ids = [
            "pno_od", "cd_od", "emergenta_vase_od", "calibru_vase_od", "macula_od", "periferie_od",
            "pno_os", "cd_os", "emergenta_vase_os", "calibru_vase_os", "macula_os", "periferie_os",
        ]
        for (let i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).value = "";
        }

        document.getElementById('rf_od').value = "reflex foveolar prezent"
        document.getElementById('rf_os').value = "reflex foveolar prezent"
        document.getElementById('rf_od_other').value = ""
        document.getElementById('rf_os_other').value = ""
    }
    document.getElementById('foaoAllFields').classList.toggle('hidden', !this.checked);
    document.getElementById('foodAllFields').classList.toggle('hidden', this.checked);
    document.getElementById('foosAllFields').classList.toggle('hidden', this.checked);
});

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

document.getElementById('rf_od').addEventListener('change', function() {
    document.getElementById('rf_od_other').classList.toggle('hidden', this.value !== 'other');
});

document.getElementById('rf_os').addEventListener('change', function() {
    document.getElementById('rf_os_other').classList.toggle('hidden', this.value !== 'other');
});

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

// Toggle treatment details visibility
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

// Add treatments
let treatmentCount = 1;
document.getElementById('addTreatment').addEventListener('click', function() {
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
});

// Add recommendations
let recommendationCount = 1;
document.getElementById('addRecommendation').addEventListener('click', function() {
    recommendationCount++;
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <label for="recommendation${recommendationCount}">Recomandare suplimentară:</label>
        <input type="text" id="recommendation${recommendationCount}" name="recommendation${recommendationCount}">
    `;
    document.getElementById('additionalRecommendations').appendChild(div);
});

// Back to top button functionality
document.getElementById('backToTopButton').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Make the sticky generate button work like the main one
document.getElementById('generateButtonSticky').addEventListener('click', function() {
    document.getElementById('generateButton').click();
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    if (confirm('Sunteți sigur că doriți să resetați formularul? Toate datele introduse vor fi pierdute.')) {
        document.querySelectorAll('input[type="text"], input[type="date"], input[type="datetime-local"], textarea').forEach(input => {
            input.value = '';
            input.classList.remove('input-error');
        });

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
});

// Generate discharge form
document.getElementById('generateButton').addEventListener('click', validateAndGenerateForm);

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

function markFieldAsError(field, message) {
    field.classList.add('input-error');

    // Add error message below the field
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Insert after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function generateDischargeForm() {
    // Get basic patient info
    const numePrenumeValue = document.getElementById('numePrenume').value;
    const istoricValue = document.getElementById('istoric').value;

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

    // Get biomicroscopy results
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

    // Get fundus examination results
    let foao = []
    let food = []
    let foos = []
    let fundusSameValue = false;
    if (document.getElementById('foodSameCheckbox').checked) {
        fundusSameValue = true;
        let rf_ao_value;
        if (document.getElementById('rf_ao').value === 'other') {
            rf_ao_value = document.getElementById('rf_ao_other').value;
        } else {
            rf_ao_value = document.getElementById('rf_ao').value;
        }

        // Handle C/D values - format as "C/D - [value]" if a value is entered
        const cdAoValue = document.getElementById('cd_ao').value;

        const cdOdFormatted = cdAoValue ? (cdAoValue.startsWith('C/D') ? cdAoValue : `C/D - ${cdAoValue}`) : 'C/D - in limite fiziologice';

        foao = document.getElementById("foaoCheckbox").checked ? ["nu se vizualizează"] : [
            document.getElementById('pno_ao').value || 'PNO contur net, normal colorata',
            cdOdFormatted,
            document.getElementById('emergenta_vase_ao').value || 'vase emergente central',
            document.getElementById('calibru_vase_ao').value || 'calibru normal',
            document.getElementById('macula_ao').value || 'macula fara leziuni',
            rf_ao_value,
            document.getElementById('periferie_ao').value || 'periferie fara leziuni'
        ];
    }
    else {
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

        food = document.getElementById("foodCheckbox").checked ? ["nu se vizualizează"] : [
            document.getElementById('pno_od').value || 'PNO contur net, normal colorata',
            cdOdFormatted,
            document.getElementById('emergenta_vase_od').value || 'vase emergente central',
            document.getElementById('calibru_vase_od').value || 'calibru normal',
            document.getElementById('macula_od').value || 'macula fara leziuni',
            rf_od_value,
            document.getElementById('periferie_od').value || 'periferie fara leziuni'
        ];

        foos = document.getElementById("foosCheckbox").checked ? ["nu se vizualizează"] : [
            document.getElementById('pno_os').value || 'PNO contur net, normal colorata',
            cdOsFormatted,
            document.getElementById('emergenta_vase_os').value || 'vase emergente central',
            document.getElementById('calibru_vase_os').value || 'calibru normal',
            document.getElementById('macula_os').value || 'macula fara leziuni',
            rf_os_value,
            document.getElementById('periferie_os').value || 'periferie fara leziuni'
        ];
    }

    // Get additional examinations
    let oct_results = '';
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

    let cv_results = '';
    if (document.getElementById('cvCheckbox').checked) {
        const cv_od = document.getElementById('cv_od').value;
        const cv_os = document.getElementById('cv_os').value;
        cv_results = `CV OD: ${cv_od}\nCV OS: ${cv_os}`;
    }

    let eco_results = '';
    if (document.getElementById('ecoCheckbox').checked) {
        const eco_od = document.getElementById('eco_od').value;
        const eco_os = document.getElementById('eco_os').value;
        eco_results = `Eco OD: ${eco_od}\nEco OS: ${eco_os}`;
    }

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

    // Get recommendations
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

    // Format the control date
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

    // Generate the discharge form
    let resultContent = `EXTERNARE ${numePrenumeValue}\n\n`;
    resultContent += `${istoricValue}\n\n`;

    // Add only non-empty vision and pressure measurements, separated by newlines
    const eyeMeasurements = [avod, avos, piod, pios, pleoapaod, pleoapaos].filter(item => item);
    if (eyeMeasurements.length > 0) {
        resultContent += eyeMeasurements.join('\n') + '\n\n';
    }

    // Comma-separated biomicroscopy values for OD
    resultContent += `EXAMEN BIOMICROSCOPIC OD: ${bmod.join(', ')}\n\n`;

    // Comma-separated biomicroscopy values for OS
    resultContent += `EXAMEN BIOMICROSCOPIC OS: ${bmos.join(', ')}\n\n`;

    if (fundusSameValue) {
        // Both fundus the same
        resultContent += `FUND DE OCHI AO: ${foao.join(', ')}\n\n`
    }
    else {
        // Comma-separated fundus examination values for OD & OS
        resultContent += `FUND DE OCHI OD: ${food.join(', ')}\n\n`;
        resultContent += `FUND DE OCHI OS: ${foos.join(', ')}\n\n`;
    }

    // Add additional examinations if performed
    if (oct_results) {
        resultContent += `${oct_results}\n\n`;
    }

    if (cv_results) {
        resultContent += `${cv_results}\n\n`;
    }

    if (eco_results) {
        resultContent += `${eco_results}\n\n`;
    }

    // Add PC internare section only if there is a procedure description
    if (parcursInternare) {
        resultContent += `${parcursInternare}\n\n`;
    }

    // Add LA EXTERNARE section only if there is surgical information
    if (ext.length > 0 && ochiOperat) {
        resultContent += `LA EXTERNARE:\n${ext.join('\n')}\n\n`;
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

// Print button
document.getElementById('printButton').addEventListener('click', function() {
    // Set specific print settings
    document.title = "Externare - " + document.getElementById('numePrenume').value;

    // Print only the externare section
    window.print();
});

// Download button
document.getElementById('downloadButton').addEventListener('click', function() {
    const name = document.getElementById('numePrenume').value.replace(' ', '_');
    const textToDownload = document.getElementById('resultContent').textContent;
    const link = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = `externare_${name}`;
    link.click()
    URL.revokeObjectURL(link.href);
});

// Copy to clipboard button
document.getElementById('copyButton').addEventListener('click', function() {
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
});

// email button
document.getElementById('emailButton').addEventListener('click', function() {
    const emailSubject = encodeURIComponent("Externare " + document.getElementById('numePrenume').value);
    const emailBody = encodeURIComponent(document.getElementById('resultContent').textContent);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
});

// Back button
document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
    // Show the sticky buttons again when returning to the form
    document.querySelector('.sticky-buttons').classList.remove('hidden');
});