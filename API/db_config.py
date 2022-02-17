from app import app
from flaskext.mysql import MySQL

mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'cmp370'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Usask@2020'
app.config['MYSQL_DATABASE_DB'] = 'hjh'
app.config['MYSQL_DATABASE_HOST'] = 'hestech.cn'
mysql.init_app(app)