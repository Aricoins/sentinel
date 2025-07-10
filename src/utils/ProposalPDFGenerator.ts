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

export class ProposalPDFGenerator {
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

  private addCoverPage(dnso: DNSO, format: string): void {
    // Logo area
    this.doc.setFontSize(32);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(41, 128, 185);
    this.doc.text('StrategyVault', this.pageWidth / 2, 40, { align: 'center' });
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Executive Strategy Platform', this.pageWidth / 2, 48, { align: 'center' });
    
    // Title
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    
    const titleLines = this.doc.splitTextToSize(dnso.title, this.pageWidth - 40);
    let titleY = 80;
    titleLines.forEach((line: string) => {
      this.doc.text(line, this.pageWidth / 2, titleY, { align: 'center' });
      titleY += 8;
    });
    
    // Subtitle
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(41, 128, 185);
    this.doc.text(format.replace('-', ' ').toUpperCase(), this.pageWidth / 2, titleY + 15, { align: 'center' });
    
    // Key metrics box
    const boxY = titleY + 35;
    this.doc.setFillColor(248, 249, 250);
    this.doc.rect(30, boxY, this.pageWidth - 60, 50, 'F');
    this.doc.setDrawColor(41, 128, 185);
    this.doc.setLineWidth(0.5);
    this.doc.rect(30, boxY, this.pageWidth - 60, 50);
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Key Investment Metrics', 35, boxY + 10);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`ROI Potential: ${this.formatCurrency(dnso.roi_min)} - ${this.formatCurrency(dnso.roi_max)}`, 35, boxY + 20);
    this.doc.text(`Implementation Timeline: ${dnso.implementation_time}`, 35, boxY + 28);
    this.doc.text(`Sector: ${dnso.sector}${dnso.subsector ? ' - ' + dnso.subsector : ''}`, 35, boxY + 36);
    this.doc.text(`Priority Level: ${dnso.priority}`, 35, boxY + 44);
    
    // Footer
    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(`Generated: ${new Date().toLocaleDateString()}`, this.pageWidth / 2, this.pageHeight - 30, { align: 'center' });
    this.doc.text(`DNSO ID: ${dnso.id}`, this.pageWidth / 2, this.pageHeight - 20, { align: 'center' });
    this.doc.text('CONFIDENTIAL', this.pageWidth / 2, this.pageHeight - 10, { align: 'center' });
  }

  private addSection(title: string, content: string | string[]): void {
    this.checkPageBreak(20);
    
    // Section title
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(41, 128, 185);
    this.doc.text(title, this.margins.left, this.currentY);
    
    // Underline
    this.doc.setLineWidth(0.3);
    this.doc.setDrawColor(41, 128, 185);
    this.doc.line(this.margins.left, this.currentY + 1, this.margins.left + 50, this.currentY + 1);
    
    this.currentY += 8;
    
    // Content
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

  private addHighlightBox(title: string, content: string, bgColor: number[] = [255, 248, 220]): void {
    this.checkPageBreak(30);
    
    const lines = this.doc.splitTextToSize(content, this.pageWidth - this.margins.left - this.margins.right - 10);
    const boxHeight = lines.length * 6 + 20;
    
    // Background
    this.doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    this.doc.rect(this.margins.left, this.currentY, this.pageWidth - this.margins.left - this.margins.right, boxHeight, 'F');
    
    // Border
    this.doc.setDrawColor(255, 193, 7);
    this.doc.setLineWidth(0.5);
    this.doc.rect(this.margins.left, this.currentY, this.pageWidth - this.margins.left - this.margins.right, boxHeight);
    
    // Title
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(title, this.margins.left + 5, this.currentY + 8);
    
    // Content
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    lines.forEach((line: string, index: number) => {
      this.doc.text(line, this.margins.left + 5, this.currentY + 16 + (index * 6));
    });
    
    this.currentY += boxHeight + 8;
  }

  private addTable(headers: string[], rows: string[][]): void {
    this.checkPageBreak(40);
    
    const colWidth = (this.pageWidth - this.margins.left - this.margins.right) / headers.length;
    const rowHeight = 8;
    
    // Headers
    this.doc.setFontSize(9);
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
        const cellText = this.doc.splitTextToSize(cell, colWidth - 4);
        this.doc.text(cellText[0], this.margins.left + (cellIndex * colWidth) + 2, this.currentY + 5);
      });
      
