# LTA Datamall Wrapper

This is an API wrapper meant to circumvent the issue of [LTA Datamall not supporting HTTPS](https://github.com/datagovsg/datagovsg-datasets/issues/544).

## Usage (local machine)

1. Install Node.js
2. Clone this repository
3. If you want this wrapper to handle SSL directly (e.g. no proxy), run these commands (substituting `...` with the your own values):
    ```bash
    # Linux
    export SSL_CERT=...
    export SSL_KEY=...
    ```
4. Run these commands in the repository:
   ```bash
   npm install
   npm install -D
   npm run build
   npm start
   ```

## Usage (Docker)
1. Modify the following lines in `Dockerfile` accordingly:
    ```Dockerfile
    # Change these as necessary
    ENV PORT=80
    ENV SSL_CERT=""
    ENV SSL_KEY=""
    ```
2. Execute `docker run` or whichever preferred Docker "startup" command.
