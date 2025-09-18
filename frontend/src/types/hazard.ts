export interface HazardReport {
  id?: string;
  reporterName: string;
  reporterRole: 'citizen' | 'volunteer' | 'official' | 'researcher' | 'fisherman';
  hazardType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  description: string;
  mediaUrls?: string[];
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  userEmail: string;
}

export interface HazardReportFormData {
  reporterName: string;
  reporterRole: string;
  hazardType: string;
  severity: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  description: string;
  mediaFiles?: File[];
}
