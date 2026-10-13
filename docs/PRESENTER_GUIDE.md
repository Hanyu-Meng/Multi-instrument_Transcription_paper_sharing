# 阅读补充说明 / Reading notes

Generated from `site/assets/content.js`. Run `node scripts/export-guide.mjs` after editing.

多乐器音乐转录：方法、文献与研究挑战。

Multi-instrument music transcription: methods, literature and research challenges.

## 中文版

### 01. 多乐器音乐转录

多乐器自动音乐转录的任务定义、建模方法与代表性文献。围绕音符表示、数据与评测梳理研究挑战，并重点分析 MuScriptor 的架构、训练策略和实验结果。

多乐器音乐转录需要从混合音频恢复带有乐器标签的音符事件。本文从任务定义、代表性方法、数据与评测切入，重点分析 MuScriptor，并区分论文证据、概念示意与尚未解决的问题。

### 02. 任务定义：从音频恢复音符事件

核心问题只有四个：谁、弹了什么音、何时开始、何时结束。多乐器意味着还要把音符分配给正确的乐器类别。

钢琴卷帘图中，横向位置表示起音，长度表示时值，纵向位置表示音高，颜色表示乐器。力度、踏板与弯音也是潜在目标，但并非所有模型都预测。两个同类乐器的演奏者不一定被分成两条轨。

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 03. 混合音频与声部感知

勾选声部，播放一个 4 秒的合成小例子。先听全部，再只听一个声部：人也会借助音色、音域和旋律连续性来“分组”。

混合声部与单独声部的对照说明了音色、音域和旋律连续性如何影响听觉分组。这里的振荡器音色仅作近似；真实音乐还包含混响、失真与复杂演奏，因此这个例子不代表真实转录的完整难度。

### 04. 谐波重叠与乐器归属的歧义

频率高，不代表一定有一个更高的音符。它可能只是低音的泛音。两种乐器同时演奏，还会让这些线索互相遮挡。

C3 与 C4 相差八度：C3 的第二谐波与 C4 的基频重合。图中峰高为示意，不能据此推断真实乐器。若两个演奏者同时发出相同音高，仅用音高集合无法区分两个音符实例；这一问题也涉及模型的事件表示能力。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 05. 三类建模方法：分解、检测与事件解码

这些是帮助理解的路线，不是一张从“落后”到“先进”的排名表。现代系统经常组合其中的思想。

NMF 用频谱模板及其激活解释混合信号；逐帧模型估计各时刻的音符活动；序列模型预测由时间、音高、乐器等符号构成的事件序列。输出表示决定模型能表达什么，网络结构与训练目标决定如何估计这些表示。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 06. 基础工作：分解、起音建模与配对数据

三类基础贡献：可解释的分解、起音与延音分开建模，以及可扩展的配对数据。

