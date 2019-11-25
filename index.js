const app = require('./dist');

module.exports = app;

if (require.main == module) {
    try {
        app.main();
    }
    catch (err) {
        return err;
    }
}
