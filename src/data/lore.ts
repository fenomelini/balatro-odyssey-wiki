// ============================================================
// BALATRO ODYSSEY — LORE DATA
// The complete narrative of the Odyssey, in EN and PT-BR.
// ============================================================

export interface LoreChapter {
  id: string;
  /** The "act" / part number (1–5) */
  act: number;
  /** Which group key(s) this chapter features */
  groups: string[];
  title_en: string;
  title_pt: string;
  /** Short subtitle shown in navigation / chapter list */
  subtitle_en: string;
  subtitle_pt: string;
  /** Full narrative body paragraphs */
  body_en: string[];
  body_pt: string[];
  /** Atmospheric pull-quote shown as a blockquote */
  quote_en: string;
  quote_pt: string;
}

export interface ConsumableLore {
  type: "tarot" | "planet" | "spectral";
  lore_en: string;
  lore_pt: string;
}

// ──────────────────────────────────────────────────────────────
// THE ODYSSEY — 5-ACT STRUCTURE
// ──────────────────────────────────────────────────────────────
//
//  ACT I  — The Dawn of Singularity          (Singularity, Quantum, Celestial)
//  ACT II — The Fracture                     (Temporal, Dimensions, Paradox)
//  ACT III— The War Between Worlds           (Chaos, Corruption, Glitch, Anomaly)
//  ACT IV — The Long Journey                 (Economy, Professions, Social, Elemental,
//                                             Tribal, Luck & Probability,
//                                             Hand & Discard, Positioning, Conditions, Time)
//  ACT V  — Transformation & Transcendence  (Transformations, Final)
//
// ──────────────────────────────────────────────────────────────

