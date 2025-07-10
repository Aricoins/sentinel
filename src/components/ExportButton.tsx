'use client';

import { useState, useRef } from 'react';
import { PDFGenerator } from '../utils/PDFGenerator';
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
  BarChart3,
  TrendingUp,
  Building2,
  Shield,
  Zap,
  Target
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

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  pages: string;
}

interface ExportOptions {
  format: string;
  includeCharts: boolean;
  includeFinancials: boolean;
  includeBranding: boolean;
  watermark: boolean;
  emailDelivery: boolean;
  recipientEmail: string;
  customTitle: string;
  companyLogo: boolean;
}

interface ExportButtonProps {
  selectedDNSOs: string[];
  dnsos: DNSO[];
  onExportComplete?: (success: boolean, fileName?: string) => void;
  disabled?: boolean;
  className?: string;
}

const exportFormats: ExportFormat[] = [
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'Concise overview with key metrics and ROI analysis',
    icon: FileText,
    pages: '1-2 pages per DNSO'
  },
  {
    id: 'detailed-analysis',
    name: 'Detailed Analysis',
    description: 'Comprehensive report with full DNSO information',
    icon: BarChart3,
    pages: '4-6 pages per DNSO'
  },
  {
    id: 'comparison-report',
    name: 'Comparison Report',
    description: 'Side-by-side analysis of selected DNSOs',
    icon: TrendingUp,
    pages: '2-4 pages total'
  },
  {
    id: 'portfolio-overview',
    name: 'Portfolio Overview',
    description: 'Strategic portfolio view with analytics dashboard',
    icon: Building2,
    pages: '3-5 pages total'
  }
];

