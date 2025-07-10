import jsPDF from 'jspdf';

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

interface ExportOptions {
  format: string;
  includeCharts: boolean;
  includeFinancials: boolean;
  includeBranding: boolean;
  watermark: boolean;
  customTitle: string;
  companyLogo: boolean;
}

export class PDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number;
  private pageHeight: number;
  private margins = { left: 20, right: 20, top: 20, bottom: 20 };

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  private addHeader(title: string): void {
    // Company branding
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(41, 128, 185); // Blue color
    this.doc.text('StrategyVault', this.margins.left, this.currentY);
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Executive Strategy Platform', this.margins.left, this.currentY + 6);
    
    // Date
    const today = new Date().toLocaleDateString();
    this.doc.text(`Generated: ${today}`, this.pageWidth - this.margins.right - 40, this.currentY);
    
    // Title
    this.currentY += 20;
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(title, this.margins.left, this.currentY);
    
    // Underline
    this.doc.setLineWidth(0.5);
    this.doc.setDrawColor(41, 128, 185);
    this.doc.line(this.margins.left, this.currentY + 2, this.pageWidth - this.margins.right, this.currentY + 2);
    
    this.currentY += 15;
  }

  private addSection(title: string, content: string | string[], isTable: boolean = false): void {
    this.checkPageBreak(20);
    
    // Section title
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(41, 128, 185);
    this.doc.text(title, this.margins.left, this.currentY);
    this.currentY += 8;
    
    // Section content
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0, 0, 0);
    
    if (Array.isArray(content)) {
      content.forEach(item => {
        this.checkPageBreak(6);
        this.doc.text(`• ${item}`, this.margins.left + 5, this.currentY);
        this.currentY += 6;
      });
    } else {
      const lines = this.doc.splitTextToSize(content, this.pageWidth - this.margins.left - this.margins.right);
      lines.forEach((line: string) => {
        this.checkPageBreak(6);
        this.doc.text(line, this.margins.left, this.currentY);
        this.currentY += 6;
      });
    }
    
    this.currentY += 5;
  }

  private addTable(headers: string[], rows: string[][]): void {
    this.checkPageBreak(40);
    
    const colWidth = (this.pageWidth - this.margins.left - this.margins.right) / headers.length;
    const rowHeight = 8;
    
    // Headers
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFillColor(41, 128, 185);
    this.doc.setTextColor(255, 255, 255);
    this.doc.rect(this.margins.left, this.currentY, this.pageWidth - this.margins.left - this.margins.right, rowHeight, 'F');
    
    headers.forEach((header, index) => {
      this.doc.text(header, this.margins.left + (index * colWidth) + 2, this.currentY + 5);
    });
    
    this.currentY += rowHeight;
    
    // Rows
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0, 0, 0);
    
    rows.forEach((row, rowIndex) => {
      this.checkPageBreak(rowHeight);
      
      if (rowIndex % 2 === 0) {
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(this.margins.left, this.currentY, this.pageWidth - this.margins.left - this.margins.right, rowHeight, 'F');
      }
      
      row.forEach((cell, cellIndex) => {
        this.doc.text(cell, this.margins.left + (cellIndex * colWidth) + 2, this.currentY + 5);
      });
      
      this.currentY += rowHeight;
    });
    
    this.currentY += 5;
  }

  private addHighlightBox(content: string, bgColor: number[] = [255, 248, 220]): void {
    this.checkPageBreak(20);
    
    const lines = this.doc.splitTextToSize(content, this.pageWidth - this.margins.left - this.margins.right - 10);
    const boxHeight = lines.length * 6 + 10;
    
    // Background box
    this.doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    this.doc.rect(this.margins.left, this.currentY, this.pageWidth - this.margins.left - this.margins.right, boxHeight, 'F');
    
    // Border
    this.doc.setDrawColor(255, 193, 7);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.margins.left, this.currentY, this.pageWidth - this.margins.left - this.margins.right, boxHeight);
    
    // Content
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(0, 0, 0);
    
    lines.forEach((line: string, index: number) => {
      this.doc.text(line, this.margins.left + 5, this.currentY + 8 + (index * 6));
    });
    
    this.currentY += boxHeight + 5;
  }

  private checkPageBreak(requiredSpace: number): void {
    if (this.currentY + requiredSpace > this.pageHeight - this.margins.bottom) {
      this.doc.addPage();
      this.currentY = this.margins.top;
    }
  }

  private addFooter(): void {
    const footerY = this.pageHeight - 15;
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(128, 128, 128);
    this.doc.text('Confidential - StrategyVault Executive Platform', this.margins.left, footerY);
    this.doc.text(`Page ${this.doc.internal.pages.length - 1}`, this.pageWidth - this.margins.right - 20, footerY);
  }

  public generateExecutiveSummary(dnsos: DNSO[], options: ExportOptions): Blob {
    const title = options.customTitle || 'Executive Summary Report';
    this.addHeader(title);
    
    // Executive Overview
    this.addSection('Executive Overview', [
      `Total Opportunities: ${dnsos.length}`,
      `Total ROI Potential: ${this.formatCurrency(dnsos.reduce((sum, dnso) => sum + dnso.roi_min, 0))} - ${this.formatCurrency(dnsos.reduce((sum, dnso) => sum + dnso.roi_max, 0))}`,
      `Sectors Covered: ${[...new Set(dnsos.map(dnso => dnso.sector))].join(', ')}`,
      `Average Implementation Time: ${Math.round(dnsos.reduce((sum, dnso) => {
        const timeMatch = dnso.implementation_time.match(/(\d+)/);
        return sum + (timeMatch ? parseInt(timeMatch[0]) : 6);
      }, 0) / dnsos.length)} months`
    ]);
    
    // Individual Opportunities
    dnsos.forEach(dnso => {
      this.addSection(`${dnso.title} (${dnso.id})`, [
        `Sector: ${dnso.sector}${dnso.subsector ? ' - ' + dnso.subsector : ''}`,
        `Priority: ${dnso.priority}`,
        `ROI Range: ${this.formatCurrency(dnso.roi_min)} - ${this.formatCurrency(dnso.roi_max)}`,
        `Implementation Time: ${dnso.implementation_time}`,
        `Geography: ${dnso.geography}`,
        `Client Type: ${dnso.client_type}`
      ]);
      
      if (dnso.description) {
        this.addSection('Description', dnso.description);
      }
      
      if (dnso.competitive_advantage) {
        this.addHighlightBox(`Competitive Advantage: ${dnso.competitive_advantage}`);
      }
      
      if (dnso.urgency_factor) {
        this.addHighlightBox(`Market Urgency: ${dnso.urgency_factor}`, [255, 235, 238]);
      }
      
      if (dnso.why_matters && dnso.why_matters.length > 0) {
        this.addSection('Strategic Value', dnso.why_matters);
      }
      
      if (dnso.cost_components && dnso.cost_components.length > 0) {
        const headers = ['Component', 'Min Investment', 'Max Investment'];
        const rows = dnso.cost_components.map(comp => [
          comp.component,
          this.formatCurrency(comp.min),
          this.formatCurrency(comp.max)
        ]);
        this.addTable(headers, rows);
      }
      
      if (dnso.next_steps && dnso.next_steps.length > 0) {
        this.addSection('Next Steps', dnso.next_steps);
      }
    });
    
    // Add footer to all pages
    const totalPages = this.doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.addFooter();
    }
    
    return this.doc.output('blob');
  }

  public generateDetailedAnalysis(dnsos: DNSO[], options: ExportOptions): Blob {
    const title = options.customTitle || 'Detailed Analysis Report';
    this.addHeader(title);
    
    // Portfolio Analysis
    this.addSection('Portfolio Analysis', [
      `This report provides comprehensive analysis of ${dnsos.length} strategic opportunities`,
      `Combined ROI potential ranges from ${this.formatCurrency(dnsos.reduce((sum, dnso) => sum + dnso.roi_min, 0))} to ${this.formatCurrency(dnsos.reduce((sum, dnso) => sum + dnso.roi_max, 0))}`,
      `Opportunities span across ${[...new Set(dnsos.map(dnso => dnso.sector))].length} sectors`,
      `Geographic coverage includes: ${[...new Set(dnsos.map(dnso => dnso.geography))].join(', ')}`
    ]);
    
    // Detailed breakdown for each DNSO
    dnsos.forEach((dnso, index) => {
      this.doc.addPage();
      this.currentY = this.margins.top;
      
      this.addSection(`Opportunity ${index + 1}: ${dnso.title}`, '');
      
      // Key Metrics Table
      const keyMetrics = [
        ['Metric', 'Value'],
        ['DNSO ID', dnso.id],
        ['Sector', `${dnso.sector}${dnso.subsector ? ' - ' + dnso.subsector : ''}`],
        ['Priority Level', dnso.priority],
        ['ROI Range', `${this.formatCurrency(dnso.roi_min)} - ${this.formatCurrency(dnso.roi_max)}`],
        ['Implementation Time', dnso.implementation_time],
        ['Target Geography', dnso.geography],
        ['Client Type', dnso.client_type],
        ['Target Client Size', dnso.target_client_size || 'Not specified']
      ];
      
      this.addTable(keyMetrics[0], keyMetrics.slice(1));
      
      if (dnso.description) {
        this.addSection('Opportunity Description', dnso.description);
      }
      
      if (dnso.competitive_advantage) {
        this.addHighlightBox(`Competitive Advantage: ${dnso.competitive_advantage}`);
      }
      
      if (dnso.urgency_factor) {
        this.addHighlightBox(`Market Urgency: ${dnso.urgency_factor}`, [255, 235, 238]);
      }
      
      if (dnso.why_matters && dnso.why_matters.length > 0) {
        this.addSection('Strategic Value Proposition', dnso.why_matters);
      }
      
      if (dnso.expertise_tags && dnso.expertise_tags.length > 0) {
        this.addSection('Required Expertise', dnso.expertise_tags);
      }
      
      if (dnso.cost_components && dnso.cost_components.length > 0) {
        this.addSection('Investment Structure', '');
        const headers = ['Cost Component', 'Minimum', 'Maximum'];
        const rows = dnso.cost_components.map(comp => [
          comp.component,
          this.formatCurrency(comp.min),
          this.formatCurrency(comp.max)
        ]);
        this.addTable(headers, rows);
      }
      
      if (dnso.risk_prevention) {
        this.addSection('Risk Mitigation', dnso.risk_prevention);
      }
      
      if (dnso.next_steps && dnso.next_steps.length > 0) {
        this.addSection('Implementation Next Steps', dnso.next_steps);
      }
    });
    
    // Add footer to all pages
    const totalPages = this.doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.addFooter();
    }
    
    return this.doc.output('blob');
  }

  public generateComparisonReport(dnsos: DNSO[], options: ExportOptions): Blob {
    const title = options.customTitle || 'Opportunity Comparison Report';
    this.addHeader(title);
    
    // Comparison Overview
    this.addSection('Comparison Overview', [
      `Comparing ${dnsos.length} strategic opportunities`,
      `ROI analysis, implementation complexity, and strategic fit evaluation`,
      `Recommendations based on portfolio optimization principles`
    ]);
    
    // Comparison Table
    const headers = ['Opportunity', 'Sector', 'Priority', 'ROI Min', 'ROI Max', 'Timeline'];
    const rows = dnsos.map(dnso => [
      dnso.title,
      dnso.sector,
      dnso.priority,
      this.formatCurrency(dnso.roi_min),
      this.formatCurrency(dnso.roi_max),
      dnso.implementation_time
    ]);
    
    this.addTable(headers, rows);
    
    // Detailed Comparison
    this.addSection('Detailed Comparison Analysis', '');
    
    dnsos.forEach((dnso, index) => {
      this.addSection(`${index + 1}. ${dnso.title}`, [
        `Competitive Advantage: ${dnso.competitive_advantage}`,
        `Market Urgency: ${dnso.urgency_factor || 'Not specified'}`,
        `Geographic Focus: ${dnso.geography}`,
        `Client Profile: ${dnso.client_type} - ${dnso.target_client_size || 'Not specified'}`
      ]);
    });
    
    // Recommendations
    this.addSection('Executive Recommendations', [
      `Highest ROI Opportunity: ${dnsos.reduce((max, dnso) => dnso.roi_max > max.roi_max ? dnso : max).title}`,
      `Most Critical Priority: ${dnsos.find(dnso => dnso.priority === 'Critical')?.title || 'None marked as Critical'}`,
      `Fastest Implementation: ${dnsos.reduce((min, dnso) => {
        const timeMatch = dnso.implementation_time.match(/(\d+)/);
        const currentTime = timeMatch ? parseInt(timeMatch[0]) : 12;
        const minTimeMatch = min.implementation_time.match(/(\d+)/);
        const minTime = minTimeMatch ? parseInt(minTimeMatch[0]) : 12;
        return currentTime < minTime ? dnso : min;
      }).title}`,
      `Portfolio diversification across ${[...new Set(dnsos.map(dnso => dnso.sector))].length} sectors reduces overall risk`
    ]);
    
    // Add footer to all pages
    const totalPages = this.doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.addFooter();
    }
    
    return this.doc.output('blob');
  }

  public generatePortfolioOverview(dnsos: DNSO[], stats: any, options: ExportOptions): Blob {
    const title = options.customTitle || 'Portfolio Overview Report';
    this.addHeader(title);
    
    // Executive Dashboard
    this.addSection('Executive Dashboard', [
      `Total Opportunities: ${stats.total_dnsos}`,
      `Total ROI Potential: ${this.formatCurrency(stats.total_roi_potential.min)} - ${this.formatCurrency(stats.total_roi_potential.max)}`,
      `Average ROI: ${this.formatCurrency(stats.average_roi.min)} - ${this.formatCurrency(stats.average_roi.max)}`,
      `Sectors Covered: ${stats.sectors_covered}`,
      `Geographic Markets: ${stats.geographies.join(', ')}`
    ]);
    
    // Sector Breakdown
    if (stats.sector_breakdown) {
      this.addSection('Sector Analysis', '');
      const sectorHeaders = ['Sector', 'Opportunities', 'Min ROI', 'Max ROI', 'Avg ROI'];
      const sectorRows = stats.sector_breakdown.map((sector: any) => [
        sector.sector,
        sector.count.toString(),
        this.formatCurrency(sector.roi.min),
        this.formatCurrency(sector.roi.max),
        this.formatCurrency(sector.averageROI.max)
      ]);
      this.addTable(sectorHeaders, sectorRows);
    }
    
    // Priority Distribution
    if (stats.priority_breakdown) {
      this.addSection('Priority Distribution', '');
      const priorityHeaders = ['Priority Level', 'Count', 'Percentage'];
      const priorityRows = stats.priority_breakdown.map((priority: any) => [
        priority.priority,
        priority.count.toString(),
        `${priority.percentage}%`
      ]);
      this.addTable(priorityHeaders, priorityRows);
    }
    
    // Strategic Recommendations
    this.addSection('Strategic Recommendations', [
      'Diversify across multiple sectors to reduce concentration risk',
      'Prioritize Critical and High priority opportunities for immediate action',
      'Consider geographic expansion based on market opportunities',
      'Leverage existing competitive advantages across similar opportunities',
      'Develop capability roadmap for emerging sectors'
    ]);
    
    // Risk Assessment
    this.addHighlightBox(
      'Risk Assessment: Portfolio demonstrates strong diversification across sectors and geographies. ' +
      'Monitor implementation capacity to ensure successful execution of multiple concurrent opportunities.',
      [255, 235, 238]
    );
    
    // Add footer to all pages
    const totalPages = this.doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);
      this.addFooter();
    }
    
    return this.doc.output('blob');
  }
}
