import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import i18next from 'i18next';

import ru from './locales/ru.js';

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

i18next
  .init({
    lng: 'ru',
    fallbackLng: 'en',
    debug: isDevelopment,
    resources: {
      ru,
    },
  });

const app = express();
const port = process.env.PORT || 3000;

const moduleDirname = fileURLToPath(path.dirname(import.meta.url));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('views', path.join(moduleDirname, 'views'));
app.set('view engine', '.hbs');

app.use(express.static(path.join(moduleDirname, '..')));

app.get('/', (req, res) => {
  res.render('home', { title: 'Hey', message: 'Hello there!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
