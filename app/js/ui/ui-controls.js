/**
 * UI Controls Module
 *
 * Handles all UI control functionality related to toggling
 * visibility of form sections and handling special fields
 */

// =============== VISION & EXAMINATION TOGGLES ===============

/**
 * Add event listeners for patient information
 */
function addPatientInfoToggleListeners() {
    document.getElementById('pios_tratament_checkbox').addEventListener('change', function() {
        document.getElementById('pios_tratament').classList.toggle('hidden', !this.checked);
    });
    document.getElementById('piod_tratament_checkbox').addEventListener('change', function() {
        document.getElementById('piod_tratament').classList.toggle('hidden', !this.checked);
    })
}

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

    document.getElementById('gonioscopieCheckbox').addEventListener('change', function() {
        document.getElementById('gonioscopieFields').classList.toggle('hidden', !this.checked);
    });
}

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
 * Get eye measurement values (visual acuity, intraocular pressure)
 * @returns {string[]} Array of formatted eye measurement strings
 */
function getEyeMeasurements() {
    // New visual acuity fields
    const avodValue = document.getElementById('avod').value;
    const avosValue = document.getElementById('avos').value;
    const piodValue = document.getElementById('piod').value;
    const piodTreatmentChecked = document.getElementById('piod_tratament_checkbox').value;
    const piosTreatmentChecked = document.getElementById('piod_tratament_checkbox').value;
    const piodTreatment = piodTreatmentChecked ? document.getElementById('piod_tratament').value : '';
    const piosTreatment = piosTreatmentChecked ? document.getElementById('pios_tratament').value : '';
    const piosValue = document.getElementById('pios').value;
    const pleoapaodValue = document.getElementById('pleoapaod').value;
    const pleoapaosValue = document.getElementById('pleoapaos').value;

    // Only include values that are not empty, omit the FC/CC identifier
    const avod = avodValue ? 'AVOD: ' + avodValue : '';
    const avos = avosValue ? 'AVOS: ' + avosValue : '';
    let piod = !piodValue ? '' : 'PIOD: ' + piodValue + ' mmHg' + (!piodTreatment ? '' : ` sub tratament ${piodTreatment}`);
    let pios = !piosValue ? '': 'PIOS: ' + piosValue + ' mmHg' + (!piosTreatment ? '' : ` sub tratament ${piosTreatment}`);
    const pleoapaod = pleoapaodValue ? 'Pleoapa OD: ' + pleoapaodValue : '';
    const pleoapaos = pleoapaosValue ? 'Pleoapa OS: ' + pleoapaosValue : '';

    return [avod, avos, piod, pios, pleoapaod, pleoapaos].filter(item => item);
}