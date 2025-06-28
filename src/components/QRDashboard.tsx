
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, RefreshCw, Download, Share2, Copy, CheckCircle } from 'lucide-react';

interface QRDashboardProps {
  userData: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const QRDashboard: React.FC<QRDashboardProps> = ({ userData, onNavigate, onLogout }) => {
  const [qrCode, setQrCode] = useState('');
  const [qrExpiry, setQrExpiry] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);

  const generateQRCode = () => {
    // Generate a unique QR code identifier
    const qrId = `ZC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setQrCode(qrId);
    
    // Set expiry to 24 hours from now
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    setQrExpiry(expiry);
  };

  const copyQRCode = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy QR code');
    }
  };

  const downloadQRCode = () => {
    // Create a simple QR code representation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    if (ctx) {
      // Simple QR code placeholder (in real app, use a QR library)
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = '#fff';
      ctx.fillRect(10, 10, 180, 180);
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(qrCode, 20, 100);
    }
    
    // Download the canvas as image
    const link = document.createElement('a');
    link.download = `elderly-access-qr-${qrCode}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    // Generate initial QR code
    generateQRCode();
  }, []);

  const isExpired = qrExpiry ? new Date() > qrExpiry : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {userData.firstName}!</h1>
            <p className="text-gray-600">Managing care for {userData.elderlyName}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => onNavigate('caregiver')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Full Dashboard
            </Button>
            <Button 
              onClick={onLogout}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-6 h-6" />
                Elderly Access QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200 mx-auto w-fit">
                <div className="w-40 h-40 bg-gray-900 rounded-lg flex items-center justify-center relative">
                  <div className="w-32 h-32 bg-white rounded flex items-center justify-center">
                    <div className="text-xs font-mono break-all p-2 text-center">
                      {qrCode}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  QR Code ID: <span className="font-mono">{qrCode}</span>
                </p>
                {qrExpiry && (
                  <p className={`text-sm ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                    {isExpired ? 'Expired' : `Expires: ${qrExpiry.toLocaleString()}`}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={copyQRCode}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
                <Button
                  onClick={downloadQRCode}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  onClick={generateQRCode}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">For the Elderly User:</h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600">1.</span>
                    Open the ZeroClick app on their device
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600">2.</span>
                    Say "Login" or tap the login button
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600">3.</span>
                    Show them this QR code to scan
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-blue-600">4.</span>
                    They'll be automatically signed in!
                  </li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• QR codes expire after 24 hours for security</li>
                  <li>• Generate a new code if the current one expires</li>
                  <li>• Keep the QR code private and secure</li>
                  <li>• One QR code works for multiple logins</li>
                </ul>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => alert('QR code sharing options would open here')}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share QR Code Securely
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRDashboard;