      this.currentY += rowHeight;
    });
    
    this.currentY += 8;
  }

  private checkPageBreak(requiredSpace: number): void {
    if (this.currentY + requiredSpace > this.pageHeight - this.margins.bottom) {
      this.doc.addPage();
      this.currentY = this.margins.top;
    }
  }

  private addFooter(): void {
    const pageCount = this.doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      const footerY = this.pageHeight - 10;
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(128, 128, 128);
      this.doc.text('Confidential - StrategyVault Executive Platform', this.margins.left, footerY);
      this.doc.text(`Page ${i} of ${pageCount}`, this.pageWidth - this.margins.right - 20, footerY);
    }
  }

  public generateExecutiveProposal(dnso: DNSO): Blob {
    // Cover page
    this.addCoverPage(dnso, 'Executive Proposal');
    
    // New page for content
    this.doc.addPage();
    this.currentY = this.margins.top;
    
    // Executive Summary
    this.addSection('Executive Summary', 
      `${dnso.title} represents a ${dnso.priority.toLowerCase()} priority strategic opportunity in the ${dnso.sector} sector. ` +
      `This investment opportunity offers ROI potential of ${this.formatCurrency(dnso.roi_min)} to ${this.formatCurrency(dnso.roi_max)} ` +
      `with an implementation timeline of ${dnso.implementation_time}.`
    );
    
    // Opportunity Description
    if (dnso.description) {
      this.addSection('Opportunity Description', dnso.description);
    }
    
    // Competitive Advantage
    if (dnso.competitive_advantage) {
      this.addHighlightBox('Competitive Advantage', dnso.competitive_advantage);
    }
    
    // Market Urgency
    if (dnso.urgency_factor) {
      this.addHighlightBox('Market Urgency', dnso.urgency_factor, [255, 235, 238]);
    }
    
    // Strategic Value
    if (dnso.why_matters && dnso.why_matters.length > 0) {
      this.addSection('Strategic Value Proposition', dnso.why_matters);
    }
    
    // Investment Structure
    if (dnso.cost_components && dnso.cost_components.length > 0) {
      this.addSection('Investment Structure', '');
      const headers = ['Investment Component', 'Minimum', 'Maximum'];
      const rows = dnso.cost_components.map(comp => [
        comp.component,
        this.formatCurrency(comp.min),
        this.formatCurrency(comp.max)
      ]);
      
      // Add total row
      const totalMin = dnso.cost_components.reduce((sum, comp) => sum + comp.min, 0);
      const totalMax = dnso.cost_components.reduce((sum, comp) => sum + comp.max, 0);
      rows.push(['TOTAL INVESTMENT', this.formatCurrency(totalMin), this.formatCurrency(totalMax)]);
      
      this.addTable(headers, rows);
    }
    
    // Risk Mitigation
    if (dnso.risk_prevention) {
      this.addSection('Risk Mitigation Strategy', dnso.risk_prevention);
    }
    
    // Implementation Plan
    if (dnso.next_steps && dnso.next_steps.length > 0) {
      this.addSection('Implementation Next Steps', dnso.next_steps);
    }
    
    // Required Expertise
    if (dnso.expertise_tags && dnso.expertise_tags.length > 0) {
      this.addSection('Required Expertise & Capabilities', dnso.expertise_tags);
    }
    
    // Target Market
    this.addSection('Target Market Profile', [
      `Primary Geography: ${dnso.geography}`,
      `Client Type: ${dnso.client_type}`,
      `Target Client Size: ${dnso.target_client_size || 'Not specified'}`,
      `Sector Focus: ${dnso.sector}${dnso.subsector ? ' - ' + dnso.subsector : ''}`
    ]);
    
    // Recommendation
    this.addSection('Executive Recommendation', 
      `Based on the analysis, ${dnso.title} presents a compelling investment opportunity with strong ROI potential ` +
      `and strategic alignment. The ${dnso.priority.toLowerCase()} priority rating reflects the time-sensitive nature ` +
      `of this opportunity. Immediate action is recommended to capture maximum value.`
    );
    
    this.addFooter();
    return this.doc.output('blob');
  }

  public generateInvestmentBrief(dnso: DNSO): Blob {
    // Cover page
    this.addCoverPage(dnso, 'Investment Brief');
    
    // New page for content
    this.doc.addPage();
    this.currentY = this.margins.top;
    
    // Investment Overview
    this.addSection('Investment Overview', [
      `Opportunity: ${dnso.title}`,
      `DNSO ID: ${dnso.id}`,
      `Sector: ${dnso.sector}${dnso.subsector ? ' - ' + dnso.subsector : ''}`,
      `Priority Level: ${dnso.priority}`,
      `ROI Range: ${this.formatCurrency(dnso.roi_min)} - ${this.formatCurrency(dnso.roi_max)}`,
      `Implementation Timeline: ${dnso.implementation_time}`,
      `Target Geography: ${dnso.geography}`
    ]);
    
    // Financial Analysis
    if (dnso.cost_components && dnso.cost_components.length > 0) {
      this.addSection('Financial Analysis', '');
      const headers = ['Component', 'Min Investment', 'Max Investment'];
      const rows = dnso.cost_components.map(comp => [
        comp.component,
        this.formatCurrency(comp.min),
        this.formatCurrency(comp.max)
      ]);
      this.addTable(headers, rows);
    }
    
    // Market Opportunity
    if (dnso.urgency_factor) {
      this.addHighlightBox('Market Opportunity', dnso.urgency_factor);
    }
    
    // Competitive Position
    if (dnso.competitive_advantage) {
      this.addSection('Competitive Position', dnso.competitive_advantage);
    }
    
    // Risk Assessment
    if (dnso.risk_prevention) {
      this.addSection('Risk Assessment', dnso.risk_prevention);
    }
    
    // Investment Rationale
    if (dnso.why_matters && dnso.why_matters.length > 0) {
      this.addSection('Investment Rationale', dnso.why_matters);
    }
    
    this.addFooter();
    return this.doc.output('blob');
  }

  public generateTechnicalSpec(dnso: DNSO): Blob {
    // Cover page
    this.addCoverPage(dnso, 'Technical Specification');
    
    // New page for content
    this.doc.addPage();
    this.currentY = this.margins.top;
    
    // Technical Overview
    this.addSection('Technical Overview', dnso.description || 'Detailed technical specification for the opportunity.');
    
    // Technical Requirements
    if (dnso.expertise_tags && dnso.expertise_tags.length > 0) {
      this.addSection('Technical Requirements', [
        'Required technical capabilities and expertise:',
        ...dnso.expertise_tags.map(tag => `• ${tag}`)
      ]);
    }
    
    // Implementation Specifications
    this.addSection('Implementation Specifications', [
      `Timeline: ${dnso.implementation_time}`,
      `Scope: ${dnso.sector}${dnso.subsector ? ' - ' + dnso.subsector : ''} sector implementation`,
      `Geographic Coverage: ${dnso.geography}`,
      `Client Profile: ${dnso.client_type} - ${dnso.target_client_size || 'Various sizes'}`
    ]);
    
    // Technical Components
    if (dnso.cost_components && dnso.cost_components.length > 0) {
      this.addSection('Technical Components & Costs', '');
      const headers = ['Technical Component', 'Min Cost', 'Max Cost'];
      const rows = dnso.cost_components.map(comp => [
        comp.component,
        this.formatCurrency(comp.min),
        this.formatCurrency(comp.max)
      ]);
      this.addTable(headers, rows);
    }
    
    // Technical Risks
    if (dnso.risk_prevention) {
      this.addSection('Technical Risk Mitigation', dnso.risk_prevention);
    }
    
    // Implementation Steps
    if (dnso.next_steps && dnso.next_steps.length > 0) {
      this.addSection('Technical Implementation Steps', dnso.next_steps);
    }
    
    // Technical Validation
    this.addSection('Technical Validation Criteria', [
      'Technical feasibility assessment completed',
      'Resource availability confirmed',
      'Integration requirements validated',
      'Performance benchmarks established',
      'Quality assurance protocols defined'
    ]);
    
    this.addFooter();
    return this.doc.output('blob');
  }
}
