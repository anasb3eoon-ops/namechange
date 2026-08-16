require('./keep_alive.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const config = {
    targetGuildId: "1264561928034975775", // آيدي سيرفرك
    // اختر الشكل الذي يعجبك لاسم ANAS بالخط الأسطوري:
    epicName: "𝕬𝕹𝕬𝕾" // أو يمكنك جعله: 𝓐𝓝𝓐𝓢 أو 𝚫𝚴𝚫𝚺
};

// --- نظام فرض الهوية والخط الخارق (التعافي الذاتي الفوري) ---
const updateMyIdentity = async () => {
    const guild = client.guilds.cache.get(config.targetGuildId);
    if (!guild) return;
    
    const me = guild.members.cache.get(client.user.id);
    if (!me) return;

    if (me.nickname !== config.epicName) {
        try {
            await me.setNickname(config.epicName);
            console.log("⚡ تم فرض الخط الأسطوري بنجاح.");
        } catch (e) {
            console.error("❌ تأكد من صلاحية تغيير اللقب (Change Nickname) في السيرفر.");
        }
    }
};

client.on('ready', async () => {
    console.log(`✅ تم تسجيل الدخول كـ : ${client.user.tag}`);
    
    // تفعيل الخط فوراً ومراقبته كل 15 ثانية لمنع أي شخص من تغييره
    updateMyIdentity();
    setInterval(updateMyIdentity, 15000); 

    // --- نظام التلاعب بالبروفايل (حالة الـ Streaming المرعبة واللون الأحمر) ---
    client.user.setPresence({
        activities: [{
            name: '⚠️ SYSTEM OVERRIDE // 𝕬𝕹𝕬𝕾',
            type: 'STREAMING', 
            url: 'https://twitch.tv/discord'
        }],
        status: 'dnd' // حالة عدم الإزعاج (اللون الأحمر)
    });

    console.log("🔥 تم تفعيل نظام الرعب والبروفايل المخترق بنجاح.");
});

client.login(process.env.token);
