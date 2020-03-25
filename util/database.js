const Pool = require('pg').Pool;

const pool = new Pool({  
      host: 'ec2-3-211-48-92.compute-1.amazonaws.com',  
      user: 'lvyyceazjfxluk',  
      database: 'd3blmq4sbmqdd0',  
      password: '8c8a7671883afcd3261630a921bac9f941b7d696d319254f83504aa8fb70175b',
      port: 5432,
      ssl: true
  });

pool.on('connect', () => {
    console.log('connected to the Database');
});


module.exports = pool;