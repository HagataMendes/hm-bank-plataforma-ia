/* ============================================================
   Plataforma de IA · HM Bank
   React 18 + TypeScript · Vite
   ============================================================ */
import React from 'react';

type Area = 'tech' | 'business';

interface AgentDef {
  id: string;
  name: string;
  subtitle: string;
  area: Area | 'orchestrator';
  color: string;
  glyph: React.FC<GlyphProps>;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  text: string;
  time: string;
  trace?: string[];
  sources?: string[];
  confidence?: number;
  kind?: 'upload' | 'sql' | 'nosql' | 'ml';
  status?: 'indexing' | 'done';
  fileName?: string;
  fileSizeKB?: number;
  pages?: number;
  chunks?: number;
  sqlQuery?: string;
  columns?: string[];
  rows?: (string | number)[][];
  rowCount?: number;
  execMs?: number;
  nosqlTable?: string;
  nosqlKey?: string;
  nosqlItem?: Record<string, string>;
  mlModel?: string;
  mlScoreLabel?: string;
  mlScore?: number;
  mlFeatures?: { name: string; impact: number }[];
  thinkMs?: number;
}

interface DocContext { name: string; pages: number; chunks: number; }

/* ---------------- icon glyphs ---------------- */
type GlyphProps = { size: number; color?: string };
const Arc: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13.4" stroke={color} strokeOpacity=".38" strokeWidth="1" />
    <text x="16" y="21.2" textAnchor="middle" fontFamily="'Fraunces',Georgia,serif" fontSize="14" fontWeight="600" fill={color} letterSpacing="-.5">HM</text>
    <path d="M9.5 24.6c3.2 1.7 9.8 1.7 13 0" stroke={color} strokeOpacity=".42" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
const GDev: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><path d="m9 18-6-6 6-6M15 6l6 6-6 6" /></svg>
);
const GScientist: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><path d="M9 3v6l-6 10a2 2 0 0 0 2 3h14a2 2 0 0 0 2-3L15 9V3M9 3h6" /></svg>
);
const GAnalyst: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><path d="M3 3v18h18M8 17V11M13 17V7M18 17v-4" /></svg>
);
const GPlatform: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><circle cx="7" cy="7" r=".6" fill={color} /><circle cx="7" cy="17" r=".6" fill={color} /></svg>
);
const GLegal: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><path d="M12 3v18M5 8l-3 6a4 4 0 0 0 8 0l-3-6h-2ZM19 8l-3 6a4 4 0 0 0 8 0l-3-6h-2ZM5 8h14" /></svg>
);
const GFinance: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5c0-1.4 1.2-2 2.5-2s2.5.7 2.5 2-1 1.7-2.5 2-2.5.7-2.5 2 1.2 2 2.5 2 2.5-.6 2.5-2" /></svg>
);
const GHR: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5M17 8a3 3 0 1 1 0 6M22 20c0-2.6-2-4.6-4.5-5.3" /></svg>
);
const GCRM: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
const GRisk: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4"><path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z" /></svg>
);
const GBetoBot: React.FC<GlyphProps> = ({ size, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2v3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="3" r="1.35" fill={color} />
    <rect x="4" y="6.2" width="16" height="12.8" rx="4.2" stroke={color} strokeWidth="1.7" />
    <path d="M1.6 11h2.4M20 11h2.4" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="9" cy="12.4" r="1.55" fill={color} />
    <circle cx="15" cy="12.4" r="1.55" fill={color} />
    <path d="M8.7 16c1.1.85 5.5.85 6.6 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ---------------- agent registry ---------------- */
const AGENTS: AgentDef[] = [
  { id: 'beto', name: 'Beto', subtitle: 'Orquestrador · sempre disponível', area: 'orchestrator', color: '#00A0E3', glyph: GBetoBot },
  { id: 'dev', name: 'Engenharia de Software', subtitle: 'APIs, IaC, code review', area: 'tech', color: '#00A0E3', glyph: GDev },
  { id: 'cientista', name: 'Cientista de Dados', subtitle: 'Modelos & experimentos', area: 'tech', color: '#0B7FB5', glyph: GScientist },
  { id: 'analista', name: 'Analista de Dados', subtitle: 'SQL, ETL, dashboards', area: 'tech', color: '#2B5FA8', glyph: GAnalyst },
  { id: 'plataforma', name: 'Plataforma & DevOps', subtitle: 'CI/CD, cloud, observabilidade', area: 'tech', color: '#164A8C', glyph: GPlatform },
  { id: 'juridico', name: 'Jurídico', subtitle: 'Contratos & compliance', area: 'business', color: '#0E5C52', glyph: GLegal },
  { id: 'financeiro', name: 'Financeiro', subtitle: 'FP&A, orçamento, custos', area: 'business', color: '#0B4A42', glyph: GFinance },
  { id: 'rh', name: 'RH', subtitle: 'Políticas & benefícios', area: 'business', color: '#146357', glyph: GHR },
  { id: 'crm', name: 'CRM Comercial', subtitle: 'Clientes & oportunidades', area: 'business', color: '#0D554B', glyph: GCRM },
  { id: 'risco', name: 'Risco & Compliance', subtitle: 'Crédito & políticas', area: 'business', color: '#093D36', glyph: GRisk },
];
const agentById = (id: string) => AGENTS.find(a => a.id === id)!;

/* ---------------- seeded per-agent threads ---------------- */
const SEED_THREADS: Record<string, ChatMessage[]> = {
  beto: [
    { id: 'b1', role: 'user', time: '09:14', text: 'Como a plataforma decide qual agente deve responder minha pergunta?' },
    { id: 'b2', role: 'agent', time: '09:14', confidence: 92,
      text: 'Boa pergunta! Eu leio o que você escreveu, decido se respondo na hora ou chamo um especialista — de tecnologia ou de negócios — e te devolvo tudo numa resposta só, com a origem de cada informação registrada pra auditoria.',
      trace: ['Classificando intenção da pergunta', 'Selecionando o agente especialista', 'Gerando resposta com o LLM da plataforma'] },
  ],
  dev: [
    { id: 'd1', role: 'user', time: '08:47', text: 'Preciso de um endpoint para scoring de crédito, pode ajudar?' },
    { id: 'd2', role: 'agent', time: '08:48', confidence: 89,
      text: 'Bora! Consigo desenhar o endpoint com você, sugerir o schema de request e response, já deixar os testes automatizados prontos e revisar a infraestrutura antes de subir pro pipeline. O serviço similar mais próximo roda hoje com latência média de 42ms e SLA de 99.95% — dá pra usar como referência.',
      trace: ['Classificando intenção da pergunta', 'Buscando padrões no repositório interno', 'Gerando resposta com o LLM da plataforma'],
      sources: ['api-guidelines-hmbank.md', 'template-fastapi-service'] },
  ],
  cientista: [
    { id: 'c1', role: 'user', time: '10:02', text: 'Como validar um novo modelo de propensão a churn antes de subir pra produção?' },
    { id: 'c2', role: 'agent', time: '10:03', confidence: 84,
      text: 'Consigo te ajudar, sim! A gente monta a engenharia de atributos, compara alguns modelos com validação cruzada e registra tudo no tracking da plataforma. O modelo atual em produção está com AUC de 0.87 e recall de 79% na base de validação — bom benchmark pro desafiante.',
      trace: ['Classificando intenção da pergunta', 'Consultando o histórico de experimentos', 'Gerando resposta com o LLM da plataforma'],
      sources: ['mlflow-tracking-server', 'dataset-churn-v4.parquet'] },
  ],
  analista: [
    { id: 'a1', role: 'user', time: '11:20', text: 'Qual é o limite atual e o histórico de transações da carteira CX-4471?' },
    { id: 'a2', role: 'agent', time: '11:20', confidence: 93, kind: 'sql', execMs: 118,
      trace: ['Classificando intenção da pergunta', 'Gerando comando SQL', 'Consultando o banco relacional (RDS/PostgreSQL)'],
      sqlQuery: "SELECT t.data_transacao, t.tipo, t.valor, c.limite_credito\nFROM transacoes t\nJOIN carteira_clientes c ON c.id = t.carteira_id\nWHERE c.id = 'CX-4471'\nORDER BY t.data_transacao DESC\nLIMIT 5;",
      columns: ['data_transacao', 'tipo', 'valor (R$)', 'limite_credito (R$)'],
      rows: [
        ['2026-09-18', 'compra', '1.240,00', '350.000,00'],
        ['2026-09-15', 'pagamento', '-3.800,00', '350.000,00'],
        ['2026-09-09', 'compra', '2.150,00', '350.000,00'],
        ['2026-09-02', 'estorno', '-410,00', '350.000,00'],
        ['2026-08-27', 'compra', '5.600,00', '350.000,00'],
      ],
      rowCount: 5,
      text: 'A carteira CX-4471 está com limite de R$ 350.000,00 aprovado. Nas últimas 5 transações o saldo se manteve estável, sem nenhuma ocorrência acima do limite.',
      sources: ['rds-prod.carteira_clientes', 'rds-prod.transacoes'] },
  ],
  plataforma: [
    { id: 'p1', role: 'user', time: '07:55', text: 'O pipeline de deploy está com falha intermitente, pode investigar?' },
    { id: 'p2', role: 'agent', time: '07:56', confidence: 87,
      text: 'Dei uma olhada: nas últimas 200 execuções a taxa de sucesso do pipeline está em 99.2%, com rollback automático em menos de 90 segundos quando necessário. Encontrei um alarme de observabilidade relacionado a esse problema — quer que eu detalhe?',
      trace: ['Classificando intenção da pergunta', 'Inspecionando pipeline e métricas', 'Gerando resposta com o LLM da plataforma'],
      sources: ['cloudwatch-alarms', 'pipeline-config.yaml'] },
  ],
  juridico: [
    { id: 'j1', role: 'user', time: '13:10', text: 'Preciso entender a cláusula de rescisão do contrato XPTO.' },
    { id: 'j2', role: 'agent', time: '13:11', confidence: 78,
      text: 'Encontrei uma cláusula equivalente na seção 8.2 dos nossos modelos-padrão, com aviso prévio de 30 dias e multa de 10% sobre o saldo remanescente. Só um alerta: como envolve obrigação com terceiros, vale passar por uma revisão humana antes de formalizar.',
      trace: ['Classificando intenção da pergunta', 'Buscando na base vetorial de contratos', 'Gerando resposta com o LLM da plataforma'],
      sources: ['modelos-contratuais-v3.pdf', 'parecer-juridico-2024'] },
  ],
  financeiro: [
    { id: 'f1', role: 'user', time: '14:32', text: 'Como está a variação do centro de custo de TI esse mês?' },
    { id: 'f2', role: 'agent', time: '14:32', confidence: 90,
      text: 'Dei uma olhada no fechamento: o centro de custo de TI fechou em R$ 1,82 milhão, 3,4% abaixo do orçado (R$ 1,88 milhão) — a maior economia veio de infraestrutura cloud. Posso detalhar linha por linha ou projetar o impacto no trimestre, se quiser.',
      trace: ['Classificando intenção da pergunta', 'Consultando o fechamento contábil', 'Gerando resposta com o LLM da plataforma'],
      sources: ['fechamento-mensal.xlsx', 'orcamento-ti-2026'] },
  ],
  rh: [
    { id: 'h1', role: 'user', time: '09:40', text: 'Um colaborador em regime híbrido pode solicitar home office integral?' },
    { id: 'h2', role: 'agent', time: '09:41', confidence: 82,
      text: 'Encontrei a política nº 4.3 que se aplica ao seu caso. Existe uma exceção prevista pra quem está no regime híbrido há mais de 6 meses — te explico as condições?',
      trace: ['Classificando intenção da pergunta', 'Buscando na base vetorial de políticas', 'Gerando resposta com o LLM da plataforma'],
      sources: ['politica-trabalho-hibrido.pdf'] },
  ],
  crm: [
    { id: 'r1', role: 'user', time: '15:05', text: 'Pode preparar um resumo do relacionamento com o cliente Acme?' },
    { id: 'r2', role: 'agent', time: '15:05', confidence: 88,
      text: 'Preparei um resumo rapidinho: a Acme tem R$ 890 mil em produtos ativos e 2 oportunidades em aberto no pipeline, somando R$ 340 mil — boas pra você levar na próxima reunião.',
      trace: ['Classificando intenção da pergunta', 'Consultando o CRM interno', 'Gerando resposta com o LLM da plataforma'],
      sources: ['crm-acme-360', 'pipeline-oportunidades'] },
  ],
  risco: [
    { id: 'k1', role: 'user', time: '16:18', text: 'O cliente está dentro do limite de crédito aprovado?' },
    { id: 'k2', role: 'agent', time: '16:19', confidence: 94,
      text: 'Olhei o histórico da carteira: exposição atual de R$ 2,4 milhões, dentro do limite de R$ 3,5 milhões aprovado — 68% de utilização. Pelas políticas vigentes, esse cliente está regular; só recomendo revisão manual pros casos acima do percentil 95.',
      trace: ['Classificando intenção da pergunta', 'Buscando na base vetorial de crédito', 'Gerando resposta com o LLM da plataforma'],
      sources: ['politica-credito-v3.pdf', 'manual-risco-corp.md'] },
    { id: 'k3', role: 'user', time: '16:40', text: 'Qual a probabilidade de inadimplência desse cliente nos próximos 90 dias?' },
    { id: 'k4', role: 'agent', time: '16:41', confidence: 91, kind: 'ml',
      mlModel: 'Regressão Logística · Risco de Crédito', mlScoreLabel: 'Probabilidade de inadimplência', mlScore: 0.14,
      mlFeatures: [{ name: 'Histórico de pagamento', impact: 38 }, { name: 'Utilização do limite', impact: 27 }, { name: 'Tempo de relacionamento', impact: 19 }, { name: 'Renda declarada', impact: 16 }],
      trace: ['Classificando intenção da pergunta', 'Executando modelo clássico de ML', 'Gerando resposta com o LLM da plataforma'],
      text: 'O modelo clássico (regressão logística) estimou 14% de probabilidade de inadimplência em 90 dias — classificado como risco baixo. O fator de maior peso é o histórico de pagamento, seguido da utilização do limite.',
      sources: ['modelo-risco-credito-v7', 'politica-credito-v3.pdf'] },
  ],
};

const REPLIES: Record<string, { text: string; trace: string[]; sources?: string[] }> = {
  beto: { text: 'Entendi! Já identifiquei o que você precisa e, se foi o caso, chamei o especialista certo — a resposta abaixo já vem com o contexto certo e rastreável.', trace: ['Classificando intenção da pergunta', 'Selecionando o agente especialista', 'Gerando resposta com o LLM da plataforma'] },
  dev: { text: 'Anotado! Já consigo deixar o schema, os testes e a infraestrutura prontos pra essa mudança, seguindo o mesmo padrão dos serviços que já rodam com SLA de 99.95%.', trace: ['Classificando intenção da pergunta', 'Buscando padrões no repositório interno', 'Gerando resposta com o LLM da plataforma'], sources: ['api-guidelines-hmbank.md'] },
  cientista: { text: 'Vou colocar isso no próximo ciclo de experimentos e comparar com a baseline atual (AUC 0.87), registrando tudo no tracking da plataforma.', trace: ['Classificando intenção da pergunta', 'Consultando o histórico de experimentos', 'Gerando resposta com o LLM da plataforma'], sources: ['mlflow-tracking-server'] },
  analista: { text: 'Ajustei a consulta pra você. Prefere que eu já exporte como dashboard ou te passe a query SQL equivalente?', trace: ['Classificando intenção da pergunta', 'Consultando o data lakehouse', 'Gerando resposta com o LLM da plataforma'], sources: ['lakehouse.consulta_ajustada'] },
  plataforma: { text: 'Vou revisar os alarmes relacionados e confirmar se o rollback automático cobre esse cenário específico.', trace: ['Classificando intenção da pergunta', 'Inspecionando pipeline e métricas', 'Gerando resposta com o LLM da plataforma'], sources: ['cloudwatch-alarms'] },
  juridico: { text: 'Vou comparar com os modelos-padrão vigentes na base vetorial de contratos. Como sempre, vale uma revisão humana antes de formalizar, viu?', trace: ['Classificando intenção da pergunta', 'Buscando na base vetorial de contratos', 'Gerando resposta com o LLM da plataforma'], sources: ['modelos-contratuais-v3.pdf'] },
  financeiro: { text: 'Vou cruzar com o orçado do período e já projetar o impacto no fechamento do trimestre.', trace: ['Classificando intenção da pergunta', 'Consultando o fechamento contábil', 'Gerando resposta com o LLM da plataforma'], sources: ['orcamento-2026'] },
  rh: { text: 'Vou checar a política vigente na nossa base e ver se alguma exceção se aplica ao seu caso.', trace: ['Classificando intenção da pergunta', 'Buscando na base vetorial de políticas', 'Gerando resposta com o LLM da plataforma'], sources: ['politicas-rh-vigentes'] },
  crm: { text: 'Vou cruzar com o histórico de produtos ativos no CRM e já sugerir os próximos passos comerciais.', trace: ['Classificando intenção da pergunta', 'Consultando o CRM interno', 'Gerando resposta com o LLM da plataforma'], sources: ['crm-360'] },
  risco: { text: 'Vou recalcular os indicadores com base no histórico mais recente da carteira e nas políticas de crédito vigentes.', trace: ['Classificando intenção da pergunta', 'Buscando na base vetorial de crédito', 'Gerando resposta com o LLM da plataforma'], sources: ['politica-credito-v3.pdf'] },
};

/* ---------------- hooks ---------------- */
function useTheme(): [string, () => void] {
  const [theme, setTheme] = React.useState<string>(() => {
    try { return localStorage.getItem('hmbank-theme') || ''; } catch { return ''; }
  });
  React.useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);
  const set = (t: string) => {
    setTheme(t);
    try { localStorage.setItem('hmbank-theme', t); } catch {}
  };
  return [theme, () => set(theme === 'dark' ? 'light' : 'dark')] as any;
}

function useTypewriter(fullText: string, active: boolean, speed = 14) {
  const [shown, setShown] = React.useState(active ? '' : fullText);
  const [done, setDone] = React.useState(!active);
  React.useEffect(() => {
    if (!active) { setShown(fullText); setDone(true); return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(fullText); setDone(true); return; }
    setShown('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      if (i >= fullText.length) {
        setShown(fullText);
        setDone(true);
        clearInterval(id);
      } else {
        setShown(fullText.slice(0, i));
      }
    }, speed);
    return () => clearInterval(id);
  }, [fullText, active]);
  return { shown, done };
}

