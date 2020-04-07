const Pool = require('pg').Pool;

const pool = new Pool({  
      host: 'ec2-52-71-55-81.compute-1.amazonaws.com',  
      user: 'vdpoeizmqhzwob',  
      database: 'd820hdq7j0g7fi',  
      password: '256ba8c144246cc4aac61fff37750dec8cde79cd855cbe305c7d99d2f48858b7',
      port: 5432,
      ssl: true
  });

pool.on('connect', () => {
    console.log('connected to the Database');
});


module.exports = pool;