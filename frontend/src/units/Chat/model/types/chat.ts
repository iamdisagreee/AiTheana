export enum ChatStatus {
  EMPTY = "EMPTY",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UPLOADING_RAW = "UPLOADING_RAW",
  PREPROCESSING = "PREPROCESSING",
  UPLOADING_PREPROCESSED = "UPLOADING_PREPROCESSED",
  ANALYZING = "ANALYZING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface Chat {
  id: number;
  interlocutor_id?: number;
  title?: string;
  status: ChatStatus;
  original_period_start?: string;
  original_period_end?: string;
  created_at: string;
  updated_at?: string;
}
