from src.models.user import db
from datetime import datetime

class Timeslot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(5), nullable=False)  # Format: "HH:MM"
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'time': self.time,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visitor_name = db.Column(db.String(100), nullable=False)
    visit_date = db.Column(db.String(10), nullable=False)  # Format: "YYYY-MM-DD"
    timeslot_id = db.Column(db.Integer, db.ForeignKey('timeslot.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    timeslot = db.relationship('Timeslot', backref=db.backref('bookings', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'visitor_name': self.visitor_name,
            'visit_date': self.visit_date,
            'timeslot': self.timeslot.to_dict() if self.timeslot else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

