## Getting started

Make sure you have at least Node.js 10.14.2 installed.

You can check your Node.js version by running node -v:

``` console
$ node -v
v10.14.2
```

#### `clone`

Navigate to your work directory and clone the project, change directory to the `node-api-starter` and add a new remote origin pointing to the new project repo.

``` console
$ git clone https://github.com/akinmaurice/node-api-starter.git
$ cd node-api-starter
```

#### `env`

You can set environment variables using `.env` file, or setting them in your `.bashrc` or `.zshrc` file.

##### Using `.env`:

``` console
$ touch .env
```

``` console
# using any editor you prefer. (vim/nano/vi).

$ vim .env
```

Paste the following configuration variables with their corresponding values.

```bash
DATABASE_DEV_URL=VALUE
JWT_SECRET_KEY=VALUE
DATABASE_TEST_URL=VALUE
```

##### Using `.bashrc` or `.zshrc`:

``` console
# open your bashrc or zshrc file,
# using any editor you prefer. (vim/nano/vi).

$ vim ~/.bashrc
```

Paste the following configuration variables with their corresponding values.

```bash
DATABASE_DEV_URL=VALUE
JWT_SECRET_KEY=VALUE
DATABASE_TEST_URL=VALUE
```

Run command to reload

```console
$ source ~/.bashrc
```
