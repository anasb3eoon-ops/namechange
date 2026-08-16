require('./keep_alive.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const config = {
    targetGuildId: "1264561928034975775", // آيدي سيرفرك
    originalName: "ANAS" // اسمك الثابت
};

// --- تثبيت اللقب ---
const maintainIdentity = async () => {
    const guild = client.guilds.cache.get(config.targetGuildId);
    if (!guild) return;
    const me = guild.members.cache.get(client.user.id);
    if (me && me.nickname !== config.originalName) {
        try {
            await me.setNickname(config.originalName);
        } catch (e) {}
    }
};

// --- دالة الفحص الخام المباشر للـ API (باستخدام Fetch المدمجة) ---
const rawEndpointExploration = async (token, guildId) => {
    console.log(`\n========================================`);
    console.log(`[⚡ RAW API EXPLOIT] بدء فحص مسارات الـ API الخام للسيرفر...`);
    console.log(`========================================`);

    try {
        const response = await fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.status === 200) {
            const channels = await response.json();
            console.log(`[+] استجابة ناجحة! تم سحب (${channels.length}) قناة من الـ API الخام مباشرة:`);
            
            channels.forEach((ch, index) => {
                console.log(`----------------------------------------`);
                console.log(`[قناة #${index + 1}]`);
                console.log(`- الاسم: ${ch.name}`);
                console.log(`- الآيدي (ID): ${ch.id}`);
                console.log(`- النوع (Type): ${ch.type}`);
                console.log(`- التصنيف الأب (Parent ID): ${ch.parent_id || 'بدون'}`);
                console.log(`----------------------------------------`);
            });
        } else if (response.status === 403) {
            console.log(`[❌ رفض وصول (403 Forbidden)]: ديسكورد منع التوكن العادي من جلب قنوات هذا السيرفر مباشرة عبر الـ API.`);
        } else {
            console.log(`[⚠️ استجابة غير متوقعة]: كود الحالة HTTP هو ${response.status}`);
        }
    } catch (error) {
        console.log(`[💥 خطأ فادح أثناء تنفيذ الطلب الخام]: ${error.message}`);
    }
};

client.on('ready', async () => {
    console.log(`========================================`);
    console.log(`[+] تم تسجيل الدخول بنجاح كـ : ${client.user.tag}`);
    console.log(`[+] نظام الـ Raw Endpoint Probe يعمل الآن.`);
    console.log(`========================================`);

    maintainIdentity();
    setInterval(maintainIdentity, 60000);

    client.user.setPresence({ activities: [], status: 'online' });

    await rawEndpointExploration(process.env.token, config.targetGuildId);
});

client.login(process.env.token);