NMF 提供可解释的分解框架；Onsets and Frames 将起音与持续状态分开建模，但范围是钢琴；Slakh 提供可扩展的多乐器配对数据。这三项工作的贡献类型与任务范围不同，不构成同一基准上的连续模型排名。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [Slakh · 2019](https://arxiv.org/abs/1909.08494)

### 07. MT3：统一事件表示与多任务转录

同一个 Transformer，用共享事件词表处理不同数据集与乐器。混合音频直接映射为多轨事件序列。

自回归解码使用此前生成的事件作为后续预测的条件。MT3 的输出是音乐事件符号，并非自然语言。共享词表有利于联合训练，但音频表征、标签覆盖和跨片段衔接仍会影响整体表现。

[MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 08. 联合任务建模与跨数据集监督

除了加大模型，还可以让相关任务互相帮助，或让训练更接近“真实音乐里许多声音同时出现”。

Jointist 的信息流包括乐器识别条件、音符转录与由 piano roll 引导的分离，混音也进入相关模块。YourMT3+ 中，若录音含人声而标签只覆盖钢琴，则未标注人声不应被当作负例。PerceiverTF 是其编码器设计的重要基础。

[Jointist · 2023](https://arxiv.org/abs/2302.00286) · [Perceiver TF · 2023](https://arxiv.org/abs/2306.10785) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 09. 评测指标：音高、起止时间与乐器归属

F1 综合精确率与召回率。帧级、起音、起止时间、乐器归属检查的是不同问题，不能把它们混在同一排行榜里。

音高与时间正确但乐器错误的预测，可以在不区分乐器的指标中匹配，却不能在 Multi F1 中匹配。F1 是精确率与召回率的调和平均，并非简单的正确音符占比。交互动画为构造示例，不是模型实验结果。

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 10. 数据瓶颈：合成监督与真实录音

要训练转录，音频与每个音符必须对齐。真正昂贵的是同时拥有真实的声音、完整的标签与可靠的时间。

数据规模与声学真实性是不同维度。MuScriptor 利用合成数据建立基础，再通过真实录音缩小分布差异。MAESTRO 说明精确音频—MIDI 对齐的价值，但其钢琴范围不能替代多乐器混音评测。

[Slakh · 2019](https://arxiv.org/abs/1909.08494) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [MAESTRO · dataset paper](https://arxiv.org/abs/1810.12247)

### 11. MuScriptor：面向真实音乐的多乐器转录

Rouard、Krause 等 · Kyutai × Mirelo × IRCAM。核心是仅解码器 Transformer，以及“合成预训练 → 真实微调 → 强化学习后训练”的完整路线。

MuScriptor 的核心是仅解码器架构与分阶段数据、训练策略的结合。理解其贡献需要同时考察输入输出表示、训练语料、乐器条件、实验协议与表示边界，不能仅依据某个网络模块或单一分数判断。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 12. 模型架构：音频前缀与自回归事件解码

把一段音乐的频谱投影为向量，与可选的乐器条件一起送入仅解码器 Transformer，然后逐个预测音乐事件。

MT3 使用编码器—解码器结构；MuScriptor 将投影后的音频作为仅解码器模型的前缀。该流程不要求先进行音源分离，也不是自然语言生成。5 秒约对应 500 帧，实际张量长度可能受填充影响。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Tokenizer · pinned source](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)

### 13. 三阶段训练：合成预训练、真实微调与后训练

模型先拥有大量精确标签，再接触真实混音，最后用少量人工核验数据优化预测质量。规模与标注质量在不同阶段发挥作用。

合成数据提供大规模精确标签，真实数据缩小域差异，人工核验数据用于后训练。组相对奖励比较同一片段的 8 个候选与参考标注。主表支持后训练带来的收益，但不能单独区分优化算法与高质量数据子集的贡献。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 14. 乐器条件与跨片段一致性

乐器条件可以让跨片段的身份更稳定，也能只请求一部分声部。但评测时给出真实乐器列表，与完全盲转录不是同一种设定。

已知乐器集合会缩小推断空间。论文默认结果使用参考标注中的乐器集合，因此与盲转录设定不同。CFG=1 表示不进行引导放大；最终 RL 模型无需 CFG=2 的额外前向计算即可获得主表最佳 Multi F1。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 15. 实验结果：训练阶段与跨数据集表现

下面只比较同一张论文表中的训练阶段。它支持这条训练路线的价值，但没有把数据、规模与架构的贡献完全拆开。

主表中，真实微调对应最大的阶段增益，RL 后训练进一步提高 Multi F1。图4还显示：在1%真实数据下，合成预训练使 Offset F1 从9.9提高到33.4；全量时从41.0提高到42.3（CFG=2，无RL）。合成预训练在真实标签稀缺时尤其重要。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 16. 局限：表示能力、评测设定与可复现性

把模型变得更有用，不等于问题已经解决。评测协议、表示能力和可复现性，仍然影响我们如何解读结果。

同乐器、同音高的重叠音符暴露了事件表示的上限，并影响评测结果。论文的1.3B与当前软件 large 的1.4B命名需要区分；软件提供乐谱导出，也不等于论文中的模型直接预测乐谱结构。官方音频案例可用于补充定量结果。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Official repository · license / exports](https://github.com/muscriptor/muscriptor)

### 17. 当前研究方向

最新方向没有收敛到一个“万能模型”。预训练表征、推理效率和直接记谱，分别回答不同问题。

这些文献构成截至2026-10-13的选择性研究概览，而非穷尽式综述。预训练表征、不区分乐器的高效转录和直接记谱具有不同目标与评测协议，不应合并成单一排行榜。

[AMT Challenge · 2026](https://arxiv.org/abs/2603.27528) · [Harmonica · 2026](https://arxiv.org/abs/2609.04640) · [TUTTI · 2026](https://arxiv.org/abs/2609.00640)

### 18. 开放研究问题

多乐器转录的核心，是让音高、时间与乐器身份同时可信。MuScriptor展示了数据与后训练的力量，也让评测和表示边界更值得讨论。

后续研究需要同时关注数据覆盖与标注质量、面向下游使用的评测，以及同类乐器多声部的表示。对 MuScriptor 的进一步分析可以围绕等量高质量数据的监督微调对照、无参考乐器条件评测和冲突音符保留设定展开。

## English

### 01. Multi-instrument Music Transcription

A review of task definitions, modeling approaches and representative literature in multi-instrument automatic music transcription. Note representations, data and evaluation frame the research challenges, with a detailed analysis of MuScriptor’s architecture, training strategy and empirical results.

Multi-instrument music transcription recovers instrument-labelled note events from mixed audio. This review examines the task, representative methods, data and evaluation, then analyzes MuScriptor while distinguishing empirical evidence, conceptual illustrations and open questions.

### 02. Task definition: from audio to note events

Four questions: which instrument, which pitch, when did it start, and when did it end? Multi-instrument transcription also assigns each note to an instrument class.

In a piano roll, horizontal position denotes onset, length denotes duration, height denotes pitch and color denotes instrument. Velocity, pedal and bends are possible targets but are not predicted by every model. Two players of the same instrument are not necessarily assigned separate tracks.

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 03. Auditory perception of mixed parts

Select parts and play a four-second synthetic example. Listen to the mixture, then one part: we use timbre, register and melodic continuity to group notes.

Comparing mixed and isolated parts illustrates how timbre, register and melodic continuity influence auditory grouping. Oscillator timbres are approximate. Real music also contains reverberation, distortion and complex playing techniques, so the example does not capture the full transcription problem.

### 04. Harmonic overlap and instrument ambiguity

A high-frequency peak need not mean a higher note: it may be an overtone of a lower note. Simultaneous instruments overlap and obscure these cues.

C3 and C4 are an octave apart: the second harmonic of C3 overlaps the fundamental of C4. Peak heights are schematic and do not identify real instruments. When two performers play the same pitch simultaneously, a pitch set cannot distinguish two note instances, exposing a representation issue as well as an acoustic one.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 05. Three approaches: factorization, detection and event decoding

These are conceptual routes, not a ranking from obsolete to superior. Modern systems often combine ideas from several of them.

NMF explains a mixture through spectral templates and their activations; frame models estimate note activity over time; sequence models predict events encoding time, pitch and instrument. Output representations determine what a model can express, while architecture and training objectives determine how those representations are estimated.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 06. Foundations: factorization, onset modeling and paired data

Three foundational contributions: interpretable factorization, separate attack and sustain modeling, and scalable paired data.

NMF provides an interpretable factorization framework. Onsets and Frames separates onset and sustained activity modeling within piano transcription. Slakh supplies scalable paired multi-instrument data. These contributions differ in type and scope and are not successive entries in one benchmark ranking.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [Slakh · 2019](https://arxiv.org/abs/1909.08494)

### 07. MT3: shared event representations for multitask transcription

One Transformer uses a shared event vocabulary across datasets and instruments, mapping a mixture directly to a multitrack event sequence.

Autoregressive decoding conditions each prediction on preceding events. MT3 outputs symbolic musical events rather than natural language. A shared vocabulary supports joint training, while audio representations, label coverage and chunk continuity still affect overall performance.

[MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 08. Joint task modeling and cross-dataset supervision

Progress can come from connecting related tasks or making training better reflect the many simultaneous sounds in real music.

Jointist connects instrument recognition, conditioned transcription and piano-roll-guided separation, with mixture audio also feeding relevant modules. In YourMT3+, vocals audible in a piano-labelled recording should not be treated as negative examples solely because they are unannotated. PerceiverTF is a foundation for its encoder design.

[Jointist · 2023](https://arxiv.org/abs/2302.00286) · [Perceiver TF · 2023](https://arxiv.org/abs/2306.10785) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 09. Evaluation: pitch, note boundaries and instrument attribution

F1 balances precision and recall. Frame activity, onsets, offsets and instrument attribution test different things; their scores are not interchangeable.

A prediction with correct pitch and timing but the wrong instrument may match an instrument-agnostic metric while failing Multi F1. F1 is the harmonic mean of precision and recall, not simply the fraction of correct notes. The interactive animation is a constructed example, not a model result.

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 10. The data bottleneck: synthetic supervision and real recordings

Training needs audio aligned to individual notes. The expensive combination is realistic sound, complete labels and reliable timing.

Scale and acoustic realism are distinct dimensions. MuScriptor uses synthetic data as a foundation and real recordings to address distribution differences. MAESTRO illustrates the value of precise audio–MIDI alignment, but its piano scope does not replace evaluation on multi-instrument mixtures.

[Slakh · 2019](https://arxiv.org/abs/1909.08494) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [MAESTRO · dataset paper](https://arxiv.org/abs/1810.12247)

### 11. MuScriptor: multi-instrument transcription of real music

Rouard, Krause et al. · Kyutai × Mirelo × IRCAM. A decoder-only Transformer paired with synthetic pretraining, real-audio fine-tuning and reinforcement post-training.

MuScriptor combines a decoder-only architecture with staged data and training strategies. Its contribution is assessed through input and output representations, training corpora, instrument conditions, experimental protocols and representational limits, rather than a single module or score.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 12. Architecture: audio prefixes and autoregressive event decoding

Project a music spectrogram into vectors, combine it with optional instrument conditions, and let a decoder-only Transformer predict musical events.

MT3 uses an encoder–decoder, whereas MuScriptor supplies projected audio as a prefix to a decoder-only model. The pipeline does not require source separation and does not generate natural language. Five seconds corresponds to roughly 500 frames; padding can affect the exact tensor length.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Tokenizer · pinned source](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)

### 13. Three-stage training: synthetic pretraining, real adaptation and refinement

Start with many precise labels, adapt to real mixtures, then refine predictions with a small, manually checked set. Scale and label quality play different roles.

Synthetic data supplies large-scale precise labels, real data addresses the domain gap, and checked data supports post-training. Group-relative rewards compare eight candidates for the same clip against reference annotations. The main table supports a post-training gain but does not isolate the optimization algorithm from the contribution of the high-quality subset.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 14. Instrument conditioning and cross-chunk consistency

Instrument conditions help stabilize identities across chunks and request selected parts. Providing the reference instrument list during evaluation differs from fully blind transcription.

A known instrument set narrows the inference space. Default paper results use reference-derived instrument sets and therefore differ from blind transcription. CFG=1 means no guidance amplification; the final RL model obtains its best reported Multi F1 without the additional forward computation required by CFG=2.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 15. Results: training stages and cross-dataset performance

Compare training stages within the same paper table. The evidence supports the training recipe, but does not fully isolate data, scale and architecture.

Real fine-tuning produces the largest stage gain in the main table, and RL post-training further improves Multi F1. Figure 4 shows synthetic pretraining raising Offset F1 from 9.9 to 33.4 at 1% real data and from 41.0 to 42.3 at full scale (CFG=2, no RL). Synthetic pretraining is especially valuable when real labels are scarce.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 16. Limitations: representation, evaluation and reproducibility

A more useful model does not mean the task is solved. Evaluation choices, representational limits and reproducibility still shape the interpretation.

Overlapping notes with the same instrument and pitch expose limits of the event representation and affect evaluation. The paper’s 1.3B label differs from the current software’s 1.4B large label. Software score export does not imply that the paper’s model directly predicts notation structure. Official audio examples complement the quantitative results.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Official repository · license / exports](https://github.com/muscriptor/muscriptor)

### 17. Current research directions

Recent work does not converge on a single universal model. Pretrained representations, efficient inference and direct notation address different questions.

These papers form a selective research snapshot as of 2026-10-13, rather than an exhaustive survey. Pretrained representations, efficient instrument-agnostic transcription and direct notation have different objectives and evaluation protocols and should not be merged into a single ranking.

[AMT Challenge · 2026](https://arxiv.org/abs/2603.27528) · [Harmonica · 2026](https://arxiv.org/abs/2609.04640) · [TUTTI · 2026](https://arxiv.org/abs/2609.00640)

### 18. Open research questions

Multi-instrument transcription must get pitch, time and instrument identity right together. MuScriptor highlights the power of data and post-training—and the importance of evaluation and representation.

Further research must consider data coverage and label quality, evaluation for downstream use, and representations for multiple parts of the same instrument. Further analysis of MuScriptor could examine supervised fine-tuning with the same checked data, evaluation without reference instrument conditions, and protocols retaining conflicting notes.

