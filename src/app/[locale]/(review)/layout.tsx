import { DesignSurface } from "@/design/surface";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DesignSurface>{children}</DesignSurface>;
}
