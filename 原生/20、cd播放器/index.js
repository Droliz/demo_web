// const lrc = "[00:00.000] 作词 : 小美\n[00:01.000] 作曲 : 黄家驹\n[00:06.56]编曲：张宝宇\n[00:13.35]\n[00:30.48]无聊望见了犹豫\n[00:33.46]\n[00:34.04]达到理想不太易\n[00:36.82]\n[00:37.52]即使有信心 斗志却抑止\n[00:42.01]\n[00:43.65]谁人定我去或留\n[00:47.41]\n[00:48.20]定我心中的宇宙\n[00:51.16]\n[00:51.96]只想靠两手 向理想挥手\n[00:56.96]\n[00:58.03]问句天几高\n[01:00.77]心中志比天更高\n[01:04.52]\n[01:05.86]自信打不死的心态活到老\n[01:12.24]\n[01:13.03]Wo oh\n[01:16.91]我有我心底故事\n[01:19.88]\n[01:20.52]亲手写上每段得失乐与悲与梦儿\n[01:27.39]Wo oh\n[01:30.27]\n[01:31.19]纵有创伤不退避\n[01:34.27]\n[01:34.84]梦想有日达成\n[01:37.10]找到心底梦想的世界\n[01:41.05]\n[01:41.71]终可见\n[01:44.65]\n[02:10.88]谁人没试过犹豫\n[02:13.42]\n[02:14.42]达到理想不太易\n[02:16.92]\n[02:17.95]即使有信心 斗志却抑止\n[02:23.06]\n[02:24.23]谁人定我去或留\n[02:28.19]\n[02:28.94]定我心中的宇宙\n[02:31.62]\n[02:32.39]只想靠两手 向理想挥手\n[02:38.05]\n[02:38.88]问句天几高\n[02:41.17]心中志比天更高\n[02:44.81]\n[02:45.86]自信打不死的心态活到老\n[02:52.61]\n[02:53.43]Wo oh\n[02:56.07]\n[02:57.17]我有我心底故事\n[03:00.45]\n[03:01.07]亲手写上每段得失乐与悲与梦儿\n[03:07.88]Wo oh\n[03:10.19]\n[03:11.71]纵有创伤不退避\n[03:14.96]\n[03:15.51]梦想有日达成\n[03:17.62]找到心底梦想的世界\n[03:21.33]\n[03:22.16]终可见\n[03:25.09]\n[03:25.85]Wo oh\n[03:29.10]\n[03:29.69]亲手写上每段得失乐与悲与梦儿\n[03:36.83]\n[03:40.28]Wo oh\n[03:42.88]\n[03:44.02]梦想有日达成找到心底梦想的世界\n[03:50.39]\n[03:51.00]终可见\n[04:00.00]\n[04:01.00]制作人：赵英俊\n[04:02.00]吉他：毕赫宸/赵英俊\n[04:03.00]鼓手：李彦超/李平/祁大为\n[04:04.00]贝斯：张宝宇\n[04:05.00]箱琴：大鹏/宋宇/修健/赵英俊/张宝宇\n[04:06.00]伴唱：金天/谯帆/修健/宋宇/ 赵英俊/马小潮/杨玉婷/任振辉/冯力宪/刘响\n[04:07.00]录音及混音：鲍锐（北京录顶技studio）\n"

