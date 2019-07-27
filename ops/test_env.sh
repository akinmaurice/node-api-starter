#!/bin/bash

# Expose Environment Variables
echo 'export DATABASE_TEST_URL=postgres://ubuntu@localhost:5432/app_test_db' >> $BASH_ENV
echo 'export REDIS_URI=redis://localhost:6379/1' >> $BASH_ENV
echo 'export NODE_ENV=test' >> $BASH_ENV
echo 'export JWT_SECRET_KEY=randomtestkeyforjwtgeneration123$3£' >> $BASH_ENV
echo 'export CRYPTO_SECRET_KEY=randomtestkeyforjwtgeneration123$3£' >> $BASH_ENV
echo 'export SEND_GRID_API_KEY=randomkeyforsendgrid' >> $BASH_ENV
echo 'export SENTRY_URI=$SENTRY_URI' >> $BASH_ENV
