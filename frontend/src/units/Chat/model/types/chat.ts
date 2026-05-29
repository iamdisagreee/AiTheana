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
  interlocutorId?: number;
  title?: string;
  status?: ChatStatus;
  originalPeriodStart?: string;
  originalPeriodEnd?: string;
  createdAt?: string;
  updatedAt?: string;
}