// 音乐对象
const audio = new Audio();
let lrcData;
// 每个li的高度
let liHeight = 30; //doms.ul.children[0].clientHeight;
// 偏移量
let offset = 0;
let flag = false;   // false 表示暂停状态  // true 表示播放状态
const baseSrc = './mp3/';
const baseImgPath = './img/';
let index = 0;  // 当前歌曲索引
let isOpen = false;  // 歌曲列表是否打开
let playModel = 0;  // 0 列表循环播放  1 单曲循环  2 随机播放
let seekT, seekBar, seekBarPos, seekLoc;  // 进度条
let volume = 0.5;   // 默认音量
const music = [
    {
        src: '不再犹豫 (Remix版) - 大鹏,黄贯中,叶世荣.mp3',
        img: '不再犹豫.jpg',
        lrc: "[00:00.000] 作词 : 小美\n[00:01.000] 作曲 : 黄家驹\n[00:06.56]编曲：张宝宇\n[00:13.35]\n[00:30.48]无聊望见了犹豫\n[00:33.46]\n[00:34.04]达到理想不太易\n[00:36.82]\n[00:37.52]即使有信心 斗志却抑止\n[00:42.01]\n[00:43.65]谁人定我去或留\n[00:47.41]\n[00:48.20]定我心中的宇宙\n[00:51.16]\n[00:51.96]只想靠两手 向理想挥手\n[00:56.96]\n[00:58.03]问句天几高\n[01:00.77]心中志比天更高\n[01:04.52]\n[01:05.86]自信打不死的心态活到老\n[01:12.24]\n[01:13.03]Wo oh\n[01:16.91]我有我心底故事\n[01:19.88]\n[01:20.52]亲手写上每段得失乐与悲与梦儿\n[01:27.39]Wo oh\n[01:30.27]\n[01:31.19]纵有创伤不退避\n[01:34.27]\n[01:34.84]梦想有日达成\n[01:37.10]找到心底梦想的世界\n[01:41.05]\n[01:41.71]终可见\n[01:44.65]\n[02:10.88]谁人没试过犹豫\n[02:13.42]\n[02:14.42]达到理想不太易\n[02:16.92]\n[02:17.95]即使有信心 斗志却抑止\n[02:23.06]\n[02:24.23]谁人定我去或留\n[02:28.19]\n[02:28.94]定我心中的宇宙\n[02:31.62]\n[02:32.39]只想靠两手 向理想挥手\n[02:38.05]\n[02:38.88]问句天几高\n[02:41.17]心中志比天更高\n[02:44.81]\n[02:45.86]自信打不死的心态活到老\n[02:52.61]\n[02:53.43]Wo oh\n[02:56.07]\n[02:57.17]我有我心底故事\n[03:00.45]\n[03:01.07]亲手写上每段得失乐与悲与梦儿\n[03:07.88]Wo oh\n[03:10.19]\n[03:11.71]纵有创伤不退避\n[03:14.96]\n[03:15.51]梦想有日达成\n[03:17.62]找到心底梦想的世界\n[03:21.33]\n[03:22.16]终可见\n[03:25.09]\n[03:25.85]Wo oh\n[03:29.10]\n[03:29.69]亲手写上每段得失乐与悲与梦儿\n[03:36.83]\n[03:40.28]Wo oh\n[03:42.88]\n[03:44.02]梦想有日达成找到心底梦想的世界\n[03:50.39]\n[03:51.00]终可见\n[04:00.00]\n[04:01.00]制作人：赵英俊\n[04:02.00]吉他：毕赫宸/赵英俊\n[04:03.00]鼓手：李彦超/李平/祁大为\n[04:04.00]贝斯：张宝宇\n[04:05.00]箱琴：大鹏/宋宇/修健/赵英俊/张宝宇\n[04:06.00]伴唱：金天/谯帆/修健/宋宇/ 赵英俊/马小潮/杨玉婷/任振辉/冯力宪/刘响\n[04:07.00]录音及混音：鲍锐（北京录顶技studio）\n",
        theme: 'dark'
    },
    {
        src: '给你宇宙（翻自 脸红的思春期） - InusI,阿花花种.mp3',
        img: '给你宇宙.jpg',
        lrc: "[00:00.000]Date：2016.11.16\n[00:00.500]Title：给你宇宙（Galaxy）\n[00:01.000]Original：脸红的思春期\n[00:01.500]Covered：花冢&SonJeon\n[00:02.000]Mix:X.Yi\n[00:02.200]Poster:7An\n[00:02.230]花冢：\n[00:04.520]是不是喝了太多的咖啡\n[00:08.870]心脏咚咚跳个不停\n[00:12.000]难以入睡\n[00:14.850]稍后星光洒落的话\n[00:20.080]我又无法入睡了吧\n[00:26.470]当过去的凌晨全都亮起来的时候\n[00:29.740]又可以在你身边入睡了吧\n[00:32.640]在你怀中入睡的我\n[00:35.420]好似成为了天使\n[00:38.630]我在你的怀中\n[00:41.220]洒落了那星光\n[00:44.250]打造了银河\n[00:46.950]要到处飞翔\n[00:52.560]因为我是那自由飞翔的飞行\n[00:55.290]因为我是那自由飞翔的飞行员\n[00:58.340]有那明亮的星星和流星\n[01:01.080]把我的宇宙给你\n[01:04.020]因为我是那自由飞翔的飞行员\n[01:06.820]因为我是那在你身边的飞行员\n[01:09.880]只为你摘下那星星\n[01:12.470]把我的宇宙给你\n[01:17.050]SonJeon：\n[01:19.260]像星星一样 像下落的雨一样\n[01:21.860]想拥有发着光的你\n[01:25.340]只用拇指和食指\n[01:27.220]就可以很好地表现我的心\n[01:30.000]着急的是我啊\n[01:31.430]不只是紧张不已\n[01:33.230]准备好了的话就要发射 像升空的人造卫星一样\n[01:36.670]在你身边不断围绕\n[01:38.610]再靠近的话 你会把这份紧张带走吗\n[01:42.150]花冢：\n[01:42.410]现在我的心情如此之好\n[01:47.140]在过去的行星上\n[01:50.250]写下了你的名字\n[01:53.220]稍后稍后星光洒落的话\n[01:58.590]那颗星星会最闪耀\n[02:04.780]当过去的凌晨全都亮起来的时候\n[02:08.100]又可以在你身边入睡了吧\n[02:10.940]在星光下入睡的我\n[02:13.560]好似得到了全宇宙\n[02:16.760]我在你的怀中\n[02:19.490]洒落了星光\n[02:22.560]打造了宇宙\n[02:25.180]要到处飞翔\n[02:29.790]因为我是那自由飞翔的飞行员\n[02:32.030]因为我是那自由飞翔的飞行员\n[02:35.110]有那明亮的星星和流星\n[02:37.830]把我的宇宙给你\n[02:40.770]因为我是那自由飞翔的飞行员\n[02:43.640]因为我是那在你身边的飞行员\n[02:46.600]只为你摘下那颗星\n[02:49.250]把我的宇宙给你\n[02:52.360]因为我是那自由飞翔的飞行员\n[02:55.300]因为我是那自由飞翔的飞行员\n[02:58.240]有那明亮的星星和流星\n[03:00.920]把我的宇宙给你\n[03:03.940]因为我是你的飞行员\n[03:09.800]有那明亮的星星和流星\n[03:12.550]把我的宇宙给你\n[03:34.160]歌词翻译：不要羡慕我有酒窝（网易云音乐）\n",
        theme: 'dark'
    },
    {
        src: '江南调 - Winky诗.mp3',
        img: '江南调.jpg',
        lrc: "[00:00.000] 作词 : 方水兵\n[00:01.000] 作曲 : Winky诗\n[00:02.000] 编曲 : Winky诗\n[00:16.181]花似火 水如蓝 笑靥乱 伊人香\n[00:22.600]乌衣巷 忆江南 点点惆怅满\n[00:29.055]六朝心事付风雨 秦淮河岸谁人唱\n[00:35.589]一曲千古轮回又抱琵琶 轻声弹\n[00:42.585]\n[00:43.930]谢家燕 又成双 朱雀桥 花径香\n[00:50.271]青石街 碎夕阳 片片往事伤\n[00:56.844]秦时明月百姓家 梧桐井边盛玉盘\n[01:03.393]一曲春秋百转恰似冬水 春又暖\n[01:10.824]\n[01:11.955]泊舟向晚篱墙 坐看世事冷暖\n[01:18.252]翻开历史的画卷 安静的沧桑\n[01:24.715]繁华亦如云烟 一缕袅袅飘散\n[01:31.357]楼台歌榭生旦坊 马蹄声踏江山\n[01:38.926]\n[02:07.749]谢家燕 又成双 朱雀桥 花径香\n[02:14.090]青石街 碎夕阳 片片往事伤\n[02:20.736]秦时明月百姓家 梧桐井边盛玉盘\n[02:27.355]一曲春秋百转恰似冬水 春又暖\n[02:34.952]\n[02:35.818]泊舟向晚篱墙 坐看世事冷暖\n[02:42.088]翻开历史的画卷 安静的沧桑\n[02:48.717]繁华亦如云烟 一缕袅袅飘散\n[02:55.315]楼台歌榭生旦坊 马蹄声踏江山\n[03:03.025]\n[03:03.714]泊舟向晚篱墙 坐看世事冷暖\n[03:09.965]小桥流水的呼唤 清澈的回荡\n[03:16.720]英雄寂寞当年 奈何一夜风霜\n[03:23.170]挽袖补韵调江南 风月不止垂杨\n[03:31.275]\n",
        theme: 'dark'
    },
    {
        src: '暖暖 - 噗嗵咚咚.mp3',
        img: '暖暖.jpg',
        lrc: "[00:00.000] 作词 : 李焯雄\n[00:01.000] 作曲 : 人工卫星\n[00:09.627]\n[00:31.681] 都可以随便的\n[00:33.375] 你说的 我都愿意去\n[00:36.336] 小火车 摆动的旋律\n[00:40.888] 都可以是真的\n[00:42.444] 你说的 我都会相信\n[00:45.463] 因为我完全信任你\n[00:50.315] 细腻的喜欢\n[00:52.411] 毛毯般的厚重感\n[00:54.839] 晒过太阳熟悉的安全感\n[00:59.352] 分享热汤\n[01:01.108] 我们两支汤匙一个碗\n[01:03.984] 左心房 暖暖的好饱满\n[01:08.639] 我想说其实你很好\n[01:10.888] 你自己却不知道\n[01:13.785] 真心地对我好\n[01:16.101] 不要求回报\n[01:18.478] 爱一个人希望她过更好\n[01:23.018] 打从心里暖暖的\n[01:25.375] 你比自己更重要\n[01:29.118]\n[01:41.137] 都可以随便的\n[01:47.152] 你说的 我都愿意去\n[01:50.077] 回忆里 满足的旋律\n[01:54.600] 都可以是真的\n[01:56.477] 你说的 我都会相信\n[01:59.344] 因为我完全信任你\n[02:04.023] 细腻的喜欢\n[02:06.179] 你手掌的厚实感\n[02:08.602] 什么困难都觉得有希望\n[02:13.265] 我哼着歌 你自然地就接下一段\n[02:17.997] 我知道 暖暖就在胸膛\n[02:22.443] 我想说其实你很好\n[02:24.766] 你自己却不知道\n[02:27.636] 真心的对我好\n[02:29.881] 不要求回报\n[02:32.288] 爱一个人希望她过更好\n[02:36.889] 打从心里暖暖的\n[02:39.368] 你比自己更重要\n[02:45.382] 我想说其实你很好\n[02:47.721] 你自己却不知道\n[02:50.748] 从来都很低调\n[02:52.932] 自信心不高\n[02:55.333] 爱一个人希望她过更好\n[02:59.945] 打从心里暖暖的\n[03:02.180] 你比自己更重要\n[03:04.161] 我想说其实你很好\n[03:06.388] 你自己却不知道\n[03:09.169] 真心地对我好\n[03:11.413] 不要求回报\n[03:13.707] 爱一个人希望她过更好\n[03:18.297] 打从心里暖暖的\n[03:23.162] 你比自己更重要\n[03:27.699] 我也希望变更好\n",
        theme: 'dark'
    },
    {
        src: '亲爱的旅人啊 - 周深.mp3',
        img: '亲爱的旅人啊.jpg',
        lrc: "[00:02.423]\n[00:03.677]原曲：いつも何度でも\n[00:05.173]曲作：木村 弓\n[00:05.937]原词：觉和歌子\n[00:07.173]原唱：木村 弓\n[00:08.173]填词：沃特艾文儿\n[00:09.437]编曲／演奏：郭一凡\n[00:10.434]制作人：徐威／周深\n[00:11.673]音频制作：徐威\n[00:12.677]视频剪辑：麽麽\n[00:13.677]\n[00:14.355]就此告别吧 水上的列车就快到站\n[00:20.853]开往未来的路上 没有人会再回返\n[00:26.853]说声再见吧 就算留恋也不要回头看\n[00:33.603]在那大海的彼端 一定有空濛的彼岸\n[00:40.854]\n[00:41.614]做最温柔的梦 盛满世间行色匆匆\n[00:47.354]在渺茫的时空 在千百万人之中 听一听心声\n[00:54.352]一路不断失去 一生将不断见证\n[00:59.854]看过再多风景眼眸如初清澄 爱依旧让你动容\n[01:07.854]\n[01:08.853]亲爱的旅人 没有一条路无风无浪\n[01:15.113]会有孤独 会有悲伤 也会有无尽的希望\n[01:21.603]亲爱的旅人 这一程会短暂却又漫长\n[01:28.103]而一切终将 汇聚成最充盈的景象\n[01:35.354]\n[01:36.353]Lalalalalalalalal……Lulululululu\n[02:03.104]\n[02:03.614]就此告别吧 身后的灯火逐渐暗淡\n[02:10.352]每个恋家的孩子 都要扬起远行的帆\n[02:16.114]说声再见吧 美好的梦境不会消散\n[02:22.624]你的爱枕在臂弯 心脏将毕生柔软\n[02:30.604]\n[02:30.854]既然相遇是种 来自于时光的馈赠\n[02:36.853]那么离别时 也一定要微笑着 回忆放心中\n[02:43.603]生命无限渺小 却同样无限恢宏\n[02:48.854]你为寻找或是告别耗尽一生 也足够让人心动\n[02:57.853]\n[02:58.355]亲爱的旅人 你仍是记忆中的模样\n[03:04.353]穿过人群 走过人间 再去往更远的远方\n[03:10.854]你灵魂深处 总要有这样一个地方\n[03:17.353]永远在海面漂荡\n[03:20.852]在半空中飞扬\n[03:23.614]永远轻盈永远滚烫\n[03:26.853]不愿下沉不肯下降\n[03:32.103]\n[03:32.103]Lalalalalalala……Lululululu\n[03:59.603]\n[04:01.354]此歌仅代表对【千与千寻】的喜爱 侵删\n",
        theme: 'dark'
    },
    {
        src: '秋酿 - 房东的猫.mp3',
        img: '秋酿.jpg',
        lrc: "[00:00.000] 作词 : 吴佩岭@房东的猫\n[00:01.000] 作曲 : 吴佩岭@房东的猫\n[00:23.280]那年他才十八\n[00:26.890]你也正值美好年华\n[00:31.250]每当谈及青梅竹马\n[00:35.060]人们总说“他俩”\n[00:39.270]那年村头的树下\n[00:43.290]你苦苦地张望\n[00:47.550]姗姗来迟的他\n[00:50.450]送你一枝含苞的花\n[00:57.430]你说要穿红色的旗袍\n[01:01.060]点一盏不灭的烛光\n[01:05.180]他说要种春天的麦芽\n[01:08.630]喝杯秋天的酒啊\n[01:13.200]话音还在风中飘荡\n[01:16.600]他已去了遥远的北方\n[01:20.650]繁华城市的繁华\n[01:24.120]让人迷失了方向\n[01:46.820]春天的麦芽酿成秋天的酒啊\n[01:54.920]摇曳的烛光闪烁他的脸庞\n[02:02.940]喝下这杯微醺的陈酿\n[02:10.960]睡梦中你披上那件红色旗袍\n[02:27.030]别让眼泪晕花了妆\n[02:30.840]美丽的新娘\n[02:34.760]他为你采摘的鲜花\n[02:38.000]是最独特的嫁妆\n[02:44.450]啦啦啦啦…………\n[03:13.520]别留在过往\n[03:18.980]谁为他脱下体面西装\n[03:22.950]异乡的游子啊\n[03:27.160]爬上树梢的月亮\n[03:30.580]是否还在他心上\n",
        theme: 'light'
    },
    {
        src: 'The Show - Lenka.mp3',
        img: 'The Show.jpg',
        lrc: "[00:00.000] 作词 : Jason Reeves/Lenka Kripac\n[00:00.513] 作曲 : Jason Reeves/Lenka Kripac\n[00:01.26]I'm just a little bit\n[00:03.18]Caught in the middle\n[00:04.84]Life is a maze\n[00:07.06]And love is a riddle\n[00:08.86]I don't know where to go\n[00:11.56]Can't do it alone\n[00:13.31]I've tried\n[00:14.71]And I don't know why\n[00:21.58]Slow it down\n[00:23.57]Make it stop\n[00:25.42]Or else my heart is going to pop\n[00:29.34]Cause it's too much\n[00:31.28]Yeah it's a lot\n[00:34.14]To be something I'm not\n[00:37.30]I'm a fool\n[00:39.17]Out of love\n[00:41.48]Cause I just can't get enough\n[00:47.93]I'm just a little bit\n[00:49.99]Caught in the middle\n[00:51.68]Life is a maze\n[00:53.73]And love is a riddle\n[00:55.63]I don't know where to go\n[00:58.34]can't do it alone\n[01:00.11]I've tried\n[01:01.51]And I don't know why\n[01:03.87]I am just a little girl\n[01:05.60]Lost in the moment\n[01:07.33]I'm so scared\n[01:09.29]But I don't show it\n[01:11.23]I can't figure it out\n[01:14.22]It's bringing me down\n[01:15.74]I know\n[01:17.06]I've got to let it go\n[01:21.61]And just enjoy the show\n[01:23.92]The sun is hot\n[01:25.98]In the sky\n[01:27.93]Just like a giant spotlight\n[01:31.82]The people follow the sign\n[01:36.57]And synchronize in time\n[01:39.79]It's a joke\n[01:41.63]Nobody knows\n[01:43.96]They've got a ticket to that show\n[01:49.90]Yeah\n[01:50.67]I'm just a little bit\n[01:52.45]Caught in the middle\n[01:54.25]Life is a maze\n[01:56.18]And love is a riddle\n[01:58.04]I don't know where to go\n[02:00.76]can't do it alone\n[02:02.60]I've tried\n[02:04.01]And I don't know why\n[02:06.37]I am just a little girl\n[02:08.03]Lost in the moment\n[02:09.80]I'm so scared\n[02:11.84]But I don't show it\n[02:13.64]I can't figure it out\n[02:16.59]It's bringing me down\n[02:18.16]I know\n[02:19.57]I've got to let it go\n[02:24.13]And just enjoy the show\n[02:29.40]Oh oh\n[02:32.02]Just enjoy the show\n[02:37.23]Oh oh\n[02:41.06]I'm just a little bit\n[02:43.16]Caught in the middle\n[02:44.95]Life is a maze\n[02:46.91]And love is a riddle\n[02:48.89]I don't know where to go\n[02:51.42]can't do it alone\n[02:53.25]I've tried\n[02:54.69]And I don't know why\n[02:56.88]I am just a little girl\n[02:58.67]Lost in the moment\n[03:00.42]I'm so scared\n[03:02.46]But I don't show it\n[03:04.46]I can't figure it out\n[03:07.35]It's bringing me down\n[03:08.93]I know\n[03:10.21]I've got to let it go\n[03:14.88]And just enjoy the show\n[03:17.33]Dum de dum\n[03:19.15]Dudum de dum\n[03:22.18]Just enjoy the show\n[03:25.08]Dum de dum\n[03:26.88]Dudum de dum\n[03:29.99]Just enjoy the show\n[03:32.53]I want my money back\n[03:34.22]I want my money back\n[03:36.14]I want my money back\n[03:37.80]Just enjoy the show\n[03:40.26]I want my money back\n[03:42.00]I want my money back\n[03:43.79]I want my money back\n[03:45.78]Just enjoy the show\n",
        theme: 'light'
    },
    {
        src: 'YELLOW - 神山羊.mp3',
        img: 'YELLOW.jpg',
        lrc: "[00:00.065]つまりは好奇心に囚われてたんだ\n[00:02.599]大切な物なら壊したんだ\n[00:04.689]明かりの灯らないホールケーキ\n[00:06.674]木製の君と踊ってたんだ\n[00:09.025]クローゼットで待った今日も\n[00:10.749]小さな身体ただ寄せ合って\n[00:12.761]眠るのさ、変わるのさ\n[00:14.589]想像容易い安全\n[00:16.784]「私馬鹿な子なのどこにも行かないで」\n[00:20.624]濁った正体の鈍い目を覚ませ\n[00:24.908]夜のうち片付けたおもちゃ\n[00:28.617]無邪気なままでまだいたかった\n[00:37.081]愛情はhighただ捨て置くばかり\n[00:41.574]剥がれ落ちた大事な記憶\n[00:45.309]but 後悔 low-lifeならば敢えて\n[00:49.646]ありえないことを願う夏を\n[00:53.460]YELLOW\n[01:09.473]あいつは好奇心に殺されたようだ\n[01:11.719]狡猾な術なら試したんだ\n[01:13.887]うだつの上がらないあんな行為\n[01:15.794]満面の笑みで歌ってたんだ\n[01:18.067]クローゼットで待った今日は\n[01:19.948]一人で待つのならこんなもんか\n[01:21.985]変わるのさ、終わるのさ、肯定\n[01:25.512]求め続ける 価値 価値 価値 迫る秒針\n[01:28.150]もっと巻いて\n[01:29.404]業 深くなって 終いには天地が 逆さまになる\n[01:32.460]なんで？どうして？ほら霞んだ透明\n[01:34.211]「窓から見た景色をまだ覚えています」\n[01:38.468]いっそ消えて無くなるだけのYELLOW\n[01:46.044]YELLOW\n[02:02.266]その日が来ないよう、わざと間違えて\n[02:06.968]崩れ落ちた、乖離と解脱\n[02:10.573]救いなどないよう、限りあるなんて\n[02:15.406]まだ、想う熱\n[02:20.604]愛情はhighただ捨て置くばかり\n[02:25.254]剥がれ落ちた大事な記憶\n[02:29.015]but 後悔 low-lifeならば敢えて\n[02:33.352]ありえないことを願う夏を\n",
        theme: 'dark'
    }
]

