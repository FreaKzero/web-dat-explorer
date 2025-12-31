# Web Dat Explorer

## TODO
- [ ] Preact Comboboxes
- [ ] Top Navbar Preact
- [ ] Pagination
  - [ ] Backend
  - [ ] Preact
- [ ] Better Devmode for Frontend
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

### Start Server
`npm run serve`

## Development
```
npm install
npm run dev
```