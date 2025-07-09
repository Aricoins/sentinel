import { dnsoData } from '../../../data/dnso-data';
import DNSODetailClient from './DNSODetailClient';

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
  priority: string;
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

// Generate static params for all DNSO IDs
export async function generateStaticParams() {
  // Get all DNSO IDs from the static data
  return dnsoData.dnso_database.dnsos.map((dnso) => ({
    id: dnso.id,
  }));
}

export default async function DNSODetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params in Next.js 15
  const { id } = await params;
  
  // Get the DNSO data on the server side
  const dnso = dnsoData.dnso_database.dnsos.find((d: any) => d.id === id);
  const relatedDNSOs = dnso ? dnsoData.dnso_database.dnsos
    .filter((d: any) => d.id !== id && d.sector === dnso.sector)
    .slice(0, 3) : [];

  if (!dnso) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">DNSO Not Found</h2>
          <p className="text-gray-600 mb-6">The requested opportunity could not be found.</p>
        </div>
      </div>
    );
  }

  // Pass the data to the client component
  return <DNSODetailClient dnso={dnso} relatedDNSOs={relatedDNSOs} />;
}