// console.log(lrc);
// 获取需要的dom
let doms = {
    ul: document.querySelector('.container .ul'),
    container: document.querySelector('.container'),
    cover: document.querySelector('.cover'),
    cd: document.querySelector('.cd'),
    temp: document.querySelector('.temp'),
    controller: document.querySelector('.controller'),
    play_pause: document.querySelector('.controller .play-pause'),  // 播放暂停按钮
    play: document.querySelector('.controller .play'),  // 播放暂停按钮
    pause: document.querySelector('.controller .pause'),  // 播放暂停按钮
    bg: document.querySelector('.bg'),  // 整个背景图
    cover_bg: document.querySelector('.song .temp .cover'),  // 封面图片
    cd_bg: document.querySelector('.song .temp .cd'),  // cd图片
    next: document.querySelector('.controller .right'),  // 下一个
    last: document.querySelector('.controller .left'),  // 上一个
    changeModel: document.querySelector('.controller .model'),  // 切换播放方式
    sArea: document.querySelector('#s-area'),
    sHover: document.querySelector('#s-area #s-hover'),
    insTime: document.querySelector('#s-area #ins-time'),
    seekBar: document.querySelector('#s-area #seek-bar'),
    volume: document.querySelector('.controller .volume'),
    volume_val: document.querySelector('.controller .volume-val'),
}


