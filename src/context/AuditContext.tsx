'use client';
import React, { createContext, useContext, useReducer } from 'react';

/* ───────── Types ───────── */
type UserInfo = { name: string; email: string; company: string; industry: string };

type State = {
  step: number;
  user?: UserInfo;
  software: string[];
  painPoints: string[];
  integrationNotes: Record<string, string>;
  automationIdea?: string;
  reportHtml?: string;
};

/* ───────── Initial ─────── */
const initialState: State = {
  step: 1,
  software: [],
  painPoints: [],
  integrationNotes: {},
};

/* ───────── Actions ─────── */
type Action =
  | { type: 'SET_USER'; payload: UserInfo }
  | { type: 'SET_SELECTORS'; payload: { software: string[]; painPoints: string[] } }
  | { type: 'SET_INTEGRATIONS'; payload: Record<string, string> }
  | { type: 'SET_IDEA'; payload: string }
  | { type: 'SET_REPORT'; payload: string }
  | { type: 'NEXT' }
  | { type: 'GO_BACK' }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SELECTORS':
      return { ...state, ...action.payload };
    case 'SET_INTEGRATIONS':
      return { ...state, integrationNotes: action.payload };
    case 'SET_IDEA':
      return { ...state, automationIdea: action.payload };
    case 'SET_REPORT':
      return { ...state, reportHtml: action.payload };
    case 'NEXT':
      return { ...state, step: state.step + 1 };
    case 'GO_BACK':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/* ───────── Context ─────── */
type Ctx = {
  state: State;
  dispatch: React.Dispatch<Action>;
  goBack: () => void;
  reset: () => void;
};

const AuditCtx = createContext<Ctx | undefined>(undefined);

export const AuditProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const goBack = () => dispatch({ type: 'GO_BACK' });
  const reset  = () => dispatch({ type: 'RESET' });

  return (
    <AuditCtx.Provider value={{ state, dispatch, goBack, reset }}>
      {children}
    </AuditCtx.Provider>
  );
};

export const useAuditState = () => {
  const ctx = useContext(AuditCtx);
  if (!ctx) throw new Error('AuditProvider missing');
  return ctx;
};
