# 听见每一个声部 · Hear Every Part

**[打开中文网站](https://hanyu-meng.github.io/Multi-instrument_Transcription_paper_sharing/?lang=zh)** · **[Open in English](https://hanyu-meng.github.io/Multi-instrument_Transcription_paper_sharing/?lang=en)** · **[直接开始演示](https://hanyu-meng.github.io/Multi-instrument_Transcription_paper_sharing/?lang=zh&mode=present#intro)**

有图、有试听、有讲者笔记的多乐器自动音乐转录 literature review。为一次 **40 分钟 paper sharing** 设计：38 分钟讲解 + 2 分钟讨论，其中 **14 分钟聚焦 MuScriptor**。内容核对日期：2026-10-13。

An illustrated, bilingual review of multi-instrument automatic music transcription. A **38-minute guided talk + 2-minute discussion**, with **14 minutes on MuScriptor**. Research checked on 2026-10-13.

## 怎么用 / How to use

- 在右上角切换 **中文 / English**；页面、图示、讲者笔记与文献解读一起切换。
- 点击“开始演示”逐页讲解；首页“开始40分钟分享”同时启动计时器。计时可暂停、重置。
- **← / →** 或 **PageUp / PageDown** 翻页，**Home / End** 跳到首尾，**Esc** 返回阅读。
- “讲者笔记 / Speaker notes”显示每页的讲解建议。笔记在当前页面内显示，投屏时请按需关闭。
- 文献库支持中英文关键词搜索、类别筛选，以及逐篇展开“贡献与局限”。
- 4秒试听可开关三个合成声部；它是**教学示例，非模型推理或模型效果对比**。
- 页面可用浏览器打印为PDF；网站本身不依赖后端或模型服务。部分密集页面及手机界面可纵向滚动。

The language toggle updates content, illustrations, notes and paper reviews together. Presentation mode supports keyboard navigation, a 40-minute timer and fullscreen. The paper library supports bilingual search and category filters. Speaker notes appear inline, so close them when projecting if desired. The synthetic listening example runs locally in the browser and is not model inference. Use browser printing for a printable copy.

## 40 分钟路线 / The 40-minute route

| 时间 / Time | 内容 / Topic | 目标 / Purpose |
| --- | --- | --- |
| 00–04 | 任务定义与试听 / Task & listening | 谁、什么音、何时开始和结束 / Who, what pitch, when |
| 04–09 | 挑战与方法 / Challenges & method families | 谐波重叠；分解、检测与事件解码 / Overlap; factorization, detection, events |
| 09–18 | 代表性文献 / Milestones | NMF → Onsets & Frames → Slakh → MT3 → Jointist / YourMT3+ |
| 18–22 | 指标与数据 / Metrics & data | 不混淆F1；理解合成到真实的差距 / Understand metrics and the domain gap |
| 22–36 | **MuScriptor** | 架构、三阶段训练、乐器条件、结果与局限 / Architecture, training, conditions, evidence, limits |
| 36–38 | 近期方向与讨论引导 / Frontiers & prompts | 预训练表征、效率、audio-to-score / Representations, efficiency, notation |
| 38–40 | 自由讨论 / Open discussion | 从最后一页选一个问题 / Pick one closing question |

完整双语逐页讲解建议：[Presenter guide](docs/PRESENTER_GUIDE.md)。

## 主要文献 / Selected sources

1. [NMF for Polyphonic Music Transcription — WASPAA 2003](https://www.merl.com/publications/TR2003-139)
2. [Onsets and Frames — ISMIR 2018](https://arxiv.org/abs/1710.11153) · **piano-only conceptual bridge**
3. [Slakh — WASPAA 2019](https://arxiv.org/abs/1909.08494) · **dataset**
4. [MAESTRO — ICLR 2019](https://arxiv.org/abs/1810.12247) · **piano dataset**
5. [MT3 — ICLR 2022](https://arxiv.org/abs/2111.03017)
6. [Jointist — 2023 preprint](https://arxiv.org/abs/2302.00286)
7. [Time-Frequency Perceiver — ICASSP 2023](https://arxiv.org/abs/2306.10785)
8. [YourMT3+ — MLSP 2024](https://arxiv.org/abs/2407.04822v3)
9. **[MuScriptor — ISMIR 2026, arXiv v2](https://arxiv.org/abs/2607.08168v2)**
10. [2025 AMT Challenge report — 2026](https://arxiv.org/abs/2603.27528)
11. [Harmonica — September 2026](https://arxiv.org/abs/2609.04640) · **adjacent: instrument-agnostic**
12. [TUTTI — September 2026](https://arxiv.org/abs/2609.00640) · **adjacent: audio-to-score**

这是一条精选教学路线，不是穷尽式综述，也不是统一排行榜。论文、官方代码、演示链接和每项结论的出处都在网页中。

This is a curated teaching route, not an exhaustive survey or universal leaderboard. The website links original papers, official code and demos alongside the relevant claims.

## 阅读 MuScriptor 结果时 / Interpreting MuScriptor

主阶段图来自论文表1：Multi F1 **15.2 → 41.7 → 48.2**，分别为合成训练、加真实微调、加RL后训练。条件是作者内部 **372首DTest、论文1.3B模型、参考乐器列表、CFG=1、过滤同乐器同音高的重叠参考音符**。保留冲突音符时，最终Multi F1为 **42.0**。所有数值为作者报告，未独立复现。

The stage chart reports Table 1 under the conditions above. External-dataset Table 2 is shown separately and includes regressions; these results are not an architecture-only comparison or evidence of universal superiority. Current repository size labels (103M / 307M / 1.4B) are kept distinct from the paper’s 1.3B benchmark label. Code, weights and paper have different licenses.

来源与图片归属：[Sources and attribution](docs/SOURCES_AND_ATTRIBUTION.md)。

## 本地运行与维护 / Run and maintain

纯静态 HTML / CSS / JavaScript，没有构建依赖。

```sh
python3 -m http.server 4173 --directory site
# Open http://localhost:4173
```

内容与引用集中在 `site/assets/content.js`，交互在 `app.js`，样式在 `style.css`。

```sh
node --check site/assets/app.js
node --check site/assets/content.js
node scripts/check.mjs
node scripts/export-guide.mjs
```

`check.mjs` 检查双语页面/文献一致性、38分钟总时长、本地素材和出处结构。`export-guide.mjs` 从网页内容生成讲稿，避免两处维护。

提交修改后，运行以下脚本：检查内容、推送 `main`，再把 `site/` 发布到 `gh-pages` 分支。GitHub Pages 配置为从 `gh-pages` 根目录发布，无需 Actions workflow 权限。

```sh
sh scripts/publish-pages.sh
```

After committing, the script validates content, pushes `main`, and publishes the `site/` subtree to `gh-pages`. GitHub Pages serves the root of that branch. Core content, diagrams and synthetic audio are local; Google Fonts are optional and fall back to system fonts. External paper and demo links need a network connection.

## 素材与许可 / Assets and licenses

流程图、谐波示意、首页piano roll和浏览器合成音频为原创教学素材。MuScriptor论文图1按 **CC BY 4.0** 原样转载并署名；不是独立复现实验。没有镜像商业歌曲或模型权重。详见 [attribution](docs/SOURCES_AND_ATTRIBUTION.md)。
