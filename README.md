# Feladat megvalósítása

## Kezdőoldal

A kezdőoldalon elhelyezésre kerültek a csatlakozás és a szoba létrehozásának elemei. Amennyiben a felhasználó üresen hagyja valamelyik mezőt, akkor azt alul hibaüzenetként jelzi az oldal a felhasználónak.
A játékszabályzat gombra kattintva pedig egy új oldal nyílik fel, ahol elérhető az eredeti oldalról származó játékleírás.

## Várakozó szoba

Miután a felhasználó létrehozott vagy csatlakozott egy szobához, utána átkerül a várakozó szobába. Itt a már belépett játékosok alatt egy-egy pipa jelenik meg, míg az üres játékosok alatt egy-egy töltő karika jelenik meg.
A tesztelés miatt egy játék indítása gomb is felkerült, hogy tovább tudjunk lépni a játék oldalra.

## Játékoldal

A játékoldal betöltésekor alul választani kell a célok közül, majd a kész gombra nyomva továbbléphetünk.
A játékpanel bal felén láthatóak a játékosok adatai. Az ikonok balról jobbra haladva ezeket jelentik: körök száma, vasúti kocsik száma, kézben lévő lapok száma, célok száma. Az előzmények gombra kattintva ugrik fel az előzmények panel, melyet bárhova kattintva bezárhatunk. Jobb oldalon a kártyákra kattintva pedig húzást szimulálhatunk, melynek jelenleg nincs funkciója az animáción kívül. A kézben tartott kártyákat kattintásra kijelölhetjük, majd ugyanígy vissza is vonhatjuk azokat. A célok elemeit pedig a jobbra és balra mutató ikonok segítségével lapozhatjuk. A középen lévő dupla pipa színe pedig azt jelöli, hogy teljesült-e már a cél. (Zöld színű, ha teljesült.) A városokat kattintásra jelölhetjük ki. A zöld körökként villogó mezők pedig majd az aktuális célkártya két városát fogják szimbolizálni. A térképen látható piros vonalak a felépített útvonalakat szimbolizálják. Ezek színe természetesen olyan lesz, amilyen az azt lerakó játékos színe volt.

## Eredmények oldal

[http://localhost:3000/scoreboard](http://localhost:3000/scoreboard) oldalon érthető el.
Fel vannak sorolva a játékosok az eredményeikkel együtt. A nyílra kattintva pedig lenyílnak a részletesebb információk. A 'MUTASD' gombra kattintva pedig felnyílik a térkép, ahol ki lesz jelölve a térképen a felnyitott két város.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)