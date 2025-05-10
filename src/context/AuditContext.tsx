'use client';
import React, { createContext, useContext, useReducer } from 'react';

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

const initialState: State = {
  step: 1,
  software: [],
  painPoints: [],
  integrationNotes: {},
};

export type Action =
  | { type: 'SET_USER'; payload: UserInfo }
  | { type: 'SET_SELECTORS'; payload: { software: string[]; painPoints: string[] } }
  | { type: 'SET_INTEGRATIONS'; payload: Record<string, string> }
  | { type: 'SET_IDEA'; payload: string }
  | { type: 'NEXT' };

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
    case 'NEXT':
      return { ...state, step: state.step + 1 };
    default:
      return state;
  }
}

const AuditCtx = createContext<[State, React.Dispatch<Action>] | undefined>(undefined);

export const AuditProvider = ({ children }: { children: React.ReactNode }) => (
  <AuditCtx.Provider value={useReducer(reducer, initialState)}>{children}</AuditCtx.Provider>
);

export const useAuditState = () => {
  const ctx = useContext(AuditCtx);
  if (!ctx) throw new Error('AuditProvider missing');
  return ctx;
};
