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
        location.reload();
    }
}