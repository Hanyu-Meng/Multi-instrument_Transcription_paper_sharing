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

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 03. 混合音频与声部感知

勾选声部，播放一个 4 秒的合成小例子。先听全部，再只听一个声部：人也会借助音色、音域和旋律连续性来“分组”。

混合声部与单独声部的对照说明了音色、音域和旋律连续性如何影响听觉分组。这里的振荡器音色仅作近似；真实音乐还包含混响、失真与复杂演奏，因此这个例子不代表真实转录的完整难度。

### 04. 谐波重叠与乐器归属的歧义

频率高，不代表一定有一个更高的音符。它可能只是低音的泛音。两种乐器同时演奏，还会让这些线索互相遮挡。

C3 与 C4 相差八度：C3 的第二谐波与 C4 的基频重合。图中峰高为示意，不能据此推断真实乐器。若两个演奏者同时发出相同音高，仅用音高集合无法区分两个音符实例；这一问题也涉及模型的事件表示能力。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 05. 三类建模方法：分解、检测与事件解码

这些是帮助理解的路线，不是一张从“落后”到“先进”的排名表。现代系统经常组合其中的思想。

NMF 用频谱模板及其激活解释混合信号；逐帧模型估计各时刻的音符活动；序列模型预测由时间、音高、乐器等符号构成的事件序列。输出表示决定模型能表达什么，网络结构与训练目标决定如何估计这些表示。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2) · [MT3 · 2022](https://arxiv.org/abs/2111.03017v4)

### 06. 基础工作：分解、起音建模与配对数据

三类基础贡献：可解释的分解、起音与延音分开建模，以及可扩展的配对数据。

NMF 提供可解释的分解框架；Onsets and Frames 将起音与持续状态分开建模，但范围是钢琴；Slakh 提供可扩展的多乐器配对数据。这三项工作的贡献类型与任务范围不同，不构成同一基准上的连续模型排名。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2) · [Slakh · 2019](https://arxiv.org/abs/1909.08494)

### 07. Onsets and Frames：起音如何帮助帧预测

这项钢琴转录工作把“音符刚开始”与“音符仍在持续”分开建模，再让两种预测相互配合。图中横向连接体现了核心设计。

按底部→右侧→横向连接的顺序阅读原图。起音在这里有两个作用：作为帧网络的条件，以及推断时新音符的门控。不能把后来扩展版本的 offset 分支误读为这篇论文图1的一部分。

[arXiv 原文](https://arxiv.org/abs/1710.11153v2) · [原文 §3](https://arxiv.org/html/1710.11153v2#S3) · [PDF 第 3 页](https://arxiv.org/pdf/1710.11153v2#page=3)

[Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2)

### 08. MT3：一个模型连接多个数据集与乐器

MT3 将不同数据集的音频与标注转换为统一的输入输出格式，用同一个编码器—解码器 Transformer 学习多轨转录。

多任务训练共享模型参数和事件词表，不等于所有数据集都有相同乐器或相同标签完整性。MT3 内部采用编码器—解码器结构；这一点可直接打开 §3.1 对照。

[arXiv 原文](https://arxiv.org/abs/2111.03017v4) · [原文 §3.1](https://arxiv.org/html/2111.03017v4#S3.SS1) · [PDF 第 3 页](https://arxiv.org/pdf/2111.03017v4#page=3)

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4)

### 09. MT3：音符如何变成可预测的事件序列

事件词表将时间、乐器与音高写成序列，使多乐器转录成为条件序列生成任务。训练时编码标注，推断时反向还原音符。

图2展示符号表示的双向转换，不是模型把钢琴卷帘作为输入。讲解时可沿右侧示例依次读 time、program、on/off 和 note，注意只有状态变化才需要再次写入相应 token。

[arXiv 原文](https://arxiv.org/abs/2111.03017v4) · [原文 §3.2](https://arxiv.org/html/2111.03017v4#S3.SS2) · [PDF 第 4 页](https://arxiv.org/pdf/2111.03017v4#page=4)

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4)

### 10. Jointist：让转录与音源分离相互促进

系统连接乐器识别、条件转录与音源分离。乐器信息告诉模型关注哪个声部，预测的 piano roll 为分离提供音高与时间线索。

按橙、蓝、绿模块解释信息流。转录与分离共享有用的监督信号，但不是先分离音频再逐轨转录，也不是识别、转录、分离三个模块全部联合训练。乐器识别错误可能影响后续结果。

[arXiv 原文](https://arxiv.org/abs/2302.00286v2) · [原文 §3](https://arxiv.org/html/2302.00286v2#S3) · [PDF 第 4 页](https://arxiv.org/pdf/2302.00286v2#page=4)

[Jointist · 2023](https://arxiv.org/abs/2302.00286v2)

### 11. YourMT3+：时频编码、多通道解码与数据增强

图1把三项改进放在一起：更有结构的音频编码、按乐器组并行的事件解码，以及跨数据集混合分轨的训练方法。

图中展示最终的 YPTF.MoE+Multi 变体。图注对频谱使用概括性称呼，具体输入以 §3.1 的 log-magnitude 说明为准。编码器、解码器与训练增强是不同层面的改变，消融实验比单看总分更能说明贡献。

[arXiv 原文](https://arxiv.org/abs/2407.04822v3) · [原文 §3](https://arxiv.org/html/2407.04822v3#S3) · [PDF 第 2 页](https://arxiv.org/pdf/2407.04822v3#page=2)

[Perceiver TF · 2023](https://arxiv.org/abs/2306.10785) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 12. 评测指标：音高、起止时间与乐器归属

F1 综合精确率与召回率。帧级、起音、起止时间、乐器归属检查的是不同问题，不能把它们混在同一排行榜里。

音高与时间正确但乐器错误的预测，可以在不区分乐器的指标中匹配，却不能在 Multi F1 中匹配。F1 是精确率与召回率的调和平均，并非简单的正确音符占比。交互动画为构造示例，不是模型实验结果。

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 13. 数据瓶颈：合成监督与真实录音

要训练转录，音频与每个音符必须对齐。真正昂贵的是同时拥有真实的声音、完整的标签与可靠的时间。

数据规模与声学真实性是不同维度。MuScriptor 利用合成数据建立基础，再通过真实录音缩小分布差异。MAESTRO 说明精确音频—MIDI 对齐的价值，但其钢琴范围不能替代多乐器混音评测。

[Slakh · 2019](https://arxiv.org/abs/1909.08494) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [MAESTRO · dataset paper](https://arxiv.org/abs/1810.12247)

### 14. Harmonica：跨乐器泛化的逐帧转录

Longshen Ou、Héctor Martel、Joe Hennessy-Priest、Taemin Cho · BandLab。一个模型转录不同有音高乐器的独奏或独立分轨，可处理复音；输出音高与起止时间，不预测乐器归属。

版本为2026-09-04 arXiv v1，标注投稿ICASSP 2027，未据此声称已接收。§3.1定义输入为身份未知的单乐器音频；URMP和Slakh的实验使用独立分轨、排除混音和Slakh鼓轨。单乐器可复音，不能把这个设定误读成单音高追踪。图中Pitch Head输出持续活动；Offset Head没有连接到Decode。

[arXiv 原文](https://arxiv.org/abs/2609.04640v1) · [原文 §3.3](https://arxiv.org/html/2609.04640v1#S3.SS3) · [PDF 第 3 页](https://arxiv.org/pdf/2609.04640v1#page=3)

[Harmonica · 2026](https://arxiv.org/abs/2609.04640v1)

### 15. 谐波卷积：这个频率是基频，还是别的音的泛音？

对候选频率 f，同时查看整数倍与分频位置的证据。核心操作是沿频率轴平移特征、按通道拼接，再用1×1卷积学习聚合；这一过程在多个网络深度重复。

“多深度”指在不同特征层反复做谐波聚合，不是把多个音频分辨率简单拼在一起。聚合后经过归一化、残差连接与ReLU，再进入ResNet。表2中多层相对单层的OnPOff提升为0.014，即1.4个F1点；28.5%是谐波层参数降幅，不是整个模型。分频证据可能提示当前峰属于更低音，但复音下仍有歧义，模型必须联合解释。

[arXiv 原文](https://arxiv.org/abs/2609.04640v1) · [原文 §3.4](https://arxiv.org/html/2609.04640v1#S3.SS4) · [PDF 第 3 页](https://arxiv.org/pdf/2609.04640v1#page=3)

[Harmonica · 2026](https://arxiv.org/abs/2609.04640v1)

### 16. Harmonica：准确率、规模与评测边界

模型从26.3K参数的nano扩展到15.1M的x-large。阅读结果时，要区分开发集曲线、各测试集分数，以及指定硬件上的推断速度。

这篇工作的意义在于显式谐波先验和准确率—计算成本关系。若要把它用于多乐器混音，需要额外处理音符归属并在混音上验证；不能从分轨结果直接外推。论文中的速度是xRT=音频时长/处理时长，更高更快，并不代表流式延迟。主表MuScriptor约306M、附录306.5M，与本网站后续论文的1.3B命名分开。

[arXiv 原文](https://arxiv.org/abs/2609.04640v1) · [原文 §4.2](https://arxiv.org/html/2609.04640v1#S4.SS2) · [PDF 第 4 页](https://arxiv.org/pdf/2609.04640v1#page=4)

[Harmonica · 2026](https://arxiv.org/abs/2609.04640v1) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 17. MuScriptor：面向真实音乐的多乐器转录

Rouard、Krause 等 · Kyutai × Mirelo × IRCAM。核心是仅解码器 Transformer，以及“合成预训练 → 真实微调 → 强化学习后训练”的完整路线。

MuScriptor 的核心是仅解码器架构与分阶段数据、训练策略的结合。理解其贡献需要同时考察输入输出表示、训练语料、乐器条件、实验协议与表示边界，不能仅依据某个网络模块或单一分数判断。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §1](https://arxiv.org/html/2607.08168v2#S1) · [PDF 第 1 页](https://arxiv.org/pdf/2607.08168v2#page=1)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 18. 模型架构：音频前缀与自回归事件解码

把一段音乐的频谱投影为向量，与可选的乐器条件一起送入仅解码器 Transformer，然后逐个预测音乐事件。

MT3 使用编码器—解码器结构；MuScriptor 将投影后的音频作为仅解码器模型的前缀。该流程不要求先进行音源分离，也不是自然语言生成。5 秒约对应 500 帧，实际张量长度可能受填充影响。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §3.2](https://arxiv.org/html/2607.08168v2#S3.SS2) · [PDF 第 4 页](https://arxiv.org/pdf/2607.08168v2#page=4)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Tokenizer · pinned source](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)

### 19. 三阶段训练：合成预训练、真实微调与后训练

模型先拥有大量精确标签，再接触真实混音，最后用少量人工核验数据优化预测质量。规模与标注质量在不同阶段发挥作用。

合成数据提供大规模精确标签，真实数据缩小域差异，人工核验数据用于后训练。组相对奖励比较同一片段的 8 个候选与参考标注。主表支持后训练带来的收益，但不能单独区分优化算法与高质量数据子集的贡献。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §3.4](https://arxiv.org/html/2607.08168v2#S3.SS4) · [PDF 第 4 页](https://arxiv.org/pdf/2607.08168v2#page=4)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 20. 原文消融：合成预训练在何时最有帮助

图4控制真实数据的使用比例，对比“有合成预训练”与“无合成预训练”。它直接检验合成数据在真实标签稀缺时的作用。

先讲对照变量：真实数据比例与合成预训练。再选同一指标比较两个数据规模，避免跨面板直接比较数值。图4说明预训练收益随真实数据量变化；它不是RL消融，也不能单独证明架构优于其他方法。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §4.1.1](https://arxiv.org/html/2607.08168v2#S4.SS1.SSS1) · [PDF 第 5 页](https://arxiv.org/pdf/2607.08168v2#page=5)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 21. 乐器条件与跨片段一致性

乐器条件可以让跨片段的身份更稳定，也能只请求一部分声部。但评测时给出真实乐器列表，与完全盲转录不是同一种设定。

已知乐器集合会缩小推断空间。论文默认结果使用参考标注中的乐器集合，因此与盲转录设定不同。CFG=1 表示不进行引导放大；最终 RL 模型无需 CFG=2 的额外前向计算即可获得主表最佳 Multi F1。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §4.1.3](https://arxiv.org/html/2607.08168v2#S4.SS1.SSS3) · [PDF 第 6 页](https://arxiv.org/pdf/2607.08168v2#page=6)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 22. 实验结果：训练阶段与跨数据集表现

下面只比较同一张论文表中的训练阶段。它支持这条训练路线的价值，但没有把数据、规模与架构的贡献完全拆开。

主表中，真实微调对应最大的阶段增益，RL 后训练进一步提高 Multi F1。图4还显示：在1%真实数据下，合成预训练使 Offset F1 从9.9提高到33.4；全量时从41.0提高到42.3（CFG=2，无RL）。合成预训练在真实标签稀缺时尤其重要。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §4](https://arxiv.org/html/2607.08168v2#S4) · [PDF 第 5 页](https://arxiv.org/pdf/2607.08168v2#page=5)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 23. 原文案例：训练阶段如何改变音符错误

图1在同一吉他片段上对照 YourMT3+ 与 MuScriptor 的不同训练阶段。结合漏检和误报的位置，可以把汇总指标还原为具体的音符错误。

这个案例便于观察真实微调和后训练后长音误报、漏音与边界的变化，但属于作者选择的定性示例。不要从单个片段推断所有乐器和数据集的效果。不同模型的分段长度也不同。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §1](https://arxiv.org/html/2607.08168v2#S1) · [PDF 第 2 页](https://arxiv.org/pdf/2607.08168v2#page=2)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 24. 局限：表示能力、评测设定与可复现性

把模型变得更有用，不等于问题已经解决。评测协议、表示能力和可复现性，仍然影响我们如何解读结果。

同乐器、同音高的重叠音符暴露了事件表示的上限，并影响评测结果。论文的1.3B与当前软件 large 的1.4B命名需要区分；软件提供乐谱导出，也不等于论文中的模型直接预测乐谱结构。官方音频案例可用于补充定量结果。

[arXiv 原文](https://arxiv.org/abs/2607.08168v2) · [原文 §4.2.3](https://arxiv.org/html/2607.08168v2#S4.SS2.SSS3) · [PDF 第 6 页](https://arxiv.org/pdf/2607.08168v2#page=6)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Official repository · license / exports](https://github.com/muscriptor/muscriptor)

### 25. 当前研究方向

最新方向没有收敛到一个“万能模型”。预训练表征、推理效率和直接记谱，分别回答不同问题。

这些文献构成截至2026-10-13的选择性研究概览，而非穷尽式综述。预训练表征、不区分乐器的高效转录和直接记谱具有不同目标与评测协议，不应合并成单一排行榜。

[AMT Challenge · 2026](https://arxiv.org/abs/2603.27528) · [Harmonica · 2026](https://arxiv.org/abs/2609.04640v1) · [TUTTI · 2026](https://arxiv.org/abs/2609.00640)

### 26. 开放研究问题

多乐器转录的核心，是让音高、时间与乐器身份同时可信。MuScriptor展示了数据与后训练的力量，也让评测和表示边界更值得讨论。

后续研究需要同时关注数据覆盖与标注质量、面向下游使用的评测，以及同类乐器多声部的表示。对 MuScriptor 的进一步分析可以围绕等量高质量数据的监督微调对照、无参考乐器条件评测和冲突音符保留设定展开。

## English

### 01. Multi-instrument Music Transcription

A review of task definitions, modeling approaches and representative literature in multi-instrument automatic music transcription. Note representations, data and evaluation frame the research challenges, with a detailed analysis of MuScriptor’s architecture, training strategy and empirical results.

Multi-instrument music transcription recovers instrument-labelled note events from mixed audio. This review examines the task, representative methods, data and evaluation, then analyzes MuScriptor while distinguishing empirical evidence, conceptual illustrations and open questions.

### 02. Task definition: from audio to note events

Four questions: which instrument, which pitch, when did it start, and when did it end? Multi-instrument transcription also assigns each note to an instrument class.

In a piano roll, horizontal position denotes onset, length denotes duration, height denotes pitch and color denotes instrument. Velocity, pedal and bends are possible targets but are not predicted by every model. Two players of the same instrument are not necessarily assigned separate tracks.

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 03. Auditory perception of mixed parts

Select parts and play a four-second synthetic example. Listen to the mixture, then one part: we use timbre, register and melodic continuity to group notes.

Comparing mixed and isolated parts illustrates how timbre, register and melodic continuity influence auditory grouping. Oscillator timbres are approximate. Real music also contains reverberation, distortion and complex playing techniques, so the example does not capture the full transcription problem.

### 04. Harmonic overlap and instrument ambiguity

A high-frequency peak need not mean a higher note: it may be an overtone of a lower note. Simultaneous instruments overlap and obscure these cues.

C3 and C4 are an octave apart: the second harmonic of C3 overlaps the fundamental of C4. Peak heights are schematic and do not identify real instruments. When two performers play the same pitch simultaneously, a pitch set cannot distinguish two note instances, exposing a representation issue as well as an acoustic one.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 05. Three approaches: factorization, detection and event decoding

These are conceptual routes, not a ranking from obsolete to superior. Modern systems often combine ideas from several of them.

NMF explains a mixture through spectral templates and their activations; frame models estimate note activity over time; sequence models predict events encoding time, pitch and instrument. Output representations determine what a model can express, while architecture and training objectives determine how those representations are estimated.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2) · [MT3 · 2022](https://arxiv.org/abs/2111.03017v4)

### 06. Foundations: factorization, onset modeling and paired data

Three foundational contributions: interpretable factorization, separate attack and sustain modeling, and scalable paired data.

NMF provides an interpretable factorization framework. Onsets and Frames separates onset and sustained activity modeling within piano transcription. Slakh supplies scalable paired multi-instrument data. These contributions differ in type and scope and are not successive entries in one benchmark ranking.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2) · [Slakh · 2019](https://arxiv.org/abs/1909.08494)

### 07. Onsets and Frames: how onsets inform frame predictions

This piano transcription model separates note attacks from sustained activity, then connects the predictions. The cross-branch connection is central to the design.

Read from the bottom to the right branch, then across the connecting arrow. Onsets both condition the frame network and gate new notes at inference. An offset branch from a later expanded version is not part of this Figure 1.

[Paper on arXiv](https://arxiv.org/abs/1710.11153v2) · [Read §3](https://arxiv.org/html/1710.11153v2#S3) · [PDF · page 3](https://arxiv.org/pdf/1710.11153v2#page=3)

[Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153v2)

### 08. MT3: one model across datasets and instruments

MT3 converts audio and annotations from different datasets into shared input and output formats, training one encoder–decoder Transformer for multitrack transcription.

Multitask training shares parameters and an event vocabulary; datasets need not have identical instruments or label coverage. MT3 uses an encoder–decoder architecture, specified in §3.1.

[Paper on arXiv](https://arxiv.org/abs/2111.03017v4) · [Read §3.1](https://arxiv.org/html/2111.03017v4#S3.SS1) · [PDF · page 3](https://arxiv.org/pdf/2111.03017v4#page=3)

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4)

### 09. MT3: turning notes into a predictable event sequence

An event vocabulary serializes time, instrument and pitch, making transcription a conditional sequence-generation task. Annotations are tokenized for training; predicted tokens are decoded back into notes.

Figure 2 depicts conversion between symbolic representations, not piano-roll input to the neural model. Follow time, program, on/off and note tokens on the right, noting that state tokens need to recur only when their values change.

[Paper on arXiv](https://arxiv.org/abs/2111.03017v4) · [Read §3.2](https://arxiv.org/html/2111.03017v4#S3.SS2) · [PDF · page 4](https://arxiv.org/pdf/2111.03017v4#page=4)

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4)

### 10. Jointist: connecting transcription and source separation

The system connects instrument recognition, conditioned transcription and source separation. Instrument information identifies the target part, while predicted piano rolls supply pitch and timing cues to separation.

Follow the orange, blue and green modules. Transcription and separation share useful supervision; this is not a separation-first pipeline, nor are all three modules jointly trained. Recognition errors may propagate downstream.

[Paper on arXiv](https://arxiv.org/abs/2302.00286v2) · [Read §3](https://arxiv.org/html/2302.00286v2#S3) · [PDF · page 4](https://arxiv.org/pdf/2302.00286v2#page=4)

[Jointist · 2023](https://arxiv.org/abs/2302.00286v2)

### 11. YourMT3+: time–frequency encoding, multichannel decoding and augmentation

Figure 1 brings together structured audio encoding, parallel event decoding by instrument group, and training with stems mixed across datasets.

The figure shows the final YPTF.MoE+Multi variant. For its exact input, use the log-magnitude specification in §3.1 rather than the caption’s generic spectrogram wording. Encoder, decoder and augmentation changes address different parts of the system; ablations are needed to separate their contributions.

[Paper on arXiv](https://arxiv.org/abs/2407.04822v3) · [Read §3](https://arxiv.org/html/2407.04822v3#S3) · [PDF · page 2](https://arxiv.org/pdf/2407.04822v3#page=2)

[Perceiver TF · 2023](https://arxiv.org/abs/2306.10785) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 12. Evaluation: pitch, note boundaries and instrument attribution

F1 balances precision and recall. Frame activity, onsets, offsets and instrument attribution test different things; their scores are not interchangeable.

A prediction with correct pitch and timing but the wrong instrument may match an instrument-agnostic metric while failing Multi F1. F1 is the harmonic mean of precision and recall, not simply the fraction of correct notes. The interactive animation is a constructed example, not a model result.

[MT3 · 2022](https://arxiv.org/abs/2111.03017v4) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 13. The data bottleneck: synthetic supervision and real recordings

Training needs audio aligned to individual notes. The expensive combination is realistic sound, complete labels and reliable timing.

Scale and acoustic realism are distinct dimensions. MuScriptor uses synthetic data as a foundation and real recordings to address distribution differences. MAESTRO illustrates the value of precise audio–MIDI alignment, but its piano scope does not replace evaluation on multi-instrument mixtures.

[Slakh · 2019](https://arxiv.org/abs/1909.08494) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [MAESTRO · dataset paper](https://arxiv.org/abs/1810.12247)

### 14. Harmonica: frame-level transcription across instruments

Longshen Ou, Héctor Martel, Joe Hennessy-Priest and Taemin Cho · BandLab. One model transcribes solos or isolated stems across pitched instruments, including polyphony. Outputs contain pitch and timing, without instrument labels.

Reviewed version: arXiv v1, 2026-09-04, marked submitted to ICASSP 2027, not confirmed accepted. §3.1 defines an unknown single instrument; URMP and Slakh experiments use stems, excluding mixtures and Slakh drums. A single instrument can be polyphonic. The diagram’s Pitch Head predicts sustained activity; the Offset Head does not feed Decode.

[Paper on arXiv](https://arxiv.org/abs/2609.04640v1) · [Read §3.3](https://arxiv.org/html/2609.04640v1#S3.SS3) · [PDF · page 3](https://arxiv.org/pdf/2609.04640v1#page=3)

[Harmonica · 2026](https://arxiv.org/abs/2609.04640v1)

### 15. Harmonic convolution: fundamental or someone else’s overtone?

For a candidate frequency f, inspect multiples and submultiples. Shift frequency features, concatenate channels, and learn their aggregation with a 1×1 convolution. Repeat this operation at several network depths.

Multi-depth means harmonic aggregation at successive feature layers, not simply concatenating audio resolutions. Aggregation is followed by normalization, a residual connection and ReLU before ResNet. Multi-depth improves OnPOff by 0.014, or 1.4 F1 points, over single-depth. The 28.5% reduction concerns harmonic layers, not the entire model. Subharmonic evidence can suggest a lower fundamental, but polyphony still makes the interpretation ambiguous.

[Paper on arXiv](https://arxiv.org/abs/2609.04640v1) · [Read §3.4](https://arxiv.org/html/2609.04640v1#S3.SS4) · [PDF · page 3](https://arxiv.org/pdf/2609.04640v1#page=3)

[Harmonica · 2026](https://arxiv.org/abs/2609.04640v1)

### 16. Harmonica: accuracy, scale and evaluation scope

The family ranges from the 26.3K-parameter nano to the 15.1M x-large. Distinguish development-set curves, individual test-set scores and inference speed on specified hardware.

The contribution concerns explicit harmonic priors and the accuracy–compute trade-off. Using it for multi-instrument mixtures would require attribution and mixture evaluation. xRT is audio duration divided by processing time; it does not establish streaming latency. The MuScriptor baseline is ~306M in the main table and 306.5M in the appendix, distinct from the subsequent paper’s 1.3B label.

[Paper on arXiv](https://arxiv.org/abs/2609.04640v1) · [Read §4.2](https://arxiv.org/html/2609.04640v1#S4.SS2) · [PDF · page 4](https://arxiv.org/pdf/2609.04640v1#page=4)

[Harmonica · 2026](https://arxiv.org/abs/2609.04640v1) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 17. MuScriptor: multi-instrument transcription of real music

Rouard, Krause et al. · Kyutai × Mirelo × IRCAM. A decoder-only Transformer paired with synthetic pretraining, real-audio fine-tuning and reinforcement post-training.

MuScriptor combines a decoder-only architecture with staged data and training strategies. Its contribution is assessed through input and output representations, training corpora, instrument conditions, experimental protocols and representational limits, rather than a single module or score.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §1](https://arxiv.org/html/2607.08168v2#S1) · [PDF · page 1](https://arxiv.org/pdf/2607.08168v2#page=1)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 18. Architecture: audio prefixes and autoregressive event decoding

Project a music spectrogram into vectors, combine it with optional instrument conditions, and let a decoder-only Transformer predict musical events.

MT3 uses an encoder–decoder, whereas MuScriptor supplies projected audio as a prefix to a decoder-only model. The pipeline does not require source separation and does not generate natural language. Five seconds corresponds to roughly 500 frames; padding can affect the exact tensor length.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §3.2](https://arxiv.org/html/2607.08168v2#S3.SS2) · [PDF · page 4](https://arxiv.org/pdf/2607.08168v2#page=4)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Tokenizer · pinned source](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)

### 19. Three-stage training: synthetic pretraining, real adaptation and refinement

Start with many precise labels, adapt to real mixtures, then refine predictions with a small, manually checked set. Scale and label quality play different roles.

Synthetic data supplies large-scale precise labels, real data addresses the domain gap, and checked data supports post-training. Group-relative rewards compare eight candidates for the same clip against reference annotations. The main table supports a post-training gain but does not isolate the optimization algorithm from the contribution of the high-quality subset.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §3.4](https://arxiv.org/html/2607.08168v2#S3.SS4) · [PDF · page 4](https://arxiv.org/pdf/2607.08168v2#page=4)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 20. Original ablation: when does synthetic pretraining help most?

Figure 4 varies the fraction of real training data and compares models with and without synthetic pretraining. It directly examines the role of synthetic data when real labels are scarce.

Identify the two variables: real-data fraction and synthetic pretraining. Compare the same metric at two scales rather than comparing values across panels. Figure 4 shows that pretraining gains depend on real-data availability; it is neither an RL ablation nor an isolated architecture comparison.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §4.1.1](https://arxiv.org/html/2607.08168v2#S4.SS1.SSS1) · [PDF · page 5](https://arxiv.org/pdf/2607.08168v2#page=5)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 21. Instrument conditioning and cross-chunk consistency

Instrument conditions help stabilize identities across chunks and request selected parts. Providing the reference instrument list during evaluation differs from fully blind transcription.

A known instrument set narrows the inference space. Default paper results use reference-derived instrument sets and therefore differ from blind transcription. CFG=1 means no guidance amplification; the final RL model obtains its best reported Multi F1 without the additional forward computation required by CFG=2.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §4.1.3](https://arxiv.org/html/2607.08168v2#S4.SS1.SSS3) · [PDF · page 6](https://arxiv.org/pdf/2607.08168v2#page=6)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 22. Results: training stages and cross-dataset performance

Compare training stages within the same paper table. The evidence supports the training recipe, but does not fully isolate data, scale and architecture.

Real fine-tuning produces the largest stage gain in the main table, and RL post-training further improves Multi F1. Figure 4 shows synthetic pretraining raising Offset F1 from 9.9 to 33.4 at 1% real data and from 41.0 to 42.3 at full scale (CFG=2, no RL). Synthetic pretraining is especially valuable when real labels are scarce.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §4](https://arxiv.org/html/2607.08168v2#S4) · [PDF · page 5](https://arxiv.org/pdf/2607.08168v2#page=5)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 23. Original example: how training stages change note errors

Figure 1 compares YourMT3+ with successive MuScriptor training stages on one guitar excerpt. The locations of missed and false notes connect aggregate metrics to concrete transcription errors.

This author-selected qualitative example helps examine false sustained notes, missed notes and boundaries after adaptation and refinement. It does not establish performance for every instrument or dataset. Segment lengths also differ between models.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §1](https://arxiv.org/html/2607.08168v2#S1) · [PDF · page 2](https://arxiv.org/pdf/2607.08168v2#page=2)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 24. Limitations: representation, evaluation and reproducibility

A more useful model does not mean the task is solved. Evaluation choices, representational limits and reproducibility still shape the interpretation.

Overlapping notes with the same instrument and pitch expose limits of the event representation and affect evaluation. The paper’s 1.3B label differs from the current software’s 1.4B large label. Software score export does not imply that the paper’s model directly predicts notation structure. Official audio examples complement the quantitative results.

[Paper on arXiv](https://arxiv.org/abs/2607.08168v2) · [Read §4.2.3](https://arxiv.org/html/2607.08168v2#S4.SS2.SSS3) · [PDF · page 6](https://arxiv.org/pdf/2607.08168v2#page=6)

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Official repository · license / exports](https://github.com/muscriptor/muscriptor)

### 25. Current research directions

Recent work does not converge on a single universal model. Pretrained representations, efficient inference and direct notation address different questions.

These papers form a selective research snapshot as of 2026-10-13, rather than an exhaustive survey. Pretrained representations, efficient instrument-agnostic transcription and direct notation have different objectives and evaluation protocols and should not be merged into a single ranking.

[AMT Challenge · 2026](https://arxiv.org/abs/2603.27528) · [Harmonica · 2026](https://arxiv.org/abs/2609.04640v1) · [TUTTI · 2026](https://arxiv.org/abs/2609.00640)

### 26. Open research questions

Multi-instrument transcription must get pitch, time and instrument identity right together. MuScriptor highlights the power of data and post-training—and the importance of evaluation and representation.

Further research must consider data coverage and label quality, evaluation for downstream use, and representations for multiple parts of the same instrument. Further analysis of MuScriptor could examine supervised fine-tuning with the same checked data, evaluation without reference instrument conditions, and protocols retaining conflicting notes.

