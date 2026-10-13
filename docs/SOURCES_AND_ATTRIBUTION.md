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

## Figure 1 attribution

`site/assets/muscriptor-figure1.png` reproduces Figure 1 **unchanged** from:

Simon Rouard, Michael Krause, Axel Roebel, Carl-Johann Simon-Gabriel, Alexandre Défossez. *MuScriptor: An Open Model for Multi-Instrument Music Transcription*, ISMIR 2026 / arXiv:2607.08168v2.

- [Original image](https://arxiv.org/html/2607.08168v2/pianoroll_okabe_ito_textured.png)
- [Original paper](https://arxiv.org/html/2607.08168v2)
- [License: Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)

This is an actual qualitative guitar-note example from the paper, not aggregate evidence. Blue marks correct predictions, green missed notes, orange false predictions. The paper caption describes the false color as red; the image itself is orange. No commercial audio is mirrored.

## Original teaching assets

- `site/assets/diagrams/task-{zh,en}.svg`: mixture to instrument-labelled notes; separation is not implied as mandatory.
- `site/assets/diagrams/ambiguity-{zh,en}.svg`: conceptual harmonic overlap, not measured spectral amplitudes.
- `site/assets/diagrams/methods-{zh,en}.svg`: conceptual method families, not a performance ranking.
- Hero waveform and piano roll: original schematic.
- Web Audio example: original short synthetic notes using browser oscillators. Piano/bass/flute timbres are approximations. This is not model inference or a model-output comparison.
- Stage bar chart: original redraw of MuScriptor Table 1, with protocol displayed beside it.

The diagrams, layout and paraphrased bilingual teaching text were prepared for this paper-sharing activity. Original paper titles remain in English for precise identification.

## Other primary sources

The website’s 12-entry library and README link all original sources. Essential boundaries: Onsets and Frames and MAESTRO are piano-only; Slakh is a dataset; Jointist is cited as a 2023 preprint; MT3 is ICLR 2022; YourMT3+ is MLSP 2024. The 2025 AMT Challenge report (2026) uses short synthesized test pieces, while Harmonica is instrument-agnostic and TUTTI targets notation. These are not interchangeable tasks or scores.
