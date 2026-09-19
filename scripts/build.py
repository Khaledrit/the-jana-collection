#!/usr/bin/env python3
from pathlib import Path
import shutil

root = Path(__file__).resolve().parent.parent
dist = root / 'dist'
client = dist / 'client'
server = dist / 'server'

if dist.exists():
    shutil.rmtree(dist)
client.mkdir(parents=True)
server.mkdir(parents=True)
(dist / '.openai').mkdir(parents=True)

for name in ('index.html', 'styles.css', 'app.js', 'content.js', 'config.js', '_redirects'):
    shutil.copy2(root / name, client / name)
shutil.copy2(root / 'server' / 'index.js', server / 'index.js')
shutil.copy2(root / '.openai' / 'hosting.json', dist / '.openai' / 'hosting.json')
print(f'Built {dist}')
