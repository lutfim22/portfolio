import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/geist/index.css";
import { themeCss } from "./tokens";
import { themeBootstrap } from "./theme";
import "./styles.css";

export function DesignSurface({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{themeCss}</style>
      <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      <noscript>
        <style>{".theme-toggle { display: none !important; }"}</style>
      </noscript>
      <div className="design-surface">{children}</div>
    </>
  );
}