/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象: {time: 开始时间,words: 歌词内容}
 */
function parseLrc(index) {
    const lrc = music[index].lrc;
    let lines = lrc.split('\n');
    let result = [];
    for (let i = 0; i < lines.length; i++) {
        let str = lines[i];
        let parts = str.split(']');
        let timeStr = parts[0].substring(1);
        let obj = {
            time: parseTime(timeStr),
            words: parts[1]
        }
        if (parts[1]) result.push(obj);
    }
    return result;
}

/**
 * 将一个时间字符串解析成数字（秒）
 * @param {string} 时间字符串
 * @return {number} 时间 s
 */
function parseTime(timeStr) {
    let parts = timeStr.split(':');
    return +parts[0] * 60 + +parts[1];
}

/**
 * 计算出在当前播放器播放到第几秒的情况下，
 * lrcData数组中，应高亮显示的歌词下标, 
 * 若没有任何一句歌词需要显示，得到-1
 */
function findIndex() {
    let curTime = audio.currentTime;
    for (let i = 0; i < lrcData.length; i++) {
        if (curTime < lrcData[i].time) {
            return i - 1;
        }
    }
    // 找遍了还没找到，即最后一句
    return lrcData.length - 1;
}

/**
 * 创建歌词元素li
 */
function createLrcElements() {
    let frag = document.createDocumentFragment(); // 文档片段
    for (let i = 0; i < lrcData.length; i++) {
        let li = document.createElement('li');
        li.textContent = lrcData[i].words;
        //doms.ul.appendChild(li);  //改动了dom树
        frag.appendChild(li);
    }
    doms.ul.appendChild(frag);
}

