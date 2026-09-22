#!/usr/bin/env python3
from pathlib import Path
import re, sys

root = Path(__file__).resolve().parent.parent
required = [
    'index.html','styles.css','app.js','content.js','config.js','SOURCES.md','README.md','_redirects','.openai/hosting.json',
    'data/mockProperties.js','data/properties.js','data/sanityConfig.js','data/sanityClient.js','data/sanityProperties.js','data/sanityImage.js','components/propertyCard.js','components/propertyModal.js','components/propertyFilters.js'
]
missing = [f for f in required if not (root/f).exists()]
if missing:
    print('Missing:', ', '.join(missing)); sys.exit(1)

content = (root/'content.js').read_text()
app = (root/'app.js').read_text()
mock = (root/'data/mockProperties.js').read_text()
names = ['Maldives','Seychelles','Mauritius','Greece','Italy','France','Switzerland','Turkey','Dubai','Thailand','Bali','Europe','Beyond','Waldorf Astoria Maldives Ithaafushi','Cheval Blanc Randheli','JOALI Maldives','One&Only Reethi Rah']
absent = [n for n in names if n not in content]
assert not absent, f'Missing content entries: {absent}'
assert 'whatsappHref' in app and 'https://wa.me/' in app
assert 'searchOpen' not in app and 'siteSearch' not in app
assert 'villa-discovery' in app and 'openPropertyModal' in app and 'getPropertyBySlug' in app
assert 'propertyModal' in app and 'renderPropertyModalShell' in app
assert 'chalet-example' in mock and 'villa-mykonos' in mock
assert not (root/'components/propertyDetail.js').exists(), 'propertyDetail.js should be removed (modal replaces detail pages)'
config = (root/'config.js').read_text()
match = re.search(r'whatsappNumber:\s*"([^"]*)"', config)
assert match, 'WhatsApp configuration is missing'
whatsapp = match.group(1)
assert not whatsapp or re.fullmatch(r'\+[1-9]\d{7,14}', whatsapp), 'WhatsApp number must be blank or use international format'
print('PASS: property modal system on Private Villas and contact configuration verified.')
