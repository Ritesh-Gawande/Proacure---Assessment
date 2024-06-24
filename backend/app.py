from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplier TEXT,
            productInfo TEXT,
            productUrl TEXT,
            category TEXT,
            quantity INTEGER,
            timeline TEXT,
            location TEXT,
            requiredFor TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS sample_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT
        )
    ''')

    # Insert default categories if table is empty
    c.execute('SELECT COUNT(*) FROM categories')
    if c.fetchone()[0] == 0:
        c.executemany('INSERT INTO categories (name) VALUES (?)', [
            ('Electronics',),
            ('Books',),
            ('Clothing',),
            ('Sports',),
            ('Other',),
        ])

    # Insert default locations if table is empty
    c.execute('SELECT COUNT(*) FROM locations')
    if c.fetchone()[0] == 0:
        c.executemany('INSERT INTO locations (name) VALUES (?)', [
            ('Pune',),
            ('Mumbai',),
            ('Sambaji Nagar',),
            ('Paithan',),
            ('Nagpur',),
            ('Other',),
        ])

    # Insert some sample data into sample_products
    c.execute('SELECT COUNT(*) FROM sample_products')
    if c.fetchone()[0] == 0:
        c.executemany('INSERT INTO sample_products (name, description) VALUES (?, ?)', [
            ('Jeans', 'Used to wear'),
            ('Phone', 'Used to communicate'),
            ('Printer', 'Used to print'),
            ('Knife', 'Used to cut vegetables'),
            ('Bayblade', 'Used to play')
        ])
    conn.commit()
    conn.close()

@app.route('/api/sample_products', methods=['GET'])
def search_products():
    search_query = request.args.get('search', '')
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT id, name, description FROM sample_products WHERE name LIKE ?', ('%' + search_query + '%',))
    products = [{'id': row[0], 'name': row[1], 'description': row[2]} for row in c.fetchall()]
    conn.close()
    return jsonify(products)

@app.route('/api/categories', methods=['GET'])
def get_categories():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM categories')
    categories = [{'id': row[0], 'name': row[1]} for row in c.fetchall()]
    conn.close()
    return jsonify(categories)

@app.route('/api/locations', methods=['GET'])
def get_locations():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM locations')
    locations = [{'id': row[0], 'name': row[1]} for row in c.fetchall()]
    conn.close()
    return jsonify(locations)

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO products (supplier, productInfo, productUrl, category, quantity, timeline, location, requiredFor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data['supplier'], data['productInfo'], data['productUrl'], data['category'], data['quantity'], data['timeline'], data['location'], data['requiredFor']))
    conn.commit()
    conn.close()
    return jsonify({'status': 'Product created'}), 201

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM products')
    products = [{'id': row[0], 'supplier': row[1], 'productInfo': row[2], 'productUrl': row[3], 'category': row[4], 'quantity': row[5], 'timeline': row[6], 'location': row[7], 'requiredFor': row[8]} for row in c.fetchall()]
    conn.close()
    return jsonify(products)


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
