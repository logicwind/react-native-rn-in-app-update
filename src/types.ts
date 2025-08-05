export type UpdateType = 'immediate' | 'flexible';

export type UpdateInfo = {
  updateAvailability: number;
  immediateAllowed: boolean;
  flexibleAllowed: boolean;
  versionCode: number;
  clientVersionStalenessDays?: number;
  totalBytesToDownload: number;
  packageName?: string;
};
