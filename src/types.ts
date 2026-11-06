/**
 * NexBank Agentic Customer Service System - Core Types
 * Supporting 2.7M Customers & 18,000 Daily Interactions in India
 */

export type AuthLevel = 'UNAUTHENTICATED' | 'TPIN_VERIFIED' | 'BIOMETRIC_2FA';

export type CustomerTier = 'BASIC_SAVINGS' | 'PREMIER_PLUS' | 'STUDENT_GENZ' | 'NRI_WEALTH';

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  accountNumber: string;
  maskedAadhaar: string; // e.g. "XXXX-XXXX-8921"
  panNumber: string;     // e.g. "ABCDE1234F"
  tier: CustomerTier;
  upiId: string;
  balanceINR: number;
  primaryCardLast4: string;
  cardType: 'RuPay Platinum' | 'Visa Signature' | 'Mastercard World';
  isCardFrozen: boolean;
  internationalTxnEnabled: boolean;
  dailyUpiLimitINR: number;
  openDisputesCount: number;
  authLevel: AuthLevel;
}

export interface BankTransaction {
  id: string;
  date: string;
  merchant: string;
  amountINR: number;
  type: 'DEBIT' | 'CREDIT';
  mode: 'UPI' | 'IMPS' | 'NEFT' | 'ATM' | 'POS' | 'CARD_ONLINE';
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'DISPUTED';
  referenceNumber: string;
  category: string;
  disputed?: boolean;
}

export type IntentDomain =
  | 'ACCOUNT_KYC'
  | 'UPI_PAYMENTS'
  | 'CARDS_LIFECYCLE'
  | 'DISPUTES_FRAUD'
  | 'WEALTH_DEPOSITS'
  | 'REGULATORY_GRIEVANCE';

export interface IntentDefinition {
  id: string;
  domain: IntentDomain;
  domainTitle: string;
  name: string;
  description: string;
  requiredAuthLevel: AuthLevel;
  requiredSlots: string[];
  sampleUtterances: string[];
  isFinancialAdviceSensitive?: boolean;
  isAccountWriteAction?: boolean;
  slaMinutes: number;
}

export interface ExtractedEntity {
  name: string;
  value: string;
  confidence: number;
}

export interface ReasoningStep {
  step: number;
  phase: 'PERCEPTION_PII' | 'INTENT_CLASSIFICATION' | 'KNOWLEDGE_RETRIEVAL' | 'POLICY_EVALUATION' | 'TOOL_EXECUTION' | 'RESPONSE_SYNTHESIS' | 'SAFETY_INVARIANT_AUDIT';
  title: string;
  thought: string;
  actionTaken?: string;
  observation?: string;
  latencyMs: number;
}

export interface DialogueState {
  sessionId: string;
  customerId: string;
  turnCount: number;
  currentIntent: string | null;
  intentDomain: IntentDomain | null;
  intentConfidence: number;
  activeGoal: string;
  slots: Record<string, string>;
  authLevel: AuthLevel;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'FRUSTRATED' | 'ANGRY' | 'DISTRESSED';
  sentimentScore: number; // -1.0 to 1.0
  consecutiveNegativeTurns: number;
  disputeCandidate?: Partial<BankTransaction>;
  pendingAction?: {
    actionType: 'FREEZE_CARD' | 'UNFREEZE_CARD' | 'FILE_DISPUTE' | 'UPDATE_LIMIT' | 'BLOCK_PERMANENT';
    payload: Record<string, any>;
    requiresTpin: boolean;
  };
  hitlTriggered: boolean;
  hitlReason?: string;
  hitlConditionId?: string;
}

export interface KnowledgeDocument {
  id: string;
  domain: IntentDomain;
  title: string;
  summary: string;
  content: string;
  rbiCircularRef?: string;
  turnaroundTimeHours: number;
  applicableFee?: string;
  keywords: string[];
  lastUpdated: string;
}

export interface KnowledgeRetrievalResult {
  query: string;
  retrievalLatencyMs: number;
  documents: Array<{
    document: KnowledgeDocument;
    score: number;
    matchSnippet: string;
  }>;
}

export interface SafetyAuditResult {
  passed: boolean;
  piiRedacted: boolean;
  redactedTokensCount: number;
  jailbreakAttemptDetected: boolean;
  financialAdviceBlocked: boolean;
  unauthorizedWritePrevented: boolean;
  invariantsChecked: number;
  invariantsPassed: number;
  violations: string[];
  auditTimestamp: string;
}

export interface HitlTriggerCondition {
  id: string;
  code: string;
  name: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  thresholdCriteria: string;
  rbiSlaMinutes: number;
  activeEscalationsCount: number;
}

export interface HitlEscalationTicket {
  id: string;
  customerId: string;
  customerName: string;
  sessionId: string;
  triggerId: string;
  triggerName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'PENDING_SUPERVISOR' | 'IN_REVIEW' | 'RESOLVED_OVERRIDE' | 'RESOLVED_APPROVED';
  customerMessage: string;
  agentProposedResponse: string;
  supervisorCorrection?: string;
  createdAt: string;
  assignedSupervisor?: string;
  sentiment: string;
  riskScore: number;
}

export interface ContinuousLearningExemplar {
  id: string;
  intentId: string;
  originalUtterance: string;
  agentInitialResponse: string;
  supervisorCorrection: string;
  csatRating?: number;
  resolutionOutcome: 'SUCCESS' | 'SUBOPTIMAL' | 'SAFETY_OVERRIDE';
  minedAt: string;
  invariantRegressionStatus: 'PASSED' | 'PENDING' | 'FLAGGED';
}

export interface SafetyInvariant {
  id: string;
  name: string;
  rule: string;
  strictness: 'HARD_INVARIANT' | 'REGULATORY_MANDATE';
  description: string;
  testCaseCount: number;
  passingRate: number; // 100%
}

export interface ChatMessage {
  id: string;
  sender: 'CUSTOMER' | 'AGENT' | 'SUPERVISOR' | 'SYSTEM';
  text: string;
  timestamp: string;
  metadata?: {
    intent?: string;
    confidence?: number;
    authLevelRequired?: AuthLevel;
    tpinPromptRequired?: boolean;
    cardAction?: 'FROZEN' | 'UNFROZEN' | 'LIMIT_UPDATED';
    disputeId?: string;
    suggestedOptions?: string[];
    isEscalated?: boolean;
    escalationReason?: string;
    retrievedKbIds?: string[];
    safetyAudit?: SafetyAuditResult;
    reasoningSteps?: ReasoningStep[];
  };
}

export interface DailySystemMetrics {
  dailyInteractionsCount: number; // 18,000 target
  dailyInteractions?: number;
  activeCustomers: string;       // "2.7 Million"
  autonomousDeflectionRate: number; // e.g. 86.4%
  averageRetrievalLatencyMs: number; // e.g. 42ms (< 200ms target)
  averageCsatScore: number;         // e.g. 4.74 / 5.0
  firstContactResolutionRate: number; // e.g. 88.2%
  safetyInvariantViolations: number; // 0
  activeSupervisorsOnline: number;
  pendingEscalations: number;
  supervisorCorrectionsCount?: number;
}
