## Steps to run project

**Step 1**: Install dependencies
    npm i

**Step 2**: If want to check bonus point(postgres data store) as well then create a .env file and add following things
    POSTGRES_USERNAME=your_postgres_username
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_HOST=your_postgres_host
    POSTGRES_PORT=your_postgres_port
    POSTGRES_DATABASE=your_postgres_db

__Note__: Step 2 is optional, but if checking it then create the table first using this query
        CREATE TABLE patient_data(
            id SERIAL PRIMARY KEY, 
            patient_id VARCHAR(255), 
            clinical_data JSON,
            from_healthkit_sync BOOLEAN, 
            org_id VARCHAR(255),
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )

**Step 3**: Run the project
    node main.js 

**Step 4**: Go to postman and do following things
    * paste `http://localhost:4000/api/patient/process-clinical-data`
    * choose HTTP method `POST`
    * go to Body> raw and pick JSON
    * Paste the clinical data JSON which was given with assignment and click send