export const loreChapters: LoreChapter[] = [
  // ─────────── PROLOGUE ───────────
  {
    id: "prologue",
    act: 0,
    groups: [],
    title_en: "Before the First Card",
    title_pt: "Antes da Primeira Carta",
    subtitle_en: "The universe before the Odyssey began",
    subtitle_pt: "O universo antes do início da Odisseia",
    quote_en: "There was no table. There were no cards. There was only the Void — and inside the Void, an itch that could not be scratched.",
    quote_pt: "Não havia mesa. Não havia cartas. Havia apenas o Vazio — e dentro do Vazio, uma coceira que não podia ser coçada.",
    body_en: [
      "In the beginning, there was a game. Not just any game — a game of infinite possibility, where every shuffled deck contained a universe waiting to be born. The ancients called it Balatro: the Fool's Gamble, the Jester's Gift, the one game where madness was not a flaw but a feature.",
      "For eons, the cosmos played itself in quiet order. Jokers appeared, smiled their crooked smiles, and vanished. Blinds rose and fell like tides. The Shop opened and closed at the whim of fate. Life was simple. Life was finite.",
      "Then came the Odyssey.",
      "No one knows who dealt the first Odyssey card. Some say it was a gambler who had won so many times that winning ceased to have meaning. Others say it was a fool who lost everything and, in the moment of absolute ruin, discovered something vast and luminous hiding behind the zeros. Whatever the origin, the effect was immediate and irreversible: the universe cracked open, and from that crack poured one thousand Jokers, one hundred Decks, two hundred Vouchers, and countless cards that had never existed before — each one a piece of a story so enormous it could not fit inside a single run.",
      "This is that story.",
    ],
    body_pt: [
      "No começo, havia um jogo. Não qualquer jogo — um jogo de possibilidade infinita, onde cada baralho embaralhado continha um universo esperando para nascer. Os antigos o chamavam de Balatro: a Aposta do Tolo, o Dom do Bobo da Corte, o único jogo onde a loucura não era um defeito, mas uma característica.",
      "Por eons, o cosmos jogou a si mesmo em calma ordem. Curingas apareciam, sorriam seus sorrisos tortos e desapareciam. Os Blinds cresciam e caíam como marés. A Loja abria e fechava ao sabor do destino. A vida era simples. A vida era finita.",
      "Então veio a Odisseia.",
      "Ninguém sabe quem distribuiu a primeira carta Odyssey. Alguns dizem que foi um jogador que havia vencido tantas vezes que vencer havia deixado de ter sentido. Outros dizem que foi um tolo que perdeu tudo e, no momento de ruína absoluta, descobriu algo vasto e luminoso escondido atrás dos zeros. Seja qual for a origem, o efeito foi imediato e irreversível: o universo se abriu em uma fissura, e dessa fissura vazaram mil Curingas, cem Baralhos, duzentos Cupons e inúmeras cartas que nunca haviam existido antes — cada uma delas um pedaço de uma história tão enorme que não cabia em uma única run.",
      "Esta é essa história.",
    ],
  },

  // ─────────── ACT I ───────────
  {
    id: "act1-singularity",
    act: 1,
    groups: ["singularity"],
    title_en: "Act I — The Spark of Everything",
    title_pt: "Ato I — A Centelha de Tudo",
    subtitle_en: "A single point contains the whole universe",
    subtitle_pt: "Um único ponto contém o universo inteiro",
    quote_en: "The Singularity did not explode outward. It imploded inward, consuming everything it touched until there was nothing left — and then, impossibly, it became everything again.",
    quote_pt: "A Singularidade não explodiu para fora. Ela imploiu para dentro, consumindo tudo que tocava até não restar nada — e então, impossivelmente, tornou-se tudo de novo.",
    body_en: [
      "Every odyssey has an origin — a single, indivisible point from which everything else expands. The Singularity Jokers are that point.",
      "The first card ever pulled from the Odyssey deck was the Collapsed Star — a Joker so dense it bent the rules of the table around it. Where other Jokers scattered chips generously, the Collapsed Star swallowed them, compressed them, and returned them as pure Mult. The players who first witnessed it barely understood what they were seeing. A black hole on a playing card. A paradox made portable.",
      "But the Singularity was not merely destructive. The Reverse Big Bang, one of its legendary members, demonstrated that even the most total annihilation could be the precondition for something new. After consuming the entire hand, it exhaled creation — a burst of Mult so vast that the scoreboard couldn't contain it.",
      "The Singularity Jokers taught the Odyssey its first lesson: that in the cosmos, there is no such thing as empty. Emptiness is merely waiting. And what waits long enough, eventually detonates.",
    ],
    body_pt: [
      "Toda odisseia tem uma origem — um único ponto indivisível a partir do qual todo o resto se expande. Os Curingas de Singularidade são esse ponto.",
      "A primeira carta já tirada do baralho Odyssey foi a Estrela Colapsada — um Curinga tão denso que dobrava as regras da mesa ao redor de si. Onde outros Curingas espalhavam chips generosamente, a Estrela Colapsada os engolia, comprimia e os devolvia como Mult puro. Os jogadores que a viram pela primeira vez mal compreenderam o que estavam presenciando. Um buraco negro em uma carta de baú. Um paradoxo feito portátil.",
      "Mas a Singularidade não era meramente destrutiva. O Reverse Big Bang, um de seus membros lendários, demonstrou que mesmo a aniquilação mais total poderia ser a pré-condição para algo novo. Após consumir a mão inteira, ele exalou criação — uma explosão de Mult tão vasta que o placar não conseguia contê-la.",
      "Os Curingas de Singularidade ensinaram à Odisseia sua primeira lição: que no cosmos, não existe tal coisa como o vazio. O vazio é apenas espera. E o que espera tempo suficiente, eventualmente detona.",
    ],
  },
  {
    id: "act1-quantum",
    act: 1,
    groups: ["quantum"],
    title_en: "Act I — The Uncertain Observer",
    title_pt: "Ato I — O Observador Incerto",
    subtitle_en: "Existence itself becomes a question of probability",
    subtitle_pt: "A própria existência torna-se uma questão de probabilidade",
    quote_en: "The Quantum Joker does not decide what it does until you look at it. And sometimes, when you look at it, it decides to be two things at once.",
    quote_pt: "O Curinga Quântico não decide o que faz até você olhar para ele. E às vezes, quando você olha, ele decide ser duas coisas ao mesmo tempo.",
    body_en: [
      "Born from the same cosmic event as the Singularity, the Quantum Jokers emerged as its inverse: where Singularity was certainty compressed to infinite density, Quantum was uncertainty expanded to infinite possibility.",
      "The Schrödinger's Joker became infamous early in the Odyssey. It existed in superposition — simultaneously active and inactive — until the moment of scoring. Players never knew which version they would get. Some runs it was a gentle +10 Mult. Other runs it was a hand limit halved and a Mult multiplied by the number of rounds survived. The same card, two universes.",
      "The Quantum group's Jokers didn't play by the laws of probability so much as they bent those laws around their fingers like rings. Wave Function Collapse could enumerate every possible hand outcome and choose the best one, but only once per round. Entanglement linked two Jokers so that whatever one gained, the other reflected — a risky communion across the deck.",
      "In the early days of the Odyssey, quantum physicists from universities that didn't yet exist were brought in to consult on the mechanics. They all left convinced that whoever designed these cards had found a loophole in the fundamental structure of reality.",
    ],
    body_pt: [
      "Nascidos do mesmo evento cósmico que a Singularidade, os Curingas Quânticos emergiram como seu inverso: onde a Singularidade era certeza comprimida até a densidade infinita, o Quântico era incerteza expandida até a possibilidade infinita.",
      "O Joker de Schrödinger tornou-se infame cedo na Odisseia. Existia em superposição — simultaneamente ativo e inativo — até o momento da pontuação. Os jogadores nunca sabiam qual versão receberiam. Em algumas runs era um gentil +10 Mult. Em outras, o limite de mão reduzido pela metade e um Mult multiplicado pelo número de rodadas sobrevividas. A mesma carta, dois universos.",
      "Os Curingas do grupo Quântico não jogavam pelas leis da probabilidade — eles dobravam essas leis ao redor dos dedos como anéis. O Colapso da Função de Onda podia enumerar todos os resultados possíveis de uma mão e escolher o melhor, mas apenas uma vez por rodada. O Entrelaçamento ligava dois Curingas de forma que o que um ganhava, o outro refletia — uma comunhão arriscada através do baralho.",
      "Nos primeiros dias da Odisseia, físicos quânticos de universidades que ainda não existiam foram convocados para consultar sobre as mecânicas. Todos foram embora convictos de que quem projetou essas cartas encontrou uma brecha na estrutura fundamental da realidade.",
    ],
  },
  {
    id: "act1-celestial",
    act: 1,
    groups: ["celestial"],
    title_en: "Act I — The Stars Bear Witness",
    title_pt: "Ato I — As Estrelas Testemunham",
    subtitle_en: "The cosmos watches, scores, and remembers",
    subtitle_pt: "O cosmos observa, pontua e não esquece",
    quote_en: "Every galaxy in the Celestial deck is a record. Not of victories — of hands played. The stars don't count winners. They count those who kept playing.",
    quote_pt: "Cada galáxia no baralho Celestial é um registro. Não de vitórias — de mãos jogadas. As estrelas não contam vencedores. Elas contam quem continuou jogando.",
    body_en: [
      "If Singularity was the origin point and Quantum was the field of possibility, then Celestial was the witness — the vast, patient audience that observed the whole Odyssey unfolding from a distance measured in light-years.",
      "The Celestial Jokers were astronomers and constellations, black dwarfs and neutron stars. They did not act quickly. A newly placed Celestial Joker might do nothing for the first three Antes, accruing invisible starlight in some counter only the back of the card could see. Then, in Ante 7, it detonated.",
      "The Cosmic Entity became the aspirational capstone of many high-stakes runs. A Legendary card that grew stronger with every hand played — not just in a run, but across all runs — it carried the memory of a player's entire history in its glowing blue halo. Defeating it was impossible. Befriending it was the only strategy.",
      "The Celestial Jokers told the Odyssey that time and patience are themselves a kind of power — that the universe rewards those who endure.",
    ],
    body_pt: [
      "Se a Singularidade era o ponto de origem e o Quântico era o campo de possibilidade, então o Celestial era a testemunha — a vasta e paciente audiência que observou toda a Odisseia se desdobrar de uma distância medida em anos-luz.",
      "Os Curingas Celestiais eram astrônomos e constelações, anãs brancas e estrelas de nêutrons. Não agiam rapidamente. Um Curinga Celestial recém-colocado poderia não fazer nada nos primeiros três Antes, acumulando luz estelar invisível em algum contador que apenas o verso da carta conseguia ver. Então, no Ante 7, detonava.",
      "A Entidade Cósmica tornou-se o ponto culminante aspiracional de muitas runs de alto risco. Uma carta Lendária que crescia mais forte a cada mão jogada — não apenas em uma run, mas em todas as runs — carregava a memória de toda a história de um jogador em seu halo azul brilhante. Derrotá-la era impossível. Fazer amizade com ela era a única estratégia.",
      "Os Curingas Celestiais disseram à Odisseia que o tempo e a paciência são em si mesmos um tipo de poder — que o universo recompensa aqueles que perseveram.",
    ],
  },

  // ─────────── ACT II ───────────
  {
    id: "act2-temporal",
    act: 2,
    groups: ["temporal"],
    title_en: "Act II — The Broken Hourglass",
    title_pt: "Ato II — A Ampulheta Quebrada",
    subtitle_en: "When time folds back on itself, everything changes",
    subtitle_pt: "Quando o tempo se dobra sobre si mesmo, tudo muda",
    quote_en: "The Temporal Joker does not remember the future. It remembers the past and refuses to let go of it.",
    quote_pt: "O Curinga Temporal não se lembra do futuro. Ele se lembra do passado e se recusa a deixá-lo ir.",
    body_en: [
      "The first fracture in the Odyssey's timeline appeared quietly — a single Joker called the Ante Echo. It activated not when a hand was played, but when an Ante was cleared. Then it retroactively applied that bonus to every Ante already survived. The implications were staggering.",
      "The Temporal Jokers arrived as scholars of causality — cards that reached backward through the run to pull forward effects that had already passed. Some could re-trigger the scoring of previous hands. Others could 'remember' cards that had been discarded rounds ago and superimpose their bonuses onto the current hand.",
      "The most feared Temporal Joker was the Paradox Clock — which doesn't simply re-trigger effects, but duplicates the entire scoring session of a previous round, running it in parallel with the current one. Two scoring phases happening simultaneously wrecked logic and thrilled players in equal measure.",
      "Temporal mechanics introduced a new philosophy to the Odyssey: that a run was not a straight line from Ante 1 to Ante 8, but a spiral. The past was always present. The present was always stacking on the past.",
    ],
    body_pt: [
      "A primeira fratura na linha do tempo da Odisseia apareceu silenciosamente — um único Curinga chamado Eco de Ante. Ele ativava não quando uma mão era jogada, mas quando um Ante era superado. Então retroativamente aplicava esse bônus a cada Ante já sobrevivido. As implicações eram impressionantes.",
      "Os Curingas Temporais chegaram como eruditos da causalidade — cartas que alcançavam para trás através da run para trazer à frente efeitos que já haviam passado. Alguns podiam re-acionar a pontuação de mãos anteriores. Outros podiam 'lembrar' cartas que haviam sido descartadas rodadas atrás e sobrepor seus bônus sobre a mão atual.",
      "O Curinga Temporal mais temido era o Relógio do Paradoxo — que não simplesmente re-aciona efeitos, mas duplica toda a sessão de pontuação de uma rodada anterior, executando-a em paralelo com a atual. Duas fases de pontuação acontecendo simultaneamente destruíam a lógica e entusiasmavam os jogadores em igual medida.",
      "A mecânica temporal introduziu uma nova filosofia à Odisseia: que uma run não era uma linha reta do Ante 1 ao Ante 8, mas uma espiral. O passado estava sempre presente. O presente estava sempre se acumulando sobre o passado.",
    ],
  },
  {
    id: "act2-dimensions",
    act: 2,
    groups: ["dimensions"],
    title_en: "Act II — The Parallel Tables",
    title_pt: "Ato II — As Mesas Paralelas",
    subtitle_en: "Somewhere, another version of you is winning",
    subtitle_pt: "Em algum lugar, outra versão de você está vencendo",
    quote_en: "In Dimension Seven, you made a different choice. In Dimension Seven, you are still playing. In Dimension Seven, the hand you discarded three rounds ago is scoring right now.",
    quote_pt: "Na Dimensão Sete, você fez uma escolha diferente. Na Dimensão Sete, você ainda está jogando. Na Dimensão Sete, a mão que você descartou três rodadas atrás está pontuando agora.",
    body_en: [
      "If Temporal fractured time, Dimensions fractured space — specifically, the space between possible game states. The Dimensional Jokers peered through membranes between parallel runs and borrowed freely from what they saw.",
      "The Mirror Realm was perhaps the most disorienting: it reflected the current hand's scoring onto a ghost hand — a second, invisible hand composed of the cards not played — and added the ghost hand's theoretical score to the total. Players reported a strange sensation when it triggered: the feeling that they were watching themselves play from across a very thin wall.",
      "Dimension Jokers interacted with the Parallel Deck, one of the most exotic starting options in Odyssey. The Parallel Deck began each run with a 'shadow copy' of the starting deck — unseen, unplayed, but influencing some Jokers — a persistent ghost in the machine.",
      "The Dimensions group ultimately asked the deepest philosophical question of the entire Odyssey: if a version of you in a parallel universe is winning, does that count as your victory?",
    ],
    body_pt: [
      "Se o Temporal fraturou o tempo, as Dimensões fraturaram o espaço — especificamente, o espaço entre possíveis estados de jogo. Os Curingas Dimensionais espiavam através das membranas entre runs paralelas e emprestavam livremente o que viam.",
      "O Reino do Espelho era talvez o mais desorientador: refletia a pontuação da mão atual em uma mão fantasma — uma segunda mão invisível composta pelas cartas não jogadas — e adicionava a pontuação teórica da mão fantasma ao total. Os jogadores relatavam uma sensação estranha quando ele acionava: a sensação de se observarem jogando de além de uma parede muito fina.",
      "Os Curingas de Dimensão interagiam com o Baralho Paralelo, uma das opções iniciais mais exóticas da Odyssey. O Baralho Paralelo começava cada run com uma 'cópia sombreada' do baralho inicial — invisível, não jogada, mas influenciando alguns Curingas — um fantasma persistente na máquina.",
      "O grupo Dimensões por fim fez a pergunta filosófica mais profunda de toda a Odisseia: se uma versão de você em um universo paralelo está vencendo, isso conta como sua vitória?",
    ],
  },
  {
    id: "act2-paradox",
    act: 2,
    groups: ["paradox"],
    title_en: "Act II — Logic as a Weapon",
    title_pt: "Ato II — A Lógica como Arma",
    subtitle_en: "The card that contradict themselves win the game",
    subtitle_pt: "A carta que contradiz a si mesma vence o jogo",
    quote_en: "The Grandfather Paradox Joker gives you +100 Mult when played. It was never played. Therefore it gives you +100 Mult.",
    quote_pt: "O Curinga do Paradoxo do Avô lhe dá +100 Mult quando jogado. Ele nunca foi jogado. Portanto, dá-lhe +100 Mult.",
    body_en: [
      "The Paradox Jokers were the philosophers and logicians of the Odyssey — entities that discovered that game rules, like all rules, contained contradictions, and that those contradictions could be exploited.",
      "The Bootstrap Paradox Joker was the most notorious: it gained a permanent +1 Mult for every hand ever played that triggered it. But it triggered for every hand played. Including the ones that triggered it. The math spiraled, the scoreboard flickered, and the veteran players who understood it looked upon it with a mixture of reverence and existential dread.",
      "Paradox Jokers rewarded players who understood the meta-structure of the game deeply enough to subvert it. They were never beginner cards. They were the hidden elite of the Odyssey — waiting in the deck for the player curious enough, and clever enough, to find them.",
      "Their secret: every system contains the seeds of its own undoing. The Odyssey's rules were no different. The Paradox Jokers were proof.",
    ],
    body_pt: [
      "Os Curingas Paradoxo eram os filósofos e lógicos da Odisseia — entidades que descobriram que as regras do jogo, como todas as regras, continham contradições, e que essas contradições podiam ser exploradas.",
      "O Curinga do Paradoxo do Bootstrap era o mais notório: ganhava um +1 Mult permanente para cada mão já jogada que o havia acionado. Mas ele acionava para cada mão jogada. Incluindo as que o acionaram. A matemática espiralizava, o placar piscava, e os jogadores veteranos que o compreendiam o olhavam com uma mistura de reverência e pavor existencial.",
      "Os Curingas Paradoxo recompensavam jogadores que compreendiam a meta-estrutura do jogo profundamente o suficiente para subvertê-la. Nunca foram cartas para iniciantes. Eram a elite oculta da Odisseia — esperando no baralho pelo jogador curioso e inteligente o suficiente para encontrá-los.",
      "Seu segredo: todo sistema contém as sementes de sua própria destruição. As regras da Odisseia não eram diferentes. Os Curingas Paradoxo eram a prova.",
    ],
  },

  // ─────────── ACT III ───────────
  {
    id: "act3-chaos",
    act: 3,
    groups: ["chaos"],
    title_en: "Act III — The Dice That Cannot Be Loaded",
    title_pt: "Ato III — O Dado que Não Pode Ser Viciado",
    subtitle_en: "True randomness as the ultimate cosmic force",
    subtitle_pt: "A aleatoriedade verdadeira como a força cósmica suprema",
    quote_en: "The Chaos Joker will not be planned around. It will not be optimized. It will do what it wants. And sometimes — only sometimes — what it wants is to save your run.",
    quote_pt: "O Curinga do Caos não aceita planejamento. Não aceita otimização. Fará o que quiser. E às vezes — só às vezes — o que quer é salvar sua run.",
    body_en: [
      "The third act of the Odyssey began with the arrival of the Chaos Jokers — and the arrival of Chaos broke everything the Quantum and Temporal groups had built.",
      "The Quantum Jokers believed in superposition and measurement. Chaotic Jokers believed in neither. They generated numbers by rolling invisible dice that had sides nobody had counted. Their bonuses were not bell-curved or balanced. They were raw probability unbounded — a Chaos Joker might grant +2 Mult one hand and +2000 the next.",
      "The key figures of this group — the Wild Gambler, the Entropy Engine, the Cosmic Dice — became legends in the Odyssey's oral history. Scores built around them were either catastrophic failures or runs so explosive they redefined what was possible. There was no middle ground in Chaos.",
      "Most experienced players learned to treat Chaos Jokers like volatile components: useful only if everything else in the build was stable enough to absorb the variance. The ones who loved chaos most, however, built entire runs around it — trusting that the universe, if given enough chances, eventually lines up in your favor.",
      "Chaos taught the Odyssey that control is an illusion. The question was never whether you controlled the outcome. The question was whether you'd built something resilient enough to survive not controlling it.",
    ],
    body_pt: [
      "O terceiro ato da Odisseia começou com a chegada dos Curingas do Caos — e a chegada do Caos destruiu tudo que os grupos Quântico e Temporal haviam construído.",
      "Os Curingas Quânticos acreditavam em superposição e medição. Os Curingas Caóticos não acreditavam em nenhum dos dois. Geravam números rolando dados invisíveis que tinham faces que ninguém havia contado. Seus bônus não eram distribuídos em curva de sino ou equilibrados. Eram probabilidade bruta sem limites — um Curinga do Caos poderia conceder +2 Mult em uma mão e +2000 na próxima.",
      "As figuras-chave desse grupo — o Apostador Selvagem, o Motor da Entropia, os Dados Cósmicos — tornaram-se lendas na história oral da Odisseia. Pontuações construídas em torno deles eram ou falhas catastróficas ou runs tão explosivas que redefiniam o que era possível. Não havia meio-termo no Caos.",
      "A maioria dos jogadores experientes aprendeu a tratar os Curingas do Caos como componentes voláteis: úteis apenas se todo o resto da build fosse estável o suficiente para absorver a variância. Os que mais amavam o caos, porém, construíam runs inteiras em torno dele — confiando que o universo, dado chances suficientes, eventualmente se alinha a seu favor.",
      "O Caos ensinou à Odisseia que o controle é uma ilusão. A questão nunca foi se você controlava o resultado. A questão era se você havia construído algo resiliente o suficiente para sobreviver sem controlá-lo.",
    ],
  },
  {
    id: "act3-corruption",
    act: 3,
    groups: ["corruption"],
    title_en: "Act III — Beautiful Decay",
    title_pt: "Ato III — A Decadência Bela",
    subtitle_en: "The highest rewards demand the steepest prices",
    subtitle_pt: "As maiores recompensas exigem os preços mais altos",
    quote_en: "The Corruption does not hide its cost. It shows you exactly what it takes. The players who reach for it anyway — those are the interesting ones.",
    quote_pt: "A Corrupção não esconde seu custo. Mostra exatamente o que cobra. Os jogadores que a alcançam mesmo assim — esses são os interessantes.",
    body_en: [
      "If Chaos was random danger, Corruption was calculated danger. The Corruption Jokers all offered one thing: massive, astronomical power. In exchange, they asked for something equally massive in return.",
      "The Self-Destruct Joker offered +1000 Mult for the current round. It then destroyed itself. Some players never recovered the loss. Others had already won by then.",
      "The Corrupted Code became the most feared card in competitive Odyssey play: it granted a scaling multiplier based on how many Jokers had been destroyed during the run — but it also randomly destroyed one Joker per Ante. Players who ran it tended to build specifically to sacrifice cheap Jokers, keeping their core intact while the Corrupted Code devoured the periphery and grew fat on the destruction.",
      "The Corruption group split the Odyssey's community cleanly in two. On one side: players who found the high-wire act thrilling, who chased the astronomical Mults possible only in deep corruption builds, and who saw losing a run to corruption as part of the aesthetic. On the other side: everyone else.",
      "Both sides agreed on one thing: Corruption was the most alive group in the game.",
    ],
    body_pt: [
      "Se o Caos era perigo aleatório, a Corrupção era perigo calculado. Os Curingas de Corrupção todos ofereciam uma coisa: poder massivo e astronômico. Em troca, pediam algo igualmente massivo.",
      "O Curinga de Autodestruição oferecia +1000 Mult para a rodada atual. Depois se destruía. Alguns jogadores nunca recuperavam a perda. Outros já haviam vencido nesse ponto.",
      "O Código Corrompido tornou-se a carta mais temida no jogo competitivo da Odyssey: concedia um multiplicador escalável baseado em quantos Curingas haviam sido destruídos durante a run — mas também destruía aleatoriamente um Curinga por Ante. Os jogadores que o usavam tendiam a construir especificamente para sacrificar Curingas baratos, mantendo seu núcleo intacto enquanto o Código Corrompido devorava a periferia e engordava com a destruição.",
      "O grupo Corrupção dividiu a comunidade da Odisseia de forma nítida. De um lado: jogadores que achavam o ato de equilibrismo emocionante, que perseguiam os Mults astronômicos possíveis apenas em builds de corrupção profunda, e que viam perder uma run para a corrupção como parte da estética. Do outro lado: todo mundo.",
      "Ambos os lados concordavam em uma coisa: Corrupção era o grupo mais vivo do jogo.",
    ],
  },
  {
    id: "act3-glitch-anomaly",
    act: 3,
    groups: ["glitch", "anomaly"],
    title_en: "Act III — The System Breaks Down",
    title_pt: "Ato III — O Sistema Entra em Colapso",
    subtitle_en: "When the game eats itself and something extraordinary emerges",
    subtitle_pt: "Quando o jogo come a si mesmo e algo extraordinário emerge",
    quote_en: "The Glitch Joker is not malfunctioning. It is functioning exactly as intended. You were just not told what that intention was.",
    quote_pt: "O Curinga Glitch não está com defeito. Está funcionando exatamente como planejado. Só não te disseram qual era essa intenção.",
    body_en: [
      "The Glitch Jokers and the Anomaly Jokers arrived together, in the same corrupted packet of data, and it was immediately unclear which were glitches and which were anomalies. Eventually the Odyssey community decided: Glitches were intentional errors — bugs that had been left in because they were too powerful to remove. Anomalies were unintentional errors — things the game wasn't supposed to do but did anyway.",
      "The Audio Glitch produced a strange sound and gave chips. The Visual Glitch caused the UI to shake when it triggered — a minor cosmetic wink at the player. But the Deep Corruption Glitch locked specific game systems into loops that, in the right build, generated endless chains of Mult.",
      "The Anomaly Jokers were different in character: stranger, more personalized, as if they had opinions about how the game should be played. The Augmented Reality Anomaly prevented enchanted cards from breaking — a mercy that changed how entire deck-building philosophies worked. The Anomalous Echo retroactively changed what had already been triggered, as if it remembered a different version of the hand than the one everyone else saw.",
      "Together, Glitch and Anomaly Jokers made a powerful argument: that the most interesting games are the ones that break their own rules, and that breaking rules is not destruction but evolution.",
    ],
    body_pt: [
      "Os Curingas Glitch e os Curingas Anomalia chegaram juntos, no mesmo pacote corrompido de dados, e foi imediatamente impossível distinguir quais eram glitches e quais eram anomalias. Por fim, a comunidade da Odisseia decidiu: Glitches eram erros intencionais — bugs deixados porque eram poderosos demais para remover. Anomalias eram erros não intencionais — coisas que o jogo não deveria fazer, mas fez de qualquer jeito.",
      "O Glitch de Áudio produzia um som estranho e dava chips. O Glitch Visual fazia a interface tremer quando acionado — um piscar de olhos cosmético para o jogador. Mas o Glitch de Corrupção Profunda travava sistemas de jogo específicos em loops que, na build certa, geravam cadeias intermináveis de Mult.",
      "Os Curingas Anomalia eram diferentes em caráter: mais estranhos, mais personalizados, como se tivessem opiniões sobre como o jogo deveria ser jogado. A Anomalia de Realidade Aumentada impedia cartas encantadas de quebrar — uma misericórdia que mudou como filosofias inteiras de construção de baralho funcionavam. O Eco Anômalo retroativamente mudava o que já havia sido acionado, como se lembrasse uma versão diferente da mão do que a que todo mundo havia visto.",
      "Juntos, os Curingas Glitch e Anomalia fizeram um argumento poderoso: que os jogos mais interessantes são aqueles que quebram suas próprias regras, e que quebrar regras não é destruição, mas evolução.",
    ],
  },

  // ─────────── ACT IV ───────────
  {
    id: "act4-economy",
    act: 4,
    groups: ["economy"],
    title_en: "Act IV — The Long Road: Riches",
    title_pt: "Ato IV — A Longa Jornada: Riquezas",
    subtitle_en: "Gold is power, and power compounds",
    subtitle_pt: "Ouro é poder, e poder se multiplica",
    quote_en: "The Economy Joker doesn't score points. It scores dollars. But in the Odyssey, dollars are points deferred — and deferred long enough, they become something else entirely.",
    quote_pt: "O Curinga de Economia não pontua. Ele pontua dólares. Mas na Odisseia, dólares são pontos adiados — e adiados por tempo suficiente, tornam-se algo completamente diferente.",
    body_en: [
      "The fourth act of the Odyssey — the Long Journey — was the broadest and most human chapter of the epic. Where the earlier acts dealt in cosmic physics and logical paradoxes, Act IV was about life: work, community, luck, endurance.",
      "The Economy Jokers were merchants and investors, thieves and bankers. They understood one truth older than cards: compound interest is magic. The Venture Capitalist Joker gave $2 at end of round for every $10 currently held. Modest at first. Devastating at $80. Incomprehensible above $200.",
      "The Black Market Broker transformed discarded Jokers into gold. The Tax Collector took a cut of everything you spent in the shop and returned it as interest at the start of the next round. The Loan Shark offered immediate cash in exchange for increasing costs — a deal that seemed terrible until the build was complete.",
      "Economy Jokers ensured that even the most chip-heavy, Mult-obsessed run had to keep one eye on the financial layer — because in the Odyssey, running out of gold was just another way of running out of time.",
    ],
    body_pt: [
      "O quarto ato da Odisseia — a Longa Jornada — foi o capítulo mais amplo e mais humano do épico. Onde os atos anteriores lidavam com física cósmica e paradoxos lógicos, o Ato IV era sobre vida: trabalho, comunidade, sorte, resistência.",
      "Os Curingas de Economia eram comerciantes e investidores, ladrões e banqueiros. Compreendiam uma verdade mais antiga do que as cartas: juros compostos são mágica. O Curinga Capitalista de Risco dava $2 no final de cada rodada por cada $10 em posse. Modesto no início. Devastador com $80. Incompreensível acima de $200.",
      "O Corretor do Mercado Negro transformava Curingas descartados em ouro. O Cobrador de Impostos retirava uma parte de tudo que você gastava na loja e a devolvia com juros no início da próxima rodada. O Agiota oferecia dinheiro imediato em troca de custos crescentes — um acordo que parecia terrível até a build estar completa.",
      "Os Curingas de Economia garantiam que mesmo a run mais focada em chips e Mult tivesse que manter um olho na camada financeira — pois na Odisseia, ficar sem ouro era apenas outra maneira de ficar sem tempo.",
    ],
  },
  {
    id: "act4-professions-social-tribal",
    act: 4,
    groups: ["professions", "social", "tribal"],
    title_en: "Act IV — The Long Road: People",
    title_pt: "Ato IV — A Longa Jornada: Pessoas",
    subtitle_en: "No hero travels alone",
    subtitle_pt: "Nenhum herói viaja sozinho",
    quote_en: "The Tribal Joker doesn't care about your strategy. It only asks one question: are you bringing enough of us?",
    quote_pt: "O Curinga Tribal não se importa com sua estratégia. Ele faz apenas uma pergunta: você está trazendo suficientes de nós?",
    body_en: [
      "Three groups defined the human element of the Odyssey's fourth act: Professions, Social, and Tribal. Together, they made the argument that no journey is completed alone.",
      "The Professions Jokers were the craftspeople of the odyssey: the Architect who built bonus structures around card positioning, the Alchemist who transmuted low-value cards into scoring machines, the Surgeon who removed negative effects with gentle precision, and the Smuggler who brought forbidden cards through the shop at reduced cost. Each Profession felt like a role in an adventuring party.",
      "The Social Jokers scaled with the size of your Joker collection. A lone Social Joker was barely noticeable. Eight Social Jokers formed a snowball that crushed everything in its path. They rewarded the collector, the hoarder, the player who said yes to every Joker offered and found a way to make them all fit.",
      "The Tribal Jokers were the most community-driven: each had a tribe, and each tribe grew stronger as more members joined. A Tribal Warrior of the Flame tribe was generic alone. With two others from the Flame tribe, its bonus doubled. With five, the Flame tribe became one of the strongest forces in the run.",
      "Professions, Social, and Tribal Jokers were the Odyssey's love letter to the idea that identity — what you are, who you're with, what group you belong to — is itself a kind of power.",
    ],
    body_pt: [
      "Três grupos definiram o elemento humano do quarto ato da Odisseia: Profissões, Social e Tribal. Juntos, fizeram o argumento de que nenhuma jornada é completada sozinha.",
      "Os Curingas de Profissões eram os artesãos da odisseia: o Arquiteto que construía estruturas de bônus em torno do posicionamento de cartas, o Alquimista que transmutava cartas de baixo valor em máquinas de pontuação, o Cirurgião que removia efeitos negativos com delicada precisão, e o Contrabandista que trazia cartas proibidas pela loja a custo reduzido. Cada Profissão parecia um papel em um grupo de aventureiros.",
      "Os Curingas Sociais escalavam com o tamanho de sua coleção de Curingas. Um Curinga Social solitário dificilmente era notado. Oito Curingas Sociais formavam uma bola de neve que esmagava tudo em seu caminho. Recompensavam o colecionador, o acumulador, o jogador que dizia sim a cada Curinga oferecido e encontrava uma forma de encaixar todos.",
      "Os Curingas Tribais eram os mais orientados à comunidade: cada um tinha uma tribo, e cada tribo crescia mais forte à medida que mais membros se uniam. Um Guerreiro Tribal da tribo Chama era genérico sozinho. Com dois outros da tribo Chama, seu bônus dobrava. Com cinco, a tribo Chama tornava-se uma das forças mais poderosas da run.",
      "Os Curingas de Profissões, Social e Tribal eram a carta de amor da Odisseia à ideia de que identidade — o que você é, com quem está, a qual grupo pertence — é em si uma forma de poder.",
    ],
  },
  {
    id: "act4-elemental",
    act: 4,
    groups: ["elemental"],
    title_en: "Act IV — The Long Road: Elements",
    title_pt: "Ato IV — A Longa Jornada: Elementos",
    subtitle_en: "Fire, ice, lightning — the four suits resonate with the cosmos",
    subtitle_pt: "Fogo, gelo, trovão — os quatro naipes ressoam com o cosmos",
    quote_en: "The Elemental Jokers do not see playing cards. They see Hearts aflame, Diamonds crystallized to ice, Spades crackling with storm, and Clubs raising from fertile earth.",
    quote_pt: "Os Curingas Elementais não veem cartas de baralho. Veem Copas em chamas, Ouros cristalizados em gelo, Espadas faiscando com tempestade e Paus brotando da terra fértil.",
    body_en: [
      "At the midpoint of the journey, the Odyssey discovered that the cosmos was not made of mathematics alone — it was made of sensation. Fire. Ice. Storm. Earth. The Elemental Jokers were the physicality at the heart of the digital.",
      "The Fire Jokers synergized with Hearts — the suit of emotion and heat. Flame Strike multiplied Mult for every Heart played consecutively. The Molten Core accumulated temperature across rounds, going dormant in hands without Hearts and exploding in those that used nothing but.",
      "The Ice Jokers embraced Diamonds — cold, crystalline, calculated precision. Absolute Zero converted chips into crit-threshold bonuses, rewarding players who built hands with mathematical perfection.",
      "Lightning answered to Spades — precise, violent, unexpected. The Storm Breaker was a gamble: it chose a random Spade in the hand and struck it for triple score. Most runs it was average. Occasionally it hit the Ace of Spades and ended the round before it technically started.",
      "Earth — the Clubs — was the slowest and most forgiving. Earth Jokers grew over time, accruing mineral value with every Ante. Slow to build, nearly impossible to stop once established.",
    ],
    body_pt: [
      "No ponto médio da jornada, a Odisseia descobriu que o cosmos não era feito apenas de matemática — era feito de sensação. Fogo. Gelo. Tempestade. Terra. Os Curingas Elementais eram a fisicalidade no coração do digital.",
      "Os Curingas de Fogo faziam sinergia com Copas — o naipe da emoção e do calor. Golpe de Chama multiplicava o Mult para cada Copa jogada consecutivamente. O Núcleo Fundido acumulava temperatura ao longo das rodadas, ficando dormente em mãos sem Copas e explodindo naquelas que usavam apenas esse naipe.",
      "Os Curingas de Gelo abraçavam Ouros — precisão fria, cristalina, calculada. Zero Absoluto convertia chips em bônus de limiar de crítico, recompensando jogadores que construíam mãos com perfeição matemática.",
      "Trovão respondia a Espadas — preciso, violento, inesperado. O Quebrador de Tempestade era uma aposta: escolhia uma Espada aleatória na mão e a golpeava por pontuação tripla. Na maioria das runs era mediano. Ocasionalmente acertava o Ás de Espadas e encerrava a rodada antes de ela tecnicamente começar.",
      "A Terra — os Paus — era o elemento mais lento e mais tolerante. Os Curingas de Terra cresciam com o tempo, acumulando valor mineral a cada Ante. Lentos de construir, quase impossíveis de parar uma vez estabelecidos.",
    ],
  },
  {
    id: "act4-luck-time-cond-pos-hand",
    act: 4,
    groups: ["luck_and_probability", "time", "cond", "pos", "hand_and_discard"],
    title_en: "Act IV — The Long Road: Craft",
    title_pt: "Ato IV — A Longa Jornada: Ofício",
    subtitle_en: "Patience, precision and the mastery of circumstance",
    subtitle_pt: "Paciência, precisão e domínio das circunstâncias",
    quote_en: "The Luck Joker does not trust the player. The Condition Joker does not trust anyone. The Positioning Joker trusts the player completely — and expects perfection in return.",
    quote_pt: "O Curinga de Sorte não confia no jogador. O Curinga de Condição não confia em ninguém. O Curinga de Posicionamento confia completamente no jogador — e espera perfeição em troca.",
    body_en: [
      "Five groups defined the craft chapter of the Odyssey's fourth act: Luck & Probability, Time, Conditions, Positioning, and Hand & Discard. These were the Jokers of the journeyman — not flashy, not cosmic, but deeply rewarding for patients players who learned to read the run.",
      "Luck & Probability Jokers were the coin-flippers and the loaded-dice throwers of the Odyssey. Unlike Chaos (which was entirely random), they offered controllable probability — ways to increase the odds of triggers from other Jokers, to reroll failed lucky checks, to build decks where 'luck' became more certain than certainty.",
      "Time Jokers were accumulators — cards that grew silently across the run, one counter per round, until they reached a threshold and transformed. The Hourglass Joker was a run-changer if it survived to Ante 6. The patience required to carry it that long was itself the challenge.",
      "Condition Jokers were the most demanding: powerful bonuses, but only when a specific state was maintained. One gave +200 Mult per hand, but only if the deck contained no face cards. Another doubled all Mult, but only on rounds with no discards. The Odyssey called them 'Conditional Legends' — available to all, attainable by few.",
      "Positioning Jokers rewarded perfect play: bonuses for first card played, bonuses for last card played, bonuses for playing cards in exact ascending order. Hand & Discard Jokers manipulated the fundamental resources of every round. Together, these five groups represented the 'craft layer' of the Odyssey — the part that rewarded mastery.",
    ],
    body_pt: [
      "Cinco grupos definiram o capítulo de ofício do quarto ato da Odisseia: Sorte e Probabilidade, Tempo, Condições, Posicionamento e Mão e Descarte. Esses eram os Curingas do artesão — não ostentosos, não cósmicos, mas profundamente recompensadores para jogadores pacientes que aprenderam a ler a run.",
      "Os Curingas de Sorte e Probabilidade eram os lançadores de moedas e os dados viciados da Odisseia. Ao contrário do Caos (que era inteiramente aleatório), eles ofereciam probabilidade controlável — formas de aumentar as chances de acionamentos de outros Curingas, de rerrolar verificações de sorte malsucedidas, de construir baralhos onde 'sorte' se tornava mais certa do que a própria certeza.",
      "Os Curingas de Tempo eram acumuladores — cartas que cresciam silenciosamente ao longo da run, um contador por rodada, até atingirem um limiar e se transformarem. O Curinga da Ampulheta era um divisor de águas se sobrevivesse ao Ante 6. A paciência necessária para carregá-lo até lá era o desafio em si.",
      "Os Curingas de Condição eram os mais exigentes: bônus poderosos, mas apenas quando um estado específico era mantido. Um dava +200 Mult por mão, mas apenas se o baralho não contivesse cartas de figuras. Outro dobrava todo o Mult, mas apenas em rodadas sem descartes. A Odisseia os chamava de 'Lendas Condicionais' — disponíveis para todos, alcançáveis por poucos.",
      "Os Curingas de Posicionamento recompensavam o jogo perfeito: bônus para a primeira carta jogada, bônus para a última, bônus para jogar cartas em ordem ascendente exata. Os Curingas de Mão e Descarte manipulavam os recursos fundamentais de cada rodada. Juntos, esses cinco grupos representavam a 'camada de ofício' da Odisseia — a parte que recompensava a maestria.",
    ],
  },

  // ─────────── ACT V ───────────
  {
    id: "act5-transformations",
    act: 5,
    groups: ["transformations"],
    title_en: "Act V — The Great Change",
    title_pt: "Ato V — A Grande Mudança",
    subtitle_en: "Everything that survives the journey is transformed by it",
    subtitle_pt: "Tudo que sobrevive à jornada é transformado por ela",
    quote_en: "At the end of the run, you are not the same player who started it. Neither are your cards.",
    quote_pt: "No final da run, você não é o mesmo jogador que a começou. Suas cartas também não.",
    body_en: [
      "The fifth act of the Odyssey began with a transformation — specifically, the Transformation Jokers, whose defining quality was this: they changed. Not their position on the field, not their cost, but their fundamental nature.",
      "The Cocoon Joker began each run as a negligible +5 Chips. At Ante 4, it metamorphosed into a 1-Mult-per-hand tracker. At Ante 7, it shed that skin too, becoming a full X-Mult multiplier that remembered every hand played in both previous forms.",
      "The Evolutionary Deck, one of the most sought-after starting decks in the Odyssey, synergized specifically with Transformation Jokers — it gave each of them an additional evolution step, unlocking a fourth form that no tooltip described. Players had to discover it by playing.",
      "Transformation Jokers were the Odyssey's meditation on growth — the idea that the most important changes happen not in dramatic singular moments but through the slow accumulation of pressure, patience, and repeated action across many rounds.",
    ],
    body_pt: [
      "O quinto ato da Odisseia começou com uma transformação — especificamente, os Curingas de Transformações, cuja qualidade definidora era esta: eles mudavam. Não sua posição no campo, não seu custo, mas sua natureza fundamental.",
      "O Curinga Casulo começava cada run como um insignificante +5 Chips. No Ante 4, metamorfoseava em um rastreador de 1 Mult por mão. No Ante 7, shed essa casca também, tornando-se um multiplicador X-Mult completo que se lembrava de cada mão jogada nas duas formas anteriores.",
      "O Baralho Evolucionário, um dos baralhos iniciais mais procurados na Odisseia, fazia sinergia especificamente com Curingas de Transformação — dava a cada um deles uma etapa adicional de evolução, desbloqueando uma quarta forma que nenhuma dica de ferramenta descrevia. Os jogadores tinham que descobrir jogando.",
      "Os Curingas de Transformação eram a meditação da Odisseia sobre crescimento — a ideia de que as mudanças mais importantes não acontecem em momentos dramáticos singulares, mas através da lenta acumulação de pressão, paciência e ação repetida ao longo de muitas rodadas.",
    ],
  },
  {
    id: "act5-final",
    act: 5,
    groups: ["final"],
    title_en: "Act V — The Odyssey's End",
    title_pt: "Ato V — O Fim da Odisseia",
    subtitle_en: "Every journey demands a conclusion — and a choice",
    subtitle_pt: "Toda jornada exige uma conclusão — e uma escolha",
    quote_en: "The Odyssey Joker does not belong to you. It belongs to everyone who has ever played this run. You are simply the one holding it right now.",
    quote_pt: "O Curinga Odisseia não pertence a você. Pertence a todos que já jogaram esta run. Você é simplesmente quem o está segurando agora.",
    body_en: [
      "At the end of the Odyssey — after the Singularity, through the Fracture, past the War, beyond the Long Road and the Transformation — stood a single door. And behind it, the Final Jokers.",
      "There were only a handful of them. Each was Legendary. Each cost more than most players had ever accumulated in a run. And each one did something that no other group dared: it ended the conversation.",
      "The Odyssey Joker — the card that named the mod itself — was the final argument. Every Joker you had sacrificed, every Blind you had defeated, every hand you had played was woven into its effect. It scored based on the totality of the run. Not the current hand. The entire run.",
      "Other Final Jokers were equally decisive. The Omega Collapse triggered once and only once — at the moment of final victory — and converted every remaining chip, every dollar, every counter on every Joker into a single, unified score. The Final Hand held the record for highest single-round score in Odyssey history. The Endgame Protocol rewrote the Ante structure of the entire run, permanently scaling every score backward and forward in time.",
      "The Final Jokers were not sought. They were earned. You did not find the Odyssey Joker by looking for it. You found it by finishing the story — by seeing the Odyssey through, from before the first card to after the last hand. Only then did it appear.",
      "And when it did, it was exactly enough.",
    ],
    body_pt: [
      "No fim da Odisseia — após a Singularidade, através da Fratura, além da Guerra, pela Longa Jornada e a Transformação — havia uma única porta. E atrás dela, os Curingas Finais.",
      "Havia apenas um punhado deles. Cada um era Lendário. Cada um custava mais do que a maioria dos jogadores havia acumulado em uma run. E cada um fazia algo que nenhum outro grupo ousava: encerrava a conversa.",
      "O Curinga Odisseia — a carta que nomeou o próprio mod — era o argumento final. Cada Curinga que você tinha sacrificado, cada Blind que havia derrotado, cada mão que havia jogado estava tecida em seu efeito. Pontuava com base na totalidade da run. Não na mão atual. Na run inteira.",
      "Outros Curingas Finais eram igualmente decisivos. O Colapso Ômega acionava uma única vez — no momento da vitória final — e convertia cada chip restante, cada dólar, cada contador em cada Curinga em uma única pontuação unificada. A Mão Final detinha o recorde de maior pontuação de rodada única na história da Odyssey. O Protocolo Endgame reescrevia a estrutura de Ante de toda a run, escalando permanentemente cada pontuação para trás e para frente no tempo.",
      "Os Curingas Finais não eram buscados. Eram conquistados. Você não encontrava o Curinga Odisseia procurando por ele. Você o encontrava terminando a história — vendo a Odisseia até o fim, de antes da primeira carta até depois da última mão. Só então ele aparecia.",
      "E quando aparecia, era exatamente suficiente.",
    ],
  },

  // ─────────── EPILOGUE ───────────
  {
    id: "epilogue",
    act: 6,
    groups: [],
    title_en: "Epilogue — The Next Deal",
    title_pt: "Epílogo — A Próxima Distribuição",
    subtitle_en: "The end of one Odyssey is the beginning of another",
    subtitle_pt: "O fim de uma Odisseia é o começo de outra",
    quote_en: "The dealer shuffles the deck again. The Jokers watch with knowing smiles. They have seen this story a thousand times. And it is always different.",
    quote_pt: "O dealer embaralha o baralho novamente. Os Curingas observam com sorrisos cúmplices. Eles já viram essa história mil vezes. E é sempre diferente.",
    body_en: [
      "Every Odyssey run ends. The cards are collected, reshuffled, redistributed. The score — whatever it was — is recorded somewhere in the infinite ledger of the cosmos and forgotten by everyone except the player who earned it.",
      "But the Jokers remember.",
      "The Singularity Jokers remember the first implosion. The Temporal Jokers remember the hands already played. The Final Jokers remember that they were, once, the last thing standing between a player and defeat — and that the player chose to keep going anyway.",
      "The Tarots whisper to the Planets. The Spectrals haunt the Blinds. The Vouchers sit in the shop like old shopkeepers, waiting to be seen. Every element of the Odyssey carries the weight of the story — not because it was designed to, but because story is what games accumulate when people care about them.",
      "This is the Odyssey. It never truly ends. It only starts again.",
      "Pick up the cards. Begin.",
    ],
    body_pt: [
      "Toda run da Odisseia termina. As cartas são recolhidas, embaralhadas de novo, redistribuídas. A pontuação — seja lá qual for — é registrada em algum lugar no livro infinito do cosmos e esquecida por todos, exceto pelo jogador que a conquistou.",
      "Mas os Curingas se lembram.",
      "Os Curingas de Singularidade se lembram da primeira implosão. Os Curingas Temporais se lembram das mãos já jogadas. Os Curingas Finais se lembram de que foram, uma vez, a última coisa entre um jogador e a derrota — e que o jogador escolheu continuar mesmo assim.",
      "Os Tarôs sussurram para os Planetas. Os Espectrais assombram os Blinds. Os Cupons ficam na loja como velhos lojistas, esperando ser vistos. Todo elemento da Odisseia carrega o peso da história — não porque foi projetado para isso, mas porque história é o que os jogos acumulam quando as pessoas se importam com eles.",
      "Esta é a Odisseia. Ela nunca realmente termina. Ela apenas começa de novo.",
      "Pegue as cartas. Comece.",
    ],
  },
];

