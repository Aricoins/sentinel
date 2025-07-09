import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// TypeScript interfaces (duplicadas aquí para independencia)
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

// Load data helper
function loadDNSOData() {
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

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const database = loadDNSOData();
        const dnso = database.dnsos.find((d: DNSO) => d.id === params.id);

        if (!dnso) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'DNSO not found',
                    message: `No DNSO found with ID: ${params.id}`
                },
                { status: 404 }
            );
        }

        // Find related DNSOs (same sector, excluding current)
        const relatedDNSOs = database.dnsos
            .filter((d: DNSO) => d.sector === dnso.sector && d.id !== dnso.id)
            .slice(0, 3);

        // Calculate total investment range
        interface TotalInvestment {
            min: number;
            max: number;
        }

        const totalInvestment: TotalInvestment = dnso.cost_components.reduce(
            (acc: TotalInvestment, component: CostComponent): TotalInvestment => ({
                min: acc.min + component.min,
                max: acc.max + component.max
            }),
            { min: 0, max: 0 }
        );

        return NextResponse.json({
            success: true,
            data: {
                ...dnso,
                total_investment: totalInvestment
            },
            related: relatedDNSOs,
            metadata: database.metadata
        });
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