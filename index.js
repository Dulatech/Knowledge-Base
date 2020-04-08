let express = require('express')
const session = require('express-session');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./util/database');

const expressHbs = require('express-handlebars');
app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({
  extended: false
})) 

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.json())

let userRoutes = require('./routes/user');
let loginRoutes = require('./routes/login');
let profileRoutes = require('./routes/profile');
let discussionRoutes = require('./routes/discussion');
let messagesRoutes = require('./routes/messages');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('login', {
  });
});

app.use(loginRoutes);
app.use(profileRoutes);
app.use(discussionRoutes);
app.use(messagesRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 4000, () => console.log('localhost:4000'))