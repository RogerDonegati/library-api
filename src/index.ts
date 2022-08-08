import app from './app';

app.listen(app.get('port'), async () => {
    console.log(`Running at http://${app.get('host')}:${app.get('port')}`);
});
