## Steps to use the repository

1. Download the repository
2. Run 'npm install' to install the node modules
3. Run 'npm start' to run the dev server at 'http://localhost:3000/' 

## Technology Used

1. Framework -React - As the application is highly view oriented
2. Design Libraries - Bootstrap - To leverage the Flexbox design
3. Design Libraries - SASS - To leverage the theming of the website
4. Basic routing is done considering scalability in future and to showcase coding ability 

## Architecture - Highly Scalable

1. React Atomic Architecture is implemented - chunks of components as atoms, molecules and organisms
2. Styling (SASS) Atomic Architecture is implemented - to support theming 
3. Custom components has been built - Custom Dropdown, Error Boundary (Toast)
4. REM concept implemented - Complete responsiveness of the website using a mixin (Refer calcRem() function in _mixins.scsss)
5. Global Utility functions implemented for scalability - eg., setLocalStorage, getLocalStorage, isEmptyObject, deepCopy, etc., (Refer utils/deps.js)
6. StringHelper.js implemented - A global file where all the normal texts are converted into constants. Helps in changing the content from one single file and also in language localisation

## Future Suggestions

1. BEM Styling will be implemented
2. Icons (SVG format) will be converted to fonts using icomoon, which helps in optimising performance
3. Module based access permission will be implemented
4. Language Localisation will be implemented making use of StringHelper.js