function clearDocument() {
    doms.ul.innerHTML = "";
}

/**
 *  设置ul元素的偏移量
 */
function setOffset() {
    let index = findIndex();

    let offset = liHeight * (index - 2); // + liHeight/2 - containerHeight/2;
    offset = offset < 0 ? 0 : offset;
    // offset = offset > maxOffset ? maxOffset : offset;
    doms.ul.style.transform = `translateY(-${offset}px)`;
    // 去掉之前的active样式
    let li = doms.ul.querySelector('.active')
    if (li) {
        li.classList.remove('active')
    }
    li = doms.ul.children[index];
    if (li) {
        li.classList.add('active');
    }
}

// 初始化音乐
const initAudio = (index) => {
    const bg_img = baseImgPath + music[index].img;
    // 设置背景
    doms.bg.style.backgroundImage = `url('${bg_img}')`;
    doms.cover_bg.style.backgroundImage = `url('${bg_img}')`;
    doms.cd_bg.style.backgroundImage = `url('${bg_img}')`;
    // 音乐mp3地址
    audio.src = baseSrc + music[index].src;
    audio.volume = volume;
    // 歌词偏移量
    offset = 0;
    // 获取歌词
    lrcData = parseLrc(index);
    // 清空歌词
    clearDocument();
    // 创建歌词
    createLrcElements();
    // 更换主题
    doms.controller.setAttribute("theme", music[index].theme);
}

