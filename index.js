require('./keep_alive.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const config = {
    // 1. آيدي السيرفر المستهدف (اللي بدك يظهر فيه التاج)
    targetGuildId: "1264561928034975775", 
    
    // 2. اسمك الحقيقي
    myDisplayName: "اANAS", 
    
    // 3. التاج الأسود/النيون
    blackCrownTag: "👑"     
};

// --- نظام فرض الهوية والتاج (التعافي الذاتي) ---
const updateMyIdentity = async () => {
    const guild = client.guilds.cache.get(config.targetGuildId);
    if (!guild) return;
    
    const me = guild.members.cache.get(client.user.id);
    if (!me) return;

    const newNickname = `${config.blackCrownTag} ${config.myDisplayName}`;
    
    if (me.nickname !== newNickname) {
        try {
            await me.setNickname(newNickname);
            console.log("👑 تم فرض التاج الأسود بنجاح عبر التعافي الذاتي.");
        } catch (e) {
            console.error("❌ خطأ: تأكد أن حسابك يملك صلاحية تغيير اللقب (Change Nickname) في السيرفر.");
        }
    }
};

client.on('ready', async () => {
    console.log(`✅ تم تسجيل الدخول بنجاح كـ : ${client.user.tag}`);
    
    // تفعيل التاج فوراً وتكرار الفحص كل 30 ثانية
    updateMyIdentity();
    setInterval(updateMyIdentity, 30000); 

    // تعيين الحالة الخارقة (Rich Presence)
    client.user.setPresence({
        activities: [{
            name: 'Cyberpunk 2077',
            type: 'PLAYING',
            applicationId: "782291108640030730"
        }],
        status: 'online'
    });
});

client.login(process.env.token);
