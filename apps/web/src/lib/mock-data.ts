/* ========================================
   EVOLITH — CURATED MOCK DATA
   Rich, interconnected knowledge data for the full UI experience.
   ======================================== */

import type { NodeType, EdgeType } from "./constants";

/* ── Types ── */

export interface KnowledgeNode {
  id: string;
  label: string;
  type: NodeType;
  year: number;
  description: string;
  creator?: string;
  field?: string;
  evolutionScore?: number;
  citationCount?: number;
  influenceScore?: number;
  /* Layers this node belongs to */
  layers: string[];
  /* Knowledge DNA — composition breakdown */
  dna?: Record<string, number>;
  /* Position hints for deterministic initial layout */
  cluster?: string;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  type: EdgeType;
  explanation: string;
  evidenceCount: number;
  confidence: number;
  year?: number;
}

export interface TimelineMilestone {
  year: number;
  label: string;
  nodeId: string;
  type: NodeType;
  significance: "major" | "moderate" | "minor";
}

export interface EvolutionChain {
  id: string;
  label: string;
  description: string;
  nodeIds: string[];
  field: string;
  evolutionScore: number;
  paperCount: number;
  researcherCount: number;
  openProblems: number;
}

/* ── Nodes ── */

export const nodes: KnowledgeNode[] = [
  // ── AI Core Evolution ──
  {
    id: "mcculloch-pitts",
    label: "McCulloch-Pitts Neuron",
    type: "technology",
    year: 1943,
    description: "First mathematical model of an artificial neuron, establishing the foundation for neural computation.",
    creator: "McCulloch & Pitts",
    field: "AI",
    evolutionScore: 72.1,
    layers: ["research"],
    cluster: "ai-foundations",
    dna: { Mathematics: 80, Theory: 70, Hardware: 5, Software: 5, Biology: 40 },
  },
  {
    id: "perceptron",
    label: "Perceptron",
    type: "technology",
    year: 1958,
    description: "First trainable neural network — a single-layer model for binary classification.",
    creator: "Frank Rosenblatt",
    field: "AI",
    evolutionScore: 78.3,
    layers: ["research"],
    cluster: "ai-foundations",
    dna: { Mathematics: 70, Theory: 60, Hardware: 20, Software: 15, Biology: 30 },
  },
  {
    id: "backpropagation",
    label: "Backpropagation",
    type: "technology",
    year: 1986,
    description: "Algorithm for training multi-layer neural networks by propagating errors backward through layers.",
    creator: "Rumelhart, Hinton & Williams",
    field: "AI",
    evolutionScore: 94.5,
    layers: ["research"],
    cluster: "ai-foundations",
    dna: { Mathematics: 90, Theory: 60, Hardware: 10, Software: 30, Optimization: 80 },
  },
  {
    id: "cnn",
    label: "Convolutional Neural Networks",
    type: "technology",
    year: 1989,
    description: "Neural networks with convolutional layers, designed for grid-like data such as images.",
    creator: "Yann LeCun",
    field: "Computer Vision",
    evolutionScore: 93.2,
    layers: ["research", "industry"],
    cluster: "vision",
    dna: { Mathematics: 70, Theory: 40, Hardware: 30, Software: 50, Vision: 90 },
  },
  {
    id: "lstm",
    label: "Long Short-Term Memory",
    type: "technology",
    year: 1997,
    description: "Recurrent architecture with gating mechanisms that solved the vanishing gradient problem for sequences.",
    creator: "Hochreiter & Schmidhuber",
    field: "AI",
    evolutionScore: 88.7,
    layers: ["research"],
    cluster: "sequence",
    dna: { Mathematics: 80, Theory: 50, Hardware: 15, Software: 40, NLP: 60 },
  },
  {
    id: "rnn",
    label: "Recurrent Neural Networks",
    type: "technology",
    year: 1986,
    description: "Neural networks with recurrent connections, enabling processing of sequential data.",
    creator: "David Rumelhart",
    field: "AI",
    evolutionScore: 82.4,
    layers: ["research"],
    cluster: "sequence",
    dna: { Mathematics: 75, Theory: 55, Hardware: 10, Software: 35, NLP: 50 },
  },
  {
    id: "alexnet",
    label: "AlexNet",
    type: "technology",
    year: 2012,
    description: "Deep CNN that won ImageNet 2012 by a massive margin, igniting the deep learning revolution.",
    creator: "Alex Krizhevsky",
    field: "Computer Vision",
    evolutionScore: 95.1,
    layers: ["research", "industry"],
    cluster: "vision",
    dna: { Mathematics: 50, Theory: 30, Hardware: 70, Software: 60, Vision: 95 },
  },
  {
    id: "resnet",
    label: "ResNet",
    type: "technology",
    year: 2015,
    description: "Introduced residual connections, enabling training of networks with hundreds of layers.",
    creator: "Kaiming He",
    field: "Computer Vision",
    evolutionScore: 93.8,
    layers: ["research", "industry"],
    cluster: "vision",
    dna: { Mathematics: 60, Theory: 40, Hardware: 50, Software: 55, Vision: 90 },
  },
  {
    id: "attention",
    label: "Attention Mechanism",
    type: "technology",
    year: 2014,
    description: "Mechanism allowing models to focus on relevant parts of input, revolutionizing sequence-to-sequence models.",
    creator: "Bahdanau, Cho & Bengio",
    field: "AI",
    evolutionScore: 96.2,
    layers: ["research"],
    cluster: "attention",
    dna: { Mathematics: 85, Theory: 65, Hardware: 15, Software: 40, NLP: 75 },
  },
  {
    id: "transformer",
    label: "Transformer",
    type: "technology",
    year: 2017,
    description: "Architecture based entirely on self-attention, eliminating recurrence. Changed every field of AI.",
    creator: "Google Brain",
    field: "AI",
    evolutionScore: 98.7,
    layers: ["research", "industry"],
    cluster: "attention",
    dna: { Mathematics: 80, Theory: 55, Hardware: 40, Software: 60, NLP: 90 },
  },
  {
    id: "bert",
    label: "BERT",
    type: "technology",
    year: 2018,
    description: "Bidirectional encoder model that set new benchmarks across NLP tasks through masked language modeling.",
    creator: "Google AI",
    field: "NLP",
    evolutionScore: 92.4,
    layers: ["research", "industry"],
    cluster: "llm",
    dna: { Mathematics: 60, Theory: 40, Hardware: 50, Software: 70, NLP: 95 },
  },
  {
    id: "gpt",
    label: "GPT",
    type: "technology",
    year: 2018,
    description: "Autoregressive language model using transformer decoder, pioneering large-scale language generation.",
    creator: "OpenAI",
    field: "NLP",
    evolutionScore: 94.1,
    layers: ["research", "industry"],
    cluster: "llm",
    dna: { Mathematics: 55, Theory: 35, Hardware: 60, Software: 75, NLP: 95 },
  },
  {
    id: "gpt-4",
    label: "GPT-4",
    type: "technology",
    year: 2023,
    description: "Multimodal large language model with dramatically improved reasoning, coding, and knowledge capabilities.",
    creator: "OpenAI",
    field: "AI",
    evolutionScore: 96.8,
    layers: ["research", "industry"],
    cluster: "llm",
    dna: { Mathematics: 50, Theory: 30, Hardware: 80, Software: 85, NLP: 90 },
  },
  {
    id: "diffusion",
    label: "Diffusion Models",
    type: "technology",
    year: 2020,
    description: "Generative models that learn to denoise data, producing state-of-the-art image and video generation.",
    creator: "Ho, Jain & Abbeel",
    field: "Generative AI",
    evolutionScore: 91.5,
    layers: ["research", "industry"],
    cluster: "generative",
    dna: { Mathematics: 85, Theory: 60, Hardware: 45, Software: 50, Vision: 80 },
  },
  {
    id: "vit",
    label: "Vision Transformer",
    type: "technology",
    year: 2020,
    description: "Applied transformer architecture to image recognition, challenging CNN dominance in computer vision.",
    creator: "Google Brain",
    field: "Computer Vision",
    evolutionScore: 89.3,
    layers: ["research", "industry"],
    cluster: "vision",
    dna: { Mathematics: 65, Theory: 45, Hardware: 50, Software: 60, Vision: 85 },
  },
  {
    id: "agents",
    label: "AI Agents",
    type: "technology",
    year: 2023,
    description: "Autonomous AI systems that plan, use tools, and execute multi-step tasks with minimal human intervention.",
    creator: "Multiple",
    field: "AI",
    evolutionScore: 87.9,
    layers: ["research", "industry"],
    cluster: "frontier",
    dna: { Mathematics: 40, Theory: 50, Hardware: 30, Software: 90, Reasoning: 80 },
  },
  {
    id: "rlhf",
    label: "RLHF",
    type: "technology",
    year: 2022,
    description: "Reinforcement Learning from Human Feedback — aligning language models with human preferences.",
    creator: "OpenAI / Anthropic",
    field: "AI Safety",
    evolutionScore: 88.2,
    layers: ["research", "industry"],
    cluster: "alignment",
    dna: { Mathematics: 70, Theory: 55, Hardware: 30, Software: 60, Ethics: 75 },
  },
  {
    id: "gan",
    label: "Generative Adversarial Networks",
    type: "technology",
    year: 2014,
    description: "Two neural networks competing — a generator and discriminator — producing realistic synthetic data.",
    creator: "Ian Goodfellow",
    field: "Generative AI",
    evolutionScore: 91.8,
    layers: ["research", "industry"],
    cluster: "generative",
    dna: { Mathematics: 75, Theory: 60, Hardware: 35, Software: 50, Vision: 70 },
  },
  {
    id: "word2vec",
    label: "Word2Vec",
    type: "technology",
    year: 2013,
    description: "Efficient word embedding technique that captured semantic relationships in vector space.",
    creator: "Tomas Mikolov",
    field: "NLP",
    evolutionScore: 86.4,
    layers: ["research"],
    cluster: "nlp",
    dna: { Mathematics: 70, Theory: 50, Hardware: 15, Software: 55, NLP: 85 },
  },
  {
    id: "batch-norm",
    label: "Batch Normalization",
    type: "technology",
    year: 2015,
    description: "Technique to normalize layer inputs, dramatically accelerating and stabilizing deep network training.",
    creator: "Ioffe & Szegedy",
    field: "AI",
    evolutionScore: 85.1,
    layers: ["research"],
    cluster: "training",
    dna: { Mathematics: 65, Theory: 40, Hardware: 25, Software: 55, Optimization: 80 },
  },

  // ── Papers ──
  {
    id: "paper-attention",
    label: "Attention Is All You Need",
    type: "paper",
    year: 2017,
    description: "The landmark paper introducing the Transformer architecture, eliminating recurrence entirely.",
    creator: "Vaswani et al.",
    field: "AI",
    citationCount: 130000,
    influenceScore: 99.2,
    layers: ["research"],
    cluster: "attention",
  },
  {
    id: "paper-imagenet",
    label: "ImageNet Classification with Deep CNNs",
    type: "paper",
    year: 2012,
    description: "AlexNet paper — deep CNN that ignited the modern deep learning revolution.",
    creator: "Krizhevsky, Sutskever & Hinton",
    field: "Computer Vision",
    citationCount: 120000,
    influenceScore: 98.5,
    layers: ["research"],
    cluster: "vision",
  },
  {
    id: "paper-resnet",
    label: "Deep Residual Learning",
    type: "paper",
    year: 2015,
    description: "Introduced skip connections, enabling training of 152-layer networks.",
    creator: "He et al.",
    field: "Computer Vision",
    citationCount: 200000,
    influenceScore: 97.8,
    layers: ["research"],
    cluster: "vision",
  },
  {
    id: "paper-bert",
    label: "BERT: Pre-training of Deep Bidirectional Transformers",
    type: "paper",
    year: 2018,
    description: "Introduced bidirectional pre-training for language understanding, dominating NLP benchmarks.",
    creator: "Devlin et al.",
    field: "NLP",
    citationCount: 95000,
    influenceScore: 96.1,
    layers: ["research"],
    cluster: "llm",
  },
  {
    id: "paper-gan",
    label: "Generative Adversarial Nets",
    type: "paper",
    year: 2014,
    description: "Proposed the adversarial training framework for generative modeling.",
    creator: "Goodfellow et al.",
    field: "Generative AI",
    citationCount: 65000,
    influenceScore: 95.3,
    layers: ["research"],
    cluster: "generative",
  },
  {
    id: "paper-dropout",
    label: "Dropout: A Simple Way to Prevent Overfitting",
    type: "paper",
    year: 2014,
    description: "Regularization technique that randomly drops neurons during training, reducing overfitting.",
    creator: "Srivastava et al.",
    field: "AI",
    citationCount: 45000,
    influenceScore: 88.4,
    layers: ["research"],
    cluster: "training",
  },
  {
    id: "paper-word2vec",
    label: "Efficient Estimation of Word Representations",
    type: "paper",
    year: 2013,
    description: "Introduced Word2Vec — learning word embeddings from large text corpora efficiently.",
    creator: "Mikolov et al.",
    field: "NLP",
    citationCount: 40000,
    influenceScore: 90.1,
    layers: ["research"],
    cluster: "nlp",
  },
  {
    id: "paper-diffusion",
    label: "Denoising Diffusion Probabilistic Models",
    type: "paper",
    year: 2020,
    description: "Established the foundation for modern diffusion-based generative models.",
    creator: "Ho, Jain & Abbeel",
    field: "Generative AI",
    citationCount: 12000,
    influenceScore: 91.7,
    layers: ["research"],
    cluster: "generative",
  },

  // ── Companies ──
  {
    id: "google",
    label: "Google",
    type: "company",
    year: 1998,
    description: "Pioneer in search, cloud computing, and AI research through Google Brain, DeepMind, and Gemini.",
    field: "Technology",
    evolutionScore: 97.2,
    layers: ["industry", "research"],
    cluster: "companies",
  },
  {
    id: "openai",
    label: "OpenAI",
    type: "company",
    year: 2015,
    description: "AI research lab that developed GPT, DALL-E, and ChatGPT, defining the modern LLM era.",
    field: "AI",
    evolutionScore: 96.5,
    layers: ["industry", "research"],
    cluster: "companies",
  },
  {
    id: "deepmind",
    label: "DeepMind",
    type: "company",
    year: 2010,
    description: "AI research lab acquired by Google. Created AlphaGo, AlphaFold, and Gemini.",
    field: "AI",
    evolutionScore: 95.8,
    layers: ["industry", "research"],
    cluster: "companies",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    type: "company",
    year: 2021,
    description: "AI safety company building Claude. Focused on reliable, interpretable, and steerable AI systems.",
    field: "AI Safety",
    evolutionScore: 89.4,
    layers: ["industry", "research"],
    cluster: "companies",
  },
  {
    id: "meta-ai",
    label: "Meta AI",
    type: "company",
    year: 2013,
    description: "Meta's AI research division. Created LLaMA, PyTorch, and foundational vision models.",
    field: "AI",
    evolutionScore: 93.1,
    layers: ["industry", "research", "open-source"],
    cluster: "companies",
  },
  {
    id: "nvidia",
    label: "NVIDIA",
    type: "company",
    year: 1993,
    description: "GPU manufacturer whose hardware became the backbone of modern deep learning computation.",
    field: "Hardware",
    evolutionScore: 94.6,
    layers: ["industry"],
    cluster: "companies",
  },

  // ── People ──
  {
    id: "hinton",
    label: "Geoffrey Hinton",
    type: "person",
    year: 1947,
    description: "Godfather of deep learning. Pioneered backpropagation, Boltzmann machines, and dropout. Nobel laureate.",
    field: "AI",
    influenceScore: 99.1,
    layers: ["people", "research"],
    cluster: "researchers",
  },
  {
    id: "lecun",
    label: "Yann LeCun",
    type: "person",
    year: 1960,
    description: "Pioneer of convolutional neural networks. Chief AI Scientist at Meta. Turing Award winner.",
    field: "Computer Vision",
    influenceScore: 97.5,
    layers: ["people", "research"],
    cluster: "researchers",
  },
  {
    id: "bengio",
    label: "Yoshua Bengio",
    type: "person",
    year: 1964,
    description: "Pioneer of deep learning and neural machine translation. Turing Award winner.",
    field: "AI",
    influenceScore: 96.8,
    layers: ["people", "research"],
    cluster: "researchers",
  },
  {
    id: "vaswani",
    label: "Ashish Vaswani",
    type: "person",
    year: 1986,
    description: "Lead author of 'Attention Is All You Need', introducing the Transformer architecture.",
    field: "AI",
    influenceScore: 94.2,
    layers: ["people", "research"],
    cluster: "researchers",
  },
  {
    id: "goodfellow",
    label: "Ian Goodfellow",
    type: "person",
    year: 1985,
    description: "Inventor of Generative Adversarial Networks (GANs). Transformed generative AI.",
    field: "Generative AI",
    influenceScore: 93.7,
    layers: ["people", "research"],
    cluster: "researchers",
  },
  {
    id: "karpathy",
    label: "Andrej Karpathy",
    type: "person",
    year: 1986,
    description: "AI educator and researcher. Former director of AI at Tesla, founding member of OpenAI.",
    field: "AI",
    influenceScore: 88.9,
    layers: ["people", "research", "education"],
    cluster: "researchers",
  },
  {
    id: "ilya",
    label: "Ilya Sutskever",
    type: "person",
    year: 1985,
    description: "Co-founder of OpenAI. Key contributor to AlexNet and sequence-to-sequence learning.",
    field: "AI",
    influenceScore: 95.3,
    layers: ["people", "research"],
    cluster: "researchers",
  },
  {
    id: "kaiming-he",
    label: "Kaiming He",
    type: "person",
    year: 1984,
    description: "Creator of ResNet and He initialization. Enabled training of ultra-deep networks.",
    field: "Computer Vision",
    influenceScore: 92.1,
    layers: ["people", "research"],
    cluster: "researchers",
  },
];

