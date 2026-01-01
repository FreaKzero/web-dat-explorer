# Web Dat Explorer

## TODO
- [ ] Check images in proxy for OK Status
- [ ] ROM only Import
- [ ] Bun (?)
- [ ] Preact Comboboxes
- [ ] Top Navbar Preact
- [ ] Better Devmode for Frontend

- [ ] Preact Comboboxes
  - [ ] Populate Comboboxes based on selected categories (backend)	
 
- [ ] Pagination
  - [ ] Backend
  - [ ] Preact

- [ ] Favourites (?)
    - [ ] Backend
    - [ ] Preact

## Setup
### Install npm dependencies
```
npm install 
```
### Provide an .env file in root

```
#use $NAME for the rom identifier replacement
#Wiki URL - predefined to adb.arcadeitalia.net
WIKI_URL=http://adb.arcadeitalia.net/dettaglio_mame.php?game_name=$NAME

#Download URL (use $NAME in URL for replacement of identifier)
DL_URL=

#Image Url ((use $NAME in URL for replacement of identifier - gets cached via proxy)
IMG_URL= 
```
### Create or Import dat files to SQLite3 Database
Files will be only imported once based on last editdate of the File and Filename.

1. Add your Dat files to `ìmporter/datasets`
2. `npm run import`

### Importer awaits following Structure
```
<game name="88games" sourcefile="konami/d_88games.cpp">
		<description>'88 Games</description>
		<year>1988</year>
		<manufacturer>Konami</manufacturer>
		<rom name="861m01.k18" size="32768" crc="4a4e2959"/>
		<rom name="861m02.k16" size="65536" crc="e19f15f6"/>
		<video type="raster" orientation="horizontal" width="304" height="224" aspectx="4" aspecty="3"/>
		<driver status="good"/>
	</game>
```

### Start Server
`npm run serve`

## Development
```
npm install
npm run dev
```
