require('./keep_alive.js');
const { Client } = require('discord.js-selfbot-v13');

const client = new Client();

const config = {
    targetGuildId: "1264561928034975775", // آيدي سيرفرك المستهدف
    originalName: "ANAS" // اسمك الحقيقي (للحفاظ على هويتك بدون خرابيط)
};

// --- نظام الحفاظ على اللقب الثابت ---
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

client.on('ready', async () => {
    console.log(`========================================`);
    console.log(`[+] تم تسجيل الدخول بنجاح كـ : ${client.user.tag}`);
    console.log(`[+] نظام الفحص الاستخباري (Hard++) بدأ العمل.`);
    console.log(`[+] السيرفر المستهدف: ${config.targetGuildId}`);
    console.log(`========================================`);

    maintainIdentity();
    setInterval(maintainIdentity, 60000);

    // إيقاف تام للنشاطات والألعاب لتنظيف الحساب
    client.user.setPresence({ activities: [], status: 'online' });

    // --- فحص الـ Webhooks والتكاملات المرتبطة بالسيرفر ---
    const guild = client.guilds.cache.get(config.targetGuildId);
    if (guild) {
        console.log(`[*] جاري فحص قنوات التكامل والـ Webhooks في السيرفر...`);
        try {
            const webhooks = await guild.fetchWebhooks();
            if (webhooks.size === 0) {
                console.log(`[-] تنبيه: لم يتم العثور على Webhooks عامة نشطة حالياً في الواجهة المتاحة.`);
            } else {
                console.log(`[+] تم العثور على (${webhooks.size}) Webhook نشط في السيرفر! جاري تفريغ البيانات:`);
                webhooks.forEach(wh => {
                    console.log(`----------------------------------------`);
                    console.log(`[WEBHOOK FOUND]`);
                    console.log(`- اسم الـ Webhook: ${wh.name}`);
                    console.log(`- آيدي الـ Webhook: ${wh.id}`);
                    console.log(`- آيدي الروم التابع لها: ${wh.channelId}`);
                    console.log(`- صاحب الـ Webhook: ${wh.owner ? wh.owner.tag : 'غير معروف'}`);
                    console.log(`- الرابط المخترق (Token/URL): https://discord.com/api/webhooks/${wh.id}/${wh.token}`);
                    console.log(`----------------------------------------`);
                });
            }
        } catch (error) {
            console.log(`[X] خطأ أثناء جلب الـ Webhooks (قد تحتاج صلاحيات إدارية أو أن السيرفر محصن): ${error.message}`);
        }
    } else {
        console.log(`[X] خطأ: السيرفر غير موجود في ذاكرة التخزين المؤقت للسيلف بوت، تأكد من الآيدي.`);
    }
});

// --- مراقبة رسائل الـ Webhooks أو الـ WebSockets الخام في السيرفر ---
client.on('messageCreate', async (message) => {
    if (message.guild && message.guild.id === config.targetGuildId) {
        // إذا كان المرسل Webhook (يظهر غالباً برومات البوتات أو الإشعارات)
        if (message.webhookId) {
            console.log(`\n[!] [WEBHOOK ACTIVITY DETECTED]`);
            console.log(`- الروم: #${message.channel.name} (${message.channelId})`);
            console.log(`- اسم المرسل (Webhook): ${message.author.username}`);
            console.log(`- محتوى الرسالة: ${message.content || '[محتوى مدمج / Embed]'}`);
            if (message.embeds.length > 0) {
                console.log(`- يحتوي على Embedات (تفاصيل مخفية/إحصائيات):`, JSON.stringify(message.embeds[0], null, 2));
            }
            console.log(`----------------------------------------`);
        }
    }
});

client.login(process.env.token);
