/**
 * Export Tools Module
 *
 * Handles printing, downloading, clipboard, and email functionality
 */

// =============== PRINT & EXPORT FUNCTIONALITY ===============

/**
 * Print the discharge form
 */
function printDischargeForm() {
    // Get the content to print
    const contentToPrint = document.getElementById('resultContent').innerHTML;
    const patientName = escapeHtml(document.getElementById('numePrenume').value);

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    // Set up the document in the new window
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ro">
        <head>
            <title>Externare - ${patientName}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #000;
                    background: #fff;
                    padding: 20px;
                    margin: 0;
                }
                #printContent {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            <div id="printContent">
                ${contentToPrint}
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 300);
}

/**
 * Download the discharge form as a text file
 */
function downloadDischargeForm() {
    const name = document.getElementById('numePrenume').value.replace(' ', '_');
    const textToDownload = document.getElementById('resultContent').textContent;
    const link = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = `externare_${name}`;
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * Copy the discharge form content to clipboard
 */
function copyToClipboard() {
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
}

/**
 * Send the discharge form content via email
 */
function sendEmail() {
    const emailSubject = encodeURIComponent("Externare " + document.getElementById('numePrenume').value);
    const emailBody = encodeURIComponent(document.getElementById('resultContent').textContent);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
}