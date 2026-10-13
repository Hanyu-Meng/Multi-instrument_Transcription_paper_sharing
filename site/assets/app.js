/* A dependency-free bilingual reading and presentation shell. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* Reading works without storage. */ } }
  };
  const ui = {
    zh: {
      title: '听见每一个声部 · 多乐器音乐转录', language: 'EN', languageLabel: 'Switch to English',
      notes: '讲者笔记', present: '开始演示', reading: '返回阅读', chapters: '章节导航',
      rail: '一段录音，多个声部。', railSub: '多乐器音乐转录 · 40 分钟文献导读',
      railKicker: '聆听 · 解码 · 理解', brandSub: '双语论文分享导读', library: '文献资料库',
      railStatus: '中英双语 · 40 分钟分享', skip: '跳到正文', sources: '出处', note: '讲者笔记',
      minute: '分钟', previous: '上一页', next: '下一页', play: '开始', pause: '暂停', reset: '重置计时器',
      fullscreen: '全屏', leaveFullscreen: '退出全屏', timer: '已用时间，建议总时长 40 分钟',
      libraryLead: '按关键词与类别查找原始论文。展开每篇文献，查看贡献与阅读时应注意的限制。',
      search: '搜索标题、作者、方法或中英文关键词…', searchLabel: '搜索文献', kindLabel: '筛选文献类别',
      allKinds: '全部类别', count: (n, total) => `${n} / ${total} 篇文献`, empty: '没有匹配的文献。请尝试其他关键词或类别。',
      paper: '论文', code: '代码', demo: '项目 / 演示', expand: '贡献与局限', insight: '值得记住', limit: '边界与局限',
      footer: '为约 40 分钟的 paper sharing 设计。图示与合成音频用于解释概念；合成示例不是任何转录模型的输出。数值与结论应结合所链接原文的任务设置、数据划分和评价协议理解。',
      keys: '演示快捷键：← / → 或 PageUp / PageDown；Home / End 跳转；Esc 返回阅读。',
      audioPlaying: '正在播放 4 秒合成示例；勾选声部可即时静音 / 恢复。',
      audioStopped: '播放已停止。', audioFinished: '合成示例播放完成。',
      audioNone: '请至少选择一个声部，再播放合成示例。', audioUnavailable: '当前浏览器无法播放 Web Audio 合成示例。',
      audioIdle: '点击播放后才会生成声音。该 4 秒示例不是模型输出。',
      errorInstrument: '音高与时间看似正确，乐器标签却错了。只评音符、不评乐器的指标可能掩盖这一错误。',
      errorOffset: '起音一致，但结束时间太晚。仅判断起音是否正确的指标，无法完整反映音符时值的错误。',
      errorMissing: '较弱的音符被完全漏检。总体平均分可能掩盖某个声部召回率不足的问题。',
      instrumentAlt: '预测音符的乐器标签错误', offsetAlt: '预测音符结束时间过晚', missingAlt: '预测中缺少该音符'
    },
    en: {
      title: 'Hear Every Part · Multi-instrument Music Transcription', language: '中文', languageLabel: '切换到中文',
      notes: 'Speaker notes', present: 'Present', reading: 'Read', chapters: 'Chapter navigation',
      rail: 'One recording. Many parts.', railSub: 'Multi-instrument transcription · a 40-minute field guide',
      railKicker: 'LISTEN · DECODE · UNDERSTAND', brandSub: 'A BILINGUAL PAPER SHARING GUIDE', library: 'Paper library',
      railStatus: 'Bilingual · 40-minute sharing', skip: 'Skip to content', sources: 'Sources', note: 'Speaker notes',
      minute: 'min', previous: 'Previous slide', next: 'Next slide', play: 'Start', pause: 'Pause', reset: 'Reset timer',
      fullscreen: 'Fullscreen', leaveFullscreen: 'Exit fullscreen', timer: 'Elapsed time; suggested total duration 40 minutes',
      libraryLead: 'Search the original papers by keyword and category. Expand each entry for its contribution and the limits to keep in mind.',
      search: 'Search titles, authors, methods, or English / Chinese keywords…', searchLabel: 'Search papers', kindLabel: 'Filter paper category',
      allKinds: 'All categories', count: (n, total) => `${n} / ${total} papers`, empty: 'No matching papers. Try another keyword or category.',
      paper: 'Paper', code: 'Code', demo: 'Project / demo', expand: 'Contribution and limitations', insight: 'What to remember', limit: 'Boundaries and limitations',
      footer: 'Designed for a paper sharing session of approximately 40 minutes. Diagrams and synthetic audio explain concepts; the audio illustration is not the output of a transcription model. Read quantitative claims alongside the linked papers’ task settings, data splits, and evaluation protocols.',
      keys: 'Presentation keys: ← / → or PageUp / PageDown; Home / End to jump; Esc to return to reading.',
      audioPlaying: 'Playing a 4-second synthetic illustration. Toggle parts to mute or restore them live.',
      audioStopped: 'Playback stopped.', audioFinished: 'Synthetic illustration finished.',
      audioNone: 'Choose at least one part before playing the synthetic illustration.', audioUnavailable: 'This browser cannot play the Web Audio illustration.',
      audioIdle: 'Sound is generated only after you click Play. This 4-second illustration is not model output.',
      errorInstrument: 'The pitch and timing look right, but the instrument label is wrong. A note metric that ignores instrument identity can hide this error.',
      errorOffset: 'The onset matches, but the note ends too late. An onset-only metric does not fully capture this duration error.',
      errorMissing: 'A quieter note is missing entirely. An overall average can hide low recall for one instrument part.',
      instrumentAlt: 'Predicted note with an incorrect instrument label', offsetAlt: 'Predicted note with an ending that is too late', missingAlt: 'The predicted note is missing'
    }
  };
  const params = new URLSearchParams(location.search);
  const state = {
    lang: ['zh', 'en'].includes(params.get('lang')) ? params.get('lang') : storage.get('polyphony-lang') === 'en' ? 'en' : 'zh',
    mode: params.get('mode') === 'present' ? 'present' : 'read',
    notes: storage.get('polyphony-notes') === 'true', current: 'intro', query: '', kind: '', error: 'instrument',
    data: null, paired: null, elapsed: 0, timerStartedAt: null, scrollLockUntil: 0
  };
  const audio = { context: null, master: null, nodes: [], stems: {}, finish: null, generation: 0, playing: false };
  let scrollScheduled = false;
  const tr = () => ui[state.lang];
  const kindLabel = kind => ({foundation: ['基础思想','Foundations'], data: ['数据集','Datasets'], method: ['代表性方法','Methods'], focus: ['重点论文','Focus paper'], recent: ['近期方向','Recent directions']})[kind]?.[state.lang === 'en' ? 1 : 0] || kind;
  const safeHash = () => { try { return decodeURIComponent(location.hash.slice(1)); } catch (_) { return ''; } };
  const safeLink = url => { try { const parsed = new URL(url, location.href); return /^https?:$/.test(parsed.protocol) ? parsed.href : '#'; } catch (_) { return '#'; } };
  const externalLink = (label, url) => `<a href="${escape(safeLink(url))}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>`;
  const allIds = () => [...state.data.slides.map(slide => slide.id), 'library'];
  const currentIndex = () => state.data.slides.findIndex(slide => slide.id === state.current);
  const slideElement = id => document.getElementById(id);
  const chapterFirst = chapter => {
    if (typeof chapter.first === 'string') return chapter.first;
    if (typeof chapter.first === 'number') return state.data.slides[chapter.first]?.id || state.data.slides[0].id;
    return state.data.slides.find(slide => slide.chapter === chapter.id)?.id || state.data.slides[0].id;
  };

  function syncURL() {
    const url = new URL(location.href);
    url.searchParams.set('lang', state.lang);
    if (state.mode === 'present') url.searchParams.set('mode', 'present'); else url.searchParams.delete('mode');
    url.hash = state.current;
    history.replaceState(null, '', url);
  }

  function render() {
    stopAudio(true);
    state.data = window.buildContent(state.lang);
    state.paired = window.buildContent(state.lang === 'zh' ? 'en' : 'zh');
    if (!allIds().includes(state.current)) state.current = state.data.slides[0].id;
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    document.body.dataset.lang = state.lang;
    document.title = tr().title;
    $('#language').textContent = tr().language;
    $('#language').setAttribute('aria-label', tr().languageLabel);
    $('#notes-toggle').textContent = tr().notes;
    $('.skip-link').textContent = tr().skip;
    $('.brand-sub').textContent = tr().brandSub;
    $('.rail-kicker').textContent = tr().railKicker;
    $('#rail-intro').innerHTML = `${escape(tr().rail)}<small>${escape(tr().railSub)}</small>`;
    $('#rail-status').textContent = tr().railStatus;
    $('#library-nav').textContent = `${tr().library} ↗`;
    $('#chapter-nav').setAttribute('aria-label', tr().chapters);
    $('#chapter-nav').innerHTML = state.data.chapters.map((chapter, index) => `<a class="chapter-link" data-chapter="${escape(chapter.id)}" href="#${escape(chapterFirst(chapter))}"><span class="number">${String(index + 1).padStart(2, '0')}</span><span>${escape(chapter.label)}</span><small>${escape(chapter.range || '')}</small></a>`).join('');
    let minute = 0;
    $('#slides').innerHTML = state.data.slides.map((slide, index) => {
      const start = minute;
      minute += Number(slide.minutes) || 0;
      return `<section id="${escape(slide.id)}" class="slide${index === 0 ? ' hero' : ''}" aria-labelledby="heading-${escape(slide.id)}" data-chapter="${escape(slide.chapter)}">
        <div class="eyebrow"><span>${String(index + 1).padStart(2, '0')} / ${String(state.data.slides.length).padStart(2, '0')}</span><span>${escape(slide.kicker)}</span></div>
        <div class="slide-heading"><${index === 0 ? 'h1' : 'h2'} id="heading-${escape(slide.id)}">${slide.title}</${index === 0 ? 'h1' : 'h2'}><span class="minute">${start}–${minute} ${escape(tr().minute)}</span></div>
        ${slide.lead ? `<p class="lead">${slide.lead}</p>` : ''}<div class="content">${slide.html || ''}</div>
        ${slide.sources?.length ? `<div class="sources"><span>${escape(tr().sources)}:</span>${slide.sources.map(source => externalLink(source.label, source.url)).join('<span aria-hidden="true">·</span>')}</div>` : ''}
        ${slide.note ? `<aside class="speaker-note"><strong>${escape(tr().note)}</strong><div>${slide.note}</div></aside>` : ''}
      </section>`;
    }).join('');
    renderLibrary();
    $('#footer').innerHTML = `<p>${escape(tr().footer)}</p><p>${escape(tr().keys)}</p>`;
    $('#prev').setAttribute('aria-label', tr().previous);
    $('#next').setAttribute('aria-label', tr().next);
    $('#timer-reset').setAttribute('aria-label', tr().reset);
    $('#timer').setAttribute('aria-label', tr().timer);
    $('#presentation-bar').setAttribute('aria-label', tr().keys);
    $('#presentation-bar').setAttribute('role', 'toolbar');
    updateFullscreenLabel();
    updateError(state.error);
    audioStatus(tr().audioIdle);
    applyMode();
    updateTimer();
  }

  function renderLibrary() {
    const kinds = [...new Set(state.data.papers.map(paper => paper.kind).filter(Boolean))];
    if (state.kind && !kinds.includes(state.kind)) state.kind = '';
    $('#library').innerHTML = `<div class="library-head"><h2>${escape(tr().library)}</h2><span id="paper-count" aria-live="polite"></span></div>
      <p class="lead">${escape(tr().libraryLead)}</p><div class="search-row"><input id="paper-search" type="search" autocomplete="off" placeholder="${escape(tr().search)}" aria-label="${escape(tr().searchLabel)}" value="${escape(state.query)}"><select id="paper-kind" aria-label="${escape(tr().kindLabel)}"><option value="">${escape(tr().allKinds)}</option>${kinds.map(kind => `<option value="${escape(kind)}"${state.kind === kind ? ' selected' : ''}>${escape(kindLabel(kind))}</option>`).join('')}</select></div><div id="paper-results"></div>`;
    $('#paper-search').addEventListener('input', event => { state.query = event.target.value; renderPapers(); });
    $('#paper-kind').addEventListener('change', event => { state.kind = event.target.value; renderPapers(); });
    renderPapers();
  }

  function renderPapers() {
    const normalize = text => String(text).toLocaleLowerCase().normalize('NFKC');
    const terms = normalize(state.query.trim()).split(/\s+/).filter(Boolean);
    const paired = new Map(state.paired.papers.map(paper => [paper.id, paper]));
    const papers = state.data.papers.filter(paper => {
      if (state.kind && paper.kind !== state.kind) return false;
      const other = paired.get(paper.id) || {};
      const haystack = normalize([paper, other].map(item => [item.title, item.authors, item.year, item.venue, item.kind, item.summary, item.insight, item.limit].join(' ')).join(' '));
      return terms.every(term => haystack.includes(term));
    });
    $('#paper-count').textContent = tr().count(papers.length, state.data.papers.length);
    $('#paper-results').innerHTML = papers.length ? papers.map(paper => `<article class="paper-row" id="paper-${escape(paper.id)}"><div class="paper-year">${escape(paper.year)}</div><div><h3>${escape(paper.title)}</h3><div class="paper-meta">${escape([paper.authors, paper.venue, kindLabel(paper.kind)].filter(Boolean).join(' · '))}</div><p class="paper-summary">${escape(paper.summary)}</p><div class="paper-links">${externalLink(tr().paper, paper.url)}${paper.code ? externalLink(tr().code, paper.code) : ''}${paper.demo ? externalLink(tr().demo, paper.demo) : ''}</div>${paper.insight || paper.limit ? `<details><summary>${escape(tr().expand)}</summary>${paper.insight ? `<p><strong>${escape(tr().insight)}:</strong> ${escape(paper.insight)}</p>` : ''}${paper.limit ? `<p><strong>${escape(tr().limit)}:</strong> ${escape(paper.limit)}</p>` : ''}</details>` : ''}</div></article>`).join('') : `<p class="empty">${escape(tr().empty)}</p>`;
  }

  function applyMode() {
    const present = state.mode === 'present';
    document.body.classList.toggle('presentation', present);
    document.body.classList.toggle('show-notes', state.notes);
    $('#mode-toggle').textContent = present ? tr().reading : tr().present;
    $('#mode-toggle').setAttribute('aria-pressed', String(present));
    $('#notes-toggle').setAttribute('aria-pressed', String(state.notes));
    $('#presentation-bar').hidden = !present;
    updateActive();
  }

  function updateActive() {
    const index = currentIndex();
    $$('.slide').forEach(element => element.classList.toggle('current', element.id === state.current));
    $('#library').classList.toggle('current', state.current === 'library');
    const chapter = index >= 0 ? state.data.slides[index].chapter : null;
    $$('.chapter-link').forEach(link => {
      const active = link.dataset.chapter === String(chapter);
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    if (state.current === 'library') $('#library-nav').setAttribute('aria-current', 'location'); else $('#library-nav').removeAttribute('aria-current');
    $('#slide-status').textContent = index >= 0 ? `${index + 1} / ${state.data.slides.length}` : tr().library;
    $('#prev').disabled = index === 0;
    $('#next').disabled = state.current === 'library';
    $('#progress').style.width = `${state.current === 'library' ? 100 : (index + 1) / state.data.slides.length * 100}%`;
  }

  function goTo(id, { scroll = true, sync = true } = {}) {
    if (!allIds().includes(id)) return;
    if (state.current !== id && audio.playing) stopAudio();
    state.current = id;
    updateActive();
    if (sync) syncURL();
    if (scroll) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      state.scrollLockUntil = performance.now() + (reduced || state.mode === 'present' ? 100 : 900);
      slideElement(id)?.scrollIntoView({ behavior: state.mode === 'present' || reduced ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function setMode(mode) {
    if (mode === 'read') pauseTimer();
    state.mode = mode;
    applyMode();
    syncURL();
    goTo(state.current);
  }
  function move(delta) {
    const ids = allIds();
    const next = Math.min(ids.length - 1, Math.max(0, ids.indexOf(state.current) + delta));
    goTo(ids[next]);
  }

  function tickValue() { return state.elapsed + (state.timerStartedAt === null ? 0 : performance.now() - state.timerStartedAt); }
  function updateTimer() {
    const seconds = Math.floor(tickValue() / 1000);
    const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    $('#timer').textContent = `${time} / 40:00`;
    $('#timer').setAttribute('datetime', `PT${seconds}S`);
    $('.timer').classList.toggle('over', seconds >= 2400);
    $('#timer-toggle').textContent = state.timerStartedAt === null ? tr().play : tr().pause;
    $('#timer-toggle').setAttribute('aria-pressed', String(state.timerStartedAt !== null));
  }
  function startTimer() { if (state.timerStartedAt === null) state.timerStartedAt = performance.now(); updateTimer(); }
  function pauseTimer() { if (state.timerStartedAt !== null) { state.elapsed = tickValue(); state.timerStartedAt = null; } updateTimer(); }
  function updateFullscreenLabel() { $('#fullscreen').setAttribute('aria-label', document.fullscreenElement ? tr().leaveFullscreen : tr().fullscreen); }

  function updateError(kind) {
    if (!['instrument', 'offset', 'missing'].includes(kind) || !$('#error-demo')) return;
    state.error = kind;
    $$('#error-demo [data-error]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.error === kind)));
    const predicted = $('#error-pred');
    if (predicted) {
      predicted.style.width = kind === 'offset' ? '66%' : '38%';
      predicted.style.background = 'var(--accent)';
      predicted.style.opacity = kind === 'missing' ? '0' : '1';
      predicted.setAttribute('role', 'img');
      predicted.setAttribute('aria-label', tr()[`${kind}Alt`]);
    }
    const result = $('#error-result');
    if (result) { result.setAttribute('aria-live', 'polite'); result.textContent = tr()[`error${kind[0].toUpperCase()}${kind.slice(1)}`]; }
  }

  function audioStatus(message) {
    const demo = $('#audio-demo');
    if (!demo) return;
    let status = $('.listen-status', demo);
    if (!status) { status = document.createElement('p'); status.className = 'listen-status'; demo.append(status); }
    status.setAttribute('role', 'status');
    status.textContent = message;
    $('[data-audio="play"]', demo)?.setAttribute('aria-pressed', String(audio.playing));
    const stop = $('[data-audio="stop"]', demo);
    if (stop) stop.disabled = !audio.playing;
  }

  function stopAudio(close = false) {
    audio.generation++;
    clearTimeout(audio.finish);
    audio.nodes.forEach(node => { try { node.stop(); } catch (_) { /* An oscillator may already have ended. */ } });
    audio.nodes = [];
    Object.values(audio.stems).forEach(stem => stem.disconnect());
    audio.stems = {};
    if (audio.master) { audio.master.disconnect(); audio.master = null; }
    const wasPlaying = audio.playing;
    audio.playing = false;
    if (close && audio.context) { audio.context.close().catch(() => {}); audio.context = null; }
    if (wasPlaying && !close) audioStatus(tr().audioStopped);
  }

  async function playAudio() {
    const demo = $('#audio-demo');
    if (!demo) return;
    const inputs = $$('[data-stem]', demo);
    if (!inputs.some(input => input.checked)) { audioStatus(tr().audioNone); return; }
    stopAudio();
    const run = audio.generation;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) { audioStatus(tr().audioUnavailable); return; }
    try {
      audio.context ||= new AudioContext();
      await audio.context.resume();
      if (run !== audio.generation) return;
      const context = audio.context;
      const master = context.createGain();
      audio.master = master;
      master.gain.value = 0.25;
      master.connect(context.destination);
      const base = context.currentTime + 0.05;
      const parts = {
        piano: { type: 'triangle', notes: [[60, 0, .45], [64, .5, .45], [67, 1, .8], [64, 2, .45], [60, 2.5, 1.1]] },
        bass: { type: 'sine', notes: [[48, 0, 1.75], [43, 2, 1.75]] },
        flute: { type: 'sine', notes: [[72, .4, 1], [74, 1.5, .65], [76, 2.5, 1.05]] }
      };
      for (const [name, part] of Object.entries(parts)) {
        const stem = context.createGain();
        stem.gain.value = inputs.find(input => input.dataset.stem === name)?.checked ? 1 : 0;
        stem.connect(master);
        audio.stems[name] = stem;
        for (const [midi, onset, duration] of part.notes) {
          const oscillator = context.createOscillator();
          const envelope = context.createGain();
          oscillator.type = part.type;
          oscillator.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
          const start = base + onset, end = start + duration;
          envelope.gain.setValueAtTime(0.0001, start);
          envelope.gain.exponentialRampToValueAtTime(name === 'flute' ? .12 : .18, start + .025);
          envelope.gain.exponentialRampToValueAtTime(name === 'piano' ? .028 : .10, Math.max(start + .03, end - .07));
          envelope.gain.exponentialRampToValueAtTime(.0001, end);
          oscillator.connect(envelope); envelope.connect(stem);
          oscillator.start(start); oscillator.stop(end + .02);
          oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
          audio.nodes.push(oscillator);
        }
      }
      audio.playing = true;
      audioStatus(tr().audioPlaying);
      audio.finish = setTimeout(() => { if (run !== audio.generation) return; stopAudio(); master.disconnect(); audioStatus(tr().audioFinished); }, 4100);
    } catch (_) { stopAudio(true); audioStatus(tr().audioUnavailable); }
  }

  document.addEventListener('click', event => {
    const element = event.target.closest('button, a');
    if (!element) return;
    if (element.matches('[data-start]')) { event.preventDefault(); setMode('present'); startTimer(); return; }
    if (element.matches('[data-next]')) { event.preventDefault(); move(1); return; }
    if (element.matches('[data-error]')) { updateError(element.dataset.error); return; }
    if (element.matches('[data-audio="play"]')) { void playAudio(); return; }
    if (element.matches('[data-audio="stop"]')) { stopAudio(); return; }
    if (element.matches('a[href^="#"]')) {
      const hash = element.getAttribute('href').slice(1);
      if (allIds().includes(hash)) { event.preventDefault(); goTo(hash); }
      else if (hash.startsWith('paper-') && slideElement(hash)) {
        event.preventDefault(); goTo('library', { scroll: false }); slideElement(hash).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
  document.addEventListener('change', event => {
    const input = event.target.closest('[data-stem]');
    if (input && audio.context && audio.stems[input.dataset.stem]) audio.stems[input.dataset.stem].gain.setTargetAtTime(input.checked ? 1 : 0, audio.context.currentTime, .025);
  });
  $('#language').addEventListener('click', () => {
    const oldKind = state.kind;
    const matchingPaper = state.data.papers.find(paper => paper.kind === oldKind);
    state.lang = state.lang === 'zh' ? 'en' : 'zh';
    if (matchingPaper) state.kind = state.paired.papers.find(paper => paper.id === matchingPaper.id)?.kind || '';
    storage.set('polyphony-lang', state.lang);
    render(); syncURL();
    requestAnimationFrame(() => goTo(state.current));
  });
  $('#notes-toggle').addEventListener('click', () => { state.notes = !state.notes; storage.set('polyphony-notes', String(state.notes)); applyMode(); });
  $('#mode-toggle').addEventListener('click', () => setMode(state.mode === 'present' ? 'read' : 'present'));
  $('#prev').addEventListener('click', () => move(-1));
  $('#next').addEventListener('click', () => move(1));
  $('#timer-toggle').addEventListener('click', () => state.timerStartedAt === null ? startTimer() : pauseTimer());
  $('#timer-reset').addEventListener('click', () => { state.elapsed = 0; state.timerStartedAt = null; updateTimer(); });
  $('#fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else { $('#fullscreen').disabled = true; $('#fullscreen').title = state.lang === 'zh' ? '当前浏览器不支持全屏 API' : 'This browser does not support the fullscreen API'; }
    } catch (_) { /* Fullscreen may be unavailable in an embedded browser. Reading stays usable. */ }
  });
  document.addEventListener('fullscreenchange', updateFullscreenLabel);
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input, select, textarea, [contenteditable="true"]')) return;
    if (event.key === 'Escape' && state.mode === 'present') { event.preventDefault(); setMode('read'); return; }
    if (state.mode !== 'present') return;
    if (['ArrowRight', 'PageDown', 'ArrowLeft', 'PageUp', 'Home', 'End'].includes(event.key)) event.preventDefault();
    if (['ArrowRight', 'PageDown'].includes(event.key)) move(1);
    if (['ArrowLeft', 'PageUp'].includes(event.key)) move(-1);
    if (event.key === 'Home') goTo(state.data.slides[0].id);
    if (event.key === 'End') goTo(state.data.slides[state.data.slides.length - 1].id);
  });
  window.addEventListener('scroll', () => {
    if (state.mode === 'present' || performance.now() < state.scrollLockUntil || scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      scrollScheduled = false;
      let active = state.data.slides[0].id;
      const threshold = innerWidth <= 780 ? 160 : 150;
      for (const id of allIds()) { if (slideElement(id).getBoundingClientRect().top <= threshold) active = id; else break; }
      if (state.current !== active) { state.current = active; updateActive(); syncURL(); }
    });
  }, { passive: true });
  window.addEventListener('hashchange', () => { const hash = safeHash(); if (allIds().includes(hash)) goTo(hash, { sync: false }); });
  window.addEventListener('pagehide', () => stopAudio(true));
  document.addEventListener('visibilitychange', () => { if (document.hidden && audio.playing) stopAudio(); });
  if (typeof window.buildContent !== 'function') {
    $('#slides').innerHTML = '<section class="slide"><h1>内容加载失败 / Content could not load</h1><p>请刷新页面，或查看仓库 README。 Please reload, or consult the repository README.</p></section>';
    return;
  }
  state.current = safeHash() || 'intro';
  render();
  syncURL();
  requestAnimationFrame(() => { if (state.current !== state.data.slides[0].id || state.mode === 'present') goTo(state.current); });
  setInterval(updateTimer, 250);
})();