initAudio(index);

// 播放暂停
const play_pause = () => {
    if (flag) {
        audio.pause();
        doms.cover.classList.remove('cover-active'); // 封面阴影
        doms.cd.classList.remove('cd-active');  // cd转动
        doms.temp.classList.remove('temp-active');  // 打开 cd 盒子
        doms.pause.classList.remove('active-icon'); // 隐藏图标
        doms.play.classList.add('active-icon'); // 隐藏图标
    } else {
        audio.play();
        doms.cover.classList.add('cover-active'); // 封面阴影
        doms.cd.classList.add('cd-active');  // cd转动
        doms.temp.classList.add('temp-active');  // 打开 cd 盒子
        doms.play.classList.remove('active-icon'); // 隐藏图标
        doms.pause.classList.add('active-icon'); // 隐藏图标
    }
    flag = !flag;
}

// 鼠标移动在进度条上， 触发该函数	
function showHover(event) {
    seekBarPos = doms.sArea.offsetWidth;    // 获取进度条长度
    seekT = event.clientX - doms.sArea.offsetLeft;  //获取当前鼠标在进度条上的位置
    seekLoc = audio.duration * (seekT / doms.sArea.offsetWidth); //当前鼠标位置的音频播放秒数： 音频长度(单位：s)*（鼠标在进度条上的位置/进度条的宽度）

    doms.sHover.style.width = `${seekT}px`;  //设置鼠标移动到进度条上变暗的部分宽度

    cM = seekLoc / 60;    // 计算播放了多少分钟： 音频播放秒速/60

    ctMinutes = Math.floor(cM);  // 向下取整
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60); // 计算播放秒数

    if ((ctMinutes < 0) || (ctSeconds < 0))
        return;

    if (ctMinutes < 10)
        ctMinutes = '0' + ctMinutes;

    if (isNaN(ctMinutes) || isNaN(ctSeconds))
        doms.insTime.innerText = '--:--';
    else
        doms.insTime.innerText = ctMinutes + ':' + ctSeconds;  // 设置鼠标移动到进度条上显示的信息
    doms.insTime.style.left = `${seekT}px`;
    doms.insTime.style['margin-left'] = `-21px`;
    doms.insTime.style.display = 'block';
}

