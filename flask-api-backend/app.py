from flask import Flask, request
import json
from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import dateutil.parser

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mysql+pymysql://brainhi:Nm2RubvJqet3@35.226.68.179:3306/brain_hi'
db = SQLAlchemy(app)
app.debug = True;

engine = create_engine(
    'mysql+pymysql://brainhi:Nm2RubvJqet3@35.226.68.179:3306/brain_hi',
    convert_unicode=True, echo=False)
Base = declarative_base()
Base.metadata.reflect(engine)
metadata = MetaData(bind=engine)


@app.route('/doctors', methods=['GET'])
def say_hello_world():
    try:
        result = db.engine.execute("SELECT * FROM Provider")
        return json.dumps([dict(r) for r in result])
    except ConnectionError:
        return '0'


@app.route('/register', methods=['POST'])
def add_doctor():
    providers = db.Table('Provider', metadata, autoload=True)
    doctor = request.json
    try:
        db.engine.execute(providers.insert(), provider_full_name=doctor['name'], specialty=doctor['specialty'])
        return '1'
    except ConnectionError:
        return '0'


@app.route('/appointment', methods=['POST'])
def add_appointment():
    appointments = db.Table('Appointment', metadata, autoload=True)
    appt = request.json
    preffered_date = dateutil.parser.parse(appt['prefferedDate'])
    date_of_birth = dateutil.parser.parse(appt['dateOfBirth'])
    try:
        db.engine.execute(appointments.insert(), provider_id=appt['providerId'], start_time=preffered_date,
                          end_time=preffered_date, appointment_reason=appt['reason'],
                          patient_full_name=appt['patientName'], patient_gender=appt['gender'],
                          patient_date_of_birth=date_of_birth, patient_phone_number=appt['phoneNumber'])
        return '1'
    except ConnectionError:
        return '0'

