import { app, port } from './app';

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