// 鼠标移出进度条，触发该函数
function hideHover() {
    doms.sHover.style.width = '0';  // 设置鼠标移动到进度条上变暗的部分宽度 重置为0
    doms.insTime.innerText = '00:00';
    doms.insTime.style.display = 'none';
}

// 鼠标点击进度条，触发该函数
function playFromClickedPos() {
    audio.currentTime = seekLoc; // 设置音频播放时间 为当前鼠标点击的位置时间
    doms.seekBar.style.width = `${seekT}px`;        // 设置进度条播放长度，为当前鼠标点击的长度
    hideHover();                 // 调用该函数，隐藏原来鼠标移动到上方触发的进度条阴影
}


audio.addEventListener('timeupdate', function () {
    // 设置歌词偏移量
    setOffset();
    // 设置进度条
    doms.seekBar.style.width = `${audio.currentTime / audio.duration * doms.sArea.clientWidth}px`;
});
// 播放下一首
audio.addEventListener('ended', function () {
    // 顺序播放
    if (playModel === 0) {
        if (index < music.length - 1) {
            index++;
        } else {
            index = 0;
        }
        initAudio(index);
        audio.play();
    } else if (playModel === 1) {
        initAudio(index);
        audio.play();
    } else if (playModel === 2) {
        index = Math.floor(Math.random() * music.length);
        initAudio(index);
        audio.play();
    } else {
        alert('未知错误');
    }
});

