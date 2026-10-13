# Sources, evidence and attribution

Research snapshot: **2026-10-13**. This educational website uses primary papers and official project sources. Results are author-reported, not independently reproduced. The interpretation of limitations is review commentary, not an author claim unless explicitly attributed.

## MuScriptor version and result provenance

- [MuScriptor, arXiv v2, 2026-08-03](https://arxiv.org/abs/2607.08168v2), marked ISMIR 2026 camera-ready. [Full text](https://arxiv.org/html/2607.08168v2).
- §3.1: synthetic MIDI corpus, soundfont variation, internal real recordings, alignment and checked RL subset.
- §3.2: five-second segments, 16 kHz mono audio, 512-bin mel representation, decoder-only architecture, optional instrument conditions.
- §3.3: metrics and internal 372-track test set.
- §3.4: eight-candidate, group-relative REINFORCE post-training, instrument-agnostic reward.
- §4 and §4.1.3: default instrument conditioning; conditions derived from reference annotations.
- Table 1: main stage chart, **CFG=1**, 1.3B: Multi F1 15.2 / 41.7 / 48.2; YourMT3+ `YPTF.MoE+Multi (noPS)` reference 21.9. Data scale and conditioning are not matched architecture controls.
- Table 2: external datasets, **v2 caption CFG=1**. Improvements and regressions both shown; all eight Multi F1 pairs are in the expandable website entry. Do not apply the internal DTest description to these external datasets.
- Figure 4: synthetic pretraining at 1% real data raises Offset F1 9.9→33.4; at 100%, 41.0→42.3. CFG=2, no RL; separate from the main stage chart.
- Table 3: real-only model, CFG=2, Multi F1 38.7 unconditioned / 40.5 conditioned. Separate from the final RL model.
- §4.2.3: same-pitch/same-instrument overlapping note limitation. Keeping conflicting DTest references lowers Multi F1 48.2→42.0; not a new model variant.
- The matched “same 300 tracks, supervised-only fine-tuning” control is a review question, not a reported negative experiment.

## Paper and current software are distinguished

[Official repository at inspected commit 7f213af](https://github.com/muscriptor/muscriptor/tree/7f213afecf23bd6a1b8672aa223690ee9807cefb).

The paper names its largest evaluated model 1.3B. The repository lists 103M / 307M / 1.4B released variants. The site keeps the two naming conventions separate; it does not infer a new benchmark result from software changes. The released tokenizer’s `velocity` token is an on/off state, not expressive dynamics. Sheet-music export in current software is additional processing, distinct from the paper’s note-event target.

- [Tokenizer notes](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)
- [Official README](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/README.md)
- Code: MIT. Model weights: CC BY-NC 4.0. Paper: CC BY 4.0. These licenses cover different materials. The internal real corpus and complete training pipeline are not presented as publicly released.

## Original paper figures / 论文原图

The figures below reproduce material from the specified paper versions. They are not generated illustrations or independently reproduced experiments. Figure numbers and PDF pages refer to those versions; PDF pages are counted from the first page of the file. Each figure is accompanied by source links and review commentary on the website. No commercial audio is mirrored.

以下图片来自指定版本的论文原文，并与网站自绘示意明确区分。作者报告的结果不等于独立复现。PDF 页码从文件首页起计；网页中的图解文字属于综述解读。

### Onsets and Frames — Figure 1

Curtis Hawthorne et al. *Onsets and Frames: Dual-Objective Piano Transcription*, ISMIR 2018 / [arXiv:1710.11153v2](https://arxiv.org/abs/1710.11153v2).

- Local file: `site/assets/papers/onsets-frames-architecture.svg`.
- [Original figure and caption](https://arxiv.org/html/1710.11153v2#S3.F1) · [original SVG](https://arxiv.org/html/1710.11153v2/networkstack9.svg) · [PDF page 3](https://arxiv.org/pdf/1710.11153v2#page=3) · [method §3](https://arxiv.org/html/1710.11153v2#S3).
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The SVG is reproduced unchanged, displayed on a white background.
- Scope: the original two-branch piano-transcription architecture. Figure 1 has no dedicated offset head; the velocity stack discussed in §3.1 is omitted from the figure. It does not estimate instrument attribution.

### MT3 — Figures 1 and 2

Josh Gardner et al. *MT3: Multi-Task Multitrack Music Transcription*, ICLR 2022 / [arXiv:2111.03017v4](https://arxiv.org/abs/2111.03017v4).

| Figure | Local file | Original source | PDF |
| --- | --- | --- | --- |
| Fig. 1, task/framework overview | `site/assets/papers/mt3-overview.png` | [Figure and caption](https://arxiv.org/html/2111.03017v4#S1.F1) · [original PNG](https://arxiv.org/html/2111.03017v4/iclr2022/img/mt3.png) | [p. 2](https://arxiv.org/pdf/2111.03017v4#page=2) |
| Fig. 2, tokenization/detokenization | `site/assets/papers/mt3-tokenization.png` | [Figure and caption](https://arxiv.org/html/2111.03017v4#S3.F2) · [original PNG](https://arxiv.org/html/2111.03017v4/iclr2022/img/tokenization-cbfriendly.png) | [p. 4](https://arxiv.org/pdf/2111.03017v4#page=4) |

Both PNGs are reproduced unchanged. Paper license: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Figure 1 is a high-level overview, not a detailed Transformer block diagram; read it with [§3.1](https://arxiv.org/html/2111.03017v4#S3.SS1). Figure 2 describes the output representation, not a pianoroll input to the neural model; input and output details are in [§3.2](https://arxiv.org/html/2111.03017v4#S3.SS2).

**Additional Figure 1 icon attribution.** The paper credits the following Noun Project creators in [Appendix F](https://arxiv.org/html/2111.03017v4#A6), [PDF page 18](https://arxiv.org/pdf/2111.03017v4#page=18). The appendix describes their license as Creative Commons without specifying a per-icon license version; no additional version is inferred here.

| Icon | Creator credited in the paper |
| --- | --- |
| Piano | Juan Pablo Bravo |
| Guitar | varvarvarvarra |
| Bass | Josue Calle |
| Drum Set | Sumyati |
| Oboe | Rank Sol |
| Clarinet | Pham Thanh Lôc |
| French Horn | Creative Stall |
| Bassoon | Lars Meiertoberens |
| Flute | Symbolon |
| Violin | Benedikt Dietrich |
| (Electric) Piano | b farias |
| Viola | Vasily Gedzun |
| Violin | Francesco Cesqo Stefanini |
| Cello | Valter Bispo |
| (String) bass | Soremba |
| Acoustic guitar | farra nugraha |

All icon creators above are credited through the Noun Project by the paper; the figures are reproduced as complete figures, not as separately reusable icon assets.

### Jointist — Figure 1

Kin Wai Cheuk et al. *Jointist: Simultaneous Improvement of Multi-instrument Transcription and Music Source Separation via Joint Training*, 2023 / [arXiv:2302.00286v2](https://arxiv.org/abs/2302.00286v2).

- Local file: `site/assets/papers/jointist-architecture.png`.
- [Original figure and caption](https://arxiv.org/html/2302.00286v2#S3.F1) · [original PNG](https://arxiv.org/html/2302.00286v2/figs/jointist.png) · [PDF page 4](https://arxiv.org/pdf/2302.00286v2#page=4) · [method §3](https://arxiv.org/html/2302.00286v2#S3).
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The PNG is reproduced unchanged, displayed on a white background.
- Reading boundary: the overview omits some input arrows; §3 specifies Mel inputs for recognition and transcription and STFT inputs for separation. Recognition is trained separately, while transcription and separation are jointly optimized.

### YourMT3+ — Figure 1

Sungkyun Chang, Emmanouil Benetos, Holger Kirchhoff, Simon Dixon. *YourMT3+: Multi-instrument Music Transcription with Enhanced Transformer Architectures and Cross-dataset Stem Augmentation*, MLSP 2024 / [arXiv:2407.04822v3](https://arxiv.org/abs/2407.04822v3).

- Local file: `site/assets/papers/yourmt3-architecture.png`.
- [Original figure and caption](https://arxiv.org/html/2407.04822v3#S2.F1) · [original HTML PNG](https://arxiv.org/html/2407.04822v3/system_overview.png) · [PDF page 2](https://arxiv.org/pdf/2407.04822v3#page=2) · [method §3](https://arxiv.org/html/2407.04822v3#S3).
- The local image is a higher-resolution rendering of Figure 1 from PDF page 2: rectangle `(68, 70, 535, 284)` in PDF points, rendered at 432 dpi, resulting in 2802 × 1284 pixels. Only the surrounding page and original caption are excluded; the figure is not redrawn, recolored or annotated. The website supplies attribution and figure context beside it.
- The paper uses the [arXiv perpetual, non-exclusive distribution license](https://arxiv.org/licenses/nonexclusive-distrib/1.0/license.html), **not a Creative Commons license**. This figure is included as a limited, attributed excerpt for scholarly review; author copyright is retained. The arXiv license is not represented as an open reuse license, and the image is not covered by the website's code license.
- Reading boundary: the depicted variant is `YPTF.MoE+Multi`. Its detailed input is a log-magnitude spectrogram plus a ResNet pre-encoder (§3.1), despite the generic Mel wording in the figure caption. Cross-dataset stem augmentation is a training procedure.

### MuScriptor — Figures 1 and 4

Simon Rouard, Michael Krause, Axel Roebel, Carl-Johann Simon-Gabriel, Alexandre Défossez. *MuScriptor: An Open Model for Multi-Instrument Music Transcription*, ISMIR 2026 / [arXiv:2607.08168v2](https://arxiv.org/abs/2607.08168v2).

| Figure | Local file | Original source | PDF |
| --- | --- | --- | --- |
| Fig. 1, qualitative guitar-note example | `site/assets/muscriptor-figure1.png` | [Figure and caption](https://arxiv.org/html/2607.08168v2#S1.F1) · [original PNG](https://arxiv.org/html/2607.08168v2/pianoroll_okabe_ito_textured.png) | [p. 2](https://arxiv.org/pdf/2607.08168v2#page=2) |
| Fig. 4, synthetic-pretraining ablation | `site/assets/papers/muscriptor-pretraining-figure4.png` | [Figure and caption](https://arxiv.org/html/2607.08168v2#S3.F4) · [source PDF](https://arxiv.org/pdf/2607.08168v2) | [p. 5](https://arxiv.org/pdf/2607.08168v2#page=5) |

License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

- Figure 1 is reproduced unchanged. It is a qualitative example, not aggregate evidence. Blue marks correct predictions, green missed notes, orange false predictions. The paper caption calls the false-prediction color red; the image itself is orange.
- Figure 4 is a crop from PDF page 5 rendered at 200 dpi. Crop coordinates are `(48, 48, 547, 207)` in PDF points, scaled to the rendered page width using a PDF page width of 595.276 points. The crop includes the complete five-panel figure and original caption; no values, colors or labels are altered. It compares synthetic pretraining across real-data fractions under **CFG=2, without RL**. This differs from the conditions of the main Table 1 stage chart.
- **MuScriptor has no standalone network architecture figure in the paper.** The website's architecture flow is an original reconstruction of [§3.2](https://arxiv.org/html/2607.08168v2#S3.SS2), [PDF page 4](https://arxiv.org/pdf/2607.08168v2#page=4), and is labelled accordingly. It is not presented as an original paper figure.

MuScriptor 的架构示意依据 §3.2 重构；原文图1与图4分别提供定性转录示例和预训练消融。三者的来源与证据作用在网页中分开标注。

## Original teaching assets

- `site/assets/diagrams/task-{zh,en}.svg`: mixture to instrument-labelled notes; separation is not implied as mandatory.
- `site/assets/diagrams/ambiguity-{zh,en}.svg`: conceptual harmonic overlap, not measured spectral amplitudes.
- `site/assets/diagrams/methods-{zh,en}.svg`: conceptual method families, not a performance ranking.
- Hero waveform and piano roll: original schematic.
- Web Audio example: original short synthetic notes using browser oscillators. Piano/bass/flute timbres are approximations. This is not model inference or a model-output comparison.
- Stage bar chart: original redraw of MuScriptor Table 1, with protocol displayed beside it.
- MuScriptor architecture flow: original reconstruction of the prose in §3.2; the paper contains no standalone architecture diagram.

The diagrams, layout and paraphrased bilingual teaching text were prepared for this literature review. Original paper titles remain in English for precise identification.

## Other primary sources

The website’s 12-entry library and README link all original sources. Essential boundaries: Onsets and Frames and MAESTRO are piano-only; Slakh is a dataset; Jointist is cited as a 2023 preprint; MT3 is ICLR 2022; YourMT3+ is MLSP 2024. The 2025 AMT Challenge report (2026) uses short synthesized test pieces, while Harmonica is instrument-agnostic and TUTTI targets notation. These are not interchangeable tasks or scores.
