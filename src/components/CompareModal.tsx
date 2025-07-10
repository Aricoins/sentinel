'use client';

import { useState, useEffect, useRef } from 'react';
import { PDFGenerator } from '../utils/PDFGenerator';
import { 
  X, 
  Download, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  TrendingDown, 
  Equal,
  BarChart3, 
  DollarSign, 
  Clock, 
  MapPin, 
  Shield, 
  Target, 
  Building2, 
  Zap, 
  Award,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowUp,
  ArrowDown,
  Users,
  Globe,
  Briefcase,
  Eye,
  ChevronDown,
  ChevronUp,
  Filter,
  Star,
  Calendar,
  Layers
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

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dnsos: DNSO[];
  onExport?: (dnsos: DNSO[]) => void;
}

type ComparisonSection = 'overview' | 'financial' | 'implementation' | 'risk' | 'strategic';

export default function CompareModal({ isOpen, onClose, dnsos, onExport }: CompareModalProps) {
  const [activeSection, setActiveSection] = useState<ComparisonSection>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic-info']));
  const [isExporting, setIsExporting] = useState(false);
  const [savedComparison, setSavedComparison] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityScore = (priority: string): number => {
    switch (priority) {
      case 'Critical': return 4;
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  const getImplementationTimeInMonths = (timeStr: string): number => {
    const match = timeStr.match(/(\d+)/);
    return match ? parseInt(match[0]) : 12;
  };

  const compareMetric = (values: number[], index: number) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const current = values[index];
    
    if (current === max && max !== min) return 'better';
    if (current === min && max !== min) return 'worse';
    return 'equal';
  };

  const compareMetricReverse = (values: number[], index: number) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const current = values[index];
    
    if (current === min && max !== min) return 'better';
    if (current === max && max !== min) return 'worse';
    return 'equal';
  };

  const getComparisonIcon = (comparison: 'better' | 'worse' | 'equal') => {
    switch (comparison) {
      case 'better': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'worse': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'equal': return <Equal className="w-4 h-4 text-gray-500" />;
    }
  };

  const getComparisonColor = (comparison: 'better' | 'worse' | 'equal') => {
    switch (comparison) {
      case 'better': return 'border-green-200 bg-green-50';
      case 'worse': return 'border-red-200 bg-red-50';
      case 'equal': return 'border-gray-200 bg-gray-50';
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const pdfGenerator = new PDFGenerator();
      const blob = pdfGenerator.generateComparisonReport(dnsos, {
        format: 'comparison-report',
        includeCharts: true,
        includeFinancials: true,
        includeBranding: true,
        watermark: false,
        customTitle: `DNSO Comparison Report - ${dnsos.map(d => d.title).join(' vs ')}`,
        companyLogo: true
      });
      
      const fileName = `DNSO_Comparison_${new Date().toISOString().split('T')[0]}.pdf`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      onExport?.(dnsos);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveComparison = () => {
    setSavedComparison(true);
    // Here you would typically save to localStorage or send to API
    setTimeout(() => setSavedComparison(false), 2000);
  };

  const getRecommendation = () => {
    if (dnsos.length < 2) return null;
    
    // Calculate scores for each DNSO
    const scores = dnsos.map(dnso => {
      const roiScore = (dnso.roi_max / 1000000) * 0.4; // ROI weight: 40%
      const priorityScore = getPriorityScore(dnso.priority) * 0.3; // Priority weight: 30%
      const timeScore = (12 / getImplementationTimeInMonths(dnso.implementation_time)) * 0.2; // Speed weight: 20%
      const riskScore = dnso.risk_prevention ? 2 : 1; // Risk mitigation weight: 10%
      
      return {
        dnso,
        score: roiScore + priorityScore + timeScore + (riskScore * 0.1),
        breakdown: { roiScore, priorityScore, timeScore, riskScore }
      };
    });
    
    scores.sort((a, b) => b.score - a.score);
    return scores[0];
  };

  if (!isOpen) return null;

  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'implementation', label: 'Implementation', icon: Calendar },
    { id: 'risk', label: 'Risk Analysis', icon: Shield },
    { id: 'strategic', label: 'Strategic Value', icon: Target }
  ];

  const roiValues = dnsos.map(d => d.roi_max);
  const priorityValues = dnsos.map(d => getPriorityScore(d.priority));
  const timeValues = dnsos.map(d => getImplementationTimeInMonths(d.implementation_time));
  
  const recommendation = getRecommendation();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="executive-card shadow-executive border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gradient-blue font-serif mb-2">
                DNSO Comparison Analysis
              </h2>
              <p className="text-gray-600">
                Comparing {dnsos.length} strategic opportunities for executive decision-making
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveComparison}
                className={`btn-secondary transition-all ${savedComparison ? 'bg-green-100 text-green-700' : ''}`}
                title="Save comparison"
              >
                {savedComparison ? <CheckCircle className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
                {savedComparison ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="btn-executive"
                title="Export comparison to PDF"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close comparison"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-8" aria-label="Comparison sections">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as ComparisonSection)}
                    className={`${
                      activeSection === section.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-all rounded-t-lg`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          {/* Recommendation Banner */}
          {recommendation && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-900">Executive Recommendation</h3>
                  <p className="text-blue-700 text-sm">
                    <strong>{recommendation.dnso.title}</strong> shows the highest strategic value with a composite score of{' '}
                    <span className="font-semibold">{recommendation.score.toFixed(2)}</span> based on ROI potential, priority level, and implementation speed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Basic Information Comparison */}
              <div className="executive-card shadow-executive">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleSection('basic-info')}
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Basic Information
                  </h3>
                  {expandedSections.has('basic-info') ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
                
                {expandedSections.has('basic-info') && (
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <div className={`grid grid-cols-${dnsos.length} gap-4`}>
                      {dnsos.map((dnso, index) => {
                        const SectorIcon = getSectorIcon(dnso.sector);
                        return (
                          <div key={dnso.id} className="space-y-4">
                            <div className="text-center">
                              <div className="p-3 bg-blue-100 rounded-xl inline-block mb-3">
                                <SectorIcon className="w-8 h-8 text-blue-600" />
                              </div>
                              <h4 className="font-bold text-lg text-gray-900 mb-1">{dnso.title}</h4>
                              <p className="text-sm text-gray-600 font-mono">{dnso.id}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Sector:</span>
                                <span className="text-sm font-medium">{dnso.sector}</span>
                              </div>
                              {dnso.subsector && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Subsector:</span>
                                  <span className="text-sm font-medium">{dnso.subsector}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Priority:</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(dnso.priority)}`}>
                                  {dnso.priority}
                                  {getComparisonIcon(compareMetric(priorityValues, index))}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Geography:</span>
                                <span className="text-sm font-medium flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {dnso.geography}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Client Type:</span>
                                <span className="text-sm font-medium flex items-center">
                                  <Briefcase className="w-3 h-3 mr-1" />
                                  {dnso.client_type}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ROI Comparison */}
              <div className="executive-card shadow-executive">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleSection('roi-comparison')}
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    ROI Comparison
                  </h3>
                  {expandedSections.has('roi-comparison') ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
                
                {expandedSections.has('roi-comparison') && (
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <div className={`grid grid-cols-${dnsos.length} gap-4`}>
                      {dnsos.map((dnso, index) => {
                        const roiComparison = compareMetric(roiValues, index);
                        return (
                          <div key={dnso.id} className={`p-4 rounded-lg border-2 ${getComparisonColor(roiComparison)}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">ROI Potential</span>
                              {getComparisonIcon(roiComparison)}
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm">
                                  <span>Minimum:</span>
                                  <span className="font-semibold">{formatCurrency(dnso.roi_min)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Maximum:</span>
                                  <span className="font-semibold text-green-600">{formatCurrency(dnso.roi_max)}</span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                                  style={{ width: `${(dnso.roi_max / Math.max(...roiValues)) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Financial Section */}
          {activeSection === 'financial' && (
            <div className="space-y-6">
              {/* Investment Structure */}
              <div className="executive-card shadow-executive">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Investment Structure Analysis
                  </h3>
                </div>
                <div className="p-4">
                  <div className={`grid grid-cols-${dnsos.length} gap-6`}>
                    {dnsos.map((dnso, index) => (
                      <div key={dnso.id} className="space-y-4">
                        <h4 className="font-semibold text-center text-gray-900">{dnso.title}</h4>
                        {dnso.cost_components && dnso.cost_components.length > 0 ? (
                          <div className="space-y-2">
                            {dnso.cost_components.map((component, idx) => (
                              <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-900 mb-1">
                                  {component.component}
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>{formatCurrency(component.min)}</span>
                                  <span>-</span>
                                  <span>{formatCurrency(component.max)}</span>
                                </div>
                              </div>
                            ))}
                            <div className="border-t pt-2">
                              <div className="flex justify-between font-semibold">
                                <span>Total Range:</span>
                                <span className="text-green-600">
                                  {formatCurrency(dnso.cost_components.reduce((sum, c) => sum + c.min, 0))} - 
                                  {formatCurrency(dnso.cost_components.reduce((sum, c) => sum + c.max, 0))}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No detailed cost breakdown available</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Implementation Section */}
          {activeSection === 'implementation' && (
            <div className="space-y-6">
              {/* Timeline Comparison */}
              <div className="executive-card shadow-executive">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Implementation Timeline Comparison
                  </h3>
                </div>
                <div className="p-4">
                  <div className={`grid grid-cols-${dnsos.length} gap-4`}>
                    {dnsos.map((dnso, index) => {
                      const timeComparison = compareMetricReverse(timeValues, index);
                      const timeInMonths = getImplementationTimeInMonths(dnso.implementation_time);
                      return (
                        <div key={dnso.id} className={`p-4 rounded-lg border-2 ${getComparisonColor(timeComparison)}`}>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-900">{dnso.title}</span>
                            {getComparisonIcon(timeComparison)}
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              {dnso.implementation_time}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                              <div 
                                className="bg-blue-600 h-3 rounded-full"
                                style={{ width: `${Math.min((timeInMonths / 24) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600">
                              {timeInMonths <= 6 ? 'Fast Track' : 
                               timeInMonths <= 12 ? 'Standard' : 
                               timeInMonths <= 18 ? 'Extended' : 'Long Term'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Next Steps Comparison */}
              <div className="executive-card shadow-executive">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-purple-600" />
                    Implementation Steps
                  </h3>
                </div>
                <div className="p-4">
                  <div className={`grid grid-cols-${dnsos.length} gap-4`}>
                    {dnsos.map((dnso) => (
                      <div key={dnso.id} className="space-y-3">
                        <h4 className="font-semibold text-center text-gray-900">{dnso.title}</h4>
                        {dnso.next_steps && dnso.next_steps.length > 0 ? (
                          <div className="space-y-2">
                            {dnso.next_steps.map((step, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600 mt-0.5">
                                  {idx + 1}
                                </div>
                                <p className="text-sm text-gray-700 flex-1">{step}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            <Layers className="w-6 h-6 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No implementation steps defined</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Analysis Section */}
          {activeSection === 'risk' && (
            <div className="space-y-6">
              <div className="executive-card shadow-executive">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-600" />
                    Risk Assessment Comparison
                  </h3>
                </div>
                <div className="p-4">
                  <div className={`grid grid-cols-${dnsos.length} gap-4`}>
                    {dnsos.map((dnso) => (
                      <div key={dnso.id} className="space-y-4">
                        <h4 className="font-semibold text-center text-gray-900">{dnso.title}</h4>
                        {dnso.risk_prevention ? (
                          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                              <span className="font-medium text-green-800">Risk Mitigation Available</span>
                            </div>
                            <p className="text-sm text-green-700">{dnso.risk_prevention}</p>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                              <span className="font-medium text-amber-800">Risk Assessment Needed</span>
                            </div>
                            <p className="text-sm text-amber-700">No specific risk mitigation strategy defined</p>
                          </div>
                        )}
                        
                        {/* Risk Factors Analysis */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-gray-900">Risk Factors:</h5>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Implementation Complexity:</span>
                              <span className={`font-medium ${getImplementationTimeInMonths(dnso.implementation_time) > 12 ? 'text-red-600' : 'text-green-600'}`}>
                                {getImplementationTimeInMonths(dnso.implementation_time) > 12 ? 'High' : 'Medium'}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Investment Size:</span>
                              <span className={`font-medium ${dnso.roi_max > 3000000 ? 'text-red-600' : 'text-green-600'}`}>
                                {dnso.roi_max > 3000000 ? 'High' : 'Medium'}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Market Urgency:</span>
                              <span className={`font-medium ${dnso.priority === 'Critical' ? 'text-red-600' : 'text-green-600'}`}>
                                {dnso.priority === 'Critical' ? 'High' : 'Medium'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Strategic Value Section */}
          {activeSection === 'strategic' && (
            <div className="space-y-6">
              {/* Competitive Advantage */}
              <div className="executive-card shadow-executive">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Strategic Value Analysis
                  </h3>
                </div>
                <div className="p-4">
                  <div className={`grid grid-cols-${dnsos.length} gap-4`}>
                    {dnsos.map((dnso) => (
                      <div key={dnso.id} className="space-y-4">
                        <h4 className="font-semibold text-center text-gray-900">{dnso.title}</h4>
                        
                        {/* Competitive Advantage */}
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                          <h5 className="font-medium text-blue-900 mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            Competitive Advantage
                          </h5>
                          <p className="text-sm text-blue-800">{dnso.competitive_advantage}</p>
                        </div>

                        {/* Market Urgency */}
                        {dnso.urgency_factor && (
                          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <h5 className="font-medium text-red-900 mb-2 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              Market Urgency
                            </h5>
                            <p className="text-sm text-red-800">{dnso.urgency_factor}</p>
                          </div>
                        )}

                        {/* Strategic Value Points */}
                        {dnso.why_matters && dnso.why_matters.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-gray-900">Strategic Value:</h5>
                            <div className="space-y-1">
                              {dnso.why_matters.map((matter, idx) => (
                                <div key={idx} className="flex items-start space-x-2">
                                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-gray-700">{matter}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Expertise Requirements */}
                        {dnso.expertise_tags && dnso.expertise_tags.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-gray-900">Required Expertise:</h5>
                            <div className="flex flex-wrap gap-1">
                              {dnso.expertise_tags.map((tag, idx) => (
                                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
