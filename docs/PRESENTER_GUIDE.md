# Presenter guide / 分享讲稿

Generated from `site/assets/content.js`. Run `node scripts/export-guide.mjs` after editing.

38 minutes of guided content + 2 minutes of open discussion. MuScriptor receives 14 minutes.

## 中文版

### 01. 听见音乐， 也听见每一个声部。 · 0–1 min

多乐器自动音乐转录文献导读：从“谁在演奏什么”讲起，沿着经典方法走到 MuScriptor。一次面向理解、讨论与听觉直觉的 paper sharing。

开场只问一个问题：如果给你一段乐队录音，你能写出每个乐器的音符吗？说明这不是“识别歌曲”，也不是“生成一首新歌”。今天先建立共同语言，再把约14分钟留给 MuScriptor。

### 02. 不是听出歌名，而是恢复演奏事件。 · 1–3 min

核心问题只有四个：谁、弹了什么音、何时开始、何时结束。多乐器意味着还要把音符分配给正确的乐器类别。

沿着图指向一个长条：横向位置是起音，长度是时值，纵向位置是音高，颜色是乐器。力度、踏板与弯音可能也是目标，但不是所有模型都预测。两个同类乐器的演奏者，也不一定被分成两条轨。

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 03. 试着在混音里，跟住一条旋律。 · 3–4 min

勾选声部，播放一个 4 秒的合成小例子。先听全部，再只听一个声部：人也会借助音色、音域和旋律连续性来“分组”。

全部声部播放一次，单独勾选长笛再播放一次。不要花太久调选项；这里只是让观众意识到“混在一起”的困难。真实音乐还多了混响、失真与复杂演奏。

### 04. 一个频谱峰，可能不止一种解释。 · 4–7 min

频率高，不代表一定有一个更高的音符。它可能只是低音的泛音。两种乐器同时演奏，还会让这些线索互相遮挡。

把 C3、C4 看作一个音高相差八度的例子。图的峰高只是示意，不能据此推断真实乐器。然后问：如果同一个音由两个人同时演奏，单靠音高集合能表达吗？为后面的表示上限埋伏笔。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 05. 三种视角：分解、检测、写事件。 · 7–9 min

这些是帮助理解的路线，不是一张从“落后”到“先进”的排名表。现代系统经常组合其中的思想。

NMF像解释频谱的积木；逐帧模型像每时每刻做音高判断；序列模型像写一句由音乐事件组成的句子。没有必要在这里讲优化公式或注意力矩阵。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 06. 早期工作留下了什么？ · 9–12 min

只记住三个关键思想：可解释的分解、起音与延音分开建模、可扩展的配对数据。

