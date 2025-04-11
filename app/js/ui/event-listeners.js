/**
 * Event Listeners Module
 *
 * Handles all button click events and other user interactions
 */

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