# Marketplace — Frontend

Frontend for a second-hand marketplace web app, built as a two-person team project (spring 2025). Users can register, list items with images, browse by category, save favourites and message sellers. Admins can manage categories and users.

The matching Spring Boot backend lives in the team repository [Embretr/fullstack](https://github.com/Embretr/fullstack).

**Status:** complete (course project, April 2025). Not actively maintained.

## Features

- Registration and login with JWT authentication
- Create listings with image upload and category assignment
- Browse all listings on the home page and filter by category
- Favourites / bookmarks
- Buyer–seller messaging
- User profile and settings
- Admin view for category and user management
- English and Norwegian UI (vue-i18n)

## Screenshots

<!-- TODO: add screenshots -->
_Coming soon._

## Tech stack

- Vue 3 + TypeScript, built with Vite
- Pinia (state), Vue Router, Axios
- vue-i18n (en / no)
- Vitest + Vue Test Utils
- Biome for linting and formatting, Husky pre-commit hooks

## Getting started

Requires Node 18+ and a running backend (defaults to `http://localhost:8080`).

```bash
npm install
npm run dev            # http://localhost:5173
```

Optional environment variables (create a `.env` file):

```
VITE_API_URL=http://localhost:8080
VITE_APP_TITLE=Marketplace
```

## Scripts

```bash
npm run dev       # dev server
npm run build     # type-check and production build
npm run test      # unit tests (Vitest)
npm run lint      # Biome lint
npm run format    # Biome formatting check
```

## Project structure

```
src/
├── views/        # Route-level pages (Home, Login, CreateItem, Messages, Admin, ...)
├── components/   # Reusable UI components
├── stores/       # Pinia stores: auth, items, user
├── router/       # Route definitions and guards
├── i18n/         # Locale files (en.json, no.json)
└── tests/        # Test setup
```

## My contribution

Co-developed with [Embret Roås](https://github.com/Embretr). <!-- TODO: summarise the parts you personally built -->
