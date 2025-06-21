#!/usr/bin/env python3
"""
Microsoft Sentinel Audit Script
Elaborado por Latitud42
Requiere: Azure CLI configurado y permisos adecuados
"""

import os
import json
import pandas as pd
from datetime import datetime, timedelta
from azure.identity import DefaultAzureCredential
from azure.mgmt.loganalytics import LogAnalyticsManagementClient
from azure.mgmt.securityinsight import SecurityInsights
from azure.mgmt.resource import ResourceManagementClient
import requests

class SentinelAuditor:
    def __init__(self, subscription_id, resource_group, workspace_name):
        self.subscription_id = subscription_id
        self.resource_group = resource_group
        self.workspace_name = workspace_name
        self.credential = DefaultAzureCredential()
        
        # Initialize Azure clients
        self.log_client = LogAnalyticsManagementClient(
            self.credential, subscription_id
        )
        self.sentinel_client = SecurityInsights(
            self.credential, subscription_id
        )
        self.resource_client = ResourceManagementClient(
            self.credential, subscription_id
        )
        
        # Output file
        self.output_file = f"SentinelAudit_{datetime.now().strftime('%Y%m%d')}.csv"
        self.results = []

    def check_data_connectors(self):
        """1. Verificar conectores de datos"""
        print("🔍 Verificando conectores de datos...")
        try:
            connectors = self.sentinel_client.data_connectors.list(
                self.resource_group, self.workspace_name
            )
            
            for connector in connectors:
                self.results.append({
                    'Category': 'Data Connectors',
                    'Name': connector.name,
                    'Type': connector.kind,
                    'Status': getattr(connector, 'state', 'Unknown'),
                    'Issue': 'Disconnected' if getattr(connector, 'state', '') != 'Connected' else 'OK'
                })
                
        except Exception as e:
            print(f"❌ Error checking data connectors: {e}")

    def audit_analytics_rules(self):
        """2. Auditoría de reglas de detección"""
        print("📊 Auditando reglas de analítica...")
        try:
            rules = self.sentinel_client.alert_rules.list(
                self.resource_group, self.workspace_name
            )
            
            for rule in rules:
                self.results.append({
                    'Category': 'Analytics Rules',
                    'Name': rule.display_name,
                    'Type': rule.kind,
                    'Enabled': rule.enabled,
                    'Severity': getattr(rule, 'severity', 'Unknown'),
                    'Issue': 'Disabled' if not rule.enabled else 'OK'
                })
                
        except Exception as e:
            print(f"❌ Error checking analytics rules: {e}")

    def check_playbooks(self):
        """3. Chequear playbooks/automation rules"""
        print("🤖 Verificando playbooks y automatización...")
        try:
            automation_rules = self.sentinel_client.automation_rules.list(
                self.resource_group, self.workspace_name
            )
            
            for rule in automation_rules:
                self.results.append({
                    'Category': 'Automation',
                    'Name': rule.display_name,
                    'Type': 'Automation Rule',
                    'Enabled': getattr(rule, 'state', 'Unknown') == 'Enabled',
                    'Issue': 'Disabled' if getattr(rule, 'state', '') != 'Enabled' else 'OK'
                })
                
        except Exception as e:
            print(f"❌ Error checking automation rules: {e}")

    def analyze_incidents(self):
        """4. Analizar incidentes recientes"""
        print("🚨 Analizando incidentes...")
        try:
            # Get incidents from last 30 days
            incidents = self.sentinel_client.incidents.list(
                self.resource_group, 
                self.workspace_name,
                filter=f"properties/createdTimeUtc ge {(datetime.now() - timedelta(days=30)).isoformat()}Z"
            )
            
            severity_count = {}
            status_count = {}
            
            for incident in incidents:
                severity = incident.severity
                status = incident.status
                
                severity_count[severity] = severity_count.get(severity, 0) + 1
                status_count[status] = status_count.get(status, 0) + 1
            
            # Add summary to results
            for severity, count in severity_count.items():
                self.results.append({
                    'Category': 'Incident Analysis',
                    'Name': f'Incidents - {severity}',
                    'Count': count,
                    'Period': 'Last 30 days',
                    'Issue': 'High volume' if count > 100 else 'OK'
                })
                
        except Exception as e:
            print(f"❌ Error analyzing incidents: {e}")

    def check_workspace_health(self):
        """5. Verificar salud del workspace"""
        print("💊 Verificando salud del workspace...")
        try:
            workspace = self.log_client.workspaces.get(
                self.resource_group, self.workspace_name
            )
            
            self.results.append({
                'Category': 'Workspace Health',
                'Name': workspace.name,
                'Status': workspace.provisioning_state,
                'Retention Days': workspace.retention_in_days,
                'Daily Cap GB': getattr(workspace, 'daily_quota_gb', 'Unlimited'),
                'Issue': 'Check retention' if workspace.retention_in_days < 30 else 'OK'
            })
            
        except Exception as e:
            print(f"❌ Error checking workspace health: {e}")

    def generate_report(self):
        """Generar reporte final"""
        print("📋 Generando reporte...")
        
        if not self.results:
            print("❌ No hay datos para generar el reporte")
            return
        
        # Convert to DataFrame
        df = pd.DataFrame(self.results)
        
        # Save to CSV
        df.to_csv(self.output_file, index=False, encoding='utf-8')
        
        # Print summary
        print(f"\n📊 RESUMEN DE AUDITORÍA")
        print(f"={'='*50}")
        
        categories = df.groupby('Category').size()
        for category, count in categories.items():
            print(f"{category}: {count} elementos")
        
        # Count issues
        issues = df[df.get('Issue', '') != 'OK']
        if not issues.empty:
            print(f"\n⚠️  PROBLEMAS ENCONTRADOS: {len(issues)}")
            for _, issue in issues.iterrows():
                print(f"  • {issue.get('Name', 'Unknown')}: {issue.get('Issue', 'Unknown issue')}")
        else:
            print(f"\n✅ No se encontraron problemas críticos")
        
        print(f"\n📁 Reporte guardado en: {self.output_file}")

    def run_audit(self):
        """Ejecutar auditoría completa"""
        print("🚀 Iniciando auditoría de Microsoft Sentinel...")
        print(f"Workspace: {self.workspace_name}")
        print(f"Resource Group: {self.resource_group}")
        print("="*60)
        
        try:
            self.check_data_connectors()
            self.audit_analytics_rules()
            self.check_playbooks()
            self.analyze_incidents()
            self.check_workspace_health()
            self.generate_report()
            
            print(f"\n✅ Auditoría completada exitosamente!")
            
        except Exception as e:
            print(f"❌ Error durante la auditoría: {e}")

def main():
    """Función principal"""
    # Configuración - Modifica estos valores
    SUBSCRIPTION_ID = os.getenv('AZURE_SUBSCRIPTION_ID', 'tu-subscription-id')
    RESOURCE_GROUP = os.getenv('AZURE_RESOURCE_GROUP', 'NombreDelGrupoDeRecursos')
    WORKSPACE_NAME = os.getenv('SENTINEL_WORKSPACE_NAME', 'NombreDeTuWorkspace')
    
    # Verificar configuración
    if SUBSCRIPTION_ID == 'tu-subscription-id':
        print("⚠️  Configuración requerida:")
        print("1. Configura las variables de entorno o modifica el código:")
        print("   - AZURE_SUBSCRIPTION_ID")
        print("   - AZURE_RESOURCE_GROUP") 
        print("   - SENTINEL_WORKSPACE_NAME")
        print("2. Asegúrate de estar autenticado con Azure CLI: az login")
        return
    
    # Crear auditor y ejecutar
    auditor = SentinelAuditor(SUBSCRIPTION_ID, RESOURCE_GROUP, WORKSPACE_NAME)
    auditor.run_audit()

if __name__ == "__main__":
    main()