function useArrivalGlow(trigger: boolean, animate: boolean) {
  const [glow, setGlow] = React.useState(false);
  const firedRef = React.useRef(false);
  React.useEffect(() => {
    if (animate && trigger && !firedRef.current) {
      firedRef.current = true;
      setGlow(true);
      const t = setTimeout(() => setGlow(false), 1200);
      return () => clearTimeout(t);
    }
  }, [trigger, animate]);
  return glow;
}

/* ---------------- small components ---------------- */
const AgentAvatar: React.FC<{ agent: AgentDef; size: number }> = ({ agent, size }) => {
  const Glyph = agent.glyph;
  if (agent.id === 'beto') {
    return <div className="mark-avatar" style={{ width: size, height: size }}><Glyph size={Math.round(size * 0.6)} /></div>;
  }
  return (
    <div className="mark-avatar" style={{ width: size, height: size, background: agent.color }}>
      <Glyph size={Math.round(size * 0.42)} />
    </div>
  );
};

const KIND_BADGES: Record<string, React.FC<{ size: number }>> = {
  upload: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
    </svg>
  ),
  sql: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  ),
  ml: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-2 5.2V15a3 3 0 0 0 3 3h1v2h4v-2h1a3 3 0 0 0 3-3v-2.8A3 3 0 0 0 16 7V6a4 4 0 0 0-4-4Z" />
    </svg>
  ),
  nosql: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
};

const AvatarWithBadge: React.FC<{ agent: AgentDef; size: number; kind?: 'upload' | 'sql' | 'nosql' | 'ml' }> = ({ agent, size, kind }) => {
  const Badge = kind ? KIND_BADGES[kind] : null;
  return (
    <div className="msg-avatar-wrap">
      <div className="msg-avatar round"><AgentAvatar agent={agent} size={size} /></div>
      {Badge && <div className={'msg-avatar-badge badge-' + kind}><Badge size={9} /></div>}
    </div>
  );
};

const TraceTimeline: React.FC<{ steps: string[]; active: boolean }> = ({ steps, active }) => {
  const [doneCount, setDoneCount] = React.useState(active ? 0 : steps.length);
  React.useEffect(() => {
    if (!active) { setDoneCount(steps.length); return; }
    setDoneCount(0);
    const timers = steps.map((_, i) => setTimeout(() => setDoneCount(c => Math.max(c, i + 1)), (i + 1) * 480));
    return () => timers.forEach(clearTimeout);
  }, [steps, active]);
  return (
    <div className="trace">
      {steps.map((s, i) => (
        <div key={i} className={'trace-step' + (i < doneCount ? ' done' : '')}>
          <span className="dot" />{s}
        </div>
      ))}
    </div>
  );
};

const SQL_KEYWORDS = new Set(['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'ON', 'ORDER', 'BY', 'GROUP', 'LIMIT', 'AND', 'OR', 'AS', 'IN', 'BETWEEN', 'DESC', 'ASC', 'COUNT', 'SUM', 'AVG', 'DISTINCT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'NULL', 'NOT', 'LIKE', 'CURRENT_DATE', 'INTERVAL']);

function highlightSQL(sql: string): React.ReactNode[] {
  const tokens = sql.split(/(\s+)/);
  return tokens.map((t, i) => {
    const clean = t.replace(/[(),;]/g, '');
    const upper = clean.toUpperCase();
    if (SQL_KEYWORDS.has(upper)) return <span key={i} className="sql-kw">{t}</span>;
    if (/^'.*'$/.test(t)) return <span key={i} className="sql-str">{t}</span>;
    if (/^-?\d+(\.\d+)?$/.test(clean) && clean.length > 0) return <span key={i} className="sql-num">{t}</span>;
    return <React.Fragment key={i}>{t}</React.Fragment>;
  });
}

const SQLResult: React.FC<{ msg: ChatMessage; animate: boolean }> = ({ msg, animate }) => {
  const { shown, done } = useTypewriter(msg.sqlQuery || '', animate, 9);
  const ready = done || !animate;
  return (
    <>
      <div className="sql-card">
        <div className="sql-card-head">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
          <span>Consulta SQL · RDS/PostgreSQL</span>
          {ready && <span className="sql-exec-badge">{msg.execMs}ms</span>}
        </div>
        <pre className="sql-code"><code>{highlightSQL(shown)}{animate && !done && <span className="caret" />}</code></pre>
      </div>
      {ready && msg.columns && (
        <div className="sql-result">
          <div className="sql-result-label">{msg.rowCount} linha{msg.rowCount === 1 ? '' : 's'} retornada{msg.rowCount === 1 ? '' : 's'} do banco relacional</div>
          <div className="sql-table-wrap">
            <table className="sql-table">
              <thead><tr>{(msg.columns || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
              <tbody>{(msg.rows || []).map((r, ri) => (<tr key={ri}>{r.map((cell, ci) => <td key={ci}>{String(cell)}</td>)}</tr>))}</tbody>
            </table>
          </div>
        </div>
      )}
      {ready && msg.text && <div className="msg-text" style={{ marginTop: 12 }}>{msg.text}</div>}
      {ready && msg.confidence !== undefined && (
        <div className="confidence">
          <span>Confiança da resposta</span>
          <div className="confidence-bar"><div className="confidence-fill" style={{ width: msg.confidence + '%' }} /></div>
          <b>{msg.confidence}%</b>
        </div>
      )}
      {ready && msg.sources && (
        <div className="sources">{msg.sources.map((s, i) => <span key={i} className="source-pill">{s}</span>)}</div>
      )}
    </>
  );
};

const NoSQLResult: React.FC<{ msg: ChatMessage; animate: boolean }> = ({ msg, animate }) => {
  const [ready, setReady] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) { setReady(true); return; }
    const t = setTimeout(() => setReady(true), 450);
    return () => clearTimeout(t);
  }, [animate]);
  return (
    <>
      <div className="sql-card">
        <div className="sql-card-head">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
          <span>GetItem · DynamoDB</span>
          {ready && <span className="sql-exec-badge">{msg.execMs}ms</span>}
        </div>
        <pre className="sql-code"><code>{'TableName: "' + msg.nosqlTable + '"\nKey:       { "' + msg.nosqlKey + '" }'}</code></pre>
      </div>
      {ready && msg.nosqlItem && (
        <div className="sql-result">
          <div className="sql-result-label">1 item retornado do banco não-relacional</div>
          <div className="sql-table-wrap">
            <table className="sql-table">
              <tbody>
                {Object.entries(msg.nosqlItem).map(([k, v], i) => (
                  <tr key={i}><td style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {ready && msg.text && <div className="msg-text" style={{ marginTop: 12 }}>{msg.text}</div>}
      {ready && msg.confidence !== undefined && (
        <div className="confidence">
          <span>Confiança da resposta</span>
          <div className="confidence-bar"><div className="confidence-fill" style={{ width: msg.confidence + '%' }} /></div>
          <b>{msg.confidence}%</b>
        </div>
      )}
      {ready && msg.sources && (
        <div className="sources">{msg.sources.map((s, i) => <span key={i} className="source-pill">{s}</span>)}</div>
      )}
    </>
  );
};

const INDEX_STEPS = ['Extraindo texto do PDF', 'Dividindo em chunks semânticos', 'Gerando embeddings', 'Indexando no vector database'];

const UploadCard: React.FC<{ msg: ChatMessage }> = ({ msg }) => {
  const startedIndexing = React.useRef(msg.status === 'indexing').current;
  const [stepIndex, setStepIndex] = React.useState(startedIndexing ? 0 : INDEX_STEPS.length);
  React.useEffect(() => {
    if (!startedIndexing) return;
    const timers = INDEX_STEPS.map((_, i) => setTimeout(() => setStepIndex(c => Math.max(c, i + 1)), (i + 1) * 520));
    return () => timers.forEach(clearTimeout);
  }, []);
  const pct = Math.round((stepIndex / INDEX_STEPS.length) * 100);
  const doneLabel = (msg.chunks || 0) + ' chunks indexados · pronto para consulta via RAG';
  return (
    <div className="upload-card">
      <div className="upload-file">
        <div className="upload-file-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
        </div>
        <div>
          <div className="upload-file-name">{msg.fileName}</div>
          <div className="upload-file-meta">{msg.fileSizeKB} KB · {msg.pages} páginas</div>
        </div>
      </div>
      <div className="upload-progress-bar"><div className="upload-progress-fill" style={{ width: pct + '%' }} /></div>
      <div className={'upload-status' + (pct >= 100 ? ' done' : '')}>
        {pct >= 100 ? doneLabel : INDEX_STEPS[Math.min(stepIndex, INDEX_STEPS.length - 1)]}
      </div>
    </div>
  );
};

const MLResult: React.FC<{ msg: ChatMessage }> = ({ msg }) => {
  const [filled, setFilled] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setFilled(true), 40);
    return () => clearTimeout(t);
  }, []);
  const pct = Math.round((msg.mlScore || 0) * 100);
  return (
    <div className="ml-card">
      <div className="ml-card-head">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-2 5.2V15a3 3 0 0 0 3 3h1v2h4v-2h1a3 3 0 0 0 3-3v-2.8A3 3 0 0 0 16 7V6a4 4 0 0 0-4-4Z" /><path d="M9 11h6M12 11v7" /></svg>
        <span>{msg.mlModel}</span>
        <span className="ml-hybrid-badge">LLM + ML clássico</span>
      </div>
      <div className="ml-score-row">
        <div className="ml-score-ring">
          <svg viewBox="0 0 36 36" width="52" height="52">
            <path className="ring-bg" d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31" />
            <path className="ring-fill" style={{ strokeDasharray: (filled ? pct : 0) + ', 100' }} d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31" />
          </svg>
          <span className="ml-score-num">{pct}%</span>
        </div>
        <div>
          <div className="ml-score-title">{msg.mlScoreLabel}</div>
          <div className="ml-score-sub">Saída do modelo estatístico clássico, interpretada pelo LLM na resposta abaixo.</div>
        </div>
      </div>
      <div className="ml-features">
        {(msg.mlFeatures || []).map((f, i) => (
          <div className="ml-feature-row" key={i}>
            <span className="ml-feature-name">{f.name}</span>
            <div className="ml-feature-bar"><div className="ml-feature-fill" style={{ width: (filled ? f.impact : 0) + '%' }} /></div>
            <span className="ml-feature-pct mono">{f.impact}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MLMessage: React.FC<{ msg: ChatMessage; agent: AgentDef; animate: boolean }> = ({ msg, agent, animate }) => {
  const [reveal, setReveal] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) { setReveal(true); return; }
    const t = setTimeout(() => setReveal(true), msg.thinkMs !== undefined ? msg.thinkMs : 2200);
    return () => clearTimeout(t);
  }, [animate, msg.thinkMs]);
  const { shown, done } = useTypewriter(msg.text || '', animate && reveal, 12);
  const ready = done || !animate;
  const glow = useArrivalGlow(reveal, animate);
  return (
    <div className="msg assistant">
      <AvatarWithBadge agent={agent} size={32} kind="ml" />
      <div className="msg-body">
        <div className="msg-head"><span className="msg-name">{agent.name}</span><span className="msg-time">{msg.time}</span></div>
        <div className={'msg-card' + (glow ? ' arrived' : '')}>
          {reveal ? (
            <>
              <MLResult msg={msg} />
              <div className="msg-text">
                {animate ? shown : msg.text}
                {animate && reveal && !done && <span className="caret" />}
              </div>
              {ready && msg.confidence !== undefined && (
                <div className="confidence">
                  <span>Confiança da resposta</span>
                  <div className="confidence-bar"><div className="confidence-fill" style={{ width: msg.confidence + '%' }} /></div>
                  <b>{msg.confidence}%</b>
                </div>
              )}
              {ready && msg.sources && (
                <div className="sources">{msg.sources.map((s, i) => <span key={i} className="source-pill">{s}</span>)}</div>
              )}
            </>
          ) : (
            <div className="thinking"><span className="thinking-orb" /><span className="thinking-label">Pensando…</span></div>
          )}
        </div>
      </div>
    </div>
  );
};

const SQLMessage: React.FC<{ msg: ChatMessage; agent: AgentDef; animate: boolean }> = ({ msg, agent, animate }) => {
  const [reveal, setReveal] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) { setReveal(true); return; }
    const t = setTimeout(() => setReveal(true), msg.thinkMs !== undefined ? msg.thinkMs : 2000);
    return () => clearTimeout(t);
  }, [animate, msg.thinkMs]);
  const glow = useArrivalGlow(reveal, animate);
  return (
    <div className="msg assistant">
      <AvatarWithBadge agent={agent} size={32} kind="sql" />
      <div className="msg-body">
        <div className="msg-head"><span className="msg-name">{agent.name}</span><span className="msg-time">{msg.time}</span></div>
        <div className={'msg-card' + (glow ? ' arrived' : '')}>
          {reveal ? <SQLResult msg={msg} animate={animate} /> : (
            <div className="thinking"><span className="thinking-orb" /><span className="thinking-label">Consultando base…</span></div>
          )}
        </div>
      </div>
    </div>
  );
};

