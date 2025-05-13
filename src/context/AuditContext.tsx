/* -------------------------------------------------------------
   src/context/AuditContext.tsx
   Global wizard state (React Context + reducer)
--------------------------------------------------------------*/
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

/* ------------ A. state shape ------------ */
export interface AuditState {
  step:        number;
  name:        string;
  business:    string;
  industry:    string;
  software:    string[];
  painPoints:  string[];
  integrations: Record<string, string>;
  idea:        string;                 // ← NEW
}

export const initialState: AuditState = {
  step:         1,
  name:         '',
  business:     '',
  industry:     '',
  software:     [],
  painPoints:   [],
  integrations: {},
  idea:         '',                    // ← NEW
};

/* ------------ B. actions & reducer ------------ */
type Action =
  | { type: 'NEXT' }
  | { type: 'SET_USER'; payload: { name: string; business: string } }
  | { type: 'SET_SELECTORS'; payload: { industry: string; software: string[]; painPoints: string[] } }
  | { type: 'SET_INTEGRATIONS'; payload: Record<string, string> }
  | { type: 'SET_IDEA'; payload: string }            // ← NEW
  | { type: 'RESET' };

export function auditReducer(state: AuditState, action: Action): AuditState {
  switch (action.type) {
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, 5) }; // step 5 = Report
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'SET_SELECTORS':
      return { ...state, ...action.payload };
    case 'SET_INTEGRATIONS':
      return { ...state, integrations: action.payload };
    case 'SET_IDEA':
      return { ...state, idea: action.payload };              // ← NEW
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/* ------------ C. context helpers ------------ */
const AuditStateCtx     = createContext<AuditState>(initialState);
const AuditDispatchCtx  = createContext<React.Dispatch<Action>>(() => {});

export function AuditProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(auditReducer, initialState);
  return (
    <AuditDispatchCtx.Provider value={dispatch}>
      <AuditStateCtx.Provider value={state}>{children}</AuditStateCtx.Provider>
    </AuditDispatchCtx.Provider>
  );
}

export const useAuditState     = () => useContext(AuditStateCtx);
export const useAuditDispatch  = () => useContext(AuditDispatchCtx);