// ──────────────────────────────────────────────────────────────
// CONSUMABLE LORE — flavour text for tarots, planets, spectrals
// ──────────────────────────────────────────────────────────────

export const consumableLoreByType: Record<string, { intro_en: string; intro_pt: string }> = {
  tarot: {
    intro_en:
      "The Tarots of the Odyssey are not cards of fortune — they are cards of intervention. Each arcana represents a force that reached into the run and changed the shape of what was possible. The readers of these cards are not passive observers. They are architects.",
    intro_pt:
      "Os Tarôs da Odisseia não são cartas de adivinhação — são cartas de intervenção. Cada arcano representa uma força que se infiltrou na run e mudou a forma do que era possível. Os leitores dessas cartas não são observadores passivos. São arquitetos.",
  },
  planet: {
    intro_en:
      "The Planets of the Odyssey are not named after Roman gods by accident. They are forces of gravity — each one exerting its pull on a specific hand type, dragging its chip value and Mult values upward into astronomical territory. To master the Planets is to understand that every poker hand has a sky above it, and that sky has no ceiling.",
    intro_pt:
      "Os Planetas da Odisseia não são nomeados após deuses romanos por acidente. São forças de gravidade — cada um exercendo sua atração sobre um tipo de mão específico, arrastando seus valores de chip e Mult para território astronômico. Dominar os Planetas é entender que toda mão de pôquer tem um céu acima dela, e esse céu não tem teto.",
  },
  spectral: {
    intro_en:
      "The Spectrals are the most feared consumables in the Odyssey — not because they are always destructive, but because they demand sacrifice. A Spectral card will give you something extraordinary. It will also take something away. The transaction is non-negotiable. The Spectrals of the Odyssey reflect a cosmic truth: power is never created from nothing. It is always transformed from something else.",
    intro_pt:
      "Os Espectrais são os consumíveis mais temidos da Odisseia — não porque são sempre destrutivos, mas porque exigem sacrifício. Uma carta Espectral lhe dará algo extraordinário. Também tirará algo. A transação é inegociável. Os Espectrais da Odisseia refletem uma verdade cósmica: o poder nunca é criado do nada. Ele sempre é transformado de outra coisa.",
  },
};

// Quick lookup: group -> chapter id
export const groupToChapter: Record<string, string> = {
  singularity: "act1-singularity",
  quantum: "act1-quantum",
  celestial: "act1-celestial",
  temporal: "act2-temporal",
  dimensions: "act2-dimensions",
  paradox: "act2-paradox",
  chaos: "act3-chaos",
  corruption: "act3-corruption",
  glitch: "act3-glitch-anomaly",
  anomaly: "act3-glitch-anomaly",
  economy: "act4-economy",
  professions: "act4-professions-social-tribal",
  social: "act4-professions-social-tribal",
  tribal: "act4-professions-social-tribal",
  elemental: "act4-elemental",
  luck_and_probability: "act4-luck-time-cond-pos-hand",
  time: "act4-luck-time-cond-pos-hand",
  cond: "act4-luck-time-cond-pos-hand",
  pos: "act4-luck-time-cond-pos-hand",
  hand_and_discard: "act4-luck-time-cond-pos-hand",
  transformations: "act5-transformations",
  final: "act5-final",
};
