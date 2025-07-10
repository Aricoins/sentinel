# Export Functionality Documentation

## Overview
The StrategyVault application includes comprehensive export functionality across multiple contexts, each designed for specific business use cases.

## Export Button Locations & Business Logic

### 1. Navbar Export Button
- **Location**: Top navigation bar
- **Business Purpose**: Export complete portfolio report
- **Functionality**: Exports all DNSOs in the current view as a comprehensive portfolio report
- **File Type**: PDF (professional reports)
- **Use Case**: Executive overview of entire opportunity portfolio

### 2. Dashboard Export Button
- **Location**: Analytics dashboard
- **Business Purpose**: Export dashboard analytics and metrics
- **Functionality**: Exports statistical data, charts, and KPIs from the dashboard
- **File Type**: PDF (analytics report)
- **Use Case**: Board presentations, performance reporting

### 3. Portfolio Export Button
- **Location**: Main portfolio view (when DNSOs are selected)
- **Business Purpose**: Export selected DNSOs for comparison
- **Functionality**: Exports 1-3 selected DNSOs with detailed analysis
- **File Type**: PDF (comparison report)
- **Use Case**: Side-by-side opportunity analysis

### 4. Individual DNSO Export Button
- **Location**: Portfolio grid cards
- **Business Purpose**: Quick export of individual DNSO
- **Functionality**: Exports single DNSO with executive summary
- **File Type**: PDF (single opportunity report)
- **Use Case**: Individual opportunity review

### 5. DNSO Detail "Generate Proposal" Button
- **Location**: Individual DNSO detail page
- **Business Purpose**: Generate executive proposal for specific DNSO
- **Functionality**: Creates comprehensive proposal document
- **File Type**: PDF (professional proposal)
- **Use Case**: Client presentations, investment proposals

## Export Formats Available

### Executive Summary
- **Description**: Concise overview with key metrics and ROI analysis
- **Pages**: 1-2 pages per DNSO
- **Best for**: Quick executive briefings

### Detailed Analysis
- **Description**: Comprehensive report with full DNSO information
- **Pages**: 4-6 pages per DNSO
- **Best for**: Deep dive analysis

### Comparison Report
- **Description**: Side-by-side analysis of selected DNSOs
- **Pages**: 2-4 pages total
- **Best for**: Investment committee reviews

### Portfolio Overview
- **Description**: Strategic portfolio view with analytics dashboard
- **Pages**: 3-5 pages total
- **Best for**: Board presentations

## Current Implementation Status

### ✅ Completed Features
- All export buttons are functional and connected
- **Professional PDF generation using jsPDF**
- Multiple PDF formats (Executive Summary, Detailed Analysis, Comparison Report, Portfolio Overview)
- Individual proposal generation (Executive Proposal, Investment Brief, Technical Specification)
- Progress indicators and notifications
- Advanced export options (modal)
- Email delivery simulation
- Preview functionality
- Professional PDF formatting with branding

### 🔄 In Progress
- Email delivery integration
- Advanced charting in PDFs
- Custom branding templates

### 📋 Future Enhancements
- Charts and visualizations in PDFs
- Scheduled exports
- Export templates
- Integration with external tools (PowerBI, Tableau)

## Technical Implementation

### PDF Generation
The application now uses **jsPDF** library to generate professional PDF documents with:
- Professional layouts and typography
- Company branding and logos
- Tables and structured data
- Highlight boxes for important information
- Multiple page support with headers/footers
- Responsive formatting

### File Types Generated
- **PDF**: Professional reports ready for executive presentation
- **Cover pages**: Professional branded cover pages
- **Structured content**: Tables, sections, and highlight boxes
- **Multi-page support**: Automatic page breaks and navigation

### PDF Formats Available

#### Executive Summary PDF
- Professional multi-page format
- Executive overview section
- Individual opportunity summaries
- Financial analysis tables
- Strategic recommendations

#### Detailed Analysis PDF
- Comprehensive multi-page reports
- Detailed breakdowns for each DNSO
- Key metrics tables
- Implementation specifications
- Risk assessments

#### Comparison Report PDF
- Side-by-side opportunity analysis
- Comparison tables
- Executive recommendations
- Portfolio optimization insights

#### Portfolio Overview PDF
- Strategic portfolio analysis
- Sector breakdowns
- Priority distribution analysis
- Executive dashboard metrics

### Proposal PDFs

#### Executive Proposal
- Professional cover page
- Executive summary
- Strategic value proposition
- Investment structure
- Implementation plan
- Risk mitigation strategies

#### Investment Brief
- Focused financial analysis
- Investment overview
- Market opportunity assessment
- Competitive positioning
- Risk assessment

#### Technical Specification
- Technical requirements
- Implementation specifications
- Component breakdowns
- Technical validation criteria

### File Naming Convention
```
[Format-Name]_[DNSO-Title]_[YYYY-MM-DD].pdf
```

Example: `Executive_Summary_Nuclear_Medical_Isotope_2025-07-10.pdf`

## Usage Examples

### Exporting Portfolio Data
1. Select DNSOs using checkboxes (max 3)
2. Click main Export button
3. Choose format or use advanced options
4. Download generates automatically

### Generating Individual Proposals
1. Navigate to DNSO detail page
2. Click "Generate Proposal" button
3. Select proposal format
4. Download generates structured proposal data

### Dashboard Analytics Export
1. Navigate to Dashboard view
2. Click "Export Dashboard" button
3. Structured analytics data downloads automatically

## Troubleshooting

### Common Issues
1. **PDF generation errors**: Ensure browser supports jsPDF (all modern browsers do)
2. **Empty exports**: Ensure DNSOs are selected before exporting
3. **Missing data**: Check that all required DNSO fields are populated
4. **Large file sizes**: Complex PDFs may take longer to generate

### Browser Compatibility
- Chrome: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support

## Future PDF Implementation
The PDF generation is now fully implemented using jsPDF with:
1. Professional formatting and branding
2. Multi-page support with headers and footers
3. Tables, charts, and structured layouts
4. Executive-quality presentation ready documents
5. Multiple formats for different business contexts

Future enhancements will include:
- Advanced charts and visualizations
- Custom branding templates
- Interactive PDF features
- Integration with external design tools
