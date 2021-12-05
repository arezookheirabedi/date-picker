import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props : any) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
  </ContentLoader>
)

export default MyLoader
