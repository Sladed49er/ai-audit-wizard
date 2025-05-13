/* -------------------------------------------------------------
   Global wizard state (React Context + reducer)
   ------------------------------------------------------------*/
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

/* ── A. state shape ─────────────────────────────────────────── */
export interface AuditState {
  step:         number;
  /* user info */
  name:         string;
  email:        string;
  company:      string;
  industry:     string;
  /* wizard selections */
  software:     string[];
  painPoints:   string[];
  integrations: Record<string, string>;
  idea:         string;
}

export const initialState: AuditState = {
  step:         1,
  name:         '',
  email:        '',
  company:      '',
  industry:     '',
  software:     [],
  painPoints:   [],
  integrations: {},
  idea:         '',
};

/* ── B. actions & reducer ───────────────────────────────────── */
type Action =
  | { type: 'NEXT' }
  | { type: 'SET_USER';         payload: Pick<AuditState, 'name' | 'email' | 'company' | 'industry'> }
  | { type: 'SET_SELECTORS';    payload: Pick<AuditState, 'software' | 'painPoints'> }
  | { type: 'SET_INTEGRATION';  payload: { tool: string; value: string } }
  | { type: 'SET_IDEA';         payload: string }
  | { type: 'RESET' };

function auditReducer(state: AuditState, action: Action): AuditState {
  switch (action.type) {
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, 5) };

    case 'SET_USER':
      return { ...state, ...action.payload };

    case 'SET_SELECTORS':
      return { ...state, ...action.payload };

    case 'SET_INTEGRATION':
      return {
        ...state,
        integrations: { ...state.integrations, [action.payload.tool]: action.payload.value },
      };

    case 'SET_IDEA':
      return { ...state, idea: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

/* ── C. context helpers ────────────────────────────────────── */
const StateCtx    = createContext<AuditState>(initialState);
const DispatchCtx = createContext<React.Dispatch<Action>>(() => {});

export function AuditProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(auditReducer, initialState);
  return (
    <DispatchCtx.Provider value={dispatch}>
      <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    </DispatchCtx.Provider>
  );
}

export const useAuditState    = () => useContext(StateCtx);
export const useAuditDispatch = () => useContext(DispatchCtx);
