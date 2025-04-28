/**
 * Additional Examinations Module
 *
 * Handles functionality for additional examinations like OCT, CV, and ECO
 */

/**
 * Get additional examination results
 * @returns {Object} Object containing formatted examination results
 */
function getAdditionalExaminations() {
    let oct_results = '';
    let cv_results = '';
    let eco_results = '';
    let gonio_results = ''

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

    if (document.getElementById('gonioscopieCheckbox').checked) {
        const gonio_od = document.getElementById('gonioscopie_od').value;
        const gonio_os = document.getElementById('gonioscopie_os').value;
        gonio_results = `Gonioscopie OD: ${gonio_od}\nGonioscopie OS: ${gonio_os}`;
    }

    return { oct_results, cv_results, eco_results, gonio_results };
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