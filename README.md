## Steps to run the project

**Step 1**: Install dependencies
```sh
    npm i
```
**Step 2**: If you want to check bonus point(postgres data store) as well then create a .env file and add following things <br>
    POSTGRES_USERNAME=your_postgres_username<br>
    POSTGRES_PASSWORD=your_postgres_password<br>
    POSTGRES_HOST=your_postgres_host<br>
    POSTGRES_PORT=your_postgres_port<br>
    POSTGRES_DATABASE=your_postgres_db

__Note__: Step 2 is optional, but if checking it then create the table first using this query
```sh
        CREATE TABLE patient_data(
            id SERIAL PRIMARY KEY, 
            patient_id VARCHAR(255), 
            clinical_data JSON,
            from_healthkit_sync BOOLEAN, 
            org_id VARCHAR(255),
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
```
**Step 3**: Run the project
```sh
    node main.js 
```

**Step 4**: Go to postman and do the following things<br>
    * paste `http://localhost:4000/api/patient/process-clinical-data`<br>
    * choose HTTP method `POST`<br>
    * go to Body> raw and pick JSON<br>
    * Paste the clinical data JSON which was given with the assignment and click send
