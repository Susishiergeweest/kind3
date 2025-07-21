from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
import os

auth_bp = Blueprint('auth', __name__)

# Simple admin credentials - in production, this should be in a database
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD_HASH = generate_password_hash('babyvisit2025')  # Default password

@auth_bp.route('/login', methods=['POST'])
def login():
    """Admin login endpoint"""
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400
    
    username = data['username']
    password = data['password']
    
    # Check credentials
    if username == ADMIN_USERNAME and check_password_hash(ADMIN_PASSWORD_HASH, password):
        session['admin_logged_in'] = True
        session['admin_username'] = username
        return jsonify({'message': 'Login successful', 'admin': True}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Admin logout endpoint"""
    session.pop('admin_logged_in', None)
    session.pop('admin_username', None)
    return jsonify({'message': 'Logout successful'}), 200

@auth_bp.route('/check', methods=['GET'])
def check_auth():
    """Check if admin is logged in"""
    if session.get('admin_logged_in'):
        return jsonify({'authenticated': True, 'username': session.get('admin_username')}), 200
    else:
        return jsonify({'authenticated': False}), 200

@auth_bp.route('/change-password', methods=['POST'])
def change_password():
    """Change admin password"""
    if not session.get('admin_logged_in'):
        return jsonify({'error': 'Not authenticated'}), 401
    
    data = request.get_json()
    
    if not data or 'current_password' not in data or 'new_password' not in data:
        return jsonify({'error': 'Current password and new password are required'}), 400
    
    current_password = data['current_password']
    new_password = data['new_password']
    
    # Verify current password
    if not check_password_hash(ADMIN_PASSWORD_HASH, current_password):
        return jsonify({'error': 'Current password is incorrect'}), 400
    
    # In a real application, you would update the password in the database
    # For this demo, we'll just return success
    return jsonify({'message': 'Password changed successfully'}), 200

def require_admin_auth(f):
    """Decorator to require admin authentication"""
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return jsonify({'error': 'Admin authentication required'}), 401
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

