# BM Pure Favorite Projects Manager

## Overview

BM Pure Favorite Projects Manager is a JavaScript add-on designed to enhance the user experience of the Pure time administration web interface. It allows users to mark projects as favorites, which are then automatically expanded for easy access upon loading the website. This add-on simplifies navigation and improves efficiency, especially for users who frequently work with specific projects.

## Features
- **Favorite Projects**: Mark and unmark projects as favorites with a simple click.
- **Automatic Expansion**: Favorites are automatically expanded on the web interface when the page is loaded.
- **Persistent Favorites**: Favorite projects are saved and persist across sessions through cookies.

## Installation
BM Favorites Manager can be added to the Pure time writing web interface through browser add-ons that allow JavaScript code injection. The installation process involves injecting the provided script into the web interface.

### For Firefox Users:
We recommend using the [Code Injector add-on](https://addons.mozilla.org/en-US/firefox/addon/codeinjector/). Follow these steps to install:

1. Install the Code Injector add-on from the Firefox Add-ons store.
2. Open the Code Injector settings in your browser.
3. Add a new rule for the Pure time writing web interface URL.
4. Paste the JavaScript code of the BM Favorites Manager into the script section.
5. Save the rule to ensure the script runs every time you load the web interface.

### For Other Browsers:
For users of browsers other than Firefox, look for equivalent add-ons or extensions that allow you to inject custom JavaScript code. The installation steps are similar to those outlined for Firefox.

## Usage
Once installed, the Pure Favorite Projects Manager will automatically run when the Pure time writing web interface is loaded. 

- **Marking Favorites**: Click on the star icon next to a project to mark it as a favorite.
- **Unmarking Favorites**: Click on the star icon of a favorited project to remove it from favorites.
- **Viewing Favorites**: On loading the web interface, all favorited projects will be expanded automatically.

## Support
For support, issues, or feature requests, please open an issue in the GitHub project.

## License
This project is licensed under the GPL v3 License - see the [LICENSE](LICENSE) file for details.