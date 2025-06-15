# Patient Discharge Form Generator

[![Deploy Status](https://img.shields.io/badge/deploy-active-success)](https://pages.cloudflare.com/)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE.md)

A web application for healthcare providers to create, manage, and export standardized patient discharge forms.

Built with vanilla JavaScript for maximum compatibility and deployed using [Cloudflare Pages](https://pages.cloudflare.com/).

## Overview

This application streamlines the patient discharge process for ophthalmological practices, replacing paper-based 
workflows with a digital solution that ensures consistency, accuracy, and efficiency in patient care documentation.

## Key Features

- **Patient Information** - Capture patient details
- **Examination Documentation**
  - Biomicroscopic examination records
  - Fundus examination findings
  - Support for additional specialized exams (OCT, Visual Field, Echography)
- **Clinical Documentation**
  - Intervention and surgical procedure details
  - Customizable treatment recommendations with precise dosage instructions
  - General restrictions and follow-up recommendations
- **Export & Sharing**
  - Generate print-ready discharge documents
  - Copy to clipboard functionality for EMR integration
  - Responsive design for use on any device


## Quick Start

Open the application at [https://your-deployment-url.pages.dev](https://your-deployment-url.pages.dev) or run it locally by opening `app/index.html` in any modern browser.

## Usage Guide

1. **Enter Patient Information**
   - Complete the patient demographics section

2. **Document Examination Findings**
   - Add biomicroscopy results
   - Document fundus examination
   - Include any specialized tests performed (OCT, Visual Field, etc.)

3. **Specify Treatment Plan**
   - Select appropriate medications with customizable dosage instructions
   - Add post-procedure care instructions
   - Include any activity restrictions or special instructions

4. **Generate & Export**
   - Click "Generate Form" to create the final document
   - Print directly from browser for patient records
   - Copy text to clipboard for EMR integration
   - Download as text file for your records

## Development

### Technology Stack

- HTML5
- CSS3 (modular organization)
- Vanilla JavaScript (ES6+)
- No external dependencies or frameworks

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/cpoenaru/patient-discharge-form.git
   cd patient-discharge-form
   ```

2. Open `app/index.html` in your browser

3. For live reloading during development, consider using a simple local server:
   ```bash
   npx serve app
   ```

## Deployment

The application is configured for deployment with Cloudflare Pages:

1. Fork this repository to your GitHub account
2. Connect your fork to Cloudflare Pages
3. Configure build settings:
   - Build command: (leave empty for static site)
   - Build output directory: `app`

## Contributing

We welcome contributions to improve the Patient Discharge Form Generator:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please use the provided issue templates for bug reports and feature requests.

## License

This project is licensed under the terms found in [LICENSE.md](LICENSE.md).

## Contact & Support

- Report issues via [GitHub Issues](https://github.com/cpoenaru/patient-discharge-form/issues)
