# _Emir Can Başaran Portfolio Website_

A clean, responsive personal portfolio website built with static HTML, CSS, and JavaScript.
This project showcases Emir Can Başaran's work, blog posts, resume, and contact details with a modern theme switcher and multilingual support.

## Key features

- Responsive layout optimized for desktop and mobile devices
- Theme switcher with light/dark mode persistence
- Bilingual interface with English and Turkish language support
- Dynamic GitHub repository portfolio section
- Live Medium blog preview integration
- Contact form and email link handling
- Minimal static site architecture for easy GitHub Pages deployment

## Getting Started

These instructions will help you get a local copy of the project running for development and review.

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: a local web server for better static file handling
  - Examples: `Live Server` VS Code extension, Python `http.server`, Node.js `serve`

### Install

1. Clone the repository:
   ```bash
   git clone https://github.com/basaran3mir/basaran3mir.github.io.git
   ```
2. Open the project folder in your editor or file manager.
3. Open `index.html` in your browser, or launch a local server from the project root.

## Usage

- Navigate using the sidebar to access Home, About, Resume, Portfolio, Blog, and Contact sections.
- Switch the site theme using the settings cog in the top-right corner.
- Change language with the language toggle button.
- View dynamically loaded GitHub repositories and Medium blog posts in the portfolio and blog sections.
- Use the contact form or email link to reach out directly.

## Project Structure

- `index.html` — main site entry point
- `static/css/` — styling and layout resources
  - `style.css` — compiled site stylesheet
  - `base/`, `layout/`, `sections/` — CSS organization for maintainability
- `static/js/` — application logic
  - `main.js` — site initialization
  - `ui.js` — UI interactions, navigation, repo/blog data loading
  - `theme.js` — theme toggle and persistence
  - `language.js` — language switching and string rendering
  - `typewriter.js` — typed text effects
- `static/js/services/` — API and browser storage services
  - `cacheService.js`
  - `githubService.js`
  - `mailService.js`
  - `mediumService.js`
- `static/assets/strings.json` — localized text content for the site
- `static/images/` — media assets and profile imagery
- `CNAME` — custom domain configuration for GitHub Pages

## Configuration

- `static/assets/strings.json` controls all localized UI text for English and Turkish.
- Theme state and language preferences are stored in browser local storage.
- Update external profile links in `index.html` under the footer social links.
- The GitHub portfolio and Medium sections load public data via client-side fetch operations.

## Development

1. Open the repository in your editor.
2. Make changes to HTML, CSS, or JavaScript files.
3. Preview locally by opening `index.html` in the browser or running a static server.
   - Example using Python:
     ```bash
     python -m http.server 8000
     ```
4. Refresh the browser to see updates.

## Contributing

Contributions are welcome. If you want to suggest improvements or updates:

- Fork the repository
- Create a feature branch
- Submit a pull request with a clear description of your changes

Please keep changes focused on content, accessibility, styling, or site performance.

## License

This repository is available under the terms of the MIT License.
See `LICENSE` for full details.

## Contact

- GitHub: https://github.com/basaran3mir
- LinkedIn: https://tr.linkedin.com/in/basaran3mir
- Medium: https://basaran3mir.medium.com
