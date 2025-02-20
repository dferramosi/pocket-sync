import React, { Suspense, useState } from "react"
import { About } from "../about"
import { AutoRefresh } from "../autoRefresh"
import { Cores } from "../cores"
import { Disconnections } from "../disconnections"
import { ErrorBoundary } from "../errorBoundary"
import { Games } from "../games"
import { Loader } from "../loader"
import { Platforms } from "../platforms"
import { Saves } from "../saves"
import { SaveStates } from "../saveStates"
import { Screenshots } from "../screenshots"
import { Settings } from "../settings"
import { ZipInstall } from "../zipInstall"
import "./index.css"

export const Layout = () => {
  const views = [
    "Pocket Sync",
    "Games",
    "Cores",
    "Screenshots",
    "Saves",
    "Save States",
    "Platforms",
    "Settings",
  ] as const
  const [viewName, setViewName] = useState<typeof views[number]>("Pocket Sync")

  return (
    <div className="layout">
      <Disconnections />
      <ZipInstall />
      <AutoRefresh />
      <div className="layout__sidebar-menu">
        {views.map((v) => (
          <div
            className={`layout__sidebar-menu-item ${
              viewName === v ? "layout__sidebar-menu-item--active" : ""
            }`}
            key={v}
            onClick={() => setViewName(v)}
          >
            {v}
          </div>
        ))}
      </div>
      <div className="layout__content">
        <ErrorBoundary>
          <Suspense fallback={<Loader fullHeight />}>
            {viewName === "Screenshots" && <Screenshots />}
            {viewName === "Cores" && <Cores />}
            {viewName === "Pocket Sync" && <About />}
            {viewName === "Settings" && <Settings />}
            {viewName === "Games" && <Games />}
            {viewName === "Saves" && <Saves />}
            {viewName === "Save States" && <SaveStates />}
            {viewName === "Platforms" && <Platforms />}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
