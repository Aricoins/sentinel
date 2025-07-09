import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// TypeScript interfaces
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
}

interface DNSODatabase {
    metadata: {
        version: string;
        created_date: string;
        total_dnsos: number;
        sectors_covered: string[];
        target_markets: string[];
        quality_assured: string;
    };
    dnsos: DNSO[];
}

interface FilterParams {
    sector?: string;
    priority?: string;
    client_type?: string;
    geography?: string;
    roi_min?: number;
    roi_max?: number;
    search?: string;
    limit?: number;
    offset?: number;
}

// Load data helper
function loadDNSOData(): DNSODatabase {
    try {
        const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'data.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        return data.dnso_database;
    } catch (error) {
        console.error('Error loading DNSO data:', error);
        throw new Error('Failed to load DNSO database');
    }
}

// Filter DNSOs helper
function filterDNSOs(dnsos: DNSO[], filters: FilterParams): DNSO[] {
    let filtered = [...dnsos];

    // Filter by sector
    if (filters.sector) {
        filtered = filtered.filter(dnso => 
            dnso.sector.toLowerCase().includes(filters.sector!.toLowerCase())
        );
    }

    // Filter by priority
    if (filters.priority) {
        filtered = filtered.filter(dnso => 
            dnso.priority.toLowerCase() === filters.priority!.toLowerCase()
        );
    }

    // Filter by client type
    if (filters.client_type) {
        filtered = filtered.filter(dnso => 
            dnso.client_type.toLowerCase().includes(filters.client_type!.toLowerCase())
        );
    }

    // Filter by geography
    if (filters.geography) {
        filtered = filtered.filter(dnso => 
            dnso.geography.toLowerCase().includes(filters.geography!.toLowerCase())
        );
    }

    // Filter by ROI range
    if (filters.roi_min !== undefined) {
        filtered = filtered.filter(dnso => dnso.roi_max >= filters.roi_min!);
    }

    if (filters.roi_max !== undefined) {
        filtered = filtered.filter(dnso => dnso.roi_min <= filters.roi_max!);
    }

    // Search filter (title, description, expertise_tags)
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(dnso => 
            dnso.title.toLowerCase().includes(searchTerm) ||
            dnso.description.toLowerCase().includes(searchTerm) ||
            dnso.expertise_tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            dnso.competitive_advantage.toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

// Calculate statistics helper
function calculateStats(dnsos: DNSO[]) {
    const totalDNSOs = dnsos.length;
    const totalROIMin = dnsos.reduce((sum, dnso) => sum + dnso.roi_min, 0);
    const totalROIMax = dnsos.reduce((sum, dnso) => sum + dnso.roi_max, 0);
    const avgROI = {
        min: Math.round(totalROIMin / totalDNSOs),
        max: Math.round(totalROIMax / totalDNSOs)
    };

    // Group by sector
    const bySector = dnsos.reduce((acc, dnso) => {
        const sector = dnso.sector;
        if (!acc[sector]) {
            acc[sector] = { count: 0, total_roi: 0 };
        }
        acc[sector].count++;
        acc[sector].total_roi += dnso.roi_max;
        return acc;
    }, {} as Record<string, { count: number; total_roi: number }>);

    // Group by priority
    const byPriority = dnsos.reduce((acc, dnso) => {
        const priority = dnso.priority;
        if (!acc[priority]) {
            acc[priority] = 0;
        }
        acc[priority]++;
        return acc;
    }, {} as Record<string, number>);

    return {
        total_dnsos: totalDNSOs,
        total_roi_potential: {
            min: totalROIMin,
            max: totalROIMax
        },
        average_roi: avgROI,
        by_sector: bySector,
        by_priority: byPriority,
        sectors_covered: Object.keys(bySector).length
    };
}

// Main GET handler
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const path = searchParams.get('path') || '';

        // Load data
        const database = loadDNSOData();

        // Handle different endpoints
        switch (path) {
            case 'stats':
                return NextResponse.json({
                    success: true,
                    data: calculateStats(database.dnsos),
                    metadata: database.metadata
                });

            default:
                // Main DNSOs endpoint with filtering
                const filters: FilterParams = {
                    sector: searchParams.get('sector') || undefined,
                    priority: searchParams.get('priority') || undefined,
                    client_type: searchParams.get('client_type') || undefined,
                    geography: searchParams.get('geography') || undefined,
                    roi_min: searchParams.get('roi_min') ? parseInt(searchParams.get('roi_min')!) : undefined,
                    roi_max: searchParams.get('roi_max') ? parseInt(searchParams.get('roi_max')!) : undefined,
                    search: searchParams.get('search') || undefined,
                    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
                    offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
                };

                let filteredDNSOs = filterDNSOs(database.dnsos, filters);

                // Apply pagination
                const offset = filters.offset || 0;
                const limit = filters.limit;
                const totalCount = filteredDNSOs.length;

                if (limit) {
                    filteredDNSOs = filteredDNSOs.slice(offset, offset + limit);
                }

                return NextResponse.json({
                    success: true,
                    data: filteredDNSOs,
                    pagination: {
                        total: totalCount,
                        offset: offset,
                        limit: limit || totalCount,
                        has_more: limit ? (offset + limit) < totalCount : false
                    },
                    metadata: database.metadata
                });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Export types for use in components
export type { DNSO, CostComponent, FilterParams };