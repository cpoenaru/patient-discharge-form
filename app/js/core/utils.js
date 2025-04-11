/**
 * Utilities Module
 *
 * Contains general utility functions used throughout the application
 */

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