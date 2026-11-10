export interface CompetitionDocument {
  id: string;
  title: string;
  type: 'Moot Problem' | 'Competition Rules' | 'Clarifications' | 'Memorial Template' | 'Scoresheet Guidelines';
  filename: string;
  size: string;
  updatedDate: string;
  description?: string;
}

export interface TimelineMilestone {
  phase: string;
  date: string;
  rawDate?: string; // YYYY-MM-DD
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Competition {
  id: string;
  name: string;
  abbreviation: string;
  fullName: string;
  edition: string;
  description: string;
  category: 'International Moot' | 'National Moot' | 'Regional Moot' | 'Specialised Law' | 'Academic Advocacy';
  
  // Dates and locations
  registrationDeadline: string; // Formatted string, e.g. "November 18, 2026"
  registrationDeadlineIso: string; // YYYY-MM-DD
  memorialDeadline: string; // Formatted string, e.g. "January 12, 2027"
  memorialDeadlineIso: string; // YYYY-MM-DD
  nationalRoundsDate: string;
  nationalRoundsLocation: string;
  finalRoundsDate: string;
  finalRoundsLocation: string;
  
  // Registration and participation
  registeredStatus: boolean; // Yes or No
  registrationFee: string;
  numberOfParticipants: string;
  officialWebsite: string;
  registrationRequirements: string[];
  
  // Timeline and documents
  timeline: TimelineMilestone[];
  documents: CompetitionDocument[];
  
  // Administrative meta for Uniuyo Board
  boardContactPerson?: string;
  teamCoach?: string;
  priorityLevel?: 'High' | 'Medium' | 'Routine';
}

export type ViewMode = 'dashboard' | 'competitions' | 'details' | 'calendar';
