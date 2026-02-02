'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Menu, X, CheckCircle2, Award, Sparkles, BookOpen, PenTool, Moon, Mail, Map, ExternalLink, Shield, MessageCircle } from 'lucide-react';

// 【重要】源明先生のLINE公式アカウントURL
// lin.ee 形式の短縮URLをお持ちの場合は、こちらを差し替えるとより安定します
const BOOKING_URL = "https://line.me/R/ti/p/@677wjewg";
// アルファポリス受賞結果ページURL
const AWARD_URL = "https://www.alphapolis.co.jp/prize/result/663000178";

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);

  // 1. 星の座標を固定（再レンダリングによる瞬間移動を防止）
  const starsFar = useMemo(() => (
    [...Array(20)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  ), []);

  const starsNear = useMemo(() => (
    [...Array(10)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }))
  ), []);

  // 2. モバイルメニュー開閉時のスクロールロック
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // 3. 追従ボタンの表示ロジック統合（IntersectionObserver）
  useEffect(() => {
    const el = document.getElementById('price');
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setIsPriceVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 400 && !isPriceVisible;
      setShowFloatingButton(shouldShow);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPriceVisible]);

  const cards = [
    { id: 1, name: "宿命の算命学", meaning: "二人の相性", hint: "生年月日から、片思いの彼との宿命的な相性を読み解きます。" },
    { id: 2, name: "真実のタロット", meaning: "彼の本音", hint: "今この瞬間、曖昧な関係の彼があなたに抱いている「本音」を映し出します。" },
    { id: 3, name: "未来の色譜", meaning: "恋の行方", hint: "三ヶ月以内に、二人の関係がどう動くのか。その物語の続きを予見します。" }
  ];

  const currentCard = cards.find(c => c.id === selectedCard);

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#e5e1da] font-sans selection:bg-amber-700/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-[100] bg-[#0d0c0a]/95 backdrop-blur-md border-b border-[#3d3a33]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-serif font-bold text-amber-200 tracking-[0.15em]">
            運命の綴り手 <span className="text-amber-500">源明</span>
          </div>

          <div className="hidden md:flex space-x-8 text-[11px] uppercase tracking-[0.2em] text-gray-300 font-bold">
            <a href="#about" className="hover:text-amber-200 transition">占術と物語</a>
            <a href="#voice" className="hover:text-amber-400 transition">読者の声</a>
            <a href="#faq" className="hover:text-amber-400 transition">よくある質問</a>
            <a href="#price" className="hover:text-amber-400 transition border-b border-amber-500/30 pb-1 text-amber-100">鑑定依頼</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={BOOKING_URL} 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex bg-amber-200 hover:bg-white text-[#0d0c0a] font-bold py-2 px-6 rounded-full text-xs transition shadow-lg shadow-amber-200/10 active:scale-95"
            >
              無料で相手の本音を知る
            </a>
            <button 
              className="md:hidden p-2 text-amber-200 relative z-[110]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニュー開閉"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] md:hidden" onClick={() => setIsMenuOpen(false)} />
        )}
        <div className={`fixed inset-y-0 right-0 w-[75%] bg-[#1a1814] z-[105] shadow-2xl transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col p-10 pt-24 space-y-8 text-lg font-serif text-center">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="border-b border-white/5 pb-4 text-white">占術と物語</a>
            <a href="#voice" onClick={() => setIsMenuOpen(false)} className="border-b border-white/5 pb-4 text-white">読者の声</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)} className="border-b border-white/5 pb-4 text-white">よくある質問</a>
            <a href={BOOKING_URL} rel="noopener noreferrer" className="bg-[#06C755] text-white text-center font-bold py-4 rounded-full mt-4 text-base shadow-xl active:scale-95 transition">
              無料で相手の本音を知る
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1b1a18_0%,_#0d0c0a_45%,_#0a0a0c_100%)]"></div>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-900/10 via-amber-900/5 to-transparent blur-[80px] animate-nebula-drift"></div>
          
          <div className="absolute inset-0 animate-space-drift-slow opacity-30">
            {starsFar.map((s, i) => (
              <div key={i} className="absolute bg-white rounded-full" style={{ top: `${s.top}%`, left: `${s.left}%`, width: '1px', height: '1px', boxShadow: '0 0 2px #fff' }} />
            ))}
          </div>

          <div className="absolute inset-0 animate-space-drift-medium opacity-50">
            {starsNear.map((s, i) => (
              <div key={i} className="absolute bg-amber-200/40 rounded-full animate-twinkle" style={{ top: `${s.top}%`, left: `${s.left}%`, width: '2px', height: '2px', animationDelay: `${s.delay}s` }} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block py-1 px-5 rounded-full border border-amber-500/50 text-amber-200 text-[10px] tracking-[0.3em] mb-8 bg-amber-500/10 backdrop-blur-sm font-bold">
            アルファポリス第15回ファンタジー小説大賞 奨励賞受賞(最終23位) ※1
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.3] md:leading-[1.4] mb-10 text-white tracking-tight text-shadow-glow">
            片思い、曖昧な関係。<br />
            あの人の<span className="text-amber-400 font-bold">本音</span>を物語で読み解く。
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-14 max-w-2xl mx-auto leading-loose font-serif italic px-4 text-shadow-sm">
            「相手の気持ち」という迷宮から、二人が織りなす結末まで。<br className="hidden md:block"/>
            作家・源明が算命学とタロットで、あなただけの鑑定書を認めます。
          </p>
          
          <div className="bg-white/[0.04] border border-amber-900/40 p-6 md:p-12 rounded-lg shadow-2xl max-w-2xl mx-auto backdrop-blur-md relative overflow-hidden">
            <p className="text-amber-100 text-xs mb-10 tracking-[0.2em] font-bold uppercase leading-relaxed text-shadow-sm">
              【一頁の託宣】扉を開き、物語の欠片を受け取ってください
            </p>
            <div className="grid grid-cols-3 gap-3 md:gap-8">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className={`group relative aspect-[2/3] rounded-sm transition-all duration-700 transform active:scale-95 border
                    ${selectedCard === card.id 
                      ? 'scale-105 border-amber-400/80 shadow-[0_0_40px_rgba(251,191,36,0.4)] bg-amber-900/40' 
                      : 'border-white/20 bg-white/[0.1] hover:bg-white/[0.15] hover:border-amber-500/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 pointer-events-none" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center relative z-10">
                    <BookOpen 
                      size={24} 
                      className={`${selectedCard === card.id ? 'text-amber-300' : 'text-amber-200'} mb-3 md:mb-5 transition-colors group-hover:text-white`} 
                    />
                    <span className="text-[10px] md:text-xs font-serif font-bold tracking-widest text-white leading-tight mb-2">
                      {card.name}
                    </span>
                    <span className="text-[8px] md:text-[9px] text-gray-100 font-serif opacity-90 italic">
                      ({card.meaning})
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {selectedCard && (
              <div className="mt-10 animate-fade-in text-center space-y-8">
                <div className="relative p-6 border-l-2 border-amber-400/50 bg-white/5 text-left">
                  <p className="text-white text-sm md:text-base leading-relaxed font-serif italic text-shadow-sm">
                    「{currentCard.hint}」
                  </p>
                </div>
                <div className="space-y-4">
                    <a 
                      href={BOOKING_URL}
                      rel="noopener noreferrer"
                      className="group w-full inline-flex items-center justify-center bg-[#06C755] text-white font-bold py-5 px-10 rounded-full text-lg shadow-[0_10px_30px_rgba(6,199,85,0.3)] transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      <MessageCircle size={24} className="mr-2 fill-current" />
                      無料で相手の本音を知る
                      <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-[10px] text-gray-300 tracking-widest italic font-bold">
                      ※ボタンを押すとLINEアプリが起動します
                    </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LINE Flow Section */}
      <section className="py-20 bg-[#1a1814] border-y border-amber-900/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-amber-100 font-bold">鑑定結果を受け取るまでの流れ</h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto opacity-50"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center font-serif">
            {[
              { step: "01", title: "公式LINEを登録", desc: "ボタンを押してLINEを開き、源明を友だち追加してください。" },
              { step: "02", title: "鑑定希望と送信", desc: "トーク画面で「鑑定希望」と一言送るか、メニューから希望項目を選びます。" },
              { step: "03", title: "物語鑑定書が届く", desc: "源明があなたの宿命と現状を読み解き、あなただけの物語を直接届けます。" }
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-white/[0.03] border border-white/10 rounded-xl group hover:border-amber-500/30 transition shadow-lg">
                <span className="text-4xl font-bold text-amber-500/20 absolute top-4 left-6 italic">{item.step}</span>
                <h3 className="text-lg font-bold text-amber-100 mb-4 relative z-10">{item.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="about" className="py-24 bg-[#0d0c0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="md:w-5/12 relative group">
              <div className="absolute -inset-2 bg-amber-500/10 rounded-lg blur-2xl group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-[#1a1814] aspect-[4/5] rounded-sm border border-amber-900/30 flex flex-col items-center justify-center p-10 text-center shadow-2xl overflow-hidden">
                 <PenTool size={48} className="text-amber-500 mb-8 opacity-70" />
                 <h3 className="text-3xl font-serif text-white tracking-[0.3em] mb-2 text-shadow-glow">源明</h3>
                 <p className="text-[10px] text-amber-200/70 tracking-[0.4em] uppercase mb-8 italic border-b border-white/5 pb-4">Author & Storyteller</p>
                 <div className="space-y-4 text-[11px] text-gray-200 font-serif leading-loose">
                   <p className="text-amber-100">アルファポリス 第15回<br/>ファンタジー小説大賞 奨励賞受賞 ※1</p>
                   <a 
                    href={AWARD_URL} 
                    target="_blank" 
                    rel="noopener noreferrer nofollow" 
                    aria-label="アルファポリス公式結果発表ページを新しいタブで開く" 
                    className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-bold hover:underline"
                   >
                    公式発表はこちら <ExternalLink size={10} />
                   </a>
                   <p className="border-t border-white/5 pt-4 text-gray-400 italic font-bold">(旧名義：村雨勇として受賞)</p>
                   <p className="border-t border-white/5 pt-4 text-xs font-bold text-amber-100 text-[12px]">算命学 / タロット / 運命の色譜 / 手相</p>
                   <p className="text-gray-300">恋愛という物語を読み解き、<br/>魂の声を言葉に変える専門家。</p>
                 </div>
              </div>
            </div>
            <div className="md:w-7/12 space-y-10">
              <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white">相手の気持ちが分かれば、<br className="hidden md:block"/>恋の物語は動き出す。</h2>
              <div className="space-y-6 text-gray-200 text-base md:text-lg leading-relaxed font-serif text-shadow-sm">
                <p>源明の鑑定は、単なる結果の羅列ではありません。あなたの生年月日（算命学）から宿命の骨子を組み、手相から刻まれた経験を読み取ります。</p>
                <p>それらはすべて、一通の<strong>「物語風の鑑定書」</strong>として結晶化されます。片思いの焦燥も、曖昧な関係の不安も、一つの意味ある「物語」として肯定することで、あなたの次の一歩を照らします。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Section */}
      <section id="voice" className="py-24 bg-[#14120f] border-y border-amber-900/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-serif mb-4 text-amber-100 font-bold">読者の声</h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto opacity-50 mb-16"></div>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              { tag: "復縁", age: "31歳・読者", text: "鑑定書を読んだ瞬間、これまでの苦しみがすべて意味のある『伏線』だったのだと気づかされ、涙が止まりませんでした。自分を愛せるようになった頃、彼から自然と連絡が届きました。" },
              { tag: "本音", age: "28歳・読者", text: "彼の冷たい態度の裏にある、あまりに不器用な物語を源明先生に綴っていただきました。その夜、不思議と心が凪いで、彼を許すことができました。今は穏やかな関係に戻れています。" }
            ].map((v, i) => (
              <div key={i} className="bg-[#0d0c0a] p-10 border border-amber-900/10 italic font-serif relative shadow-xl">
                <span className="absolute -top-3 left-8 bg-[#3d3a33] text-amber-200 text-[10px] px-3 py-1 tracking-widest uppercase shadow-lg font-bold">Chapter: {v.tag}</span>
                <p className="text-gray-300 text-sm md:text-base leading-[2.2] mb-6 italic">「{v.text}」</p>
                <div className="text-[10px] text-amber-600 tracking-[0.2em] font-bold not-italic">— {v.age} ※個人の感想です</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#0d0c0a]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-4 text-amber-100 font-bold text-shadow-sm">よくある質問</h2>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-serif font-bold">Frequently Asked Questions</p>
          </div>
          <div className="space-y-6">
            {[
              { q: "片思いの相手の気持ちはどこまで具体的に分かりますか？", a: "タロットで今の彼の心の温度を読み、算命学で二人の宿命を重ねます。「今、彼はあなたをどう意識しているか」「次に何を求めているか」を、一つの物語として具体的にお伝えします。" },
              { q: "無料相談はどのように行われますか？", a: "公式LINEを友だち追加後、チャット形式で鑑定を行います。源明が手動で鑑定を行い、物語形式のメッセージをお送りします。" }
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.04] p-6 border border-white/10 rounded-sm shadow-sm group hover:border-amber-500/30 transition">
                <h3 className="text-sm md:text-base font-bold mb-3 flex items-start gap-3">
                  <span className="text-amber-400 font-serif text-lg">Q.</span>
                  <span className="leading-relaxed text-white">{item.q}</span>
                </h3>
                <div className="text-xs md:text-sm text-gray-300 leading-relaxed flex items-start gap-3 pl-1 border-t border-white/5 pt-3">
                  <span className="text-amber-200 font-serif opacity-80 shrink-0 text-lg">A.</span>
                  <p className="font-serif italic leading-[1.8]">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="price" className="py-28 px-4 text-center bg-gradient-to-b from-[#0d0c0a] to-[#1a1814]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-12 text-white leading-snug tracking-tighter px-4">あなたの恋の物語を、<br />ここから綴り始めましょう。</h2>
          <div className="bg-[#14120f] p-8 md:p-16 border border-amber-500/20 shadow-[0_30px_70px_rgba(0,0,0,0.8)] space-y-10 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-amber-500"><Moon size={120} /></div>
            <div className="space-y-4 relative z-10">
              <p className="text-amber-400 font-bold tracking-[0.3em] uppercase text-xs">初回限定：一頁の託宣（無料診断）</p>
              <div className="text-4xl md:text-6xl font-serif flex items-baseline justify-center gap-3">
                <span className="text-white font-bold italic">¥0</span>
                <span className="text-sm text-gray-400 line-through font-normal">（通常 ￥5,500）</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm md:text-base font-serif leading-relaxed max-w-sm mx-auto italic relative z-10 text-shadow-sm">
                算命学と色譜による基礎鑑定と、<br className="hidden md:block"/>今のあなたへ向けたメッセージを公式LINEで届けます。
            </p>
            <div className="space-y-4 relative z-10">
                <a 
                  href={BOOKING_URL} 
                  rel="noopener noreferrer"
                  className="group block w-full bg-[#06C755] text-white font-bold py-6 rounded-full text-xl shadow-[0_15px_40px_rgba(6,199,85,0.4)] transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle size={28} className="inline-block mr-2 fill-current mb-1" />
                  無料鑑定の結果を受け取る
                  <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-[11px] text-gray-300 tracking-[0.1em] font-bold">友だち追加後、チャットからすぐに開始できます</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] text-gray-400 uppercase tracking-[0.2em] relative z-10 font-serif font-bold">
              <span className="flex items-center gap-2"><Shield size={14} className="text-amber-500"/> Privacy Protected</span>
              <span className="flex items-center gap-2"><PenTool size={14} className="text-amber-500"/> Awarded Author</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers & Evidence */}
      <section className="py-16 bg-black/80 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-[13px] md:text-[14px] text-gray-200 space-y-6 leading-relaxed font-serif">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-l-4 border-amber-500/60 pl-6 py-2 bg-white/[0.03] rounded-r-lg shadow-inner">
            <span className="font-bold text-white tracking-wider">※1 アルファポリス 第15回ファンタジー小説大賞 結果発表ページにて、奨励賞として掲載（最終順位23位）</span>
            <a 
              href={AWARD_URL} 
              target="_blank" 
              rel="noopener noreferrer nofollow" 
              aria-label="アルファポリス公式結果発表ページを新しいタブで開く"
              className="text-amber-400 flex items-center gap-1 hover:text-white font-bold underline transition-colors bg-amber-500/10 px-2 py-1 rounded"
            >
              [公式発表を確認] <ExternalLink size={12} />
            </a>
          </div>
          <p className="opacity-100 font-bold border-b border-white/5 pb-2">※本サービスは占いおよび物語制作サービスです。将来の出来事を100%保証するものではありません。医療、法律等の専門的な助言は各専門家へご相談ください。</p>
          <p className="opacity-90 leading-loose text-gray-300">※ご提供する内容は、占術および物語表現による解釈であり、感じ方・受け取り方には個人差があります。特定の効果を約束するものではありません。</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 px-4 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-gray-200 text-[12px] tracking-[0.2em] font-bold">
          <div className="font-serif text-amber-200 text-xl tracking-[0.2em] font-bold uppercase underline decoration-amber-500/40 underline-offset-8">源明 | Storyteller</div>
          <div className="flex flex-wrap justify-center gap-10">
            <a href="https://example.com/terms" className="text-white hover:text-amber-200 transition underline decoration-white/40 underline-offset-4 font-bold">利用規約</a>
            <a href="https://example.com/privacy" className="text-white hover:text-amber-200 transition underline decoration-white/40 underline-offset-4 font-bold">個人情報保護方針</a>
            <a href="https://example.com/law" className="text-white hover:text-amber-200 transition underline decoration-white/40 underline-offset-4 font-bold">特定商取引法表記</a>
          </div>
          <p className="text-gray-400 font-normal">© 2024 Genmei / Kawahara Genmei.</p>
        </div>
      </footer>

      {/* Smart Floating Sticky Button */}
      <div className={`fixed bottom-0 left-0 w-full p-4 z-[110] transition-all duration-700 ease-in-out transform ${showFloatingButton ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        <a 
            href={BOOKING_URL} 
            rel="noopener noreferrer"
            className="w-full bg-[#06C755] text-white font-bold py-5 rounded-full shadow-[0_-10px_50px_rgba(0,0,0,0.9),0_10px_30px_rgba(6,199,85,0.4)] flex items-center justify-center gap-2 text-lg active:scale-95 transition border border-white/10"
        >
            <MessageCircle size={24} className="fill-current" />
            <span>無料で相手の本音を知る</span>
            <ChevronRight size={20} />
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&display=swap');
        .font-serif { font-family: 'Shippori+Mincho', serif; }
        html { scroll-behavior: smooth; }
        @keyframes space-drift-slow { 0% { transform: translateY(0); } 100% { transform: translateY(-100px); } }
        @keyframes space-drift-medium { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-150px) rotate(5deg); } }
        @keyframes nebula-drift { 0% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.1) translate(2%, 2%); } 100% { transform: scale(1) translate(0, 0); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        .animate-space-drift-slow { animation: space-drift-slow 120s linear infinite; }
        .animate-space-drift-medium { animation: space-drift-medium 80s linear infinite; }
        .animate-nebula-drift { animation: nebula-drift 40s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-space-drift-slow, .animate-space-drift-medium, .animate-nebula-drift, .animate-twinkle { animation: none !important; } }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .text-shadow-glow { text-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
        .text-shadow-sm { text-shadow: 0 1px 4px rgba(0, 0, 0, 1); }
      `}} />
    </div>
  );
};

export default App;