/* ── Edges ── */

export const edges: KnowledgeEdge[] = [
  // AI Evolution Chain
  { source: "perceptron", target: "mcculloch-pitts", type: "INSPIRED_BY", explanation: "The perceptron directly implemented McCulloch-Pitts' mathematical neuron model as a trainable learning machine.", evidenceCount: 15, confidence: 0.97, year: 1958 },
  { source: "backpropagation", target: "perceptron", type: "SUCCEEDED_BY", explanation: "Backpropagation solved the credit assignment problem that limited single-layer perceptrons to linearly separable tasks.", evidenceCount: 28, confidence: 0.98, year: 1986 },
  { source: "rnn", target: "backpropagation", type: "INSPIRED_BY", explanation: "RNNs extended backpropagation through time to handle sequential data by unrolling recurrent connections.", evidenceCount: 18, confidence: 0.95, year: 1986 },
  { source: "cnn", target: "backpropagation", type: "INSPIRED_BY", explanation: "CNNs applied backpropagation with weight sharing through convolutional filters for spatial feature learning.", evidenceCount: 22, confidence: 0.96, year: 1989 },
  { source: "lstm", target: "rnn", type: "SUCCEEDED_BY", explanation: "LSTM introduced gating mechanisms to solve the vanishing gradient problem that plagued standard RNNs.", evidenceCount: 35, confidence: 0.99, year: 1997 },
  { source: "alexnet", target: "cnn", type: "SUCCEEDED_BY", explanation: "AlexNet demonstrated that deep CNNs trained on GPUs could achieve superhuman image recognition accuracy.", evidenceCount: 42, confidence: 0.99, year: 2012 },
  { source: "resnet", target: "alexnet", type: "SUCCEEDED_BY", explanation: "ResNet's skip connections solved degradation in very deep networks, pushing from 8 to 152+ layers.", evidenceCount: 38, confidence: 0.98, year: 2015 },
  { source: "attention", target: "lstm", type: "SUCCEEDED_BY", explanation: "Attention mechanisms allowed models to dynamically focus on relevant input positions, overcoming LSTM's fixed-length bottleneck.", evidenceCount: 30, confidence: 0.97, year: 2014 },
  { source: "transformer", target: "attention", type: "SUCCEEDED_BY", explanation: "Transformers used self-attention exclusively, eliminating recurrence entirely and enabling massive parallelization.", evidenceCount: 55, confidence: 0.99, year: 2017 },
  { source: "bert", target: "transformer", type: "FORKED_FROM", explanation: "BERT used only the transformer encoder with masked language modeling for bidirectional pre-training.", evidenceCount: 40, confidence: 0.98, year: 2018 },
  { source: "gpt", target: "transformer", type: "FORKED_FROM", explanation: "GPT adopted the transformer decoder with autoregressive pretraining at scale for language generation.", evidenceCount: 45, confidence: 0.99, year: 2018 },
  { source: "gpt-4", target: "gpt", type: "SUCCEEDED_BY", explanation: "GPT-4 scaled the GPT architecture to multimodal inputs with dramatically improved reasoning.", evidenceCount: 25, confidence: 0.95, year: 2023 },
  { source: "agents", target: "gpt-4", type: "INSPIRED_BY", explanation: "AI agents leverage large language model capabilities for planning, tool use, and autonomous task execution.", evidenceCount: 18, confidence: 0.90, year: 2023 },
  { source: "vit", target: "transformer", type: "FORKED_FROM", explanation: "ViT applied the transformer architecture to image patches, challenging CNN dominance in vision.", evidenceCount: 28, confidence: 0.96, year: 2020 },
  { source: "diffusion", target: "gan", type: "COMPETES_WITH", explanation: "Diffusion models surpassed GANs in image quality and training stability, becoming the dominant generative paradigm.", evidenceCount: 22, confidence: 0.93, year: 2020 },
  { source: "rlhf", target: "gpt", type: "INFLUENCED", explanation: "RLHF fine-tuned GPT models with human preference data, producing ChatGPT and the alignment paradigm.", evidenceCount: 20, confidence: 0.94, year: 2022 },
  { source: "word2vec", target: "attention", type: "PRECEDED_BY", explanation: "Word embeddings from Word2Vec informed the query-key-value attention mechanism's vector similarity approach.", evidenceCount: 12, confidence: 0.85, year: 2013 },
  { source: "batch-norm", target: "resnet", type: "INFLUENCED", explanation: "Batch normalization was critical for training deep residual networks by stabilizing internal activations.", evidenceCount: 15, confidence: 0.92, year: 2015 },

  // Paper → Technology
  { source: "paper-attention", target: "transformer", type: "CREATED_BY", explanation: "This paper introduced the Transformer architecture, defining self-attention and multi-head attention.", evidenceCount: 130000, confidence: 0.99, year: 2017 },
  { source: "paper-imagenet", target: "alexnet", type: "CREATED_BY", explanation: "This paper presented AlexNet and demonstrated deep learning's superiority on ImageNet.", evidenceCount: 120000, confidence: 0.99, year: 2012 },
  { source: "paper-resnet", target: "resnet", type: "CREATED_BY", explanation: "Introduced residual learning framework and skip connections.", evidenceCount: 200000, confidence: 0.99, year: 2015 },
  { source: "paper-bert", target: "bert", type: "CREATED_BY", explanation: "Defined the BERT architecture and masked language modeling pre-training approach.", evidenceCount: 95000, confidence: 0.99, year: 2018 },
  { source: "paper-gan", target: "gan", type: "CREATED_BY", explanation: "Proposed the generative adversarial framework and proved its theoretical foundations.", evidenceCount: 65000, confidence: 0.99, year: 2014 },
  { source: "paper-diffusion", target: "diffusion", type: "CREATED_BY", explanation: "Established denoising diffusion as a viable generative modeling approach.", evidenceCount: 12000, confidence: 0.98, year: 2020 },
  { source: "paper-word2vec", target: "word2vec", type: "CREATED_BY", explanation: "Introduced Word2Vec architectures (CBOW and Skip-gram) for efficient word embeddings.", evidenceCount: 40000, confidence: 0.99, year: 2013 },

  // Person → Technology
  { source: "hinton", target: "backpropagation", type: "CREATED_BY", explanation: "Hinton co-authored the seminal 1986 paper that popularized backpropagation for training deep networks.", evidenceCount: 50, confidence: 0.98 },
  { source: "lecun", target: "cnn", type: "CREATED_BY", explanation: "LeCun developed LeNet, the first successful application of CNNs to handwritten digit recognition.", evidenceCount: 45, confidence: 0.99 },
  { source: "vaswani", target: "paper-attention", type: "AUTHORED", explanation: "Lead author of 'Attention Is All You Need' at Google Brain.", evidenceCount: 1, confidence: 1.0 },
  { source: "goodfellow", target: "gan", type: "CREATED_BY", explanation: "Invented GANs during a conversation at a bar in Montreal, implementing the first working version overnight.", evidenceCount: 30, confidence: 0.99 },
  { source: "ilya", target: "alexnet", type: "CREATED_BY", explanation: "Co-author of the AlexNet paper with Krizhevsky and Hinton, driving the GPU training approach.", evidenceCount: 25, confidence: 0.97 },
  { source: "kaiming-he", target: "resnet", type: "CREATED_BY", explanation: "Invented ResNet and He initialization at Microsoft Research.", evidenceCount: 20, confidence: 0.99 },

  // Person → Company
  { source: "hinton", target: "google", type: "EMPLOYED", explanation: "Hinton joined Google in 2013, shaping Google Brain's research direction.", evidenceCount: 10, confidence: 0.98 },
  { source: "lecun", target: "meta-ai", type: "EMPLOYED", explanation: "LeCun has led Meta's AI research (FAIR) since 2013.", evidenceCount: 10, confidence: 0.99 },
  { source: "ilya", target: "openai", type: "CREATED_BY", explanation: "Co-founder and former Chief Scientist of OpenAI.", evidenceCount: 8, confidence: 0.99 },
  { source: "karpathy", target: "openai", type: "EMPLOYED", explanation: "Founding team member of OpenAI, later Director of AI at Tesla.", evidenceCount: 5, confidence: 0.97 },

  // Company → Technology
  { source: "google", target: "transformer", type: "CREATED_BY", explanation: "Google Brain team created the Transformer architecture.", evidenceCount: 55, confidence: 0.99 },
  { source: "google", target: "bert", type: "CREATED_BY", explanation: "Google AI Language developed BERT.", evidenceCount: 40, confidence: 0.99 },
  { source: "openai", target: "gpt", type: "CREATED_BY", explanation: "OpenAI developed the GPT series of language models.", evidenceCount: 50, confidence: 0.99 },
  { source: "openai", target: "gpt-4", type: "CREATED_BY", explanation: "OpenAI developed GPT-4 as a multimodal successor.", evidenceCount: 25, confidence: 0.99 },
  { source: "nvidia", target: "alexnet", type: "INFLUENCED", explanation: "NVIDIA GPUs (GTX 580) made training AlexNet feasible, proving GPU compute for deep learning.", evidenceCount: 15, confidence: 0.94 },
];

