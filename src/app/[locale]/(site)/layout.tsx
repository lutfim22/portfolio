import { DesignSurface } from "@/design/surface";
import { Telemetry } from "@/components/telemetry";
import { telemetryConfig } from "@/lib/telemetry-config";
export default function Layout({ children }: { children: React.ReactNode }) {
  const telemetry = telemetryConfig();
  return (
    <DesignSurface>
      {children}
      {telemetry.origin && (telemetry.analytics || telemetry.speedInsights) && (
        <Telemetry
          origin={telemetry.origin}
          analytics={telemetry.analytics}
          speedInsights={telemetry.speedInsights}
        />
      )}
    </DesignSurface>
  );
}
