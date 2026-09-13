import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createActionTasks } from './guidance';
import type {
  FamilyProfile,
  Language,
  ParentPriorities,
  RealityProfile,
  StudentPriorities,
} from './types';

const currentYear = new Date().getFullYear();

export const defaultProfile: FamilyProfile = {
  reality: {
    city: 'Berlin',
    postcode: '10557',
    grade: '10',
    transitionYear: `${currentYear + 1}/${String(currentYear + 2).slice(-2)}`,
    schoolType: 'unsure',
    transitionStatement: 'no-statement',
    qualificationInfo: 'unsure',
    hasUpperSecondary: 'unsure',
    maxCommute: 45,
  },
  student: {
    interest: 'unsure',
    challenge: 'balanced',
    environment: 'collaborative',
    direction: 'open',
    avoid: 'commute',
  },
  parent: {
    optionsOpen: 'very',
    commute: 45,
    vocationalFocus: 'maybe',
    support: 'unsure',
    hope: 'flexibility',
  },
};

interface WegweiserState {
  language: Language;
  profile: FamilyProfile;
  realityComplete: boolean;
  profileComplete: boolean;
  resultsReady: boolean;
  selectedPathwayId?: string;
  selectedSchoolId?: string;
  viewedSchoolIds: string[];
  completedTaskIds: string[];
  setLanguage: (language: Language) => void;
  updateReality: (patch: Partial<RealityProfile>) => void;
  updateStudent: (patch: Partial<StudentPriorities>) => void;
  updateParent: (patch: Partial<ParentPriorities>) => void;
  finishReality: () => void;
  finishProfile: () => void;
  selectPathway: (id: string) => void;
  selectSchool: (id: string) => void;
  markSchoolViewed: (id: string) => void;
  toggleTask: (id: string) => void;
  resetJourney: () => void;
}

export const useWegweiserStore = create<WegweiserState>()(
  persist(
    (set) => ({
      language: 'en',
      profile: defaultProfile,
      realityComplete: false,
      profileComplete: false,
      resultsReady: false,
      viewedSchoolIds: [],
      completedTaskIds: [],
      setLanguage: (language) => set({ language }),
      updateReality: (patch) =>
        set((state) => ({
          profile: { ...state.profile, reality: { ...state.profile.reality, ...patch } },
        })),
      updateStudent: (patch) =>
        set((state) => ({
          profile: { ...state.profile, student: { ...state.profile.student, ...patch } },
        })),
      updateParent: (patch) =>
        set((state) => ({
          profile: { ...state.profile, parent: { ...state.profile.parent, ...patch } },
        })),
      finishReality: () => set({ realityComplete: true }),
      finishProfile: () => set({ profileComplete: true, resultsReady: true }),
      selectPathway: (selectedPathwayId) => set({ selectedPathwayId }),
      selectSchool: (selectedSchoolId) => set({ selectedSchoolId }),
      markSchoolViewed: (id) =>
        set((state) => ({
          selectedSchoolId: id,
          viewedSchoolIds: state.viewedSchoolIds.includes(id)
            ? state.viewedSchoolIds
            : [...state.viewedSchoolIds, id],
        })),
      toggleTask: (id) =>
        set((state) => ({
          completedTaskIds: state.completedTaskIds.includes(id)
            ? state.completedTaskIds.filter((taskId) => taskId !== id)
            : [...state.completedTaskIds, id],
        })),
      resetJourney: () =>
        set({
          profile: defaultProfile,
          realityComplete: false,
          profileComplete: false,
          resultsReady: false,
          selectedPathwayId: undefined,
          selectedSchoolId: undefined,
          viewedSchoolIds: [],
          completedTaskIds: [],
        }),
    }),
    {
      name: 'wegweiser-session',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
        profile: state.profile,
        realityComplete: state.realityComplete,
        profileComplete: state.profileComplete,
        resultsReady: state.resultsReady,
        selectedPathwayId: state.selectedPathwayId,
        selectedSchoolId: state.selectedSchoolId,
        viewedSchoolIds: state.viewedSchoolIds,
        completedTaskIds: state.completedTaskIds,
      }),
    },
  ),
);

export function tasksForSelectedSchool(schoolId?: string) {
  return schoolId ? createActionTasks(schoolId) : [];
}
