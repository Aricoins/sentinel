'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dnsoData, generateStats } from '../data/dnso-data';
import StatsDashboard from '../components/StatsDashboard';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download, 
  GitCompare, 
  TrendingUp, 
  Building2, 
  Shield, 
  Zap, 
  Target,
  Eye,
  FileText,
  ChevronDown,
  SlidersHorizontal,
  DollarSign,
  Briefcase,
  MapPin,
  Plus,
  BarChart3
} from 'lucide-react';

interface DNSO {
  id: string;
  title: string;
  sector: string;
  subsector?: string;
  client_type: string;
  priority: string; // Cambiado para ser más flexible
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

interface Stats {
  total_dnsos: number;
  total_roi_potential: { min: number; max: number };
  sectors_covered: number;
  average_roi: { min: number; max: number };
  sector_breakdown: Array<{
    sector: string;
    count: number;
    roi: { min: number; max: number };
    averageROI: { min: number; max: number };
  }>;
  priority_breakdown: Array<{
    priority: string;
    count: number;
    percentage: number;
  }>;
  expertise_tags: number;
  geographies: string[];
}

export default function StrategyVault() {
  const router = useRouter();
  const [dnsos, setDNSOs] = useState<DNSO[]>([]);
  const [filteredDNSOs, setFilteredDNSOs] = useState<DNSO[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'portfolio' | 'dashboard'>('portfolio');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDNSOs, setSelectedDNSOs] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'roi' | 'priority' | 'sector'>('roi');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('');
  const [roiRange, setRoiRange] = useState<[number, number]>([400000, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  const sectors = ['Energy', 'Chemical/Pharmaceutical', 'Government/Defense', 'Infrastructure', 'Technology'];
  const priorities = ['Critical', 'High', 'Medium'];
  const clientTypes = ['Healthcare', 'Government', 'Manufacturing'];

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        // Use static data for exported version
        console.log('Using static data (export mode)');
        const dnsosData = { success: true, data: dnsoData.dnso_database.dnsos };
        const statsData = { success: true, data: generateStats() };
        
        if (dnsosData.success) {
          setDNSOs(dnsosData.data);
          setFilteredDNSOs(dnsosData.data);
        }
        
        if (statsData.success) {
          setStats(statsData.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Final fallback to static data
        setDNSOs(dnsoData.dnso_database.dnsos);
        setFilteredDNSOs(dnsoData.dnso_database.dnsos);
        setStats(generateStats());
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...dnsos];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(dnso =>
        dnso.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dnso.competitive_advantage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dnso.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sector filter
    if (sectorFilter) {
      filtered = filtered.filter(dnso => dnso.sector === sectorFilter);
    }

    // Priority filter
    if (priorityFilter) {
      filtered = filtered.filter(dnso => dnso.priority === priorityFilter);
    }

    // Client type filter
    if (clientTypeFilter) {
      filtered = filtered.filter(dnso => dnso.client_type === clientTypeFilter);
    }

    // ROI range filter
    filtered = filtered.filter(dnso => 
      dnso.roi_max >= roiRange[0] && dnso.roi_min <= roiRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.roi_max - a.roi_max;
        case 'priority':
          const priorityOrder: { [key: string]: number } = { 'Critical': 3, 'High': 2, 'Medium': 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'sector':
          return a.sector.localeCompare(b.sector);
        default:
          return 0;
      }
    });

    setFilteredDNSOs(filtered);
  }, [dnsos, searchTerm, sectorFilter, priorityFilter, clientTypeFilter, roiRange, sortBy]);

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
      case 'Energy': return <Zap className="w-4 h-4" />;
      case 'Infrastructure': return <Building2 className="w-4 h-4" />;
      case 'Government/Defense': return <Shield className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading StrategyVault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="nav-executive sticky top-0 z-50 shadow-executive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gradient-blue font-serif">
                  StrategyVault
                </h1>
                <p className="text-sm text-gray-500 font-medium">Discover New Service Opportunities</p>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <button 
                  onClick={() => setCurrentView('portfolio')}
                  className={`${currentView === 'portfolio' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'} px-3 py-2 text-sm font-medium transition-colors rounded-lg`}
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className={`${currentView === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'} px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Pipeline
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {/* Mobile Dashboard Toggle */}
              <button 
                onClick={() => setCurrentView(currentView === 'dashboard' ? 'portfolio' : 'dashboard')}
                className="md:hidden btn-secondary"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {currentView === 'dashboard' ? 'Portfolio' : 'Dashboard'}
              </button>
              <button className="btn-secondary">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="btn-executive">
                <Plus className="w-4 h-4 mr-2" />
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conditional Content Rendering */}
      {currentView === 'dashboard' ? (
        stats && (
          <StatsDashboard 
            dnsos={dnsos} 
            stats={stats} 
            loading={loading}
            onExport={() => {
              console.log('Exporting dashboard data...');
              alert('Dashboard export functionality will be implemented');
            }}
            onRefresh={() => {
              setLoading(true);
              // Simulate refresh
              setTimeout(() => {
                setStats(generateStats());
                setLoading(false);
              }, 1000);
            }}
          />
        )
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Dashboard */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="executive-card metric-card metric-card-info p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total DNSOs</p>
                  <p className="text-3xl font-bold text-gray-900 pulse-subtle">{stats.total_dnsos}</p>
                </div>
              </div>
            </div>

            <div className="executive-card metric-card metric-card-success p-6 roi-display">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="ml-4 text-white">
                  <p className="text-sm font-semibold opacity-90 uppercase tracking-wide">Total ROI Potential</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(stats.total_roi_potential.min)} - {formatCurrency(stats.total_roi_potential.max)}
                  </p>
                </div>
              </div>
            </div>

            <div className="executive-card metric-card metric-card-warning p-6">
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

            <div className="executive-card metric-card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <DollarSign className="w-7 h-7 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Avg ROI</p>
                  <p className="text-2xl font-bold text-gradient-success">
                    {formatCurrency(stats.average_roi.min)} - {formatCurrency(stats.average_roi.max)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="executive-card filter-sidebar p-6 sticky top-24 shadow-executive">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Strategic Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Search Opportunities
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search DNSOs, sectors, capabilities..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sector Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Industry Sector
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value)}
                  >
                    <option value="">All Sectors</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Strategic Priority
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="">All Priorities</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                {/* Client Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Client Segment
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    value={clientTypeFilter}
                    onChange={(e) => setClientTypeFilter(e.target.value)}
                  >
                    <option value="">All Client Types</option>
                    {clientTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* ROI Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    ROI Threshold
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min={400000}
                      max={5000000}
                      step={100000}
                      value={roiRange[1]}
                      onChange={(e) => setRoiRange([roiRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                      <span>{formatCurrency(400000)}</span>
                      <span className="text-blue-600 font-bold">{formatCurrency(roiRange[1])}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <select
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white font-medium"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="roi">Sort by ROI Potential</option>
                  <option value="priority">Sort by Strategic Priority</option>
                  <option value="sector">Sort by Industry Sector</option>
                </select>

                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="Grid View"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  disabled={selectedDNSOs.length === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (selectedDNSOs.length > 0) {
                      // Funcionalidad de exportar
                      console.log('Exporting DNSOs:', selectedDNSOs);
                      alert(`Exporting ${selectedDNSOs.length} DNSO(s)`);
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export ({selectedDNSOs.length})
                </button>
                <button 
                  disabled={selectedDNSOs.length < 2 || selectedDNSOs.length > 3}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (selectedDNSOs.length >= 2 && selectedDNSOs.length <= 3) {
                      // Funcionalidad de comparar
                      console.log('Comparing DNSOs:', selectedDNSOs);
                      alert(`Comparing ${selectedDNSOs.length} DNSO(s)`);
                    }
                  }}
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare ({selectedDNSOs.length}/3)
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredDNSOs.length} of {dnsos.length} opportunities
              </p>
            </div>

            {/* DNSO Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredDNSOs.map((dnso) => (
                <div
                  key={dnso.id}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSectorColor(dnso.sector)}`}>
                          {getSectorIcon(dnso.sector)}
                          <span className="ml-1">{dnso.sector}</span>
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(dnso.priority)}`}>
                          {dnso.priority}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dnso.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono mb-2">
                        {dnso.id}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">ROI Range</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(dnso.roi_min)} - {formatCurrency(dnso.roi_max)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {dnso.competitive_advantage}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {dnso.client_type}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {dnso.geography}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => router.push(`/dnso/${dnso.id}`)}
                      className="flex-1 btn-executive text-sm font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2 inline" />
                      View Details
                    </button>
                    <button className="flex-1 btn-secondary text-sm font-medium">
                      <FileText className="w-4 h-4 mr-2 inline" />
                      Generate
                    </button>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDNSOs.includes(dnso.id)}
                        onChange={(e) => {
                          if (e.target.checked && selectedDNSOs.length < 3) {
                            setSelectedDNSOs([...selectedDNSOs, dnso.id]);
                          } else if (!e.target.checked) {
                            setSelectedDNSOs(selectedDNSOs.filter(id => id !== dnso.id));
                          }
                        }}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        title="Select for comparison (max 3)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDNSOs.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
