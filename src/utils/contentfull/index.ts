import * as contentful from "contentful"

export const client = contentful.createClient({
    space: '9y8y1sbtipbn',
    environment: 'master', // defaults to 'master' if not set
    accessToken: import.meta.env.VITE_CF_ACCESS_TOKEN
  })

  