/* ── Timeline Milestones ── */

export const milestones: TimelineMilestone[] = [
  { year: 1943, label: "McCulloch-Pitts Neuron", nodeId: "mcculloch-pitts", type: "technology", significance: "major" },
  { year: 1958, label: "Perceptron", nodeId: "perceptron", type: "technology", significance: "major" },
  { year: 1986, label: "Backpropagation", nodeId: "backpropagation", type: "technology", significance: "major" },
  { year: 1989, label: "CNN (LeNet)", nodeId: "cnn", type: "technology", significance: "major" },
  { year: 1993, label: "NVIDIA Founded", nodeId: "nvidia", type: "company", significance: "moderate" },
  { year: 1997, label: "LSTM", nodeId: "lstm", type: "technology", significance: "major" },
  { year: 1998, label: "Google Founded", nodeId: "google", type: "company", significance: "moderate" },
  { year: 2010, label: "DeepMind Founded", nodeId: "deepmind", type: "company", significance: "moderate" },
  { year: 2012, label: "AlexNet / ImageNet Moment", nodeId: "alexnet", type: "technology", significance: "major" },
  { year: 2013, label: "Word2Vec", nodeId: "word2vec", type: "technology", significance: "moderate" },
  { year: 2014, label: "Attention Mechanism", nodeId: "attention", type: "technology", significance: "major" },
  { year: 2014, label: "GANs Invented", nodeId: "gan", type: "technology", significance: "major" },
  { year: 2015, label: "ResNet", nodeId: "resnet", type: "technology", significance: "major" },
  { year: 2015, label: "OpenAI Founded", nodeId: "openai", type: "company", significance: "major" },
  { year: 2015, label: "Batch Normalization", nodeId: "batch-norm", type: "technology", significance: "moderate" },
  { year: 2017, label: "Transformer", nodeId: "transformer", type: "technology", significance: "major" },
  { year: 2018, label: "BERT", nodeId: "bert", type: "technology", significance: "major" },
  { year: 2018, label: "GPT", nodeId: "gpt", type: "technology", significance: "major" },
  { year: 2020, label: "Vision Transformer", nodeId: "vit", type: "technology", significance: "moderate" },
  { year: 2020, label: "Diffusion Models", nodeId: "diffusion", type: "technology", significance: "major" },
  { year: 2021, label: "Anthropic Founded", nodeId: "anthropic", type: "company", significance: "moderate" },
  { year: 2022, label: "RLHF / ChatGPT", nodeId: "rlhf", type: "technology", significance: "major" },
  { year: 2023, label: "GPT-4", nodeId: "gpt-4", type: "technology", significance: "major" },
  { year: 2023, label: "AI Agents", nodeId: "agents", type: "technology", significance: "major" },
];

