import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HazardReport, HazardReportFormData } from '@/types/hazard';

export class HazardService {
  private static readonly COLLECTION_NAME = 'hazardReports';

  /**
   * Save a new hazard report to Firestore
   */
  static async saveHazardReport(
    formData: HazardReportFormData, 
    userId: string, 
    userEmail: string
  ): Promise<string> {
    try {
      const reportData: Omit<HazardReport, 'id'> = {
        reporterName: formData.reporterName,
        reporterRole: formData.reporterRole as HazardReport['reporterRole'],
        hazardType: formData.hazardType,
        severity: formData.severity as HazardReport['severity'],
        location: formData.location,
        description: formData.description,
        mediaUrls: [], // TODO: Implement file upload
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId,
        userEmail
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...reportData,
        createdAt: Timestamp.fromDate(reportData.createdAt),
        updatedAt: Timestamp.fromDate(reportData.updatedAt)
      });

      return docRef.id;
    } catch (error) {
      console.error('Error saving hazard report:', error);
      throw new Error('Failed to save hazard report');
    }
  }

  /**
   * Get recent hazard reports for dashboard
   */
  static async getRecentReports(limitCount: number = 10): Promise<HazardReport[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const reports: HazardReport[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reports.push({
          id: doc.id,
          reporterName: data.reporterName,
          reporterRole: data.reporterRole,
          hazardType: data.hazardType,
          severity: data.severity,
          location: data.location,
          description: data.description,
          mediaUrls: data.mediaUrls || [],
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          userId: data.userId,
          userEmail: data.userEmail
        });
      });

      return reports;
    } catch (error) {
      console.error('Error fetching hazard reports:', error);
      throw new Error('Failed to fetch hazard reports');
    }
  }

  /**
   * Get hazard reports by status
   */
  static async getReportsByStatus(status: HazardReport['status']): Promise<HazardReport[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const reports: HazardReport[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reports.push({
          id: doc.id,
          reporterName: data.reporterName,
          reporterRole: data.reporterRole,
          hazardType: data.hazardType,
          severity: data.severity,
          location: data.location,
          description: data.description,
          mediaUrls: data.mediaUrls || [],
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          userId: data.userId,
          userEmail: data.userEmail
        });
      });

      return reports;
    } catch (error) {
      console.error('Error fetching reports by status:', error);
      throw new Error('Failed to fetch reports by status');
    }
  }

  /**
   * Get statistics for dashboard
   */
  static async getDashboardStats(): Promise<{
    totalReports: number;
    pendingReports: number;
    verifiedReports: number;
    criticalReports: number;
  }> {
    try {
      const [allReports, pendingReports, verifiedReports, criticalReports] = await Promise.all([
        getDocs(collection(db, this.COLLECTION_NAME)),
        this.getReportsByStatus('pending'),
        this.getReportsByStatus('verified'),
        getDocs(query(
          collection(db, this.COLLECTION_NAME),
          where('severity', '==', 'critical')
        ))
      ]);

      return {
        totalReports: allReports.size,
        pendingReports: pendingReports.length,
        verifiedReports: verifiedReports.length,
        criticalReports: criticalReports.size
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  }

  /**
   * Get all reports for admin dashboard
   */
  static async getAllReports(): Promise<HazardReport[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const reports: HazardReport[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reports.push({
          id: doc.id,
          reporterName: data.reporterName,
          reporterRole: data.reporterRole,
          hazardType: data.hazardType,
          severity: data.severity,
          location: data.location,
          description: data.description,
          mediaUrls: data.mediaUrls || [],
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          userId: data.userId,
          userEmail: data.userEmail
        });
      });

      return reports;
    } catch (error) {
      console.error('Error fetching all reports:', error);
      throw new Error('Failed to fetch all reports');
    }
  }

  /**
   * Update report status
   */
  static async updateReportStatus(reportId: string, status: HazardReport['status']): Promise<void> {
    try {
      const reportRef = doc(db, this.COLLECTION_NAME, reportId);
      await updateDoc(reportRef, {
        status,
        updatedAt: Timestamp.fromDate(new Date())
      });
    } catch (error) {
      console.error('Error updating report status:', error);
      throw new Error('Failed to update report status');
    }
  }
}
