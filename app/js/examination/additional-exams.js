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
    let gonio_results = '';

    if (document.getElementById('octCheckbox').checked) {
        let has_oct_data = false;

        if (document.getElementById('octMacularCheckbox').checked) {
            const octMacularSameCheckbox = document.getElementById('octMacularSameCheckbox');

            if (octMacularSameCheckbox && octMacularSameCheckbox.checked) {
                const oct_macular_ao = document.getElementById('octMacular_ao').value;
                if (oct_macular_ao) {
                    oct_results += `OCT Macular AO: ${oct_macular_ao}\n`;
                    has_oct_data = true;
                }
            } else {
                const oct_macular_od = document.getElementById('octMacular_od').value;
                const oct_macular_os = document.getElementById('octMacular_os').value;
                if (oct_macular_od || oct_macular_os) {
                    oct_results += `OCT Macular OD: ${oct_macular_od}\nOCT Macular OS: ${oct_macular_os}\n`;
                    has_oct_data = true;
                }
            }
        }

        if (document.getElementById('octNervCheckbox').checked) {
            const octNervSameCheckbox = document.getElementById('octNervSameCheckbox');

            if (octNervSameCheckbox && octNervSameCheckbox.checked) {
                const oct_nerv_ao = document.getElementById('octNerv_ao').value;
                if (oct_nerv_ao) {
                    oct_results += `OCT de nerv optic AO: ${oct_nerv_ao}`;
                    has_oct_data = true;
                }
            } else {
                const oct_nerv_od = document.getElementById('octNerv_od').value;
                const oct_nerv_os = document.getElementById('octNerv_os').value;
                if (oct_nerv_od || oct_nerv_os) {
                    oct_results += `OCT de nerv optic OD: ${oct_nerv_od}\nOCT de nerv optic OS: ${oct_nerv_os}`;
                    has_oct_data = true;
                }
            }
        }

        if (!has_oct_data) {
            oct_results = 'OCT efectuat.';
        }
    }

    if (document.getElementById('cvCheckbox').checked) {
        const cvSameCheckbox = document.getElementById('cvSameCheckbox');

        if (cvSameCheckbox && cvSameCheckbox.checked) {
            const cv_ao = document.getElementById('cv_ao').value;
            cv_results = `CV AO: ${cv_ao}`;
        } else {
            const cv_od = document.getElementById('cv_od').value;
            const cv_os = document.getElementById('cv_os').value;
            cv_results = `CV OD: ${cv_od}\nCV OS: ${cv_os}`;
        }
    }

    if (document.getElementById('ecoCheckbox').checked) {
        const ecoSameCheckbox = document.getElementById('ecoSameCheckbox');

        if (ecoSameCheckbox && ecoSameCheckbox.checked) {
            const eco_ao = document.getElementById('eco_ao').value;
            eco_results = `Eco AO: ${eco_ao}`;
        } else {
            const eco_od = document.getElementById('eco_od').value;
            const eco_os = document.getElementById('eco_os').value;
            eco_results = `Eco OD: ${eco_od}\nEco OS: ${eco_os}`;
        }
    }

    if (document.getElementById('gonioscopieCheckbox').checked) {
        const gonioscopieSameCheckbox = document.getElementById('gonioscopieSameCheckbox');

        if (gonioscopieSameCheckbox && gonioscopieSameCheckbox.checked) {
            const gonio_ao = document.getElementById('gonioscopie_ao').value;
            gonio_results = `Gonioscopie AO: ${gonio_ao}`;
        } else {
            const gonio_od = document.getElementById('gonioscopie_od').value;
            const gonio_os = document.getElementById('gonioscopie_os').value;
            gonio_results = `Gonioscopie OD: ${gonio_od}\nGonioscopie OS: ${gonio_os}`;
        }
    }

    return { oct_results, cv_results, eco_results, gonio_results };
}

function addAdditionalExamsListeners() {
    document.getElementById('octMacularSameCheckbox').addEventListener('change', function() {
        const odColumn = document.getElementById('octMacularodAllFields');
        const osColumn = document.getElementById('octMacularosAllFields');
        const aoColumn = document.getElementById('octMacularaoAllFields');

        if (this.checked) {
            odColumn.classList.add('hidden');
            osColumn.classList.add('hidden');
            aoColumn.classList.remove('hidden');
            document.getElementById('octMacular_ao').value = document.getElementById('octMacular_od').value;
        } else {
            aoColumn.classList.add('hidden');
            odColumn.classList.remove('hidden');
            osColumn.classList.remove('hidden');
        }
    });

    document.getElementById('octNervSameCheckbox').addEventListener('change', function() {
        const odColumn = document.getElementById('octNervodAllFields');
        const osColumn = document.getElementById('octNervosAllFields');
        const aoColumn = document.getElementById('octNervaoAllFields');

        if (this.checked) {
            odColumn.classList.add('hidden');
            osColumn.classList.add('hidden');
            aoColumn.classList.remove('hidden');
            document.getElementById('octNerv_ao').value = document.getElementById('octNerv_od').value;
        } else {
            aoColumn.classList.add('hidden');
            odColumn.classList.remove('hidden');
            osColumn.classList.remove('hidden');
        }
    });

    document.getElementById('cvSameCheckbox').addEventListener('change', function() {
        const odColumn = document.getElementById('cvodAllFields');
        const osColumn = document.getElementById('cvosAllFields');
        const aoColumn = document.getElementById('cvaoAllFields');

        if (this.checked) {
            odColumn.classList.add('hidden');
            osColumn.classList.add('hidden');
            aoColumn.classList.remove('hidden');
            document.getElementById('cv_ao').value = document.getElementById('cv_od').value;
        } else {
            aoColumn.classList.add('hidden');
            odColumn.classList.remove('hidden');
            osColumn.classList.remove('hidden');
        }
    });

    document.getElementById('ecoSameCheckbox').addEventListener('change', function() {
        const odColumn = document.getElementById('ecoodAllFields');
        const osColumn = document.getElementById('ecoosAllFields');
        const aoColumn = document.getElementById('ecoaoAllFields');

        if (this.checked) {
            odColumn.classList.add('hidden');
            osColumn.classList.add('hidden');
            aoColumn.classList.remove('hidden');
            document.getElementById('eco_ao').value = document.getElementById('eco_od').value;
        } else {
            aoColumn.classList.add('hidden');
            odColumn.classList.remove('hidden');
            osColumn.classList.remove('hidden');
        }
    });

    document.getElementById('gonioscopieSameCheckbox').addEventListener('change', function() {
        const odColumn = document.getElementById('gonioscopieodAllFields');
        const osColumn = document.getElementById('gonioscopieosAllFields');
        const aoColumn = document.getElementById('gonioscopieaoAllFields');

        if (this.checked) {
            odColumn.classList.add('hidden');
            osColumn.classList.add('hidden');
            aoColumn.classList.remove('hidden');
            document.getElementById('gonioscopie_ao').value = document.getElementById('gonioscopie_od').value;
        } else {
            aoColumn.classList.add('hidden');
            odColumn.classList.remove('hidden');
            osColumn.classList.remove('hidden');
        }
    });
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