每个节点只用一分钟。特别强调 Onsets and Frames 的范围是钢琴，Slakh 是数据集，避免观众误以为都是同一赛道的逐代模型。

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [Slakh · 2019](https://arxiv.org/abs/1909.08494)

### 07. MT3：把转录写成一串“音乐词”。 · 12–15 min

同一个 Transformer，用共享事件词表处理不同数据集与乐器。混合音频直接映射为多轨事件序列。

把事件序列读成一句话即可。自回归意味着前面写出的事件会影响后面的预测，而不是“把音频变成自然语言”。用最后30秒提出：如果编码器更懂音乐、标签利用更充分，会怎样？

[MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 08. 两条改进路线：任务协作，数据协作。 · 15–18 min

除了加大模型，还可以让相关任务互相帮助，或让训练更接近“真实音乐里许多声音同时出现”。

左边强调信息流：识别条件→转录→帮助分离，混音本身也进入各模块。右边用“录音里有人唱，但只标了钢琴”的例子解释损失屏蔽。PerceiverTF 作为2023年的编码器基础一句带过。

[Jointist · 2023](https://arxiv.org/abs/2302.00286) · [Perceiver TF · 2023](https://arxiv.org/abs/2306.10785) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 09. “音高对了”还不够：你在算哪种 F1？ · 18–20 min

F1 综合精确率与召回率。帧级、起音、起止时间、乐器归属检查的是不同问题，不能把它们混在同一排行榜里。

切换一个例子即可。乐器认错但音高和时间正确，在不区分乐器的指标里仍可匹配，在Multi里不匹配。不要说F1=正确音符占比，也不要把示意动画当成真实模型结果。

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 10. 合成数据很干净；真实音乐很复杂。 · 20–22 min

要训练转录，音频与每个音符必须对齐。真正昂贵的是同时拥有真实的声音、完整的标签与可靠的时间。

讲清“合成规模”与“真实分布”是两个维度。MuScriptor 不否定合成数据，而是研究它在哪个训练阶段最有价值。MAESTRO只是对齐精度的例子，不作为多乐器基准。

[Slakh · 2019](https://arxiv.org/abs/1909.08494) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [MAESTRO · dataset paper](https://arxiv.org/abs/1810.12247)

### 11. MuScriptor：把重点放在真实音乐上。 · 22–23 min

Rouard、Krause 等 · Kyutai × Mirelo × IRCAM。核心是仅解码器 Transformer，以及“合成预训练 → 真实微调 → 强化学习后训练”的完整路线。

先给一句话总结：关键贡献主要是如何让训练走向真实音乐，而不只是设计一个花哨模块。接下来依次讲输入输出、训练、条件控制、结果和局限。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 12. 音频作为前缀，音符作为续写。 · 23–26 min

把一段音乐的频谱投影为向量，与可选的乐器条件一起送入仅解码器 Transformer，然后逐个预测音乐事件。

和MT3对照：MT3有编码器和解码器，MuScriptor把投影后的音频当作前缀放入仅解码器模型。不要画成先做音源分离，也不要称为“自然语言LLM”。5秒约500帧，实际张量长度可能受填充影响。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Tokenizer · pinned source](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)

### 13. 三阶段训练，各自补上一块短板。 · 26–29 min

模型先拥有大量精确标签，再接触真实混音，最后用少量人工核验数据优化预测质量。规模与标注质量在不同阶段发挥作用。

大数据学基础，真实数据补域差，高质量数据做后训练。用“同一题写8份答案，按参考答案评分”解释组相对奖励。若被问RL为何有效：论文结果支持收益，但不能单凭主表排除高质量子集本身的贡献。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 14. 告诉它“有哪些乐器”，会改变问题。 · 29–31 min

乐器条件可以让跨片段的身份更稳定，也能只请求一部分声部。但评测时给出真实乐器列表，与完全盲转录不是同一种设定。

举例：如果事先知道是钢琴三重奏，搜索空间明显缩小。论文默认结果使用来自参考标注的乐器集合。解释CFG=1代表不做引导放大；最终RL模型不需要CFG=2的额外前向计算来获得主表最佳Multi分数。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 15. 最大的跃升，来自接触真实音乐。 · 31–34 min

下面只比较同一张论文表中的训练阶段。它支持这条训练路线的价值，但没有把数据、规模与架构的贡献完全拆开。

用1分钟读三根柱子，1分钟解释条件，最后1分钟讲反例。额外细节：1%真实数据时合成预训练使Offset F1从9.9到33.4；全量时41.0到42.3（CFG=2，无RL，图4）。这说明合成预训练在真实标签稀缺时特别重要，不能说它没用。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 16. 进步值得肯定，边界也需要看见。 · 34–36 min

把模型变得更有用，不等于问题已经解决。评测协议、表示能力和可复现性，仍然影响我们如何解读结果。

重点讲第一个限制，它把开头的“两个声音同音高”问题收回来。再提醒：论文1.3B与当前软件large 1.4B的命名不同；软件新增乐谱导出不等于论文直接建模乐谱。现场有余裕才打开音频链接。

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Official repository · license / exports](https://github.com/muscriptor/muscriptor)

### 17. 到2026年，研究还在往哪里走？ · 36–37 min

最新方向没有收敛到一个“万能模型”。预训练表征、推理效率和直接记谱，分别回答不同问题。

这页只讲研究方向，每篇一句。日期为2026-10-13的检索快照，非穷尽式综述；这些相邻任务不是同一个排行榜。细节留在文献库。

[AMT Challenge · 2026](https://arxiv.org/abs/2603.27528) · [Harmonica · 2026](https://arxiv.org/abs/2609.04640) · [TUTTI · 2026](https://arxiv.org/abs/2609.00640)

### 18. 三个问题，带走这次分享。 · 37–38 min

多乐器转录的核心，是让音高、时间与乐器身份同时可信。MuScriptor展示了数据与后训练的力量，也让评测和表示边界更值得讨论。

到这里讲解约38分钟，留2分钟让观众选一个问题讨论。如果超时，前瞻页只用一句话带过，不压缩MuScriptor的评测边界。

### 自由讨论 · 38–40 min

从最后一页挑一个问题讨论。若时间紧，精简前沿页，不省略结果的评测条件。

## English

### 01. Hear the music. Find every part. · 0–1 min

An illustrated literature review of multi-instrument automatic music transcription—from “who played what?” to MuScriptor. Built for listening, understanding and discussion.

Open with one question: could you write out each instrument’s notes from a band recording? This is neither song identification nor music generation. Establish the task first; reserve about 14 minutes for MuScriptor.

### 02. Recover the performance, one note at a time. · 1–3 min

Four questions: which instrument, which pitch, when did it start, and when did it end? Multi-instrument transcription also assigns each note to an instrument class.

Point to one note bar: horizontal position is onset, length is duration, height is pitch and color is instrument. Velocity, pedal and bends are optional targets. Two players of the same instrument are not necessarily separated.

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 03. Try following one part inside the mixture. · 3–4 min

Select parts and play a four-second synthetic example. Listen to the mixture, then one part: we use timbre, register and melodic continuity to group notes.

Play the mixture once, then isolate the flute-like part. Keep this short. The example introduces overlap; real recordings add effects, distortion and richer playing techniques.

### 04. One spectral peak can have several explanations. · 4–7 min

A high-frequency peak need not mean a higher note: it may be an overtone of a lower note. Simultaneous instruments overlap and obscure these cues.

Use C3 and C4 as an octave example. Peak heights are schematic, not measured. Ask whether a set of pitches can represent two people playing the same note simultaneously. Return to this in the representation-limit discussion.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 05. Three views: factorize, detect, write events. · 7–9 min

These are conceptual routes, not a ranking from obsolete to superior. Modern systems often combine ideas from several of them.

NMF explains a spectrum with building blocks; frame models classify activity over time; sequence models write a sentence made of musical events. Leave optimization and attention details aside here.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 06. What did the early milestones teach us? · 9–12 min

Keep three ideas: interpretable factorization, separate attack and sustain modeling, and scalable paired data.

Spend one minute per milestone. Explicitly mark Onsets and Frames as piano-only and Slakh as a dataset; these are not successive models in one identical benchmark.

[NMF · 2003](https://www.merl.com/publications/TR2003-139) · [Onsets & Frames · 2018](https://arxiv.org/abs/1710.11153) · [Slakh · 2019](https://arxiv.org/abs/1909.08494)

### 07. MT3: write transcription as musical tokens. · 12–15 min

One Transformer uses a shared event vocabulary across datasets and instruments, mapping a mixture directly to a multitrack event sequence.

Read the events aloud as a sentence. Autoregressive means earlier events condition later ones, not that audio is translated into natural language. Transition by asking what stronger audio representations and better use of labels could add.

[MT3 · 2022](https://arxiv.org/abs/2111.03017)

### 08. Two routes forward: joint tasks and better data use. · 15–18 min

Progress can come from connecting related tasks or making training better reflect the many simultaneous sounds in real music.

On the left, explain recognition → conditioned transcription → separation support, with mixture audio feeding the modules too. On the right, imagine vocals audible in a recording labelled only for piano. Mention Perceiver TF (2023) briefly as an encoder foundation.

[Jointist · 2023](https://arxiv.org/abs/2302.00286) · [Perceiver TF · 2023](https://arxiv.org/abs/2306.10785) · [YourMT3+ · 2024](https://arxiv.org/abs/2407.04822v3)

### 09. Correct pitch is only one part of the score. · 18–20 min

F1 balances precision and recall. Frame activity, onsets, offsets and instrument attribution test different things; their scores are not interchangeable.

Use one toggle: correct pitch and timing with the wrong instrument can match an instrument-agnostic metric but fails Multi F1. F1 is not simply the proportion of correct notes. The animation is a constructed example.

[MT3 · 2022](https://arxiv.org/abs/2111.03017) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 10. Synthetic labels are clean. Real music is messy. · 20–22 min

Training needs audio aligned to individual notes. The expensive combination is realistic sound, complete labels and reliable timing.

Separate scale from realism. MuScriptor does not reject synthetic data; it asks at which training stage it helps most. MAESTRO illustrates precise alignment, not a multi-instrument benchmark.

[Slakh · 2019](https://arxiv.org/abs/1909.08494) · [MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [MAESTRO · dataset paper](https://arxiv.org/abs/1810.12247)

### 11. MuScriptor: focus on real-world music. · 22–23 min

Rouard, Krause et al. · Kyutai × Mirelo × IRCAM. A decoder-only Transformer paired with synthetic pretraining, real-audio fine-tuning and reinforcement post-training.

Give the one-sentence thesis: the contribution centers on transferring training to real music, beyond designing a novel module. Next: inputs and outputs, training, control, evidence and limits.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 12. Audio is the prefix. Notes are the continuation. · 23–26 min

Project a music spectrogram into vectors, combine it with optional instrument conditions, and let a decoder-only Transformer predict musical events.

Contrast MT3’s encoder–decoder with MuScriptor’s projected audio prefix in a decoder-only model. This is not a separation pipeline or a prose language model. Five seconds is roughly 500 frames; padding can affect exact tensor length.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Tokenizer · pinned source](https://github.com/muscriptor/muscriptor/blob/7f213afecf23bd6a1b8672aa223690ee9807cefb/muscriptor/tokenizer/notes.py)

### 13. Three stages, three different jobs. · 26–29 min

Start with many precise labels, adapt to real mixtures, then refine predictions with a small, manually checked set. Scale and label quality play different roles.

Large data teaches basics; real data addresses the domain gap; checked data supports refinement. Explain group-relative reward as eight answers to one question, scored against a reference. Results support a gain, but the main table alone does not isolate the optimization effect from the high-quality subset.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 14. Telling the model which instruments exist changes the task. · 29–31 min

Instrument conditions help stabilize identities across chunks and request selected parts. Providing the reference instrument list during evaluation differs from fully blind transcription.

If you already know the ensemble, the search space shrinks. Default paper results use reference-derived instrument sets. CFG=1 means no guidance amplification; the final RL model does not need CFG=2’s extra forward computation for its best reported Multi F1.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 15. The largest jump comes from learning real music. · 31–34 min

Compare training stages within the same paper table. The evidence supports the training recipe, but does not fully isolate data, scale and architecture.

Spend a minute on the bars, a minute on conditions, a minute on counterexamples. Optional nuance: synthetic pretraining raises Offset F1 from 9.9 to 33.4 at 1% real data, versus 41.0 to 42.3 at full scale (Figure 4, CFG=2, no RL). It matters especially when real labels are scarce.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2)

### 16. Recognize the progress. Examine the limits. · 34–36 min

A more useful model does not mean the task is solved. Evaluation choices, representational limits and reproducibility still shape the interpretation.

Emphasize the first limitation, returning to the opening question about overlapping pitches. Distinguish the paper’s 1.3B label from current software’s 1.4B, and score-export engineering from the paper’s note model. Open external audio only if time permits.

[MuScriptor · v2 / 2026](https://arxiv.org/html/2607.08168v2) · [Official repository · license / exports](https://github.com/muscriptor/muscriptor)

### 17. Where is the field heading in 2026? · 36–37 min

Recent work does not converge on a single universal model. Pretrained representations, efficient inference and direct notation address different questions.

One sentence per direction. This is a curated snapshot checked on 2026-10-13, not an exhaustive survey. The adjacent tasks do not share a single leaderboard; details stay in the library.

[AMT Challenge · 2026](https://arxiv.org/abs/2603.27528) · [Harmonica · 2026](https://arxiv.org/abs/2609.04640) · [TUTTI · 2026](https://arxiv.org/abs/2609.00640)

### 18. Three questions to carry into the discussion. · 37–38 min

Multi-instrument transcription must get pitch, time and instrument identity right together. MuScriptor highlights the power of data and post-training—and the importance of evaluation and representation.

Aim to finish the guided material by minute 38 and leave two minutes for one audience question. If behind, compress the outlook page rather than skipping the caveats around MuScriptor’s evaluation.

### Open discussion · 38–40 min

Choose one question from the final page. If behind schedule, compress the outlook rather than omitting evaluation caveats.

