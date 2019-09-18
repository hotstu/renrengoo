const someHost = 'https://www.google.com'
//replace this with you own subdomain!! 替换为你自己申请的subdomain!!
const host = 'https://sink.hglf.workers.dev'

async function handleRequest(request) {
  const { url: rawUrl } = request
  const url = rawUrl.replace(host, someHost)
  const { headers } = request
  const init = {
    headers: headers,
    redirect: "manual",
  }
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, copyMeta(response))
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

function copyMeta(response) {
  return {
    headers: response.headers,
    status: response.status
  }
}

async function gatherResponse(response) {
  console.log(response)
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return replace(await response.text())
  } else if (contentType.includes('application/text')) {
    return replace(await response.text())
  } else if (contentType.includes('text/html')) {
    return replace(await response.text())
  } else {
    return await response.body
  }
}

async function replace(html) {
  return html.replace(someHost, host)
}

