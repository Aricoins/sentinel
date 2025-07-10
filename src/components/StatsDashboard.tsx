'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Target, 
  Building2, 
  Shield, 
  Zap, 
  DollarSign,
  Clock,
  MapPin,
  Award,
  Globe,
  Users,
  Download,
  RefreshCw,
  AlertCircle
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

interface SectorStat {
  sector: string;
  count: number;
  roi: { min: number; max: number };
  averageROI: { min: number; max: number };
}

interface PriorityStat {
  priority: string;
  count: number;
  percentage: number;
}

interface Stats {
  total_dnsos: number;
  total_roi_potential: { min: number; max: number };
  sectors_covered: number;
  average_roi: { min: number; max: number };
  sector_breakdown: SectorStat[];
  priority_breakdown: PriorityStat[];
  expertise_tags: number;
  geographies: string[];
}

interface StatsDashboardProps {
  dnsos: DNSO[];
  stats: Stats;
  loading?: boolean;
  onExport?: () => void;
  onRefresh?: () => void;
}

export default function StatsDashboard({ 
  dnsos, 
  stats, 
  loading = false, 
  onExport,
  onRefresh 
}: StatsDashboardProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'sectors' | 'priorities' | 'geography'>('overview');
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Trigger animation on data change
    setAnimationClass('animate-pulse');
    const timer = setTimeout(() => setAnimationClass(''), 1000);
    return () => clearTimeout(timer);
  }, [stats]);

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
      case 'Energy': return <Zap className="w-6 h-6" />;
      case 'Infrastructure': return <Building2 className="w-6 h-6" />;
      case 'Government/Defense': return <Shield className="w-6 h-6" />;
      case 'Technology': return <Target className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'Energy': return 'from-yellow-400 to-yellow-600';
      case 'Infrastructure': return 'from-blue-400 to-blue-600';
      case 'Government/Defense': return 'from-red-400 to-red-600';
      case 'Technology': return 'from-purple-400 to-purple-600';
      case 'Chemical/Pharmaceutical': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getImplementationTimelineData = () => {
    const timelineData = dnsos.reduce((acc, dnso) => {
      const timeMatch = dnso.implementation_time.match(/(\d+)(?:-(\d+))?\s*months?/i);
      if (timeMatch) {
        const maxTime = parseInt(timeMatch[2]) || parseInt(timeMatch[1]);
        const range = maxTime <= 6 ? '0-6 months' : 
                      maxTime <= 12 ? '6-12 months' : 
                      maxTime <= 18 ? '12-18 months' : '18+ months';
        acc[range] = (acc[range] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(timelineData).map(([range, count]) => ({
      range,
      count,
      percentage: Math.round((count / dnsos.length) * 100)
    }));
  };

  const getTopPerformingSectors = () => {
    return stats.sector_breakdown
      .sort((a, b) => b.averageROI.max - a.averageROI.max)
      .slice(0, 3);
  };

  const getGeographyDistribution = () => {
    const geoData = dnsos.reduce((acc, dnso) => {
      acc[dnso.geography] = (acc[dnso.geography] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(geoData)
      .map(([geography, count]) => ({
        geography,
        count,
        percentage: Math.round((count / dnsos.length) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="executive-card shadow-executive mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient-blue font-serif mb-2">
                Executive Analytics Dashboard
              </h1>
              <p className="text-gray-600">Strategic insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onRefresh}
                className="btn-secondary"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={onExport}
                className="btn-executive"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="executive-card shadow-executive mb-8">
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'sectors', label: 'Sector Analysis', icon: Building2 },
                { id: 'priorities', label: 'Priority Matrix', icon: AlertCircle },
                { id: 'geography', label: 'Global Distribution', icon: Globe }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedView(tab.id as any)}
                    className={`${
                      selectedView === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    } whitespace-nowrap py-4 px-1 border-b-3 font-semibold text-sm flex items-center transition-all rounded-t-lg`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`executive-card metric-card metric-card-info p-6 ${animationClass}`}>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total DNSOs</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total_dnsos}</p>
                  </div>
                </div>
              </div>

              <div className={`executive-card metric-card metric-card-success p-6 roi-display ${animationClass}`}>
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div className="ml-4 text-white">
                    <p className="text-sm font-semibold opacity-90 uppercase tracking-wide">Total ROI Potential</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(stats.total_roi_potential.max)}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`executive-card metric-card metric-card-warning p-6 ${animationClass}`}>
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Building2 className="w-7 h-7 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Sectors Covered</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.sectors_covered}</p>
                  </div>
                </div>
              </div>

              <div className={`executive-card metric-card p-6 ${animationClass}`}>
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Award className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Avg ROI</p>
                    <p className="text-xl font-bold text-gradient-success">
                      {formatCurrency(stats.average_roi.max)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Sectors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="executive-card shadow-executive p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Sectors</h3>
                <div className="space-y-4">
                  {getTopPerformingSectors().map((sector, index) => (
                    <div key={sector.sector} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${getSectorColor(sector.sector)}`}>
                          {getSectorIcon(sector.sector)}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">{sector.sector}</p>
                          <p className="text-sm text-gray-600">{sector.count} opportunities</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(sector.averageROI.max)}
                        </p>
                        <p className="text-sm text-gray-600">Avg ROI</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="executive-card shadow-executive p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Implementation Timeline</h3>
                <div className="space-y-4">
                  {getImplementationTimelineData().map((timeline) => (
                    <div key={timeline.range} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">{timeline.range}</span>
                        <span className="text-sm text-gray-600">{timeline.count} DNSOs ({timeline.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${timeline.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sectors Tab */}
        {selectedView === 'sectors' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.sector_breakdown.map((sector) => (
                <div key={sector.sector} className="executive-card shadow-executive p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getSectorColor(sector.sector)}`}>
                      {getSectorIcon(sector.sector)}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{sector.sector}</h3>
                      <p className="text-sm text-gray-600">{sector.count} opportunities</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total ROI Potential</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(sector.roi.max)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average ROI</span>
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(sector.averageROI.max)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getSectorColor(sector.sector)} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min((sector.count / stats.total_dnsos) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priorities Tab */}
        {selectedView === 'priorities' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.priority_breakdown.map((priority) => (
                <div key={priority.priority} className="executive-card shadow-executive p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getPriorityColor(priority.priority)} mb-4`}>
                    <span className="text-2xl font-bold text-white">{priority.count}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{priority.priority} Priority</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{priority.percentage}%</p>
                  <p className="text-sm text-gray-600">of total opportunities</p>
                </div>
              ))}
            </div>

            <div className="executive-card shadow-executive p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Priority Distribution</h3>
              <div className="space-y-4">
                {stats.priority_breakdown.map((priority) => (
                  <div key={priority.priority} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700 flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority.priority)} mr-2`}></div>
                        {priority.priority} Priority
                      </span>
                      <span className="text-sm text-gray-600">{priority.count} DNSOs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${getPriorityColor(priority.priority)} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${priority.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Geography Tab */}
        {selectedView === 'geography' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="executive-card shadow-executive p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Geographic Distribution</h3>
                <div className="space-y-4">
                  {getGeographyDistribution().map((geo) => (
                    <div key={geo.geography} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">{geo.geography}</p>
                          <p className="text-sm text-gray-600">{geo.percentage}% of opportunities</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{geo.count}</p>
                        <p className="text-sm text-gray-600">DNSOs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="executive-card shadow-executive p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Global Reach Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stats.geographies.length}
                    </div>
                    <div className="text-sm text-blue-700">Markets Covered</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round((stats.geographies.filter(g => g === 'Global').length / stats.geographies.length) * 100)}%
                    </div>
                    <div className="text-sm text-green-700">Global Opportunities</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {stats.expertise_tags}
                    </div>
                    <div className="text-sm text-purple-700">Expertise Areas</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {Math.round(stats.total_roi_potential.max / 1000000)}M
                    </div>
                    <div className="text-sm text-orange-700">ROI Potential</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
