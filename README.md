# Store Locator

Frontend web app per la consultazione dei punti vendita su mappa interattiva.

## Tech Stack

- React 18.x
- TypeScript 5.x
- Vite 5.x
- Tailwind CSS 4.x
- Zustand (state management)
- React Router 6.x
- Google Maps API

## Setup

1. Clona il repository
2. Installa le dipendenze: `npm install`
3. Copia `.env.example` in `.env` e configura le variabili
4. Avvia il server: `npm run dev`

## Scripts

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Build per produzione
- `npm run preview` - Preview della build di produzione

## Struttura Progetto

```
src/
├── components/     # Componenti React
├── pages/          # Pagine dell'applicazione
├── stores/         # Zustand stores
├── services/       # Chiamate API
├── types/          # TypeScript interfaces
├── hooks/          # Custom hooks
└── utils/          # Utility functions
```