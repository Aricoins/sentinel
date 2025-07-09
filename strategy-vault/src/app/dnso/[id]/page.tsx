'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  ChevronRight,
  Shield,
  Target,
  TrendingUp,
  Clock,
  MapPin,
  FileText,
  Share2,
  Plus,
  GitCompare,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Building2,
  Zap,
  Eye,
  Download,
  ExternalLink,
  User,
  Award,
  BarChart3
} from 'lucide-react';

interface CostComponent {
  component: string;
  min: number;
  max: number;
}

interface DNSO {
  id: string;
  title: string;
  sector: string;
  subsector: string;
  client_type: string;
  priority: 'Critical' | 'High' | 'Medium';
  roi_min: number;
  roi_max: number;
  risk_prevention: string;
  expertise_tags: string[];
  competitive_advantage: string;
  urgency_factor: string;
  implementation_time: string;
  target_client_size: string;
  geography: string;
  description: string;
  why_matters: string[];
  cost_components: CostComponent[];
  next_steps: string[];
  total_investment?: { min: number; max: number };
}

interface DNSOResponse {
  success: boolean;
  data: DNSO;
  related: DNSO[];
}

export default function DNSODetailPage() {
  const params = useParams();
  const router = useRouter();
  const [dnso, setDNSO] = useState<DNSO | null>(null);
  const [relatedDNSOs, setRelatedDNSOs] = useState<DNSO[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'investment' | 'implementation' | 'roi'>('overview');

  useEffect(() => {
    async function loadDNSO() {
      try {
        const response = await fetch(`/api/dnsos/${params.id}`);
        const data: DNSOResponse = await response.json();
        
        if (data.success) {
          setDNSO(data.data);
          setRelatedDNSOs(data.related);
        }
      } catch (error) {
        console.error('Error loading DNSO:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      loadDNSO();
    }
  }, [params.id]);

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

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'Energy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Infrastructure': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Government/Defense': return 'bg-red-100 text-red-800 border-red-200';
      case 'Chemical/Pharmaceutical': return 'bg-green-100 text-green-800 border-green-200';
      case 'Technology': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const calculateTotal = (components: CostComponent[]) => {
    return components.reduce(
      (acc, comp) => ({
        min: acc.min + comp.min,
        max: acc.max + comp.max
      }),
      { min: 0, max: 0 }
    );
  };

  const getImplementationProgress = (timeString: string) => {
    // Extract number of months from implementation time
    const monthsMatch = timeString.match(/(\d+)(?:-(\d+))?\s*months?/i);
    if (monthsMatch) {
      const maxMonths = parseInt(monthsMatch[2]) || parseInt(monthsMatch[1]);
      return Math.min((maxMonths / 24) * 100, 100); // Scale to 24 months max
    }
    return 50; // Default
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading DNSO details...</p>
        </div>
      </div>
    );
  }

  if (!dnso) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">DNSO Not Found</h2>
          <p className="text-gray-600 mb-6">The requested opportunity could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalInvestment = dnso.total_investment || calculateTotal(dnso.cost_components);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="nav-executive sticky top-0 z-50 shadow-executive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="mr-4 p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gradient-blue font-serif">
                  StrategyVault
                </h1>
                <p className="text-sm text-gray-500 font-medium">Executive Proposal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              <button className="btn-executive">
                <Share2 className="w-4 h-4 mr-2" />
                Share Proposal
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-3 text-sm text-gray-500 mb-8">
          <button onClick={() => router.push('/')} className="hover:text-blue-600 font-medium transition-colors">
            Strategic Portfolio
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600 font-medium">{dnso.sector}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold">{dnso.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <div className="executive-card shadow-executive-lg p-10 mb-8 bg-consulting-pattern">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${getSectorColor(dnso.sector)}`}>
                      {getSectorIcon(dnso.sector)}
                      <span className="ml-2">{dnso.sector}</span>
                    </span>
                    <span className={`priority-badge priority-${dnso.priority.toLowerCase()}`}>
                      {dnso.priority} Priority
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                    {dnso.title}
                  </h1>
                  <p className="text-lg text-gray-600 font-mono mb-6 bg-gray-100 px-3 py-1 rounded inline-block">
                    ID: {dnso.id}
                  </p>
                  <div className="roi-display">
                    <div className="flex items-center">
                      <TrendingUp className="w-8 h-8 text-white mr-4" />
                      <div>
                        <p className="text-sm font-semibold opacity-90 uppercase tracking-wide">Strategic ROI Potential</p>
                        <p className="text-3xl font-bold">
                          {formatCurrency(dnso.roi_min)} - {formatCurrency(dnso.roi_max)}
                        </p>
                        <p className="text-sm opacity-80 mt-1">Expected return on investment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Advantage Callout */}
              <div className="glass border border-blue-200 rounded-xl p-8">
                <div className="flex items-start">
                  <Award className="w-8 h-8 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Strategic Competitive Advantage</h3>
                    <p className="text-blue-800 text-lg leading-relaxed">
                      {dnso.competitive_advantage}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Tabs */}
            <div className="executive-card shadow-executive">
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <nav className="flex space-x-8 px-10" aria-label="Tabs">
                  {[
                    { id: 'overview', label: 'Executive Overview', icon: Eye },
                    { id: 'investment', label: 'Investment Analysis', icon: DollarSign },
                    { id: 'implementation', label: 'Implementation Plan', icon: Calendar },
                    { id: 'roi', label: 'ROI & Value Creation', icon: BarChart3 }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        } whitespace-nowrap py-6 px-4 border-b-3 font-semibold text-sm flex items-center transition-all rounded-t-lg`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-10">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Executive Summary</h3>
                      <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {dnso.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Strategic Value Proposition</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dnso.why_matters.map((matter, index) => (
                          <div key={index} className="executive-card p-6">
                            <div className="flex items-start">
                              <CheckCircle className="w-6 h-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                              <p className="text-gray-700 font-medium">{matter}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-r-xl p-8">
                      <div className="flex items-start">
                        <AlertTriangle className="w-8 h-8 text-orange-600 mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold text-orange-900 mb-3">Market Urgency & Timing</h4>
                          <p className="text-orange-800 text-lg leading-relaxed">{dnso.urgency_factor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Investment Tab */}
                {activeTab === 'investment' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 font-serif">Investment Structure & Analysis</h3>
                    
                    <div className="executive-table">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="text-left">Investment Component</th>
                            <th className="text-left">Conservative Estimate</th>
                            <th className="text-left">Aggressive Scenario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dnso.cost_components.map((component, index) => (
                            <tr key={index}>
                              <td className="font-medium text-gray-900">
                                {component.component}
                              </td>
                              <td className="text-gray-900">
                                {formatCurrency(component.min)}
                              </td>
                              <td className="text-gray-900">
                                {formatCurrency(component.max)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-t-2 border-blue-300">
                            <td className="font-bold text-blue-900 text-lg">
                              Total Strategic Investment
                            </td>
                            <td className="font-bold text-blue-900 text-lg">
                              {formatCurrency(totalInvestment.min)}
                            </td>
                            <td className="font-bold text-blue-900 text-lg">
                              {formatCurrency(totalInvestment.max)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="executive-card metric-card p-6 text-center">
                        <p className="text-3xl font-bold text-blue-600 mb-2">
                          {formatCurrency(totalInvestment.min)}
                        </p>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Conservative Investment</p>
                      </div>
                      <div className="executive-card metric-card p-6 text-center">
                        <p className="text-3xl font-bold text-blue-600 mb-2">
                          {formatCurrency(totalInvestment.max)}
                        </p>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Maximum Investment</p>
                      </div>
                      <div className="executive-card metric-card metric-card-success p-6 text-center">
                        <p className="text-3xl font-bold text-green-600 mb-2">
                          {Math.round(((dnso.roi_max - totalInvestment.max) / totalInvestment.max) * 100)}%
                        </p>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Expected ROI</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Implementation Tab */}
                {activeTab === 'implementation' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Timeline</h3>
                      <div className="bg-gray-200 rounded-full h-4 mb-4">
                        <div 
                          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${getImplementationProgress(dnso.implementation_time)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Start</span>
                        <span className="font-medium">{dnso.implementation_time}</span>
                        <span>Complete</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">Timeline</h4>
                        </div>
                        <p className="text-gray-700">{dnso.implementation_time}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">Geography</h4>
                        </div>
                        <p className="text-gray-700">{dnso.geography}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">Target Client Size</h4>
                        </div>
                        <p className="text-gray-700">{dnso.target_client_size}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Target className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">Client Type</h4>
                        </div>
                        <p className="text-gray-700">{dnso.client_type}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
                      <div className="space-y-3">
                        {dnso.next_steps.map((step, index) => (
                          <div key={index} className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                              <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                            </div>
                            <p className="text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ROI Analysis Tab */}
                {activeTab === 'roi' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-green-900 mb-4">Projected Returns</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-green-700">Minimum ROI:</span>
                            <span className="font-bold text-green-900">{formatCurrency(dnso.roi_min)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Maximum ROI:</span>
                            <span className="font-bold text-green-900">{formatCurrency(dnso.roi_max)}</span>
                          </div>
                          <div className="flex justify-between border-t border-green-200 pt-3">
                            <span className="text-green-700 font-semibold">ROI Multiple:</span>
                            <span className="font-bold text-green-900">
                              {(dnso.roi_max / totalInvestment.max).toFixed(1)}x
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-red-900 mb-4">Risk Prevention</h4>
                        <p className="text-red-800 font-medium">{dnso.risk_prevention}</p>
                        <div className="mt-4 pt-4 border-t border-red-200">
                          <p className="text-sm text-red-700">
                            This investment prevents significant operational and financial risks while ensuring compliance and business continuity.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">Financial Impact Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {Math.round(((dnso.roi_max - totalInvestment.max) / totalInvestment.max) * 100)}%
                          </div>
                          <div className="text-sm text-blue-700">Expected ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {Math.round(parseFloat(dnso.implementation_time.split('-')[1] || dnso.implementation_time.split('-')[0]))}
                          </div>
                          <div className="text-sm text-blue-700">Months to ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {formatCurrency(dnso.roi_max - totalInvestment.max)}
                          </div>
                          <div className="text-sm text-blue-700">Net Benefit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Why This Will Win Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Will Win</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {dnso.expertise_tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Success Metrics</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• ROI realized within {dnso.implementation_time}</li>
                      <li>• Risk prevention value: {dnso.risk_prevention}</li>
                      <li>• Market advantage: First-mover in {dnso.sector}</li>
                      <li>• Client satisfaction: {dnso.target_client_size} engagement</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Competitive Edge</h4>
                    <p className="text-sm text-green-800 leading-relaxed">
                      {dnso.competitive_advantage}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related DNSOs */}
            {relatedDNSOs.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedDNSOs.map((relatedDNSO) => (
                    <div 
                      key={relatedDNSO.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/dnso/${relatedDNSO.id}`)}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSectorColor(relatedDNSO.sector)}`}>
                          {relatedDNSO.sector}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(relatedDNSO.priority)}`}>
                          {relatedDNSO.priority}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                        {relatedDNSO.title}
                      </h3>
                      <p className="text-sm text-green-600 font-medium">
                        {formatCurrency(relatedDNSO.roi_min)} - {formatCurrency(relatedDNSO.roi_max)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Executive Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Executive Actions Card */}
              <div className="executive-card shadow-executive p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Executive Actions</h3>
                <div className="space-y-4">
                  <button className="btn-executive w-full">
                    <FileText className="w-5 h-5 mr-3" />
                    Generate Proposal
                  </button>
                  <button className="btn-secondary w-full">
                    <Share2 className="w-5 h-5 mr-3" />
                    Share DNSO
                  </button>
                  <button className="btn-secondary w-full">
                    <Plus className="w-5 h-5 mr-3" />
                    Add to Portfolio
                  </button>
                  <button className="btn-secondary w-full">
                    <GitCompare className="w-5 h-5 mr-3" />
                    Compare Opportunities
                  </button>
                </div>
              </div>

              {/* Strategic Expert Contact */}
              <div className="executive-card shadow-executive p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Strategic Advisor</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Juan López</p>
                    <p className="text-sm text-gray-600">Senior Strategy Director</p>
                    <p className="text-xs text-blue-600 font-medium">15+ years experience</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="btn-executive w-full text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </button>
                  <button className="btn-secondary w-full text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector:</span>
                    <span className="font-medium">{dnso.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(dnso.priority)}`}>
                      {dnso.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-medium">{dnso.implementation_time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Geography:</span>
                    <span className="font-medium">{dnso.geography}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
