#!/bin/sh
>&2 echo "Starting server..."
npm run migration:run && npm run start:dev