const NoSQLMessage: React.FC<{ msg: ChatMessage; agent: AgentDef; animate: boolean }> = ({ msg, agent, animate }) => {
  const [reveal, setReveal] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) { setReveal(true); return; }
    const t = setTimeout(() => setReveal(true), msg.thinkMs !== undefined ? msg.thinkMs : 1700);
    return () => clearTimeout(t);
  }, [animate, msg.thinkMs]);
  const glow = useArrivalGlow(reveal, animate);
  return (
    <div className="msg assistant">
      <AvatarWithBadge agent={agent} size={32} kind="nosql" />
      <div className="msg-body">
        <div className="msg-head"><span className="msg-name">{agent.name}</span><span className="msg-time">{msg.time}</span></div>
        <div className={'msg-card' + (glow ? ' arrived' : '')}>
          {reveal ? <NoSQLResult msg={msg} animate={animate} /> : (
            <div className="thinking"><span className="thinking-orb" /><span className="thinking-label">Consultando item…</span></div>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{ msg: ChatMessage; agent: AgentDef; animate: boolean; userName: string; isLast?: boolean; onDeepen?: () => void; onExportPdf?: () => void; onExportData?: () => void }> = ({ msg, agent, animate, userName, isLast, onDeepen, onExportPdf, onExportData }) => {
  const isUser = msg.role === 'user';
  if (msg.kind === 'upload') {
    return (
      <div className="msg assistant">
        <AvatarWithBadge agent={agent} size={32} kind="upload" />
        <div className="msg-body">
          <div className="msg-head"><span className="msg-name">{agent.name}</span><span className="msg-time">{msg.time}</span></div>
          <div className="msg-card"><UploadCard msg={msg} /></div>
        </div>
      </div>
    );
  }
  if (msg.kind === 'sql') {
    return <SQLMessage msg={msg} agent={agent} animate={animate} />;
  }
  if (msg.kind === 'nosql') {
    return <NoSQLMessage msg={msg} agent={agent} animate={animate} />;
  }
  if (msg.kind === 'ml') {
    return <MLMessage msg={msg} agent={agent} animate={animate} />;
  }
  const [showText, setShowText] = React.useState(!animate);
  React.useEffect(() => {
    if (!animate) { setShowText(true); return; }
    const delay = msg.thinkMs !== undefined ? msg.thinkMs : 1800;
    const t = setTimeout(() => setShowText(true), delay);
    return () => clearTimeout(t);
  }, [animate, msg.thinkMs]);
  const { shown, done } = useTypewriter(msg.text, animate && showText, 12);
  const glow = useArrivalGlow(showText, animate);

  return (
    <div className={'msg ' + (isUser ? 'user' : 'assistant')}>
      {isUser
        ? <div className="msg-avatar">HM</div>
        : <AvatarWithBadge agent={agent} size={32} />}
      <div className="msg-body">
        <div className="msg-head">
          <span className="msg-name">{isUser ? userName : agent.name}</span>
          <span className="msg-time">{msg.time}</span>
          {!isUser && (done || !animate) && <span className="model-badge">llm-plataforma-v4.2 · RAG v2.3</span>}
        </div>
        <div className={'msg-card' + (!isUser && glow ? ' arrived' : '')}>
          {!isUser && animate && !showText ? (
            <div className="thinking"><span className="thinking-orb" /><span className="thinking-label">Pensando…</span></div>
          ) : (
            <div className="msg-text">
              {isUser ? msg.text : shown}
              {!isUser && animate && showText && !done && <span className="caret" />}
            </div>
          )}
          {!isUser && (done || !animate) && msg.confidence !== undefined && (
            <div className="confidence">
              <span>Confiança da resposta</span>
              <div className="confidence-bar"><div className="confidence-fill" style={{ width: msg.confidence + '%' }} /></div>
              <b>{msg.confidence}%</b>
            </div>
          )}
          {!isUser && (done || !animate) && msg.sources && (
            <div className="sources">
              {msg.sources.map((s, i) => <span key={i} className="source-pill">{s}</span>)}
            </div>
          )}
        </div>
        {!isUser && isLast && (done || !animate) && (
          <div className="followup-row">
            <span className="followup-label">Quer ir além?</span>
            <button className="followup-chip" onClick={onDeepen}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6M8 11h6" /></svg>
              Aprofundar esta análise
            </button>
            <button className="followup-chip" onClick={onExportPdf}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v5h5M8 13h8M8 17h5" /></svg>
              Gerar PDF desta resposta
            </button>
            <button className="followup-chip" onClick={onExportData}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
              Exportar dados
            </button>
            <span className="followup-hint">Ficou alguma dúvida? É só perguntar por aqui.</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- sidebar ---------------- */
const AgentRow: React.FC<{ agent: AgentDef; active: boolean; latency: number; onClick: () => void }> = ({ agent, active, latency, onClick }) => (
  <button className={'agent' + (active ? ' active' : '')} onClick={onClick}>
    <div className="agent-icon" style={{ background: agent.color }}>
      <agent.glyph size={13} />
    </div>
    <span className="row-meta">
      <span className="agent-name" style={{ display: 'block' }}>{agent.name}</span>
      <span className="agent-sub" style={{ display: 'block' }}>{agent.subtitle}</span>
    </span>
    <span className="latency-chip mono">{latency}ms</span>
  </button>
);

const AgentGroup: React.FC<{
  title: string; dotClass: string; agents: AgentDef[]; activeId: string; latencies: Record<string, number>; onSelect: (id: string) => void;
}> = ({ title, dotClass, agents, activeId, latencies, onSelect }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="group">
      <button className="group-head" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="group-head-l"><span className={'group-dot ' + dotClass} /><span className="group-title">{title}</span></span>
        <svg className={'chev' + (open ? '' : ' collapsed')} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="agent-list">
          {agents.map(a => (
            <AgentRow key={a.id} agent={a} active={a.id === activeId} latency={latencies[a.id] ?? 40} onClick={() => onSelect(a.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- governance navigation ---------------- */
const NAV_ICONS: Record<string, React.FC<{ size: number }>> = {
  dashboard: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  ),
  calendar: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  ),
  upload: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
    </svg>
  ),
  sql: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  ),
  ml: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-2 5.2V15a3 3 0 0 0 3 3h1v2h4v-2h1a3 3 0 0 0 3-3v-2.8A3 3 0 0 0 16 7V6a4 4 0 0 0-4-4Z" />
    </svg>
  ),
  shield: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.4 8.8 8 11 4.6-2.2 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  lock: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  cloud: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.3 8.1 4 4 0 0 1 17 18H7Z" />
    </svg>
  ),
  gear: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.2" /><path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.56-1.04 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10a1.7 1.7 0 0 0 1.04-1.56V4.5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V10a1.7 1.7 0 0 0 1.56 1.04h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.56 1.04Z" />
    </svg>
  ),
  chatbubble: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  ),
  robot: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 8V4" /><circle cx="12" cy="3" r="1.3" /><circle cx="9" cy="14.5" r="1.3" fill="currentColor" /><circle cx="15" cy="14.5" r="1.3" fill="currentColor" /><path d="M2 13v3M22 13v3" />
    </svg>
  ),
  docs: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v5h5M8 13h8M8 17h5" />
    </svg>
  ),
  database: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  video: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 6-3v10l-6-3" />
    </svg>
  ),
  users: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" /><path d="M2.5 19c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" /><circle cx="18" cy="8" r="2.4" /><path d="M16.5 13.2c2.6.5 4.5 2.7 4.5 5.3" />
    </svg>
  ),
};

const NavSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="nav-section">
    <div className="nav-section-title">{title}</div>
    {children}
  </div>
);

const NavItem: React.FC<{ icon: string; label: string; sub: string; active: boolean; onClick: () => void }> = ({ icon, label, sub, active, onClick }) => {
  const Icon = NAV_ICONS[icon];
  return (
    <button className={'nav-item' + (active ? ' active' : '')} onClick={onClick} aria-current={active ? 'page' : undefined}>
      <span className="nav-item-icon"><Icon size={13} /></span>
      <span className="nav-item-meta">
        <span className="nav-item-label">{label}</span>
        <span className="nav-item-sub">{sub}</span>
      </span>
    </button>
  );
};

const RailItem: React.FC<{ icon: string; label: string; active?: boolean; badge?: number; decorative?: boolean; onClick?: () => void }> = ({ icon, label, active, badge, decorative, onClick }) => {
  const Icon = NAV_ICONS[icon];
  return (
    <button
      className={'rail-item' + (active ? ' active' : '') + (decorative ? ' decorative' : '')}
      onClick={decorative ? undefined : onClick}
      title={decorative ? undefined : label}
      data-tooltip={decorative ? label + ' · em breve' : undefined}
      aria-current={active ? 'page' : undefined}
    >
      <span className="rail-item-icon">
        <Icon size={19} />
        {!!badge && <span className="rail-badge">{badge > 99 ? '99+' : badge}</span>}
      </span>
      <span className="rail-item-label">{label}</span>
    </button>
  );
};

/* ---------------- governance panels (mock content) ---------------- */
const GUARDRAIL_LOGS = [
  { time: '16:41', agent: 'Financeiro', rule: 'Dado sensível (CPF) mascarado automaticamente na resposta', status: 'ok' },
  { time: '16:22', agent: 'Jurídico', rule: 'Citação fora da base vetorial autorizada — resposta bloqueada', status: 'flag' },
  { time: '15:58', agent: 'Risco & Compliance', rule: 'Exceção de política sinalizada para revisão humana', status: 'flag' },
  { time: '15:30', agent: 'CRM Comercial', rule: 'Resposta validada dentro do escopo autorizado do agente', status: 'ok' },
  { time: '14:47', agent: 'RH', rule: 'Tentativa de acesso a dado de outro colaborador bloqueada', status: 'ok' },
  { time: '13:59', agent: 'Analista de Dados', rule: 'Consulta SQL validada contra política de leitura', status: 'ok' },
];

const ACCESS_MATRIX = [
  { dept: 'Tecnologia', profiles: 'Engenharia de Software · Cientista de Dados · Analista de Dados · Plataforma & DevOps', level: 'full' },
  { dept: 'Jurídico & Compliance', profiles: 'Jurídico · Risco & Compliance', level: 'restrict' },
  { dept: 'Financeiro', profiles: 'Financeiro · FP&A', level: 'restrict' },
  { dept: 'Recursos Humanos', profiles: 'RH · Benefícios', level: 'restrict' },
  { dept: 'Comercial', profiles: 'CRM Comercial', level: 'full' },
];

const CLOUD_SERVICES = [
  { name: 'AWS Bedrock · Gateway de LLM', detail: 'p99 380ms · região sa-east-1' },
  { name: 'Amazon API Gateway', detail: 'roteia as chamadas REST dos agentes · 12k req/h' },
  { name: 'Amazon ECS (Fargate)', detail: 'serviços de backend em contêiner · auto scaling ativo' },
  { name: 'AWS Lambda · Orquestração de agentes', detail: '99,98% de disponibilidade (30d)' },
  { name: 'Amazon RDS · PostgreSQL', detail: 'carga 34% · réplica de leitura ativa' },
  { name: 'Amazon DynamoDB', detail: 'sessões e perfis · leitura em single-digit ms' },
  { name: 'Vector Database (OpenSearch)', detail: '2,4M embeddings indexados' },
  { name: 'Amazon SQS', detail: 'fila de eventos de indexação assíncrona · 0 mensagens presas' },
  { name: 'Amazon S3 · Documentos RAG', detail: 'sincronização a cada 15 min' },
  { name: 'Amazon EKS (Kubernetes)', detail: 'workloads de ML clássico · 3 nós, 62% de utilização' },
  { name: 'AWS CloudFormation', detail: 'infraestrutura como código · 100% dos recursos versionados' },
];

