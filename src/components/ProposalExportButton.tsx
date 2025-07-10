'use client';

import { useState } from 'react';
import { ProposalPDFGenerator } from '../utils/ProposalPDFGenerator';
import { 
  Download, 
  FileText, 
  Mail, 
  Settings, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronDown,
  X,
  Loader2,
  Building2,
  Shield,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin
} from 'lucide-react';

interface DNSO {
  id: string;
  title: string;
  sector: string;
  subsector?: string;
  client_type: string;
  priority: string;
  roi_min: number;
  roi_max: number;
  competitive_advantage: string;
  implementation_time: string;
  geography: string;
  description?: string;
  risk_prevention?: string;
  expertise_tags?: string[];
  urgency_factor?: string;
  target_client_size?: string;
  why_matters?: string[];
  cost_components?: Array<{
    component: string;
    min: number;
    max: number;
  }>;
  next_steps?: string[];
}

interface ProposalExportButtonProps {
  dnso: DNSO;
  onExportComplete?: (success: boolean, fileName?: string) => void;
  disabled?: boolean;
  className?: string;
}

interface ProposalFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  pages: string;
}

const proposalFormats: ProposalFormat[] = [
  {
    id: 'executive-proposal',
    name: 'Executive Proposal',
    description: 'Professional proposal ready for C-suite presentation',
    icon: FileText,
    pages: '6-8 pages'
  },
  {
    id: 'investment-brief',
    name: 'Investment Brief',
    description: 'Focused investment opportunity summary',
    icon: TrendingUp,
    pages: '3-4 pages'
  },
  {
    id: 'technical-spec',
    name: 'Technical Specification',
    description: 'Detailed technical implementation document',
    icon: Settings,
    pages: '8-12 pages'
  }
];

export default function ProposalExportButton({ 
  dnso, 
  onExportComplete, 
  disabled = false, 
  className = '' 
}: ProposalExportButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<string>('executive-proposal');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'Energy': return <Zap className="w-5 h-5" />;
      case 'Infrastructure': return <Building2 className="w-5 h-5" />;
      case 'Government/Defense': return <Shield className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const generateProposalContent = async () => {
    const pdfGenerator = new ProposalPDFGenerator();
    let pdfBlob: Blob;
    
    switch (selectedFormat) {
      case 'executive-proposal':
        pdfBlob = pdfGenerator.generateExecutiveProposal(dnso);
        break;
      case 'investment-brief':
        pdfBlob = pdfGenerator.generateInvestmentBrief(dnso);
        break;
      case 'technical-spec':
        pdfBlob = pdfGenerator.generateTechnicalSpec(dnso);
        break;
      default:
        pdfBlob = pdfGenerator.generateExecutiveProposal(dnso);
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return pdfBlob;
  };

  const simulateExportProgress = () => {
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const generateFileName = (fileType: 'pdf' | 'json' = 'json') => {
    const format = proposalFormats.find(f => f.id === selectedFormat);
    const timestamp = new Date().toISOString().split('T')[0];
    const safeDnsoTitle = dnso.title.replace(/[^a-zA-Z0-9]/g, '_');
    return `${format?.name.replace(/\s+/g, '_')}_${safeDnsoTitle}_${timestamp}.${fileType}`;
  };

  const handleQuickExport = async (formatId: string) => {
    setIsDropdownOpen(false);
    setIsExporting(true);
    setSelectedFormat(formatId);
    
    const progressInterval = simulateExportProgress();
    
    try {
      const pdfBlob = await generateProposalContent();
      const fileName = generateFileName('pdf'); // Now generating real PDF files
      
      // Simulate file generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setExportProgress(100);
      
      // Download the PDF file
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setNotification({
        type: 'success',
        message: `${proposalFormats.find(f => f.id === formatId)?.name} PDF generated successfully!`
      });
      
      onExportComplete?.(true, fileName);
      
    } catch (error) {
      clearInterval(progressInterval);
      setNotification({
        type: 'error',
        message: 'Proposal generation failed. Please try again.'
      });
      onExportComplete?.(false);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="relative">
      {/* Main Export Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuickExport('executive-proposal')}
          disabled={disabled || isExporting}
          className={`btn-executive flex-1 ${className} ${disabled || isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-3" />
              Generate Proposal
            </>
          )}
        </button>
        
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled || isExporting}
          className={`btn-secondary px-3 ${disabled || isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Progress Bar */}
      {isExporting && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Generating proposal...</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(exportProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${exportProgress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {exportProgress < 30 ? 'Analyzing opportunity data...' :
             exportProgress < 60 ? 'Generating executive summary...' :
             exportProgress < 90 ? 'Creating financial projections...' :
             'Finalizing document...'}
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && !isExporting && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1">Proposal Formats</h3>
            <p className="text-sm text-gray-600">Choose the format that best fits your needs</p>
          </div>
          
          <div className="p-2">
            {proposalFormats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.id}
                  onClick={() => handleQuickExport(format.id)}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{format.name}</h4>
                        <span className="text-xs text-gray-500">{format.pages}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-50 border border-green-200' :
          notification.type === 'error' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 mr-2" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-600 mr-2" />}
            {notification.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />}
            <span className={`text-sm font-medium ${
              notification.type === 'success' ? 'text-green-800' :
              notification.type === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {notification.message}
            </span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
