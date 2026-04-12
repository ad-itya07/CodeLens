export async function withRetry(fn, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      const isConnErr = 
        err.message?.includes('fetch failed') ||
        err.message?.includes('Error connecting to database') ||
        err.code === 'ETIMEDOUT' ||
        err.message === '';
      
      if (i === retries - 1 || !isConnErr) throw err;
      console.warn(`DB connection failed, retrying (${i + 2}/${retries})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}