/* ── Featured Evolution Chains ── */

export const evolutionChains: EvolutionChain[] = [
  {
    id: "ai-evolution",
    label: "Artificial Intelligence",
    description: "From mathematical neurons to autonomous agents — 80 years of AI evolution.",
    nodeIds: ["mcculloch-pitts", "perceptron", "backpropagation", "cnn", "lstm", "attention", "transformer", "gpt-4", "agents"],
    field: "AI",
    evolutionScore: 98.7,
    paperCount: 142,
    researcherCount: 38,
    openProblems: 7,
  },
  {
    id: "language-models",
    label: "Language Models",
    description: "The evolution from word embeddings to conversational AI agents.",
    nodeIds: ["word2vec", "lstm", "attention", "transformer", "bert", "gpt", "gpt-4", "rlhf", "agents"],
    field: "NLP",
    evolutionScore: 96.2,
    paperCount: 89,
    researcherCount: 24,
    openProblems: 5,
  },
  {
    id: "computer-vision",
    label: "Computer Vision",
    description: "From convolutional filters to vision transformers — how machines learned to see.",
    nodeIds: ["cnn", "alexnet", "batch-norm", "resnet", "gan", "vit", "diffusion"],
    field: "Computer Vision",
    evolutionScore: 94.1,
    paperCount: 67,
    researcherCount: 19,
    openProblems: 4,
  },
  {
    id: "generative-ai",
    label: "Generative AI",
    description: "The path from adversarial training to photorealistic generation and creative AI.",
    nodeIds: ["gan", "vit", "diffusion", "gpt", "gpt-4"],
    field: "Generative AI",
    evolutionScore: 91.5,
    paperCount: 53,
    researcherCount: 15,
    openProblems: 6,
  },
];

