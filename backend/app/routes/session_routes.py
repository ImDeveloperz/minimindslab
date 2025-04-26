from flask import Blueprint, jsonify, request
from app.models.session import GameSession
from app import db
from datetime import datetime

session_bp = Blueprint('session_bp', __name__)

@session_bp.route('/session/start', methods=['POST'])
def start_session():
    session = GameSession()
    db.session.add(session)
    db.session.commit()
    return jsonify({'session_id': session.session_id}), 201

@session_bp.route('/session/reconnect', methods=['POST'])
def reconnect_session():
    data = request.get_json()
    session_id = data.get('session_id')

    if not session_id:
        return jsonify({'error': 'Session ID is required'}), 400

    session = GameSession.query.filter_by(session_id=session_id).first()
    if session:
        session.last_seen = datetime.utcnow()
        db.session.commit()
        return jsonify({'message': 'Session reconnected'}), 200
    return jsonify({'error': 'Invalid session ID'}), 404