const DashboardPanel: React.FC<{ queryCount: number; latencies: Record<string, number> }> = ({ queryCount, latencies }) => {
  const avgLatency = Math.round(Object.values(latencies).reduce((a, b) => a + b, 0) / Object.values(latencies).length);
  return (
    <div className="view-panel">
      <div className="panel-head"><h2>Dashboard Principal</h2><p>Métricas de consumo e desempenho da plataforma em tempo real.</p></div>
      <div className="stat-grid">
        <div className="stat-tile"><span className="stat-label">Consultas hoje</span><div className="stat-value">{queryCount.toLocaleString('pt-BR')}</div><div className="stat-delta">+12% vs. ontem</div></div>
        <div className="stat-tile"><span className="stat-label">Latência média</span><div className="stat-value">{avgLatency}ms</div><div className="stat-delta">dentro do SLA</div></div>
        <div className="stat-tile"><span className="stat-label">Agentes ativos</span><div className="stat-value">{AGENTS.length}</div><div className="stat-delta">Tecnologia + Negócios</div></div>
        <div className="stat-tile"><span className="stat-label">Taxa de acerto (RAG)</span><div className="stat-value">96,4%</div><div className="stat-delta">últimas 24h</div></div>
      </div>
      <div className="panel-card">
        <div className="panel-card-head">Consumo por agente</div>
        {AGENTS.filter(a => a.id !== 'beto').map(a => (
          <div key={a.id} className="cloud-row">
            <span className="cloud-name">
              <span className="agent-icon" style={{ width: 20, height: 20, background: a.color }}><a.glyph size={11} /></span>
              {a.name}
            </span>
            <span className="cloud-detail mono">{latencies[a.id] ?? 40}ms · {40 + ((a.id.charCodeAt(0) * 7 + a.id.length * 13) % 260)} consultas hoje</span>
          </div>
        ))}
      </div>
      <div className="panel-card">
        <div className="panel-card-head">Eventos recentes da plataforma</div>
        {EVENTS_FEED.map((e, i) => (
          <div className="audit-row" key={i}>
            <span className="audit-time mono">{e.time}</span>
            <span className="audit-rule">{e.text}</span>
            <span className={'audit-status ' + (e.level === 'ok' ? 'ok' : 'flag')}>
              {e.level === 'ok' ? 'ok' : e.level === 'warn' ? 'atenção' : 'recuperado'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TYPE_COLOR: Record<string, string> = {
  standup: 'var(--azure)', '1:1': 'var(--petrol)', review: 'var(--navy-900)',
  sync: 'var(--azure-dim)', retro: 'var(--bronze-dim)', interview: 'var(--petrol-dim)',
};

const AVATAR_COLORS = ['#0E5C52', '#00A0E3', '#8C6B3E', '#0A2C74', '#093D36'];

const MEETINGS_TODAY = [
  { time: '09:00', end: '09:15', title: 'Daily · Plataforma de IA', type: 'standup', attendees: ['JM', 'CR', 'LF', 'PT'], location: 'Google Meet' },
  { time: '10:30', end: '11:00', title: '1:1 com gestor(a)', type: '1:1', attendees: ['RS'], location: 'Sala Ipanema · 4º andar' },
  { time: '13:00', end: '14:00', title: 'Review de arquitetura — RAG multi-agente', type: 'review', attendees: ['JM', 'CR', 'AF', 'LF', 'PT'], location: 'Google Meet' },
  { time: '15:30', end: '16:00', title: 'Sync com time de Dados', type: 'sync', attendees: ['DS', 'MT'], location: 'Google Meet' },
  { time: '17:00', end: '17:30', title: 'Retrospectiva da sprint', type: 'retro', attendees: ['JM', 'CR', 'LF', 'PT', 'AF'], location: 'Sala Copacabana · 4º andar' },
];

const MEETINGS_TOMORROW = [
  { time: '09:00', end: '09:15', title: 'Daily · Plataforma de IA', type: 'standup', attendees: ['JM', 'CR', 'LF', 'PT'], location: 'Google Meet' },
  { time: '11:00', end: '12:00', title: 'Planejamento da próxima sprint', type: 'review', attendees: ['JM', 'CR', 'AF', 'LF'], location: 'Google Meet' },
  { time: '14:30', end: '15:00', title: 'Alinhamento com Segurança da Informação', type: 'sync', attendees: ['SI'], location: 'Sala Ipanema · 4º andar' },
];

const DM_THREADS = [
  { id: 'rs', name: 'Rafael Souza', initials: 'RS', color: '#0A2C74', preview: 'Bora bater um 1:1 rapidinho hoje?', time: '09:41', unread: 2, presence: 'online' },
  { id: 'af', name: 'Ana Ferreira', initials: 'AF', color: '#0E5C52', preview: 'Subi o PR da review de arquitetura', time: 'ontem', unread: 0, presence: 'ausente' },
  { id: 'ds', name: 'Time de Dados', initials: 'DS', color: '#8C6B3E', preview: 'Marina: dataset novo já está no lakehouse', time: 'ontem', unread: 0, presence: 'online' },
  { id: 'jm', name: 'João Martins', initials: 'JM', color: '#093D36', preview: 'Consegue revisar o guardrail novo?', time: 'ontem', unread: 1, presence: 'ocupado' },
  { id: 'lf', name: 'Luiza Ferraz', initials: 'LF', color: '#6B2E8C', preview: 'Aquele deploy no ECS já foi ✅', time: 'seg', unread: 0, presence: 'online' },
  { id: 'pt', name: 'Pedro Tavares', initials: 'PT', color: '#8C3E3E', preview: 'Bora almoçar depois da daily?', time: 'seg', unread: 0, presence: 'ausente' },
  { id: 'ti', name: 'TI · Suporte', initials: 'TI', color: '#3E6B8C', preview: 'Chamado #4821 resolvido', time: 'sex', unread: 0, presence: 'online' },
  { id: 'rh', name: 'RH · Comunicados', initials: 'RH', color: '#8C6B3E', preview: 'Pesquisa de clima aberta até sexta', time: '20/09', unread: 0, presence: 'ausente' },
];

const TOAST_POOL = [
  { name: 'Rafael Souza', initials: 'RS', color: '#0A2C74', text: 'te enviou uma mensagem: "Bora bater um 1:1 rapidinho?"' },
  { name: 'Ana Ferreira', initials: 'AF', color: '#0E5C52', text: 'comentou no PR da review de arquitetura' },
  { name: 'Time de Dados', initials: 'DS', color: '#8C6B3E', text: 'compartilhou um novo dataset no lakehouse' },
  { name: 'João Martins', initials: 'JM', color: '#093D36', text: 'te marcou em Guardrails e Auditoria de Prompts' },
  { name: 'Calendário', initials: '', color: '#0A2C74', text: 'sua próxima reunião começa em 10 minutos', icon: 'calendar' },
];

const SQUADS = [
  { id: 'ia', name: 'Plataforma de IA', sub: 'Tecnologia & Negócios' },
  { id: 'fraude', name: 'Fraude & Prevenção', sub: 'Risco & Segurança' },
  { id: 'credito', name: 'Crédito & Cobrança', sub: 'Produtos Financeiros' },
  { id: 'cartoes', name: 'Cartões & Meios de Pagamento', sub: 'Produtos Financeiros' },
];

const EVENTS_FEED = [
  { time: '17:42', level: 'ok', text: 'Fila SQS de indexação processada · 0 mensagens presas' },
  { time: '17:38', level: 'warn', text: 'Latência p99 do Bedrock subiu para 410ms por 2 min' },
  { time: '17:21', level: 'ok', text: 'Deploy do agente Analista de Dados concluído (v4.2.1)' },
  { time: '16:55', level: 'ok', text: 'Réplica de leitura do RDS sincronizada' },
  { time: '16:30', level: 'error', text: 'Timeout pontual no OpenSearch — retry automático resolveu' },
];

const AgendaPanel: React.FC<{ now: string }> = ({ now }) => {
  const [tab, setTab] = React.useState<'hoje' | 'amanha'>('hoje');
  const list = tab === 'hoje' ? MEETINGS_TODAY : MEETINGS_TOMORROW;
  const remainingToday = MEETINGS_TODAY.filter(m => m.end > now).length;
  const showEmptyBanner = tab === 'hoje' && remainingToday === 0;
  return (
    <div className="view-panel">
      <div className="panel-head"><h2>Agenda</h2><p>Seus próximos compromissos na plataforma de calendário corporativo.</p></div>
      <div className="agenda-tabs">
        <button className={'agenda-tab' + (tab === 'hoje' ? ' active' : '')} onClick={() => setTab('hoje')}>Hoje · {MEETINGS_TODAY.length} eventos</button>
        <button className={'agenda-tab' + (tab === 'amanha' ? ' active' : '')} onClick={() => setTab('amanha')}>Amanhã · {MEETINGS_TOMORROW.length} eventos</button>
      </div>
      {showEmptyBanner && (
        <div className="agenda-empty-banner">
          <span className="agenda-empty-emoji">🎉</span>
          <span>
            <b>Sem mais compromissos hoje</b>
            <span>Sua agenda está livre pelo resto do dia. Bom descanso!</span>
          </span>
        </div>
      )}
      <div className="panel-card">
        {list.map((m, i) => (
          <div className={'agenda-item' + (tab === 'hoje' && m.end <= now ? ' past' : '')} key={i}>
            <div className="agenda-time-col">
              <span className="agenda-time mono">{m.time}</span>
              <span className="agenda-time-end mono">{m.end}</span>
            </div>
            <div className="agenda-line" style={{ background: TYPE_COLOR[m.type] || 'var(--azure)' }} />
            <div className="agenda-body">
              <div className="agenda-title">
                {m.title}
                {tab === 'hoje' && m.time <= now && m.end > now && <span className="agenda-live">agora</span>}
                {tab === 'hoje' && m.end <= now && <span className="agenda-live" style={{ background: 'var(--line)', color: 'var(--ink-faint)' }}>concluída</span>}
              </div>
              <div className="agenda-meta">
                <span className="agenda-location">
                  {m.location === 'Google Meet' ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 6-3v10l-6-3" /></svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  )}
                  {m.location}
                </span>
                <span className="agenda-avatars">
                  {m.attendees.slice(0, 4).map((a, ai) => (
                    <span key={ai} className="agenda-avatar" style={{ background: AVATAR_COLORS[ai % AVATAR_COLORS.length] }}>{a}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuardrailsPanel: React.FC = () => (
  <div className="view-panel">
    <div className="panel-head"><h2>Guardrails e Auditoria de Prompts</h2><p>Registro em tempo real das políticas de segurança aplicadas a cada interação com os agentes.</p></div>
    <div className="stat-grid">
      <div className="stat-tile"><span className="stat-label">Prompts auditados hoje</span><div className="stat-value">3.208</div><div className="stat-delta">100% de cobertura</div></div>
      <div className="stat-tile"><span className="stat-label">Sinalizados p/ revisão</span><div className="stat-value">7</div><div className="stat-delta" style={{ color: 'var(--danger)' }}>0,2% do total</div></div>
      <div className="stat-tile"><span className="stat-label">Dados sensíveis mascarados</span><div className="stat-value">142</div><div className="stat-delta">CPF, conta, e-mail</div></div>
    </div>
    <div className="panel-card">
      <div className="panel-card-head">Últimas verificações</div>
      {GUARDRAIL_LOGS.map((g, i) => (
        <div className="audit-row" key={i}>
          <span className="audit-time mono">{g.time}</span>
          <span className="audit-rule">{g.rule}</span>
          <span className="audit-agent">{g.agent}</span>
          <span className={'audit-status ' + (g.status === 'ok' ? 'ok' : 'flag')}>{g.status === 'ok' ? 'aprovado' : 'sinalizado'}</span>
        </div>
      ))}
    </div>
  </div>
);

const AccessPanel: React.FC = () => (
  <div className="view-panel">
    <div className="panel-head"><h2>Controle de Acesso por Departamento</h2><p>Segregação de funções: cada perfil só acessa os agentes e dados do seu próprio domínio.</p></div>
    <div className="panel-card">
      <div className="panel-card-head">Matriz de permissões</div>
      {ACCESS_MATRIX.map((r, i) => (
        <div className="access-row" key={i}>
          <span className="access-dept">{r.dept}</span>
          <span className="access-profiles">{r.profiles}</span>
          <span className={'access-level ' + r.level}>{r.level === 'full' ? 'acesso amplo' : 'acesso restrito'}</span>
        </div>
      ))}
    </div>
  </div>
);

const CloudPanel: React.FC = () => (
  <div className="view-panel">
    <div className="panel-head"><h2>Status da Nuvem</h2><p>Saúde da infraestrutura AWS que sustenta a plataforma de IA.</p></div>
    <div className="panel-card">
      <div className="panel-card-head">Serviços monitorados</div>
      {CLOUD_SERVICES.map((s, i) => (
        <div className="cloud-row" key={i}>
          <span className="cloud-name"><span className="cloud-dot" />{s.name}</span>
          <span className="cloud-detail mono">{s.detail}</span>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPanel: React.FC<{
  userName: string; userRole: string; theme: string; toggleTheme: () => void; renderAvatar: (size: number, cls: string) => React.ReactNode;
}> = ({ userName, userRole, theme, toggleTheme, renderAvatar }) => {
  const [notifEmail, setNotifEmail] = React.useState(true);
  const [notifPush, setNotifPush] = React.useState(false);
  return (
    <div className="view-panel">
      <div className="panel-head"><h2>Configurações da Conta</h2><p>Perfil, preferências e notificações da sua conta corporativa.</p></div>
      <div className="panel-card">
        <div className="panel-card-head">Perfil</div>
        <div className="settings-row">
          <div className="settings-label">{renderAvatar(38, 'foot-avatar')}<div><b>{userName}</b><span>{userRole}</span></div></div>
        </div>
      </div>
      <div className="panel-card">
        <div className="panel-card-head">Preferências</div>
        <div className="settings-row">
          <div className="settings-label"><div><b>Tema escuro</b><span>Aplicado em toda a plataforma</span></div></div>
          <button className={'mini-toggle' + (theme === 'dark' ? ' on' : '')} onClick={toggleTheme} aria-label="Alternar tema" />
        </div>
        <div className="settings-row">
          <div className="settings-label"><div><b>Notificações por e-mail</b><span>Resumos diários de uso</span></div></div>
          <button className={'mini-toggle' + (notifEmail ? ' on' : '')} onClick={() => setNotifEmail(v => !v)} aria-label="Alternar notificações por e-mail" />
        </div>
        <div className="settings-row">
          <div className="settings-label"><div><b>Notificações push</b><span>Alertas de guardrails sinalizados</span></div></div>
          <button className={'mini-toggle' + (notifPush ? ' on' : '')} onClick={() => setNotifPush(v => !v)} aria-label="Alternar notificações push" />
        </div>
      </div>
    </div>
  );
};

/* ---------------- intent classification (simulated) ---------------- */
const GREETING_RE = /^(oi|ol[áa]|bom dia|boa tarde|boa noite|e a[íi]|opa|hey|hello|tudo bem|fala)\b/i;
const THANKS_RE = /^(obrigad[ao]?|valeu|vlw|show|top|beleza|perfeito|[óo]timo|maravilha|d['’]?ac[óo]rdo|joia)\b/i;
const FAREWELL_RE = /^(tchau|at[ée] mais|at[ée] logo|falou|flw|até a próxima|ate a proxima)\b/i;
const HELP_RE = /o que (você|voce|vc) (pode|consegue) fazer|como (você|voce|vc) funciona|quem (é você|e voce|é vc|é voce)|^ajuda[!.?]?$|o que (você|voce|vc) (faz|é|e)\b|pra que (você|voce|vc) serve/i;
const REQUEST_HELP_RE = /pode me ajudar|pode ajudar|me ajuda\b|consegue me ajudar|(você|voce|vc) pode me ajudar|preciso de (uma )?ajuda|será que (você|voce|vc) (pode|consegue)|conseguiria me ajudar/i;
const CAPABILITY_Q_RE = /quais agentes|que agentes|lista de agentes|quantos agentes|o que a plataforma faz|quais especialistas/i;

const ROUTES: { id: string; kws: string[] }[] = [
  { id: 'risco', kws: ['risco', 'crédito', 'credito', 'limite de crédito', 'limite aprovado', 'inadimpl', 'carteira', 'exposição', 'exposicao', 'percentil'] },
  { id: 'financeiro', kws: ['orçamento', 'orcamento', 'custo', 'financeiro', 'receita', 'fechamento', 'centro de custo', 'despesa', 'fp&a', 'fpa'] },
  { id: 'juridico', kws: ['contrato', 'cláusula', 'clausula', 'jurídico', 'juridico', 'compliance', 'rescisão', 'rescisao', 'regulatório', 'regulatorio', 'parecer'] },
  { id: 'rh', kws: ['férias', 'ferias', 'benefício', 'beneficio', 'home office', 'híbrido', 'hibrido', 'colaborador', 'licença', 'licenca', 'folha de pagamento'] },
  { id: 'crm', kws: ['cliente', 'oportunidade', 'crm', 'relacionamento comercial', 'comercial', 'pipeline de vendas', 'proposta comercial'] },
  { id: 'dev', kws: ['api', 'endpoint', 'código', 'codigo', 'deploy', 'bug', 'software', 'serviço', 'servico', 'microsserviço', 'microsservico', 'backend', 'frontend'] },
  { id: 'cientista', kws: ['modelo de', 'machine learning', 'dataset', 'experimento', 'propensão', 'propensao', 'churn', 'feature engineering', 'mlflow', 'algoritmo'] },
  { id: 'analista', kws: ['consulta', 'sql', 'dashboard', 'query', 'tabela', 'receita por produto', 'relatório', 'relatorio', 'planilha', 'extrair dados'] },
  { id: 'plataforma', kws: ['pipeline', 'ci/cd', 'infra', 'aws', 'observabilidade', 'devops', 'kubernetes', 'servidor', 'incidente', 'monitoramento'] },
];

const ML_KEYWORDS = ['propensão', 'propensao', 'score', 'probabilidade', 'previsão', 'previsao', 'prever', 'classificação', 'classificacao', 'regressão', 'regressao', 'inadimplência', 'inadimplencia', 'churn', 'risco de crédito', 'risco de credito'];

const SQL_KEYWORDS_Q = ['consulta', 'query', 'tabela', 'sql', 'banco de dados', 'histórico de transações', 'historico de transacoes', 'receita por produto', 'base de dados'];

const NOSQL_KEYWORDS = ['sessão do usuário', 'sessao do usuario', 'sessão ativa', 'sessao ativa', 'cache', 'perfil do cliente', 'perfil do usuário', 'perfil do usuario', 'preferências do usuário', 'preferencias do usuario', 'token de acesso', 'dynamodb', 'dynamo', 'não relacional', 'nao relacional', 'chave-valor', 'chave valor'];

function classifyRoute(text: string): string {
  const lower = text.toLowerCase();
  for (const r of ROUTES) if (r.kws.some(k => lower.includes(k))) return r.id;
  return 'beto';
}

const GREETING_REPLIES = [
  'Oi! Tudo certo por aqui. Em que posso te ajudar hoje?',
  'Olá! Pode perguntar — sobre tecnologia ou negócios, é só mandar.',
  'Oi, tudo bem? Fico à disposição pra te ajudar com o que precisar.',
];

const THANKS_REPLIES = [
  'Por nada! Qualquer coisa é só chamar de novo.',
  'Disponha! Fico por aqui se precisar de mais alguma coisa.',
  'Isso aí! Se surgir outra dúvida, me chama sem problema.',
];

const FAREWELL_REPLIES = [
  'Até mais! Fico por aqui se precisar de algo.',
  'Falou! Qualquer coisa, é só voltar a qualquer momento.',
  'Até a próxima! Tenha um ótimo dia.',
];

const REQUEST_HELP_REPLIES = [
  'Claro, posso te ajudar! Me conta com mais detalhes o que você precisa que eu já direciono pro especialista certo.',
  'Com certeza, posso sim! É só me contar o assunto que eu já busco a resposta pra você.',
  'Posso te ajudar, sim. Me dá um pouco mais de contexto sobre o que você precisa?',
];

const OPENERS = ['Boa pergunta.', 'Entendi.', 'Show,', 'Certo,', 'Deixa eu ver isso.', 'Beleza,'];

function shortQuote(text: string, max = 68): string {
  const t = text.trim().replace(/\s+/g, ' ');
  return t.length > max ? t.slice(0, max - 1).trimEnd() + '…' : t;
}

const SUBTOPICS: Record<string, { kws: string[]; text: string; sources?: string[] }[]> = {
  beto: [
    { kws: ['ajud', 'capaz', 'consegue fazer'], text: 'Consigo responder direto ou acionar um dos nove especialistas de Tecnologia ou Negócios — e, quando a pergunta pede número ou dado estruturado, já trago consulta SQL ou modelo de ML combinado com a resposta em linguagem natural.' },
    { kws: ['seguro', 'segurança', 'seguranca', 'confiável', 'confiavel', 'dado sensível', 'dado sensivel'], text: 'Toda interação passa por guardrails automáticos: dado sensível (CPF, conta) é mascarado antes de sair, e cada resposta fica auditada — dá pra ver isso em detalhe no painel de Governança & Compliance.' },
    { kws: ['funciona', 'arquitetura', 'como voce trabalha'], text: 'Por trás, eu classifico a intenção da pergunta, decido entre resposta direta, busca vetorial (RAG), consulta SQL ou modelo clássico de ML, e componho tudo numa resposta só — com a origem de cada dado registrada.' },
    { kws: ['quanto custa', 'preço', 'preco', 'valor de uso'], text: 'Isso aqui é um protótipo interno sem custo de uso — em produção, o custo variaria conforme o volume de chamadas ao modelo e ao vector database.' },
    { kws: ['horário', 'horario', 'disponibilidade', '24h', '24 horas'], text: 'Estou disponível 24 horas por dia — a plataforma não tem horário de expediente.' },
    { kws: ['idioma', 'língua', 'lingua', 'inglês', 'ingles'], text: 'Hoje respondo em português, mas a arquitetura suporta expandir pra outros idiomas sem grandes mudanças no roteamento.' },
    { kws: ['histórico', 'historico', 'memória', 'memoria'], text: 'Consigo manter o contexto da conversa atual, mas cada agente tem seu próprio histórico separado — assim uma dúvida de RH não se mistura com uma de tecnologia.' },
    { kws: ['não entendi', 'nao entendi', 'não entende', 'nao entende'], text: 'Se eu não entender algo, é só reformular a pergunta ou me dizer direto com qual área você quer falar que eu já redireciono.' },
    { kws: ['integra', 'integração', 'integracao'], text: 'A plataforma foi desenhada pra se integrar com os sistemas internos via API, sem duplicar dados entre áreas.' },
    { kws: ['limitação', 'limitacao', 'limite do sistema'], text: 'Minha maior limitação hoje é não substituir revisão humana em decisões críticas — sempre sinalizo quando algo precisa de validação de uma pessoa.' },
  ],
  dev: [
    { kws: ['api', 'endpoint'], text: 'Pra uma API nova eu já deixo o schema de request/response, os testes automatizados e a esteira de CI/CD prontos, seguindo o padrão dos serviços que rodam hoje com SLA de 99,95% e latência média de 42ms.' },
    { kws: ['bug', 'erro', 'falha'], text: 'Consigo olhar o log mais recente, comparar com o último deploy saudável e sugerir um rollback ou hotfix — me passa o nome do serviço que eu já cruzo com o pipeline.' },
    { kws: ['código', 'codigo', 'revis', 'arquitetura', 'refator'], text: 'Posso revisar o código com foco em performance, segurança e aderência aos padrões internos (api-guidelines-hmbank.md) e sugerir refatorações pontuais.' },
    { kws: ['teste', 'cobertura', 'qa'], text: 'Consigo gerar casos de teste unitários e de integração a partir do fluxo que você descrever, e apontar onde a cobertura atual está mais fraca.' },
    { kws: ['banco de dados', 'schema', 'migration', 'migração', 'migracao'], text: 'Posso desenhar o schema, sugerir índices pra performance e já deixar o script de migration pronto, seguindo o padrão do time.' },
    { kws: ['performance', 'otimização', 'otimizacao', 'lentidão', 'lentidao'], text: 'Posso analisar o profiling da aplicação e sugerir otimizações pontuais — cache, índices ou paralelização, dependendo de onde está o gargalo.' },
    { kws: ['autenticação', 'autenticacao', 'login', 'oauth', 'sso'], text: 'Consigo implementar o fluxo de autenticação (OAuth2/JWT) seguindo o mesmo padrão de SSO corporativo já usado na plataforma.' },
    { kws: ['microsserviço', 'microservico', 'monolito'], text: 'Posso avaliar se vale quebrar esse serviço em microsserviços ou manter monolito, considerando o tamanho do time e a complexidade atual.' },
    { kws: ['documentação', 'documentacao', 'swagger', 'openapi'], text: 'Consigo gerar a documentação OpenAPI/Swagger a partir dos endpoints e manter ela sincronizada no pipeline de build.' },
    { kws: ['versionamento', 'git', 'branch', 'gitflow'], text: 'Posso sugerir a estratégia de branching (trunk-based ou GitFlow) mais adequada pro ritmo de entrega do time.' },
  ],
  cientista: [
    { kws: ['modelo', 'dataset', 'experimento', 'feature'], text: 'Consigo montar a engenharia de atributos, comparar candidatos com validação cruzada e registrar tudo no tracking da plataforma — o modelo de churn em produção está com AUC de 0,87 hoje, bom benchmark pro desafiante.' },
    { kws: ['propensão', 'propensao', 'churn'], text: 'Pra propensão de churn eu uso XGBoost em produção (AUC 0,87). Consigo simular o score pra um cliente específico ou reexplicar quais variáveis pesam mais na decisão.' },
    { kws: ['viés', 'vies', 'fairness', 'explicabilidade', 'shap'], text: 'Consigo rodar uma análise de explicabilidade (tipo SHAP) pra mostrar o peso de cada variável e checar se o modelo não está enviesado por algum grupo específico.' },
    { kws: ['overfitting', 'underfitting', 'curva de aprendizado'], text: 'Posso checar as curvas de aprendizado pra ver se o modelo está com overfitting e sugerir regularização ou mais dados de treino.' },
    { kws: ['feature store'], text: 'Consigo consultar a feature store pra reaproveitar variáveis já validadas em outros modelos, economizando tempo de engenharia de atributos.' },
    { kws: ['teste a/b', 'a/b test', 'ab test'], text: 'Posso desenhar o teste A/B pra validar o novo modelo em produção antes do rollout completo.' },
    { kws: ['deploy de modelo', 'model deploy', 'colocar em produção', 'colocar em producao'], text: 'Consigo empacotar o modelo e colocar em produção via endpoint gerenciado, com monitoramento de drift ativo.' },
    { kws: ['drift'], text: 'Posso monitorar o drift de dados e de performance do modelo, e alertar automaticamente se a acurácia cair abaixo do esperado.' },
    { kws: ['clusterização', 'clusterizacao', 'segmentação', 'segmentacao'], text: 'Consigo rodar uma clusterização pra identificar segmentos de clientes com comportamento parecido.' },
    { kws: ['nlp', 'processamento de linguagem', 'texto não estruturado', 'texto nao estruturado'], text: 'Posso aplicar técnicas de NLP pra extrair insights de texto não estruturado, tipo tickets de suporte ou contratos.' },
  ],
  analista: [
    { kws: ['dashboard', 'relatório', 'relatorio', 'planilha'], text: 'Posso montar um dashboard a partir da consulta ou te passar a query SQL equivalente pra rodar direto no RDS — o que for mais útil pra você.' },
    { kws: ['indicador', 'kpi', 'métrica', 'metrica'], text: 'Consigo calcular o indicador a partir do data lakehouse e comparar com o período anterior, já destacando variações relevantes.' },
    { kws: ['tendência', 'tendencia', 'sazonalidade'], text: 'Posso identificar tendências sazonais nos dados e projetar o próximo período com base no histórico.' },
    { kws: ['segmentação de clientes', 'segmentacao de clientes'], text: 'Consigo segmentar a base de clientes por comportamento de compra ou uso pra apoiar decisões comerciais.' },
    { kws: ['comparar períodos', 'comparar periodos', 'comparativo'], text: 'Posso montar um comparativo período a período com variação percentual já calculada.' },
    { kws: ['exportar', 'excel', 'csv'], text: 'Consigo exportar o resultado em CSV ou já deixar pronto pra abrir direto no Excel.' },
    { kws: ['outlier', 'anomalia'], text: 'Posso rodar uma detecção de outliers nos dados pra te avisar se algo fugiu do padrão esperado.' },
    { kws: ['funil de conversão', 'funil de conversao'], text: 'Consigo montar o funil de conversão etapa a etapa a partir dos eventos registrados no produto.' },
    { kws: ['cohort', 'coorte'], text: 'Posso fazer uma análise de cohort pra ver a retenção de clientes ao longo do tempo.' },
    { kws: ['consulta ad-hoc', 'ad hoc', 'consulta pontual'], text: 'Posso rodar uma consulta ad-hoc pontual sem precisar subir um dashboard completo, se for só pra essa análise.' },
  ],
  plataforma: [
    { kws: ['pipeline', 'ci/cd', 'deploy'], text: 'O pipeline está com 99,2% de sucesso nas últimas 200 execuções, com rollback automático em menos de 90 segundos quando necessário. Posso detalhar o alarme mais recente, se quiser.' },
    { kws: ['infra', 'aws', 'observabilidade', 'devops', 'kubernetes', 'servidor'], text: 'Nossa infraestrutura roda em sa-east-1 na AWS: Bedrock pro LLM, RDS Postgres, OpenSearch como vector database e Lambda orquestrando os agentes — tudo com observabilidade via CloudWatch.' },
    { kws: ['incidente', 'indisponibilidade', 'outage'], text: 'Posso puxar a timeline do incidente, os alarmes disparados e o tempo até a mitigação, pra você já ter o pós-morte encaminhado.' },
    { kws: ['escalabilidade', 'auto scaling', 'autoscaling'], text: 'Posso configurar auto scaling baseado em CPU ou tamanho de fila pra o serviço aguentar picos sem intervenção manual.' },
    { kws: ['custo', 'otimização de custo', 'otimizacao de custo', 'finops'], text: 'Consigo revisar os recursos provisionados e sugerir cortes de custo sem impactar performance (FinOps).' },
    { kws: ['backup', 'disaster recovery', 'recuperação de desastre', 'recuperacao de desastre'], text: 'Posso checar a estratégia de backup e o plano de disaster recovery vigente pra esse serviço.' },
    { kws: ['logs', 'monitoramento'], text: 'Consigo configurar dashboards de observabilidade com os logs e métricas mais relevantes pro time acompanhar.' },
    { kws: ['certificado', 'ssl', 'tls'], text: 'Posso verificar a validade dos certificados TLS em uso e automatizar a renovação.' },
    { kws: ['rede', 'vpc', 'firewall'], text: 'Consigo revisar as regras de rede (VPC, security groups) pra garantir que só o tráfego necessário passe.' },
    { kws: ['secrets', 'chave de api', 'credencial'], text: 'Posso migrar as credenciais pro AWS Secrets Manager, tirando qualquer chave hardcoded do código.' },
  ],
  juridico: [
    { kws: ['contrato', 'cláusula', 'clausula', 'rescis'], text: 'Encontro a cláusula equivalente nos modelos-padrão da base vetorial de contratos e já sinalizo se o caso pede revisão humana antes de formalizar.' },
    { kws: ['compliance', 'regulatório', 'regulatorio', 'parecer'], text: 'Posso checar o enquadramento regulatório mais recente na nossa base de pareceres jurídicos e avisar se há algum ponto de atenção.' },
    { kws: ['lgpd', 'privacidade', 'dado pessoal'], text: 'Posso checar se o fluxo descrito está de acordo com a LGPD e apontar se algum dado pessoal precisa de tratamento especial antes de seguir.' },
    { kws: ['nda', 'confidencialidade'], text: 'Posso checar se o NDA padrão cobre o escopo que você descreveu ou se precisa de uma cláusula adicional.' },
    { kws: ['fornecedor', 'terceiro'], text: 'Consigo verificar o processo de due diligence vigente pra contratação de fornecedores terceiros.' },
    { kws: ['propriedade intelectual', 'pi'], text: 'Posso checar as cláusulas de propriedade intelectual no contrato pra ver quem detém os direitos sobre o que for desenvolvido.' },
    { kws: ['multa', 'penalidade'], text: 'Consigo calcular a penalidade contratual prevista com base na cláusula aplicável ao caso.' },
    { kws: ['aditivo', 'aditivo contratual'], text: 'Posso preparar a minuta de aditivo contratual com as alterações que você descrever.' },
    { kws: ['litígio', 'litigio', 'processo judicial'], text: 'Posso puxar o histórico de processos relacionados a esse tema na nossa base jurídica.' },
    { kws: ['assinatura eletrônica', 'assinatura eletronica', 'e-sign'], text: 'Consigo confirmar se esse tipo de documento pode ser fechado com assinatura eletrônica conforme nossa política interna.' },
  ],
  financeiro: [
    { kws: ['orçamento', 'orcamento', 'custo', 'centro de custo', 'despesa'], text: 'Consigo cruzar com o orçado do período e já projetar o impacto no fechamento do trimestre — me diga qual centro de custo você quer olhar.' },
    { kws: ['receita', 'fechamento'], text: 'Posso trazer o fechamento mais recente linha a linha e comparar com o mesmo período do ano passado.' },
    { kws: ['investimento', 'roi', 'payback'], text: 'Consigo estimar o retorno esperado e o prazo de payback com base nas premissas que você passar.' },
    { kws: ['fluxo de caixa', 'caixa'], text: 'Posso projetar o fluxo de caixa dos próximos meses com base no histórico e nas entradas já previstas.' },
    { kws: ['câmbio', 'cambio', 'variação cambial', 'variacao cambial'], text: 'Consigo simular o impacto da variação cambial nas posições em moeda estrangeira.' },
    { kws: ['imposto', 'tributário', 'tributario'], text: 'Posso checar a carga tributária aplicável a essa operação com base na legislação vigente.' },
    { kws: ['provisão', 'provisao'], text: 'Consigo calcular a provisão necessária com base no histórico de perdas esperadas.' },
    { kws: ['margem', 'lucratividade'], text: 'Posso calcular a margem por produto ou linha de negócio pra você comparar rentabilidade.' },
    { kws: ['reajuste', 'inflação', 'inflacao'], text: 'Consigo simular o impacto de um reajuste ou da inflação projetada no orçamento do próximo ano.' },
    { kws: ['auditoria financeira'], text: 'Posso levantar os documentos que normalmente são pedidos numa auditoria financeira pra esse tipo de conta.' },
  ],
  rh: [
    { kws: ['férias', 'ferias', 'licença', 'licenca'], text: 'Posso checar o saldo de férias e as regras de antecipação vigentes pra você.' },
    { kws: ['benefício', 'beneficio', 'home office', 'híbrido', 'hibrido'], text: 'Consigo verificar a política de benefícios ou de trabalho híbrido aplicável ao seu caso na nossa base vetorial de RH.' },
    { kws: ['contratação', 'contratacao', 'vaga', 'onboarding'], text: 'Posso te passar o processo vigente de contratação/onboarding e os documentos exigidos em cada etapa.' },
    { kws: ['desligamento', 'demissão', 'demissao'], text: 'Posso te explicar o processo e a documentação necessária pra um desligamento, seguindo a política vigente.' },
    { kws: ['avaliação de desempenho', 'avaliacao de desempenho', 'pdi'], text: 'Consigo puxar o status do ciclo de avaliação de desempenho e do PDI de um colaborador.' },
    { kws: ['plano de carreira', 'promoção', 'promocao'], text: 'Posso checar os critérios de promoção vigentes pra esse cargo e nível.' },
    { kws: ['clima organizacional', 'pesquisa de clima'], text: 'Posso trazer os resultados da última pesquisa de clima organizacional pra esse time.' },
    { kws: ['folha de pagamento', 'salário', 'salario'], text: 'Consigo checar a política salarial vigente pra essa faixa e cargo.' },
    { kws: ['treinamento', 'capacitação', 'capacitacao'], text: 'Posso listar os treinamentos disponíveis relacionados a esse tema na nossa plataforma de capacitação.' },
    { kws: ['diversidade', 'inclusão', 'inclusao'], text: 'Posso trazer os indicadores atuais do programa de diversidade e inclusão da empresa.' },
  ],
  crm: [
    { kws: ['cliente', 'oportunidade', 'proposta'], text: 'Consigo puxar o histórico de relacionamento, produtos ativos e oportunidades em aberto direto do CRM.' },
    { kws: ['funil', 'conversão', 'conversao', 'pipeline de vendas'], text: 'Posso trazer a taxa de conversão por etapa do funil e apontar onde as oportunidades estão travando.' },
    { kws: ['renovação', 'renovacao'], text: 'Posso checar a data de renovação do contrato desse cliente e o histórico da última negociação.' },
    { kws: ['churn de cliente', 'cancelamento'], text: 'Consigo puxar os sinais de risco de cancelamento desse cliente com base no engajamento recente.' },
    { kws: ['upsell', 'cross-sell', 'cross sell'], text: 'Posso sugerir produtos com potencial de upsell ou cross-sell com base no perfil desse cliente.' },
    { kws: ['nps', 'satisfação', 'satisfacao'], text: 'Posso trazer o NPS mais recente desse cliente e os comentários associados a ele.' },
    { kws: ['visita comercial', 'reunião', 'reuniao'], text: 'Consigo preparar um briefing rápido com o histórico do cliente pra sua próxima reunião.' },
    { kws: ['segmentação de carteira', 'segmentacao de carteira', 'carteira de clientes'], text: 'Posso segmentar sua carteira de clientes por potencial de receita pra você priorizar contatos.' },
    { kws: ['concorrência', 'concorrencia'], text: 'Posso trazer o que temos registrado sobre a presença da concorrência nesse cliente.' },
    { kws: ['contrato comercial'], text: 'Consigo checar as condições comerciais vigentes nesse contrato antes da renovação.' },
  ],
  risco: [
    { kws: ['limite', 'carteira', 'exposição', 'exposicao'], text: 'Posso checar a exposição atual da carteira frente ao limite aprovado e sinalizar se algum caso passou do percentil 95 de utilização.' },
    { kws: ['inadimpl'], text: 'Consigo rodar o modelo clássico de risco de crédito pra estimar a probabilidade de inadimplência — quer que eu calcule agora?' },
    { kws: ['política de crédito', 'politica de credito', 'aprovação', 'aprovacao'], text: 'Posso checar a política de crédito vigente pra esse tipo de caso e dizer se a operação está dentro dos critérios de aprovação automática.' },
    { kws: ['garantia', 'colateral'], text: 'Posso checar quais garantias estão vinculadas a essa operação de crédito.' },
    { kws: ['rating', 'classificação de risco', 'classificacao de risco'], text: 'Consigo trazer o rating de risco mais recente atribuído a esse cliente.' },
    { kws: ['stress test', 'teste de estresse'], text: 'Posso simular um cenário de stress test pra ver o impacto na carteira em condições adversas.' },
    { kws: ['basileia', 'capital regulatório', 'capital regulatorio'], text: 'Posso checar o consumo de capital regulatório (Basileia) dessa exposição.' },
    { kws: ['fraude'], text: 'Consigo cruzar os sinais de possível fraude nessa transação com o modelo de detecção vigente.' },
    { kws: ['concentração de risco', 'concentracao de risco'], text: 'Posso checar se há concentração de risco excessiva num setor ou cliente específico.' },
    { kws: ['cobrança', 'cobranca', 'recuperação de crédito', 'recuperacao de credito'], text: 'Posso trazer o status da régua de cobrança pra esse cliente inadimplente.' },
  ],
};

const SUGGESTED_PROMPTS: Record<string, string[]> = {
  beto: ['O que você pode fazer?', 'Qual o risco de crédito da carteira CX-4471?', 'Preciso de ajuda com uma consulta SQL', 'Quais agentes existem na plataforma?'],
  dev: ['Preciso de um endpoint novo, pode ajudar?', 'Tem algum bug conhecido em produção?', 'Pode revisar um trecho de código comigo?'],
  cientista: ['Como validar um modelo antes de subir pra produção?', 'Qual a propensão de churn de um cliente?', 'O modelo pode estar enviesado?'],
  analista: ['Monta um dashboard de receita por produto', 'Qual o histórico de transações da carteira CX-4471?', 'Tem algum outlier nos dados recentes?'],
  plataforma: ['O pipeline de deploy está estável?', 'Como está a infraestrutura na AWS?', 'Tivemos algum incidente recente?'],
  juridico: ['Preciso entender uma cláusula de um contrato', 'Isso está de acordo com a LGPD?', 'Pode revisar um NDA?'],
  financeiro: ['Como está o orçamento desse mês?', 'Qual o ROI esperado de um investimento?', 'Preciso projetar o fluxo de caixa'],
  rh: ['Posso solicitar home office integral?', 'Qual meu saldo de férias?', 'Como funciona o processo de promoção?'],
  crm: ['Resumo do relacionamento com o cliente Acme', 'Esse cliente tem risco de cancelar?', 'Quais oportunidades estão em aberto?'],
  risco: ['O cliente está dentro do limite de crédito aprovado?', 'Qual a probabilidade de inadimplência nos próximos 90 dias?', 'Preciso simular um stress test'],
};

const ML_MODELS: Record<string, { model: string; label: string; features: { name: string; impact: number }[] }> = {
  risco: { model: 'Regressão Logística · Risco de Crédito', label: 'Probabilidade de inadimplência',
    features: [{ name: 'Histórico de pagamento', impact: 38 }, { name: 'Utilização do limite', impact: 27 }, { name: 'Tempo de relacionamento', impact: 19 }, { name: 'Renda declarada', impact: 16 }] },
  cientista: { model: 'XGBoost · Propensão de Churn', label: 'Probabilidade de cancelamento',
    features: [{ name: 'Frequência de uso', impact: 34 }, { name: 'Chamados de suporte', impact: 24 }, { name: 'Produtos ativos', impact: 22 }, { name: 'NPS recente', impact: 20 }] },
  default: { model: 'Random Forest · Classificação Tabular', label: 'Classe prevista com maior probabilidade',
    features: [{ name: 'Variável A', impact: 30 }, { name: 'Variável B', impact: 26 }, { name: 'Variável C', impact: 24 }, { name: 'Variável D', impact: 20 }] },
};

/* ---------------- login screen ---------------- */
const LOGIN_PROFILES = [
  { id: 'analista', label: 'Analista de Dados', glyph: GAnalyst },
  { id: 'dev', label: 'Engenharia de Software', glyph: GDev },
  { id: 'risco', label: 'Risco & Compliance', glyph: GRisk },
];

const LoginScreen: React.FC<{
  authing: boolean; onSubmit: () => void;
  profile: string; setProfile: (id: string) => void;
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
}> = ({ authing, onSubmit, profile, setProfile, email, setEmail, password, setPassword }) => {
  const canSubmit = (email.trim().length > 3 && password.trim().length > 0) || !!profile;
  return (
    <div className="login-screen">
      <div className="login-glow" />
      <div className="login-card-wrap">
      <div className="login-card">
        <div className="login-logo-row">
          <div className="mark-avatar" style={{ width: 36, height: 36, borderRadius: 10 }}><Arc size={19} /></div>
          <div><b>Plataforma de IA</b><span>Acesso corporativo · HM Bank</span></div>
        </div>
        <h1 className="login-title">Bem-vinda de volta</h1>
        <p className="login-sub">Entre com sua conta corporativa para acessar a plataforma.</p>

        <button className="sso-btn" onClick={onSubmit} disabled={authing}>
          {authing ? <span className="spinner" /> : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
          )}
          {authing ? 'Autenticando...' : 'Entrar com SSO Corporativo'}
        </button>

        <div className="login-divider">ou continue com e-mail corporativo</div>

        <div className="field">
          <label htmlFor="login-email">E-mail corporativo</label>
          <input id="login-email" type="email" placeholder="nome.sobrenome@hmbank.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="login-password">Senha</label>
          <input id="login-password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <p className="login-demo-hint">Credenciais de demonstração já preenchidas — é só clicar em <b>Entrar</b>.</p>

        <div className="profile-label">Acessar como</div>
        <div className="profile-picker">
          {LOGIN_PROFILES.map(p => (
            <button
              key={p.id} type="button"
              className={'profile-chip' + (profile === p.id ? ' active' : '')}
              onClick={() => setProfile(profile === p.id ? '' : p.id)}
            >
              <p.glyph size={15} color="currentColor" />
              {p.label}
            </button>
          ))}
        </div>

        <button className="login-submit" disabled={!canSubmit || authing} onClick={onSubmit}>
          {authing && <span className="spinner dark" />}
          {authing ? 'Autenticando...' : 'Entrar'}
        </button>

        <p className="login-note">Ambiente de demonstração · autenticação simulada para fins de portfólio</p>
      </div>
      </div>
    </div>
  );
};

/* ---------------- app ---------------- */
const USER_NAME = 'Hágata Mendes';
const USER_ROLE = 'Engenheira de Software Full Stack';

const PANEL_META: Record<string, { title: string; sub: string; icon: string }> = {
  dashboard: { title: 'Dashboard Principal', sub: 'Métricas e consumo da plataforma', icon: 'dashboard' },
  agenda: { title: 'Agenda', sub: 'Seus próximos compromissos', icon: 'calendar' },
  guardrails: { title: 'Guardrails e Auditoria de Prompts', sub: 'Governança & Compliance', icon: 'shield' },
  access: { title: 'Controle de Acesso por Departamento', sub: 'Governança & Compliance', icon: 'lock' },
  cloud: { title: 'Status da Nuvem', sub: 'Sistema & Infraestrutura', icon: 'cloud' },
  settings: { title: 'Configurações da Conta', sub: 'Sistema & Infraestrutura', icon: 'gear' },
};

const BREADCRUMB_GROUP: Record<string, string> = {
  dashboard: 'Visão Geral',
  agenda: 'Visão Geral',
  guardrails: 'Governança & Compliance',
  access: 'Governança & Compliance',
  cloud: 'Sistema & Infraestrutura',
  settings: 'Sistema & Infraestrutura',
};

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [authed, setAuthed] = React.useState(false);
  const [authing, setAuthing] = React.useState(false);
  const [loginProfile, setLoginProfile] = React.useState('');
  const [loginEmail, setLoginEmail] = React.useState('hagata.mendes@hmbank.com');
  const [loginPassword, setLoginPassword] = React.useState('demo@2026');
  const [activeId, setActiveId] = React.useState('beto');
  const [view, setView] = React.useState<'chat' | 'dashboard' | 'agenda' | 'guardrails' | 'access' | 'cloud' | 'settings'>('chat');
  const [rosterOpen, setRosterOpen] = React.useState(true);
  const [justCleared, setJustCleared] = React.useState(false);
  const [railTab, setRailTab] = React.useState<'ia' | 'mensagens' | 'agenda'>('ia');
  const [threads, setThreads] = React.useState<Record<string, ChatMessage[]>>({});
  const [animateId, setAnimateId] = React.useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [latencies, setLatencies] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(AGENTS.map(a => [a.id, 30 + Math.floor(Math.random() * 90)]))
  );
  const [queryCount, setQueryCount] = React.useState(4821);
  const [listening, setListening] = React.useState(false);
  const [micSupported, setMicSupported] = React.useState(true);
  const [micHint, setMicHint] = React.useState('');
  const [doc, setDoc] = React.useState<DocContext | null>(null);
  const [clock, setClock] = React.useState(() => new Date());
  const [avatarUrl, setAvatarUrl] = React.useState<string>(() => {
    try { return localStorage.getItem('hmbank-avatar') || ''; } catch { return ''; }
  });
  const [toast, setToast] = React.useState<{ kind?: 'colleague' | 'export'; name: string; initials: string; color: string; text: string; icon?: string } | null>(null);
  const [squadOpen, setSquadOpen] = React.useState(false);
  const [squad, setSquad] = React.useState(SQUADS[0]);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [paletteQuery, setPaletteQuery] = React.useState('');
  const [panelLoading, setPanelLoading] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const recognitionRef = React.useRef<any>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const folderInputRef = React.useRef<HTMLInputElement>(null);
  const [attachMenuOpen, setAttachMenuOpen] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(o => !o);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setSquadOpen(false);
        setAttachMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = clock.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const nowHM = clock.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const greetKind = clock.getHours() < 12 ? 'manha' : clock.getHours() < 18 ? 'tarde' : 'noite';
  const greetLabel = greetKind === 'manha' ? 'Bom dia' : greetKind === 'tarde' ? 'Boa tarde' : 'Boa noite';

  React.useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    const scheduleNext = () => {
      const delay = 35000 + Math.random() * 40000;
      const t = setTimeout(() => {
        if (cancelled) return;
        const pick = TOAST_POOL[Math.floor(Math.random() * TOAST_POOL.length)];
        setToast(pick);
        const hideT = setTimeout(() => setToast(null), 6000);
        scheduleNext();
      }, delay);
      return t;
    };
    const first = setTimeout(() => { if (!cancelled) { setToast(TOAST_POOL[0]); setTimeout(() => setToast(null), 6000); } }, 14000);
    const loopId = scheduleNext();
    return () => { cancelled = true; clearTimeout(first); clearTimeout(loopId); };
  }, [authed]);

  React.useEffect(() => {
    if (!authed) return;
    setPanelLoading(true);
    const t = setTimeout(() => setPanelLoading(false), 360);
    return () => clearTimeout(t);
  }, [view, activeId, authed]);

  const onAvatarChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setAvatarUrl(url);
      try { localStorage.setItem('hmbank-avatar', url); } catch {}
    };
    reader.readAsDataURL(file);
  };

  const renderAvatar = (size: number, className: string) => (
    <button
      type="button" className={className + ' avatar-upload'} style={{ width: size, height: size }}
      onClick={() => avatarInputRef.current?.click()} aria-label="Alterar foto de perfil" title="Alterar foto de perfil"
    >
      {avatarUrl ? <img src={avatarUrl} alt="" /> : 'HM'}
      <span className="avatar-edit">
        <svg width={Math.round(size * 0.4)} height={Math.round(size * 0.4)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></svg>
      </span>
    </button>
  );

  const agent = agentById(activeId);

  // dynamic tab title + favicon per active agent
  React.useEffect(() => {
    document.title = authed ? agent.name + ' · Plataforma de IA' : 'Plataforma de IA · HM Bank';
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath(); ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fillStyle = agent.id === 'beto' ? '#0B7FB5' : agent.color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '700 30px Inter, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(agent.name.charAt(0).toUpperCase(), 32, 35);
        const url = canvas.toDataURL('image/png');
        let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
        if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
        link.href = url;
      }
    } catch {}
  }, [agent.id, agent.name, agent.color, authed]);

  // live latency + query counter ticking (simulated real-time telemetry)
  React.useEffect(() => {
    const id = setInterval(() => {
      setLatencies(prev => {
        const next = { ...prev };
        AGENTS.forEach(a => {
          const jitter = Math.floor(Math.random() * 14) - 7;
          next[a.id] = Math.max(18, (prev[a.id] ?? 50) + jitter);
        });
        return next;
      });
    }, 3200);
    const id2 = setInterval(() => setQueryCount(c => c + Math.floor(Math.random() * 3) + 1), 4500);
    return () => { clearInterval(id); clearInterval(id2); };
  }, []);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [threads, activeId]);

  React.useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setMicSupported(false); return; }
    const rec = new SR();
    rec.lang = 'pt-BR';
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart = () => setListening(true);
    rec.onresult = (e: any) => {
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      setInput(t);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
  }, []);

  const onFileChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const name = file.name || 'politica_credito.pdf';
    const sizeKB = Math.max(96, Math.round(file.size / 1024)) || 248;
    const pages = Math.max(4, Math.round(sizeKB / 34));
    const chunks = pages * 3;
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const uploadMsg: ChatMessage = {
      id: 'up-' + Date.now(), role: 'agent', text: '', time,
      kind: 'upload', status: 'indexing', fileName: name, fileSizeKB: sizeKB, pages, chunks,
    };
    setThreads(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), uploadMsg] }));
    setTimeout(() => {
      setThreads(prev => ({
        ...prev,
        [activeId]: (prev[activeId] || []).map(m => m.id === uploadMsg.id ? { ...m, status: 'done' as const } : m),
      }));
      setDoc({ name, pages, chunks });
    }, INDEX_STEPS.length * 520 + 260);
  };

  const onFolderChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    e.target.value = '';
    if (!files || files.length === 0) return;
    const count = files.length;
    let totalKB = 0;
    for (let i = 0; i < files.length; i++) totalKB += files[i].size / 1024;
    totalKB = Math.max(120, Math.round(totalKB)) || 320;
    const firstPath = (files[0] as any).webkitRelativePath as string | undefined;
    const folderName = (firstPath ? firstPath.split('/')[0] : files[0].name) || 'pasta';
    const pages = Math.max(count, Math.round(totalKB / 40));
    const chunks = pages * 3;
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const uploadMsg: ChatMessage = {
      id: 'up-' + Date.now(), role: 'agent', text: '', time,
      kind: 'upload', status: 'indexing', fileName: folderName + ' · ' + count + ' arquivo' + (count > 1 ? 's' : ''), fileSizeKB: totalKB, pages, chunks,
    };
    setThreads(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), uploadMsg] }));
    setTimeout(() => {
      setThreads(prev => ({
        ...prev,
        [activeId]: (prev[activeId] || []).map(m => m.id === uploadMsg.id ? { ...m, status: 'done' as const } : m),
      }));
      setDoc({ name: folderName, pages, chunks });
    }, INDEX_STEPS.length * 520 + 260);
  };

  const toggleMic = () => {
    if (!micSupported) {
      setMicHint('Reconhecimento de voz não suportado neste navegador');
      setTimeout(() => setMicHint(''), 2600);
      return;
    }
    if (listening) recognitionRef.current?.stop();
    else { try { recognitionRef.current?.start(); } catch {} }
  };

  const requestExport = (format: 'pdf' | 'xlsx') => {
    const fileName = format === 'pdf'
      ? 'analise-' + activeId + '-' + Date.now().toString().slice(-4) + '.pdf'
      : 'dados-' + activeId + '-' + Date.now().toString().slice(-4) + '.xlsx';
    setToast({
      kind: 'export',
      name: 'Exportação concluída',
      initials: '',
      color: 'var(--success)',
      icon: format === 'pdf' ? 'docs' : 'database',
      text: fileName + ' gerado por ' + agent.name + ' (demonstração de interface)',
    });
    setTimeout(() => setToast(null), 5200);
  };

  const send = (overrideText?: string) => {
    const text = (overrideText !== undefined ? overrideText : input).trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { id: 'u-' + Date.now(), role: 'user', text, time };

    const lower = text.toLowerCase();
    const isGreeting = GREETING_RE.test(text.trim());
    const isThanks = !isGreeting && THANKS_RE.test(text.trim());
    const isFarewell = !isGreeting && !isThanks && FAREWELL_RE.test(text.trim());
    const isCapabilityQ = !isGreeting && !isThanks && !isFarewell && CAPABILITY_Q_RE.test(lower);
    const isHelp = !isGreeting && !isThanks && !isFarewell && !isCapabilityQ && HELP_RE.test(lower);
    const isRequestHelp = !isGreeting && !isThanks && !isFarewell && !isCapabilityQ && !isHelp && REQUEST_HELP_RE.test(lower);
    const isQuick = isGreeting || isThanks || isFarewell || isHelp || isCapabilityQ || isRequestHelp;
    const routedId = activeId === 'beto' ? classifyRoute(text) : activeId;
    const respondingAgent = agentById(routedId);
    const mlTrigger = !isQuick && ML_KEYWORDS.some(k => lower.includes(k));
    const nosqlTrigger = !isQuick && !mlTrigger && NOSQL_KEYWORDS.some(k => lower.includes(k));
    const sqlTrigger = !isQuick && !mlTrigger && !nosqlTrigger && (routedId === 'analista' || SQL_KEYWORDS_Q.some(k => lower.includes(k)));

    let trace: string[];
    if (isQuick) {
      trace = [];
    } else {
      trace = ['Analisando intenção via LLM'];
      if (activeId === 'beto') {
        trace.push(routedId !== 'beto' ? 'Roteando para ' + respondingAgent.name : 'Respondendo diretamente, sem necessidade de especialista');
      }
      if (sqlTrigger) trace.push('Gerando consulta SQL', 'Consultando banco relacional (RDS/PostgreSQL)');
      else if (nosqlTrigger) trace.push('Consultando banco não-relacional (DynamoDB)');
      else if (mlTrigger) trace.push('Executando modelo de Machine Learning clássico');
      else trace.push('Buscando contexto na base vetorial (RAG)');
      trace.push('Gerando resposta com o LLM da plataforma');
    }

    let agentMsg: ChatMessage;

    if (isGreeting) {
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, thinkMs: 3000,
        text: 'Oi, ' + USER_NAME.split(' ')[0] + ', tudo bem?',
        confidence: 97,
      };
    } else if (isThanks) {
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, thinkMs: 900,
        text: THANKS_REPLIES[Math.floor(Math.random() * THANKS_REPLIES.length)],
        confidence: 98,
      };
    } else if (isFarewell) {
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, thinkMs: 900,
        text: FAREWELL_REPLIES[Math.floor(Math.random() * FAREWELL_REPLIES.length)],
        confidence: 98,
      };
    } else if (isHelp) {
      const helpTopic = SUBTOPICS.beto[0];
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, thinkMs: 1400,
        text: activeId === 'beto'
          ? helpTopic.text
          : 'Sou ' + respondingAgent.name + ', especialista em ' + respondingAgent.subtitle.toLowerCase() + '. ' + (REPLIES[routedId]?.text || ''),
        confidence: 96,
      };
    } else if (isCapabilityQ) {
      const techNames = AGENTS.filter(a => a.area === 'tech').map(a => a.name).join(', ');
      const bizNames = AGENTS.filter(a => a.area === 'business').map(a => a.name).join(', ');
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, thinkMs: 1400,
        text: 'A plataforma tem ' + (AGENTS.length - 1) + ' especialistas, além de mim: em Tecnologia — ' + techNames + '; em Negócios — ' + bizNames + '. É só clicar em um deles na lateral ou me perguntar direto que eu já roteio.',
        confidence: 97,
      };
    } else if (isRequestHelp) {
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, thinkMs: 1100,
        text: REQUEST_HELP_REPLIES[Math.floor(Math.random() * REQUEST_HELP_REPLIES.length)],
        confidence: 95,
      };
    } else if (nosqlTrigger) {
      const isProfile = /perfil|cliente|preferê|prefere/.test(lower);
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, kind: 'nosql', trace,
        execMs: 6 + Math.floor(Math.random() * 9),
        nosqlTable: isProfile ? 'perfis_cliente' : 'sessoes_usuario',
        nosqlKey: isProfile ? 'cliente_id: "CX-4471"' : 'session_id: "sess_8f21ac"',
        nosqlItem: isProfile ? {
          cliente_id: 'CX-4471', segmento: 'Private', canal_preferido: 'App mobile', ultima_interacao: '2026-09-24T18:12:00Z',
        } : {
          session_id: 'sess_8f21ac', usuario: USER_NAME, agente_ativo: respondingAgent.name, expira_em: '2026-09-25T23:59:00Z',
        },
        text: isProfile
          ? 'Encontrei o perfil na tabela de chave-valor: cliente Private, canal preferido é o app mobile — dado que já veio pronto pra personalizar a resposta, sem precisar de JOIN.'
          : 'Recuperei a sessão ativa direto pela chave de partição — é assim que a plataforma mantém o contexto da conversa entre uma pergunta e outra, com latência de milissegundos.',
        confidence: 91 + Math.floor(Math.random() * 7),
        sources: ['dynamodb.' + (isProfile ? 'perfis_cliente' : 'sessoes_usuario')],
      };
    } else if (sqlTrigger) {
      const isWallet = /carteira|limite|transaç|transac/.test(lower);
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, kind: 'sql', trace,
        execMs: 84 + Math.floor(Math.random() * 70),
        sqlQuery: isWallet
          ? "SELECT t.data_transacao, t.tipo, t.valor, c.limite_credito\nFROM transacoes t\nJOIN carteira_clientes c ON c.id = t.carteira_id\nWHERE c.id = 'CX-4471'\nORDER BY t.data_transacao DESC\nLIMIT 5;"
          : "SELECT produto, SUM(valor) AS receita\nFROM transacoes\nWHERE data_transacao >= CURRENT_DATE - INTERVAL '90 days'\nGROUP BY produto\nORDER BY receita DESC\nLIMIT 5;",
        columns: isWallet ? ['data_transacao', 'tipo', 'valor (R$)', 'limite_credito (R$)'] : ['produto', 'receita (R$)'],
        rows: isWallet ? [
          ['2026-09-18', 'compra', '1.240,00', '350.000,00'],
          ['2026-09-15', 'pagamento', '-3.800,00', '350.000,00'],
          ['2026-09-09', 'compra', '2.150,00', '350.000,00'],
          ['2026-09-02', 'estorno', '-410,00', '350.000,00'],
          ['2026-08-27', 'compra', '5.600,00', '350.000,00'],
        ] : [
          ['Crédito Corporativo', '18.420.000,00'], ['Cartões', '11.980.000,00'], ['Investimentos', '9.640.000,00'], ['Seguros', '4.310.000,00'], ['Câmbio', '3.250.000,00'],
        ],
        rowCount: 5,
        text: isWallet
          ? 'A carteira consultada está com limite de R$ 350.000,00 aprovado, sem ocorrências acima do limite nas últimas transações.'
          : 'Crédito Corporativo segue como o produto de maior receita nos últimos 90 dias — já deixo pronto pra exportar num dashboard.',
        confidence: 88 + Math.floor(Math.random() * 8),
        sources: doc ? ['rds-prod.transacoes', doc.name + ' · RAG'] : ['rds-prod.transacoes'],
      };
    } else if (mlTrigger) {
      const pick = ML_MODELS[routedId] || ML_MODELS.default;
      const score = 0.55 + Math.random() * 0.4;
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, kind: 'ml', trace,
        mlModel: pick.model, mlScoreLabel: pick.label, mlScore: score, mlFeatures: pick.features,
        text: 'O modelo estatístico indicou ' + (score * 100).toFixed(1) + '%. Combinei essa saída numérica com o contexto da sua pergunta pra trazer uma explicação mais completa — não é só o LLM "achando", é uma previsão calculada.',
        confidence: 85 + Math.floor(Math.random() * 10),
        sources: doc ? [doc.name + ' · RAG'] : undefined,
      };
    } else {
      const reply = REPLIES[routedId] || REPLIES.beto;
      const subtopic = (SUBTOPICS[routedId] || []).find(s => s.kws.some(k => lower.includes(k)));
      const mergedSources = doc
        ? [...(subtopic?.sources || reply.sources || []), doc.name + ' · RAG']
        : (subtopic?.sources || reply.sources);
      const opener = OPENERS[Math.floor(Math.random() * OPENERS.length)];
      const routeNote = activeId === 'beto' && routedId !== 'beto' ? ' Já te conectei com ' + respondingAgent.name + ' — ' : ' ';
      const body = subtopic ? subtopic.text : reply.text;
      agentMsg = {
        id: 'a-' + Date.now(), role: 'agent', time, trace,
        text: opener + ' Sobre "' + shortQuote(text) + '":' + routeNote + body,
        sources: mergedSources,
        confidence: subtopic ? 87 + Math.floor(Math.random() * 9) : 78 + Math.floor(Math.random() * 13),
      };
    }

    setThreads(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), userMsg, agentMsg] }));
    setAnimateId(agentMsg.id);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleLogin = () => {
    if (authing) return;
    setAuthing(true);
    setTimeout(() => {
      setAuthing(false);
      setAuthed(true);
      if (loginProfile) setActiveId(loginProfile);
    }, 1050);
  };

  const handleLogout = () => {
    setAuthed(false);
    setActiveId('beto');
    setAnimateId(null);
    setLoginProfile('');
    setLoginEmail('');
    setLoginPassword('');
    setSidebarOpen(false);
    setView('chat');
  };

  const onSelectAgent = (id: string) => {
    setActiveId(id);
    setAnimateId(null);
    setSidebarOpen(false);
    setView('chat');
    setRailTab('ia');
    setPaletteOpen(false);
  };

  const goToView = (v: typeof view) => {
    setView(v);
    setSidebarOpen(false);
    if (v !== 'agenda') setRailTab('ia');
    setPaletteOpen(false);
  };

  const openMensagens = () => {
    setRailTab('mensagens');
    setSidebarOpen(true);
    setPaletteOpen(false);
    setToast(null);
  };

  const paletteItems = React.useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    const items: { type: string; id: string; label: string; sub: string; color?: string; initials?: string; icon?: string; glyph?: React.FC<GlyphProps> }[] = [
      ...AGENTS.map(a => ({ type: 'agent', id: a.id, label: a.name, sub: a.subtitle, color: a.color, glyph: a.glyph })),
      { type: 'painel', id: 'dashboard', label: 'Dashboard Principal', sub: 'Métricas e consumo', icon: 'dashboard' },
      { type: 'painel', id: 'agenda', label: 'Agenda', sub: 'Seus compromissos', icon: 'calendar' },
      { type: 'painel', id: 'guardrails', label: 'Guardrails e Auditoria', sub: 'Governança & Compliance', icon: 'shield' },
      { type: 'painel', id: 'access', label: 'Controle de Acesso', sub: 'Departamentos', icon: 'lock' },
      { type: 'painel', id: 'cloud', label: 'Status da Nuvem', sub: 'AWS / Servidores', icon: 'cloud' },
      { type: 'painel', id: 'settings', label: 'Configurações da Conta', sub: 'Perfil e preferências', icon: 'gear' },
      ...DM_THREADS.map(d => ({ type: 'mensagem', id: d.id, label: d.name, sub: d.preview, color: d.color, initials: d.initials })),
    ];
    if (!q) return items;
    return items.filter(it => (it.label + ' ' + it.sub).toLowerCase().includes(q));
  }, [paletteQuery]);

  const handlePaletteSelect = (it: (typeof paletteItems)[number]) => {
    if (it.type === 'agent') onSelectAgent(it.id);
    else if (it.type === 'painel') goToView(it.id as typeof view);
    else openMensagens();
    setPaletteQuery('');
  };

  const techAgents = AGENTS.filter(a => a.area === 'tech');
  const bizAgents = AGENTS.filter(a => a.area === 'business');
  const thread = threads[activeId] || [];
  const dmUnreadTotal = DM_THREADS.reduce((s, d) => s + d.unread, 0);

  if (!authed) {
    return (
      <LoginScreen
        authing={authing}
        onSubmit={handleLogin}
        profile={loginProfile}
        setProfile={setLoginProfile}
        email={loginEmail}
        setEmail={setLoginEmail}
        password={loginPassword}
        setPassword={setLoginPassword}
      />
    );
  }

  return (
    <>
      <input type="file" accept="image/*" ref={avatarInputRef} style={{ display: 'none' }} onChange={onAvatarChosen} />

      {toast && (
        <div className="toast-wrap">
          <div className="toast-card" onClick={toast.kind === 'export' ? () => setToast(null) : openMensagens}>
            <span className="toast-avatar" style={{ background: toast.color }}>
              {toast.kind === 'export' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : toast.icon ? React.createElement(NAV_ICONS[toast.icon], { size: 14 }) : toast.initials}
            </span>
            <div className="toast-body">
              <div className="toast-title">{toast.name} <span className="toast-app-tag">{toast.kind === 'export' ? 'Central de Inteligência' : 'Mensagens'}</span></div>
              <div className="toast-text">{toast.text}</div>
            </div>
            <button className="toast-close" onClick={(e) => { e.stopPropagation(); setToast(null); }} aria-label="Fechar notificação">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}

      {paletteOpen && (
        <div className="cmdk-backdrop" onClick={() => setPaletteOpen(false)}>
          <div className="cmdk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmdk-input-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                autoFocus
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Buscar agentes, painéis, mensagens..."
              />
              <span className="search-kbd">Esc</span>
            </div>
            <div className="cmdk-list">
              {paletteItems.length === 0 && <div className="cmdk-empty">Nada encontrado para "{paletteQuery}"</div>}
              {paletteItems.map(it => (
                <button className="cmdk-item" key={it.type + it.id} onClick={() => handlePaletteSelect(it)}>
                  {it.type === 'agent' ? (
                    <span className="cmdk-item-icon" style={{ background: it.color }}>{it.glyph && <it.glyph size={14} />}</span>
                  ) : it.type === 'painel' ? (
                    <span className="cmdk-item-icon" style={{ background: 'var(--navy-800)' }}>{it.icon && React.createElement(NAV_ICONS[it.icon], { size: 14 })}</span>
                  ) : (
                    <span className="cmdk-item-icon" style={{ background: it.color }}>{it.initials}</span>
                  )}
                  <span className="cmdk-item-meta">
                    <span className="cmdk-item-label">{it.label}</span>
                    <span className="cmdk-item-sub">{it.sub}</span>
                  </span>
                  <span className="cmdk-item-type">{it.type === 'agent' ? 'Agente' : it.type === 'painel' ? 'Painel' : 'Mensagem'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={'backdrop' + (sidebarOpen ? ' open' : '')} onClick={() => setSidebarOpen(false)} />
      <aside className={'sidebar' + (sidebarOpen ? ' open' : '')}>
        <div className="corp-taskbar" aria-hidden="true">
          <div className="corp-tab" title="Outlook · minimizado na barra de tarefas">
            <span className="corp-tab-icon" style={{ background: '#0A2767' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
            </span>
            <span className="corp-tab-meta"><span className="corp-tab-label">Outlook</span><span className="corp-tab-sub">6 não lidos</span></span>
          </div>
          <div className="corp-tab" title="Excel · minimizado na barra de tarefas">
            <span className="corp-tab-icon" style={{ background: '#107C41' }}>X</span>
            <span className="corp-tab-meta"><span className="corp-tab-label">Q1_Consumo_IA.xlsx</span><span className="corp-tab-sub">salvo há 12 min</span></span>
          </div>
          <div className="corp-tab" title="PowerPoint · minimizado na barra de tarefas">
            <span className="corp-tab-icon" style={{ background: '#B7472A' }}>P</span>
            <span className="corp-tab-meta"><span className="corp-tab-label">Apresentação_Board.pptx</span><span className="corp-tab-sub">editado ontem</span></span>
          </div>
          <div className="corp-tab active" title="Plataforma de IA · janela ativa">
            <span className="corp-tab-icon" style={{ background: 'linear-gradient(135deg,var(--azure),var(--navy-800))' }}><Arc size={11} /></span>
            <span className="corp-tab-meta"><span className="corp-tab-label">Plataforma de IA</span><span className="corp-tab-sub">janela ativa</span></span>
          </div>
        </div>

        <div className="sidebar-body">
        <div className="icon-rail" aria-label="Aplicativos da plataforma corporativa">
          <div className="mark-avatar rail-logo"><Arc size={17} /></div>

          <RailItem icon="chatbubble" label="Mensagens" active={railTab === 'mensagens'} badge={dmUnreadTotal} onClick={() => setRailTab('mensagens')} />
          <RailItem icon="robot" label="IA" active={railTab === 'ia'} onClick={() => setRailTab('ia')} />
          <RailItem icon="calendar" label="Agenda" active={railTab === 'agenda'} onClick={() => { setRailTab('agenda'); goToView('agenda'); }} />

          <div className="rail-divider" />

          <RailItem icon="docs" label="Docs" decorative />
          <RailItem icon="database" label="Base" decorative />
          <RailItem icon="video" label="Reuniões" decorative />
          <RailItem icon="users" label="Contatos" decorative />
        </div>

        <div className="sidebar-panel">
          <div className="brand">
            <div className="mark-avatar" style={{ width: 38, height: 38, borderRadius: 10 }}><Arc size={20} /></div>
            <div className="squad-switch" style={{ flex: 1, minWidth: 0 }}>
              <button className="squad-btn" onClick={() => setSquadOpen(o => !o)} aria-expanded={squadOpen}>
                <span className="brand-text"><b>{squad.name}</b><span>{squad.sub} · HM Bank</span></span>
                <svg className={'squad-chev' + (squadOpen ? ' open' : '')} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {squadOpen && (
                <div className="squad-menu">
                  {SQUADS.map(s => (
                    <button key={s.id} className={'squad-item' + (s.id === squad.id ? ' active' : '')} onClick={() => { setSquad(s); setSquadOpen(false); }}>
                      <span>{s.name}</span>
                      <span className="dot" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="status-line">
            {railTab === 'ia' && (<><span className="live-dot" /> Plataforma online · {queryCount.toLocaleString('pt-BR')} consultas · sinc. às {timeStr.slice(0, 5)}</>)}
            {railTab === 'mensagens' && (<>{dmUnreadTotal > 0 ? `${dmUnreadTotal} mensagens não lidas` : 'Tudo em dia por aqui'}</>)}
            {railTab === 'agenda' && (<>Hoje você tem {MEETINGS_TODAY.length} compromissos</>)}
          </div>

          <nav className="nav-scroll" aria-label="Navegação da plataforma">
            {railTab === 'ia' && (
              <>
                <NavSection title="Visão Geral">
                  <NavItem icon="dashboard" label="Dashboard Principal" sub="Métricas e consumo" active={view === 'dashboard'} onClick={() => goToView('dashboard')} />
                </NavSection>

                <NavSection title="Central de Inteligência (Agentes)">
                  <NavItem icon="upload" label="RAG Corporativo" sub="Documentos e políticas" active={view === 'chat' && activeId === 'juridico'} onClick={() => onSelectAgent('juridico')} />
                  <NavItem icon="sql" label="Text-to-SQL" sub="Analytics e relatórios" active={view === 'chat' && activeId === 'analista'} onClick={() => onSelectAgent('analista')} />
                  <NavItem icon="ml" label="Modelos Clássicos de Risco" sub="Scoring e ML" active={view === 'chat' && activeId === 'risco'} onClick={() => onSelectAgent('risco')} />

                  <button className="nav-subtoggle" onClick={() => setRosterOpen(o => !o)} aria-expanded={rosterOpen}>
                    <span>Todos os agentes</span>
                    <svg className={'chev' + (rosterOpen ? '' : ' collapsed')} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6" /></svg>
                  </button>

                  {rosterOpen && (
                    <>
                      <div className="search-box">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                        <input ref={searchInputRef} type="text" placeholder="Buscar conversas..." />
                        <span className="search-kbd">{isMac ? '⌘K' : 'Ctrl K'}</span>
                      </div>

                      <button
                        className={'new-chat' + (justCleared ? ' done' : '')}
                        onClick={() => {
                          setThreads(prev => ({ ...prev, [activeId]: [] }));
                          setAnimateId(null);
                          setView('chat');
                          setJustCleared(true);
                          setTimeout(() => setJustCleared(false), 1400);
                        }}
                      >
                        {justCleared ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M20 6 9 17l-5-5" /></svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
                        )}
                        {justCleared ? 'Conversa reiniciada' : 'Nova conversa'}
                      </button>

                      <button className={'beto-row' + (view === 'chat' && activeId === 'beto' ? ' active' : '')} onClick={() => onSelectAgent('beto')}>
                        <AgentAvatar agent={agentById('beto')} size={32} />
                        <span className="row-meta">
                          <span className="row-name">Beto</span>
                          <span className="row-sub">Orquestrador · sempre disponível</span>
                        </span>
                        <span className="row-right">
                          <span className="live-dot" style={{ animation: 'none' }} />
                          <span className="latency-chip mono">{latencies.beto}ms</span>
                        </span>
                      </button>

                      <AgentGroup title="TECNOLOGIA" dotClass="tech" agents={techAgents} activeId={view === 'chat' ? activeId : ''} latencies={latencies} onSelect={onSelectAgent} />
                      <AgentGroup title="NEGÓCIOS" dotClass="biz" agents={bizAgents} activeId={view === 'chat' ? activeId : ''} latencies={latencies} onSelect={onSelectAgent} />

                      <div className="history-wrap">
                        <div className="group-head" style={{ cursor: 'default' }}>
                          <span className="group-head-l"><span className="group-title">CONVERSAS ATIVAS</span></span>
                        </div>
                        {AGENTS.filter(a => (threads[a.id] || []).length > 0).map(a => (
                          <button key={a.id} className={'history-item' + (view === 'chat' && a.id === activeId ? ' active' : '')} onClick={() => onSelectAgent(a.id)}>
                            {a.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </NavSection>

                <NavSection title="Governança & Compliance">
                  <NavItem icon="shield" label="Guardrails e Auditoria de Prompts" sub="Monitoramento em tempo real" active={view === 'guardrails'} onClick={() => goToView('guardrails')} />
                  <NavItem icon="lock" label="Controle de Acesso por Departamento" sub="Segregação de funções" active={view === 'access'} onClick={() => goToView('access')} />
                </NavSection>

                <NavSection title="Sistema & Infraestrutura">
                  <NavItem icon="cloud" label="Status da Nuvem" sub="AWS / Servidores" active={view === 'cloud'} onClick={() => goToView('cloud')} />
                  <NavItem icon="gear" label="Configurações da Conta" sub="Perfil e preferências" active={view === 'settings'} onClick={() => goToView('settings')} />
                </NavSection>
              </>
            )}

            {railTab === 'mensagens' && (
              <>
                <div className="search-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  <input type="text" placeholder="Buscar conversas..." />
                </div>
                <div className="nav-section-title" style={{ padding: '4px 8px 7px' }}>Conversas recentes</div>
                {DM_THREADS.map(d => (
                  <div className="dm-row" key={d.id}>
                    <span className="dm-avatar" style={{ background: d.color }}>
                      {d.initials}
                      <span className={'presence-dot ' + d.presence} />
                    </span>
                    <span className="dm-meta">
                      <span className="dm-name">{d.name}</span>
                      <span className="dm-preview">{d.preview}</span>
                    </span>
                    <span className="dm-time">{d.time}</span>
                    {d.unread > 0 && <span className="dm-unread">{d.unread}</span>}
                  </div>
                ))}
              </>
            )}

            {railTab === 'agenda' && (
              <>
                <div className="nav-section-title" style={{ padding: '4px 8px 7px' }}>Hoje · {MEETINGS_TODAY.length} eventos</div>
                {MEETINGS_TODAY.map((m, i) => (
                  <button className="agenda-mini-item" key={i} onClick={() => goToView('agenda')}>
                    <span className="agenda-mini-time mono">{m.time}</span>
                    <span className="agenda-mini-dot" style={{ background: TYPE_COLOR[m.type] || 'var(--azure)' }} />
                    <span className="agenda-mini-title">{m.title}</span>
                  </button>
                ))}
                <button className="new-chat" style={{ marginTop: 8 }} onClick={() => goToView('agenda')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
                  Ver agenda completa
                </button>
              </>
            )}
          </nav>

          <div className="sidebar-foot">
            {renderAvatar(30, 'foot-avatar')}
            <div className="who">
              <b>{USER_NAME}</b>
              <span className="foot-role">{USER_ROLE}</span>
              <span className="foot-status"><span className="status-dot" />Usuário ativo</span>
            </div>
          </div>
        </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <div className="topbar-title">
            {view === 'chat' ? (
              <>
                <AgentAvatar agent={agent} size={34} />
                <div>
                  <div className="breadcrumb">
                    <span>Plataforma de IA</span>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 6 6 6-6 6" /></svg>
                    <span>Central de Inteligência</span>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 6 6 6-6 6" /></svg>
                    <span>{agent.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1>{agent.name}</h1>
                    <span className="badge"><span className="status-dot" />online</span>
                  </div>
                  <div className="sub">{agent.subtitle}</div>
                </div>
              </>
            ) : (
              <>
                <div className="mark-avatar" style={{ width: 34, height: 34, borderRadius: 10, color: '#fff' }}>
                  {React.createElement(NAV_ICONS[PANEL_META[view].icon], { size: 16 })}
                </div>
                <div>
                  <div className="breadcrumb">
                    <span>Plataforma de IA</span>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 6 6 6-6 6" /></svg>
                    <span>{BREADCRUMB_GROUP[view]}</span>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 6 6 6-6 6" /></svg>
                    <span>{PANEL_META[view].title}</span>
                  </div>
                  <h1>{PANEL_META[view].title}</h1>
                  <div className="sub">{PANEL_META[view].sub}</div>
                </div>
              </>
            )}
          </div>
          <div className="topbar-right">
            <div className="env-pill" title="Ambiente ativo · região AWS sa-east-1">
              <span className="live-dot" /> PRODUÇÃO · sa-east-1
            </div>
            <div className="clock-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            {timeStr}
          </div>
          <div className="theme-switch">
              <button className={theme !== 'dark' ? 'active' : ''} onClick={() => theme === 'dark' && toggleTheme()} aria-label="Tema claro" title="Tema claro">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8" /></svg>
              </button>
              <button className={theme === 'dark' ? 'active' : ''} onClick={() => theme !== 'dark' && toggleTheme()} aria-label="Tema escuro" title="Tema escuro">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></svg>
              </button>
            </div>
            <div className="user-card">
              {renderAvatar(32, 'user-avatar')}
              <div className="info">
                <b>{USER_NAME}</b>
                <div className="role">{USER_ROLE}</div>
                <div className="active-tag"><span className="status-dot" />Usuário ativo</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout} aria-label="Sair da plataforma">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>
              <span>Sair</span>
            </button>
          </div>
        </div>

        <div className="chat-scroll" ref={scrollRef}>
          <div className="chat-inner">
            {panelLoading ? (
              <div className="skeleton-panel" aria-hidden="true">
                <div className="skel-line" style={{ width: '38%' }} />
                <div className="skel-card" />
                <div className="skel-card" />
                <div className="skel-line" style={{ width: '60%' }} />
                <div className="skel-card" style={{ height: 120 }} />
              </div>
            ) : view === 'chat' ? (
              <>
                <div className="context-strip">
                  <span className={'greet-tag greet-' + greetKind}>{greetLabel}</span>, {USER_NAME.split(' ')[0]} — conversando com <b>{agent.name}</b> · {agent.subtitle.toLowerCase()}
                </div>
                {thread.length === 0 ? (
                  <div className="greet-block">
                    <div className="msg assistant">
                      <AvatarWithBadge agent={agent} size={32} />
                      <div className="msg-body">
                        <div className="msg-head"><span className="msg-name">{agent.name}</span><span className="model-badge">llm-plataforma-v4.2 · RAG v2.3</span></div>
                        <div className="msg-card">
                          <div className="msg-text">{'Oi! Sou ' + (activeId === 'beto' ? 'o Beto, orquestrador da plataforma' : agent.name) + '. Como posso te ajudar hoje?'}</div>
                        </div>
                      </div>
                    </div>
                    <div className="suggestion-row">
                      {(SUGGESTED_PROMPTS[activeId] || SUGGESTED_PROMPTS.beto).map((s, i) => (
                        <button key={i} className="suggestion-chip" onClick={() => send(s)}>{s}</button>
                      ))}
                    </div>
                  </div>
                ) : thread.map((m, i) => (
                  <MessageBubble
                    key={m.id}
                    msg={m}
                    agent={agent}
                    animate={m.id === animateId}
                    userName={USER_NAME}
                    isLast={i === thread.length - 1}
                    onDeepen={() => send('Pode aprofundar essa análise para mim?')}
                    onExportPdf={() => requestExport('pdf')}
                    onExportData={() => requestExport('xlsx')}
                  />
                ))}
              </>
            ) : view === 'dashboard' ? (
              <DashboardPanel queryCount={queryCount} latencies={latencies} />
            ) : view === 'agenda' ? (
              <AgendaPanel now={nowHM} />
            ) : view === 'guardrails' ? (
              <GuardrailsPanel />
            ) : view === 'access' ? (
              <AccessPanel />
            ) : view === 'cloud' ? (
              <CloudPanel />
            ) : (
              <SettingsPanel userName={USER_NAME} userRole={USER_ROLE} theme={theme} toggleTheme={toggleTheme} renderAvatar={renderAvatar} />
            )}
          </div>
        </div>

        {view === 'chat' && <div className="composer-wrap">
          {doc && (
            <div className="doc-chip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
              <span>{doc.name} indexado · contexto ativo para RAG</span>
              <button onClick={() => setDoc(null)} aria-label="Remover contexto do documento">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          )}
          <div className={'composer' + (listening ? ' recording' : '')}>
            <input type="file" accept="image/*" ref={imageInputRef} style={{ display: 'none' }} onChange={onFileChosen} />
            <input type="file" accept=".pdf,.doc,.docx,.xlsx,.csv,.txt,application/pdf" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileChosen} />
            <input type="file" ref={folderInputRef} style={{ display: 'none' }} onChange={onFolderChosen} {...{ webkitdirectory: 'true', directory: 'true' }} multiple />
            <div className="attach-menu-wrap">
              <button className="icon-btn" title="Anexar arquivo" aria-label="Anexar arquivo" onClick={() => setAttachMenuOpen(o => !o)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05 12.25 20.24a5 5 0 0 1-7.07-7.07l9.19-9.19a3.33 3.33 0 0 1 4.71 4.71L9.88 17.9a1.67 1.67 0 0 1-2.36-2.36l8.49-8.48" /></svg>
              </button>
              {attachMenuOpen && (
                <div className="attach-menu">
                  <button className="attach-menu-item" onClick={() => { imageInputRef.current?.click(); setAttachMenuOpen(false); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2.5" /><circle cx="8.5" cy="8.5" r="1.7" /><path d="m21 15-5-5L5 21" /></svg>
                    Upload de imagem
                  </button>
                  <button className="attach-menu-item" onClick={() => { fileInputRef.current?.click(); setAttachMenuOpen(false); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v5h5M8 13h8M8 17h5" /></svg>
                    Upload de documento
                  </button>
                  <button className="attach-menu-item" onClick={() => { folderInputRef.current?.click(); setAttachMenuOpen(false); }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>
                    Upload de pasta
                  </button>
                </div>
              )}
            </div>
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder={'Pergunte algo para ' + (activeId === 'beto' ? 'o Beto' : agent.name) + '...'}
              value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 130) + 'px'; }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            />
            <button className={'icon-btn' + (listening ? ' mic-active' : '')} title="Ditar por voz" aria-label="Ditar por voz" onClick={toggleMic}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" /></svg>
            </button>
            <button className="send-btn" aria-label="Enviar mensagem" onClick={() => send()} disabled={!input.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
            </button>
          </div>
          <div className={listening ? 'recording-hint' : 'composer-note'}>
            {listening ? 'Ouvindo... fale sua pergunta' : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                {micHint || 'Protótipo de interface · respostas simuladas para fins de demonstração'}
              </>
            )}
          </div>
        </div>}
      </div>
    </>
  );
};

export default App;
