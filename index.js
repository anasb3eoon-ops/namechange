require('./keep_alive.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const config = {
    targetGuildId: "1264561928034975775", // سيرفرك
    originalName: "ANAS" // اسمك الطبيعي
};

// --- إعادة الاسم الطبيعي وتثبيته ---
const resetMyIdentity = async () => {
    const guild = client.guilds.cache.get(config.targetGuildId);
    if (!guild) return;
    
    const me = guild.members.cache.get(client.user.id);
    if (!me) return;

    if (me.nickname !== config.originalName) {
        try {
            await me.setNickname(config.originalName);
            console.log("✅ تم إعادة الاسم الطبيعي بنجاح.");
        } catch (e) {
            console.error("❌ تأكد من صلاحيات اللقب.");
        }
    }
};

client.on('ready', async () => {
    console.log(`✅ تم تسجيل الدخول كـ : ${client.user.tag}`);
    
    // ضبط الاسم فوراً
    resetMyIdentity();

    // --- إيقاف جميع النشاطات والألعاب وحذفها تماماً ---
    client.user.setPresence({
        activities: [], // فارغة تماماً - لا نشاطات ولا ألعاب
        status: 'online'
    });

    console.log("🧹 تم تنظيف الحساب وإلغاء كافة النشاطات واللعب.");
});

client.login(process.env.token);