export default function ExportButton({ 
  selectedDNSOs, 
  dnsos, 
  onExportComplete, 
  disabled = false,
  className = '' 
}: ExportButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'executive-summary',
    includeCharts: true,
    includeFinancials: true,
    includeBranding: true,
    watermark: false,
    emailDelivery: false,
    recipientEmail: '',
    customTitle: '',
    companyLogo: true
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedDNSOsData = dnsos.filter(dnso => selectedDNSOs.includes(dnso.id));

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
      case 'Energy': return Zap;
      case 'Infrastructure': return Building2;
      case 'Government/Defense': return Shield;
      default: return Target;
    }
  };

  const generateFileName = (fileType: 'pdf' | 'json' = 'json') => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const formatName = exportFormats.find(f => f.id === exportOptions.format)?.name.replace(/\s+/g, '-') || 'export';
    const title = exportOptions.customTitle || `StrategyVault-${formatName}`;
    return `${title}-${timestamp}.${fileType}`;
  };

  const simulateExportProgress = () => {
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const generatePDFContent = async () => {
    const pdfGenerator = new PDFGenerator();
    let pdfBlob: Blob;
    
    switch (exportOptions.format) {
      case 'executive-summary':
        pdfBlob = pdfGenerator.generateExecutiveSummary(selectedDNSOsData, exportOptions);
        break;
      case 'detailed-analysis':
        pdfBlob = pdfGenerator.generateDetailedAnalysis(selectedDNSOsData, exportOptions);
        break;
      case 'comparison-report':
        pdfBlob = pdfGenerator.generateComparisonReport(selectedDNSOsData, exportOptions);
        break;
      case 'portfolio-overview':
        // For portfolio overview, we need stats - we'll simulate them for now
        const mockStats = {
          total_dnsos: selectedDNSOsData.length,
          total_roi_potential: {
            min: selectedDNSOsData.reduce((sum, dnso) => sum + dnso.roi_min, 0),
            max: selectedDNSOsData.reduce((sum, dnso) => sum + dnso.roi_max, 0)
          },
          average_roi: {
            min: selectedDNSOsData.reduce((sum, dnso) => sum + dnso.roi_min, 0) / selectedDNSOsData.length,
            max: selectedDNSOsData.reduce((sum, dnso) => sum + dnso.roi_max, 0) / selectedDNSOsData.length
          },
          sectors_covered: [...new Set(selectedDNSOsData.map(dnso => dnso.sector))].length,
          geographies: [...new Set(selectedDNSOsData.map(dnso => dnso.geography))],
          sector_breakdown: [...new Set(selectedDNSOsData.map(dnso => dnso.sector))].map(sector => {
            const sectorDNSOs = selectedDNSOsData.filter(dnso => dnso.sector === sector);
            return {
              sector,
              count: sectorDNSOs.length,
              roi: {
                min: sectorDNSOs.reduce((sum, dnso) => sum + dnso.roi_min, 0),
                max: sectorDNSOs.reduce((sum, dnso) => sum + dnso.roi_max, 0)
              },
              averageROI: {
                min: sectorDNSOs.reduce((sum, dnso) => sum + dnso.roi_min, 0) / sectorDNSOs.length,
                max: sectorDNSOs.reduce((sum, dnso) => sum + dnso.roi_max, 0) / sectorDNSOs.length
              }
            };
          }),
          priority_breakdown: [...new Set(selectedDNSOsData.map(dnso => dnso.priority))].map(priority => {
            const count = selectedDNSOsData.filter(dnso => dnso.priority === priority).length;
            return {
              priority,
              count,
              percentage: Math.round((count / selectedDNSOsData.length) * 100)
            };
          })
        };
        pdfBlob = pdfGenerator.generatePortfolioOverview(selectedDNSOsData, mockStats, exportOptions);
        break;
      default:
        pdfBlob = pdfGenerator.generateExecutiveSummary(selectedDNSOsData, exportOptions);
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return pdfBlob;
  };

  const handleQuickExport = async (formatId: string) => {
    setIsDropdownOpen(false);
    setIsExporting(true);
    
    const progressInterval = simulateExportProgress();
    
    try {
      const updatedOptions = { ...exportOptions, format: formatId };
      setExportOptions(updatedOptions);
      
      const pdfBlob = await generatePDFContent();
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
        message: `${exportFormats.find(f => f.id === formatId)?.name} PDF generated successfully!`
      });
      
      onExportComplete?.(true, fileName);
      
    } catch (error) {
      clearInterval(progressInterval);
      setNotification({
        type: 'error',
        message: 'Export failed. Please try again.'
      });
      onExportComplete?.(false);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAdvancedExport = async () => {
    setIsModalOpen(false);
    setIsExporting(true);
    
    const progressInterval = simulateExportProgress();
    
    try {
      const pdfBlob = await generatePDFContent();
      const fileName = generateFileName('pdf'); // Now generating real PDF files
      
      // Simulate advanced processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setExportProgress(100);
      
      // Handle email delivery if enabled
      if (exportOptions.emailDelivery && exportOptions.recipientEmail) {
        // Simulate email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotification({
          type: 'success',
          message: `PDF report generated and ready to send to ${exportOptions.recipientEmail}`
        });
      } else {
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
          message: 'Professional PDF report generated successfully!'
        });
      }
      
      onExportComplete?.(true, fileName);
      
    } catch (error) {
      clearInterval(progressInterval);
      setNotification({
        type: 'error',
        message: 'Advanced export failed. Please try again.'
      });
      onExportComplete?.(false);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handlePreview = () => {
    setIsPreviewMode(true);
    setNotification({
      type: 'info',
      message: 'Preview functionality will open in a new window'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  if (selectedDNSOs.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5 mr-2" />}
            {notification.type === 'info' && <AlertCircle className="w-5 h-5 mr-2" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Export Progress */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating PDF Report</h3>
              <p className="text-gray-600 mb-4">Please wait while we create your professional PDF report...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{Math.round(exportProgress)}% complete</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Export Button */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center">
          <button
            onClick={() => handleQuickExport('executive-summary')}
            disabled={disabled || isExporting}
            className={`btn-executive disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            title="Export professional PDF reports"
          >
            <Download className="w-4 h-4 mr-2" />
            Export ({selectedDNSOs.length})
          </button>
          
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled || isExporting}
            className="btn-executive ml-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-40">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Export Options</h3>
              <p className="text-sm text-gray-600">Choose your preferred PDF export format</p>
            </div>
            
            <div className="p-2">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => handleQuickExport(format.id)}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{format.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{format.description}</p>
                        <span className="text-xs text-blue-600 font-medium">{format.pages}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 btn-secondary text-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Options
                </button>
                <button
                  onClick={handlePreview}
                  className="flex-1 btn-secondary text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Export Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Advanced Export Settings</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">Configure advanced options for your PDF export</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Export Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Export Format</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exportFormats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <button
                        key={format.id}
                        onClick={() => setExportOptions({...exportOptions, format: format.id})}
                        className={`p-3 border rounded-lg text-left transition-all ${
                          exportOptions.format === format.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <Icon className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="font-medium text-gray-900">{format.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Content Options</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeCharts}
                      onChange={(e) => setExportOptions({...exportOptions, includeCharts: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Include charts and visualizations</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeFinancials}
                      onChange={(e) => setExportOptions({...exportOptions, includeFinancials: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Include detailed financial analysis</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeBranding}
                      onChange={(e) => setExportOptions({...exportOptions, includeBranding: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Include company branding and logo</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportOptions.watermark}
                      onChange={(e) => setExportOptions({...exportOptions, watermark: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Add confidential watermark</span>
                  </label>
                </div>
              </div>

              {/* Custom Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Custom Report Title</label>
                <input
                  type="text"
                  placeholder="Enter custom title (optional)"
                  value={exportOptions.customTitle}
                  onChange={(e) => setExportOptions({...exportOptions, customTitle: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Delivery */}
              <div>
                <label className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={exportOptions.emailDelivery}
                    onChange={(e) => setExportOptions({...exportOptions, emailDelivery: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-700">Email delivery</span>
                </label>
                {exportOptions.emailDelivery && (
                  <div className="ml-7">
                    <input
                      type="email"
                      placeholder="recipient@company.com"
                      value={exportOptions.recipientEmail}
                      onChange={(e) => setExportOptions({...exportOptions, recipientEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Export Preview</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Selected DNSOs:</strong> {selectedDNSOs.length} opportunities</p>
                  <p><strong>Format:</strong> {exportFormats.find(f => f.id === exportOptions.format)?.name}</p>
                  <p><strong>Estimated pages:</strong> {exportFormats.find(f => f.id === exportOptions.format)?.pages}</p>
                  <p><strong>File name:</strong> {generateFileName('pdf')}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePreview}
                  className="flex-1 btn-secondary"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handleAdvancedExport}
                  className="flex-1 btn-executive"
                  title="Generate professional PDF report"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
