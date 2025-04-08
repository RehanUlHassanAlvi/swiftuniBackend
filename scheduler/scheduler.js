const cron = require("node-cron");
const moment = require('moment-timezone');
const { query } = require("../utils/db");

// Schedule the task to run every minute Pakistan Standard Time (PKT)
cron.schedule('0 0 * * *', async () => {
  const currentTime = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss');
  console.log(`Task started at ${currentTime} PKT`);
  
  try {
    const result1 = await query(`SELECT * FROM public.unsubscribe_user_on_timeend()`);
    // console.log('Result 1:', result1); // Log result of first query
    
    const result2 = await query(`SELECT * FROM public.unsubscribe_user_on_timeend_for_plan()`);
    // console.log('Result 3:', result2); // Log result of third query

    const result3 = await query(`SELECT * FROM public.reset_user_free_tokens()`);
    // console.log('Result 2:', result3); // Log result of second query

  } catch (error) {
    console.error('Error executing queries:', error.message); // Log any errors
  }

  console.log(`Task finished at ${moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss')} PKT`);
}, {
  scheduled: true,
  timezone: "Asia/Karachi"
});



