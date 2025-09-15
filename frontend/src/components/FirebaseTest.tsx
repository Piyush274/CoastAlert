import { useEffect, useState } from "react";
import { testFirebaseConnection } from "@/lib/firebase-test";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState<{
    success: boolean;
    error?: any;
    loading: boolean;
  }>({ success: false, loading: true });

  const runTest = async () => {
    setTestResult({ success: false, loading: true });
    const result = await testFirebaseConnection();
    setTestResult({ ...result, loading: false });
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          {testResult.loading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : testResult.success ? (
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 mr-2 text-red-500" />
          )}
          Firebase Connection Test
        </CardTitle>
        <CardDescription>
          Testing Firebase configuration and connection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {testResult.loading && (
          <div className="text-center py-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>Testing Firebase connection...</p>
          </div>
        )}

        {!testResult.loading && testResult.success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Firebase connection successful! The configuration is working correctly.
            </AlertDescription>
          </Alert>
        )}

        {!testResult.loading && !testResult.success && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                ❌ Firebase connection failed. Check the error details below.
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Error Details:</h4>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(testResult.error, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <Button onClick={runTest} className="w-full">
          Run Test Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default FirebaseTest;
