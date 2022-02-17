import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request
# from werkzeug import generate_password_hash, check_password_hash
@app.route("/")
def welcome():
		# resp = jsonify('Welcome to CMP370 Group project!')
		resp="Welcome!"
		# resp.status_code = 200
		return resp

@app.route('/users/add', methods=['POST'])
def add_user():
	try:
		_json = request.json
		_name = _json['name']
		_email = _json['email']
		_password = _json['pwd']
		# validate the received values
		if _name and _email and _password and request.method == 'POST':
			#do not save password as a plain text
			#_hashed_password = generate_password_hash(_password)
			# save edits
			sql = "INSERT INTO tbl_user(user_name, user_email, user_password) VALUES(%s, %s, %s)"
			data = (_name, _email, _password,)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('User added successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
@app.route('/users')
def users():
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT * FROM tbl_user")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
@app.route('/user/<int:id>')
def user(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT * FROM tbl_user WHERE user_id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/user/update', methods=['POST'])
def update_user():
	try:
		_json = request.json
		_id = _json['id']
		_name = _json['name']
		_email = _json['email']
		_password = _json['pwd']		
		# validate the received values
		if _name and _email and _password and _id and request.method == 'POST':
			# save edits
			sql = "UPDATE tbl_user SET user_name=%s, user_email=%s, user_password=%s WHERE user_id=%s"
			data = (_name, _email, _password, _id,)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('User updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
@app.route('/user/delete/<int:id>')
def delete_user(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM tbl_user WHERE user_id=%s", (id,))
		conn.commit()
		resp = jsonify('User deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()


# function to get food data from the food table in the database
@app.route('/food')		
def food():
    try:
    	conn = mysql.connect()
    	cursor = conn.cursor(pymysql.cursors.DictCursor)
    	cursor.execute("SELECT * FROM food")
    	rows = cursor.fetchall()
    	resp = jsonify(rows)
    	resp.status_code = 200
    	return resp
    except Exception as e:
    	print(e)
    finally:
    	cursor.close() 
    	conn.close()

# function to adding new food into the food table
@app.route('/food/add', methods=['POST'])
def add_food():
	try:
		_json = request.json
		_name = _json['name']
		_price = _json['price']
		_ingre = _json['ingre']
		_menuimg = _json['menuimg']
		# validate the received values
		if _name and _price and _ingre  and _menuimg and request.method == 'POST':
			# save edits
			sql = "INSERT INTO food(name, price, ingre, menuimg) VALUES(%s, %s, %s, %s)"
			data = (_name, _price, _ingre, _menuimg)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('food added successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
# delete food in the food table by using that food's id	
@app.route('/food/delete/<int:id>')
def delete_food(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM food WHERE foodid=%s", (id,))
		conn.commit()
		resp = jsonify('food deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
    	
@app.route('/drink')		
def drink():
    try:
    	conn = mysql.connect()
    	cursor = conn.cursor(pymysql.cursors.DictCursor)
    	cursor.execute("SELECT * FROM drink")
    	rows = cursor.fetchall()
    	resp = jsonify(rows)
    	resp.status_code = 200
    	return resp
    except Exception as e:
    	print(e)
    finally:
    	cursor.close() 
    	conn.close()
    	

# function to adding new drink into the drink table
@app.route('/drink/add', methods=['POST'])
def add_drink():
	try:
		_json = request.json
		_name = _json['name']
		_price = _json['price']
		_ingre = _json['ingre']
		_menuimg = _json['menuimg']
		# validate the received values
		if _name and _price and _ingre  and _menuimg and request.method == 'POST':
			# save edits
			sql = "INSERT INTO drink(name, price, ingre, menuimg) VALUES(%s, %s, %s, %s)"
			data = (_name, _price, _ingre, _menuimg)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('drink added successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
# delete drink in the drink table by using that drink id	
@app.route('/drink/delete/<int:id>')
def delete_drink(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM drink WHERE foodid=%s", (id,))
		conn.commit()
		resp = jsonify('drink deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

    	
@app.route('/reservation')		
def reservation():
    try:
    	conn = mysql.connect()
    	cursor = conn.cursor(pymysql.cursors.DictCursor)
    	cursor.execute("SELECT * FROM reservation")
    	rows = cursor.fetchall()
    	resp = jsonify(rows)
    	resp.status_code = 200
    	return resp
    except Exception as e:
    	print(e)
    finally:
    	cursor.close() 
    	conn.close()

# function to adding new reservation into the reservation table
@app.route('/reservation/add', methods=['POST'])
def add_reservation():
	try:
		_json = request.json
		_card = _json['card']
		_emailnum = _json['emailnum']
		_psw=_json['psw']
		_exdate=_json['exdate']
		_scode=_json['scode']
		_date= _json['date']
		_firstname= _json['firstname']
		_secondname= _json['secondname']
		_partysize= _json['partysize']
		_setlocate= _json['setlocate']
		
		# validate the received values
		if _card and _emailnum and _psw  and _exdate and _scode and _date and _firstname and _secondname and _partysize and _setlocate and request.method == 'POST':
			# save edits
			sql = "INSERT INTO reservation(card,emailnum,psw,exdate,scode,date,firstname,secondname,partysize,setlocate) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
			data = (_card, _emailnum, _psw, _exdate, _scode, _date, _firstname, _secondname, _partysize, _setlocate)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			cursor.execute("SELECT LAST_INSERT_ID();")
			rows = cursor.fetchone()
			resp = jsonify(rows)
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
# delete reservation by using reservation id	
@app.route('/reservation/delete/<int:id>')
def delete_reservation(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM reservation WHERE id=%s", (id,))
		conn.commit()
		resp = jsonify('reservation deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/reservation/deleteall')
def deleteall_reservation():
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM reservation WHERE id>0")
		conn.commit()
		resp = jsonify('all reservations deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

# update the reservation info by id
@app.route('/reservation/update', methods=['POST'])
def update_reservation():
	try:
		_json = request.json
		_id = _json['id']
		_food = _json['food']
		_drink = _json['drink']

		# foodlist = "["
		# if _food.length>0:
		# 	for el in _food:
		# 		foodlist += str(el)
		# foodlist += "]"

		# drinklist = "["
		# if _drink.length>0:
		# 	for el in _drink:
		# 		drinklist += str(el)
		# drinklist += "]"


		# validate the received values
		print(_id)
		print(_food)
		if _id and _food and _drink and request.method == 'POST':
			# save edits
			sql = "UPDATE reservation SET food=%s, drink=%s WHERE id=%s"
			data = (_food, _drink, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('reservation updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		resp=jsonify(e)
		resp.status_code=500
		return resp
	finally:
		cursor.close() 
		conn.close()
		


		
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp
		
if __name__ == "__main__":
    app.run("0.0.0.0")
    


