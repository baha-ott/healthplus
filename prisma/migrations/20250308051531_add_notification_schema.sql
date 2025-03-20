-- Migration to add notification schema for medication reminders
CREATE TABLE medication_reminders (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    medication_name VARCHAR(255) NOT NULL,
    reminder_time TIMESTAMP NOT NULL,
    notification_method VARCHAR(50) NOT NULL DEFAULT 'email',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
