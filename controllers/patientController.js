const pool = require('../config/db');

exports.process_clinical_data = async (req, res) => {
    try{
        const { clinical_data, patient_id, from_healthkit_sync, orgId, timestamp } = req.body; 

        await storeClinicalData(clinical_data, patient_id, from_healthkit_sync, orgId, timestamp)
        
        clinical_data.HEART_RATE.agg_heart_rate  = agg_heart_rate(clinical_data.HEART_RATE.data)
        res.status(201).json({ message: 'Patient data received and processed successfully', data: { clinical_data, patient_id, from_healthkit_sync, orgId, timestamp} });

    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


  function agg_heart_rate(heart_rates_data){
    let from_date =  new Date(heart_rates_data[0].on_date)
    let to_date = ''
    let heart_rates = []
    let agg_heart_rate = []
    heart_rates_data.forEach((currentReading, index) =>{
        let on_date = new Date(currentReading.on_date)
        if(on_date.getTime() - from_date.getTime() >=  15 * 60 * 1000 || index == heart_rates_data.length - 1 ){
            agg_heart_rate.push({
                from_date,
                to_date,
                measurement:{
                    low: Math.min(...heart_rates),
                    high: Math.max(...heart_rates)
                }
            })
            from_date = on_date
            heart_rates = [currentReading.measurement]
            to_date = from_date

        }else{
            to_date = on_date
            heart_rates.push(currentReading.measurement)
        }
    })
    return agg_heart_rate
  }

  async function storeClinicalData(clinical_data, patient_id, from_healthkit_sync, orgId, timestamp){
    try{
        if(process.env.POSTGRES_HOST){
            const query = `
                INSERT INTO 
                    "patient_data"("patient_id", "clinical_data", "from_healthkit_sync", org_id, createdAt ) 
                VALUES($1,$2,$3,$4,$5)`
            return await pool.query(query, [patient_id, clinical_data, from_healthkit_sync, orgId, timestamp]);
        }
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  }