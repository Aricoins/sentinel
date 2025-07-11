"use client";

import React, { useState, useEffect } from "react";
import { generateAnalysisPDF } from "../utils/AnalysisPDFGenerator";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Building2,
  Users,
  DollarSign,
  Calendar,
  Target,
  TrendingUp,
  FileText,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Factory,
  Briefcase,
  MapPin,
  Clock,
  Eye,
  Download,
  Save,
  Edit3,
} from "lucide-react";

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

interface ClientProfile {
  name: string;
  industry: string;
  size: string;
  budget: [number, number];
  region: string;
}

interface AnalysisFilters {
  sectors: string[];
  priorities: string[];
  roiRange: [number, number];
  implementationTime: string;
  clientTypes: string[];
}

interface AnalysisConfig {
  title: string;
  objectives: string;
  painPoints: string;
  presentationDate: string;
  analysisType: string;
}

interface NewAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  dnsos: DNSO[];
  onCreateAnalysis: (analysis: any) => void;
  onSaveDraft: (analysis: any) => void;
}

const NewAnalysisModal: React.FC<NewAnalysisModalProps> = ({
  isOpen,
  onClose,
  dnsos,
  onCreateAnalysis,
  onSaveDraft,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    name: "",
    industry: "",
    size: "",
    budget: [500000, 5000000],
    region: "",
  });

  const [analysisFilters, setAnalysisFilters] = useState<AnalysisFilters>({
    sectors: [],
    priorities: [],
    roiRange: [400000, 5000000],
    implementationTime: "",
    clientTypes: [],
  });

  const [analysisConfig, setAnalysisConfig] = useState<AnalysisConfig>({
    title: "",
    objectives: "",
    painPoints: "",
    presentationDate: "",
    analysisType: "comprehensive",
  });

  const [filteredDNSOs, setFilteredDNSOs] = useState<DNSO[]>([]);
  const [selectedDNSOs, setSelectedDNSOs] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  // Configuration options
  const industries = [
    "Healthcare",
    "Manufacturing",
    "Government",
    "Financial Services",
    "Technology",
    "Energy",
    "Chemical/Pharmaceutical",
    "Defense",
    "Infrastructure",
    "Retail",
    "Education",
    "Transportation",
  ];

  const companySizes = [
    {
      value: "Small",
      label: "Small (1-50 employees)",
      budget: [100000, 500000] as [number, number],
    },
    {
      value: "Medium",
      label: "Medium (51-200 employees)",
      budget: [500000, 2000000] as [number, number],
    },
    {
      value: "Large",
      label: "Large (201-1000 employees)",
      budget: [2000000, 10000000] as [number, number],
    },
    {
      value: "Enterprise",
      label: "Enterprise (1000+ employees)",
      budget: [10000000, 50000000] as [number, number],
    },
  ];

  const sectors = [
    "Energy",
    "Chemical/Pharmaceutical",
    "Government/Defense",
    "Infrastructure",
    "Technology",
  ];
  const priorities = ["Critical", "High", "Medium"];
  const clientTypes = ["Healthcare", "Government", "Manufacturing"];
  const regions = [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Latin America",
    "Middle East & Africa",
  ];
  const implementationTimes = [
    "3-6 months",
    "6-12 months",
    "12-18 months",
    "18-24 months",
    "24+ months",
  ];

  // Filter DNSOs based on criteria
  useEffect(() => {
    let filtered = [...dnsos];

    // Apply sector filter
    if (analysisFilters.sectors.length > 0) {
      filtered = filtered.filter((dnso) =>
        analysisFilters.sectors.includes(dnso.sector)
      );
    }

    // Apply priority filter
    if (analysisFilters.priorities.length > 0) {
      filtered = filtered.filter((dnso) =>
        analysisFilters.priorities.includes(dnso.priority)
      );
    }

    // Apply ROI range filter
    filtered = filtered.filter(
      (dnso) =>
        dnso.roi_max >= analysisFilters.roiRange[0] &&
        dnso.roi_min <= analysisFilters.roiRange[1]
    );

    // Apply client type filter
    if (analysisFilters.clientTypes.length > 0) {
      filtered = filtered.filter((dnso) =>
        analysisFilters.clientTypes.includes(dnso.client_type)
      );
    }

    // Apply budget constraints
    filtered = filtered.filter(
      (dnso) =>
        dnso.roi_min >= clientProfile.budget[0] * 0.1 && // At least 10% of budget
        dnso.roi_max <= clientProfile.budget[1] * 2 // Max 200% of budget
    );

    setFilteredDNSOs(filtered);
  }, [analysisFilters, clientProfile, dnsos]);

  // Auto-select top DNSOs based on criteria
  useEffect(() => {
    if (filteredDNSOs.length > 0) {
      const sortedDNSOs = [...filteredDNSOs].sort((a, b) => {
        const priorityOrder = { Critical: 3, High: 2, Medium: 1 };
        const aPriority =
          priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const bPriority =
          priorityOrder[b.priority as keyof typeof priorityOrder] || 0;

        if (aPriority !== bPriority) return bPriority - aPriority;
        return b.roi_max - a.roi_max;
      });

      setSelectedDNSOs(sortedDNSOs.slice(0, 5).map((dnso) => dnso.id));
    }
  }, [filteredDNSOs]);

  // Validation
  useEffect(() => {
    const step1Valid = !!(
      clientProfile.name && clientProfile.industry && clientProfile.size
    );
    const step2Valid =
      analysisFilters.sectors.length > 0 ||
      analysisFilters.priorities.length > 0;
    const step3Valid = !!(
      analysisConfig.title &&
      analysisConfig.objectives &&
      selectedDNSOs.length > 0
    );

    setIsValid(step1Valid && step2Valid && step3Valid);
  }, [clientProfile, analysisFilters, analysisConfig, selectedDNSOs]);

  // Calculate totals
  const selectedDNSOsData = dnsos.filter((dnso) =>
    selectedDNSOs.includes(dnso.id)
  );
  const totalROI = selectedDNSOsData.reduce(
    (sum, dnso) => ({
      min: sum.min + dnso.roi_min,
      max: sum.max + dnso.roi_max,
    }),
    { min: 0, max: 0 }
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "Energy":
        return <Zap className="w-4 h-4" />;
      case "Infrastructure":
        return <Building2 className="w-4 h-4" />;
      case "Government/Defense":
        return <Shield className="w-4 h-4" />;
      case "Chemical/Pharmaceutical":
        return <Factory className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreateAnalysis = () => {
    const analysis = {
      id: `ANALYSIS-${Date.now()}`,
      timestamp: new Date().toISOString(),
      clientProfile,
      analysisFilters,
      analysisConfig,
      selectedDNSOs: selectedDNSOsData,
      totalROI,
      status: "active",
    };

    // Generate PDF report
    try {
      // PDF generation temporarily disabled - will be re-enabled after testing
      console.log("Analysis created successfully - PDF generation coming soon!");
      alert('Analysis created successfully! PDF generation will be available in the next update.');
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert('Analysis saved successfully!');
    }

    onCreateAnalysis(analysis);
    resetForm();
    onClose();
  };

  const handleSaveDraft = () => {
    const draft = {
      id: `DRAFT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      clientProfile,
      analysisFilters,
      analysisConfig,
      selectedDNSOs: selectedDNSOsData,
      totalROI,
      status: "draft",
    };

    onSaveDraft(draft);
    resetForm();
    onClose();
  };

  const handlePreviewPDF = () => {
    // PDF preview temporarily disabled - will be re-enabled after testing
    try {
      console.log('PDF preview requested for:', analysisConfig.title || 'Untitled Analysis');
      alert('PDF preview feature coming soon! Your analysis configuration looks great.');
    } catch (error) {
      console.error("Error generating PDF preview:", error);
      alert('Preview not available at the moment.');
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setClientProfile({
      name: "",
      industry: "",
      size: "",
      budget: [500000, 5000000],
      region: "",
    });
    setAnalysisFilters({
      sectors: [],
      priorities: [],
      roiRange: [400000, 5000000],
      implementationTime: "",
      clientTypes: [],
    });
    setAnalysisConfig({
      title: "",
      objectives: "",
      painPoints: "",
      presentationDate: "",
      analysisType: "comprehensive",
    });
    setSelectedDNSOs([]);
  };

  // Reset form when modal closes
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Client Profile Setup
              </h3>
              <p className="text-gray-600">
                Define your client's characteristics and requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Client Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter client organization name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={clientProfile.name}
                  onChange={(e) =>
                    setClientProfile({ ...clientProfile, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Industry Sector *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={clientProfile.industry}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      industry: e.target.value,
                    })
                  }
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Organization Size *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={clientProfile.size}
                  onChange={(e) => {
                    const size = companySizes.find(
                      (s) => s.value === e.target.value
                    );
                    setClientProfile({
                      ...clientProfile,
                      size: e.target.value,
                      budget: size ? size.budget : [500000, 5000000],
                    });
                  }}
                >
                  <option value="">Select Size</option>
                  {companySizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Primary Region
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={clientProfile.region}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      region: e.target.value,
                    })
                  }
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Available Budget Range
              </label>
              <div className="px-4">
                <input
                  type="range"
                  min={100000}
                  max={50000000}
                  step={100000}
                  value={clientProfile.budget[1]}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      budget: [
                        clientProfile.budget[0],
                        parseInt(e.target.value),
                      ],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                  <span>{formatCurrency(clientProfile.budget[0])}</span>
                  <span className="text-blue-600 font-bold">
                    {formatCurrency(clientProfile.budget[1])}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Opportunity Filters
              </h3>
              <p className="text-gray-600">
                Define criteria for selecting relevant DNSOs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Target Sectors
                </label>
                <div className="space-y-2">
                  {sectors.map((sector) => (
                    <label key={sector} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={analysisFilters.sectors.includes(sector)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAnalysisFilters({
                              ...analysisFilters,
                              sectors: [...analysisFilters.sectors, sector],
                            });
                          } else {
                            setAnalysisFilters({
                              ...analysisFilters,
                              sectors: analysisFilters.sectors.filter(
                                (s) => s !== sector
                              ),
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="flex items-center space-x-2">
                        {getSectorIcon(sector)}
                        <span className="text-gray-700">{sector}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Priority Levels
                </label>
                <div className="space-y-2">
                  {priorities.map((priority) => (
                    <label
                      key={priority}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        checked={analysisFilters.priorities.includes(priority)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAnalysisFilters({
                              ...analysisFilters,
                              priorities: [
                                ...analysisFilters.priorities,
                                priority,
                              ],
                            });
                          } else {
                            setAnalysisFilters({
                              ...analysisFilters,
                              priorities: analysisFilters.priorities.filter(
                                (p) => p !== priority
                              ),
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          priority === "Critical"
                            ? "bg-red-100 text-red-800"
                            : priority === "High"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {priority}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                ROI Range Requirements
              </label>
              <div className="px-4">
                <input
                  type="range"
                  min={400000}
                  max={10000000}
                  step={100000}
                  value={analysisFilters.roiRange[1]}
                  onChange={(e) =>
                    setAnalysisFilters({
                      ...analysisFilters,
                      roiRange: [
                        analysisFilters.roiRange[0],
                        parseInt(e.target.value),
                      ],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                  <span>{formatCurrency(analysisFilters.roiRange[0])}</span>
                  <span className="text-blue-600 font-bold">
                    {formatCurrency(analysisFilters.roiRange[1])}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Implementation Timeline
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={analysisFilters.implementationTime}
                  onChange={(e) =>
                    setAnalysisFilters({
                      ...analysisFilters,
                      implementationTime: e.target.value,
                    })
                  }
                >
                  <option value="">Any Timeline</option>
                  {implementationTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Client Types
                </label>
                <div className="space-y-2">
                  {clientTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={analysisFilters.clientTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAnalysisFilters({
                              ...analysisFilters,
                              clientTypes: [
                                ...analysisFilters.clientTypes,
                                type,
                              ],
                            });
                          } else {
                            setAnalysisFilters({
                              ...analysisFilters,
                              clientTypes: analysisFilters.clientTypes.filter(
                                (t) => t !== type
                              ),
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Analysis Configuration
              </h3>
              <p className="text-gray-600">
                Finalize your analysis setup and review selected opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Analysis Title *
                </label>
                <input
                  type="text"
                  placeholder="Strategic Opportunity Analysis for [Client]"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={analysisConfig.title}
                  onChange={(e) =>
                    setAnalysisConfig({
                      ...analysisConfig,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Analysis Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={analysisConfig.analysisType}
                  onChange={(e) =>
                    setAnalysisConfig({
                      ...analysisConfig,
                      analysisType: e.target.value,
                    })
                  }
                >
                  <option value="comprehensive">Comprehensive Analysis</option>
                  <option value="executive">Executive Summary</option>
                  <option value="technical">Technical Deep Dive</option>
                  <option value="financial">Financial Focus</option>
                  <option value="competitive">Competitive Analysis</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Client Objectives *
              </label>
              <textarea
                placeholder="Describe the client's primary objectives and success criteria..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={4}
                value={analysisConfig.objectives}
                onChange={(e) =>
                  setAnalysisConfig({
                    ...analysisConfig,
                    objectives: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Key Pain Points
              </label>
              <textarea
                placeholder="Identify specific challenges and pain points the client is facing..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={4}
                value={analysisConfig.painPoints}
                onChange={(e) =>
                  setAnalysisConfig({
                    ...analysisConfig,
                    painPoints: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Presentation Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={analysisConfig.presentationDate}
                onChange={(e) =>
                  setAnalysisConfig({
                    ...analysisConfig,
                    presentationDate: e.target.value,
                  })
                }
              />
            </div>

            {/* Selected DNSOs Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Selected Opportunities
                </h4>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {selectedDNSOs.length} of {filteredDNSOs.length}{" "}
                    opportunities
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total ROI Potential</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(totalROI.min)} -{" "}
                      {formatCurrency(totalROI.max)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {selectedDNSOsData.map((dnso) => (
                  <div
                    key={dnso.id}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              dnso.sector === "Energy"
                                ? "bg-yellow-100 text-yellow-800"
                                : dnso.sector === "Infrastructure"
                                ? "bg-blue-100 text-blue-800"
                                : dnso.sector === "Government/Defense"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {getSectorIcon(dnso.sector)}
                            <span className="ml-1">{dnso.sector}</span>
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              dnso.priority === "Critical"
                                ? "bg-red-500 text-white"
                                : dnso.priority === "High"
                                ? "bg-orange-500 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                          >
                            {dnso.priority}
                          </span>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-1">
                          {dnso.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">{dnso.id}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {formatCurrency(dnso.roi_min)} -{" "}
                            {formatCurrency(dnso.roi_max)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {dnso.implementation_time}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedDNSOs(
                            selectedDNSOs.filter((id) => id !== dnso.id)
                          )
                        }
                        className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from selection"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDNSOs.length > selectedDNSOs.length && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Additional opportunities available (
                    {filteredDNSOs.length - selectedDNSOs.length} more)
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        setSelectedDNSOs(filteredDNSOs.map((dnso) => dnso.id))
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Select All Matching Opportunities
                    </button>
                    <button
                      onClick={() => {
                        const previewAnalysis = {
                          id: `PREVIEW-${Date.now()}`,
                          timestamp: new Date().toISOString(),
                          clientProfile,
                          analysisFilters,
                          analysisConfig: {
                            ...analysisConfig,
                            title: analysisConfig.title || "Preview Analysis",
                          },
                          selectedDNSOs: selectedDNSOsData,
                          totalROI,
                          status: "preview",
                        };
                        try {
                          console.log('Generating preview PDF from inline button');
                          // Temporarily disabled PDF generation to debug
                          // generateAnalysisPDF(previewAnalysis);
                          alert('PDF preview feature temporarily disabled for debugging');
                        } catch (error) {
                          console.error("Error generating preview PDF:", error);
                          alert(
                            "Error generating preview. Please check your analysis configuration."
                          );
                        }
                      }}
                      disabled={selectedDNSOs.length === 0}
                      className="flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '0',
          maxWidth: '95vw',
          maxHeight: '95vh',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1000000,
          width: '1200px',
          minHeight: '600px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          padding: '24px 32px',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: 'white',
                margin: '0 0 8px 0'
              }}>
                🚀 StrategyVault
              </h2>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontSize: '16px',
                margin: '0'
              }}>
                Create strategic analysis for your clients
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: step <= currentStep ? '#3b82f6' : '#e5e7eb',
                  color: step <= currentStep ? 'white' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  {step < currentStep ? '✓' : step}
                </div>
                <span style={{
                  marginLeft: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: step <= currentStep ? '#3b82f6' : '#9ca3af'
                }}>
                  {step === 1 ? 'Client Profile' : step === 2 ? 'Opportunity Filters' : 'Analysis Config'}
                </span>
              </div>
            ))}
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(currentStep / 3) * 100}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '32px',
          maxHeight: 'calc(95vh - 300px)',
          overflowY: 'auto'
        }}>
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '24px 32px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleSaveDraft}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              💾 Save Draft
            </button>
            
            {currentStep === 3 && (
              <button
                onClick={handlePreviewPDF}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                👁️ Preview PDF
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleCreateAnalysis}
                disabled={!isValid}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: isValid ? '#10b981' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isValid ? 'pointer' : 'not-allowed'
                }}
              >
                📄 Create Analysis
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAnalysisModal;
