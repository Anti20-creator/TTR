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

# Nyilatkozat

Amtmann Kristóf\
VZTSXJ\
Kliensoldali webprogramozás - Ticket To Ride 1. felvonás\
2021.04.11\
Ezt a megoldást Amtmann Kristóf, VZTSXJ küldte be és készítette a Kliensoldali webprogramozás kurzus Ticket To Ride 1. felvonás feladatához.\
Kijelentem, hogy ez a megoldás a saját munkám.
Nem másoltam vagy használtam harmadik féltől származó megoldásokat.
Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja,
hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be,
az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.

# Telepítési útmutató

git clone https://github.com/Anti20-creator/TTR \
cd into cloned folder \
npm install \
npm start \