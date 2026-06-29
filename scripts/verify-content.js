#!/usr/bin/env node

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const BASE_URL = 'https://calculadora-sueno.com'
const ARTICLES_DIR = 'public/articles'
const netlifyConfig = readFileSync('netlify.toml', 'utf8')
const redirectsFile = readFileSync('public/_redirects', 'utf8')
const sitemap = readFileSync('public/sitemap.xml', 'utf8')
const articleIndex = readFileSync('public/articulos/index.html', 'utf8')
const errors = []

if (!/NODE_VERSION\s*=\s*"22"/.test(netlifyConfig)) {
  errors.push('netlify.toml debe usar NODE_VERSION = "22"')
}

const files = readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.html'))

for (const file of files) {
  const html = readFileSync(join(ARTICLES_DIR, file), 'utf8')
  const canonicalMatch = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  )

  if (!canonicalMatch) {
    errors.push(`${file}: falta la URL canonical`)
    continue
  }

  const canonicalUrl = canonicalMatch[1]
  if (!canonicalUrl.startsWith(`${BASE_URL}/articulos/`)) {
    errors.push(`${file}: canonical fuera de /articulos/ (${canonicalUrl})`)
    continue
  }

  const route = canonicalUrl.slice(BASE_URL.length)
  const target = `/articles/${file}`

  if (!netlifyConfig.includes(`from = "${route}"`) ||
      !netlifyConfig.includes(`to = "${target}"`)) {
    errors.push(`${file}: falta su rewrite en netlify.toml`)
  }

  const redirectRule = `${route} ${target} 200`
  if (!redirectsFile.includes(redirectRule)) {
    errors.push(`${file}: falta su rewrite en public/_redirects`)
  }

  if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) {
    errors.push(`${file}: falta en public/sitemap.xml`)
  }

  if (!articleIndex.includes(`href="${route}"`)) {
    errors.push(`${file}: falta en public/articulos/index.html`)
  }
}

if (errors.length > 0) {
  console.error('La verificación de contenido ha fallado:\n')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Contenido verificado: ${files.length} artículos, rutas e índice correctos`)
