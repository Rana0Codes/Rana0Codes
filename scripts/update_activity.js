/**
 * Dynamic GitHub Activity Overview SVG Generator
 * Generates assets/activity_overview.svg dynamically from GitHub API telemetry.
 * Automatically updates when new repositories are created or new commits are pushed.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const USERNAME = 'Rana0Codes';
const TOKEN = process.env.GITHUB_TOKEN || '';

function apiGet(endpoint) {
  return new Promise((resolve, reject) => {
    const url = endpoint.startsWith('http') ? endpoint : `https://api.github.com${endpoint}`;
    const headers = {
      'User-Agent': 'Rana0Codes-Activity-Telemetry',
      'Accept': 'application/vnd.github.v3+json',
    };
    if (TOKEN) {
      headers['Authorization'] = `token ${TOKEN}`;
    }

    https.get(url, { headers }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: raw.length > 0 ? JSON.parse(raw) : null
          });
        } catch (err) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: raw
          });
        }
      });
    }).on('error', reject);
  });
}

async function getCommitCount(repoName) {
  try {
    const res = await apiGet(`/repos/${USERNAME}/${repoName}/commits?per_page=1`);
    if (res.headers && res.headers['link']) {
      const match = res.headers['link'].match(/page=(\d+)>; rel="last"/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    if (Array.isArray(res.body) && res.body.length > 0) {
      return 1;
    }
    return 1;
  } catch (e) {
    return 1;
  }
}

function getLanguageColor(lang) {
  const colors = {
    'JavaScript': '#f7df1e',
    'Python': '#38bdf8',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'TypeScript': '#3178c6',
    'Shell': '#89e051',
  };
  return colors[lang] || '#00f0ff';
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function main() {
  console.log(`[Telemetry] Fetching public repositories for ${USERNAME}...`);
  const reposRes = await apiGet(`/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=100`);
  
  if (!Array.isArray(reposRes.body)) {
    console.error('[Telemetry] Error fetching repositories:', reposRes.body);
    process.exit(1);
  }

  // Filter public non-fork repos
  const activeRepos = reposRes.body.filter(r => !r.fork && r.name !== 'Rana0Codes');
  console.log(`[Telemetry] Found ${activeRepos.length} active project repositories.`);

  let totalCommits = 0;
  const projectStats = [];

  for (const repo of activeRepos) {
    const commits = await getCommitCount(repo.name);
    totalCommits += commits;
    projectStats.push({
      name: repo.name,
      description: repo.description || 'Verified production codebase',
      language: repo.language || 'Code',
      commits: commits,
      pushedAt: repo.pushed_at,
      stars: repo.stargazers_count || 0
    });
  }

  // Also include profile commits if needed
  const profileCommits = await getCommitCount('Rana0Codes');
  totalCommits += profileCommits;

  console.log(`[Telemetry] Total verified commits across all repositories: ${totalCommits}`);

  // Formulate top 4 active projects for display
  const topProjects = projectStats.slice(0, 4);

  // Activity Overview vector parameters
  // Quad coordinates: Center at (680, 125)
  // Axes: Top (Code review), Right (Issues), Bottom (Pull requests), Left (Commits)
  // Commits represents 100% of verified contributions
  const commitVectorLen = 95; // From center 680 to 585
  const radarNodeX = 585;
  const radarNodeY = 125;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Render SVG with dark obsidian styling, genuine depth, and live telemetry
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 250" width="880" height="250" fill="none">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="act-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070a10" />
      <stop offset="50%" stop-color="#0c1018" />
      <stop offset="100%" stop-color="#05080e" />
    </linearGradient>

    <linearGradient id="act-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.35" />
      <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#7000ff" stop-opacity="0.3" />
    </linearGradient>

    <linearGradient id="commit-bar-grad" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#238636" />
      <stop offset="100%" stop-color="#3fb950" />
    </linearGradient>

    <filter id="green-radar-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="card-depth" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.7" />
    </filter>

    <style>
      @keyframes radar-pulse-wave {
        0% { r: 5; opacity: 0.85; }
        100% { r: 18; opacity: 0; }
      }

      @keyframes live-dot-beacon {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.9); }
      }

      @keyframes commit-vector-grow {
        0% { stroke-dashoffset: 95; }
        100% { stroke-dashoffset: 0; }
      }

      .radar-wave-ring {
        animation: radar-pulse-wave 2.4s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
      }

      .beacon-dot {
        animation: live-dot-beacon 2s ease-in-out infinite;
      }

      .vector-line {
        stroke-dasharray: 95;
        animation: commit-vector-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    </style>
  </defs>

  <!-- Container Surface with Specular Border & Depth -->
  <rect width="880" height="250" rx="14" fill="url(#act-bg)" stroke="url(#act-border)" stroke-width="1.2" filter="url(#card-depth)" />

  <!-- Subtle Ambient Perspective Grid -->
  <g stroke="rgba(255,255,255,0.02)" stroke-width="1">
    <line x1="30" y1="50" x2="850" y2="50" />
    <line x1="30" y1="205" x2="850" y2="205" />
    <line x1="490" y1="20" x2="490" y2="230" />
  </g>

  <!-- Left Column: Dynamic Telemetry & Top Active Repositories -->
  <g transform="translate(36, 28)">
    <!-- Header with Live Synchronized Dot -->
    <g transform="translate(0, 0)">
      <circle cx="5" cy="5" r="4.5" fill="#3fb950" class="beacon-dot" />
      <text x="18" y="9" fill="#e6edf3" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.4">ACTIVITY OVERVIEW &amp; CODEBASE TELEMETRY</text>
      <text x="350" y="9" fill="#64748b" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9.5">LIVE SYNC</text>
    </g>

    <!-- Top Summary Pills -->
    <g transform="translate(0, 24)">
      <!-- Pill 1: Repos -->
      <rect x="0" y="0" width="125" height="22" rx="6" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1" />
      <text x="8" y="15" fill="#38bdf8" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10" font-weight="600">${activeRepos.length} ACTIVE REPOS</text>

      <!-- Pill 2: Commits -->
      <rect x="133" y="0" width="135" height="22" rx="6" fill="rgba(63, 185, 80, 0.08)" stroke="rgba(63, 185, 80, 0.25)" stroke-width="1" />
      <text x="141" y="15" fill="#3fb950" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10" font-weight="600">${totalCommits}+ COMMITS LOGGED</text>

      <!-- Pill 3: Focus -->
      <rect x="276" y="0" width="145" height="22" rx="6" fill="rgba(168, 85, 247, 0.08)" stroke="rgba(168, 85, 247, 0.25)" stroke-width="1" />
      <text x="284" y="15" fill="#c084fc" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10" font-weight="600">FULL-STACK &amp; EDGE AI</text>
    </g>

    <!-- Dynamic Active Projects Row (Auto-reflects any newly pushed/uploaded code) -->
    <g transform="translate(0, 62)">
      <text x="0" y="0" fill="#7d8590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="10" font-weight="600" letter-spacing="0.5">RECENTLY ACTIVE CODEBASES (AUTO-REFLECTED):</text>
      ${topProjects.map((proj, idx) => {
        const yPos = 14 + (idx * 26);
        const langColor = getLanguageColor(proj.language);
        return `
      <!-- Repo ${idx + 1}: ${escapeXml(proj.name)} -->
      <g transform="translate(0, ${yPos})">
        <circle cx="5" cy="8" r="3.5" fill="${langColor}" />
        <text x="16" y="11" fill="#e6edf3" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="11.5" font-weight="600">${escapeXml(proj.name)}</text>
        <text x="245" y="11" fill="#8b949e" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="10">${escapeXml(proj.language)}</text>
        <rect x="330" y="0" width="80" height="17" rx="4" fill="rgba(255,255,255,0.04)" />
        <text x="370" y="12" fill="#3fb950" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9.5" text-anchor="middle">${proj.commits} commits</text>
      </g>`;
      }).join('')}
    </g>

    <!-- Footer Note -->
    <text x="0" y="186" fill="#484f58" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="9">
      Telemetry synced via GitHub Actions &#8226; Reflects all active commits &amp; projects
    </text>
  </g>

  <!-- Right Column: 4-Axis Activity Overview Crosshair Quadrant -->
  <g id="activity-crosshair-stage">
    <!-- Center Point: (680, 125) -->
    <!-- Background Circle Matrix Rings -->
    <circle cx="680" cy="125" r="75" stroke="#21262d" stroke-width="1" stroke-dasharray="2 4" fill="rgba(13, 17, 23, 0.4)" />
    <circle cx="680" cy="125" r="45" stroke="#30363d" stroke-width="1" stroke-dasharray="3 3" fill="none" />
    <circle cx="680" cy="125" r="18" stroke="#30363d" stroke-width="1" fill="none" />

    <!-- 4 Axes Crosshair Lines -->
    <!-- Vertical: Code review (top) to Pull requests (bottom) -->
    <line x1="680" y1="42" x2="680" y2="208" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" />
    <!-- Horizontal: Commits (left) to Issues (right) -->
    <line x1="575" y1="125" x2="785" y2="125" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" />

    <!-- Center Tick -->
    <circle cx="680" cy="125" r="2.5" fill="#484f58" />

    <!-- Axis Labels -->
    <!-- Top: Code review -->
    <text x="680" y="32" fill="#7d8590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="11" text-anchor="middle">Code review</text>

    <!-- Bottom: Pull requests -->
    <text x="680" y="222" fill="#7d8590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="11" text-anchor="middle">Pull requests</text>

    <!-- Right: Issues -->
    <text x="795" y="129" fill="#7d8590" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="11" text-anchor="start">Issues</text>

    <!-- Left: 100% Commits -->
    <text x="550" y="122" fill="#3fb950" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12" font-weight="700" text-anchor="end">100%</text>
    <text x="550" y="136" fill="#c9d1d9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="11" text-anchor="end">Commits</text>

    <!-- The 100% Commits Vector Line (Center 680 to Left 585) -->
    <line x1="680" y1="125" x2="585" y2="125" stroke="url(#commit-bar-grad)" stroke-width="2.8" stroke-linecap="round" class="vector-line" />

    <!-- Pulsing Radar Rings at Commit Node (x = 585, y = 125) -->
    <circle cx="585" cy="125" r="5" stroke="#3fb950" stroke-width="1.5" fill="none" class="radar-wave-ring" />
    <circle cx="585" cy="125" r="4.5" fill="#3fb950" stroke="#070a10" stroke-width="1.5" filter="url(#green-radar-glow)" />
    <circle cx="585" cy="125" r="2" fill="#ffffff" />
  </g>
</svg>`;

  const outPath = path.join(__dirname, '..', 'assets', 'activity_overview.svg');
  fs.writeFileSync(outPath, svg, 'utf-8');
  console.log(`[Telemetry] Successfully updated: ${outPath}`);

  // Also sync to Portfolio-v2 assets if available
  const portfolioAssets = path.join(__dirname, '..', '..', 'Portfolio-v2', 'assets', 'activity_overview.svg');
  if (fs.existsSync(path.dirname(portfolioAssets))) {
    fs.writeFileSync(portfolioAssets, svg, 'utf-8');
    console.log(`[Telemetry] Successfully synced to Portfolio-v2: ${portfolioAssets}`);
  }
}

main().catch(err => {
  console.error('[Telemetry] Error in update_activity:', err);
  process.exit(1);
});