/* ── Replay Sequence (choreographed for cinematic playback) ── */

export const replaySequence: { year: number; nodeIds: string[]; cameraTarget: string; label: string }[] = [
  { year: 1943, nodeIds: ["mcculloch-pitts"], cameraTarget: "mcculloch-pitts", label: "The Mathematical Neuron" },
  { year: 1958, nodeIds: ["perceptron"], cameraTarget: "perceptron", label: "The First Learning Machine" },
  { year: 1986, nodeIds: ["backpropagation", "rnn"], cameraTarget: "backpropagation", label: "Learning to Learn" },
  { year: 1989, nodeIds: ["cnn"], cameraTarget: "cnn", label: "Machines Learn to See" },
  { year: 1997, nodeIds: ["lstm"], cameraTarget: "lstm", label: "Remembering Sequences" },
  { year: 2012, nodeIds: ["alexnet", "paper-imagenet"], cameraTarget: "alexnet", label: "The ImageNet Moment" },
  { year: 2013, nodeIds: ["word2vec", "paper-word2vec", "meta-ai"], cameraTarget: "word2vec", label: "Words Become Vectors" },
  { year: 2014, nodeIds: ["attention", "gan", "paper-gan", "goodfellow"], cameraTarget: "attention", label: "Attention & Adversaries" },
  { year: 2015, nodeIds: ["resnet", "batch-norm", "paper-resnet", "openai"], cameraTarget: "resnet", label: "Going Deeper" },
  { year: 2017, nodeIds: ["transformer", "paper-attention", "vaswani"], cameraTarget: "transformer", label: "Attention Is All You Need" },
  { year: 2018, nodeIds: ["bert", "gpt", "paper-bert"], cameraTarget: "transformer", label: "The Language Revolution" },
  { year: 2020, nodeIds: ["vit", "diffusion", "paper-diffusion"], cameraTarget: "diffusion", label: "Vision Meets Attention" },
  { year: 2022, nodeIds: ["rlhf"], cameraTarget: "rlhf", label: "Aligning AI with Humanity" },
  { year: 2023, nodeIds: ["gpt-4", "agents", "anthropic"], cameraTarget: "gpt-4", label: "The Intelligence Frontier" },
];

