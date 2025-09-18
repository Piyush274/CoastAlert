// Test utility to verify Firebase integration
import { HazardService } from '@/services/hazardService';
import { HazardReportFormData } from '@/types/hazard';

export const testFirebaseIntegration = async () => {
  console.log('🧪 Testing Firebase Integration...');
  
  try {
    // Test data
    const testFormData: HazardReportFormData = {
      reporterName: 'Test User',
      reporterRole: 'citizen',
      hazardType: 'high-waves',
      severity: 'medium',
      location: {
        lat: 12.9716,
        lng: 77.5946
      },
      description: 'Test hazard report for integration testing',
      mediaFiles: []
    };

    const testUserId = 'test-user-123';
    const testUserEmail = 'test@example.com';

    console.log('📝 Creating test hazard report...');
    const reportId = await HazardService.saveHazardReport(
      testFormData,
      testUserId,
      testUserEmail
    );
    
    console.log('✅ Test report created with ID:', reportId);

    console.log('📊 Fetching dashboard stats...');
    const stats = await HazardService.getDashboardStats();
    console.log('📈 Dashboard stats:', stats);

    console.log('📋 Fetching recent reports...');
    const reports = await HazardService.getRecentReports(5);
    console.log('📄 Recent reports:', reports.length, 'reports found');

    console.log('✅ Firebase integration test completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Firebase integration test failed:', error);
    return false;
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testFirebaseIntegration = testFirebaseIntegration;
}
