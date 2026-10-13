# 多乐器音乐转录 · Multi-instrument Music Transcription

**[中文版](https://hanyu-meng.github.io/Multi-instrument_Transcription_paper_sharing/?lang=zh)** · **[English](https://hanyu-meng.github.io/Multi-instrument_Transcription_paper_sharing/?lang=en)** · **[演示模式](https://hanyu-meng.github.io/Multi-instrument_Transcription_paper_sharing/?lang=zh&mode=present#intro)**

多乐器自动音乐转录的双语文献综述，涵盖任务定义、方法演进、数据与评测、现有挑战，以及 MuScriptor 的模型设计、训练策略和实验结果。内容核对日期：2026-10-13。

A bilingual literature review of multi-instrument automatic music transcription, covering task definitions, methodological developments, data and evaluation, open challenges, and a detailed examination of MuScriptor. Research checked on 2026-10-13.

## 阅读与交互 / Reading and navigation

- 右上角可切换 **中文 / English**；正文、图示、补充说明与文献解读同步切换。
- **演示模式**支持逐页浏览；**← / →** 或 **PageUp / PageDown** 翻页，**Home / End** 跳到首尾，**Esc** 返回阅读。
- **补充说明 / Notes**提供方法细节、评测条件与阅读提示。
- 文献库支持中英文关键词搜索、类别筛选，以及逐篇展开“贡献与局限”。
- 交互式音频示例可开关三个合成声部，用于展示混音中的声部重叠；它不运行转录模型，也不是模型效果对比。
- 支持浏览器打印为PDF。网站无需后端或模型服务，密集页面和手机界面支持纵向滚动。

The language toggle updates content, illustrations, notes and paper reviews together. Presentation mode supports keyboard navigation and fullscreen. The paper library provides bilingual search and category filters. Additional notes document methodological details and evaluation conditions. The synthetic audio example runs locally in the browser; it is not model inference. Use browser printing for a printable copy.

## 综述结构 / Review structure

| 主题 / Topic | 内容 / Scope |
| --- | --- |
| 任务定义 / Task formulation | 音高、时间与乐器归属 / Pitch, timing and instrument attribution |
| 挑战与方法 / Challenges & method families | 谐波重叠；分解、检测与事件解码 / Harmonic overlap; factorization, detection and events |
| 代表性文献 / Representative literature | NMF → Onsets & Frames → Slakh → MT3 → Jointist / YourMT3+ |
| 指标与数据 / Metrics & data | 评测协议与合成到真实的迁移 / Evaluation protocols and synthetic-to-real transfer |
| MuScriptor | 架构、三阶段训练、乐器条件、结果与局限 / Architecture, training, conditioning, results and limitations |
| 研究方向 / Research directions | 预训练表征、推理效率、audio-to-score与开放问题 / Representations, efficiency, notation and open questions |

[双语阅读补充说明 / Bilingual reading notes](docs/PRESENTER_GUIDE.md)。

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

这是一条精选文献综述，不是穷尽式综述，也不是统一排行榜。论文、官方代码、演示链接和每项结论的出处都在网页中。

This is a curated literature review, not an exhaustive survey or universal leaderboard. The website links original papers, official code and demos alongside the relevant claims.

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

`check.mjs` 检查双语页面/文献一致性、本地素材和出处结构。`export-guide.mjs` 从网页内容生成阅读补充说明，避免两处维护。

提交修改后，运行以下脚本：检查内容、推送 `main`，再把 `site/` 发布到 `gh-pages` 分支。GitHub Pages 配置为从 `gh-pages` 根目录发布，无需 Actions workflow 权限。

```sh
sh scripts/publish-pages.sh
```

After committing, the script validates content, pushes `main`, and publishes the `site/` subtree to `gh-pages`. GitHub Pages serves the root of that branch. Core content, diagrams and synthetic audio are local; Google Fonts are optional and fall back to system fonts. External paper and demo links need a network connection.

## 素材与许可 / Assets and licenses

流程图、谐波示意、首页piano roll和浏览器合成音频为原创教学素材。MuScriptor论文图1按 **CC BY 4.0** 原样转载并署名；不是独立复现实验。没有镜像商业歌曲或模型权重。详见 [attribution](docs/SOURCES_AND_ATTRIBUTION.md)。
