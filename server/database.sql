CREATE TABLE tarif(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
)

CREATE TABLE service(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    param VARCHAR(255),
    tarif_id INTEGER,
    FOREIGN KEY (tarif_id) REFERENCES tarif(id)
)