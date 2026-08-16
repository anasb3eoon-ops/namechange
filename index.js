require('./keep_alive.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const config = {
    targetGuildId: "1264561928034975775", // آيدي سيرفرك
    
    // هنا نبتكر الشارة الخاصة بك ونلصقها مع اسمك ANAS
    // يمكنك تغيير شكل الشارة (مثلاً: 🅥 موثق، أو ✦ نجمة، أو ❖ سيادة)
    customBadge: "🅥", 
    baseName: "ANAS"
};

// --- نظام فرض الاسم مع الشارة المبتكرة (التعافي الذاتي) ---
const applyCustomBadges = async () => {
    const guild = client.guilds.cache.get(config.targetGuildId);
    if (!guild) return;
    
    const me = guild.members.cache.get(client.user.id);
    if (!me) return;

    // التنسيق النهائي: الشارة + اسمك (يراه الجميع في السيرفر)
    const formattedNickname = `${config.customBadge} ${config.baseName}`;

    if (me.nickname !== formattedNickname) {
        try {
            await me.setNickname(formattedNickname);
            console.log("🛡️ تم فرض الشارة المبتكرة واسم ANAS بنجاح.");
        } catch (e) {
            console.error("❌ تأكد من صلاحية تغيير اللقب في السيرفر.");
        }
    }
};

client.on('ready', async () => {
    console.log(`✅ تم تسجيل الدخول بنجاح كـ : ${client.user.tag}`);
    
    // تفعيل الشارة والاسم فوراً
    applyCustomBadges();
    
    // مراقبة مستمرة كل 30 ثانية لضمان عدم إزالتها
    setInterval(applyCustomBadges, 30000); 

    // إيقاف تام للنشاطات والألعاب (حساب نظيف وصامت تماماً)
    client.user.setPresence({
        activities: [], 
        status: 'online'
    });

    console.log("🔥 نظام الشارات الخارجية المبتكرة يعمل الآن بكفاءة.");
});

client.login(process.env.token);