/* ── Helper: Get all data as a graph ── */

export function getGraphData() {
  return { nodes, edges };
}

/* ── Helper: Get nodes visible at a given year ── */

export function getNodesAtYear(year: number): KnowledgeNode[] {
  return nodes.filter((n) => n.year <= year);
}

/* ── Helper: Get edges visible at a given year ── */

export function getEdgesAtYear(year: number): KnowledgeEdge[] {
  const visibleNodeIds = new Set(getNodesAtYear(year).map((n) => n.id));
  return edges.filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
}

/* ── Helper: Get node by ID ── */

export function getNode(id: string): KnowledgeNode | undefined {
  return nodes.find((n) => n.id === id);
}

/* ── Helper: Get neighbors of a node ── */

export function getNeighbors(nodeId: string): { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] } {
  const connectedEdges = edges.filter((e) => e.source === nodeId || e.target === nodeId);
  const neighborIds = new Set<string>();
  connectedEdges.forEach((e) => {
    neighborIds.add(e.source);
    neighborIds.add(e.target);
  });
  neighborIds.delete(nodeId);
  const neighborNodes = nodes.filter((n) => neighborIds.has(n.id));
  return { nodes: neighborNodes, edges: connectedEdges };
}

/* ── Helper: Search nodes ── */

export function searchNodes(query: string): KnowledgeNode[] {
  const q = query.toLowerCase();
  return nodes
    .filter(
      (n) =>
        n.label.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.field?.toLowerCase().includes(q) ||
        n.creator?.toLowerCase().includes(q)
    )
    .sort((a, b) => (b.evolutionScore ?? b.influenceScore ?? 0) - (a.evolutionScore ?? a.influenceScore ?? 0))
    .slice(0, 12);
}