// 开始暂停
doms.play_pause.addEventListener('click', play_pause);

// 下一首
doms.next.addEventListener('click', function () {
    // 先暂停
    if (flag) {
        play_pause();
        flag = !flag;
    }
    if (index < music.length - 1) {
        index++;
    } else {
        index = 0;
    }
    initAudio(index);
    flag = !flag;
    // flag = false;
    play_pause();
});

// 上一首
doms.last.addEventListener('click', function () {
    // 先暂停
    if (flag) {
        play_pause();
        flag = !flag;
    }
    if (0 < index) {
        index--;
    } else {
        index = music.length - 1;
    }
    initAudio(index);
    flag = !flag;
    play_pause()
});

// 切换
doms.changeModel.addEventListener('click', function () {
    doms.changeModel.children[playModel].classList.remove('active-icon');
    if (playModel < doms.changeModel.childElementCount - 1) {
        playModel++;
    } else {
        playModel = 0;
    }
    doms.changeModel.children[playModel].classList.add('active-icon');
});

// 进度条鼠标移入显示灰色
doms.sArea.addEventListener('mousemove', showHover);

// 鼠标移出进度条
doms.sArea.addEventListener('mouseout', hideHover);

// 鼠标点击进度条
doms.sArea.addEventListener('click', playFromClickedPos);
